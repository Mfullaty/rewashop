<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pos_web_drafts', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->unsignedBigInteger('seller_id');
            $t->unsignedBigInteger('cashier_id');
            $t->unsignedBigInteger('register_id');
            $t->string('label', 100);
            $t->json('payload');
            $t->unsignedInteger('revision')->default(1);
            $t->timestamp('expires_at');
            $t->timestamps();
            $t->index(['seller_id', 'cashier_id', 'register_id', 'expires_at'], 'pos_web_draft_scope');
        });
    }

    public function down(): void { Schema::dropIfExists('pos_web_drafts'); }
};
