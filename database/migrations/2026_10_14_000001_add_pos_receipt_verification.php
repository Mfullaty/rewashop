<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void { Schema::table('pos_receipts', fn(Blueprint $t) => $t->char('verification_hash',64)->nullable()->unique()); }
    public function down(): void { Schema::table('pos_receipts', function(Blueprint $t){$t->dropUnique(['verification_hash']);$t->dropColumn('verification_hash');}); }
};
