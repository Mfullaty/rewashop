# RewaShop POS Pro 1.0

Online retail checkout and store operations now run on the approved shared Laravel POS engine. Platform and seller product catalogs remain separate. The independently built React UI supplies scoped drafts, scanner flows, split tender, receipt printing, returns and till reconciliation without replacing ecommerce templates or a second sale writer.

The release adds a one-time core route/installer bridge, a UI-draft migration and a checksummed installable ZIP with precompiled assets and dependency licenses. PHP installer checks cover fresh upload, upgrade, disable/reactivate and tampering. Core search gains exact stock/category/brand filters and batched thumbnail URLs; receipts use seller shop names. Prepared-checkout recovery survives lost responses, reload and interrupted authorization. Repeat print dispatches are audited duplicates.

Local release checks: 61 PHP cases with 411 MariaDB assertions; SQLite has 379 assertions and three intentionally skipped InnoDB concurrency cases. Ten frontend tests cover financial math and retry identity. Six real Laravel/Chromium workflows cover cashier operations, lost acknowledgment, ownership, held/ambiguous carts, pending-payment verification and print failure. Browser fixtures and screenshots use synthetic records. Production/staging hardware and database rollout checks remain in `web-validation.md`.

The desktop application follows the user's review of this web release. See `web-feature-matrix.md` for current features and limits, `web-addon-install.md` for deployment, and `web-operator-guide.md` for cashier operation.
