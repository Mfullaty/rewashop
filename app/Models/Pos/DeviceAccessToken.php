<?php

namespace App\Models\Pos;

use Laravel\Sanctum\PersonalAccessToken;

class DeviceAccessToken extends PersonalAccessToken
{
    // Existing personal_access_tokens.tokenable_id is numeric. Device identities
    // are UUIDs; use a separate Sanctum-compatible table without changing buyer auth.
    protected $table = 'pos_device_tokens';
    public function freshTimestamp() { return now('UTC'); }
}
