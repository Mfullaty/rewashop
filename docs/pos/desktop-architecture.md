# Desktop architecture and choice

Audited against RewaShop main commit `7a5896eb352117094a19f4fa40fa61f12e4827af`.

## Choice

A Windows executable using Electron, HTML/CSS/JavaScript and local SQLite is the best fit for sellers who can only open a file. It packages the runtime instead of asking the seller to operate it. Laravel remains the shared online backend.

| Option | Seller installation | Offline persistence / hardware | Fit |
| --- | --- | --- | --- |
| Windows EXE | Double-click portable EXE; optional one-click installer | Local transactional SQLite, installed Windows printers, keyboard scanners | Chosen |
| Local Laravel | PHP runtime, extensions, database, web server, ports and upgrades must be managed | Possible, but a service stack must be maintained on every PC | Higher support burden; latest Laravel would not simplify seller setup |
| Browser-only HTML/JS | Needs browser installation/caching and origin setup | Browser storage can be cleared; hardware access and portable migration need careful design | Useful for web POS, weaker standalone distribution |
| Next.js | Needs a bundled runtime/server or a desktop wrapper | Static export can be wrapped, but server rendering adds nothing to offline checkout | Unnecessary for this device client |

The chosen EXE uses web UI technology internally. These options are not mutually exclusive technology categories. A desktop wrapper solves delivery while HTML/CSS/JS supplies the interface.

## Existing backend paths

- `routes/pos_api_v1.php`: stateless device bearer authentication and offline catalog policies and legacy allocation/sync routes.
- `routes/pos_shared_operations.php`: capabilities, bootstrap, catalog, sales, returns, receipts, shifts and reports shared with browser POS.
- `routes/pos_backend.php`: browser session/CSRF management operations.
- `SalePostingService`: one authoritative sale/tender/stock/order/receipt transaction.
- `AllocationService` and `OfflinePolicySigner`: offline reserves, immutable price/tax snapshots, Ed25519 policies, exposure limits and reconciliation fences.
- `SyncService`: contiguous per-device sequence, immutable event digest, durable acknowledgment, and independent transactions per event.
- `CatalogService`: materialized snapshot, ordered cursor pages and deletion tombstones.

The desktop never writes production SQL directly, accepts arbitrary seller IDs or uses buyer tokens. Seller ownership comes from the paired device context. The existing Laravel version stays unchanged.

## Local journal

`Store` uses Electron's bundled Node SQLite module, WAL, synchronous FULL and explicit transactions. Tables retain keyed snapshots, immutable sync events and durable direct-request identities. A cash sale saves its signed catalog price, till, receipt and upload event together. Local availability subtracts saved sales until a complete catalog refresh includes them. Legacy reserve consumption is retained for compatibility. Network I/O never runs inside a local SQLite transaction.

Electron's main process owns credentials, storage, pricing, signatures, network and printing. The sandboxed renderer gets a bounded command bridge, no Node APIs and no bearer credential. All command execution is serialized. Single-instance locking prevents two application processes from selling against one database. HTTPS requests refuse redirects and bind bearer credentials to the selected store origin. Backups use scrypt and AES-256-GCM and omit bearer credentials.

Every offline sale line verifies a pinned Ed25519 policy and enforces its device/store/register/stock/currency, price and expiry. Version 1.1 uses downloaded quantities rather than reservation and exposure limits. Legacy reserved sales retain their original limits. Whole quantities and integer minor units match Laravel's rounding, including inclusive tax and GST. No offline overrides or external-tender capture are invented.

## Sync and recovery

Sync refreshes authenticated device bootstrap, recovers saved direct requests, queries unknown event acknowledgments, pushes pending events in sequence, applies catalog cursor pages and reconciles allocation metadata. A dropped reply reuses its original identity. Durable failures retain payment evidence and remain visible without locking unrelated checkout. Known account revocation, transfer and incomplete restoration still block financial writes. A permitted supervisor can retry the immutable payload with a new event identity and sequence after addressing the cause. The original event remains.

Restored databases remain unable to sell offline until device recovery and sync complete. Server-ahead sequence or reserve consumption fails restoration instead of silently resetting counters. A transfer export locks its source and preserves the journal. Supervised recovery rotates the original device's credentials; staff must prevent simultaneous offline copies, which no online-only revocation can physically stop.

## Coverage

| Function | Offline | Connected |
| --- | --- | --- |
| Seller-scoped catalog search / keyboard barcode scanner | Cached catalog | Snapshot and ordered changes |
| Cash sale, discounts, tax/GST and receipt | Valid signed stock policies | Shared backend sale service |
| Split cash / external terminal / bank transfer | Cash only | Supported; external funds pending evidence |
| Price override | Requires reconnect | Permission and reason required |
| Held carts and active cart recovery | Local durable carts | Uses current quoted policy |
| Opening shift, cash movement and closing | Ordered journal | Manual upload through shared shift service |
| Partial cash return | Cached accepted server sale lines; conflicts can require review | Shared refund ledger; device backend cash-only |
| Original unsynced-sale return | Must sync original first | Server line IDs available after acceptance |
| Receipts and audited reprints | Local snapshots; reprint audit queued when server receipt ID exists | Immutable server receipts downloadable |
| Reports | Cached report / separate local activity totals | Authoritative store totals, returns and net tax |
| Offline reserves | Consume prepared units | Allocate and reconcile unused reserves |
| Staff/register/device settings, branding, uploads, absolute stock adjustments | Requires reconnect | Open the existing owner web POS dashboard |
| Manual settlement evidence / eligible void | Requires reconnect | Permission-controlled device endpoint |
| Backup / computer transfer | Encrypted export; source locks | Destination requires supervisor recovery and sync |

Remote authority and independent payment verification cannot be promised while disconnected. This release covers the backend's current supported POS domain and exposes its management dashboard; it does not add unsupported warehouse transfers, weighted quantities, gift cards, customer credit, fiscal printers, payment gateway capture or remote offline revocation.

## Validation

`desktop/pos/test/client.test.cjs` covers durable restart, rollback, replay, policy trust, limits, tax math, partial returns, conflicts, backup encryption and stale recovery. `test/integration.cjs` calls a disposable real Laravel server for stock reservation, taxed offline sale, intentionally lost committed reply, duplicate sync, return, cash, close, report and reconciliation. `test/ui.cjs` drives the bundled renderer using its actual Client/SQLite command boundary. The web browser test approves and claims a device through the actual owner settings screen.

The Windows workflow checks bundled SQLite, OS credential encryption, preload and renderer after packaging. Real printer output, Windows SmartScreen/signing reputation and store-specific stock writers still require deployment/device validation. Unit tests and Linux packaging do not substitute for that validation.

One open offline allocation per product per device is enforced during preparation. Sync and release unused stock before preparing that product again. For older duplicated allocations, reconcile them and request one replacement quantity.

## Version 1.1 downloaded stock

`OfflineCatalogService` signs device-scoped catalog prices. It applies offline sale deltas to the current locked stock rather than replacing its quantity. A concurrent shortage records a sale-linked `pos_stock_shortfalls` row; stock stays nonnegative and paid sales remain in orders, tenders, receipts and reports. Idempotency prevents a second decrement. `PosRequest` restores signed JSON from the raw request so website form middleware cannot turn blank variants into null and break valid signatures.

Zero-opening automatic cash sessions belong to the actor and device. They coexist with another till's session without taking its register pointer. Opening cash is a reminder in both clients. A local Disconnect flag prevents all POS API requests while retaining credentials; Connect runs the manual sync path. No background financial upload occurs.

Product media downloads in four bounded workers without bearer credentials. A private raster-only disk cache is exposed through `pos-image:`; the sandboxed renderer never gets filesystem or network access. Missing media does not undo financial synchronization.
