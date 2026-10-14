<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
 public function up():void {Schema::create('pos_receipt_keys',function(Blueprint $t){$t->char('id',32)->primary();$t->unsignedBigInteger('seller_id')->index();$t->uuid('device_id')->index();$t->string('public_key',44);$t->timestamp('created_at');});}
 public function down():void {Schema::dropIfExists('pos_receipt_keys');}
};
