<?php

// Compile and PHP-lint every admin view, including addon views sharing its layout.
// Usage: php tests/compile-admin-views.php [path/to/vendor/autoload.php]
require $argv[1] ?? dirname(__DIR__) . '/vendor/autoload.php';
$root = dirname(__DIR__);
$cache = sys_get_temp_dir() . '/rewa-admin-blade-' . bin2hex(random_bytes(6));
mkdir($cache, 0700, true);
$compiler = new Illuminate\View\Compilers\BladeCompiler(new Illuminate\Filesystem\Filesystem(), $cache);
$container = Illuminate\Container\Container::getInstance();
$factory = new Illuminate\View\Factory(new Illuminate\View\Engines\EngineResolver(), new Illuminate\View\FileViewFinder(new Illuminate\Filesystem\Filesystem(), [$root . '/resources/views']), new Illuminate\Events\Dispatcher($container));
$container->instance(Illuminate\Contracts\View\Factory::class, $factory);
foreach (glob($root . '/resources/views/components/*.blade.php') as $component) {
    $name = basename($component, '.blade.php');
    $compiler->component('components.' . $name, $name);
}
$count = 0;
$failures = [];
try {
    foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root . '/resources/views')) as $file) {
        if (!$file->isFile() || !str_ends_with($file->getFilename(), '.blade.php')) continue;
        $source = file_get_contents($file->getPathname());
        if (!str_contains($file->getPathname(), '/backend/') && !str_contains($source, "backend.layouts.app")) continue;
        $compiled = $cache . '/' . md5($file->getPathname()) . '.php';
        file_put_contents($compiled, $compiler->compileString($source));
        $output = [];
        exec(escapeshellarg(PHP_BINARY) . ' -n -l ' . escapeshellarg($compiled) . ' 2>&1', $output, $status);
        if ($status !== 0) $failures[] = $file->getPathname() . ': ' . implode("\n", $output);
        $count++;
    }
} finally {
    foreach (glob($cache . '/*') as $file) unlink($file);
    rmdir($cache);
}
if ($failures) { fwrite(STDERR, implode("\n", $failures) . "\n"); exit(1); }
echo "Compiled and PHP-linted {$count} admin Blade views.\n";
