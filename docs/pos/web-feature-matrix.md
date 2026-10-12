# Web release scope

| Area | Delivered in 1.0 | Authority |
| --- | --- | --- |
| Checkout | Exact barcode/SKU, variants, name/category/brand filters, pagination, optional contact | catalog read, sale write |
| Pricing | Server promotions/tax, integer money, line/cart discounts, reasoned overrides | discount write, price override |
| Payments | Cash/change, split tender, pending terminal/transfer, settlement evidence | sale write, payment verify |
| Recovery | Scoped server drafts, optimistic revisions, prepared intent, timeout/reload retry | cashier + merchant + register |
| Receipts | 58/80 mm HTML, A4/PDF dialog fallback, print reminder, audited reprint | receipt read/reprint |
| Returns | Remaining quantities, optional restock, cash/pending payouts, compensating void | refund/void write |
| Registers | Open float, shift recovery/history, cash in/out, counted close and variance | shift/cash write |
| Reports | Register/date range, gross/net/tax/returns, tender reconciliation, CSV | report read |
| Management | Own product eligibility, registers, user-ID cashier grants, receipt/tax policy | settings/staff manage |
| Devices | Status and revocation preserving reservations | device manage |
| Installation | Allowlisted checksummed ZIP, core bridge, schema gate, install/update/disable | existing manage_addons |

Permission names use the `pos:` prefix defined in `config/pos.php`. Admin products have `added_by=admin`; sellers have `added_by=seller` and their own owner ID. Server context enforces ownership independently of all browser state. Grants refresh every 30 seconds in the UI and are checked again on each backend transaction.

## Limits requiring later contracts or deployment validation

This is an online browser register. Committed offline sales, native silent printing, cutters/drawers and a local print agent are not included. The offline desktop application/hardware work follows the user's review. Real HID scanners and 58/80 mm printer drivers still need staging validation.

Registers share one merchant stock pool. Physical warehouse transfers, lot/serial/expiry capture, product-specific minimum quantities, barcode aliases/label imports, loyalty, vouchers, account credit and gateway capture need separate core contracts. This release sells whole quantities with a minimum of one.

Reports include recorded sales, returns, tax and tenders. They do not claim COGS/profit, hourly heatmaps, fraud analytics or consolidated all-merchant reporting. Legacy POS orders remain in existing RewaShop history and are not reposted. Staff assignment uses an exact existing user ID without exposing a global account directory. Backend device pairing is already implemented; this UI lists/revokes devices and does not start the desktop application.

Local tests establish functional behavior and bundle size. They do not establish the plan's 100k-variant or Hostinger latency targets. Profile real query plans, search load, migrated sellers and installed stock writers before claiming those targets or enabling production.
