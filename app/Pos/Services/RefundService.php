<?php

namespace App\Pos\Services;

use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use App\Pos\Support\Money;
use Illuminate\Support\Facades\DB;

class RefundService
{
    public function create(PosContext $context, string $key, int $saleId, array $data): array
    {
        $context->require('pos:refund:write');
        return app(TransactionService::class)->once($context, $key, 'refund.create:'.$saleId, $data, function () use ($context, $saleId, $data) {
            $sale = $context->scoped('pos_sales', $saleId);
            app(ShiftService::class)->active($context, (int) $data['shift_id']);
            if ($sale->status === 'voided' || $sale->payment_status !== 'settled') {
                throw new PosException('SALE_NOT_REFUNDABLE', 'The sale must be settled and not voided.', 409);
            }
            if (DB::table('pos_refunds')->where('client_refund_id', $data['client_refund_id'])->exists()) {
                throw new PosException('REFUND_ID_CONFLICT', 'This refund identifier already exists.', 409);
            }
            if ($context->device && $data['method'] !== 'cash') {
                throw new PosException('OFFLINE_CASH_ONLY', 'Device returns can record cash refunds only.', 409);
            }
            $lines = DB::table('pos_sale_lines')->where('sale_id', $saleId)
                ->whereIn('id', array_column($data['lines'], 'sale_line_id'))->orderBy('stock_id')->lockForUpdate()->get()->keyBy('id');
            if ($lines->count() !== count($data['lines'])) {
                throw new PosException('SALE_LINE_NOT_FOUND', 'A return line does not belong to this sale.', 404);
            }
            app(InventoryService::class)->lockStocks($context, $lines->pluck('stock_id')->all(), false);
            $amount = 0; $returns = [];
            foreach ($data['lines'] as $input) {
                $line = $lines[$input['sale_line_id']];
                $newQty = (int) $line->returned_quantity + $input['quantity'];
                if ($input['quantity'] < 1 || $newQty > $line->quantity) {
                    throw new PosException('RETURN_QUANTITY_EXCEEDED', 'The return exceeds the remaining sold quantity.', 409);
                }
                // Cumulative allocation preserves every minor unit across partial returns.
                $lineAmount = intdiv((int) $line->total_minor * $newQty, (int) $line->quantity)
                    - intdiv((int) $line->total_minor * (int) $line->returned_quantity, (int) $line->quantity);
                $lineTax = intdiv((int) $line->tax_minor * $newQty, (int) $line->quantity)
                    - intdiv((int) $line->tax_minor * (int) $line->returned_quantity, (int) $line->quantity);
                $lineDiscount = intdiv((int) $line->discount_minor * $newQty, (int) $line->quantity)
                    - intdiv((int) $line->discount_minor * (int) $line->returned_quantity, (int) $line->quantity);
                $amount = Money::bound($amount + $lineAmount);
                $returns[] = ['line' => $line, 'quantity' => $input['quantity'], 'restock' => (bool) $input['restock'],
                    'amount_minor' => $lineAmount, 'tax_minor' => $lineTax, 'discount_minor' => $lineDiscount];
            }
            $paidByMethod = (int) DB::table('pos_tenders')->where('sale_id', $saleId)->where('method', $data['method'])->sum('amount_minor');
            $returnedByMethod = (int) DB::table('pos_refunds')->where('sale_id', $saleId)->where('method', $data['method'])->sum('amount_minor');
            if ($amount < 1 || $amount + $returnedByMethod > $paidByMethod) {
                throw new PosException('REFUND_TENDER_LIMIT', 'The refund exceeds the remaining original tender balance.');
            }
            if ($data['method'] === 'cash' && app(ShiftService::class)->expected((int) $data['shift_id']) < $amount) {
                throw new PosException('INSUFFICIENT_TILL_CASH', 'The shift cannot cover this cash refund.', 409);
            }
            $id = DB::table('pos_refunds')->insertGetId([
                'client_refund_id' => $data['client_refund_id'], 'sale_id' => $saleId, 'shift_id' => $data['shift_id'],
                'seller_id' => $context->sellerId, 'cashier_id' => $context->actor->id, 'method' => $data['method'],
                'status' => $data['method'] === 'cash' ? 'completed' : 'pending', 'amount_minor' => $amount,
                'reason' => $data['reason'], 'created_at' => now('UTC'), 'updated_at' => now('UTC'),
            ]);
            foreach ($returns as $return) {
                $line = $return['line'];
                DB::table('pos_refund_lines')->insert(['refund_id' => $id, 'sale_line_id' => $line->id,
                    'quantity' => $return['quantity'], 'amount_minor' => $return['amount_minor'], 'restock' => $return['restock'],
                    'tax_minor' => $return['tax_minor'], 'discount_minor' => $return['discount_minor'],
                    'created_at' => now('UTC'), 'updated_at' => now('UTC')]);
                DB::table('pos_sale_lines')->where('id', $line->id)->increment('returned_quantity', $return['quantity']);
                if ($return['restock']) {
                    app(InventoryService::class)->online($context, (int) $line->stock_id, $return['quantity'], 'return', (string) $id);
                }
                DB::table('products')->where('id', $line->product_id)
                    ->update(['num_of_sale' => DB::raw('CASE WHEN num_of_sale >= '.(int) $return['quantity'].' THEN num_of_sale - '.(int) $return['quantity'].' ELSE 0 END')]);
            }
            $refunded = (int) $sale->refunded_minor + $amount;
            DB::table('pos_sales')->where('id', $saleId)->update([
                'refunded_minor' => $refunded, 'status' => $refunded === (int) $sale->total_minor ? 'returned' : 'partially_returned',
                'updated_at' => now('UTC'),
            ]);
            // Keep historical order totals intact. POS ledgers report net revenue and returns.
            app(AuditService::class)->record($context, 'refund.create', (string) $id, $data + ['amount_minor' => $amount]);
            app(CatalogService::class)->publish($context->sellerId, 'refund', (string) $id, 'upsert',
                ['refund_id' => $id, 'sale_id' => $saleId, 'register_id' => (int) $sale->register_id, 'amount_minor' => $amount]);
            return ['refund_id' => $id, 'sale_id' => $saleId, 'amount_minor' => $amount,
                'status' => $data['method'] === 'cash' ? 'completed' : 'pending'];
        });
    }

    public function verify(PosContext $context, string $key, int $id, array $data): array
    {
        $context->require('pos:payment:verify');
        return app(TransactionService::class)->once($context, $key, 'refund.verify:'.$id, $data, function () use ($context, $id, $data) {
            $refund = $context->scoped('pos_refunds', $id);
            $context->scoped('pos_sales', (int) $refund->sale_id);
            if ($refund->status !== 'pending') {
                throw new PosException('REFUND_NOT_PENDING', 'The refund is not awaiting external confirmation.', 409);
            }
            $settlement = hash('sha256', $refund->method.'|'.$data['reference']);
            if (DB::table('pos_refunds')->where('settlement_key', $settlement)->exists()) {
                throw new PosException('SETTLEMENT_REFERENCE_USED', 'This refund reference has already been used.', 409);
            }
            DB::table('pos_refunds')->where('id', $id)->update([
                'status' => 'completed', 'reference' => $data['reference'], 'settlement_key' => $settlement,
                'evidence' => $data['evidence'], 'verified_by' => $context->actor->id, 'updated_at' => now('UTC'),
            ]);
            app(AuditService::class)->record($context, 'refund.manual_verify', (string) $id, $data);
            return ['refund_id' => $id, 'status' => 'completed', 'verification' => 'manual_verified'];
        });
    }

    public function void(PosContext $context, string $key, int $id, array $data): array
    {
        $context->require('pos:void:write');
        return app(TransactionService::class)->once($context, $key, 'sale.void:'.$id, $data, function () use ($context, $id, $data) {
            $sale = $context->scoped('pos_sales', $id);
            app(ShiftService::class)->active($context, (int) $sale->shift_id);
            if ($sale->inventory_mode !== 'online' || $sale->status !== 'completed' || $sale->payment_status !== 'pending' ||
                DB::table('pos_tenders')->where('sale_id', $id)->whereIn('status', ['verified', 'manual_verified'])->exists() ||
                DB::table('pos_refunds')->where('sale_id', $id)->exists()) {
                throw new PosException('VOID_NOT_ALLOWED', 'Only an unsettled online sale without collected tenders can be voided. Use returns for paid sales.', 409);
            }
            $lines = DB::table('pos_sale_lines')->where('sale_id', $id)->orderBy('stock_id')->get();
            app(InventoryService::class)->lockStocks($context, $lines->pluck('stock_id')->all(), false);
            foreach ($lines as $line) {
                app(InventoryService::class)->online($context, (int) $line->stock_id, (int) $line->quantity, 'void', (string) $id);
                DB::table('products')->where('id', $line->product_id)
                    ->update(['num_of_sale' => DB::raw('CASE WHEN num_of_sale >= '.(int) $line->quantity.' THEN num_of_sale - '.(int) $line->quantity.' ELSE 0 END')]);
            }
            DB::table('pos_tenders')->where('sale_id', $id)->update(['status' => 'voided', 'updated_at' => now('UTC')]);
            DB::table('pos_sales')->where('id', $id)->update(['status' => 'voided', 'payment_status' => 'voided', 'updated_at' => now('UTC')]);
            DB::table('orders')->where('id', $sale->order_id)->update(['delivery_status' => 'cancelled', 'payment_status' => 'unpaid', 'updated_at' => now('UTC')]);
            DB::table('order_details')->where('order_id', $sale->order_id)->update(['delivery_status' => 'cancelled', 'payment_status' => 'unpaid', 'updated_at' => now('UTC')]);
            app(AuditService::class)->record($context, 'sale.void', (string) $id, $data);
            return ['sale_id' => $id, 'status' => 'voided'];
        });
    }
}
