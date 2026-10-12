<?php

namespace App\Http\Controllers\Api\Pos\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Pos\PosRequest;
use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use App\Pos\Services\AllocationService;
use App\Pos\Services\AuditService;
use App\Pos\Services\AuthorizationService;
use App\Pos\Services\CatalogService;
use App\Pos\Services\InventoryService;
use App\Pos\Services\PairingService;
use App\Pos\Services\RefundService;
use App\Pos\Services\SalePostingService;
use App\Pos\Services\ShiftService;
use App\Pos\Services\SyncService;
use App\Pos\Services\TenderService;
use App\Pos\Services\TransactionService;
use App\Pos\Support\Payload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PosController extends Controller
{
    private function context(Request $request): PosContext { return $request->attributes->get('pos_context'); }
    private function key(Request $request): string { return (string) $request->header('Idempotency-Key', ''); }

    public function health()
    {
        return response()->json(['service' => 'rewashop-pos', 'schema_version' => 1, 'enabled' => (bool) config('pos.enabled')]);
    }

    public function capabilities(Request $request)
    {
        return response()->json(['schema_version' => 1, 'money' => 'integer_minor_units',
            'max_batch' => config('pos.max_batch'), 'max_body_bytes' => config('pos.max_body_bytes'),
            'offline_allocations' => (bool) config('pos.offline_enabled'), 'offline_tenders' => ['cash'],
            'tenders' => ['cash', 'external_terminal', 'bank_transfer'], 'gateway_capture' => false,
            'stock_pool' => 'one_global_pool_per_merchant', 'sync_events' => [
                'shift.opened', 'sale.completed', 'refund.created', 'cash.moved', 'shift.closed', 'receipt.reprinted'],
            'abilities' => $this->context($request)->abilities]);
    }

    public function bootstrap(Request $request)
    {
        $c = $this->context($request); $c->require('pos:catalog:read');
        $registers = DB::table('pos_registers')->where('seller_id', $c->sellerId)->where('active', true);
        if ($c->device) { $registers->where('id', $c->device->register_id); }
        elseif ($c->registerIds) { $registers->whereIn('id', $c->registerIds); }
        $settings = DB::table('pos_settings')->where('seller_id', $c->sellerId)->first();
        return response()->json(['schema_version' => 1, 'seller_id' => $c->sellerId, 'owner_type' => $c->ownerType,
            'currency' => $c->currency, 'minor_exponent' => 2, 'cashier_id' => $c->actor->id,
            'registers' => $registers->get(), 'settings' => json_decode($settings->settings, true),
            'catalog_cursor' => (int) $settings->change_sequence,
            'device_id' => $c->device?->id, 'last_sequence' => $c->device?->last_sequence,
            'max_discount_bps' => $c->maxDiscountBps, 'abilities' => $c->abilities,
            'offline_policy_key' => app(\App\Pos\Services\OfflinePolicySigner::class)->publicKey()]);
    }

    public function search(PosRequest $request)
    {
        $c = $this->context($request); $c->require('pos:catalog:read'); $data = $request->validated();
        $q = app(AuthorizationService::class)->stocks($c)->where('s.id', '>', (int) ($data['after'] ?? 0));
        if (!empty($data['barcode'])) { $q->where('p.barcode', $data['barcode']); }
        if (!empty($data['sku'])) { $q->where('s.sku', $data['sku']); }
        if (!empty($data['q'])) {
            $term = $data['q'];
            $q->where(fn ($w) => $w->where('p.name', 'like', '%'.addcslashes($term, '%_\\').'%')
                ->orWhere('p.barcode', $term)->orWhere('s.sku', $term));
        }
        $limit = (int) ($data['limit'] ?? 50);
        $ids = $q->orderBy('s.id')->limit($limit + 1)->pluck('s.id');
        $more = $ids->count() > $limit; $ids = $ids->take($limit);
        // Read the actual scoped records for fresh prices; the feed is for offline caches.
        $settings = DB::table('pos_settings')->where('seller_id', $c->sellerId)->first();
        $products = DB::table('products')->whereIn('id', DB::table('product_stocks')->whereIn('id', $ids)->select('product_id'))->get()->keyBy('id');
        $stocks = DB::table('product_stocks')->whereIn('id', $ids)->orderBy('id')->get();
        $pricing = app(\App\Pos\Services\PricingService::class);
        $pricing->prime($products->keys()->all());
        $result = $stocks->map(fn ($s) => $pricing->snapshot($s, $products[$s->product_id], $settings)
            + ['available_quantity' => (int) $s->qty]);
        return response()->json(['data' => $result, 'has_more' => $more, 'next_after' => $ids->last() ?? (int) ($data['after'] ?? 0)]);
    }

    public function snapshot(PosRequest $r) { $d = $r->validated(); return response()->json(app(CatalogService::class)->snapshot($this->context($r), $d['snapshot_id'] ?? null, (int) ($d['after'] ?? 0), (int) ($d['limit'] ?? 500))); }
    public function changes(PosRequest $r) { $d = $r->validated(); return response()->json(app(CatalogService::class)->changes($this->context($r), (int) ($d['cursor'] ?? 0), (int) ($d['limit'] ?? 500))); }
    public function pull(PosRequest $r) { $d = $r->validated(); return response()->json(app(CatalogService::class)->changes($this->context($r), (int) ($d['cursor'] ?? 0), (int) ($d['limit'] ?? 500), false)); }
    public function pairStart(PosRequest $r) { return response()->json(app(PairingService::class)->start($r->validated()), 201); }
    public function pairConfirm(PosRequest $r) { return response()->json(app(PairingService::class)->claim($r->validated())); }
    public function pairApprove(PosRequest $r) { return response()->json(app(PairingService::class)->approve($this->context($r), $this->key($r), $r->validated())); }
    public function revoke(PosRequest $r, string $id) { return response()->json(app(PairingService::class)->revoke($this->context($r), $this->key($r), $id, $r->validated())); }
    public function sale(PosRequest $r) { return response()->json(app(SalePostingService::class)->post($this->context($r), $this->key($r), $r->validated()), 201); }
    public function shiftOpen(PosRequest $r) { return response()->json(app(ShiftService::class)->open($this->context($r), $this->key($r), $r->validated()), 201); }
    public function shiftClose(PosRequest $r, int $id) { return response()->json(app(ShiftService::class)->close($this->context($r), $this->key($r), $id, $r->validated())); }
    public function cash(PosRequest $r, int $id) { return response()->json(app(ShiftService::class)->cash($this->context($r), $this->key($r), $id, $r->validated())); }
    public function refund(PosRequest $r, int $id) { return response()->json(app(RefundService::class)->create($this->context($r), $this->key($r), $id, $r->validated()), 201); }
    public function void(PosRequest $r, int $id) { return response()->json(app(RefundService::class)->void($this->context($r), $this->key($r), $id, $r->validated())); }
    public function verifyTender(PosRequest $r, int $id) { return response()->json(app(TenderService::class)->verify($this->context($r), $this->key($r), $id, $r->validated())); }
    public function verifyRefund(PosRequest $r, int $id) { return response()->json(app(RefundService::class)->verify($this->context($r), $this->key($r), $id, $r->validated())); }
    public function allocate(PosRequest $r) { return response()->json(app(AllocationService::class)->request($this->context($r), $this->key($r), $r->validated()), 201); }
    public function reconcile(PosRequest $r) { return response()->json(app(AllocationService::class)->reconcile($this->context($r), $this->key($r), $r->validated())); }
    public function push(PosRequest $r) { return response()->json(app(SyncService::class)->push($this->context($r), $r->validated())); }

    public function allocations(Request $request)
    {
        $c = $this->context($request); $c->require('pos:inventory:read');
        if (!$c->device) { throw new PosException('DEVICE_REQUIRED', 'Device authentication is required.', 403); }
        return response()->json(['data' => DB::table('pos_stock_allocations')->where('seller_id', $c->sellerId)
            ->where('device_id', $c->device->id)->where('status', 'open')->orderBy('id')->get()->map(function ($row) {
                $row->price_snapshot = json_decode($row->price_snapshot, true);
                $row->signed_policy = json_decode($row->signed_policy, true); return $row;
            })]);
    }

    public function status(PosRequest $request)
    {
        $c = $this->context($request); $c->require('pos:sync');
        if (!$c->device) { throw new PosException('DEVICE_REQUIRED', 'Device authentication is required.', 403); }
        $ids = $request->validated()['event_ids'];
        $rows = DB::table('pos_sync_inbox')->where('device_id', $c->device->id)->where('seller_id', $c->sellerId)->whereIn('event_id', $ids)->get()->keyBy('event_id');
        return response()->json(['results' => array_map(fn ($id) => isset($rows[$id])
            ? json_decode($rows[$id]->result, true) : ['event_id' => $id, 'status' => 'unknown', 'durable' => false], $ids)]);
    }

    public function saleShow(Request $request, int $id)
    {
        $c = $this->context($request); $c->require('pos:sale:read'); $sale = $c->scoped('pos_sales', $id);
        return response()->json(['sale' => $sale, 'lines' => DB::table('pos_sale_lines')->where('sale_id', $id)->get()->map(function ($r) { $r->snapshot = json_decode($r->snapshot, true); return $r; }),
            'tenders' => DB::table('pos_tenders')->where('sale_id', $id)->get(), 'refunds' => DB::table('pos_refunds')->where('sale_id', $id)->get()]);
    }

    public function sales(PosRequest $r)
    {
        $c = $this->context($r); $c->require('pos:sale:read');
        return response()->json($this->salesQuery($c, $r->validated())->orderByDesc('id')->paginate(50));
    }

    private function salesQuery(PosContext $c, array $data)
    {
        $q = DB::table('pos_sales')->where('seller_id', $c->sellerId);
        if ($c->device) { $q->where('register_id', $c->device->register_id); }
        elseif ($c->registerIds) { $q->whereIn('register_id', $c->registerIds); }
        if (isset($data['register_id'])) { $c->register((int) $data['register_id']); $q->where('register_id', $data['register_id']); }
        if (isset($data['from'])) { $q->where('occurred_at', '>=', \Carbon\CarbonImmutable::parse($data['from'])->utc()); }
        if (isset($data['to'])) { $q->where('occurred_at', '<=', \Carbon\CarbonImmutable::parse($data['to'])->utc()); }
        return $q;
    }

    public function receipt(Request $r, int $id)
    {
        $c = $this->context($r); $c->require('pos:receipt:read'); $receipt = $c->scoped('pos_receipts', $id);
        $sale = $c->scoped('pos_sales', (int) $receipt->sale_id);
        return response()->json(['receipt' => json_decode($receipt->payload, true), 'current_sale_status' => $sale->status, 'current_payment_status' => $sale->payment_status]);
    }

    public function reprint(PosRequest $r, int $id)
    {
        $c = $this->context($r); $c->require('pos:receipt:reprint');
        return response()->json(app(TransactionService::class)->once($c, $this->key($r), 'receipt.reprint:'.$id, $r->validated(), function () use ($c, $r, $id) {
            $receipt = $c->scoped('pos_receipts', $id); $c->scoped('pos_sales', (int) $receipt->sale_id);
            app(AuditService::class)->record($c, 'receipt.reprint', (string) $id, $r->validated());
            return ['receipt' => json_decode($receipt->payload, true), 'duplicate_receipt' => true];
        }));
    }

    public function report(PosRequest $r)
    {
        $c = $this->context($r); $c->require('pos:report:read');
        $q = $this->salesQuery($c, $r->validated())->where('status', '!=', 'voided');
        $totals = (clone $q)->selectRaw('COUNT(*) as sales, COALESCE(SUM(total_minor),0) as gross_minor, COALESCE(SUM(tax_minor),0) as gross_tax_minor, COALESCE(SUM(discount_minor),0) as discount_minor')->first();
        foreach ($totals as $field => $value) { $totals->$field = (int) $value; }
        $refundQuery = DB::table('pos_refunds as r')->join('pos_shifts as h', 'h.id', '=', 'r.shift_id')->where('r.seller_id', $c->sellerId);
        if ($c->device) { $refundQuery->where('h.register_id', $c->device->register_id); }
        elseif ($c->registerIds) { $refundQuery->whereIn('h.register_id', $c->registerIds); }
        $filters = $r->validated();
        if (isset($filters['register_id'])) { $refundQuery->where('h.register_id', $filters['register_id']); }
        if (isset($filters['from'])) { $refundQuery->where('r.created_at', '>=', \Carbon\CarbonImmutable::parse($filters['from'])->utc()); }
        if (isset($filters['to'])) { $refundQuery->where('r.created_at', '<=', \Carbon\CarbonImmutable::parse($filters['to'])->utc()); }
        $totals->returns_minor = (int) (clone $refundQuery)->sum('r.amount_minor');
        $totals->net_minor = $totals->gross_minor - $totals->returns_minor;
        $totals->return_tax_minor = (int) DB::table('pos_refund_lines')->whereIn('refund_id', (clone $refundQuery)->select('r.id'))->sum('tax_minor');
        $totals->net_tax_minor = $totals->gross_tax_minor - $totals->return_tax_minor;
        $refunds = (clone $refundQuery)->where('r.status', 'pending')->sum('r.amount_minor');
        $pending = (clone $q)->where('payment_status', 'pending')->sum('total_minor');
        $tenders = DB::table('pos_tenders')->whereIn('sale_id', (clone $q)->select('id'))->selectRaw('method, status, SUM(amount_minor) as amount_minor')
            ->groupBy('method', 'status')->get()->map(function ($row) { $row->amount_minor = (int) $row->amount_minor; return $row; });
        return response()->json(['currency' => $c->currency, 'totals' => $totals, 'tenders' => $tenders,
            'unsettled_sales_minor' => (int) $pending, 'pending_refund_payouts_minor' => (int) $refunds]);
    }

    public function registers(Request $r)
    {
        $c = $this->context($r); $c->require('pos:catalog:read');
        $q = DB::table('pos_registers')->where('seller_id', $c->sellerId);
        if ($c->registerIds) { $q->whereIn('id', $c->registerIds); }
        if ($c->device) { $q->where('id', $c->device->register_id); }
        return response()->json(['data' => $q->orderBy('id')->get()]);
    }

    public function registerCreate(PosRequest $r)
    {
        $c = $this->context($r); $c->require('pos:settings:manage'); $data = $r->validated();
        return response()->json(app(TransactionService::class)->once($c, $this->key($r), 'register.create', $data, function () use ($c, $data) {
            if (DB::table('pos_registers')->where('seller_id', $c->sellerId)->where('code', $data['code'])->exists()) {
                throw new PosException('REGISTER_CODE_USED', 'This register code already exists.', 409);
            }
            $locationId = DB::table('pos_locations')->where('seller_id', $c->sellerId)->where('active', true)->orderBy('id')->value('id');
            $id = DB::table('pos_registers')->insertGetId(['seller_id' => $c->sellerId, 'location_id' => $locationId,
                'code' => $data['code'], 'name' => $data['name'], 'created_at' => now('UTC'), 'updated_at' => now('UTC')]);
            app(AuditService::class)->record($c, 'register.create', (string) $id, $data);
            return ['register_id' => $id];
        }), 201);
    }

    public function devices(Request $r)
    {
        $c = $this->context($r); $c->require('pos:device:manage');
        $q = DB::table('pos_devices')->where('seller_id', $c->sellerId);
        if ($c->registerIds) { $q->whereIn('register_id', $c->registerIds); }
        return response()->json(['data' => $q->orderByDesc('created_at')->paginate(50)]);
    }

    public function staff(PosRequest $r)
    {
        $c = $this->context($r); $c->require('pos:staff:manage'); $data = $r->validated();
        return response()->json(app(TransactionService::class)->once($c, $this->key($r), 'staff.update', $data, function () use ($c, $data) {
            foreach ($data['register_ids'] as $id) { $c->register((int) $id); }
            if (array_diff($data['abilities'], $c->abilities) || $data['max_discount_bps'] > $c->maxDiscountBps) {
                throw new PosException('PERMISSION_DENIED', 'Delegated permissions cannot exceed your own.', 403);
            }
            DB::table('pos_cashier_permissions')->updateOrInsert(['seller_id' => $c->sellerId, 'user_id' => $data['user_id']],
                ['abilities' => Payload::json($data['abilities']), 'register_ids' => Payload::json(array_map('intval', $data['register_ids'])),
                    'max_discount_bps' => $data['max_discount_bps'], 'active' => $data['active'], 'created_at' => now('UTC'), 'updated_at' => now('UTC')]);
            app(AuditService::class)->record($c, 'staff.update', (string) $data['user_id'], $data);
            return ['user_id' => $data['user_id'], 'active' => (bool) $data['active']];
        }));
    }

    public function settingsUpdate(PosRequest $r)
    {
        $c = $this->context($r); $c->require('pos:settings:manage'); $data = $r->validated();
        return response()->json(app(TransactionService::class)->once($c, $this->key($r), 'settings.update', $data, function () use ($c, $data) {
            $old = json_decode(DB::table('pos_settings')->where('seller_id', $c->sellerId)->value('settings'), true);
            $settings = array_replace($old, $data);
            DB::table('pos_settings')->where('seller_id', $c->sellerId)->update(['settings' => Payload::json($settings), 'updated_at' => now('UTC')]);
            app(AuditService::class)->record($c, 'settings.update', (string) $c->sellerId, $data);
            return ['settings' => $settings, 'catalog_rebuild_required' => array_key_exists('tax_inclusive', $data)];
        }));
    }

    public function adjust(PosRequest $r)
    {
        $c = $this->context($r); $c->require('pos:inventory:write'); $data = $r->validated();
        return response()->json(app(TransactionService::class)->once($c, $this->key($r), 'stock.adjust', $data, function () use ($c, $data) {
            $stocks = app(InventoryService::class)->lockStocks($c, [$data['stock_id']], false);
            $stock = $stocks[$data['stock_id']];
            // This count is explicitly the online bucket, excluding device reserves.
            app(InventoryService::class)->online($c, (int) $stock->id, $data['quantity'] - (int) $stock->qty, 'adjustment', $this->key(request()));
            app(AuditService::class)->record($c, 'stock.adjust', (string) $stock->id, $data + ['previous_quantity' => (int) $stock->qty]);
            return ['stock_id' => (int) $stock->id, 'available_quantity' => $data['quantity']];
        }));
    }
}
