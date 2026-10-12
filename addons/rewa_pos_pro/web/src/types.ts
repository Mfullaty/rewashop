import type {
    CatalogItem,
    OnlineSale,
    OnlineSaleLine,
    SaleResult,
    TenderMethod,
} from "../../../../contracts/pos-v1";
export type { OnlineSale, OnlineSaleLine, SaleResult, TenderMethod };
export type WebCatalogItem = CatalogItem & { image_url?: string | null };
export type { CatalogItem };
export interface Configuration {
    coreUrl: string;
    webUrl: string;
    csrf: string;
    backUrl: string;
    registerId: number | null;
    area: "admin" | "seller";
}
export interface Register {
    id: number;
    name: string;
    code: string;
    active_shift_id: number | null;
    active: boolean;
}
export interface StoreBranding {
    seller_id?: number;
    name: string;
    logo_url?: string;
    address?: string;
    phone?: string;
    email?: string;
    tax_details?: string;
    footer?: string;
}
export interface Bootstrap {
    seller_id: number;
    owner_type: "admin" | "seller";
    cashier_id: number;
    currency: string;
    abilities: string[];
    max_discount_bps: number;
    registers: Register[];
    branding?: StoreBranding;
    sellers_enabled?: boolean;
    can_manage_seller_pos?: boolean;
    settings: { receipt_footer?: string; tax_inclusive?: boolean; receipt_name?: string;
        receipt_logo_url?: string; receipt_address?: string; receipt_phone?: string;
        receipt_email?: string; receipt_tax_details?: string };
}
export interface Workspace {
    store_name: string;
    cashier_name: string;
    categories: { id: number; name: string }[];
    brands: { id: number; name: string }[];
    delegatable_abilities: string[];
}
export interface Shift {
    id: number;
    cashier_id: number;
    cashier_name: string;
    status: string;
    is_own: boolean;
    opened_at: string;
    closed_at: string | null;
    opening_minor: number;
    expected_minor: number;
    counted_minor: number | null;
    variance_minor: number | null;
}
export interface CartLine {
    item: CatalogItem;
    quantity: number;
    discount_minor: number;
    override_minor?: number;
    override_reason?: string;
}
export interface Intent {
    key: string;
    payload: OnlineSale;
}
export interface DraftPayload {
    lines: CartLine[];
    customer?: { name: string; email?: string; phone?: string } | null;
    intent?: Intent | null;
}
export interface Draft {
    id: string;
    label: string;
    revision: number;
    payload: DraftPayload;
    updated_at: string;
    expires_at: string;
}
export interface Page<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
}
export interface Sale {
    id: number;
    order_id: number;
    receipt_id?: number;
    client_sale_id: string;
    register_id: number;
    source: string;
    status: string;
    payment_status: string;
    currency: string;
    total_minor: number;
    refunded_minor: number;
    occurred_at: string;
}
export interface SaleLine {
    id: number;
    quantity: number;
    returned_quantity: number;
    total_minor: number;
    snapshot: CatalogItem;
}
export interface Tender {
    id: number;
    method: TenderMethod;
    amount_minor: number;
    received_minor: number;
    change_minor: number;
    status: string;
    reference: string | null;
}
export interface Refund {
    id: number;
    method: TenderMethod;
    status: string;
    amount_minor: number;
    reason: string;
}
export interface SaleDetail {
    sale: Sale;
    lines: SaleLine[];
    tenders: Tender[];
    refunds: Refund[];
    receipt_id?: number;
}
export interface Receipt {
    number: string;
    sale_id: number;
    order_id: number;
    order_code: string;
    store: StoreBranding;
    cashier: string;
    register: string;
    occurred_at: string;
    currency: string;
    customer: { name: string; email?: string; phone?: string };
    lines: (CatalogItem & {
        snapshot?: CatalogItem;
        quantity: number;
        subtotal_minor: number;
        discount_minor: number;
        tax_minor: number;
        total_minor: number;
    })[];
    tenders: Tender[];
    subtotal_minor: number;
    discount_minor: number;
    tax_minor: number;
    total_minor: number;
    payment_status: string;
}
export interface Report {
    currency: string;
    totals: {
        sales: number;
        gross_minor: number;
        net_minor: number;
        returns_minor: number;
        net_tax_minor: number;
        discount_minor: number;
    };
    unsettled_sales_minor: number;
    pending_refund_payouts_minor: number;
    tenders: { method: string; status: string; amount_minor: number }[];
}
export interface Product {
    id: number;
    name: string;
    pos: boolean;
    pos_excluded: boolean;
    published: boolean;
    approved: boolean;
    digital: boolean;
    auction_product: boolean;
    wholesale_product: boolean;
    barcode: string | null;
}
export interface Staff {
    user_id: number;
    name: string;
    abilities: string[];
    register_ids: number[];
    max_discount_bps: number;
    active: boolean;
}
