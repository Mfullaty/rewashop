<?php

namespace App\Models\Pos;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Device extends Model
{
    use HasApiTokens;

    protected $table = 'pos_devices';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $guarded = [];
    protected $casts = [
        'abilities' => 'array', 'offline_allowed' => 'boolean',
        'revoked_at' => 'datetime', 'last_seen_at' => 'datetime',
        'last_sequence' => 'integer', 'register_id' => 'integer',
        'seller_id' => 'integer', 'cashier_id' => 'integer',
    ];

    public function tokens()
    {
        return $this->morphMany(DeviceAccessToken::class, 'tokenable');
    }

    public function freshTimestamp() { return now('UTC'); }
}
