# RewaShop POS 1.1: installation and daily use

## Sellers

RewaShop staff gives you the Windows portable program or installs its desktop shortcut. Open it, choose products, and click Take payment. You do not install PHP, Node.js, or a database.

1. RewaShop staff connects the computer to your shop once. Products and pictures download automatically.
2. Click **Disconnect** whenever you want to work offline. Cash sales save immediately on this computer. Opening cash in **My till** is optional; your first sale opens a zero-opening session automatically.
3. Click **Connect & sync** when ready. Saved sales upload, and products, prices, pictures and stock download again. When connected already, click **Sync now**.
4. You do not set aside or reserve stock. **Downloaded products** shows the catalog available here.
5. Read the popup after an action. If a connection fails, your saved sales stay on this computer. Retry when internet returns. Do not repeat a payment waiting for online confirmation.
6. Save an encrypted backup in **Settings & backup** regularly. Keep the backup outside this computer.

Disconnect does not revoke the computer's approval or change its device ID. The original five-minute pairing number is only for initial approval; reconnecting uses the saved device credential.

Only cash can be recorded offline. Card-terminal and bank-transfer settlement evidence, store management, and current online reports need a connection. A downloaded price policy lasts 30 days; Sync refreshes it. Known revoked access, expired downloaded policies, an incomplete recovery, and a transferred source computer remain protected.

Another till can sell while you are offline. Local quantity prevents selling more than your downloaded stock on this computer. During sync, concurrent shortages are recorded in the owner's **Reports** as stock differences. The paid transaction stays recorded; the backend never replaces newer online stock with an old downloaded quantity.

## RewaShop staff: update the website first

This is a core update for the existing shared Laravel POS backend. It is not a new Laravel installation and not an Addons Manager import.

1. Back up the website and database. Deploy this PR, or merge the bridge ZIP's `app`, `database`, `public`, `contracts` and `docs` directories into the existing Laravel root containing `artisan`. Preserve `.env`, uploads, storage, customer data and the existing policy signing key.
2. Run:

```sh
php artisan migrate --force --path=database/migrations/2026_10_14_000000_simplify_offline_pos.php
php artisan optimize:clear
php artisan pos:policy-key
php artisan pos:catalog:rebuild
php artisan pos:doctor
```

The migration adds automatic cash sessions and the stock-difference ledger. Do not regenerate an existing signing key. Earlier shared POS migrations must already be installed. Keep `POS_ENABLED=true` and `POS_OFFLINE_ENABLED=true`, the store currency, and the existing Laravel scheduler.

3. Refresh the web POS. Web checkout also works without opening a shift manually, and success/error messages appear in dialogs.
4. Close the old desktop and replace its portable program or run the new current-user installer. Keep the Windows application-data folder. Use the same Windows account. Never delete the local journal to clear a message.
5. Click Connect & sync. Old reservations are released automatically only after their saved sales are settled. Legacy failed shift conflicts are corrected with new journal entries while the originals remain. Other rejected paid entries remain visible for support; they do not freeze unrelated cash sales.

## First connection

RewaShop staff enters the website's HTTPS origin and computer name. In the seller's web POS **Settings → Approve desktop computer**, approve the displayed number for that seller, register and cashier. Enable downloaded products and cash sales. Return to the desktop and click **I have been approved**. This downloads the shop's eligible published, approved physical products and pictures. Products deliberately excluded from POS remain excluded.

Each computer has its own approved device. The cashier's actual permissions still apply. Regular selling does not require inventory-preparation permission. The owner's approval page retains legacy allocation limits for older clients; these do not impose a reservation workflow on version 1.1.

## Pictures, printers, and moving computers

Public PNG, JPEG, GIF and WebP product pictures download during sync and stay on disk for offline use. Missing or unavailable pictures use a placeholder and retry on a later sync. Pictures do not block a completed financial upload. The cache is bounded to 512 MB, with a 4 MB maximum per picture. Public image URLs must respond without redirects. Store logos are also cached for receipts.

Install the printer's Windows driver once, then choose the installed printer and 58 mm or 80 mm paper in Settings. Barcode scanners work as a keyboard.

To move computers, stop selling on the source, use **Move to another computer**, save the encrypted export, and restore it on the destination. Staff must recover the original device ID online before continuing. The source locks after export. Simply copying the executable does not copy its database. Credentials are excluded from backups; pictures download again after recovery.

Windows x64 is the build target. The portable edition and installer share the same local data. Unsigned builds may show Windows publisher prompts; RewaShop should sign its distributed release. Do not disable Windows security. Protect backups, credentials, and the server signing key. Losing the computer and backup can lose unsynced sales.
