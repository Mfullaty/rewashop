<?php

return [
    'enabled' => (bool) env('POS_ENABLED', false),
    // Enable only after the deployed addon/import stock writers pass the staging audit.
    'offline_enabled' => (bool) env('POS_OFFLINE_ENABLED', false),
    'schema_version' => 1,
    'currency' => env('POS_CURRENCY', 'NGN'),
    'minor_exponent' => 2,
    'max_amount_minor' => 1000000000000,
    'max_quantity' => 10000,
    'max_lines' => 200,
    'max_batch' => 100,
    'max_body_bytes' => 1048576,
    'pairing_minutes' => 5,
    'token_days' => 30,
    'offline_policy_hours' => 24,
    'signing_key_path' => storage_path('app/pos-policy.key'),
    'max_reserved_units' => 1000,
    'max_offline_sale_minor' => 100000000,
    'snapshot_hours' => 24,
    'abilities' => [
        'pos:catalog:read', 'pos:inventory:read', 'pos:sale:write',
        'pos:sale:read', 'pos:shift:write', 'pos:sync', 'pos:receipt:read',
    ],
    'permissions' => [
        'pos:catalog:read', 'pos:inventory:read', 'pos:inventory:write',
        'pos:sale:write', 'pos:sale:read', 'pos:shift:write',
        'pos:refund:write', 'pos:void:write', 'pos:discount:write',
        'pos:price:override', 'pos:payment:verify', 'pos:cash:write',
        'pos:receipt:read', 'pos:receipt:reprint', 'pos:report:read',
        'pos:device:manage', 'pos:staff:manage', 'pos:settings:manage', 'pos:sync',
    ],
];
