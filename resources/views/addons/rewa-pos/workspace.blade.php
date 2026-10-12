<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow">
    <title>RewaShop POS Pro</title>
    <link rel="stylesheet" href="{{ static_asset('addons/rewa-pos/assets/pos.css') }}?v={{ $assetVersion }}">
</head>
<body>
    <div id="rewa-pos-root"><p style="padding:2rem">Opening your register…</p></div>
    <script id="rewa-pos-config" type="application/json">{!! json_encode($configuration, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) !!}</script>
    <script type="module" src="{{ static_asset('addons/rewa-pos/assets/pos.js') }}?v={{ $assetVersion }}"></script>
</body>
</html>
