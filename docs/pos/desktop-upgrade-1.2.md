# RewaShop desktop POS 1.2.1

## Staff: deploy the website update first

Back up the application and database. Merge the website update into the existing Laravel root containing `artisan`. Preserve `.env`, uploads, storage and the POS signing key. This is a core update, not an Addons Manager ZIP.

Run:

```sh
php artisan migrate --force --path=database/migrations/2026_10_14_000001_add_pos_receipt_verification.php
php artisan migrate --force --path=database/migrations/2026_10_14_000002_create_pos_receipt_keys.php
php artisan optimize:clear
php artisan pos:doctor
```

The earlier POS 1.1 migrations must already be installed. The new migrations add a private receipt lookup hash and registered receipt public keys. Keep the website's `APP_URL` set to its correct HTTPS origin.

Download the Windows artifact from the PR build. Close the old desktop, keep its Windows application-data folder, and replace the portable EXE or run the new installer. Open the updated program while connected once. Automatic sync enrolls this approved computer's receipt public key. The cashier has no extra signing form or per-receipt setup. The private key stays protected by Windows credential storage.

## Sellers: everyday use

- Open the program, choose products, and take payment.
- Separate **−** and **+** buttons change quantity. The number remains directly editable.
- **Apply Discount** reduces a product line by an amount or a percentage, within the cashier's existing permission and limit. It works with offline cash sales.
- **Calculator** opens a quick calculator. The calculator is also below the cart and never changes sale prices itself.
- Sync is automatic while connected. The status shows progress without interrupting cash checkout. **Sync now** remains available for a manual retry.
- **Disconnect** pauses network activity without revoking the computer. **Connect & sync** resumes it. Settings can turn automatic sync off separately while leaving manual sync available.
- If internet fails, cash sales remain saved here and automatic sync retries with backoff. Reconnect when convenient.

## Receipts

The thermal layout supports 58 mm and 80 mm paper. It shows the seller's cached logo, shop name and address, **CASH RECEIPT**, date, purchased items, totals, cash received, change, thanks and a real QR code. It does not print local/server identifiers, customer-category labels, sync notes, technical recording state or COPY.

Receipts are signed by the approved POS when issued. Scanning the QR opens the website's verification page, which checks that signature using the computer's registered public key. **The sale does not need to be uploaded first.** The scanning phone needs internet to open the verification website; the selling computer can remain disconnected.

The signed proof covers the issue time, currency, total, cash/external amounts, store name/address and a purchased-item fingerprint. Public verification initially shows the shop, date, signed total and line count. Once the existing synchronization process records the sale, the same QR also shows its item details and current refund/void/payment state. Verification establishes the origin of the receipt; external bank/card settlement still uses the existing independent verification workflow.

Old saved receipts can be reissued with a signed QR using the approved computer; their original financial journal remains unchanged. The receipt signing keys are separate from Windows executable code-signing certificates. This feature does not sign the Windows EXE itself.

Configure the printer's actual 58/80 mm paper and driver. Printing requests the matching paper width and measured receipt height. Test the store's physical printer once after updating.

## Recovery and controls

Encrypted backups preserve signed receipt URLs and the complete sales journal, but omit credentials and receipt private keys. Moving computers still requires recovery of the original approved device. The recovered installation enrolls a fresh key. Historical signed receipts already accepted with an immutable sale remain verifiable after device revocation, including their current refund/void state. Revocation prevents unrecorded or newly altered proofs from being accepted.

Verification pages reveal no customer contact information, cashier identity, internal IDs or private signing keys. They are rate limited and carry no-cache/no-referrer/no-index headers. Altered proof data, unknown signing keys, invalid signatures and revoked devices are not verified.

## Product cleanup and full refresh (1.2.1)

In **Downloaded products** or **Settings & backup**:

- **Refresh all products** uploads saved operations, rebuilds this store's catalog from current online products, and replaces the download after every page arrives. Deleted products are removed. Internet is required; if manually disconnected, click Connect & sync first.
- **Clear downloaded products** removes products, product pictures and unpaid carts from this computer after a confirmation dialog. Sales, receipts, payments, device approval and the full sync journal remain. Product downloads pause until Sync now, Connect & sync or Refresh all products; automatic financial uploads continue.

Normal sync now detects deleted or delisted online products even when an import or bulk database deletion skipped model events. Full refresh creates a new snapshot rather than reusing an older one, and also reconciles products added or edited outside the normal model hooks. Existing paginated snapshots remain immutable. A failed refresh preserves the previous download.

Deploy the updated CatalogService, PosController, Schemas and API contract as part of the website ZIP before using Windows 1.2.1. There are no additional migrations beyond the two receipt migrations above.
