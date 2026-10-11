<?php

// Exercise the production registration migration with controlled existing merchant records.
// Usage: php tests/storefront-layout-registration.php [path/to/vendor/autoload.php]
require $argv[1] ?? dirname(__DIR__) . '/vendor/autoload.php';

class StorefrontRegistrationDatabase
{
    public array $tables = ['element_types' => [], 'element_styles' => []];
    public function transaction($callback) {
        $before = $this->tables;
        try { return $callback(); } catch (Throwable $error) { $this->tables = $before; throw $error; }
    }
    public function table($table) {
        return new class($this, $table) {
            private array $conditions = [];
            public function __construct(private $database, private $table) {}
            public function where($name, $value) { $this->conditions[$name] = $value; return $this; }
            public function first() {
                foreach ($this->database->tables[$this->table] as $row) {
                    foreach ($this->conditions as $name => $value) if (($row[$name] ?? null) != $value) continue 2;
                    return (object) $row;
                }
                return null;
            }
            public function exists() { return $this->first() !== null; }
            public function insertGetId($row) {
                $row['id'] = max(array_column($this->database->tables[$this->table], 'id') ?: [0]) + 1;
                $this->database->tables[$this->table][] = $row;
                return $row['id'];
            }
            public function insert($row) { $this->insertGetId($row); return true; }
        };
    }
}

$assert = function ($valid, $message): void { if (!$valid) throw new RuntimeException($message); };
$database = new StorefrontRegistrationDatabase();
$database->tables['element_types'] = [
    ['id' => 1, 'element_id' => 1, 'name' => 'Header 1', 'is_default' => 1],
    ['id' => 8, 'element_id' => 2, 'name' => 'Footer 1', 'is_default' => 1],
    ['id' => 41, 'element_id' => 1, 'name' => 'Header 8', 'is_default' => 0],
];
$database->tables['element_styles'] = [['id' => 1, 'element_type_id' => 41, 'name' => 'top_header_bg_color', 'value' => '#12ab34']];
$existing = $database->tables['element_types'];
$app = new Illuminate\Container\Container();
$app->instance('db', $database);
Illuminate\Support\Facades\Facade::setFacadeApplication($app);
$migration = require dirname(__DIR__) . '/database/migrations/2026_10_11_160000_add_storefront_header_footer_layouts.php';
$migration->up();
$firstRun = $database->tables;
$migration->up();
$assert($firstRun === $database->tables, 'Repeated registration must not duplicate layouts or overwrite merchant styles.');
$assert(array_slice($database->tables['element_types'], 0, 3) === $existing, 'Existing layout IDs and default flags must remain unchanged.');
$assert($database->tables['element_styles'][0]['value'] === '#12ab34', 'A merchant-edited colour must survive registration.');
foreach (require dirname(__DIR__) . '/config/storefront_layouts.php' as $key => $layout) {
    $type = $database->table('element_types')->where('element_id', $layout['element_id'])->where('name', $layout['name'])->first();
    $assert($type !== null, 'The admin picker needs a registered type for ' . $key);
    foreach ($layout['styles'] as $name => $value) $assert($database->table('element_styles')->where('element_type_id', $type->id)->where('name', $name)->exists(), 'Missing editable style ' . $name);
    $assert(is_file(dirname(__DIR__) . '/public/' . $layout['preview']), 'The picker preview must ship with ' . $key);
    $kind = $layout['element_id'] === 1 ? 'header' : 'footer';
    $assert(is_file(dirname(__DIR__) . '/resources/views/' . $kind . '/' . $key . '.blade.php'), 'The selected layout must resolve to a view.');
}
echo "Layout registration checks passed: four selectable layouts, previews, editable styles, preserved IDs/colours and repeat-safe migration.\n";
