/** Shared wire types for the future web addon and desktop client. */
export type UUID = string;
export type Minor = number;
export type Timestamp = string;
export type Currency = string;

export type PosAbility =
  | "pos:catalog:read" | "pos:inventory:read" | "pos:inventory:write"
  | "pos:sale:write" | "pos:sale:read" | "pos:shift:write"
  | "pos:refund:write" | "pos:void:write" | "pos:discount:write"
  | "pos:price:override" | "pos:payment:verify" | "pos:cash:write"
  | "pos:receipt:read" | "pos:receipt:reprint" | "pos:report:read"
  | "pos:device:manage" | "pos:staff:manage" | "pos:settings:manage" | "pos:sync";

export interface PriceSnapshot {
  stock_id: number;
  product_id: number;
  name: string;
  variant: string;
  sku: string | null;
  barcode: string | null;
  category_id: number;
  brand_id: number | null;
  unit: string | null;
  image_id: number | string | null;
  base_price_minor: Minor;
  promotion_minor: Minor;
  unit_price_minor: Minor;
  tax_rules: Array<{ type: "percent" | "amount"; value: number }>;
  tax_inclusive: boolean;
  gst_bps: number;
  currency: Currency;
  price_version: string;
  next_price_boundary: number | null;
  max_discount_bps?: number;
}

export interface CatalogItem extends PriceSnapshot { available_quantity: number }
export interface CatalogSnapshot {
  snapshot_id: UUID;
  high_water_mark: number;
  next_after: number;
  has_more: boolean;
  data: CatalogItem[];
}
export interface ChangePage {
  cursor: number;
  has_more: boolean;
  data: Array<{ sequence: number; entity: "catalog" | "sale" | "refund";
    id: string; operation: "upsert" | "delete"; payload: Record<string, unknown> }>;
}

export interface PolicyPublicKey {
  algorithm: "Ed25519";
  public_key: string;
  key_id: string;
}
export interface SignedOfflinePolicy extends PolicyPublicKey {
  signature: string;
  policy: {
    schema_version: 1;
    allocation_id: UUID;
    seller_id: number;
    device_id: UUID;
    register_id: number;
    stock_id: number;
    reserved: number;
    price_snapshot: PriceSnapshot;
    expires_at: Timestamp;
    max_offline_sale_minor: Minor;
    max_offline_budget_minor: Minor;
  };
}
export interface IssuedAllocation {
  allocation_id: UUID;
  stock_id: number;
  reserved: number;
  policy_expires_at: Timestamp;
  price_snapshot: PriceSnapshot;
  signed_policy: SignedOfflinePolicy;
}
export interface AllocationRequest { lines: Array<{ stock_id: number; quantity: number }> }
export interface ReconciliationRequest {
  checkpoint_sequence: number;
  pending_events: 0;
  allocations: Array<{ allocation_id: UUID; consumed_quantity: number }>;
}

export interface CustomerContact { name: string; email?: string | null; phone?: string | null }
export type TenderMethod = "cash" | "external_terminal" | "bank_transfer";
export interface TenderInput {
  method: TenderMethod;
  currency: Currency;
  amount_minor: Minor;
  received_minor?: Minor;
  change_minor?: Minor;
  reference?: string | null;
}
export interface OnlineSaleLine {
  stock_id: number;
  quantity: number;
  discount_minor?: Minor;
  override_minor?: Minor;
  override_reason?: string;
  unit_price_minor?: Minor;
  tax_minor?: Minor;
  total_minor?: Minor;
}
export interface OnlineSale {
  schema_version?: 1;
  client_sale_id: UUID;
  register_id: number;
  shift_id: number;
  currency: Currency;
  occurred_at?: Timestamp;
  grand_total_minor?: Minor;
  customer?: CustomerContact;
  lines: OnlineSaleLine[];
  tenders: TenderInput[];
}
export interface OfflineSaleLine {
  stock_id: number;
  quantity: number;
  discount_minor?: Minor;
  unit_price_minor: Minor;
  tax_minor: Minor;
  total_minor?: Minor;
  allocation_id: UUID;
  policy_signature: string;
}
export interface OfflineSale extends Omit<OnlineSale, "shift_id" | "occurred_at" | "lines" | "tenders"> {
  client_shift_id: UUID;
  occurred_at: Timestamp;
  lines: OfflineSaleLine[];
  tenders: Array<TenderInput & { method: "cash" }>;
}
export interface SaleResult {
  sale_id: number;
  order_id: number;
  client_sale_id: UUID;
  receipt_id: number;
  payment_status: "pending" | "settled";
  total_minor: Minor;
  duplicate: boolean;
}

export interface ShiftOpen {
  client_shift_id: UUID;
  register_id: number;
  opening_minor: Minor;
  occurred_at?: Timestamp;
}
export interface ShiftClose { counted_minor: Minor; reason?: string | null; occurred_at?: Timestamp }
export interface CashMovement { amount_minor: Minor; reason: string }
export interface ReturnLine { sale_line_id: number; quantity: number; restock: boolean }
export interface ReturnRequest {
  client_refund_id: UUID;
  shift_id: number;
  method: TenderMethod;
  reason: string;
  lines: ReturnLine[];
}
export interface OfflineReturn extends Omit<ReturnRequest, "shift_id" | "method"> {
  client_shift_id: UUID;
  client_sale_id: UUID;
  method: "cash";
}
export interface SettlementEvidence { reference: string; evidence: string }

interface EventIdentity { event_id: UUID; local_sequence: number }
export type SyncEvent = EventIdentity & (
  | { type: "shift.opened"; payload: ShiftOpen }
  | { type: "sale.completed"; payload: OfflineSale }
  | { type: "refund.created"; payload: OfflineReturn }
  | { type: "shift.closed"; payload: ShiftClose & { client_shift_id: UUID } }
  | { type: "cash.moved"; payload: CashMovement & { client_shift_id: UUID } }
  | { type: "receipt.reprinted"; payload: { receipt_id: number; reason: string } }
);
export interface SyncRequest { schema_version: 1; device_id: UUID; events: SyncEvent[] }
export interface SyncAcknowledgment {
  event_id: UUID;
  status: "accepted" | "duplicate" | "needs_review" | "rejected";
  durable: boolean;
  duplicate?: boolean;
  error_code?: string;
  message?: string;
  errors?: Record<string, string[]>;
  expected_sequence?: number;
  sale_id?: number;
  order_id?: number;
  receipt_id?: number;
  shift_id?: number;
  refund_id?: number;
}
export interface SyncResponse { schema_version: 1; results: SyncAcknowledgment[] }
export type EventStatus = SyncAcknowledgment | { event_id: UUID; status: "unknown"; durable: false };

export interface PairingStart { pairing_id: UUID; pairing_secret: string; expires_at: Timestamp }
export type PairingClaim = { status: "awaiting_approval" } | {
  status: "paired"; device_id: UUID; token: string; expires_at: Timestamp;
};
export interface PairingApproval {
  pairing_id: UUID;
  register_id: number;
  cashier_id: number;
  abilities: PosAbility[];
  offline_allowed?: boolean;
  max_reserved_units?: number;
  max_offline_sale_minor?: Minor;
  max_offline_budget_minor?: Minor;
  existing_device_id?: UUID;
  reauthorization_reason?: string;
}
export interface PosError { error: { code: string; message: string; fields?: Record<string, string[]> } }
