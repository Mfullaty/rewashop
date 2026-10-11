<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        DB::transaction(function () {
            foreach (require __DIR__ . '/../../config/storefront_layouts.php' as $layout) {
                $type = DB::table('element_types')->where('element_id', $layout['element_id'])->where('name', $layout['name'])->first();
                $id = $type ? $type->id : DB::table('element_types')->insertGetId([
                    'element_id' => $layout['element_id'], 'name' => $layout['name'], 'is_default' => 0,
                    'created_at' => now(), 'updated_at' => now(),
                ]);
                foreach ($layout['styles'] as $name => $value) {
                    if (!DB::table('element_styles')->where('element_type_id', $id)->where('name', $name)->exists()) {
                        DB::table('element_styles')->insert([
                            'element_type_id' => $id, 'name' => $name, 'value' => $value,
                            'created_at' => now(), 'updated_at' => now(),
                        ]);
                    }
                }
            }
        });
    }

    public function down(): void
    {
        // Keep selectable layouts and merchant-edited styles on rollback.
        // Removing a selected type would leave the storefront pointing at a missing view.
    }
};
