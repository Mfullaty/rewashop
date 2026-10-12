# Plan validation and scope

## Source checked

The attached planning package names repository commit `4ae4ecfabd967faad5e69c6cb17635729bbcb7b8`. RewaShop's `main` branch matched that commit when implementation began. The additional `pos_system.zip` is the referenced Active eCommerce POS addon version 2.1.

The source checks confirm the plan's main findings:

- The old addon requires shipping name, phone and address for retail checkout.
- Its stock loop has no enclosing database transaction or row locks.
- Its product barcode `orWhere` can escape the preceding ownership filters.
- Stock IDs are accepted without merchant scoping in the cart mutation.
- Manual `offline_payment` is marked paid without independent verification.
- Seller views call several admin-named cart routes.
- Permission middleware targets method names absent from the uploaded controller.
- The addon installer copies configured files and runs SQL. It does not discover a new provider or run Laravel migrations.
- The committed repository omits several controllers supplied by installed addons. Live addon files can therefore differ from GitHub.

The shared Laravel backend, followed by the web addon, then the desktop application, is the correct order for this repository. The two clients must use one sale posting service and one inventory model.

## Changes made to the proposed design

| Finding | Implementation |
| --- | --- |
| Existing token morph IDs are numeric; device IDs are UUIDs | Separate Sanctum-compatible `pos_device_tokens` table. Buyer token tables and authentication remain separate. |
| Session/error sharing is global in the current HTTP kernel | POS device paths bypass both global session middleware while browser routes retain the existing session and CSRF flow. |
| Product updates delete and recreate all variant rows | Upsert stable variants and protect variants with POS history from deletion. |
| Legacy checkout can compete with reservations | Website/mobile checkout takes merchant mutexes and sorted stock locks, then records stock deductions in the same order transaction. |
| Cancellation can restock repeatedly or miss the cancelled transition | Record one legacy restock event per order detail and distinguish the cancellation transition. |
| A timestamp alone cannot prove an offline reserve is unused | Reconcile only after a matching acknowledged sequence, no pending local events and matching consumed quantities. Never release by age or revocation. |
| A copied price cannot authorise an offline sale | Ed25519 policies bind prices, tax, device, register, stock, quantity and limits to each allocation. The server retains and checks the issued policy. |
| Auto-increment change IDs can become visible before older transactions commit | Publish a merchant sequence while holding its settings row mutex. Initial sync copies a materialised snapshot under the same mutex. |
| Retail external payments do not prove gateway settlement | Pending tenders plus explicitly audited manual verification. No simulated payment-provider success. |
| A backend install through the old addon copier has no migration bridge | Install this shared core through the repository and Artisan migrations. The later web addon will require this core version. |

The actual sync contract uses `events[].payload`, rather than the illustrative flattened event in the planning package. It also requires the allocation signature on each offline sale line. The OpenAPI file and API examples define the implemented contract.

## Stage boundary

This stage supplies the shared backend, route bridge, schema, CLI checks, API contract and automated tests. It does not install a web checkout screen, package an addon ZIP, build Electron or dispatch physical print jobs. Those are the next two review stages requested for this project.

Production activation requires a staging copy of the deployed schema and installed addons. The supplied archive and repository cannot prove that every live import, raw SQL adjustment or third-party addon uses the reviewed stock paths. Offline allocations stay disabled by default until those paths are checked.
