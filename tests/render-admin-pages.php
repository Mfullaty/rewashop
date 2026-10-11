<?php

// Production admin Blade templates with controlled data and permissions, without a live database.
// Usage: php tests/render-admin-pages.php /isolated/laravel-view/vendor/autoload.php [optional-preview-directory]
// The fixture defines app helpers, so do not load the application's Helpers.php here.
if (!isset($argv[1]) || !is_file($argv[1])) {
    fwrite(STDERR, "Provide an isolated illuminate/view autoloader for the fixture renderer.\n");
    exit(1);
}
require $argv[1];
set_error_handler(function ($severity, $message, $file, $line) {
    if (error_reporting() & $severity) throw new ErrorException($message, 0, $severity, $file, $line);
    return false;
});
class AdminFixtureUser {
    public $id = 1;
    public $name = 'Mustapha Ibrahim';
    public $user_type = 'admin';
    public $avatar_original = 'avatar';
    public $unreadNotifications;
    public function __construct() { $this->unreadNotifications = collect([(object)['id' => 1]]); }
    public function can($permission) { return $GLOBALS['permissions'] === null || in_array($permission, $GLOBALS['permissions'], true); }
}
class AdminFixtureGate {
    public function check($permission) { return auth()->user()->can($permission); }
    public function any($permissions) { foreach ($permissions as $permission) if ($this->check($permission)) return true; return false; }
}
class Auth { public static function user() { return $GLOBALS['adminUser']; } public static function check() { return true; } public static function id() { return 1; } }
class App { public static function getLocale() { return $GLOBALS['locale']; } }
class Session { public static function has($key) { return $key === 'locale'; } public static function get($key, $default = null) { return $key === 'locale' ? App::getLocale() : $default; } }
class Config { public static function get($key) { return 'en'; } }
class Route { public static function currentRouteName() { return 'admin.dashboard'; } public static function is(...$routes) { return in_array('admin.dashboard', $routes); } }
class DB { public static function table($table) { return new AdminFixtureQuery($table); } }
class CoreComponentRepository { public static function instantiateShopRepository() {} public static function initializeCache() {} }
class Str extends Illuminate\Support\Str {}
class AdminFixtureQuery {
    public function __construct(private $model) {}
    public function __call($name, $arguments) {
        if ($name === 'get' || $name === 'pluck') {
            if ($this->model === 'Language') return collect([(object)['code' => 'en', 'name' => 'English', 'rtl' => 0], (object)['code' => 'ar', 'name' => 'Arabic', 'rtl' => 1]]);
            return collect();
        }
        if ($name === 'first') return (object)['rtl' => App::getLocale() === 'ar' ? 1 : 0, 'name' => $this->model === 'CategoryTranslation' ? 'Home & living' : 'Rewa Collection', 'status' => 1];
        if ($name === 'count') return 2;
        if ($name === 'sum') return 482500;
        if ($name === 'exists') return false;
        return $this;
    }
}
class AdminFixtureModel { public static function __callStatic($method, $arguments) { return (new AdminFixtureQuery(static::MODEL))->$method(...$arguments); } }
foreach (['Language','Preorder','Shop','Conversation','CategoryTranslation','BrandTranslation','Brand','Attribute','Color','FlashDeal','Note','Tax','Unit','Warranty','OrderDetail'] as $model) {
    eval('namespace App\\Models; class ' . $model . ' extends \\AdminFixtureModel { const MODEL = "' . $model . '"; }');
}
class AdminFixturePage extends Illuminate\Support\Collection {
    public function appends($query) { return $this; }
    public function links() { return new Illuminate\Support\HtmlString('<nav aria-label="Pagination"><ul class="pagination"><li class="page-item active"><span class="page-link">1</span></li><li class="page-item"><a class="page-link" href="?page=2">2</a></li></ul></nav>'); }
    public function firstItem() { return 1; }
    public function total() { return $this->count(); }
    public function currentPage() { return 1; }
    public function perPage() { return 15; }
    public function hasPages() { return true; }
}
class AdminFixtureRecord {
    public function __construct(private array $data) {}
    public function __get($key) { return $this->data[$key] ?? null; }
    public function __isset($key) { return isset($this->data[$key]); }
    public function getTranslation($key) { return $this->data[$key] ?? ''; }
}
function auth() { return new class { public function user() { return Auth::user(); } public function check() { return true; } }; }
function app($abstract = null) { return $abstract ? new AdminFixtureGate() : new class { public function getLocale() { return App::getLocale(); } }; }
function translate($text, ...$arguments) { return $text; }
function get_setting($key, $default = null, $lang = false) { return $GLOBALS['settings'][$key] ?? $default; }
function env($key, $default = null) { return in_array($key, ['MAIL_USERNAME', 'MAIL_PASSWORD']) ? 'fixture' : ($key === 'DEFAULT_LANGUAGE' ? 'en' : $default); }
function static_asset($path) { return '/public/' . $path; }
function uploaded_asset($id) { return $id ? '/fixture-assets/' . $id : null; }
function route($name, $value = null) { return '/admin/' . $name . ($value ? (is_array($value) ? '?' . http_build_query($value) : '/' . $value) : ''); }
function getBaseURL() { return 'https://rewashop.test'; }
function getFileBaseURL() { return 'https://rewashop.test/public'; }
function csrf_token() { return 'fixture'; }
function csrf_field() { return '<input type="hidden" name="_token" value="fixture">'; }
function session($key = null, $default = null) { return $default; }
function old($key, $default = null) { return $default; }
function areActiveRoutes($routes, $class = 'active') { return in_array('admin.dashboard', $routes) ? $class : ''; }
function addon_is_activated($name) { return $GLOBALS['addonsEnabled']; }
function get_admin() { return Auth::user(); }
function get_non_viewed_preorder_conversations() { return 2; }
function now() { return Carbon\Carbon::parse('2026-10-11'); }
function single_price($amount) { return '₦' . number_format($amount, 2); }
function number_format_short($amount) { return '₦' . number_format($amount / 1000000, 1) . 'm'; }
function request($key = null) { return $key ? null : new class { public function input() { return []; } public function get($key, $default = null) { return $default; } }; }
function url($path = '') { return 'https://rewashop.test/' . ltrim($path, '/'); }
function timezones() { return ['UTC' => 'UTC', 'Lagos' => 'Africa/Lagos']; }
function app_timezone() { return 'Africa/Lagos'; }
function encrypt($value) { return (string)$value; }
function discount_in_percentage($product) { return 15; }
function renderStarRatingLatest($rating) { return new Illuminate\Support\HtmlString(str_repeat('<i class="las la-star"></i>', 5)); }

class AdminFixtureEnvironment {
    use Illuminate\View\Concerns\ManagesLoops;
    use Illuminate\View\Concerns\ManagesLayouts;
    use Illuminate\View\Concerns\ManagesStacks;
    private $compiler;
    public function __construct() { $this->compiler = new Illuminate\View\Compilers\BladeCompiler(new Illuminate\Filesystem\Filesystem(), sys_get_temp_dir()); }
    public function make($view, $data = [], $merge = []) {
        return new class($this, $view, array_merge($merge, $data)) {
            public function __construct(private $environment, private $view, private $data) {}
            public function render() { return $this->environment->render($this->view, $this->data); }
        };
    }
    public function render($view, $data = []) {
        $path = dirname(__DIR__) . '/resources/views/' . str_replace('.', '/', $view) . '.blade.php';
        $compiled = $this->compiler->compileString(file_get_contents($path));
        extract($data, EXTR_SKIP);
        $__env = $this;
        ob_start();
        try { eval('?>' . $compiled); return ob_get_contents(); } finally { ob_end_clean(); }
    }
}
$adminUser = new AdminFixtureUser();
$permissions = null;
$locale = 'en';
$addonsEnabled = false;
$settings = ['site_name' => 'Rewa Shop', 'website_name' => 'Rewa Shop', 'site_motto' => 'Admin workspace', 'current_version' => '10.4', 'navbar_bg_color' => '#ffffff', 'navbar_text_color' => 'black', 'vendor_system_activation' => 1, 'coupon_system' => 1, 'order_delivery_status' => '[]', 'order_payment_status' => '[]'];
$settings['thermal_printer'] = '[]';
$data = [];
preg_match_all('/\$(total_\w+|\w+_order_percentage)\b/', file_get_contents(dirname(__DIR__) . '/resources/views/backend/dashboard.blade.php'), $variables);
foreach ($variables[1] as $name) $data[$name] = str_contains($name, 'percentage') ? 68 : 128;
$data = array_merge($data, [
    'errors' => new Illuminate\Support\ViewErrorBag(),
    'total_customers' => 8426, 'total_products' => 3120, 'total_categories' => 48, 'total_brands' => 126,
    'total_sale' => 18542000, 'total_sellers' => 236, 'sale_this_month' => 2435000,
    'admin_sale_this_month' => (object)['total_sale' => 1280000], 'seller_sale_this_month' => (object)['total_sale' => 1155000],
    'top_customers' => collect(array_fill(0, 4, (object)['name' => 'Customer', 'avatar_original' => 'avatar'])),
    'top_sellers' => collect(array_fill(0, 4, (object)['name' => 'Seller', 'avatar_original' => 'avatar'])),
    'top_categories' => collect([(object)['id' => 1, 'total' => 184000]]), 'top_brands' => collect([(object)['id' => 1, 'total' => 84000]]),
    'sales_stat' => array_combine(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'], array_map(fn($amount) => [(object)['total' => $amount]], [430000,620000,940000,760000,860000,1230000,1450000,1330000,1740000,2435000])),
    'payment_type_wise_inhouse_sale' => collect(), 'inhouse_product_rating' => 4.8,
    'categories' => collect(), 'product_types' => ['All Products', 'In-house Products', 'Seller Products'], 'seller_type' => 'all', 'source' => 'all',
    'order_types' => 'All Orders', 'seller_types' => ['All Orders', 'In-house Orders', 'Seller Orders'], 'unpaid_order_payment_notification' => (object)['status' => 1],
    'order_from' => 'all',
    'sellers' => new AdminFixturePage([(object)['name' => 'Rewa Collection', 'user' => (object)['id' => 4, 'name' => 'Amina Bello', 'products' => collect([(object)['num_of_sale' => 248]])]], (object)['name' => 'Classic Home & Living', 'user' => (object)['id' => 5, 'name' => 'Tunde Ibrahim', 'products' => collect([(object)['num_of_sale' => 106]])]]]),
    'sort_by' => null, 'addons' => new AdminFixturePage([(object)['id' => 1, 'name' => 'POS System', 'unique_identifier' => 'pos_system', 'activated' => 1, 'image' => 'assets/img/multivendor.jpg', 'version' => '2.0']]),
]);
preg_match_all('/\$(isOwned\w+)/', file_get_contents(dirname(__DIR__) . '/resources/views/backend/addons/index.blade.php'), $owned);
foreach ($owned[1] as $name) $data[$name] = true;
$previews = $argv[2] ?? null;
if ($previews && !is_dir($previews)) mkdir($previews, 0700, true);
$assert = function ($valid, $message) { if (!$valid) throw new RuntimeException($message); };
$pages = ['dashboard' => 'backend.dashboard', 'products' => 'backend.product.products.index', 'product-create' => 'backend.product.products.create', 'orders' => 'backend.sales.index', 'report' => 'backend.reports.seller_sale_report', 'settings' => 'backend.setup_configurations.general_settings', 'navigation-settings' => 'backend.website_settings.manage_admin_panel', 'addons' => 'backend.addons.index'];
foreach ($pages as $name => $view) {
    $html = (new AdminFixtureEnvironment())->render($view, $data);
    $assert(str_contains($html, 'class="rewa-admin"') && str_contains($html, 'id="admin-content"'), $name . ': shared admin shell missing');
    $assert(str_contains($html, 'globalRightOffcanvas') && str_contains($html, 'bulk-action-modal'), $name . ': native panels missing');
    if ($name === 'product-create') $assert(str_contains($html, 'id="aizSubmitForm"') && str_contains($html, 'data-toggle="aizuploader"') && str_contains($html, 'name="_token"'), 'Native product form, upload controls or CSRF missing');
    if ($previews) file_put_contents($previews . '/' . $name . '.html', $html);
}
$products = new AdminFixturePage();
$orders = new AdminFixturePage();
foreach (['Classic leather carryall', 'Everyday linen collection', 'Handcrafted ceramic vase'] as $key => $name) {
    $products->push(new AdminFixtureRecord(['id' => $key + 1, 'name' => $name, 'slug' => 'product-' . $key, 'thumbnail_img' => 'product-' . $key, 'brand' => (object)['id' => 1, 'name' => 'Rewa Collection'], 'user' => (object)['shop' => null], 'main_category' => (object)['name' => 'Lifestyle'], 'rating' => 4.8, 'reviews' => collect(), 'unit_price' => 42500, 'num_of_sale' => 248, 'published' => 1, 'approved' => 1, 'featured' => 0, 'todays_deal' => 0, 'digital' => 0, 'draft' => 0]));
    $orders->push(new AdminFixtureRecord(['id' => $key + 1, 'code' => '20261011-100' . $key, 'user' => (object)['id' => 12, 'name' => 'Amina Bello', 'email' => 'amina@example.test', 'phone' => '+234 800 000 0000'], 'shop' => (object)['id' => 1, 'name' => 'Rewa Collection'], 'seller_id' => 1, 'orderDetails' => collect(), 'refund_requests' => collect(), 'grand_total' => 85000, 'delivery_status' => 'pending', 'payment_status' => 'paid', 'payment_type' => 'bank_transfer', 'order_from' => 'web', 'order_source' => 'inhouse', 'shipping_method' => 'standard', 'order_note' => 'Please deliver before Friday', 'viewed' => 0]));
}
$productTable = (new AdminFixtureEnvironment())->render('backend.product.products.products_table', array_merge($data, ['products' => $products, 'ptoduct_type' => 'all', 'type' => 'all', 'route' => 'products.all']));
$orderTable = (new AdminFixtureEnvironment())->render('backend.sales.orders_table', array_merge($data, ['orders' => $orders, 'thermal_printer' => []]));
$assert(str_contains($productTable, 'check-all') && str_contains($orderTable, '20261011-1000'), 'Native listing controls missing');
if ($previews) { file_put_contents($previews . '/products-table.html', $productTable); file_put_contents($previews . '/orders-table.html', $orderTable); }
$addonsEnabled = true;
$settings['conversation_system'] = 1;
$locale = 'ar';
$settings['navbar_bg_color'] = '#202438';
$settings['navbar_text_color'] = 'white';
$rtl = (new AdminFixtureEnvironment())->render('backend.dashboard', $data);
$assert(str_contains($rtl, 'dir="rtl"') && str_contains($rtl, '/admin/poin-of-sales.index'), 'RTL or activated-addon navigation missing');
if ($previews) file_put_contents($previews . '/dashboard-rtl.html', $rtl);
$permissions = ['admin_dashboard', 'view_all_orders'];
$restricted = (new AdminFixtureEnvironment())->render('backend.dashboard', $data);
$assert(!str_contains($restricted, '/admin/products.create') && !str_contains($restricted, 'rewa-toolbar-create'), 'Restricted role sees product creation');
$assert(str_contains($restricted, '/admin/all_orders.index'), 'Restricted role lost authorised order navigation');
if ($previews) file_put_contents($previews . '/dashboard-restricted.html', $restricted);
$permissions = null;
$settings['vendor_system_activation'] = 0;
$singleVendor = (new AdminFixtureEnvironment())->render('backend.dashboard', $data);
$assert(str_contains($singleVendor, 'Activate Vendor System'), 'Single-vendor configuration lost its existing activation control');
echo "Rendered 8 native admin pages; checked RTL, addon, restricted-role and single-vendor states.\n";
