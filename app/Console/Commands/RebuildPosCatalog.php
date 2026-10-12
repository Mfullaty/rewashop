<?php

namespace App\Console\Commands;

use App\Pos\Services\CatalogService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class RebuildPosCatalog extends Command
{
    protected $signature = 'pos:catalog:rebuild {--price-windows : Refresh scheduled promotion boundaries only}';
    protected $description = 'Reconcile POS catalog entries and publish price-window changes and tombstones';

    public function handle(): int
    {
        $catalog = app(CatalogService::class);
        if (!$catalog->ready()) { $this->error('Enable POS and provision stores first.'); return self::FAILURE; }
        if (!$this->option('price-windows')) {
            \App\Models\User::where('user_type', 'seller')->where('banned', false)->orderBy('id')
                ->chunkById(100, function ($owners) {
                    foreach ($owners as $owner) { app(\App\Pos\Services\StoreProvisioningService::class)->ensure($owner); }
                });
        }
        $stocks = DB::table('product_stocks');
        if ($this->option('price-windows')) {
            $from = now('UTC')->subMinutes(5)->timestamp; $to = now('UTC')->addMinutes(1)->timestamp;
            $stocks->whereIn('product_id', DB::table('products')->where(fn ($q) =>
                $q->whereBetween('discount_start_date', [$from, $to])->orWhereBetween('discount_end_date', [$from, $to]))->select('id'));
        }
        $stocks->orderBy('id')->select('id')->chunkById(500, function ($rows) use ($catalog) {
            foreach ($rows as $row) { $catalog->stock((int) $row->id); }
        });
        if (!$this->option('price-windows')) {
            DB::table('pos_catalog_entries')->whereNotIn('stock_id', DB::table('product_stocks')->select('id'))
                ->orderBy('id')->chunkById(500, function ($rows) use ($catalog) {
                    foreach ($rows as $row) { $catalog->stock((int) $row->stock_id); }
                });
        }
        $this->info('Catalog reconciled.'); return self::SUCCESS;
    }
}
