<?php

// Render production views with controlled public data, without a database or commerce requests.
// Usage: php tests/render-storefront-pages.php [autoload.php] [optional-preview-directory]
require $argv[1] ?? dirname(__DIR__) . '/vendor/autoload.php';
set_error_handler(function ($severity, $message, $file, $line) {
    if (error_reporting() & $severity) throw new ErrorException($message, 0, $severity, $file, $line);
    return false;
});

class Auth { public static function check() { return false; } public static function user() { return null; } }
class Session { public static function has($key) { return false; } public static function get($key, $default = null) { return $default; } }
class App { public static function getLocale() { return 'en'; } }
class StorefrontFixtureAuth { public function guest() { return true; } public function guard($name = null) { return $this; } public function check() { return false; } public function user() { return null; } }
function auth() { return new StorefrontFixtureAuth(); }
function isAdmin() { return false; }
function isCustomer() { return false; }
function areActiveRoutes($routes, $class = '') { return ''; }
function translate($text) { return $text; }
function env($key, $default = null) { return $key === 'APP_NAME' ? 'Rewa Shop' : $default; }
function get_setting($key, $default = null, $lang = false) { return $GLOBALS['settings'][$key] ?? $default; }
function route($name, $value = null) { return '/' . $name . ($value ? (is_array($value) ? '?' . http_build_query($value) : '/' . $value) : ''); }
function static_asset($path) { return '/public/' . $path; }
function uploaded_asset($id) { return $id ? '/fixture-assets/' . $id : null; }
function config($key, $default = null) { return Illuminate\Support\Arr::get(['storefront_layouts' => require dirname(__DIR__) . '/config/storefront_layouts.php'], $key, $default); }
function request() { return new class { public function query() { return ['search' => "women's", 'selected_categories' => ['shopping']]; } }; }
function url() { return new class { public function current() { return '/'; } }; }
function get_all_blog_categories() { return collect([(object)['slug' => 'shopping', 'category_name' => 'Shopping guides'], (object)['slug' => 'community', 'category_name' => 'Community']]); }
function get_all_active_language() { return collect([(object)['name' => 'English', 'code' => 'en'], (object)['name' => 'Hausa', 'code' => 'ha']]); }
function get_all_active_currency() { return collect([(object)['name' => 'Naira', 'code' => 'NGN', 'symbol' => '₦'], (object)['name' => 'US Dollar', 'code' => 'USD', 'symbol' => '$']]); }
function get_system_language() { return get_all_active_language()->first(); }
function get_system_currency() { return get_all_active_currency()->first(); }
function get_level_zero_categories() { return collect(); }
function get_user_cart() { return collect(); }
function get_wishlists() { return collect(); }
function single_price($amount) { return '₦' . number_format($amount, 2); }
function addon_is_activated($identifier) { return $GLOBALS['addonsEnabled'] ?? false; }
function csrf_field() { return '<input type="hidden" name="_token" value="fixture">'; }
function csrf_token() { return 'fixture'; }

class StorefrontFixtureEnvironment
{
    use Illuminate\View\Concerns\ManagesLoops;
    use Illuminate\View\Concerns\ManagesLayouts;
    private $compiler;
    public function __construct() { $this->compiler = new Illuminate\View\Compilers\BladeCompiler(new Illuminate\Filesystem\Filesystem(), sys_get_temp_dir()); }
    public function make($view, $data = [], $merge = []) {
        return new class($this, $view, array_merge($merge, $data)) {
            public function __construct(private $environment, private $view, private $data) {}
            public function render() { return $this->environment->render($this->view, $this->data); }
        };
    }
    public function render($view, $data = []) {
        if (in_array($view, ['frontend.layouts.app', 'backend.layouts.app'])) return $this->yieldContent('content');
        $path = dirname(__DIR__) . '/resources/views/' . str_replace('.', '/', $view) . '.blade.php';
        $template = $this->compiler->compileString(file_get_contents($path));
        extract($data, EXTR_SKIP);
        $__env = $this;
        ob_start();
        try { eval('?>' . $template); return ob_get_contents(); } finally { ob_end_clean(); }
    }
}
class StorefrontFixtureBlogPage extends Illuminate\Support\Collection
{
    public array $queries = [];
    public function total() { return $this->count(); }
    public function appends($query) { $this->queries = $query; return $this; }
    public function links() { return new Illuminate\Support\HtmlString('<nav aria-label="Pagination"><a href="?page=2&amp;search=women%27s&amp;selected_categories%5B0%5D=shopping">2</a></nav>'); }
}
class StorefrontFixtureBrand
{
    public function __construct(public string $name, public string $slug, public ?string $logo) {}
    public function getTranslation($field) { return $this->$field; }
}
class StorefrontFixtureDeal
{
    public function __construct(public string $title, public string $slug, public ?string $banner, public int $end_date) {}
    public function getTranslation($field) { return $this->$field; }
}

$assert = function ($valid, $message): void { if (!$valid) throw new RuntimeException($message); };
$previews = $argv[2] ?? null;
$render = function ($view, $data, $name = null) use ($previews) {
    $environment = new StorefrontFixtureEnvironment();
    $html = $environment->render($view, $data);
    if ($previews && $name) {
        if (!is_dir($previews)) mkdir($previews, 0700, true);
        file_put_contents($previews . '/' . $name . '.html', $html);
    }
    return $html;
};
$settings = [
    'homepage_select' => 'market', 'header_element' => 873, 'header_stikcy' => 'on', 'vendor_system_activation' => 1,
    'show_language_switcher' => 'on', 'show_currency_switcher' => 'on', 'newsletter_activation' => 1,
    'show_social_links' => 1, 'facebook_link' => 'https://example.test/social',
    'header_menu_labels' => '["Shop","Flash deals","Journal","Brands","All categories"]',
    'header_menu_links' => '["/","/flash-deals","/blog","/brands","/categories"]',
    'header_logo' => 'logo', 'footer_logo' => 'logo', 'about_us_description' => 'Your favourite online shop.',
    'contact_address' => 'Abuja, Nigeria', 'contact_email' => 'hello@example.test', 'contact_phone' => '+234 810 000 0000',
    'widget_one' => 'Discover', 'widget_one_labels' => '["Privacy policy","Terms and conditions"]',
    'widget_one_links' => '["/privacy","/terms"]', 'payment_method_images' => 'payment',
    'frontend_copyright_text' => '© Rewa Shop', 'search_bg_color' => '#f4f2ec', 'search_text_color' => '#20251f',
    'top_header_bg_color' => '#ffffff', 'top_header_text_color' => '#20251f', 'middle_header_bg_color' => '#ffffff',
    'middle_header_text_color' => '#20251f', 'bottom_header_bg_color' => '#20251f', 'bottom_header_text_color' => '#ffffff',
    'footer_bg_color' => '#20251f', 'footer_text_color' => '#f4f2ec',
];
$blogs = new StorefrontFixtureBlogPage(array_map(fn ($id) => (object)[
    'id' => $id, 'title' => $id === 1 ? 'Small details. Better everyday shopping.' : ['A guide to finding your next favourite', 'Meet the makers behind the brands', 'Make more room for the things you love'][($id - 2) % 3],
    'slug' => 'story-' . $id, 'banner' => 'story-' . $id, 'category' => get_all_blog_categories()->first(),
    'created_at' => Carbon\Carbon::parse('2026-10-10'), 'short_description' => 'From useful product details to new brands, find ideas for your next purchase on Rewa.',
    'description' => '<p>A shopping guide should help you decide what works for you.</p><h2>Start with what you need</h2><p>' . str_repeat('Choose products you will use and read the details before buying. ', 30) . '</p><h3>Read the product details</h3><p>' . str_repeat('Compare the options and check the size, materials and delivery information. ', 20) . '</p><h2>Explore the marketplace</h2><p>Discover brands and sellers on Rewa.</p><table><tr><td>' . str_repeat('Long product specification ', 20) . '</td></tr></table>',
    'meta_title' => 'A shopping guide', 'meta_description' => 'Shopping on Rewa', 'meta_keywords' => 'shopping', 'meta_img' => 'story-1',
], range(1, 7)));
$blogData = ['blogs' => $blogs, 'search' => null, 'selected_categories' => [], 'recent_blogs' => $blogs];
$html = $render('frontend.market.blog.listing', $blogData, 'journal');
$assert(substr_count($html, 'class="journal-card ') === 7 && substr_count($html, 'journal-card-featured') === 1, 'The lead story must appear once and preserve every paginated story.');
$assert($blogs->queries === request()->query(), 'Pagination must preserve searches and categories.');
$filtered = $render('frontend.blog.listing', array_merge($blogData, ['search' => "women's", 'selected_categories' => ['shopping']]));
$assert(str_contains($filtered, 'women&#039;s') && str_contains($filtered, 'checked') && str_contains($filtered, 'Clear filters'), 'Search/category state must render and escape correctly in every theme.');
$empty = $render('frontend.market.blog.listing', array_merge($blogData, ['blogs' => new StorefrontFixtureBlogPage()]));
$assert(str_contains($empty, 'No stories found'), 'An empty journal must explain its state.');
$html = $render('frontend.market.blog.details', ['blog' => $blogs->first(), 'recent_blogs' => $blogs], 'article');
$assert(str_contains($html, 'data-article-body') && str_contains($html, '<h2>Start with what you need</h2>') && substr_count($html, 'class="journal-card ') === 3, 'Rich content and related stories must render.');
$assert(!str_contains($html, '/blog.details/story-1'), 'Related stories must exclude the current article.');
$settings['facebook_comment'] = 1;
$html = $render('frontend.blog.details', ['blog' => $blogs->first(), 'recent_blogs' => collect()]);
$assert(str_contains($html, 'fb-comments') && !str_contains($html, 'Keep reading'), 'Comments and empty related-story states must be retained.');
unset($settings['facebook_comment']);

$brands = collect(array_map(fn ($name, $index) => new StorefrontFixtureBrand($name, 'brand-' . $index, $index === 0 ? null : 'brand-' . $index), ['Apple', 'Canon', 'Dell', 'Google', 'HP', 'LG', 'Lenovo', 'Microsoft', 'Nike', 'Nokia', 'Oppo', 'Philips', 'Samsung', 'Sony', 'Tecno', 'Xiaomi', 'Élan', 'نور', '3M', 'Brands & makers'], range(0, 19)));
$html = $render('frontend.all_brand', ['brands' => $brands], 'brands');
$assert(substr_count($html, 'class="brand-tile"') === 20 && str_contains($html, 'brand-monogram') && str_contains($html, 'Brands &amp; makers'), 'Brand links, missing logos and translated/escaped names must render.');
$assert(str_contains($html, 'data-brand-initial="#"') && str_contains($html, 'نور'), 'Non-Latin and numeric brand names must remain available.');
$html = $render('frontend.all_brand', ['brands' => collect(), 'brandSearch' => 'missing']);
$assert(str_contains($html, 'No brands found') && !str_contains($html, 'data-brand-empty hidden'), 'Empty brand searches must show their fallback.');

$deals = collect(array_map(fn ($id) => new StorefrontFixtureDeal(['Everyday essentials', 'A fresh look for your home', 'Discover your next upgrade'][$id - 1], 'deal-' . $id, 'deal-' . $id, strtotime('+2 days')), range(1, 3)));
$settings['flash_deal_banner_small'] = 'mobile-promo';
$html = $render('frontend.flash_deal.all_flash_deal_list', ['all_flash_deals' => $deals], 'deals');
$assert(substr_count($html, 'class="deal-card"') === 3 && substr_count($html, 'class="aiz-count-down"') === 3, 'Every active campaign must retain its destination and timer.');
$assert(substr_count($html, '/fixture-assets/mobile-promo') === 2, 'A mobile-only banner must also fill the desktop fallback.');
$assert(!str_contains($html, 'particles-js'), 'Deals must not depend on a background particle canvas.');
$html = $render('frontend.flash_deal.all_flash_deal_list', ['all_flash_deals' => collect()]);
$assert(str_contains($html, 'No flash deals right now'), 'An empty campaign list must retain marketplace navigation.');
unset($settings['flash_deal_banner_small']);

$chromeData = ['system_language' => get_system_language(), 'user' => null, 'user_avatar' => '', 'cart_count' => 0, 'lang' => 'en', 'hot_categories' => collect(), 'featured_categories' => collect()];
$switcherScripts = $render('frontend.inc.header_switcher_scripts', [], 'header-switcher-scripts');
$layout = file_get_contents(dirname(__DIR__) . '/resources/views/frontend/layouts/app.blade.php');
$assert(str_contains($layout, "@include('frontend.inc.header_switcher_scripts')") && !str_contains($layout, "get_setting('header_element') =="), 'Switcher handlers must load through the shared layout without hard-coded database ID gates.');
$assert(str_contains($switcherScripts, 'function changeLanguage') && str_contains($switcherScripts, 'function changeCurrency'), 'Headers with inline controls need both switcher handlers, including Header 8 with an arbitrary database ID.');
foreach ([8, 9] as $number) {
    $html = $render('header.header' . $number, $chromeData, 'header' . $number);
    foreach (['name="keyword"', 'id="cart_items"', 'Become a Seller', 'stikcy-header-visibility'] as $feature) $assert(str_contains($html, $feature), 'Missing native header feature: ' . $feature);
    $settings['header_stikcy'] = 'off';
    $html = $render('header.header' . $number, $chromeData);
    $assert(!preg_match('/<header[^>]*\bsticky-top\b/', $html), 'The selected header must honour non-sticky mode.');
    $settings['header_stikcy'] = 'on';
    foreach ([11, 13, 14] as $megamenu) {
        $settings['megamenu_element'] = $megamenu;
        $html = $render('header.header' . $number, $chromeData);
        $assert(str_contains($html, 'id="mega-menu"'), 'Every existing megamenu choice must remain available.');
    }
    unset($settings['megamenu_element']);
    $settings['show_full_width_header'] = 'on';
    $html = $render('header.header' . $number, $chromeData);
    $assert(str_contains($html, 'layout-container'), 'Full-width headers must retain their configured container.');
    unset($settings['show_full_width_header']);
}
foreach ([4, 5] as $number) {
    $settings['footer_bg_color'] = $number === 4 ? '#f4f2ec' : '#20251f';
    $settings['footer_text_color'] = $number === 4 ? '#20251f' : '#f4f2ec';
    $html = $render('footer.footer' . $number, $chromeData, 'footer' . $number);
    foreach (['subscribers.store', '/privacy', 'hello@example.test', 'purchase_history.index', '/fixture-assets/payment'] as $feature) $assert(str_contains($html, $feature), 'Missing native footer feature: ' . $feature);
    $settings['newsletter_activation'] = 0;
    $html = $render('footer.footer' . $number, $chromeData);
    $assert(!str_contains($html, 'subscribers.store'), 'The newsletter toggle must remain effective.');
    $settings['newsletter_activation'] = 1;
    $addonsEnabled = true;
    $html = $render('footer.footer' . $number, $chromeData);
    $assert(str_contains($html, 'affiliate.apply') && str_contains($html, 'deliveryboy.login'), 'Addon-dependent footer links must remain available.');
    $addonsEnabled = false;
}
foreach (['header' => [8, 9], 'footer' => [4, 5]] as $kind => $numbers) {
    $types = collect(array_map(fn ($number) => (object)['id' => 100 + $number, 'name' => ucfirst($kind) . ' ' . $number], array_reverse($numbers)));
    $settings[$kind . '_element'] = 100 + $numbers[0];
    $environment = new StorefrontFixtureEnvironment();
    $html = $environment->render('backend.website_settings.select_' . $kind, ['element_types' => $types]);
    if ($previews) file_put_contents($previews . '/picker-' . $kind . '.html', $html . $environment->yieldContent('script'));
    foreach ($numbers as $number) $assert(str_contains($html, $kind . $number . '.svg'), 'Layout previews must follow type identity, including reordered records.');
    $assert(str_contains($html, 'checked') && str_contains($html, '<label for='), 'The picker must retain selected and keyboard-accessible radio controls.');
}
echo "Storefront render checks passed: journal filters/pagination, articles, brands, deals, native chrome controls, configuration and picker previews.\n";
