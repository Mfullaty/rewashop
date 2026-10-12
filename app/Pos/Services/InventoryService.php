<?php

namespace App\Pos\Services;

use App\Pos\DTO\PosContext;
use App\Pos\Exceptions\PosException;
use Illuminate\Support\Facades\DB;

class InventoryService
{
    public function lockStocks(PosContext $context, array $ids, bool $eligible = true): array
    {
        sort($ids, SORT_NUMERIC);
        $ids = array_values(array_unique($ids));
        $rows = app(AuthorizationService::class)->stocks($context, $eligible)->whereIn('s.id', $ids)
            ->orderBy('s.id')->select('s.*')->lockForUpdate()->get()->keyBy('id');
        if ($rows->count() !== count($ids)) {
            throw new PosException('STOCK_NOT_FOUND', 'A stock variant is unavailable in your product scope.', 404);
        }
        return $rows->all();
    }

    public function online(PosContext $context, int $stockId, int $delta, string $type, string $reference): object
    {
        $stock = DB::table('product_stocks')->where('id', $stockId)->lockForUpdate()->first();
        if (!$stock || (int) $stock->qty + $delta < 0) {
            throw new PosException('INSUFFICIENT_STOCK', 'There is insufficient unreserved stock.', 409);
        }
        $before = (int) $stock->qty; $after = $before + $delta;
        if ($after > 2147483647) {
            throw new PosException('QUANTITY_LIMIT', 'The inventory balance exceeds the legacy schema limit.');
        }
        DB::table('product_stocks')->where('id', $stockId)->update(['qty' => $after, 'updated_at' => now('UTC')]);
        $this->movement($context, $stockId, $delta, $before, $after, $type, 'online', $reference);
        app(CatalogService::class)->stock($stockId);
        $stock->qty = $after;
        return $stock;
    }

    public function movement(PosContext $context, int $stockId, int $delta, int $before, int $after, string $type, string $bucket, string $reference): void
    {
        DB::table('pos_stock_movements')->insert([
            'event_key' => hash('sha256', implode('|', [$context->sellerId, $type, $bucket, $reference, $stockId])),
            'seller_id' => $context->sellerId, 'stock_id' => $stockId, 'quantity' => $delta,
            'balance_before' => $before, 'balance_after' => $after, 'type' => $type, 'bucket' => $bucket,
            'reference' => $reference, 'actor_id' => $context->actor->id, 'created_at' => now('UTC'),
        ]);
    }
}
