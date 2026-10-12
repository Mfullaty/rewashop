# Web verification

Browser tests use real Laravel routes, session login, CSRF, pricing, stock, order and receipt services against a disposable SQLite database. Fault injection drops an already committed HTTP response; successful checkout responses are not mocked. The shared PHP suite tests financial concurrency on MySQL/MariaDB.

```sh
npm --prefix addons/rewa_pos_pro/web ci
npm --prefix addons/rewa_pos_pro/web run build
npm --prefix addons/rewa_pos_pro/web test
python3 scripts/package-pos-web.py
php vendor/bin/phpunit -c phpunit.pos.xml
npm --prefix addons/rewa_pos_pro/web exec -- playwright install --with-deps chromium
php tests/Support/create-pos-web-fixture.php
php -S 127.0.0.1:8123 -t public tests/Support/pos-web-router.php
# In another terminal:
npm --prefix addons/rewa_pos_pro/web run test:browser
```

Fixtures under `tests/Support` never enter the ZIP. They use `/tmp/rewashop-pos-web-test.sqlite` and a dummy signing key. Cases recreate that database serially. Never substitute production credentials or bind this test login server publicly. `POS_PHP` selects PHP; `PLAYWRIGHT_CHROMIUM_EXECUTABLE` optionally selects a local Chromium.

PHP coverage checks role/product separation, scoped drafts/revisions, deactivation retaining stock/financial records, missing-schema rejection, checksum/path rejection and the real packaged 1.0→1.1 install/update lifecycle. Installer tests copy into an isolated temporary application directory.

Browser flows cover opening float, repeated scan, walk-in cash/change, canonical order, receipt/PDF, partial cash return/restock, expected till and close; loss/reload/retry of a committed response; seller isolation; ambiguous scan; hold/resume; retained carts across sections; desktop/phone layout. Frontend tests cover parsing, tax/GST rounding, BigInt bounds, discounts and operational retry identities.

GitHub Actions builds from the lockfile, packages, runs PHP on SQLite/MySQL and runs the browser flows. Its review artifacts contain the ZIP/checksum, screenshots and receipt PDF.

Production rollout still requires the deployed Addons Manager, cached routes/public paths, real MySQL permissions, all installed stock writers, physical scanner/printer checks and reconciled admin/seller pilots. This task does not migrate production or claim Hostinger/hardware certification.
