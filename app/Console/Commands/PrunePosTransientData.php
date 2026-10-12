<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class PrunePosTransientData extends Command
{
    protected $signature = 'pos:prune-transient';
    protected $description = 'Delete expired pairing requests and catalog snapshots while retaining every financial and inventory record';

    public function handle(): int
    {
        DB::table('pos_catalog_snapshots')->where('expires_at', '<', now('UTC'))->orderBy('id')->chunkById(100, function ($rows) {
            DB::transaction(function () use ($rows) {
                DB::table('pos_catalog_snapshot_items')->whereIn('snapshot_id', $rows->pluck('id'))->delete();
                DB::table('pos_catalog_snapshots')->whereIn('id', $rows->pluck('id'))->delete();
            });
        });
        DB::table('pos_pairings')->where('expires_at', '<', now('UTC')->subDay())->delete();
        if (\Illuminate\Support\Facades\Schema::hasTable('pos_web_drafts')) {
            DB::table('pos_web_drafts')->where('expires_at', '<', now('UTC'))->delete();
        }
        $this->info('Expired transient POS records pruned.'); return self::SUCCESS;
    }
}
