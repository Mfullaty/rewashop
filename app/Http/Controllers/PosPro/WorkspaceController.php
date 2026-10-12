<?php

namespace App\Http\Controllers\PosPro;

use App\Http\Controllers\Controller;
use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use App\Pos\Services\AuditService;
use App\Pos\Services\AuthorizationService;
use App\Pos\Services\CatalogService;
use App\Pos\Services\ShiftService;
use App\Pos\Services\TransactionService;
use App\Pos\Support\Payload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class WorkspaceController extends Controller
{
    private function context(Request $r): PosContext { return $r->attributes->get('pos_context'); }

    public function admin(Request $r) { return $this->screen($r, 'admin'); }
    public function seller(Request $r) { return $this->screen($r, 'seller'); }

    private function screen(Request $r, string $area)
    {
        if (!config('pos.enabled') || !Schema::hasTable('pos_web_drafts')) {
            return response()->view('addons.rewa-pos.setup', [], 503);
        }
        $c = app(AuthorizationService::class)->context($r->user(), null, $r->integer('register_id') ?: null);
        $c->require('pos:catalog:read');
        if ($c->ownerType !== $area) { abort(403, 'This store belongs in the other POS workspace.'); }
        return response()->view('addons.rewa-pos.workspace', ['assetVersion' => $r->attributes->get('pos_addon_version', '1.0'), 'configuration' => [
            'coreUrl' => url('/pos/backend'), 'webUrl' => url('/rewa-pos/web'),
            'registerId' => $r->integer('register_id') ?: null, 'csrf' => csrf_token(),
            'backUrl' => url($area === 'admin' ? '/admin' : '/seller/dashboard'),
            'area' => $area,
        ]]);
    }

    public function workspace(Request $r)
    {
        $c = $this->context($r); $c->require('pos:catalog:read');
        $owner = DB::table('users')->where('id', $c->sellerId)->first();
        $name = $c->ownerType === 'seller' ? DB::table('shops')->where('user_id', $c->sellerId)->value('name') : $owner->name;
        $stocks = app(AuthorizationService::class)->stocks($c);
        $categories = Schema::hasTable('categories') ? DB::table('categories')
            ->whereIn('id', (clone $stocks)->select('p.category_id'))->select('id', 'name')->orderBy('name')->get() : [];
        $brands = Schema::hasTable('brands') ? DB::table('brands')
            ->whereIn('id', (clone $stocks)->select('p.brand_id'))->select('id', 'name')->orderBy('name')->get() : [];
        return response()->json(['store_name' => $name, 'cashier_name' => $c->actor->name,
            'categories' => $categories, 'brands' => $brands, 'delegatable_abilities' => $c->abilities]);
    }

    public function shifts(Request $r)
    {
        $c = $this->context($r); $c->require('pos:shift:write');
        $d = $r->validate(['register_id' => 'required|integer|min:1']);
        $c->register((int) $d['register_id']);
        $rows = DB::table('pos_shifts')->where('seller_id', $c->sellerId)->where('register_id', $d['register_id'])->orderByDesc('id')->limit(50)->get();
        $names = DB::table('users')->whereIn('id', $rows->pluck('cashier_id'))->pluck('name', 'id');
        return response()->json(['data' => $rows->map(function ($shift) use ($c, $names) {
                $shift->expected_minor = $shift->status === 'open' ? app(ShiftService::class)->expected((int) $shift->id) : (int) $shift->expected_minor;
                $shift->is_own = (int) $shift->cashier_id === (int) $c->actor->id && !$shift->device_id;
                $shift->cashier_name = $names[$shift->cashier_id] ?? 'Former cashier';
                return $shift;
            })]);
    }

    public function staff(Request $r)
    {
        $c = $this->context($r); $c->require('pos:staff:manage');
        return response()->json(['data' => DB::table('pos_cashier_permissions as p')->join('users as u', 'u.id', '=', 'p.user_id')
            ->where('p.seller_id', $c->sellerId)->select('p.*', 'u.name')->orderBy('u.name')->get()->map(function ($row) {
                $row->abilities = json_decode($row->abilities, true); $row->register_ids = json_decode($row->register_ids, true); return $row;
            })]);
    }

    public function products(Request $r)
    {
        $c = $this->context($r); $c->require('pos:settings:manage');
        $d = $r->validate(['q' => 'nullable|string|max:150', 'page' => 'sometimes|integer|min:1']);
        $q = DB::table('products')->where('added_by', $c->ownerType);
        if ($c->ownerType === 'seller') { $q->where('user_id', $c->sellerId); }
        if (!empty($d['q'])) { $q->where('name', 'like', '%'.addcslashes($d['q'], '%_\\').'%'); }
        return response()->json($q->select('id', 'name', 'pos', 'published', 'approved', 'digital', 'auction_product', 'wholesale_product', 'barcode')
            ->orderBy('id')->paginate(50));
    }

    public function productUpdate(Request $r, int $id)
    {
        $c = $this->context($r); $c->require('pos:settings:manage'); $d = $r->validate(['pos' => 'required|boolean']);
        return response()->json(app(TransactionService::class)->once($c, (string) $r->header('Idempotency-Key'), 'web.product:'.$id, $d, function () use ($c, $id, $d) {
            $q = DB::table('products')->where('added_by', $c->ownerType)->where('id', $id);
            if ($c->ownerType === 'seller') { $q->where('user_id', $c->sellerId); }
            if (!(clone $q)->exists()) { throw new PosException('NOT_FOUND', 'This product is outside your store.', 404); }
            $q->update(['pos' => $d['pos'], 'updated_at' => now('UTC')]);
            app(CatalogService::class)->product($id);
            app(AuditService::class)->record($c, 'web.product.visibility', (string) $id, $d);
            return ['product_id' => $id, 'pos' => (bool) $d['pos']];
        }));
    }

    private function draftQuery(PosContext $c, int $register)
    {
        $c->require('pos:sale:write'); $c->register($register);
        return DB::table('pos_web_drafts')->where('seller_id', $c->sellerId)->where('cashier_id', $c->actor->id)
            ->where('register_id', $register)->where('expires_at', '>', now('UTC'));
    }

    public function drafts(Request $r)
    {
        $d = $r->validate(['register_id' => 'required|integer|min:1']);
        return response()->json(['data' => $this->draftQuery($this->context($r), $d['register_id'])->orderByDesc('updated_at')->limit(50)->get()->map(function ($row) {
            $row->payload = json_decode($row->payload, true); return $row;
        })]);
    }

    public function draftSave(Request $r, string $id)
    {
        $c = $this->context($r);
        $d = $r->validate(['register_id' => 'required|integer|min:1', 'label' => 'required|string|max:100',
            'revision' => 'required|integer|min:0', 'payload' => 'required|array:lines,customer,intent',
            'payload.lines' => 'present|array|max:200', 'payload.lines.*' => 'required|array:item,quantity,discount_minor,override_minor,override_reason',
            'payload.lines.*.item' => 'required|array:stock_id,product_id,name,variant,sku,barcode,category_id,brand_id,unit,image_id,image_url,base_price_minor,promotion_minor,unit_price_minor,tax_rules,tax_inclusive,gst_bps,currency,price_version,next_price_boundary,max_discount_bps,available_quantity',
            'payload.lines.*.item.stock_id' => 'required|integer|min:1',
            'payload.lines.*.quantity' => 'required|integer|min:1|max:10000',
            'payload.customer' => 'sometimes|nullable|array:name,email,phone',
            'payload.customer.name' => 'required_with:payload.customer|string|max:150',
            'payload.customer.email' => 'nullable|email|max:200', 'payload.customer.phone' => 'nullable|string|max:30',
            'payload.intent' => 'sometimes|nullable|array:key,payload', 'payload.intent.key' => 'required_with:payload.intent|uuid',
            'payload.intent.payload' => 'required_with:payload.intent|array']);
        if (!empty($d['payload']['intent'])) {
            Validator::make($d['payload']['intent']['payload'], \App\Pos\Support\Schemas::sale())->validate();
            if ((int) $d['payload']['intent']['payload']['register_id'] !== (int) $d['register_id']) {
                throw new PosException('REGISTER_NOT_FOUND', 'The prepared sale belongs to another register.', 404);
            }
        }
        return response()->json(app(TransactionService::class)->run($c, function () use ($c, $d, $id) {
            $q = $this->draftQuery($c, (int) $d['register_id']);
            $old = (clone $q)->where('id', $id)->first();
            if (($old ? (int) $old->revision : 0) !== $d['revision'] || (!$old && DB::table('pos_web_drafts')->where('id', $id)->exists())) {
                throw new PosException('DRAFT_CONFLICT', 'This draft changed in another tab. Reload held carts.', 409);
            }
            foreach ($d['payload']['lines'] as $line) {
                if (!app(AuthorizationService::class)->stocks($c, false)->where('s.id', $line['item']['stock_id'])->exists()) {
                    throw new PosException('STOCK_NOT_FOUND', 'A draft item is outside your store.', 404);
                }
            }
            if (!$old && (clone $q)->count() >= 50) { throw new PosException('DRAFT_LIMIT', 'Remove a held cart before creating another.', 409); }
            $revision = $d['revision'] + 1;
            DB::table('pos_web_drafts')->updateOrInsert(['id' => $id], ['seller_id' => $c->sellerId, 'cashier_id' => $c->actor->id,
                'register_id' => $d['register_id'], 'label' => $d['label'], 'payload' => Payload::json($d['payload']),
                'revision' => $revision, 'expires_at' => empty($d['payload']['intent']) ? now('UTC')->addDay() : now('UTC')->addDays(30), 'created_at' => $old?->created_at ?? now('UTC'), 'updated_at' => now('UTC')]);
            return ['id' => $id, 'revision' => $revision];
        }));
    }

    public function draftDelete(Request $r, string $id)
    {
        $d = $r->validate(['register_id' => 'required|integer|min:1', 'revision' => 'required|integer|min:1']);
        $c = $this->context($r);
        app(TransactionService::class)->run($c, function () use ($c, $d, $id) {
            $q = $this->draftQuery($c, $d['register_id'])->where('id', $id);
            $row = (clone $q)->where('revision', $d['revision'])->first();
            if (!$row) { throw new PosException('DRAFT_CONFLICT', 'Reload held carts before changing this draft.', 409); }
            $payload = json_decode($row->payload, true);
            if (!empty($payload['intent']) && !DB::table('pos_sales')->where('seller_id', $c->sellerId)
                ->where('client_sale_id', $payload['intent']['payload']['client_sale_id'])->exists()) {
                throw new PosException('CHECKOUT_UNRESOLVED', 'Resolve the saved checkout before deleting its draft.', 409);
            }
            $q->where('revision', $d['revision'])->delete();
        });
        return response()->json(['deleted' => true]);
    }
}
