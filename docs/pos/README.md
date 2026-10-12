# Shared Laravel POS backend

This backend gives RewaShop's future web addon and desktop application one sale, stock, tender and receipt service. The web addon and desktop UI remain separate implementation stages.

## Product ownership

| Register owner | Saleable products | Canonical order seller |
| --- | --- | --- |
| Platform admin | `products.added_by = admin` | The platform admin owner returned by the existing user records |
| Seller | `products.added_by = seller` and `products.user_id = seller_id` | That seller |
| Assigned cashier | The owner's products, limited to assigned registers and granted operations | The register's owner |

Every stock ID, barcode search, sale, receipt, return, device and report stays inside that scope. A basket contains one merchant's products. Admin POS does not silently sell another seller's products.

Eligible products are published, approved physical retail products with `pos=1`. Auction and wholesale-only items stay outside this retail pricing contract, matching the old addon's wholesale exclusion.

## Implemented v1 services

- Server pricing, scheduled product discounts, tax rules, inclusive or exclusive tax, and enabled legacy GST.
- Walk-in checkout with optional receipt contact details. Orders have nullable `user_id`, `order_from=pos`, `shipping_type=in_store`, zero shipping and delivered retail fulfilment.
- One transaction for legacy order/details, POS sale/lines, tenders, inventory movements, immutable receipt and idempotency result.
- Cash received/change and split tender. Bank transfers and external terminals stay pending until an authorised operator records settlement evidence. Verification is explicitly manual; this backend does not capture gateway payments.
- Partial returns, tender limits, damaged-item returns without restocking, refund tax allocation, and compensating voids for unsettled online sales. Paid sales use returns.
- Register shifts, opening float, cash in/out, counted close, cash variance and an audit reason.
- Device pairing, expiry, token rotation, revocation, cashier permissions, merchant settings and register provisioning.
- Signed offline stock allocations, consumption without a second legacy stock deduction, reconciliation fences and bounded device exposure.
- Durable event acknowledgments, ordered device sequences, replay mismatch detection and independent event transactions.
- Materialised catalog snapshots, commit-ordered change cursors, tombstones, indexed barcode/SKU search and promotion-boundary refresh.
- Merchant/register reports using sale and return event dates, payment verification state and tender totals.
- Protected retail order history, stable variant IDs during ordinary product edits, transactional website/mobile stock consumption, and deduplicated ecommerce restocking.

The first stock model uses one shared pool per merchant. Locations identify registers; they do not create separate warehouse quantities. Devices are bound to the enrolled cashier. Weighted quantities, customer credit, gift cards, gateway capture, printer drivers, held-cart UI and warehouse transfers are future modules.

## Entry points

Device endpoints use `/api/pos/v1`, a dedicated stateless middleware group and device-bound bearer credentials. They do not use website sessions, website CSRF, buyer tokens or `System-Key`.

Browser endpoints use `/pos/backend`, the existing signed-in session and CSRF protection. Both call the same services. The addon should create its own screens and static assets around these endpoints.

The [OpenAPI contract](openapi.json) contains every registered backend route. [API details](api.md) explain event order, signing and conflicts. [Deployment](deployment.md) covers staging, migration and rollback. [Plan validation](plan-validation.md) records the findings and the implementation choices.

## Money, history and accounting

Amounts use integer minor units. NGN values are kobo. The configured POS currency must match the existing ecommerce base currency because legacy orders do not store a currency per order. This v1 supports two decimal places and whole-unit quantities.

Receipts retain the sale-time product, price, tax and tender snapshot. Returns and verification append separate evidence. Existing legacy orders retain their original gross totals; POS reports calculate net sales from the retail ledgers.

Cash and externally collected funds belong to the merchant's till or external account. POS posting does not create the platform's online gateway payout liability or award customer affiliate/club benefits. A future commission policy for retail must use an explicit settlement ledger.

## Tests

```bash
php vendor/bin/phpunit -c phpunit.pos.xml
```

The default suite uses SQLite. Run the InnoDB concurrency tests against a disposable MySQL/MariaDB instance:

```bash
POS_TEST_DB=mysql DB_HOST=127.0.0.1 DB_PORT=3306 \
DB_DATABASE=rewashop_pos_test DB_USERNAME=root DB_PASSWORD=your_test_password \
php vendor/bin/phpunit -c phpunit.pos.xml
```

The base database name must contain `test`. The runner creates and removes a unique test schema for each case, so the test user needs create/drop database privileges. It never runs against a production database. SQLite skips the three process-concurrency cases; the MySQL/MariaDB run executes them.
