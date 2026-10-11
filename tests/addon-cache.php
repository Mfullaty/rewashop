<?php

// Exercise the real core facade and application binding without a database or network.
// Usage: php tests/addon-cache.php [path/to/vendor/autoload.php]
namespace App\Models {
    class Addon
    {
        public static array $records = [];
        public static int $reads = 0;

        public function __construct(public string $unique_identifier, public int $activated, public ?string $purchase_code) {}

        public static function all()
        {
            self::$reads++;
            return collect(array_map(fn ($addon) => clone $addon, self::$records));
        }

        public function save()
        {
            throw new \RuntimeException('Cache initialization attempted to change an installed addon.');
        }
    }
}

namespace {
    use App\Models\Addon;
    use App\Providers\AppServiceProvider;
    use App\Services\AddonRepository;
    use Illuminate\Container\Container;
    use Illuminate\Support\Facades\Cache;
    use Illuminate\Support\Facades\Facade;
    use MehediIitdu\CoreComponentRepository\CoreComponentRepository;
    use MehediIitdu\CoreComponentRepository\CoreComponentRepositoryFacade;
    use MehediIitdu\CoreComponentRepository\CoreComponentRepositoryServiceProvider;

    $root = dirname(__DIR__);
    require $argv[1] ?? $root . '/vendor/autoload.php';
    require_once $root . '/app/Providers/AppServiceProvider.php';
    require_once $root . '/app/Http/Helpers.php';

    $assert = function ($valid, $message): void {
        if (!$valid) throw new RuntimeException($message);
    };
    $cache = new class {
        public array $values = [];
        public function remember($key, $seconds, $callback) { return $this->values[$key] ??= $callback(); }
        public function forget($key) { unset($this->values[$key]); }
    };
    $app = new Container();
    $app->instance('cache', $cache);
    $app->instance('config', new class {
        private array $values = [];
        public function get($key, $default = null) { return $this->values[$key] ?? $default; }
        public function set($key, $value) { $this->values[$key] = $value; }
    });
    // Laravel registers discovered package providers before application providers.
    (new CoreComponentRepositoryServiceProvider($app))->register();
    Facade::clearResolvedInstances();
    Facade::setFacadeApplication($app);
    if (!class_exists('Cache')) class_alias(Cache::class, 'Cache');

    Addon::$records = [
        new Addon('african_pg', 1, ''),
        new Addon('seller_subscription', 1, null),
        new Addon('disabled_addon', 0, ''),
        new Addon('existing_addon', 1, 'existing-code'),
    ];
    (new AppServiceProvider($app))->register();
    for ($request = 0; $request < 3; $request++) CoreComponentRepositoryFacade::initializeCache();
    $assert(CoreComponentRepositoryFacade::getFacadeRoot() instanceof AddonRepository, 'The existing core facade must resolve the application addon repository.');
    $assert(Addon::$reads === 1, 'Repeated dashboard initialization must reuse the addon cache.');
    $assert($cache->values['addons']->pluck('activated')->all() === [1, 1, 0, 1], 'Blank/null purchase codes must retain installed status, including manually disabled addons.');
    $assert(addon_is_activated('african_pg') && addon_is_activated('seller_subscription'), 'Enabled addons must remain available through the storefront/admin feature helper.');
    $assert(!addon_is_activated('disabled_addon') && !addon_is_activated('missing_addon'), 'Disabled and missing addons must remain unavailable.');

    // The same invalidation used by install and the status switch must refresh the cache.
    Addon::$records[0]->activated = 0;
    Cache::forget('addons');
    CoreComponentRepositoryFacade::initializeCache();
    $assert($cache->values['addons']->first()->activated === 0, 'Manual disabling must remain effective.');
    $assert(!addon_is_activated('african_pg'), 'Feature availability must follow the disabled status.');
    Addon::$records[0]->activated = 1;
    Cache::forget('addons');
    CoreComponentRepositoryFacade::initializeCache();
    $assert($cache->values['addons']->first()->activated === 1, 'Installing or enabling an addon without a purchase code must remain effective.');
    $assert(addon_is_activated('african_pg'), 'Feature availability must follow the enabled status.');

    Addon::$records = [];
    Cache::forget('addons');
    CoreComponentRepositoryFacade::initializeCache();
    $assert(!addon_is_activated('african_pg'), 'An empty addon list must be supported.');
    Addon::$records[] = new Addon('new_addon', 1, '');
    Cache::forget('addons');
    CoreComponentRepositoryFacade::initializeCache();
    $assert(addon_is_activated('new_addon'), 'Installing after an empty cache must expose the addon.');

    $method = new ReflectionMethod(AddonRepository::class, 'instantiateShopRepository');
    $assert($method->getDeclaringClass()->getName() === CoreComponentRepository::class, 'The addon cache override must preserve the separate base-item verification method.');
    echo "Addon checks passed: facade binding, blank/null codes, repeated dashboard requests, manual status and cache refresh.\n";
}
