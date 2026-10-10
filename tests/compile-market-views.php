<?php

// Compile and PHP-lint the new theme, shared integration views, and all auth layouts.
// Usage: php tests/compile-market-views.php [path/to/vendor/autoload.php]
$root = dirname(__DIR__);
$autoload = $argv[1] ?? $root . '/vendor/autoload.php';
if (!is_file($autoload)) {
    fwrite(STDERR, "Laravel autoloader not found: {$autoload}\n");
    exit(1);
}
require $autoload;

$cache = sys_get_temp_dir() . '/rewashop-market-blade-' . bin2hex(random_bytes(6));
mkdir($cache, 0700, true);
$compiler = new Illuminate\View\Compilers\BladeCompiler(new Illuminate\Filesystem\Filesystem(), $cache);
$views = [];
foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root . '/resources/views')) as $file) {
    if (!$file->isFile() || !str_ends_with($file->getFilename(), '.blade.php')) continue;
    $path = $file->getPathname();
    if (str_contains($path, '/market/') || str_contains($path, '/auth/') || in_array($path, array_map(fn ($name) => $root . '/resources/views/' . $name . '.blade.php', [
        'frontend/layouts/app', 'frontend/inc/nav', 'frontend/product_details',
        'frontend/deliveryboy_login', 'backend/website_settings/select_homepage',
    ]))) $views[] = $path;
}
$failed = [];
try {
    foreach ($views as $index => $view) {
        try {
            $compiled = $cache . '/' . $index . '.php';
            file_put_contents($compiled, $compiler->compileString(file_get_contents($view)));
            exec(escapeshellarg(PHP_BINARY) . ' -n -l ' . escapeshellarg($compiled) . ' 2>&1', $output, $status);
            if ($status !== 0) $failed[] = $view . ': ' . implode("\n", $output);
            $output = [];
        } catch (Throwable $error) {
            $failed[] = $view . ': ' . $error->getMessage();
        }
    }
} finally {
    foreach (glob($cache . '/*') as $file) unlink($file);
    rmdir($cache);
}
if ($failed) {
    fwrite(STDERR, implode("\n", $failed) . "\n");
    exit(1);
}
echo 'Compiled and PHP-linted ' . count($views) . " Blade views.\n";
