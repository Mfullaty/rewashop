<?php

namespace App\Pos\Support;

use Illuminate\Validation\Rule;

final class Schemas
{
    public static function base(): array
    {
        return ['seller_id' => 'prohibited', 'location_id' => 'prohibited', 'cashier_id' => 'prohibited', 'device_id' => 'prohibited',
            'payment_status' => 'prohibited', 'verified' => 'prohibited', 'schema_version' => 'sometimes|integer|in:1'];
    }

    public static function minor(bool $positive = false): array
    {
        return ['required', 'integer', 'min:'.($positive ? 1 : 0), 'max:'.config('pos.max_amount_minor')];
    }

    public static function sale(bool $offline = false): array
    {
        return self::base() + [
            'client_sale_id' => 'required|uuid', 'register_id' => 'required|integer|min:1',
            'shift_id' => $offline ? 'prohibited' : 'sometimes|integer|min:1',
            'client_shift_id' => $offline ? 'required|uuid' : 'prohibited',
            'inventory_mode' => $offline ? 'sometimes|in:catalog,reserved' : 'prohibited',
            'currency' => 'required|string|size:3', 'occurred_at' => $offline ? 'required|date' : 'sometimes|date',
            'grand_total_minor' => ['sometimes', 'integer', 'min:1', 'max:'.config('pos.max_amount_minor')],
            'customer' => 'sometimes|array:name,email,phone', 'customer.name' => 'required_with:customer|string|max:150',
            'customer.email' => 'nullable|email|max:200', 'customer.phone' => 'nullable|string|max:30',
            'customer_id' => 'prohibited',
            'lines' => 'required|array|min:1|max:'.config('pos.max_lines'),
            'lines.*' => 'required|array:stock_id,quantity,discount_minor,override_minor,override_reason,unit_price_minor,tax_minor,total_minor,allocation_id,policy_signature,catalog_policy',
            'lines.*.stock_id' => 'required|integer|min:1|distinct',
            'lines.*.quantity' => 'required|integer|min:1|max:'.config('pos.max_quantity'),
            'lines.*.discount_minor' => ['sometimes', 'integer', 'min:0', 'max:'.config('pos.max_amount_minor')],
            'lines.*.override_minor' => ['sometimes', 'integer', 'min:0', 'max:'.config('pos.max_amount_minor')],
            'lines.*.override_reason' => 'required_with:lines.*.override_minor|string|min:3|max:500',
            'lines.*.unit_price_minor' => [$offline ? 'required' : 'sometimes', 'integer', 'min:0', 'max:'.config('pos.max_amount_minor')],
            'lines.*.tax_minor' => [$offline ? 'required' : 'sometimes', 'integer', 'min:0', 'max:'.config('pos.max_amount_minor')],
            'lines.*.total_minor' => ['sometimes', 'integer', 'min:0', 'max:'.config('pos.max_amount_minor')],
            'lines.*.allocation_id' => $offline ? 'required_unless:inventory_mode,catalog|uuid' : 'prohibited',
            'lines.*.policy_signature' => $offline ? 'required_unless:inventory_mode,catalog|string|size:88' : 'prohibited',
            'lines.*.catalog_policy' => $offline ? 'required_if:inventory_mode,catalog|array' : 'prohibited',
            'tenders' => 'required|array|min:1|max:10',
            'tenders.*' => 'required|array:method,currency,amount_minor,received_minor,change_minor,reference',
            'tenders.*.method' => ['required', Rule::in(['cash', 'external_terminal', 'bank_transfer'])],
            'tenders.*.currency' => 'required|string|size:3', 'tenders.*.amount_minor' => self::minor(true),
            'tenders.*.received_minor' => ['sometimes', 'integer', 'min:0', 'max:'.config('pos.max_amount_minor')],
            'tenders.*.change_minor' => ['sometimes', 'integer', 'min:0', 'max:'.config('pos.max_amount_minor')],
            'tenders.*.reference' => 'nullable|string|max:100',
        ];
    }

    public static function shiftOpen(): array
    {
        return self::base() + ['client_shift_id' => 'required|uuid', 'register_id' => 'required|integer|min:1',
            'automatic' => 'sometimes|boolean', 'opening_minor' => self::minor(), 'occurred_at' => 'sometimes|date'];
    }

    public static function shiftClose(): array
    {
        return self::base() + ['counted_minor' => self::minor(), 'reason' => 'nullable|string|max:500', 'occurred_at' => 'sometimes|date'];
    }

    public static function cash(): array
    {
        return self::base() + ['amount_minor' => ['required', 'integer', 'between:-'.config('pos.max_amount_minor').','.config('pos.max_amount_minor')],
            'reason' => 'required|string|min:3|max:500'];
    }

    public static function refund(): array
    {
        return self::base() + ['client_refund_id' => 'required|uuid', 'shift_id' => 'required|integer|min:1',
            'method' => ['required', Rule::in(['cash', 'external_terminal', 'bank_transfer'])],
            'reason' => 'required|string|min:3|max:500',
            'lines' => 'required|array|min:1|max:'.config('pos.max_lines'),
            'lines.*' => 'required|array:sale_line_id,quantity,restock',
            'lines.*.sale_line_id' => 'required|integer|min:1|distinct',
            'lines.*.quantity' => 'required|integer|min:1|max:'.config('pos.max_quantity'),
            'lines.*.restock' => 'required|boolean'];
    }

    public static function evidence(): array
    {
        return self::base() + ['reference' => 'required|string|min:3|max:100', 'evidence' => 'required|string|min:10|max:2000'];
    }

    public static function forAction(string $action): array
    {
        return match ($action) {
            'sale' => self::sale(), 'shiftOpen' => self::shiftOpen(), 'shiftClose' => self::shiftClose(),
            'cash' => self::cash(), 'refund' => self::refund(), 'verifyTender', 'verifyRefund' => self::evidence(),
            'void', 'revoke' => self::base() + ['reason' => 'required|string|min:3|max:500'],
            'pairStart' => ['name' => 'required|string|max:100'],
            'pairConfirm' => ['pairing_id' => 'required|uuid', 'pairing_secret' => 'required|string|size:64'],
            'pairApprove' => [
                'seller_id' => 'prohibited', 'pairing_id' => 'required|uuid', 'register_id' => 'required|integer|min:1',
                'cashier_id' => 'required|integer|exists:users,id',
                'abilities' => 'required|array|min:1', 'abilities.*' => ['required', 'distinct', Rule::in(config('pos.permissions'))],
                'offline_allowed' => 'sometimes|boolean', 'max_reserved_units' => 'sometimes|integer|min:1|max:10000',
                'existing_device_id' => 'sometimes|uuid',
                'reauthorization_reason' => 'required_with:existing_device_id|string|min:3|max:500',
                'max_offline_sale_minor' => ['sometimes', 'integer', 'min:1', 'max:'.config('pos.max_amount_minor')],
                'max_offline_budget_minor' => ['sometimes', 'integer', 'min:1', 'max:'.config('pos.max_amount_minor')],
            ],
            'allocate' => self::base() + ['lines' => 'required|array|min:1|max:200',
                'lines.*' => 'required|array:stock_id,quantity', 'lines.*.stock_id' => 'required|integer|min:1|distinct',
                'lines.*.quantity' => 'required|integer|min:1|max:'.config('pos.max_quantity')],
            'reconcile' => self::base() + ['checkpoint_sequence' => 'required|integer|min:0', 'pending_events' => 'required|integer|in:0',
                'allocations' => 'required|array|min:1|max:200', 'allocations.*' => 'required|array:allocation_id,consumed_quantity',
                'allocations.*.allocation_id' => 'required|uuid|distinct', 'allocations.*.consumed_quantity' => 'required|integer|min:0|max:10000'],
            'push' => ['schema_version' => 'required|integer|in:1', 'device_id' => 'required|uuid', 'seller_id' => 'prohibited',
                'events' => 'required|array|min:1|max:'.config('pos.max_batch'),
                'events.*' => 'required|array:event_id,local_sequence,type,payload',
                'events.*.event_id' => 'required|uuid|distinct', 'events.*.local_sequence' => 'required|integer|min:1|distinct',
                'events.*.type' => 'required|string|max:32', 'events.*.payload' => 'required|array'],
            'status' => ['event_ids' => 'required|array|min:1|max:100', 'event_ids.*' => 'required|uuid|distinct'],
            'search' => ['q' => 'nullable|string|max:150', 'barcode' => 'nullable|string|max:255', 'sku' => 'nullable|string|max:255',
                'category_id' => 'sometimes|integer|min:1', 'brand_id' => 'sometimes|integer|min:1',
                'stock_id' => 'sometimes|integer|min:1',
                'after' => 'sometimes|integer|min:0', 'limit' => 'sometimes|integer|min:1|max:200'],
            'snapshot' => ['snapshot_id' => 'sometimes|uuid', 'after' => 'sometimes|integer|min:0', 'limit' => 'sometimes|integer|min:1|max:2000'],
            'changes', 'pull' => ['cursor' => 'sometimes|integer|min:0', 'limit' => 'sometimes|integer|min:1|max:2000'],
            'sales', 'report' => ['from' => 'sometimes|date', 'to' => 'sometimes|date|after_or_equal:from',
                'register_id' => 'sometimes|integer|min:1', 'page' => 'sometimes|integer|min:1'],
            'registerCreate' => self::base() + ['code' => 'required|alpha_dash|max:40', 'name' => 'required|string|max:150'],
            'staff' => self::base() + ['user_id' => 'required|integer|exists:users,id',
                'abilities' => 'required|array', 'abilities.*' => ['required', 'distinct', Rule::in(config('pos.permissions'))],
                'register_ids' => 'required|array|min:1|max:100', 'register_ids.*' => 'required|integer|min:1|distinct',
                'max_discount_bps' => 'required|integer|min:0|max:10000', 'active' => 'required|boolean'],
            'settingsUpdate' => self::base() + ['receipt_footer' => 'sometimes|string|max:500', 'tax_inclusive' => 'sometimes|boolean',
                'receipt_name' => 'sometimes|string|min:1|max:150', 'receipt_logo_url' => 'sometimes|nullable|url:https|max:2048',
                'receipt_address' => 'sometimes|nullable|string|max:500', 'receipt_phone' => 'sometimes|nullable|string|max:50',
                'receipt_email' => 'sometimes|nullable|email|max:200', 'receipt_tax_details' => 'sometimes|nullable|string|max:250',
                'sellers_enabled' => 'sometimes|boolean'],
            'adjust' => self::base() + ['stock_id' => 'required|integer|min:1', 'quantity' => 'required|integer|min:0|max:2147483647',
                'reason' => 'required|string|min:3|max:500'],
            'reprint' => self::base() + ['reason' => 'required|string|min:3|max:500'],
            default => [],
        };
    }
}
