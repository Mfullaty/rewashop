# RewaShop POS Pro 1.1: full Hostinger installation and upgrade guide

This release adds automatic physical product eligibility, automatic seller setup, an administrator seller-POS switch, and independent store branding. It needs the reviewed Laravel core files and the 1.1 interface ZIP together. Uploading the interface ZIP alone does not update the transaction backend.

## What changes

- Existing and newly uploaded physical products are eligible without the legacy `products.pos` opt-in. Publication, approval, ownership, stock availability and reserve safety still apply.
- Owners exclude or restore products in POS Pro → Products. The new `products.pos_excluded` field records that explicit choice. Legacy `pos=0` values are not treated as exclusions; review products you intentionally hid before this upgrade.
- Physical wholesale products use the normal stock/variant price and existing promotion/tax rules in POS. Website quantity-tier wholesale prices are not applied. The POS product list identifies this rule. Physical auction products remain excluded even when switched on, because the retail checkout must not bypass bidding. Digital products remain excluded.
- Each seller owns independent stock, stores, registers, cashier assignments, sales, reports and receipts. Admins use the platform store and admin-owned products.
- Seller POS is available by default when POS is enabled. Administrators can disable it in POS Pro → Settings → Enable POS for all sellers. This does not disable the platform store or delete records. The switch applies to browser and device requests. Shop verification is no longer required; blocked users and blocked store owners remain denied.
- New seller accounts automatically receive a location and register while POS and seller access are enabled. Existing accounts are provisioned by the catalog reconciliation, or on first POS access. Accounts created while disabled receive their store automatically after access is enabled. Provisioning is idempotent and serialized per owner.
- Store logo, receipt name, address, phone, email, tax registration text and footer are independent of website branding. New receipts snapshot these details at checkout. Older receipts retain their existing payloads; upgrading does not rewrite historical receipts.

## 1. Back up and pause writes

Export the database from Hostinger phpMyAdmin. Download your application files and securely back up `storage/app/pos-policy.key` if it exists. Keep the database and files from the same point in time.

Connect using the SSH details in your Hostinger account. Locate the folder containing `artisan`, `app`, `database`, and your hosted `.env`. It may be under `public_html`, but use your actual path:

```bash
cd /actual/path/to/rewashop
php artisan down
```

If PHP CLI differs from website PHP, use the PHP 8.2+ executable path provided by Hostinger for every command below. Finish active checkouts before entering maintenance.

## 2. Deploy the core update

For an existing working 1.0 installation, extract `rewashop-pos-pro-1.1-core-update.zip` from the delivery bundle. Upload its contents into the Laravel application root, preserving the directory structure and replacing the matching files. Do not upload the outer delivery bundle through Addons Manager.

The core update contains changed application PHP files, the new migration, the updated interface files and compiled assets. It excludes `.env`, uploads, vendor dependencies, signing keys, logs and production data. Preserve your existing files in those locations.

For a fresh installation, deploy the complete reviewed repository revision containing this release, including the existing core bridge, routes and migrations. The small core-update archive assumes the 1.0 core bridge is already deployed. Preserve any hosting-specific entrypoint layout and installed third-party addon files.

PHP must be 8.2+ with sodium, PDO MySQL and ZIP enabled, plus the application's existing required extensions. No new Composer dependency and no server Node/npm build are needed for this release. The application `routes` and `public` directories and mapped addon destinations must be writable by the hosting PHP user during installation. Correct ownership rather than using blanket 777 permissions.

## 3. Set the environment

Keep your hosted database and other existing settings. Use:

```dotenv
APP_ENV=production
APP_DEBUG=false
POS_ENABLED=true
POS_OFFLINE_ENABLED=false
POS_CURRENCY=NGN
```

The currency must match your ecommerce base currency. A `POS_POLICY_KEY` environment variable is not used by the current code; signing uses the private server file generated below. Preserve an existing signing key.

```bash
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

## 4. Run the POS migrations

Run the following separately from the Laravel root. Previously completed migrations return “Nothing to migrate”. Stop on any failure and read the reported error.

```bash
php artisan migrate --path=database/migrations/2026_10_12_000000_create_shared_pos_backend.php --force
php artisan migrate --path=database/migrations/2026_10_12_000001_add_pos_catalog_indexes.php --force
php artisan migrate --path=database/migrations/2026_10_12_000002_create_pos_web_drafts.php --force
php artisan migrate --path=database/migrations/2026_10_12_000003_add_pos_defaults.php --force
```

An existing fully installed 1.0 site only needs the last migration, but listing all four avoids assuming the earlier setup completed. Use specific paths to avoid unrelated legacy migration history. Never run `migrate:fresh`, replace your product database, or manually mark failed migrations as complete.

The new migration adds `products.pos_excluded` with a default of false. It does not rewrite prices, products, historical orders or stock quantities. Adding a column/index may briefly lock large tables; run during the maintenance window.

## 5. Generate the key and populate catalogs

```bash
php artisan pos:policy-key
php artisan pos:catalog:rebuild
php artisan pos:doctor
```

The signing command keeps an existing key. Securely retain `storage/app/pos-policy.key`; do not publish or commit it.

The full catalog command creates missing default seller stores/registers when seller POS is enabled and reconciles eligible inventory. You do not need `pos:install-store` for each seller. The platform store is provisioned automatically from its products or on first admin POS access.

If seller POS was previously disabled in admin settings, enable it in step 7. Sellers can then open POS immediately; the next reconciliation also provisions missing stores. Missing-table, currency, engine or route errors from `pos:doctor` must be resolved before using checkout.

## 6. Install the interface ZIP

If you entered maintenance, restore the site before using its authenticated Addons Manager:

```bash
php artisan up
```

Sign into RewaShop as admin. Open **Addons → Install** and select **`rewa_pos_pro-1.1.zip`**, extracted from the delivery bundle. Do not select the core-update ZIP or outer delivery ZIP.

Successful installation updates the addon to version 1.1 and activates it. The importer validates checksums and required schema. If it reports a generic failure, read the newest `storage/logs/laravel*.log` entry at the upload time. A missing `products.pos_excluded` means step 4 was not completed against this hosted database. Do not bypass the installer by manually activating a database record.

Refresh the browser after installation. Existing transaction records and store settings remain.

## 7. Enable sellers and configure branding

Open `https://rewashop.com/admin/rewa-pos` → **Settings**.

1. Check **Enable POS for all sellers** and save merchant settings. Only admins see and can change this global control.
2. Set the platform receipt name, address, phone, email, tax details and footer.
3. Upload a logo through your existing website media library and copy its public HTTPS URL into **POS logo URL (HTTPS)**. The POS uses this independently for its header and new receipts. Use a small high-contrast PNG for thermal printing. The URL must remain publicly accessible to the cashier's browser.
4. Each seller opens `https://rewashop.com/seller/rewa-pos` and configures their own branding in Settings. They cannot change the global seller switch or another store's settings.
5. In **Products**, switch off any physical products you want excluded. Physical auction and digital products cannot be made eligible by this switch.
6. Open a register shift with the correct opening cash before checkout. Each owner can manage additional registers and delegated cashiers through their existing POS controls.

A seller account does not need shop verification for POS, but each product still needs approval and publication. If a seller has no shop name, the POS falls back to their account name until they save their receipt name.

## 8. Configure thermal printing

In POS Settings → **Browser printing**, choose **58 mm** or **80 mm** for the current browser. A4 remains available. Printer preferences are local to that browser; merchant branding is shared across the store.

Install/select the printer's normal operating-system driver. In the print dialog choose the correct thermal paper width, disable browser headers/footers, and use 100% scale. The template allows 54 mm content on 58 mm paper and 76 mm on 80 mm paper. The browser/driver determines cutting, paper length and supported media size; this release does not install a raw ESC/POS driver.

Print one test receipt with the logo and a long store address. Confirm no clipping. The browser waits briefly for receipt images before opening the dialog. If the logo URL is unavailable, the rest of the receipt remains printable. Old receipts keep the branding recorded in their old payload rather than acquiring the new logo automatically.

## 9. Keep the catalog current

Configure the existing Laravel scheduler in Hostinger's cron facility using the correct application and PHP executable paths:

```cron
* * * * * cd /actual/path/to/rewashop && php artisan schedule:run >> /dev/null 2>&1
```

The existing hourly full catalog reconciliation also provisions any missing seller stores, including accounts imported directly into the database. Normal application seller creation and first POS access work without waiting for cron. Price-window refresh and cleanup retain the existing schedules.

## 10. Confirm installation

- Admin POS shows admin products; seller POS shows that seller's eligible products.
- A previously unverified seller can open POS and receives a default register.
- New physical uploads appear without selecting the old POS checkbox. Excluding a product hides it from checkout and catalog reconciliation.
- A seller cannot change the global toggle or access another store's stock, sales or receipts.
- Disabling seller POS blocks seller browser/device requests while admin POS remains available. Re-enabling restores access without deleting records.
- A new sale prints the correct merchant details and logo at the selected thermal width.

## Troubleshooting and rollback

`Unknown column pos_excluded`: run the fourth migration against the hosted database, then clear configuration/routes/views.

`SELLER_POS_DISABLED`: enable the admin seller switch. `USER_BLOCKED` or a blocked store owner: review the account status; POS does not bypass account blocking.

Missing POS logo: verify the public HTTPS URL directly in the cashier's browser. Browser printing needs a reachable image and a compatible installed printer driver.

Empty catalog: check publication, approval, digital/auction flags, explicit POS exclusion and stock availability. Verify the seller owns the product, then run `pos:catalog:rebuild` if an external import bypassed normal hooks.

If SSH is unavailable, ask Hostinger support to execute the listed Artisan commands in your Laravel root. Do not create a public migration endpoint or upload raw SQL from the addon ZIP.

For rollback, pause writes and restore compatible backed-up application files. Keep the additive exclusion column and POS financial tables. The migration intentionally refuses automatic column removal so explicit exclusions are not lost. Do not roll back a database containing new sales to an older backup without reconciling those sales and every terminal. Disabling seller access or the UI preserves inventory and financial history.
