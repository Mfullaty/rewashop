# Stage and install the shared backend

## Before activation

Use a staging copy of RewaShop with the deployed schema and installed addon files. Back up the database, application files and POS signing key. Keep `APP_DEBUG=false` and serve production POS requests over HTTPS. PHP must provide the existing Laravel dependencies, PDO MySQL and sodium for offline policy signing.

The core ships with:

```dotenv
POS_ENABLED=false
POS_OFFLINE_ENABLED=false
POS_CURRENCY=NGN
```

`POS_CURRENCY` must match the current ecommerce base currency. Do not run a blanket `migrate:fresh` or import a replacement product database.

## Apply additive migrations

Deploy the branch's PHP files, configuration and routes using your existing application deployment procedure. The backend adds no Composer package requirements and changes no dependency ranges.

Run only the two new migrations first so unrelated legacy migration history does not cause duplicate-table errors:

```bash
php artisan migrate --path=database/migrations/2026_10_12_000000_create_shared_pos_backend.php --force
php artisan migrate --path=database/migrations/2026_10_12_000001_add_pos_catalog_indexes.php --force
```

These migrations add POS tables and catalog indexes. They do not alter legacy user IDs, make a duplicate product catalog, rewrite historical orders or install frontend assets. Confirm the index changes on staging first because MySQL DDL can lock large legacy tables.

## Provision both ownership types

Replace these example IDs with the existing platform admin and a verified seller:

```bash
php artisan pos:install-store 1
php artisan pos:install-store 3
```

Each call provisions one virtual location and default register. It does not make every ecommerce product eligible for POS. Select eligible products using the existing `products.pos` flag and retain publication/approval checks.

Set `POS_ENABLED=true` on staging, clear cached configuration, then run:

```bash
php artisan config:clear
php artisan pos:catalog:rebuild
php artisan pos:doctor
```

Once enabled, the old POS session checkout write routes return `LEGACY_POS_CHECKOUT_DISABLED`. Existing historical order reads remain available. This cutover prevents the old addon from bypassing the new transaction and reserve rules. The new browser endpoints can be tested through your signed-in session before the web addon is built.

The generic `artisan route:list` command may fail in a repository-only checkout because controllers supplied by live payment/POS addons are absent. `pos:doctor` checks the registered POS bridges without reflecting unrelated missing addon controllers.

## Verify the API on staging

1. Open a shift for an admin register. Sell platform products with a walk-in receipt.
2. Repeat the same payload and `Idempotency-Key`. Confirm one order, one receipt and one deduction.
3. Provision a seller register. Confirm seller-owned products work and another seller's stock/receipt IDs fail.
4. Verify taxes, split tender, cash change, a pending bank transfer and explicit settlement evidence.
5. Test a partial return with and without restocking. Confirm till cash and net-tax reporting.
6. Create a pending device pairing, approve it through the browser management endpoint and claim its credential once.
7. Verify a regular buyer token and website cookie cannot authenticate the device API.
8. Run website/mobile checkout and cancellation alongside POS transactions. Check imports, bulk edits, seller deletion, installed refunds and every direct SQL stock writer on the deployed application.

## Enable offline reservations after the stock audit

```bash
php artisan pos:policy-key
php artisan pos:doctor
```

Securely back up `storage/app/pos-policy.key`. It contains the server signing secret and must not be served from the public directory or committed to Git. The command will not overwrite an existing key.

Set `POS_OFFLINE_ENABLED=true`, clear cached configuration, then approve a device with `offline_allowed=true`, `pos:inventory:write`, `pos:sync` and the permitted sale/shift abilities. Check its reserve and monetary limits.

Allocate 10 units from a 20-unit stock row. Sell 3 from the device reserve and 2 from the remaining online pool. Reconcile the acknowledged device checkpoint and return 7 unused units. The final online quantity must be 15. Allocation expiry and device revocation must not release stock.

Keep the original local outbox during recovery. Reauthorization approves a new pairing with `existing_device_id` and `reauthorization_reason`. It preserves the enrolled store, register, cashier, sequence, exposure and allocations; it deletes old credentials before a new one is claimed. Review conflicts before release. Never restore online quantity by deleting allocation rows.

## Scheduler and operations

The existing Laravel scheduler refreshes promotion boundaries every minute, reconciles the full catalog hourly and prunes expired pairing/snapshot records daily. Configure Hostinger's cron runner:

```cron
* * * * * cd /path/to/rewashop && php artisan schedule:run >> /dev/null 2>&1
```

Use the PHP path provided by your hosting account. Pruning never removes sales, tenders, refunds, idempotency keys, inbox acknowledgments, stock allocations or audit records. Monitor stale open reserves, rejected inbox events, pending tender/refund verification and shift variance.

Large-catalog latency, the live addon installer and real payment/hardware behaviour still need staging/pilot measurements. The backend has no gateway capture or printer driver to test in this stage.

## Disable and recover

Set `POS_ENABLED=false` and `POS_OFFLINE_ENABLED=false`, then clear configuration to pause new POS requests. Retain the POS schema, keys and ledgers. Legacy retail order mutation/history protections remain active after disable. Open allocations remain reserved, and unsafe old POS writes remain blocked while reserves exist.

Automatic migration rollback is blocked once any financial, sync or stock-ledger data exists. Restore a coordinated database/application backup only after reconciling every terminal and accepted transaction. Empty staging installations can use the migrations' `down()` methods in reverse order.
