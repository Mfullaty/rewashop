<?php

// Exercise registration and rollback using Laravel queries and an isolated SQLite database.
// Usage: php tests/storefront-layout-registration.php [path/to/vendor/autoload.php]
require $argv[1] ?? dirname(__DIR__) . '/vendor/autoload.php';

use Illuminate\Cache\ArrayStore;
use Illuminate\Cache\Repository;
use Illuminate\Container\Container;
use Illuminate\Database\SQLiteConnection;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Facade;

if (!class_exists(PDO::class) || !in_array('sqlite', PDO::getAvailableDrivers(), true)) {
    fwrite(STDERR, "Enable the PDO SQLite extension to run the isolated migration checks.\n");
    exit(1);
}
Carbon::setTestNow('2026-10-11 12:00:00');
$assert = function ($valid, $message): void { if (!$valid) throw new RuntimeException($message); };
$migration = fn () => require dirname(__DIR__) . '/database/migrations/2026_10_11_160000_add_storefront_header_footer_layouts.php';
$registrationKey = 'storefront_layouts_20261011_registration';
$snapshot = function ($db): array {
    $result = [];
    foreach (['element_types', 'element_styles', 'business_settings'] as $table) {
        $result[$table] = $db->table($table)->orderBy('id')->get()->map(fn ($row) => (array) $row)->all();
    }
    return $result;
};
$fixture = function (): SQLiteConnection {
    $db = new SQLiteConnection(new PDO('sqlite::memory:'), ':memory:', '', ['driver' => 'sqlite']);
    $app = new Container();
    $app->instance('db', $db);
    $app->instance('cache', new Repository(new ArrayStore()));
    Facade::clearResolvedInstances();
    Facade::setFacadeApplication($app);
    $db->statement('CREATE TABLE element_types (id INTEGER PRIMARY KEY AUTOINCREMENT, element_id INTEGER NOT NULL, name TEXT NOT NULL, is_default INTEGER NOT NULL DEFAULT 0, created_at TEXT, updated_at TEXT)');
    $db->statement('CREATE TABLE element_styles (id INTEGER PRIMARY KEY AUTOINCREMENT, element_type_id INTEGER NOT NULL, name TEXT NOT NULL, value TEXT, created_at TEXT, updated_at TEXT)');
    $db->statement('CREATE TABLE business_settings (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, value TEXT, lang TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT)');
    $db->table('element_types')->insert([
        ['id' => 0, 'element_id' => 1, 'name' => 'Header 404', 'is_default' => 1],
        ['id' => 1, 'element_id' => 1, 'name' => 'Header 1', 'is_default' => 0],
        ['id' => 2, 'element_id' => 1, 'name' => 'Header 2', 'is_default' => 1],
        ['id' => 6, 'element_id' => 2, 'name' => 'Footer 404', 'is_default' => 1],
        ['id' => 8, 'element_id' => 2, 'name' => 'Footer 1', 'is_default' => 0],
        ['id' => 12, 'element_id' => 2, 'name' => 'Footer 3', 'is_default' => 1],
        ['id' => 41, 'element_id' => 1, 'name' => 'Header 8', 'is_default' => 0],
    ]);
    $db->table('element_styles')->insert([
        ['id' => 1, 'element_type_id' => 41, 'name' => 'top_header_bg_color', 'value' => '#12ab34'],
        ['id' => 2, 'element_type_id' => 1, 'name' => 'top_header_bg_color', 'value' => '#ffffff'],
        ['id' => 3, 'element_type_id' => 8, 'name' => 'footer_bg_color', 'value' => '#111111'],
        ['id' => 4, 'element_type_id' => 2, 'name' => 'top_header_bg_color', 'value' => '#222222'],
        ['id' => 5, 'element_type_id' => 12, 'name' => 'footer_bg_color', 'value' => '#333333'],
    ]);
    $db->table('business_settings')->insert([
        ['type' => 'header_element', 'value' => '1'],
        ['type' => 'footer_element', 'value' => '8'],
        ['type' => 'top_header_bg_color', 'value' => '#existing'],
        ['type' => 'footer_bg_color', 'value' => '#existing'],
        ['type' => 'unrelated_setting', 'value' => 'preserve'],
    ]);
    Cache::forever('business_settings', 'stale');
    Cache::forever('unrelated_cache', 'preserve');
    return $db;
};
$select = function ($db, string $kind, string $name): void {
    $id = $db->table('element_types')->where('name', $name)->value('id');
    $db->table('business_settings')->where('type', $kind . '_element')->update(['value' => $id]);
};
$value = fn ($db, string $setting) => $db->table('business_settings')->where('type', $setting)->value('value');

foreach (['Header 8', 'Header 9'] as $header) {
    foreach (['Footer 4', 'Footer 5'] as $footer) {
        $db = $fixture();
        $before = $snapshot($db);
        $migration()->up();
        $assert(!Cache::has('business_settings') && Cache::get('unrelated_cache') === 'preserve', 'Registration must invalidate only the settings cache.');
        $registered = $snapshot($db);
        $migration()->up();
        $assert($snapshot($db) === $registered, 'Repeated registration must preserve records, IDs and edited colours.');
        $ownership = json_decode($value($db, $registrationKey), true, 512, JSON_THROW_ON_ERROR);
        $assert(count($ownership['types']) === 3 && !in_array(41, $ownership['types']), 'A pre-existing Header 8 must not become migration-owned.');
        $assert(!in_array(1, $ownership['styles']), 'A pre-existing colour must not become migration-owned.');
        foreach (require dirname(__DIR__) . '/config/storefront_layouts.php' as $key => $layout) {
            $type = $db->table('element_types')->where('element_id', $layout['element_id'])->where('name', $layout['name'])->first();
            $assert($type !== null, 'Missing selectable layout ' . $key);
            foreach ($layout['styles'] as $name => $colour) $assert($db->table('element_styles')->where('element_type_id', $type->id)->where('name', $name)->exists(), 'Missing editable style ' . $name);
            $kind = $layout['element_id'] === 1 ? 'header' : 'footer';
            $assert(is_file(dirname(__DIR__) . '/public/' . $layout['preview']) && is_file(dirname(__DIR__) . '/resources/views/' . $kind . '/' . $key . '.blade.php'), 'Missing view or preview ' . $key);
        }
        $select($db, 'header', $header);
        $select($db, 'footer', $footer);
        Cache::forever('business_settings', 'new layout selected');
        $migration()->down(); // A fresh instance must still know which records it owns.
        $rolledBack = $snapshot($db);
        $assert($value($db, 'header_element') === '1' && $value($db, 'footer_element') === '8', 'Every new header/footer selection must return to the previous native layouts.');
        $assert($rolledBack['element_types'] === $before['element_types'] && $rolledBack['element_styles'] === $before['element_styles'], 'Rollback must remove only introduced types/styles and retain pre-existing IDs and colours.');
        $assert($value($db, 'top_header_bg_color') === '#ffffff' && $value($db, 'footer_bg_color') === '#111111', 'Restored selections must receive their native style settings.');
        $assert($value($db, 'unrelated_setting') === 'preserve' && $value($db, $registrationKey) === null, 'Unrelated settings must survive and ownership metadata must be removed.');
        $assert(!Cache::has('business_settings') && Cache::get('unrelated_cache') === 'preserve', 'Rollback must invalidate stale selections in cache.');
        $migration()->down();
        $assert($snapshot($db) === $rolledBack, 'Repeated rollback must be harmless.');
        $migration()->up();
        $assert($db->table('element_types')->where('name', 'Header 9')->count() === 1, 'Layouts must register cleanly after rollback.');
    }
}

// A fresh installation owns all four new types and cleans them up without leaving styles behind.
$db = $fixture();
$db->table('element_styles')->where('element_type_id', 41)->delete();
$db->table('element_types')->where('id', 41)->delete();
$fresh = $snapshot($db);
$migration()->up();
$ownership = json_decode($value($db, $registrationKey), true, 512, JSON_THROW_ON_ERROR);
$assert(count($ownership['types']) === 4, 'Fresh registration must track all four created layout IDs.');
$select($db, 'header', 'Header 8');
$select($db, 'footer', 'Footer 4');
$migration()->down();
$after = $snapshot($db);
$assert($after['element_types'] === $fresh['element_types'] && $after['element_styles'] === $fresh['element_styles'], 'Fresh rollback must remove all introduced layouts and their styles.');

// Later edits to a pre-existing layout's own colour are not owned by this migration.
$db = $fixture();
$migration()->up();
$db->table('element_styles')->where('id', 1)->update(['value' => '#abcdef']);
$select($db, 'header', 'Header 8');
$migration()->down();
$assert($db->table('element_styles')->where('id', 1)->value('value') === '#abcdef', 'Rollback must preserve later edits to pre-existing style records.');

// Preserve administrators' later choices of older layouts and their current global colours.
$db = $fixture();
$migration()->up();
$select($db, 'header', 'Header 2');
$select($db, 'footer', 'Footer 3');
$db->table('business_settings')->where('type', 'top_header_bg_color')->update(['value' => '#merchant']);
$migration()->down();
$assert($value($db, 'header_element') === '2' && $value($db, 'footer_element') === '12' && $value($db, 'top_header_bg_color') === '#merchant', 'Unaffected selections and merchant colours must not be overwritten.');

// Invalid/deleted previous selections and missing-view defaults must resolve to valid native defaults.
$db = $fixture();
$db->table('business_settings')->whereIn('type', ['header_element', 'footer_element'])->update(['value' => '9999']);
$migration()->up();
$select($db, 'header', 'Header 9');
$select($db, 'footer', 'Footer 5');
$migration()->down();
$assert($value($db, 'header_element') === '2' && $value($db, 'footer_element') === '12', 'Fallbacks must skip missing views and use existing layouts when previous IDs are invalid.');

// Owned records can be renamed after registration; selections still must move before deletion.
$db = $fixture();
$migration()->up();
$select($db, 'header', 'Header 9');
$db->table('element_types')->where('name', 'Header 9')->update(['name' => 'Header 99']);
$migration()->down();
$assert($value($db, 'header_element') === '1' && !$db->table('element_types')->where('name', 'Header 99')->exists(), 'Owned IDs must remain safe to roll back even after a rename.');

// Without an ownership journal, repair stale selections without guessing which records pre-existed.
$db = $fixture();
$migration()->up();
$db->table('business_settings')->where('type', $registrationKey)->delete();
$select($db, 'header', 'Header 9');
$select($db, 'footer', 'Footer 5');
$untracked = $snapshot($db);
$migration()->down();
$assert($value($db, 'header_element') === '2' && $value($db, 'footer_element') === '12', 'An untracked older migration must still restore valid selections.');
$after = $snapshot($db);
$assert($after['element_types'] === $untracked['element_types'] && $after['element_styles'] === $untracked['element_styles'], 'Untracked records must not be deleted without ownership evidence.');

// A missing fallback aborts the entire transaction, including any earlier header restoration.
$db = $fixture();
$migration()->up();
$select($db, 'header', 'Header 9');
$select($db, 'footer', 'Footer 5');
$db->table('element_types')->whereIn('id', [8, 12])->delete();
Cache::forever('business_settings', 'preserve on failure');
$beforeFailure = $snapshot($db);
$failed = false;
try { $migration()->down(); } catch (RuntimeException $error) { $failed = str_contains($error->getMessage(), 'existing footer view'); }
$assert($failed && $snapshot($db) === $beforeFailure && Cache::get('business_settings') === 'preserve on failure', 'Rollback must fail atomically when no valid native fallback exists.');

Carbon::setTestNow();
echo "Layout migration checks passed: real SQLite queries, four selection combinations, ownership, repeat execution, native fallbacks, cache invalidation and atomic rollback.\n";
