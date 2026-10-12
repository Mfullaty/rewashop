<?php

namespace App\Pos\Services;

use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use App\Pos\Support\Money;
use App\Pos\Support\Payload;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PricingService
{
    private array $taxCache = [];
    private ?bool $gstActive = null;

    public function prime(array $productIds): void
    {
        $this->taxCache = array_fill_keys($productIds, []);
        foreach (DB::table('product_taxes')->whereIn('product_id', $productIds)->orderBy('id')->get() as $tax) {
            $this->taxCache[$tax->product_id][] = ['type' => $tax->tax_type, 'value' => Money::minor($tax->tax)];
        }
    }
    public function snapshot(object $stock, object $product, object $settings): array
    {
        $base = Money::minor($stock->price);
        if ($base < 0) {
            throw new PosException('INVALID_PRICE', 'The product has a negative price.');
        }
        $now = now('UTC')->timestamp;
        $active = !$product->discount_start_date ||
            ($now >= (int) $product->discount_start_date && $now <= (int) $product->discount_end_date);
        $promotion = 0;
        if ($active) {
            $promotion = $product->discount_type === 'percent'
                ? Money::percent($base, Money::minor($product->discount)) : Money::minor($product->discount);
        }
        if ($promotion < 0 || $promotion > $base) {
            throw new PosException('INVALID_PROMOTION', 'The product promotion exceeds its price.');
        }
        $taxes = $this->taxCache[$product->id] ?? DB::table('product_taxes')->where('product_id', $product->id)->orderBy('id')->get()
            ->map(fn ($t) => ['type' => $t->tax_type, 'value' => Money::minor($t->tax)])->all();
        $options = json_decode($settings->settings, true, 512, JSON_THROW_ON_ERROR);
        $this->gstActive ??= Schema::hasTable('addons') && DB::table('addons')->where('unique_identifier', 'gst_system')->where('activated', 1)->exists();
        $gst = $this->gstActive
            ? Money::minor($product->gst_rate ?? 0) : 0;
        $snapshot = [
            'stock_id' => (int) $stock->id, 'product_id' => (int) $product->id,
            'name' => $product->name, 'variant' => $stock->variant,
            'sku' => $stock->sku, 'barcode' => $product->barcode,
            'category_id' => (int) $product->category_id, 'brand_id' => $product->brand_id,
            'unit' => $product->unit, 'image_id' => $stock->image ?: $product->thumbnail_img,
            'base_price_minor' => $base, 'promotion_minor' => $promotion,
            'unit_price_minor' => $base - $promotion, 'tax_rules' => $taxes,
            'tax_inclusive' => (bool) ($options['tax_inclusive'] ?? false),
            'gst_bps' => $gst, 'currency' => $settings->currency,
        ];
        $boundaries = [];
        if ($product->discount_start_date && (int) $product->discount_start_date > $now) {
            $boundaries[] = (int) $product->discount_start_date;
        }
        if ($product->discount_start_date && $active && $product->discount_end_date && (int) $product->discount_end_date >= $now) {
            $boundaries[] = (int) $product->discount_end_date;
        }
        $snapshot['next_price_boundary'] = $boundaries ? min($boundaries) : null;
        $snapshot['price_version'] = Payload::hash($snapshot);
        return $snapshot;
    }

    public function line(PosContext $context, array $snapshot, array $input, bool $offline = false): array
    {
        $quantity = (int) $input['quantity'];
        $unit = (int) $snapshot['unit_price_minor'];
        if (isset($input['override_minor'])) {
            $context->require('pos:price:override');
            if ($offline || empty($input['override_reason'])) {
                throw new PosException('PRICE_OVERRIDE_DENIED', 'Price overrides require an online supervisor and a reason.', 403);
            }
            $unit = (int) $input['override_minor'];
        }
        $subtotal = Money::multiply($unit, $quantity);
        $discount = (int) ($input['discount_minor'] ?? 0);
        if ($discount > 0) {
            $context->require('pos:discount:write');
            $limit = min($context->maxDiscountBps, (int) ($snapshot['max_discount_bps'] ?? $context->maxDiscountBps));
            if ($discount > Money::percent($subtotal, $limit)) {
                throw new PosException('DISCOUNT_LIMIT', 'The discount exceeds the cashier limit.', 403);
            }
        }
        if ($discount < 0 || $discount > $subtotal) {
            throw new PosException('INVALID_DISCOUNT', 'The discount exceeds the line subtotal.');
        }
        $net = $subtotal - $discount;
        $percentBps = 0; $fixed = 0;
        foreach ($snapshot['tax_rules'] as $rule) {
            if ($rule['type'] === 'percent') {
                $percentBps += (int) $rule['value'];
            } elseif ($rule['type'] === 'amount') {
                $fixed += Money::multiply((int) $rule['value'], $quantity);
            } else {
                throw new PosException('INVALID_TAX', 'An unsupported product tax rule is configured.');
            }
        }
        if ($percentBps > 10000 || $fixed < 0) {
            throw new PosException('INVALID_TAX', 'The configured tax rate is outside the supported range.');
        }
        if ($snapshot['tax_inclusive']) {
            if ($fixed > $net) {
                throw new PosException('INVALID_TAX', 'The inclusive fixed tax exceeds the line price.');
            }
            $exclusive = intdiv(($net - $fixed) * 10000 + intdiv(10000 + $percentBps, 2), 10000 + $percentBps);
            $tax = $net - $exclusive;
            $total = $net;
        } else {
            $tax = Money::percent($net, $percentBps) + $fixed;
            $total = $net + $tax;
        }
        $gst = Money::percent($total, (int) $snapshot['gst_bps']);
        $total = Money::bound($total + $gst);
        foreach (['unit_price_minor' => $unit, 'tax_minor' => $tax + $gst, 'total_minor' => $total] as $key => $expected) {
            if (array_key_exists($key, $input) && (int) $input[$key] !== $expected) {
                throw new PosException('PRICE_MISMATCH', 'The submitted price or tax does not match the authorized price policy.', 409);
            }
        }
        return [
            'stock_id' => (int) $snapshot['stock_id'], 'product_id' => (int) $snapshot['product_id'],
            'quantity' => $quantity, 'unit_price_minor' => $unit, 'subtotal_minor' => $subtotal,
            'discount_minor' => $discount, 'tax_minor' => $tax + $gst,
            'gst_minor' => $gst, 'total_minor' => $total, 'snapshot' => $snapshot,
        ];
    }
}
