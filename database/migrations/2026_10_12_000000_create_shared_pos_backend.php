<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Legacy IDs have mixed signed int types. Deliberately use indexed references,
        // rather than incompatible foreign keys to the vendor's legacy schema.
        Schema::create('pos_settings', function (Blueprint $t) {
            $t->unsignedBigInteger('seller_id')->primary();
            $t->string('owner_type', 10);
            $t->char('currency', 3);
            $t->unsignedTinyInteger('minor_exponent')->default(2);
            $t->json('settings');
            $t->unsignedBigInteger('change_sequence')->default(0);
            $t->timestamps();
        });
        Schema::create('pos_locations', function (Blueprint $t) {
            $t->id(); $t->unsignedBigInteger('seller_id')->index();
            $t->string('code', 40); $t->string('name');
            $t->boolean('active')->default(true); $t->timestamps();
            $t->unique(['seller_id', 'code']);
        });
        Schema::create('pos_registers', function (Blueprint $t) {
            $t->id(); $t->unsignedBigInteger('seller_id')->index();
            $t->foreignId('location_id')->constrained('pos_locations');
            $t->string('code', 40); $t->string('name');
            $t->boolean('active')->default(true);
            $t->unsignedBigInteger('active_shift_id')->nullable();
            $t->timestamps(); $t->unique(['seller_id', 'code']);
        });
        Schema::create('pos_cashier_permissions', function (Blueprint $t) {
            $t->id(); $t->unsignedBigInteger('seller_id');
            $t->unsignedBigInteger('user_id'); $t->json('abilities');
            $t->json('register_ids'); $t->unsignedInteger('max_discount_bps')->default(0);
            $t->boolean('active')->default(true); $t->timestamps();
            $t->unique(['seller_id', 'user_id']);
        });
        Schema::create('pos_devices', function (Blueprint $t) {
            $t->uuid('id')->primary(); $t->unsignedBigInteger('seller_id')->index();
            $t->foreignId('register_id')->constrained('pos_registers');
            $t->unsignedBigInteger('cashier_id'); $t->string('name', 100);
            $t->json('abilities'); $t->boolean('offline_allowed')->default(false);
            $t->unsignedBigInteger('last_sequence')->default(0);
            $t->unsignedBigInteger('offline_spent_minor')->default(0);
            $t->unsignedBigInteger('max_offline_sale_minor');
            $t->unsignedBigInteger('max_offline_budget_minor');
            $t->unsignedInteger('max_reserved_units');
            $t->timestamp('revoked_at')->nullable();
            $t->timestamp('last_seen_at')->nullable(); $t->timestamps();
        });
        Schema::create('pos_pairings', function (Blueprint $t) {
            $t->uuid('id')->primary(); $t->char('secret_hash', 64);
            $t->string('name', 100); $t->timestamp('expires_at')->index();
            $t->uuid('device_id')->nullable();
            $t->timestamp('claimed_at')->nullable(); $t->timestamps();
        });
        Schema::create('pos_device_tokens', function (Blueprint $t) {
            $t->id(); $t->string('tokenable_type'); $t->uuid('tokenable_id');
            $t->index(['tokenable_type', 'tokenable_id']);
            $t->string('name'); $t->string('token', 64)->unique();
            $t->text('abilities'); $t->timestamp('last_used_at')->nullable();
            $t->timestamp('expires_at')->nullable(); $t->timestamps();
        });
        Schema::create('pos_shifts', function (Blueprint $t) {
            $t->id(); $t->uuid('client_shift_id')->unique();
            $t->unsignedBigInteger('seller_id');
            $t->foreignId('register_id')->constrained('pos_registers');
            $t->unsignedBigInteger('cashier_id'); $t->uuid('device_id')->nullable();
            $t->string('status', 12); $t->bigInteger('opening_minor');
            $t->bigInteger('expected_minor')->nullable();
            $t->bigInteger('counted_minor')->nullable();
            $t->bigInteger('variance_minor')->nullable();
            $t->text('close_reason')->nullable();
            $t->timestamp('opened_at'); $t->timestamp('closed_at')->nullable();
            $t->timestamps(); $t->index(['seller_id', 'status']);
        });
        Schema::create('pos_sales', function (Blueprint $t) {
            $t->id(); $t->uuid('client_sale_id')->unique(); $t->char('request_hash', 64);
            $t->unsignedBigInteger('order_id')->unique();
            $t->unsignedBigInteger('seller_id');
            $t->foreignId('location_id')->constrained('pos_locations');
            $t->foreignId('register_id')->constrained('pos_registers');
            $t->foreignId('shift_id')->constrained('pos_shifts');
            $t->unsignedBigInteger('cashier_id'); $t->uuid('device_id')->nullable();
            $t->string('source', 12); $t->string('inventory_mode', 12); $t->string('status', 24);
            $t->string('payment_status', 24); $t->char('currency', 3);
            foreach (['subtotal', 'discount', 'tax', 'total', 'refunded'] as $money) {
                $t->bigInteger($money.'_minor')->default(0);
            }
            $t->timestamp('occurred_at'); $t->timestamps();
            $t->index(['seller_id', 'occurred_at']);
            $t->index(['seller_id', 'register_id', 'created_at']);
        });
        Schema::create('pos_sale_lines', function (Blueprint $t) {
            $t->id(); $t->foreignId('sale_id')->constrained('pos_sales');
            $t->unsignedBigInteger('product_id'); $t->unsignedBigInteger('stock_id')->index();
            $t->unsignedBigInteger('order_detail_id')->unique();
            $t->unsignedInteger('quantity'); $t->unsignedInteger('returned_quantity')->default(0);
            foreach (['unit_price', 'subtotal', 'discount', 'tax', 'gst', 'total'] as $money) {
                $t->bigInteger($money.'_minor');
            }
            $t->uuid('allocation_id')->nullable(); $t->json('snapshot'); $t->timestamps();
        });
        Schema::create('pos_tenders', function (Blueprint $t) {
            $t->id(); $t->foreignId('sale_id')->constrained('pos_sales');
            $t->unsignedBigInteger('seller_id')->index();
            $t->string('method', 24); $t->char('currency', 3);
            $t->bigInteger('amount_minor'); $t->bigInteger('received_minor')->default(0);
            $t->bigInteger('change_minor')->default(0);
            $t->string('status', 24); $t->string('reference', 100)->nullable();
            $t->char('settlement_key', 64)->nullable()->unique();
            $t->unsignedBigInteger('verified_by')->nullable();
            $t->text('evidence')->nullable(); $t->timestamp('verified_at')->nullable();
            $t->timestamps();
        });
        Schema::create('pos_refunds', function (Blueprint $t) {
            $t->id(); $t->uuid('client_refund_id')->unique();
            $t->foreignId('sale_id')->constrained('pos_sales');
            $t->foreignId('shift_id')->constrained('pos_shifts');
            $t->unsignedBigInteger('seller_id')->index(); $t->unsignedBigInteger('cashier_id');
            $t->string('method', 24); $t->string('status', 24);
            $t->bigInteger('amount_minor'); $t->text('reason');
            $t->string('reference', 100)->nullable();
            $t->char('settlement_key', 64)->nullable()->unique();
            $t->text('evidence')->nullable(); $t->unsignedBigInteger('verified_by')->nullable();
            $t->timestamps();
        });
        Schema::create('pos_refund_lines', function (Blueprint $t) {
            $t->id(); $t->foreignId('refund_id')->constrained('pos_refunds');
            $t->foreignId('sale_line_id')->constrained('pos_sale_lines');
            $t->unsignedInteger('quantity'); $t->bigInteger('amount_minor');
            $t->bigInteger('tax_minor'); $t->bigInteger('discount_minor');
            $t->boolean('restock'); $t->timestamps();
        });
        Schema::create('pos_stock_allocations', function (Blueprint $t) {
            $t->uuid('id')->primary(); $t->unsignedBigInteger('seller_id');
            $t->uuid('device_id'); $t->unsignedBigInteger('stock_id');
            $t->unsignedInteger('reserved'); $t->unsignedInteger('consumed')->default(0);
            $t->unsignedInteger('released')->default(0); $t->string('status', 12);
            $t->json('price_snapshot'); $t->json('signed_policy'); $t->timestamp('policy_expires_at');
            $t->unsignedBigInteger('reconciled_sequence')->nullable();
            $t->timestamps(); $t->index(['seller_id', 'device_id', 'status']);
            $t->index(['stock_id', 'status']);
        });
        Schema::create('pos_stock_movements', function (Blueprint $t) {
            $t->id(); $t->char('event_key', 64)->unique();
            $t->unsignedBigInteger('seller_id'); $t->unsignedBigInteger('stock_id');
            $t->string('type', 24); $t->string('bucket', 12);
            $t->bigInteger('quantity'); $t->bigInteger('balance_before');
            $t->bigInteger('balance_after'); $t->string('reference', 100);
            $t->unsignedBigInteger('actor_id')->nullable(); $t->timestamp('created_at');
            $t->index(['seller_id', 'stock_id', 'id']);
        });
        Schema::create('pos_legacy_restock_events', function (Blueprint $t) {
            $t->unsignedBigInteger('order_detail_id')->primary();
            $t->unsignedBigInteger('seller_id'); $t->unsignedBigInteger('stock_id');
            $t->unsignedInteger('quantity'); $t->timestamp('created_at');
        });
        Schema::create('pos_idempotency_keys', function (Blueprint $t) {
            $t->string('key', 100)->primary(); $t->unsignedBigInteger('seller_id')->index();
            $t->unsignedBigInteger('actor_id'); $t->string('operation', 80);
            $t->char('request_hash', 64); $t->json('result'); $t->timestamp('created_at');
        });
        Schema::create('pos_sync_inbox', function (Blueprint $t) {
            $t->uuid('event_id')->primary(); $t->uuid('device_id');
            $t->unsignedBigInteger('seller_id'); $t->unsignedBigInteger('local_sequence');
            $t->char('request_hash', 64); $t->string('type', 32);
            $t->string('status', 16); $t->json('result'); $t->timestamp('created_at');
            $t->unique(['device_id', 'local_sequence']);
        });
        Schema::create('pos_change_log', function (Blueprint $t) {
            $t->id(); $t->unsignedBigInteger('seller_id');
            $t->unsignedBigInteger('sequence'); $t->string('entity', 24);
            $t->string('entity_id', 100); $t->string('operation', 12);
            $t->json('payload'); $t->timestamp('created_at');
            $t->unique(['seller_id', 'sequence']);
        });
        Schema::create('pos_catalog_entries', function (Blueprint $t) {
            $t->id(); $t->unsignedBigInteger('seller_id'); $t->unsignedBigInteger('stock_id');
            $t->unsignedBigInteger('sequence'); $t->char('digest', 64); $t->json('payload');
            $t->unique(['seller_id', 'stock_id']);
        });
        Schema::create('pos_catalog_snapshots', function (Blueprint $t) {
            $t->uuid('id')->primary(); $t->unsignedBigInteger('seller_id')->index();
            $t->uuid('device_id')->nullable(); $t->unsignedBigInteger('actor_id');
            $t->unsignedBigInteger('high_water_mark'); $t->timestamp('expires_at');
            $t->timestamp('created_at');
        });
        Schema::create('pos_catalog_snapshot_items', function (Blueprint $t) {
            $t->uuid('snapshot_id'); $t->unsignedBigInteger('stock_id'); $t->json('payload');
            $t->primary(['snapshot_id', 'stock_id']);
        });
        Schema::create('pos_receipts', function (Blueprint $t) {
            $t->id(); $t->foreignId('sale_id')->unique()->constrained('pos_sales');
            $t->unsignedBigInteger('seller_id')->index(); $t->string('number', 100)->unique();
            $t->json('payload'); $t->timestamp('created_at');
        });
        Schema::create('pos_cash_movements', function (Blueprint $t) {
            $t->id(); $t->foreignId('shift_id')->constrained('pos_shifts');
            $t->unsignedBigInteger('seller_id'); $t->unsignedBigInteger('actor_id');
            $t->bigInteger('amount_minor'); $t->text('reason'); $t->timestamp('created_at');
        });
        Schema::create('pos_audit_events', function (Blueprint $t) {
            $t->id(); $t->unsignedBigInteger('seller_id'); $t->unsignedBigInteger('actor_id')->nullable();
            $t->uuid('device_id')->nullable(); $t->string('action', 80);
            $t->string('subject', 100); $t->json('context');
            $t->timestamp('created_at'); $t->index(['seller_id', 'id']);
        });
    }

    public function down(): void
    {
        // Rollback must never erase accepted financial records or outstanding reserves.
        foreach (['pos_sales', 'pos_stock_allocations', 'pos_sync_inbox', 'pos_stock_movements'] as $table) {
            if (Schema::hasTable($table) && \Illuminate\Support\Facades\DB::table($table)->exists()) {
                throw new RuntimeException('POS data exists. Disable POS and restore a verified backup; automatic rollback is blocked.');
            }
        }
        foreach (array_reverse([
            'pos_settings', 'pos_locations', 'pos_registers', 'pos_cashier_permissions',
            'pos_devices', 'pos_pairings', 'pos_device_tokens', 'pos_shifts', 'pos_sales', 'pos_sale_lines',
            'pos_tenders', 'pos_refunds', 'pos_refund_lines', 'pos_stock_allocations',
            'pos_stock_movements', 'pos_legacy_restock_events', 'pos_idempotency_keys', 'pos_sync_inbox', 'pos_change_log',
            'pos_catalog_entries', 'pos_catalog_snapshots', 'pos_catalog_snapshot_items',
            'pos_receipts', 'pos_cash_movements', 'pos_audit_events',
        ]) as $table) {
            Schema::dropIfExists($table);
        }
    }
};
