# Cashier guide

Choose a register and open **Register → Open shift** with its physical cash float. One open shift is allowed per register. Sales, returns and cash actions use the logged-in cashier's shift. The original cashier closes its shift before handover.

Scan a barcode/SKU into the scan box with an Enter or Tab suffix. Repeated scans increase that exact stock variant. Ambiguous codes open a variant chooser. Search by name, category or brand, or tap a product tile. Laravel checks current stock, eligibility, tax and price again when recording the sale.

- **F2:** focus scanner.
- **F4:** held carts.
- **F8:** payment.

Walk-in is the default. Optional receipt contact needs a name and optional email/phone, with no address. Tap an item name for permitted line discounts or a supervised reasoned override. Cart discounts are distributed over the lines within the cashier's grant.

**Hold** saves a cart for your merchant, cashier and register. Active edits also save after a short delay when online. Switching POS sections preserves the cart; changing register is blocked while items remain. Drafts reserve no stock and expire after 24 hours. Resumed drafts use current prices. Offline unsaved edits remain only in the open page; save after reconnecting before closing it.

**Take payment** supports cash/change, split tender, external card terminal and bank transfer. Applied amounts must equal the total. External references remain **pending** until an authorized supervisor records independent settlement evidence in Sales. POS Pro does not capture gateway payments or store card credentials.

A prepared checkout is saved on the server before its first financial POST. A lost response freezes its identity and payload. **Retry saved checkout** retrieves the same recorded result or completes it once, including after reload. Do not create a replacement sale while acknowledgment is unresolved. Prepared drafts last 30 days; reconcile older incidents against canonical sale/order records before taking another payment.

Print the committed receipt using the browser dialog and 58 mm, 80 mm or A4 layout. Choose the matching physical paper size and printer driver. The dialog can Save as PDF. Paper failure or cancellation never cancels/recharges a sale. **Mark printed** confirms the cashier's outcome. History reprints require permission, a reason and a **DUPLICATE** marker.

In Sales, inspect original lines, verify settlement, record remaining return quantities or void an eligible unsettled sale. Restock only inspected saleable items; uncheck restock for damaged goods. Cash refunds reduce the current till; external payouts remain pending until verified. Original receipts remain immutable. An exchange is a return followed by a separate new sale.

Record reasoned **Cash in / Cash out** movements and count physical cash on close. Explain any variance. Expected cash is opening float plus applied cash, less completed cash refunds, plus till movements. Reports show recorded gross/net/tax, returns and pending payments.

Settings manages receipt/tax policy, registers, existing-user cashier grants and device revocation. Products manages only your catalog's POS visibility; publishing/approval and physical-retail eligibility still apply. Assignments cannot exceed a supervisor's own abilities or discount limit.

Uncertain shift/cash/return operations retain their identity as a browser key and digest. Retry their original values. Review the ledger before changing the action. The web register does not submit background offline sales.
