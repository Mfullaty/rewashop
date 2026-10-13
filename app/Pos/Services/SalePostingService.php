<?php

namespace App\Pos\Services;

use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use App\Pos\Support\Money;
use App\Pos\Support\Payload;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SalePostingService
{
    public function post(PosContext $context, string $key, array $data, bool $offline = false): array
    {
        $context->require('pos:sale:write');
        if (!config('pos.enabled')) { throw new PosException('POS_DISABLED', 'The shared POS backend is not enabled.', 503); }
        $rules = \App\Pos\Support\Schemas::sale($offline);
        if ($offline) {
            // The sync layer already resolved the local shift identity. The core
            // validates the resolved DTO and still enforces its device/cashier scope.
            $rules['shift_id'] = 'required|integer|min:1'; $rules['client_shift_id'] = 'sometimes|uuid';
        }
        $data = \Illuminate\Support\Facades\Validator::make($data, $rules)->validate();
        $cached = $offline && ($data['inventory_mode'] ?? 'reserved') === 'catalog';
        $source = $context->device ? 'desktop' : 'web';
        $identity = $data + ['source' => $source, 'inventory_mode' => $cached ? 'catalog' : ($offline ? 'reserved' : 'online'), 'device_id' => $context->device?->id];
        return app(TransactionService::class)->once($context, $key, 'sale.post', $identity, function () use ($context, $data, $offline, $cached, $identity) {
            $old = DB::table('pos_sales')->where('client_sale_id', $data['client_sale_id'])->first();
            if ($old) {
                if ((int) $old->seller_id !== $context->sellerId || (int) $old->cashier_id !== (int) $context->actor->id ||
                    !hash_equals($old->request_hash, Payload::hash($identity))) {
                    throw new PosException('SALE_ID_CONFLICT', 'The sale identifier belongs to a different request.', 409);
                }
                return $this->result($old->id) + ['duplicate' => true];
            }
            if (!$offline && !isset($data['shift_id'])) { $data['shift_id'] = (int) app(ShiftService::class)->automatic($context, (int) $data['register_id'])->id; }
            $register = $context->register((int) $data['register_id']);
            $shift = app(ShiftService::class)->active($context, (int) $data['shift_id'], (int) $register->id);
            if ($data['currency'] !== $context->currency) {
                throw new PosException('CURRENCY_MISMATCH', 'The sale currency must match the store base currency.');
            }
            $occurred = CarbonImmutable::parse($data['occurred_at'] ?? now('UTC'))->utc();
            if ($occurred->greaterThan(now('UTC')->addMinutes(5)) || $occurred->lessThan(CarbonImmutable::parse($shift->opened_at, 'UTC'))) {
                throw new PosException('INVALID_EVENT_TIME', 'The sale timestamp is outside the active shift.');
            }
            if ($offline && (!config('pos.offline_enabled') || !$context->device?->offline_allowed)) {
                throw new PosException('OFFLINE_DISABLED', 'This device cannot post offline sales.', 403);
            }
            $stocks = app(InventoryService::class)->lockStocks($context, array_column($data['lines'], 'stock_id'), !$offline);
            $settings = DB::table('pos_settings')->where('seller_id', $context->sellerId)->first();
            $lines = []; $subtotal = 0; $discount = 0; $tax = 0; $total = 0;
            foreach ($data['lines'] as $input) {
                $stock = $stocks[$input['stock_id']];
                $shortfall = 0;
                if ($cached) {
                    $snapshot = app(OfflineCatalogService::class)->snapshot($context, $input, $occurred->toIso8601String());
                    $shortfall = app(OfflineCatalogService::class)->deduct($context, $stock, (int) $input['quantity'], $data['client_sale_id']);
                } elseif ($offline) {
                    if (empty($input['allocation_id'])) {
                        throw new PosException('ALLOCATION_REQUIRED', 'Every offline sale line requires a device allocation.');
                    }
                    $snapshot = app(AllocationService::class)->consume($context, $input, $data['client_sale_id'], $occurred->toIso8601String());
                } else {
                    if (!empty($input['allocation_id'])) {
                        throw new PosException('ALLOCATION_NOT_ALLOWED', 'An online sale must use unreserved stock.');
                    }
                    $product = DB::table('products')->where('id', $stock->product_id)->lockForUpdate()->first();
                    $snapshot = app(PricingService::class)->snapshot($stock, $product, $settings);
                    app(InventoryService::class)->online($context, (int) $stock->id, -$input['quantity'], 'sale', $data['client_sale_id']);
                }
                $line = app(PricingService::class)->line($context, $snapshot, $input, $offline);
                $line['shortfall_quantity'] = $shortfall;
                $line['allocation_id'] = $input['allocation_id'] ?? null;
                $lines[] = $line;
                $subtotal = Money::bound($subtotal + $line['subtotal_minor']);
                $discount = Money::bound($discount + $line['discount_minor']);
                $tax = Money::bound($tax + $line['tax_minor']);
                $total = Money::bound($total + $line['total_minor']);
                if (isset($input['override_minor'])) {
                    app(AuditService::class)->record($context, 'sale.price_override', (string) $stock->id, [
                        'client_sale_id' => $data['client_sale_id'], 'reason' => $input['override_reason'],
                        'previous_minor' => $snapshot['unit_price_minor'], 'override_minor' => $input['override_minor'],
                    ]);
                }
            }
            if (isset($data['grand_total_minor']) && $data['grand_total_minor'] !== $total) {
                throw new PosException('TOTAL_MISMATCH', 'The sale total does not match the authorized line totals.', 409);
            }
            $tenders = app(TenderService::class)->validate($data['tenders'], $total, $context->currency, $offline);
            if ($offline && !$cached) {
                $device = DB::table('pos_devices')->where('id', $context->device->id)->first();
                if ($total > $device->max_offline_sale_minor || (int) $device->offline_spent_minor + $total > $device->max_offline_budget_minor) {
                    throw new PosException('OFFLINE_EXPOSURE_LIMIT', 'The offline sale or accumulated exposure limit was exceeded.', 409);
                }
                DB::table('pos_devices')->where('id', $device->id)->increment('offline_spent_minor', $total);
            }
            $pending = count(array_filter($tenders, fn ($t) => $t['status'] === 'pending')) > 0;
            $customer = $data['customer'] ?? [];
            // Explicit null postal fields keep existing invoice templates compatible.
            // These fields do not represent a delivery address for the retail channel.
            $shipping = ['name' => $customer['name'] ?? 'Walk-in customer', 'email' => $customer['email'] ?? null,
                'phone' => $customer['phone'] ?? null, 'address' => null, 'country' => null,
                'state' => null, 'city' => null, 'postal_code' => null];
            $orderCode = 'POS-'.Str::ulid();
            $orderId = DB::table('orders')->insertGetId([
                'user_id' => null, 'seller_id' => $context->sellerId, 'shipping_address' => Payload::json($shipping),
                'shipping_type' => 'in_store', 'order_from' => 'pos', 'delivery_status' => 'delivered',
                'payment_type' => count($tenders) > 1 ? 'pos_split' : ($tenders[0]['method'] === 'cash' ? 'cash' : 'pos_external'),
                'payment_status' => $pending ? 'unpaid' : 'paid', 'grand_total' => Money::decimal($total),
                'coupon_discount' => Money::decimal($discount), 'code' => $orderCode, 'date' => $occurred->timestamp,
                'created_at' => now('UTC'), 'updated_at' => now('UTC'),
            ]);
            $saleId = DB::table('pos_sales')->insertGetId([
                'client_sale_id' => $data['client_sale_id'], 'request_hash' => Payload::hash($identity),
                'order_id' => $orderId, 'seller_id' => $context->sellerId,
                'location_id' => $register->location_id, 'register_id' => $register->id, 'shift_id' => $shift->id,
                'cashier_id' => $context->actor->id, 'device_id' => $context->device?->id,
                'source' => $context->device ? 'desktop' : 'web', 'inventory_mode' => $cached ? 'catalog' : ($offline ? 'reserved' : 'online'), 'status' => 'completed',
                'payment_status' => $pending ? 'pending' : 'settled', 'currency' => $context->currency,
                'subtotal_minor' => $subtotal, 'discount_minor' => $discount, 'tax_minor' => $tax,
                'total_minor' => $total, 'refunded_minor' => 0, 'occurred_at' => $occurred,
                'created_at' => now('UTC'), 'updated_at' => now('UTC'),
            ]);
            foreach ($lines as $line) {
                if ($line['shortfall_quantity']) { DB::table('pos_stock_shortfalls')->insert(['seller_id' => $context->sellerId, 'sale_id' => $saleId, 'stock_id' => $line['stock_id'], 'quantity' => $line['shortfall_quantity'], 'created_at' => now('UTC')]); }
                $legacyPrice = $line['subtotal_minor'] - ($line['snapshot']['tax_inclusive'] ? $line['tax_minor'] - $line['gst_minor'] : 0);
                $detailId = DB::table('order_details')->insertGetId([
                    'order_id' => $orderId, 'seller_id' => $context->sellerId, 'product_id' => $line['product_id'],
                    'variation' => $line['snapshot']['variant'], 'quantity' => $line['quantity'],
                    'price' => Money::decimal($legacyPrice), 'coupon_discount' => Money::decimal($line['discount_minor']),
                    'tax' => Money::decimal($line['tax_minor'] - $line['gst_minor']),
                    'gst_rate' => Money::decimal($line['snapshot']['gst_bps']), 'gst_amount' => Money::decimal($line['gst_minor']),
                    'shipping_cost' => '0.00', 'shipping_type' => 'in_store',
                    'payment_status' => $pending ? 'unpaid' : 'paid', 'delivery_status' => 'delivered',
                    'created_at' => now('UTC'), 'updated_at' => now('UTC'),
                ]);
                DB::table('pos_sale_lines')->insert([
                    'sale_id' => $saleId, 'product_id' => $line['product_id'], 'stock_id' => $line['stock_id'],
                    'order_detail_id' => $detailId, 'quantity' => $line['quantity'], 'returned_quantity' => 0,
                    'unit_price_minor' => $line['unit_price_minor'], 'subtotal_minor' => $line['subtotal_minor'],
                    'discount_minor' => $line['discount_minor'], 'tax_minor' => $line['tax_minor'],
                    'gst_minor' => $line['gst_minor'], 'total_minor' => $line['total_minor'],
                    'allocation_id' => $line['allocation_id'], 'snapshot' => Payload::json($line['snapshot']),
                    'created_at' => now('UTC'), 'updated_at' => now('UTC'),
                ]);
                DB::table('products')->where('id', $line['product_id'])->increment('num_of_sale', $line['quantity']);
            }
            foreach ($tenders as $tender) {
                DB::table('pos_tenders')->insert($tender + ['sale_id' => $saleId, 'seller_id' => $context->sellerId,
                    'created_at' => now('UTC'), 'updated_at' => now('UTC')]);
            }
            $receiptNumber = $register->code.'-'.str_pad((string) $saleId, 10, '0', STR_PAD_LEFT);
            $receipt = ['number' => $receiptNumber, 'client_sale_id' => $data['client_sale_id'],
                'sale_id' => $saleId, 'order_id' => $orderId, 'order_code' => $orderCode,
                'store' => app(StoreProvisioningService::class)->branding($context->sellerId, $context->ownerType),
                'register' => $register->code, 'cashier' => $context->actor->name, 'occurred_at' => $occurred->toIso8601String(),
                'customer' => $customer ?: ['name' => 'Walk-in customer'], 'currency' => $context->currency,
                'lines' => $lines, 'tenders' => $tenders, 'subtotal_minor' => $subtotal,
                'discount_minor' => $discount, 'tax_minor' => $tax, 'total_minor' => $total,
                'payment_status' => $pending ? 'pending' : 'settled'];
            DB::table('pos_receipts')->insert(['sale_id' => $saleId, 'seller_id' => $context->sellerId,
                'number' => $receiptNumber, 'payload' => Payload::json($receipt), 'created_at' => now('UTC')]);
            app(AuditService::class)->record($context, 'sale.post', (string) $saleId,
                ['client_sale_id' => $data['client_sale_id'], 'order_id' => $orderId, 'source' => $context->device ? 'desktop' : 'web',
                    'inventory_mode' => $cached ? 'catalog' : ($offline ? 'reserved' : 'online')]);
            app(CatalogService::class)->publish($context->sellerId, 'sale', (string) $saleId, 'upsert',
                ['sale_id' => $saleId, 'order_id' => $orderId, 'register_id' => (int) $register->id, 'status' => 'completed']);
            return $this->result($saleId);
        });
    }

    private function result(int $id): array
    {
        $sale = DB::table('pos_sales')->where('id', $id)->first();
        return ['sale_id' => $id, 'order_id' => (int) $sale->order_id, 'client_sale_id' => $sale->client_sale_id,
            'payment_status' => $sale->payment_status, 'total_minor' => (int) $sale->total_minor,
            'receipt_id' => (int) DB::table('pos_receipts')->where('sale_id', $id)->value('id'),
            'stock_difference_units' => (int) DB::table('pos_stock_shortfalls')->where('sale_id', $id)->sum('quantity')];
    }
}
