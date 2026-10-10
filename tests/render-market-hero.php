<?php

// Render actual Blade with controlled data to cover empty/localized/mobile hero states.
$root = dirname(__DIR__);
require $argv[1] ?? $root . '/vendor/autoload.php';

class MarketHeroEnvironment
{
    use Illuminate\View\Concerns\ManagesLoops;
}
class MarketFixtureCategory
{
    public string $slug = 'category';
    public string $banner = 'banner';
    public function getTranslation(string $key): string { return 'A & B'; }
}
$settings = [];
function get_setting($key, $default = null, $lang = false) { return $GLOBALS['settings'][$key] ?? $default; }
function translate($value) { return $value; }
function route($name, $value = null) { return '/' . $name . ($value ? '/' . $value : ''); }
function uploaded_asset($value) { return $value ? '/upload/' . $value : null; }
function static_asset($value) { return '/public/' . $value; }
function my_asset($value) { return '/public/' . $value; }
function get_slider_images($ids) { return collect(array_map(fn ($id) => (object) ['file_name' => 'slider-' . $id . '.jpg'], $ids)); }
$compiler = new Illuminate\View\Compilers\BladeCompiler(new Illuminate\Filesystem\Filesystem(), sys_get_temp_dir());
$template = $compiler->compileString(file_get_contents($root . '/resources/views/frontend/market/partials/hero.blade.php'));
$render = function (array $fixtureSettings, $categories) use ($template): string {
    $GLOBALS['settings'] = $fixtureSettings;
    $lang = 'en';
    $hot_categories = $categories;
    $featured_categories = $categories;
    $__env = new MarketHeroEnvironment();
    ob_start();
    try { eval('?>' . $template); return ob_get_contents(); }
    finally { ob_end_clean(); }
};
$assert = function ($valid, $message): void { if (!$valid) throw new RuntimeException($message); };
$empty = $render([], collect());
$assert(str_contains($empty, 'Discover the collection'), 'Empty store must render a working category/search fallback.');
$assert(str_contains($empty, 'Find your next favourite.'), 'Intro defaults must render.');
$categories = $render([], collect([new MarketFixtureCategory()]));
$assert(str_contains($categories, 'A &amp; B'), 'Category labels must be escaped.');
$sliders = $render(['home_slider_images' => '[1]', 'small_home_slider_images' => '[2]', 'home_slider_links' => '["/promotion"]', 'market_hero_title' => '<New collection>'], collect());
$assert(str_contains($sliders, 'slider-1.jpg') && str_contains($sliders, 'slider-2.jpg'), 'Desktop and mobile sliders must use their configured images.');
$assert(str_contains($sliders, 'href="/promotion"'), 'Configured slide link is missing.');
$assert(str_contains($sliders, '&lt;New collection&gt;'), 'Merchant intro text must be escaped.');
$disabled = $render(['enable_hot_categories' => 0], collect([new MarketFixtureCategory()]));
$assert(!str_contains($disabled, 'market-hero-topics'), 'Disabled hot-category links must stay hidden.');
echo "Hero renders passed: empty store, categories, escaped labels/copy, configured desktop/mobile images/links and section toggle.\n";
