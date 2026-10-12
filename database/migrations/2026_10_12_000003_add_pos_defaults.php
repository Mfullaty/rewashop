<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Legacy pos=0 meant opt-in was never selected, not an explicit exclusion.
            $table->boolean('pos_excluded')->default(false);
        });
    }

    public function down(): void
    {
        throw new RuntimeException('Keep POS exclusions during rollback. Restore a coordinated backup instead.');
    }
};
