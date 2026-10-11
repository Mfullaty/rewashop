<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    private const REGISTRATION_SETTING = 'storefront_layouts_20261011_registration';

    public function up(): void
    {
        DB::transaction(function () {
            $record = DB::table('business_settings')->where('type', self::REGISTRATION_SETTING)->first();
            $registration = $record ? json_decode($record->value, true, 512, JSON_THROW_ON_ERROR) : [
                'types' => [], 'styles' => [],
                'selections' => [
                    'header_element' => DB::table('business_settings')->where('type', 'header_element')->value('value'),
                    'footer_element' => DB::table('business_settings')->where('type', 'footer_element')->value('value'),
                ],
            ];

            foreach (require __DIR__ . '/../../config/storefront_layouts.php' as $key => $layout) {
                $type = DB::table('element_types')->where('element_id', $layout['element_id'])->where('name', $layout['name'])->first();
                $id = $type ? $type->id : DB::table('element_types')->insertGetId([
                    'element_id' => $layout['element_id'], 'name' => $layout['name'], 'is_default' => 0,
                    'created_at' => now(), 'updated_at' => now(),
                ]);
                if (!$type) {
                    $registration['types'][$key] = $id;
                }
                foreach ($layout['styles'] as $name => $value) {
                    if (!DB::table('element_styles')->where('element_type_id', $id)->where('name', $name)->exists()) {
                        $registration['styles'][] = DB::table('element_styles')->insertGetId([
                            'element_type_id' => $id, 'name' => $name, 'value' => $value,
                            'created_at' => now(), 'updated_at' => now(),
                        ]);
                    }
                }
            }

            // Persist ownership across separate migrate and rollback processes.
            DB::table('business_settings')->updateOrInsert(['type' => self::REGISTRATION_SETTING], [
                'value' => json_encode($registration, JSON_THROW_ON_ERROR), 'updated_at' => now(),
            ]);
        });
        Cache::forget('business_settings');
    }

    public function down(): void
    {
        DB::transaction(function () {
            $record = DB::table('business_settings')->where('type', self::REGISTRATION_SETTING)->first();
            $registration = $record ? json_decode($record->value, true, 512, JSON_THROW_ON_ERROR) : [];
            $createdTypes = array_values($registration['types'] ?? []);
            $layouts = require __DIR__ . '/../../config/storefront_layouts.php';

            foreach (['header' => 1, 'footer' => 2] as $kind => $elementId) {
                $names = array_column(array_filter($layouts, fn ($layout) => $layout['element_id'] === $elementId), 'name');
                $unavailableIds = array_merge($createdTypes, DB::table('element_types')
                    ->where('element_id', $elementId)->whereIn('name', $names)->pluck('id')->all());
                $setting = $kind . '_element';
                $affected = DB::table('business_settings')->where('type', $setting)->whereIn('value', $unavailableIds);
                if (!$affected->exists()) {
                    continue;
                }

                $fallback = $this->fallbackType($kind, $elementId, $registration['selections'][$setting] ?? null, $unavailableIds);
                $affected->update(['value' => $fallback->id, 'updated_at' => now()]);
                foreach (DB::table('element_styles')->where('element_type_id', $fallback->id)->get() as $style) {
                    DB::table('business_settings')->updateOrInsert(['type' => $style->name], [
                        'value' => $style->value, 'updated_at' => now(),
                    ]);
                }
            }

            // Retain types and colours that existed before this migration ran.
            DB::table('element_styles')->whereIn('id', $registration['styles'] ?? [])->delete();
            DB::table('element_types')->whereIn('id', $createdTypes)->delete();
            DB::table('business_settings')->where('type', self::REGISTRATION_SETTING)->delete();
        });
        Cache::forget('business_settings');
    }

    private function fallbackType(string $kind, int $elementId, $previousId, array $unavailableIds): object
    {
        $types = DB::table('element_types')->where('element_id', $elementId)
            ->orderByDesc('is_default')->orderBy('id')->get();
        $previous = $previousId === null ? null : $types->firstWhere('id', $previousId);
        foreach (array_merge([$previous], $types->all()) as $type) {
            if (!$type || in_array($type->id, $unavailableIds)) {
                continue;
            }
            $view = strtolower(str_replace(' ', '', $type->name));
            if (is_file(__DIR__ . '/../../resources/views/' . $kind . '/' . $view . '.blade.php')) {
                return $type;
            }
        }

        throw new RuntimeException('Cannot roll back storefront layouts without an existing ' . $kind . ' view.');
    }
};
