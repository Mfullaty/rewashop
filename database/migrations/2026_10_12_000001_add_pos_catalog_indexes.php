<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private array $indexes = [
        'products' => [
            'pos_product_owner_visibility' => ['added_by', 'user_id', 'pos', 'published', 'approved'],
            'pos_product_barcode' => ['barcode'],
            'pos_product_discount_start' => ['discount_start_date'],
            'pos_product_discount_end' => ['discount_end_date'],
        ],
        'product_stocks' => ['pos_stock_sku' => ['sku'], 'pos_stock_product_variant' => ['product_id', 'variant']],
    ];

    private function exists(string $table, string $name): bool
    {
        if (DB::getDriverName() === 'mysql') {
            return (bool) DB::table('information_schema.statistics')->where('table_schema', DB::connection()->getDatabaseName())
                ->where('table_name', $table)->where('index_name', $name)->exists();
        }
        if (DB::getDriverName() === 'sqlite') {
            return collect(DB::select('PRAGMA index_list('.$table.')'))->contains(fn ($i) => $i->name === $name);
        }
        throw new RuntimeException('POS catalog indexes support MySQL/MariaDB and SQLite test databases.');
    }

    public function up(): void
    {
        foreach ($this->indexes as $table => $indexes) {
            foreach ($indexes as $name => $columns) {
                if (!$this->exists($table, $name)) { Schema::table($table, fn (Blueprint $t) => $t->index($columns, $name)); }
            }
        }
    }

    public function down(): void
    {
        foreach ($this->indexes as $table => $indexes) {
            foreach ($indexes as $name => $columns) {
                if ($this->exists($table, $name)) { Schema::table($table, fn (Blueprint $t) => $t->dropIndex($name)); }
            }
        }
    }
};
