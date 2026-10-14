# RewaShop Windows POS

Portable Windows executable with seller-scoped offline cash sales, local SQLite journal and manual synchronization to RewaShop's shared Laravel POS backend.

- [Installation and operator guide](../../docs/pos/desktop-install.md)
- [Architecture, option comparison and coverage](../../docs/pos/desktop-architecture.md)
- [Existing device API](../../docs/pos/api.md)

```sh
npm ci
npm test
npm start
npm run dist:win
```

Windows x64 produces a portable EXE and one-click current-user installer. No PHP, Node or database-server installation is required for clients. Initial pairing, catalog download and recovery need internet.

The app stores its database in Electron's `userData` folder. Keep this folder during updates. Transfer with the app's encrypted export and supervisor recovery, not by cloning an active data folder. Windows credentials are protected with Electron safeStorage and omitted from backups.

The default cashier is the enrolled device user; there is no unauthenticated cross-cashier switching. Online management opens the existing store dashboard. Offline cash sales use the downloaded catalog and signed prices; no reservation or manual shift setup is required. External tenders, settlement evidence and administrative writes require a connection.

For the real backend integration test, initialize `tests/Support/create-pos-desktop-fixture.php`, start the loopback-only `pos-desktop-router.php` on port 8124, and run `npm run test:integration`. These fixtures must never be deployed.

Version 1.2: clean thermal receipts with immediately verifiable device-signed QR codes, automatic synchronization, separate quantity buttons, amount/percentage discounts and a checkout calculator. See [the upgrade guide](../../docs/pos/desktop-upgrade-1.2.md).
