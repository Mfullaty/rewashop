<?php

namespace App\Pos\Services;

use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use App\Pos\Support\Money;
use Illuminate\Support\Facades\DB;

class TenderService
{
    public function validate(array $tenders, int $total, string $currency, bool $offline): array
    {
        $sum = 0; $result = [];
        foreach ($tenders as $t) {
            if ($t['currency'] !== $currency || !in_array($t['method'], ['cash', 'external_terminal', 'bank_transfer'], true) ||
                (int) $t['amount_minor'] <= 0) {
                throw new PosException('INVALID_TENDER', 'A supported tender in the store currency is required.');
            }
            if ($offline && $t['method'] !== 'cash') {
                throw new PosException('OFFLINE_CASH_ONLY', 'Offline sale ingestion accepts cash tenders only.', 409);
            }
            $amount = (int) $t['amount_minor']; $received = (int) ($t['received_minor'] ?? $amount);
            $change = (int) ($t['change_minor'] ?? ($t['method'] === 'cash' ? $received - $amount : 0));
            if ($t['method'] === 'cash' && ($received < $amount || $change !== $received - $amount)) {
                throw new PosException('INVALID_CHANGE', 'Cash received, applied amount and change do not reconcile.');
            }
            if ($t['method'] !== 'cash' && ($change !== 0 || $received !== $amount || empty($t['reference']))) {
                throw new PosException('PAYMENT_REFERENCE_REQUIRED', 'External payments require a reference and cannot produce cash change.');
            }
            Money::bound($received); $sum = Money::bound($sum + $amount);
            $result[] = ['method' => $t['method'], 'currency' => $currency, 'amount_minor' => $amount,
                'received_minor' => $received, 'change_minor' => $change,
                'reference' => $t['reference'] ?? null, 'status' => $t['method'] === 'cash' ? 'verified' : 'pending'];
        }
        if ($sum !== $total || $total <= 0) {
            throw new PosException('TENDER_TOTAL_MISMATCH', 'Applied tenders must equal the positive sale total.');
        }
        return $result;
    }

    public function verify(PosContext $context, string $key, int $id, array $data): array
    {
        $context->require('pos:payment:verify');
        return app(TransactionService::class)->once($context, $key, 'tender.verify:'.$id, $data, function () use ($context, $id, $data) {
            $tender = $context->scoped('pos_tenders', $id);
            $sale = $context->scoped('pos_sales', (int) $tender->sale_id);
            if ($tender->status !== 'pending' || $sale->status === 'voided') {
                throw new PosException('TENDER_NOT_PENDING', 'Only pending external tenders can be verified.', 409);
            }
            $settlement = hash('sha256', $tender->method.'|'.$data['reference']);
            if (DB::table('pos_tenders')->where('settlement_key', $settlement)->exists()) {
                throw new PosException('SETTLEMENT_REFERENCE_USED', 'This settlement reference has already been used.', 409);
            }
            DB::table('pos_tenders')->where('id', $id)->update([
                'status' => 'manual_verified', 'reference' => $data['reference'], 'settlement_key' => $settlement,
                'evidence' => $data['evidence'], 'verified_by' => $context->actor->id,
                'verified_at' => now('UTC'), 'updated_at' => now('UTC'),
            ]);
            $pending = DB::table('pos_tenders')->where('sale_id', $sale->id)->where('status', 'pending')->exists();
            if (!$pending) {
                DB::table('pos_sales')->where('id', $sale->id)->update(['payment_status' => 'settled', 'updated_at' => now('UTC')]);
                DB::table('orders')->where('id', $sale->order_id)->update(['payment_status' => 'paid', 'updated_at' => now('UTC')]);
                DB::table('order_details')->where('order_id', $sale->order_id)->update(['payment_status' => 'paid', 'updated_at' => now('UTC')]);
            }
            app(AuditService::class)->record($context, 'tender.manual_verify', (string) $id, $data);
            return ['tender_id' => $id, 'verification' => 'manual_verified', 'payment_status' => $pending ? 'pending' : 'settled'];
        });
    }
}
