# POS API v1

## Authentication and requests

Device base path: `/api/pos/v1`. Browser base path: `/pos/backend`. Both expose the shared catalog, sale, receipt, return, shift and report operations. Device allocation/sync routes exist only in the device API; device approval and merchant management exist only in the browser backend.

Send JSON with `Content-Type: application/json` and `Accept: application/json`. Device requests require `Authorization: Bearer <paired-token>`. Browser writes require the existing session and a valid CSRF token. A stable `Idempotency-Key` of 16 to 100 letters, digits, colons, underscores or hyphens is mandatory for each direct mutation. Generate one UUID per operation and retain it during retries.

Delegated browser staff select an assigned register using `register_id` in the request or query string. Owners resolve their own store automatically.

Owner IDs are derived by the server. Do not submit `seller_id`, arbitrary cashier IDs, location IDs, a paid status or a verification flag. The pairing approval request is the explicit management operation that chooses an authorised enrolled cashier. The enrolled device is bound to that cashier and register.

Limits: 1 MiB JSON body, 200 sale/allocation lines, 100 events per sync batch, 10 tenders and 10,000 units per line. Catalog snapshot/change pages allow up to 2,000 records; product search allows up to 200. A merchant's mutation transaction takes its settings-row mutex before stock rows, with deadlock retries. This prioritises correctness; benchmark throughput on the actual hosting instance.

## Online sale

Open a shift first. The returned `shift_id` belongs to the current cashier and register. For example:

```json
{
  "client_sale_id": "11111111-1111-4111-8111-111111111111",
  "register_id": 1,
  "shift_id": 1,
  "currency": "NGN",
  "lines": [{"stock_id": 11, "quantity": 2}],
  "tenders": [{"method": "cash", "currency": "NGN", "amount_minor": 20000, "received_minor": 30000, "change_minor": 10000}]
}
```

The server prices each stock variant at posting time. Optional `unit_price_minor`, `tax_minor`, `total_minor` and `grand_total_minor` assert the expected price; they cannot override it. A supervisor can submit `override_minor` with `override_reason`. Manual `discount_minor` needs a grant and stays inside the cashier percentage limit. Promotional discounts are part of the authorised unit price.

Bank transfers and external terminals require a reference and start pending. `/tenders/{id}/verify` requires `pos:payment:verify`, a unique settlement reference and evidence. The resulting state is `manual_verified`, not a gateway authorisation.

Success returns `sale_id`, `order_id`, `client_sale_id`, `total_minor`, `payment_status`, `receipt_id` and `duplicate`. Exact replay returns the persisted result. A different transport key with the same client sale and same payload still finds the original order. Changing an already-used identity or request digest returns HTTP 409.

## Pair a device

1. Device calls `POST /devices/pair/start` with its name and receives a short-lived pairing ID and secret.
2. An authorised signed-in owner/manager calls browser `POST /pos/backend/devices/pair/approve` with pairing ID, own register ID, authorised cashier ID, abilities and device limits.
3. Device calls `POST /devices/pair/confirm` with the ID and secret. Before approval, the response is `awaiting_approval`. After approval it returns the device-bound token once.

Pairing secrets and bearer tokens are hashed in storage. Tokens expire after the configured term. Revocation deletes credentials, stops future requests and retains reserve buckets. Recover a known device through a new pairing approval that includes `existing_device_id` and `reauthorization_reason`; its register and cashier cannot change during recovery.

## Download the catalog

`GET /catalog/search` supports exact barcode/SKU or grouped keyword search, keyset `after`, and bounded `limit`. Product-level barcodes can match several variants; the caller must resolve that choice using stock IDs. Leading zeros remain strings.

Start `GET /catalog/snapshot?limit=500`. Save its `snapshot_id`, `high_water_mark`, `next_after` and `has_more`. Continue with the same snapshot ID and `after`. The server copies snapshot items under the merchant mutex, so later edits cannot change those pages. An unexpired snapshot is reused per caller/device to prevent repeated large copies. Expired snapshots return 410 and require a new start.

After the snapshot, request `/catalog/changes?cursor=<high_water_mark>`. Apply records in sequence order, then persist the returned cursor. A `delete` operation is a tombstone. `/sync/pull` also returns authorised sale/refund metadata; restricted cashiers receive only their registers. Pull requires both catalog read and sync abilities.

Observers publish normal model edits. Promotion boundaries are refreshed every minute. Full reconciliation runs hourly to repair relation/bulk-write omissions. Live direct SQL/import integrations must still use the stock service or explicitly publish their changes. No timestamp polling or observer alone proves every untracked external writer is covered.

## Offline stock and signatures

Request allocations only after the device has been approved for offline inventory. The server removes allocated units from legacy online availability and issues an immutable price snapshot plus an Ed25519 `signed_policy`. The policy binds the allocation, merchant, device, register, stock, quantity, tax rules, discount limit, expiry and monetary budgets.

Bootstrap exposes the signing public key. Pin that key through authenticated HTTPS. Verify each policy before accepting local sales. Canonical signing JSON recursively sorts object keys, preserves array order, uses integer values, UTF-8 characters and unescaped slashes, and has no whitespace. Verify its base64 signature with Ed25519. The PHP reference is `OfflinePolicySigner` and `Payload::canonical`.

Submit the allocation's signature as `policy_signature` on each offline sale line. The server also checks its stored issued policy, price and tax. A sale's timestamp must lie between allocation issuance and policy expiry and within its open shift. A promotion boundary shortens that window. Later product price/delisting changes do not rewrite valid sale-time snapshots. Current user/device revocation still blocks new ingestion until supervised reauthorization.

Offline cash is the only supported offline tender in v1. Offline price overrides require reconnecting to a supervisor. Device budget and reserve limits remain authoritative on the server.

## Durable sync events

The implemented envelope is:

```json
{
  "schema_version": 1,
  "device_id": "22222222-2222-4222-8222-222222222222",
  "events": [{
    "event_id": "33333333-3333-4333-8333-333333333333",
    "local_sequence": 1,
    "type": "shift.opened",
    "payload": {"client_shift_id": "44444444-4444-4444-8444-444444444444", "register_id": 1, "opening_minor": 0}
  }]
}
```

Supported types are `shift.opened`, `sale.completed`, `refund.created`, `cash.moved`, `shift.closed` and `receipt.reprinted`. Upload dependencies first. Offline sale payloads use `client_shift_id`, `occurred_at`, an allocation ID/signature, issued unit price, computed tax and cash tenders. Server shift IDs replace local IDs internally; the caller must not forge them. Return events also name the original `client_sale_id` and accepted sale-line IDs.

Each event needs a stable UUID and contiguous device sequence beginning at 1. The inbox digest covers the complete event. Same event and same digest return the original IDs; a changed digest returns `EVENT_ID_CONFLICT`. A sequence gap is non-durable and reports `expected_sequence`; resend the missing event first.

| Result | Client behaviour |
| --- | --- |
| `accepted` or accepted `duplicate`, `durable=true` | Mark that event acknowledged and retain its local history. |
| `rejected` or `needs_review`, `durable=true` | Retain the sale/payment evidence for review. Do not count it as an accepted order or silently discard it. This sequence is durably consumed. |
| `durable=false` | Keep pending and correct ordering/identity before retrying. |
| Network failure or unknown response | Query `/sync/status?event_ids[]=...`; never generate a replacement sale ID merely because the reply was lost. |

A corrected rejected event uses a new event ID and next sequence after operator review. Preserve the original local sale ID and customer-paid totals. Accepted sale IDs cannot be rewritten. Unknown server failures roll back the affected event; earlier independently accepted batch events remain queryable.

## Reconcile unused reserves

Stop local consumption of the allocations being reconciled. Upload every pending event and receive durable acknowledgments. Send `checkpoint_sequence`, `pending_events=0`, and each allocation's locally consumed quantity. The checkpoint must equal the server device sequence, and consumed quantities must equal accepted consumption.

The server closes each reconciled allocation and releases only its unused remainder. Later events against a closed allocation become review conflicts. The device exposure budget resets only when all its allocations are reconciled. Expiry and revocation never imply reconciliation.

## Returns, shifts and reports

Returns name original sale-line IDs and quantities, a current cashier shift, reason, tender method and restock choice. Total returned quantity cannot exceed the sale. Refunds cannot exceed the remaining original tender amount. Partial return amounts and taxes use cumulative integer allocation so the final return preserves every minor unit.

Cash refunds reduce the current shift's expected till balance. External refunds remain pending until explicit evidence verification. Voids compensate stock and preserve order history; paid or partly returned sales cannot be voided.

Reports count sales by sale timestamp and returns by return creation timestamp. Register-filtered returns use the refund shift's register. Net tax subtracts recorded return tax. Pending external payments and refunds remain visible as unsettled amounts.

Use the typed `error.code` for business conflicts. Validation returns `INVALID_REQUEST` with field errors. Respect HTTP 429 backoff, pause on 401/403 and preserve every unacknowledged event.
