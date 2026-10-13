<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void
    {
        Schema::table('pos_shifts', fn (Blueprint $t) => $t->boolean('automatic')->default(false));
        Schema::create('pos_stock_shortfalls', function (Blueprint $t) {
            $t->id(); $t->unsignedBigInteger('seller_id')->index();
            $t->foreignId('sale_id')->constrained('pos_sales'); $t->unsignedBigInteger('stock_id');
            $t->unsignedInteger('quantity'); $t->timestamp('created_at');
            $t->unique(['sale_id', 'stock_id']);
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('pos_stock_shortfalls');
        Schema::table('pos_shifts', fn (Blueprint $t) => $t->dropColumn('automatic'));
    }
};
