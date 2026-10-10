<?php

// Render actual Blade with controlled data for hero and localized coupon regressions.
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
function get_setting($key, $default = null, $lang = false) { return ($lang ? ($GLOBALS['settings'][$key . ':' . $lang] ?? null) : null) ?? $GLOBALS['settings'][$key] ?? $default; }
function csrf_field() { return '<input type="hidden" name="_token" value="test">'; }
function translate($value) { return $value; }
function route($name, $value = null) { return '/' . $name . ($value ? '/' . $value : ''); }
function uploaded_asset($value) { return $value ? '/upload/' . $value : null; }
function static_asset($value) { return '/public/' . $value; }
function my_asset($value) { return '/public/' . $value; }
function get_slider_images($ids) { return collect(array_map(fn ($id) => (object) ['file_name' => 'slider-' . $id . '.jpg'], $ids)); }
$compiler = new Illuminate\View\Compilers\BladeCompiler(new Illuminate\Filesystem\Filesystem(), sys_get_temp_dir());
$template = $compiler->compileString(file_get_contents($root . '/resources/views/frontend/market/partials/hero.blade.php'));
$render = function (array $fixtureSettings, $categories, string $fixtureLang = 'en', ?string $view = null) use ($template, $compiler, $root): string {
    if ($view) $template = $compiler->compileString(file_get_contents($root . '/resources/views/' . $view . '.blade.php'));
    $GLOBALS['settings'] = $fixtureSettings;
    $lang = $fixtureLang;
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
$mobileOnly = $render(['small_home_slider_images' => '[2]'], collect());
$assert(str_contains($mobileOnly, 'slider-2.jpg') && str_contains($mobileOnly, 'market-hero-carousel d-md-none'), 'Mobile-only configuration must render its carousel.');
$assert(!str_contains($mobileOnly, 'market-hero-carousel d-none d-md-block') && !str_contains($mobileOnly, 'market-hero-categories'), 'Mobile-only configuration must not render an empty desktop carousel or replace mobile slides with categories.');
$desktopOnly = $render(['home_slider_images' => '[1]'], collect());
$assert(substr_count($desktopOnly, 'slider-1.jpg') === 2, 'Desktop slides must remain available as the mobile fallback.');
$couponSettings = ['coupon_system' => 1, 'enable_coupon_section' => 1, 'cupon_title' => 'Global heading', 'cupon_subtitle' => 'Global description', 'cupon_title:en' => 'English heading', 'cupon_subtitle:en' => 'English description', 'cupon_title:fr' => 'Offres & promotions', 'cupon_subtitle:fr' => 'Description française', 'cupon_background_color' => '#123456'];
$couponView = 'frontend/market/partials/additional_sections';
$english = $render($couponSettings, collect(), 'en', $couponView);
$french = $render($couponSettings, collect(), 'fr', $couponView);
$assert(str_contains($english, 'English heading') && str_contains($english, 'English description'), 'English coupon copy must use English settings.');
$assert(str_contains($french, 'Offres &amp; promotions') && str_contains($french, 'Description française') && !str_contains($french, 'Global heading'), 'French coupon copy must use French settings and escape merchant text.');
$editor = $render($couponSettings, collect(), 'fr', 'backend/website_settings/pages/market/additional_sections');
$assert(str_contains($editor, 'name="types[][fr]" value="cupon_title"') && str_contains($editor, 'name="types[][fr]" value="cupon_subtitle"'), 'Coupon text must be submitted with its editing language.');
$assert(str_contains($editor, 'value="Offres &amp; promotions"') && str_contains($editor, 'value="Description française"'), 'Coupon editor must display the selected language.');
$assert(str_contains($editor, 'name="types[]" value="cupon_background_color"') && str_contains($editor, 'value="#123456"'), 'Coupon background color must remain a global setting.');
$defaults = $render(['coupon_system' => 1, 'enable_coupon_section' => 1], collect(), 'fr', $couponView);
$assert(str_contains($defaults, 'Explore our coupons') && str_contains($defaults, 'See the current offers from our sellers.'), 'Missing coupon copy must retain translated defaults.');
echo "Render checks passed: hero variants/fallbacks, escaping, coupon locales and localized editor fields.\n";
