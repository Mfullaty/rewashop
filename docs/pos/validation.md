# Backend validation record

The backend was developed against RewaShop commit `4ae4ecfabd967faad5e69c6cb17635729bbcb7b8` and the supplied POS addon 2.1 archive. Test dependencies resolved the existing, unchanged Composer ranges to Laravel 10.50.3, Sanctum 3 and PHPUnit 10.5.66 on PHP 8.3.6.

## Verified behaviour

- Admin products and seller products post with the correct canonical order owner.
- Forged merchant IDs, foreign stock/barcode matches and other sellers' receipts fail.
- Ten simultaneous retries produce one order, one sale and one stock movement on InnoDB.
- Six simultaneous requests cannot sell the last unit twice.
- Two devices requesting reserves and two online POS sales cannot consume more than one available unit.
- A later line/tender failure rolls back preceding stock and allocation changes.
- Exact event replay and uncertain-delivery status queries return the original canonical IDs.
- Offline reserve consumption does not deduct online quantity again; reconciled unused units return once.
- Expired or revoked devices do not release reserves automatically.
- Signed policies reject tampered signatures, prices and out-of-window sales.
- Cash change, split tenders, inclusive/exclusive tax, bounded discounts, partial returns and refund tax rounding reconcile.
- External tender verification is explicit and audited. It cannot be asserted by an ordinary sale request.
- Shift expected cash, counted close and variance include accepted cash sales, payouts and returns.
- Return-date reports handle older original sales and preserve the original receipt.
- Generic legacy order deletion/payment changes cannot bypass the POS ledger, including after POS is disabled.
- Ordinary product edits retain sold stock IDs; stale stock edits cannot overwrite concurrent deductions.
- Website/mobile stock adapters respect offline reserves, and cancellation restocks have durable deduplication.
- Device API requests require device tokens and issue no website session cookie. Browser writes retain CSRF protection.
- Pairing secrets/tokens are hashed, claims are one-time, and reauthorization rotates credentials without releasing reserves.
- Snapshot pages retain their initial contents; later catalog changes and delisting tombstones appear after the high-water mark.
- OpenAPI covers every registered POS operation. Financial migration rollback refuses to erase nonempty ledgers.

## Local verification

The final MariaDB run passed 53 tests with 348 assertions. SQLite completed 53 cases with 316 assertions and skipped the three InnoDB concurrency cases.

Run the complete suite using `phpunit.pos.xml` on SQLite and MariaDB 10.11.14. SQLite intentionally skips the three multi-process InnoDB concurrency cases. The MariaDB run executes all cases with separate PHP worker processes and no mocked locks. PHP syntax and whitespace checks cover the added and changed backend files. The shared TypeScript wire types pass strict compilation, and the OpenAPI 3.1 document and its JSON schemas pass validation.

The CI workflow runs the same suite on SQLite and MySQL 8.0. Remote CI results must be checked on the pull request; a local MariaDB pass does not substitute for a remote MySQL result.

## Checks that require the deployed staging system

The live database, installed addon controllers and hosting environment were not available in this workspace. Check those against `pos:doctor` and the deployment sequence before enabling the core on production. The tests exercise the reviewed stock adapters and retail backend, not every remote payment controller or installed addon flow.

No 100,000-product benchmark, full website payment regression, addon ZIP installation, printer/scanner trial or desktop power-loss test was performed in this backend stage. The next stages must provide those measurements and client/hardware acceptance tests. Business-rule coverage percentage was not measured.
