<?php

namespace App\Console\Commands;

use App\Pos\Services\OfflinePolicySigner;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PosDoctor extends Command
{
    protected $signature = 'pos:doctor';
    protected $description = 'Read-only POS schema, route, database-engine and offline-policy compatibility checks';

    public function handle(): int
    {
        $errors = [];
        foreach (['users', 'products', 'product_stocks', 'product_taxes', 'orders', 'order_details',
            'pos_settings', 'pos_device_tokens', 'pos_sales', 'pos_stock_shortfalls', 'pos_stock_allocations', 'pos_sync_inbox'] as $table) {
            if (!Schema::hasTable($table)) { $errors[] = 'Missing table: '.$table; }
        }
        foreach (['products' => ['added_by', 'user_id', 'pos', 'approved', 'published', 'barcode', 'wholesale_product', 'pos_excluded'],
            'pos_shifts' => ['automatic'],
            'orders' => ['user_id', 'seller_id', 'shipping_type', 'order_from'],
            'product_stocks' => ['product_id', 'variant', 'qty', 'sku', 'price']] as $table => $columns) {
            if (Schema::hasTable($table)) {
                foreach ($columns as $column) { if (!Schema::hasColumn($table, $column)) { $errors[] = 'Missing column: '.$table.'.'.$column; } }
            }
        }
        if (DB::getDriverName() === 'mysql') {
            $schema = DB::connection()->getDatabaseName();
            foreach (['orders', 'order_details', 'products', 'product_stocks', 'pos_sales'] as $table) {
                $engine = DB::table('information_schema.tables')->where('table_schema', $schema)->where('table_name', $table)->value('engine');
                if ($engine && strtolower($engine) !== 'innodb') { $errors[] = $table.' must use InnoDB for transactional stock safety.'; }
            }
            $nullable = DB::table('information_schema.columns')->where('table_schema', $schema)->where('table_name', 'orders')
                ->where('column_name', 'user_id')->value('is_nullable');
            if ($nullable !== 'YES') { $errors[] = 'orders.user_id must allow NULL for walk-in sales.'; }
        }
        $routes = collect(app('router')->getRoutes()->getRoutes());
        if (!$routes->contains(fn ($r) => $r->uri() === 'api/pos/v1/sales')) { $errors[] = 'The stateless POS route bridge is missing.'; }
        if (!$routes->contains(fn ($r) => $r->uri() === 'pos/backend/sales')) { $errors[] = 'The browser POS route bridge is missing.'; }
        if (config('pos.offline_enabled')) {
            try { if (!app(OfflinePolicySigner::class)->publicKey()) { $errors[] = 'Run pos:policy-key before enabling offline inventory.'; } }
            catch (\Throwable $e) { $errors[] = 'The offline policy signing key is unavailable.'; }
        }
        foreach ($errors as $error) { $this->error($error); }
        $this->line('POS enabled: '.(config('pos.enabled') ? 'yes' : 'no'));
        $this->line('Offline cash sales enabled: '.(config('pos.offline_enabled') ? 'yes' : 'no'));
        $this->line('Live addon, import and direct-SQL stock writers still require staging validation.');
        if (!$errors) { $this->info('Shared backend compatibility checks passed.'); }
        return $errors ? self::FAILURE : self::SUCCESS;
    }
}
