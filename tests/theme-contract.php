<?php

// Dependency-free contracts for dashboard selection and dynamic theme paths.
$root = dirname(__DIR__);
$views = $root . '/resources/views/';
$failures = [];
$check = function (bool $valid, string $message) use (&$failures): void {
    if (!$valid) $failures[] = $message;
};
$read = fn (string $path): string => file_get_contents($root . '/' . $path);

// Every merchandising partial supported by the reference theme must resolve.
foreach (glob($views . 'frontend/nexa/partials/*.blade.php') as $original) {
    $name = basename($original);
    $check(is_file($views . 'frontend/market/partials/' . $name), "Missing theme partial: {$name}");
}
foreach (['frontend/market/index', 'auction/frontend/market/auction_products_section',
    'backend/website_settings/pages/market/home_page_edit', 'frontend/market/blog/listing',
    'frontend/market/blog/details'] as $name) {
    $check(is_file($views . $name . '.blade.php'), "Missing view: {$name}");
}
// Literal includes introduced by the theme must point at existing templates.
foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($views)) as $file) {
    if (!$file->isFile() || !str_contains($file->getPathname(), '/market/')) continue;
    preg_match_all('/@include\([\'\"]([^\'\"]+)[\'\"]\s*(?:\)|,)/', file_get_contents($file->getPathname()), $matches);
    foreach ($matches[1] as $name) {
        $check(is_file($views . str_replace('.', '/', $name) . '.blade.php'), 'Missing include: ' . $name);
    }
}
$selector = $read('resources/views/backend/website_settings/select_homepage.blade.php');
$check(str_contains($selector, 'value="market"'), 'Theme is not selectable in the dashboard.');
$check(str_contains($selector, "route('business_settings.update')"), 'Theme selection must use the settings endpoint.');
foreach (['frontend/layouts/app', 'auth/layouts/authentication'] as $name) {
    $layout = file_get_contents($views . $name . '.blade.php');
    $check(str_contains($layout, "get_setting('homepage_select') === 'market'"), 'Styles must be scoped: ' . $name);
    $check(str_contains($layout, 'rewa-market.css'), 'Missing theme stylesheet: ' . $name);
}
// Auth choices still exist and still resolve to the shared themed auth layout.
foreach (['boxed', 'free', 'focused'] as $layout) {
    foreach (['user_login', 'user_registration', 'forgot_password', 'reset_password', 'verify_email', 'reg_verification', 'seller_login', 'seller_registration'] as $name) {
        $file = $views . 'auth/' . $layout . '/' . $name . '.blade.php';
        $check(is_file($file), "Missing authentication screen: {$layout}/{$name}");
    }
}
// Preserve every pre-existing homepage editor setting, including localized fields.
$referenceEditor = $read('resources/views/backend/website_settings/pages/nexa/home_page_edit.blade.php');
$marketEditor = $read('resources/views/backend/website_settings/pages/market/home_page_edit.blade.php');
preg_match_all('/<input[^>]+name="types[^>]+value="([^\"]+)"/', $referenceEditor, $settings);
foreach (array_unique($settings[1]) as $setting) {
    $check(str_contains($marketEditor, 'value="' . $setting . '"'), 'Missing dashboard setting: ' . $setting);
}
$nav = $read('resources/views/frontend/inc/nav.blade.php');
$check(str_contains($nav, 'market_header_mode') && str_contains($nav, "get_element_type_by_id(get_setting('header_element'))"), 'Selected legacy headers must remain available.');
$home = $read('resources/views/frontend/market/index.blade.php');
$check(str_contains($home, 'let loadMoreLimit = 12;') && str_contains($home, 'page = nextPage;'), 'Newest-products paging must use stable limits and advance only after success.');
foreach (['css/rewa-market.css', 'js/rewa-market.js', 'img/pages/home-market.svg'] as $asset) {
    $check(is_file($root . '/public/assets/' . $asset), 'Missing deployment asset: ' . $asset);
}
if ($failures) {
    fwrite(STDERR, implode("\n", $failures) . "\n");
    exit(1);
}
echo "Theme contracts passed: selector, dynamic views, includes, dashboard fields, auth choices, header compatibility, paging and assets.\n";
