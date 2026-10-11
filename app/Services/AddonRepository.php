<?php

namespace App\Services;

use App\Models\Addon;
use Illuminate\Support\Facades\Cache;
use MehediIitdu\CoreComponentRepository\CoreComponentRepository;

class AddonRepository extends CoreComponentRepository
{
    public static function initializeCache()
    {
        // ZIP installs use the local status switch; cache reads must never disable them.
        Cache::remember('addons', 86400, fn () => Addon::all());
    }
}
