# Addon session API

Financial/catalog calls use the shared `/pos/backend` contract in `openapi.json`. Addon routes use `/rewa-pos/web` in the session/CSRF `web` group, requiring active addon, enabled backend, authenticated context and POS rate limit. Calls carry selected `register_id`; seller and actor are derived by the backend.

| Method / path | Permission | Payload / response |
| --- | --- | --- |
| GET workspace | catalog read | Store/cashier names, scoped categories/brands and grant names |
| GET shifts | shift write | Required register; last 50 shifts with own flag, ledger expected/count/variance |
| GET staff | staff manage | Current merchant cashier grants, registers, discount limits and active state |
| GET products | settings manage | Optional q/page; scoped product visibility/eligibility |
| PUT products/{id} | settings manage | `{pos: boolean}` with stable Idempotency-Key; scoped update/catalog delta/audit |
| GET drafts | sale write | Current cashier/register's unexpired drafts |
| PUT drafts/{uuid} | sale write | Label, prior revision, payload; create at revision 0 or update exact revision |
| DELETE drafts/{uuid} | sale write | Exact revision; unresolved prepared checkout cannot be deleted |

Draft payload: `{lines: [{item: CatalogItem, quantity, discount_minor, override_minor?, override_reason?}], customer?, intent?}`. `intent` is `{key: UUID, payload: OnlineSale}` from `contracts/pos-v1.ts`. Snapshots are UI drafts, not authorized price holds. Prepared DTO/register validation precedes saving; actual sale posting revalidates price, stock, actor, permissions and shift in the shared transaction service.

Maximum 200 lines and 50 live drafts per cashier/register; body limit follows `config/pos.php`. Ordinary drafts expire in 24 hours, prepared recovery in 30 days. Daily transient pruning never removes canonical financial records. Revision conflicts return `409 DRAFT_CONFLICT`; foreign records return 404. These endpoints do not duplicate the order/tender/refund/shift/inventory write engine.
