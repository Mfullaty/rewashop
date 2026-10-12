# Install RewaShop POS Pro 1.0

POS Pro is the online browser addon for the shared Laravel POS backend. Identifier: `rewa_pos_pro`. Platform stores sell admin products; verified sellers sell their own products. The browser uses the existing transaction service through session authentication and CSRF protection.

## Core bridge prerequisite

The stock Addons Manager copies files and executes SQL, but cannot discover routes or run migrations. Deploy the reviewed core changes in this web-addon PR on top of merged backend PR #7 before importing the ZIP. The ZIP contains namespaced UI controllers, middleware, routes, views and precompiled assets. It does not replace providers, legacy POS controllers or the Laravel sales engine.

1. Back up files and database. Deploy this revision to staging with PHP 8.2+, sodium, PDO, ZIP and the backend's documented extensions.
2. Run `php artisan migrate --force`. Migration `2026_10_12_000002_create_pos_web_drafts` adds scoped UI drafts. The financial schema remains the shared backend's schema.
3. Configure base currency; run `php artisan pos:install-store <owner-user-id>` for the platform and each approved seller. Follow `deployment.md` for signing-key setup and `pos:doctor`. Bootstrap requires the signing public key even with desktop allocations disabled.
4. Enable `POS_ENABLED=true` after staging validation, keeping `POS_OFFLINE_ENABLED=false`. Refresh Laravel's config cache. The installer does not edit `.env` or enable the transaction backend automatically.
5. Upload `rewa_pos_pro-1.0.zip` under **Admin → Addons → Install**. The core recognizes this exact addon and uses its dedicated importer. It checks required schema, PHP, application version, supported destinations and SHA-256 checksums before copying. Activation happens after successful copies; a failure restores prior files.
6. Open **POS Pro** from admin or seller navigation. Direct URLs: `/admin/rewa-pos`, `/seller/rewa-pos`. Assign cashier permissions in Settings and open a register shift. A delegated seller cashier opens `/seller/rewa-pos?register_id=<assigned-id>`.
7. Pilot one admin store and one seller on staging. Test deployed asset paths, actual printer/scanner models, permission changes and installed addon stock writers before production.

The manifest's minimum item version is the audited legacy addon's `7.5.0`. This numeric version check does not replace the required core bridge and schema. No server npm install or Composer update is required to activate the ZIP.

## Update, disable and rollback

Upload a release matching the deployed core revision. Updates replace only namespaced addon files and clear route/view caches. Deploy reviewed Laravel schema migrations first. `sql/update.sql` and `sql/1.1.sql` are numeric compatibility markers; the dedicated importer deliberately runs no ZIP-supplied SQL. The legacy installer's floating-point upgrade loop does not manage financial migrations.

Disabling POS Pro hides its menu and rejects its screens/UI management requests at runtime, including cached routes. It preserves every financial, inventory and audit record. The independent shared backend follows its own feature flags and remains available to authorized clients. Do not release unknown reservations or roll back financial migrations when disabling the UI.

For UI rollback, disable the addon, restore previously backed-up namespaced files and clear route/view caches. Restore core bridge changes only through a compatible reviewed deployment. Never drop historical financial tables as an uninstall action. Reconciled production database restore is a separate maintenance operation.

## Reproducible build

```sh
npm --prefix addons/rewa_pos_pro/web ci
npm --prefix addons/rewa_pos_pro/web run build
npm --prefix addons/rewa_pos_pro/web test
python3 scripts/package-pos-web.py
php vendor/bin/phpunit -c phpunit.pos.xml
```

The packer writes `dist/rewa_pos_pro-1.0.zip`, a SHA-256 sidecar and `addons/rewa_pos_pro/config.json`. Entry zero is `rewa_pos_pro/`. Each copied file has a checksum and destination. Credentials, dependencies, test fixtures and debug maps are excluded. Complete React/TypeScript source and lockfile remain in Git. Keep the ZIP, checksum and tested source revision together.

The Blade wrapper follows RewaShop's existing `static_asset` convention. Confirm the deployed server serves `public/addons/rewa-pos` correctly. Browser checks are documented in `web-validation.md`.
