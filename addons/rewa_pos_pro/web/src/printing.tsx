import { createPortal } from "react-dom";
import type { Receipt } from "./types";
import { formatMoney } from "./money";
export function PrintReceipt({
    receipt,
    duplicate,
    width,
    footer,
}: {
    receipt: Receipt;
    duplicate: boolean;
    width: string;
    footer: string;
}) {
    const money = (value: number) => formatMoney(value, receipt.currency);
    return createPortal(
        <article id="rewa-pos-receipt" className={`receipt receipt-${width}`}>
            <style>{`@media print { @page { size: ${width === "a4" ? "A4" : "auto"}; margin: ${width === "a4" ? "12mm" : "2mm"}; } }`}</style>
            <header>
                {receipt.store.logo_url && <img className="receipt-logo" src={receipt.store.logo_url} alt="Store logo" /> }
                <h2>{receipt.store.name}</h2>
                {receipt.store.address && <p>{receipt.store.address}</p>}
                {receipt.store.phone && <p>{receipt.store.phone}</p>}
                {receipt.store.email && <p>{receipt.store.email}</p>}
                {receipt.store.tax_details && <p>{receipt.store.tax_details}</p>}
                <p>Retail receipt {duplicate && "• DUPLICATE"}</p>
            </header>
            <p>
                {receipt.number}
                <br />
                {new Date(receipt.occurred_at).toLocaleString()}
                <br />
                Register {receipt.register} · {receipt.cashier}
                <br />
                Order {receipt.order_code || receipt.order_id}
            </p>
            {receipt.customer?.name && (
                <p>
                    {receipt.customer.name}
                    {receipt.customer.phone && (
                        <>
                            <br />
                            {receipt.customer.phone}
                        </>
                    )}
                </p>
            )}
            <div className="receipt-rule" />
            {receipt.lines.map((line, index) => (
                <div className="receipt-line" key={index}>
                    <div>
                        <strong>{line.name || line.snapshot?.name}</strong>
                        {(line.variant || line.snapshot?.variant) && (
                            <small>
                                {line.variant || line.snapshot?.variant}
                            </small>
                        )}
                        <small>
                            {line.quantity} ×{" "}
                            {money(line.subtotal_minor / line.quantity)}
                        </small>
                    </div>
                    <b>{money(line.total_minor)}</b>
                </div>
            ))}
            <div className="receipt-rule" />
            <div className="receipt-line">
                <span>Subtotal</span>
                <span>{money(receipt.subtotal_minor)}</span>
            </div>
            {receipt.discount_minor > 0 && (
                <div className="receipt-line">
                    <span>Discount</span>
                    <span>-{money(receipt.discount_minor)}</span>
                </div>
            )}
            <div className="receipt-line">
                <span>Tax</span>
                <span>{money(receipt.tax_minor)}</span>
            </div>
            <div className="receipt-line receipt-total">
                <strong>TOTAL</strong>
                <strong>{money(receipt.total_minor)}</strong>
            </div>
            {receipt.tenders.map((t, index) => (
                <div key={index}>
                    <div className="receipt-line">
                        <span>
                            {t.method.replaceAll("_", " ")} ({t.status})
                        </span>
                        <span>{money(t.amount_minor)}</span>
                    </div>
                    {t.method === "cash" && (
                        <>
                            <div className="receipt-line">
                                <span>Cash received</span>
                                <span>{money(t.received_minor)}</span>
                            </div>
                            <div className="receipt-line">
                                <span>Change</span>
                                <span>{money(t.change_minor)}</span>
                            </div>
                        </>
                    )}
                </div>
            ))}
            <p className="receipt-status">Payment {receipt.payment_status}</p>
            <footer>{receipt.store.footer ?? (footer || "Thank you for shopping with us.")}</footer>
        </article>,
        document.body,
    );
}
