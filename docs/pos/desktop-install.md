# RewaShop Windows POS: installation and daily use

## What to give a seller

Give the seller **RewaShop-POS-1.0.1-Portable-x64.exe**. They double-click it to open the POS. PHP, Node.js, a database server, a browser server and administrator installation are not required on their computer.

The portable executable contains the program. Sales data is saved separately in the current Windows user's application-data folder. Keep using the same Windows account. Copying the executable to a new computer starts a new, unconfigured POS; use the encrypted transfer process below to bring across the shop's data.

The optional **Setup-x64.exe** is a one-click, current-user installer that creates a desktop shortcut. The portable edition and installed edition use the same application identity and data. Do not run both simultaneously. Windows x64 is the build target. Validate the seller's Windows version against the packaged Electron release before rollout; Windows 7/8 and 32-bit Windows are outside this release's support.

These builds are unsigned until RewaShop supplies a Windows code-signing certificate. Windows may display an unknown-publisher or SmartScreen prompt. RewaShop should distribute a signed release for unattended client rollout. Do not tell sellers to disable Windows security.

## 1. Update your hosted RewaShop backend

This release extends the current shared Laravel POS backend already in this repository. It does not replace your website or require a new Laravel installation.

1. Back up the website files and database.
2. If you deploy with Git, deploy this PR's changes. If you deploy through a hosting file manager, extract **RewaShop-POS-Desktop-Bridge-1.0.1.zip** locally. Upload its `app`, `public` and `docs` directories into the existing Laravel application root, merging directories and replacing the matching files.
3. The Laravel root is the folder containing `artisan`, `composer.json`, `app`, `routes` and `storage`. Use `public_html` only if those files actually live there. If the domain points at Laravel's `public` folder, upload the ZIP's `app` directory to the parent application root, and its `public` contents into the domain's public directory.
4. The bridge contains the updated POS controller and compiled web POS asset with the pairing-approval form. It is a **core update**, not an Addons Manager ZIP. Never upload the desktop EXE to Addons Manager.
5. This desktop bridge adds no database migrations. If the earlier shared POS core is not installed yet, first complete `web-upgrade-1.1.md`, including its migrations. Keep your existing `.env`, uploads and signing key.
6. Set these existing POS configuration values in the server's `.env`:

```dotenv
POS_ENABLED=true
POS_OFFLINE_ENABLED=true
POS_CURRENCY=NGN
```

Use your actual store currency if it differs. It must match the site's existing base currency.

7. Through the hosting terminal or SSH, run:

```sh
php artisan optimize:clear
php artisan pos:policy-key
php artisan pos:catalog:rebuild
php artisan pos:doctor
```

`pos:policy-key` creates the signing key when absent and preserves an existing key. Never delete and regenerate an existing key: paired clients pin the existing public key. Back up the key with your server backups.

8. Keep Laravel's scheduler running as configured for your shared POS backend:

```cron
* * * * * cd /absolute/path/to/rewashop && php artisan schedule:run >> /dev/null 2>&1
```

The scheduler refreshes price boundaries and reconciles catalog changes. Your clients do not need this command.

9. In Admin POS → Settings, enable seller POS globally. Confirm the web POS is active and the seller's account is not blocked.
10. Refresh the web POS with Ctrl+F5. Settings now shows **Approve desktop computer**.

Offline stock reservations affect online availability. All installed checkout, import and stock writers must respect the shared stock service. This is the same production prerequisite described in the existing backend deployment guide.

## 2. Connect a seller's computer once

RewaShop staff or the store owner can do this for the seller.

1. Open the portable EXE, or run the Setup EXE once and open the desktop shortcut.
2. Enter `https://rewashop.com` and a recognizable computer name, such as `Amina Store Till 1`.
3. Click **Start connection**. Copy the connection number shown in the app. It expires after five minutes by default.
4. Sign in to that seller's online account. Open Seller POS → Settings → **Approve desktop computer**. Admin-owned stores use Admin POS instead.
5. Paste the connection number. Choose that seller's register and the enrolled cashier's user ID. Use one dedicated register per computer; another browser or computer must not use its till concurrently.
6. Leave **Allow offline stock and cash sales** checked. Set sensible reserved-unit, per-sale and total offline-money limits for this business.
7. For a new computer, leave **Existing device ID** and **Recovery reason** blank.
8. Click **Approve computer**.
9. Return to the desktop POS and click **I have been approved**. The app claims its credential and downloads the store's catalog.

The approval form cannot grant more than the signed-in supervisor's or enrolled cashier's existing permissions. Offline allocation requires `pos:inventory:write`; catalog, sale, shift, receipt and sync permissions are also required. Each paired device belongs to one seller, register and cashier. Cashier switching requires a separate approved setup, not sharing another person's credential.

## 3. Prepare products before going offline

1. Keep the computer connected to the internet.
2. Open **Offline stock**.
3. Select a product and quantity. Click **Prepare stock**. Repeat for products you plan to sell, or use **Prepare several products** with one `stock_id,quantity` pair per line.
4. Confirm each product appears under prepared stock with a valid expiry.
5. Open **My till**, enter the opening cash and click **Open till**.
6. Click **Sync now** before disconnecting. This registers the open shift online and makes any conflict visible before the business begins selling offline.

Example: if a seller has 20 units and reserves 10 for this computer, 10 remain available online. Selling three of the prepared units consumes the local reserve. Sync does not deduct those three a second time. Releasing the remaining seven restores seven units to online availability.

Default policies last up to 24 hours. Promotions may shorten them. The app blocks sales after expiry, when a reserve is insufficient, or when the device's financial budget is reached. Reconnect, sync, release unused stock and prepare fresh stock. Expired reservations are never silently returned to online stock.

## 4. Sell without internet

1. Open the POS.
2. Keep checkout mode on **Offline · reserved cash sales**.
3. Click a product, search its name, or scan its barcode. A USB scanner that behaves like a keyboard works directly. Leading zeros in barcodes are preserved. If several variants share a barcode, choose the correct product variant.
4. Adjust whole-unit quantities. Authorized cashiers can apply a line discount within their approved limit.
5. Click **Take payment**. Enter the cash received and optional customer details.
6. Click **Complete sale**. The sale, receipt, till balance, reserve consumption and upload event commit together locally.
7. Print the receipt if required. Local receipts show the permanent sale UUID and identify their sync state.
8. Continue serving customers. The app does not need internet for prepared cash sales.

**Hold cart** saves an unfinished basket on the computer. Held carts do not reserve additional stock. Resuming uses the current valid catalog or signed allocation price. A price or reserve change may require adjusting the cart.

## 5. Sync at the end of the day

1. Connect the computer to the internet.
2. Click **Sync now**.
3. Wait for **Sync complete**. Keep the app open during sync.
4. Check **Sync & history**. No operations should remain pending or awaiting review.
5. Close your till with the counted cash. Explain any difference, then sync again.
6. If finished with the prepared stock, click **Sync & release unused stock**. This releases unused reservations only after the server acknowledges the journal.

You can sync throughout the day. Sync is manual; the app does not upload money automatically in the background.

If connection drops, retry **Sync now**. Original event IDs, client sale IDs and device sequence numbers remain unchanged. The app checks server status before replaying unknown events.

An unconfirmed online request also stays saved. Do not enter that payment as a new offline sale. Sync retries its exact original body and idempotency key.

## 6. Returns and till management

- **My till** records opening float, reasoned cash in/out and counted closing balances.
- **Sales & returns** shows sales recorded locally and can download paginated online sale history.
- Open a sale while connected to cache its original server line IDs and remaining return quantities. A later offline cash return uses that saved detail.
- Choose returned quantities, restock or damaged-item treatment, and a reason. The original cash tender and current till must cover the refund.
- Sync uploads the refund after the original sale and open shift. Returned stock becomes online stock; it does not increase a computer's offline reserve. Prepare it again to sell offline.
- Offline returns can conflict if another cashier already returned the same item after your download. Saved payout evidence remains for supervisor review. Refresh sale details after successful sync.
- New, unsynced sales do not yet have server line IDs. Sync them before taking their returns.

## 7. Online functions

Choose **Online · live stock / split payments** when connected. The server remains authoritative for pricing and availability. Cash, external card terminal and bank transfer tenders can be split. External references begin pending; the POS does not capture payment gateways or store card details.

Authorized supervisors can change online unit prices with reasons, verify tender/refund settlement evidence, and void eligible unsettled sales. These actions require internet and remain subject to the backend's existing rules. Device returns are cash-only in the current backend, even while connected.

**Reports** downloads accepted store totals, net tax, returns and unsettled payments. A cached report can be read without internet; local activity totals are separately labeled and include unsynced/review items.

Use **Settings & backup → Open store dashboard** for product uploads, absolute stock adjustments, receipt branding, staff and device management, seller access and register creation. These are website operations; this release does not queue administrative or payment-verification changes offline.

## 8. Printing

1. RewaShop staff installs the printer's normal Windows driver once.
2. In desktop Settings, choose 58 mm or 80 mm paper.
3. Click **Choose installed printer**. Choose a known printer for direct printing, or leave the Windows print dialog selected.
4. Print a sale and check the driver's paper size and margins against actual output.

The app formats thermal receipts and uses the installed driver. It does not supply a universal printer driver, raw ESC/POS integration, cash-drawer commands or verified fiscal certification. PNG/JPEG/WebP store logos are cached for offline printing after successful connection. Branding snapshots preserve sale-time store details.

## 9. Move to another computer

1. Stop serving customers on the old computer.
2. Resolve unknown online operations and reviews. Pending ordinary sync events can move with the complete journal.
3. Open **Settings & backup → Move to another computer**.
4. Choose a backup password with at least 12 characters. Save the encrypted `.rewapos` file to a USB drive.
5. After the export succeeds, the old app locks itself. Keep it stopped. Never copy an active reserve to two working computers.
6. Open the same POS EXE on the new computer. Click **Restore backup** and supply the backup password.
7. Connect to the internet and click **Start connection**. The app displays the previous device ID as well as a new pairing number.
8. In the online approval form, enter that **Existing device ID**, keep its original seller/register/cashier assignment, and enter a recovery reason.
9. Approve the recovery, then confirm in the new desktop app. The backend rotates the credential for the same device. Old credentials stop working online.
10. Sync the restored journal. The app refuses a backup older than the server's device sequence or stock-consumption history.
11. Continue only after recovery and sync succeed. RewaShop should verify the old computer remains stopped before authorizing the destination.

The device's original allocations, sequence and client sale IDs remain intact. Credentials are omitted from exports, so a stolen backup cannot authenticate to the backend without supervisor approval. An obsolete backup can miss sales made after it was taken; always use the export produced at transfer time. The server cannot remotely stop an already disconnected computer, so staff must control the handover.

## 10. Backups, updates and troubleshooting

Save an encrypted backup daily and keep it outside the selling computer. Customer records and transaction history live in the local database; deleting the Windows profile or its application-data folder deletes them. Losing both the computer and its latest backup can permanently lose unsynced transactions.

Updating: close the app, keep its application-data folder, replace the portable EXE or run the new installer, and reopen. Do not restore an old backup merely to update the program. This version uses SQLite schema version 1.

| Message / problem | Action |
| --- | --- |
| No products | Sync; ask staff to rebuild the server catalog if empty. |
| Product unavailable offline | Prepare sufficient stock online and check policy expiry. |
| Offline disabled | Staff enables server offline mode and approves offline inventory for this device. |
| Shift already open | Sync and check the dedicated register. Do not share it with another active device/browser. |
| Permission expired / 401 / 403 | Stop new money operations; recover the original device through supervisor approval. Keep the local journal. |
| Unknown online operation | Reconnect and sync the saved original request. Never record a replacement payment. |
| Needs review | Keep the receipt and event evidence. Supervisor fixes the cause, then uses a permitted immutable retry. Expired/invalid paid sales may require separate accounting review; never fabricate timestamps or signatures. |
| Signing key changed | RewaShop verifies the server key change. Do not replace pinned trust automatically. |
| Older than server history | Use the latest complete backup. Do not reset device sequence numbers. |
| Printer missing | Install its Windows driver and select the printer again. |

## Build and validation for RewaShop developers

Source is in `desktop/pos`. The Windows GitHub Actions workflow produces both portable and one-click installer artifacts and runs a packaged-app smoke check.

```sh
cd desktop/pos
npm ci
npm test
npm run dist:win
```

Use a Windows x64 runner for the installer. Linux can build the portable target, but NSIS uninstaller generation may require Wine. The release workflow is **Windows offline POS** under repository Actions. Download **RewaShop-POS-Windows** after the Windows job succeeds. The workflow also runs the real Laravel integration case.

Code-sign Windows builds using your organization's certificate before broad client distribution. Keep certificate material in protected CI secrets; do not commit it. This implementation includes no production credential, signing private key or customer database.

One open offline allocation per product per device is enforced during preparation. Sync and release unused stock before preparing that product again. For older duplicated allocations, reconcile them and request one replacement quantity.
