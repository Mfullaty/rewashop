import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Plus,
    Printer,
    RotateCcw,
    Ban,
    CheckCircle2,
    Wallet,
    ArrowDownLeft,
    ArrowUpRight,
    ShieldCheck,
    Monitor,
    RefreshCw,
    Download,
    Search,
} from "lucide-react";
import { Api, queryString, uuid } from "./api";
import { Badge, Empty, Field, Loading, Modal } from "./components";
import { decimal, formatMoney, parseMinor } from "./money";
import type {
    Bootstrap,
    Page,
    Product,
    Receipt,
    Report,
    Sale,
    SaleDetail,
    Shift,
    Staff,
    TenderMethod,
    Workspace,
} from "./types";

interface Props {
    tab: string;
    api: Api;
    boot: Bootstrap;
    workspace: Workspace;
    registerId: number;
    can: (ability: string) => boolean;
    onError: (error: unknown) => void;
    onSuccess: (message: string) => void;
    onReceipt: (
        id: number,
        duplicate?: boolean,
        supplied?: Receipt,
    ) => Promise<void>;
    width: string;
    setWidth: (value: string) => void;
}
export function Operations(props: Props) {
    if (props.tab === "sales") return <Sales {...props} />;
    if (props.tab === "register") return <Register {...props} />;
    if (props.tab === "reports") return <Reports {...props} />;
    if (props.tab === "products") return <Products {...props} />;
    return <Settings {...props} />;
}
function useAction(props: Props) {
    const [busy, setBusy] = useState(false);
    const qc = useQueryClient();
    const busyRef = useRef(false);
    // One key survives an uncertain response while the same dialog stays open.
    const [key, setKey] = useState(uuid());
    const run = async <T,>(
        work: (key: string) => Promise<T>,
        message: string,
        after?: (result: T) => void,
    ) => {
        if (busyRef.current) return;
        busyRef.current = true;
        setBusy(true);
        try {
            const result = await work(key);
            setKey(uuid());
            props.onSuccess(message);
            qc.invalidateQueries();
            after?.(result);
        } catch (e) {
            props.onError(e);
        } finally {
            busyRef.current = false;
            setBusy(false);
        }
    };
    return { busy, run };
}
function DateFilters({
    from,
    to,
    setFrom,
    setTo,
}: {
    from: string;
    to: string;
    setFrom: (v: string) => void;
    setTo: (v: string) => void;
}) {
    return (
        <>
            <Field label="From">
                <input
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />
            </Field>
            <Field label="To">
                <input
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
            </Field>
        </>
    );
}
function dateParams(from: string, to: string) {
    return {
        from: from ? new Date(`${from}T00:00:00`).toISOString() : null,
        to: to ? new Date(`${to}T23:59:59.999`).toISOString() : null,
    };
}
function localTimestamp(value: string) {
    const iso = /(?:Z|[+-]\d{2}:\d{2})$/i.test(value)
        ? value
        : value.replace(" ", "T") + "Z";
    return new Date(iso).toLocaleString();
}
function Sales(props: Props) {
    const { api, boot, onError, onReceipt, can } = props;
    const [page, setPage] = useState(1);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [selected, setSelected] = useState<number | null>(null);
    const sales = useQuery({
        queryKey: ["sales", api.registerId, page, from, to],
        queryFn: ({ signal }) =>
            api.request<Page<Sale>>(
                `sales?${queryString({ ...dateParams(from, to), page })}`,
                { signal },
            ),
    });
    return (
        <section className="operations">
            <div className="section-heading">
                <div>
                    <h2>Every sale, one record</h2>
                    <p>Review receipts, verify payments and handle returns.</p>
                </div>
                <button className="secondary" onClick={() => sales.refetch()}>
                    <RefreshCw size={16} /> Refresh
                </button>
            </div>
            <div className="toolbar">
                <DateFilters
                    from={from}
                    to={to}
                    setFrom={(v) => {
                        setFrom(v);
                        setPage(1);
                    }}
                    setTo={(v) => {
                        setTo(v);
                        setPage(1);
                    }}
                />
                <span className="hint">
                    Selected register · {sales.data?.total || 0} sales
                </span>
            </div>
            {sales.isPending ? (
                <Loading />
            ) : sales.error ? (
                <Empty title="Sales unavailable" text={sales.error.message} />
            ) : !sales.data?.data.length ? (
                <Empty
                    title="No sales yet"
                    text="Recorded sales for this register appear here."
                />
            ) : (
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Sale / order</th>
                                <th>Date</th>
                                <th>Source</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th className="numeric">Total</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {sales.data.data.map((sale) => (
                                <tr key={sale.id}>
                                    <td>
                                        <strong>#{sale.id}</strong>
                                        <small>Order #{sale.order_id}</small>
                                    </td>
                                    <td>{localTimestamp(sale.occurred_at)}</td>
                                    <td>{sale.source}</td>
                                    <td>
                                        <Badge>
                                            {sale.status.replaceAll("_", " ")}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge
                                            tone={
                                                sale.payment_status ===
                                                "settled"
                                                    ? "green"
                                                    : "amber"
                                            }
                                        >
                                            {sale.payment_status}
                                        </Badge>
                                    </td>
                                    <td className="numeric">
                                        <b>
                                            {formatMoney(
                                                sale.total_minor,
                                                boot.currency,
                                            )}
                                        </b>
                                    </td>
                                    <td>
                                        <button
                                            className="text-button"
                                            onClick={() => setSelected(sale.id)}
                                        >
                                            View sale
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {sales.data && sales.data.last_page > 1 && (
                <div className="pagination">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>
                    <span>
                        Page {page} of {sales.data.last_page}
                    </span>
                    <button
                        disabled={page === sales.data.last_page}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
            {selected && (
                <SaleModal
                    {...props}
                    id={selected}
                    onClose={() => setSelected(null)}
                    onReceipt={onReceipt}
                    onError={onError}
                    can={can}
                />
            )}
        </section>
    );
}
function SaleModal(props: Props & { id: number; onClose: () => void }) {
    const { api, id, boot, can, onClose, onReceipt, onError } = props;
    const sale = useQuery({
        queryKey: ["sale", api.registerId, id],
        queryFn: () => api.request<SaleDetail>(`sales/${id}`),
    });
    const action = useAction(props);
    const [returnOpen, setReturnOpen] = useState(false);
    const [verify, setVerify] = useState<{
        kind: "tenders" | "refunds";
        id: number;
    } | null>(null);
    const money = (v: number) => formatMoney(v, boot.currency);
    const reprint = () => {
        const reason = prompt("Reason for duplicate receipt");
        if (!reason) return;
        action.run(
            (key) =>
                api.mutate<{ receipt: Receipt }>(
                    `receipts/${sale.data!.receipt_id}/reprint`,
                    { reason },
                    "POST",
                    false,
                    key,
                ),
            "Duplicate receipt audited.",
            (result) =>
                onReceipt(sale.data!.receipt_id!, true, result.receipt).catch(
                    onError,
                ),
        );
    };
    const voidSale = () => {
        const reason = prompt("Reason for voiding this unsettled sale");
        if (reason)
            action.run(
                (key) =>
                    api.mutate(
                        `sales/${id}/void`,
                        { reason },
                        "POST",
                        false,
                        key,
                    ),
                "Sale voided with compensating stock movements.",
            );
    };
    return (
        <Modal title={`Sale #${id}`} onClose={onClose} wide>
            {sale.isPending ? (
                <Loading />
            ) : sale.error ? (
                <p className="error-text">{sale.error.message}</p>
            ) : (
                sale.data && (
                    <>
                        <div className="sale-detail-heading">
                            <div>
                                <strong>
                                    {money(sale.data.sale.total_minor)}
                                </strong>
                                <p>
                                    Order #{sale.data.sale.order_id} ·{" "}
                                    {sale.data.sale.source}
                                </p>
                            </div>
                            <div>
                                <Badge>{sale.data.sale.status}</Badge>{" "}
                                <Badge
                                    tone={
                                        sale.data.sale.payment_status ===
                                        "settled"
                                            ? "green"
                                            : "amber"
                                    }
                                >
                                    {sale.data.sale.payment_status}
                                </Badge>
                            </div>
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Sold / returned</th>
                                        <th className="numeric">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sale.data.lines.map((line) => (
                                        <tr key={line.id}>
                                            <td>
                                                <strong>
                                                    {line.snapshot.name}
                                                </strong>
                                                <small>
                                                    {line.snapshot.variant ||
                                                        line.snapshot.sku}
                                                </small>
                                            </td>
                                            <td>
                                                {line.quantity} /{" "}
                                                {line.returned_quantity}
                                            </td>
                                            <td className="numeric">
                                                {money(line.total_minor)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h3 className="subheading">Tenders</h3>
                        <div className="record-list">
                            {sale.data.tenders.map((tender) => (
                                <div key={tender.id}>
                                    <div>
                                        <strong>
                                            {tender.method.replaceAll("_", " ")}
                                        </strong>
                                        <small>
                                            {tender.reference ||
                                                "Cash in register"}
                                        </small>
                                    </div>
                                    <b>{money(tender.amount_minor)}</b>
                                    <Badge
                                        tone={
                                            tender.status === "pending"
                                                ? "amber"
                                                : "green"
                                        }
                                    >
                                        {tender.status}
                                    </Badge>
                                    {tender.status === "pending" &&
                                        can("payment:verify") &&
                                        sale.data.sale.status !== "voided" && (
                                            <button
                                                className="text-button"
                                                onClick={() =>
                                                    setVerify({
                                                        kind: "tenders",
                                                        id: tender.id,
                                                    })
                                                }
                                            >
                                                Verify evidence
                                            </button>
                                        )}
                                </div>
                            ))}
                        </div>
                        {!!sale.data.refunds.length && (
                            <>
                                <h3 className="subheading">
                                    Returns & payouts
                                </h3>
                                <div className="record-list">
                                    {sale.data.refunds.map((refund) => (
                                        <div key={refund.id}>
                                            <div>
                                                <strong>
                                                    Return #{refund.id}
                                                </strong>
                                                <small>{refund.reason}</small>
                                            </div>
                                            <b>{money(refund.amount_minor)}</b>
                                            <Badge
                                                tone={
                                                    refund.status === "pending"
                                                        ? "amber"
                                                        : "green"
                                                }
                                            >
                                                {refund.status}
                                            </Badge>
                                            {refund.status === "pending" &&
                                                can("payment:verify") && (
                                                    <button
                                                        className="text-button"
                                                        onClick={() =>
                                                            setVerify({
                                                                kind: "refunds",
                                                                id: refund.id,
                                                            })
                                                        }
                                                    >
                                                        Verify payout
                                                    </button>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        <div className="modal-actions">
                            <button
                                className="secondary"
                                onClick={reprint}
                                disabled={
                                    !can("receipt:reprint") ||
                                    action.busy ||
                                    !sale.data.receipt_id
                                }
                            >
                                <Printer size={16} /> Reprint
                            </button>
                            {can("void:write") &&
                                sale.data.sale.payment_status === "pending" &&
                                sale.data.sale.status === "completed" && (
                                    <button
                                        className="secondary danger-text"
                                        onClick={voidSale}
                                        disabled={action.busy}
                                    >
                                        <Ban size={16} /> Void sale
                                    </button>
                                )}
                            {can("refund:write") &&
                                sale.data.sale.payment_status === "settled" &&
                                sale.data.lines.some(
                                    (line) =>
                                        line.returned_quantity < line.quantity,
                                ) && (
                                    <button
                                        className="primary"
                                        onClick={() => setReturnOpen(true)}
                                    >
                                        <RotateCcw size={16} /> Return items
                                    </button>
                                )}
                        </div>
                        {returnOpen && (
                            <ReturnModal
                                {...props}
                                detail={sale.data}
                                onClose={() => setReturnOpen(false)}
                            />
                        )}
                        {verify && (
                            <EvidenceModal
                                {...props}
                                record={verify}
                                onClose={() => setVerify(null)}
                            />
                        )}
                    </>
                )
            )}
        </Modal>
    );
}
function EvidenceModal(
    props: Props & {
        record: { kind: "tenders" | "refunds"; id: number };
        onClose: () => void;
    },
) {
    const [reference, setReference] = useState("");
    const [evidence, setEvidence] = useState("");
    const action = useAction(props);
    return (
        <Modal
            title={
                props.record.kind === "tenders"
                    ? "Verify payment settlement"
                    : "Verify refund payout"
            }
            onClose={props.onClose}
        >
            <p className="hint">
                Record evidence from your bank or terminal settlement records. A
                typed payment reference alone is insufficient.
            </p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    action.run(
                        (key) =>
                            props.api.mutate(
                                `${props.record.kind}/${props.record.id}/verify`,
                                { reference, evidence },
                                "POST",
                                false,
                                key,
                            ),
                        "Settlement evidence recorded.",
                        props.onClose,
                    );
                }}
            >
                <Field label="Settlement reference">
                    <input
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        minLength={3}
                        maxLength={100}
                        required
                    />
                </Field>
                <Field label="Evidence and reconciliation notes">
                    <textarea
                        value={evidence}
                        onChange={(e) => setEvidence(e.target.value)}
                        minLength={10}
                        maxLength={2000}
                        required
                    />
                </Field>
                <div className="modal-actions">
                    <button className="primary" disabled={action.busy}>
                        <ShieldCheck size={16} /> Confirm verified settlement
                    </button>
                </div>
            </form>
        </Modal>
    );
}
function ReturnModal(
    props: Props & { detail: SaleDetail; onClose: () => void },
) {
    const { api, boot, detail, onClose } = props;
    const [reason, setReason] = useState("");
    const [method, setMethod] = useState<TenderMethod>(
        detail.tenders[0]?.method || "cash",
    );
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const [restock, setRestock] = useState(true);
    const action = useAction(props);
    const shifts = useQuery({
        queryKey: [
            "shifts",
            `${boot.seller_id}:${boot.cashier_id}:${api.registerId}`,
        ],
        queryFn: () => api.request<{ data: Shift[] }>("shifts", { web: true }),
    });
    const shift = shifts.data?.data.find(
        (row) => row.status === "open" && row.is_own,
    );
    return (
        <Modal title="Return items" onClose={onClose}>
            <p className="hint">
                Refunds are separate records. Original receipts and order totals
                stay intact.
            </p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const lines = Object.entries(quantities)
                        .filter(([, q]) => q > 0)
                        .map(([id, quantity]) => ({
                            sale_line_id: Number(id),
                            quantity,
                            restock,
                        }));
                    if (!lines.length || !shift) {
                        props.onError(
                            new Error(
                                "Select return quantities and open your shift.",
                            ),
                        );
                        return;
                    }
                    action.run(
                        (key) =>
                            api.mutate(
                                `sales/${detail.sale.id}/returns`,
                                {
                                    client_refund_id: key,
                                    shift_id: shift.id,
                                    method,
                                    reason,
                                    lines,
                                },
                                "POST",
                                false,
                                key,
                            ),
                        "Return recorded. External payouts remain pending until verified.",
                        onClose,
                    );
                }}
            >
                <div className="return-lines">
                    {detail.lines
                        .filter(
                            (line) => line.quantity > line.returned_quantity,
                        )
                        .map((line) => (
                            <Field
                                key={line.id}
                                label={`${line.snapshot.name} · ${line.quantity - line.returned_quantity} returnable`}
                            >
                                <input
                                    type="number"
                                    min="0"
                                    max={line.quantity - line.returned_quantity}
                                    value={quantities[line.id] || 0}
                                    onChange={(e) =>
                                        setQuantities({
                                            ...quantities,
                                            [line.id]: Number(e.target.value),
                                        })
                                    }
                                />
                            </Field>
                        ))}
                </div>
                <Field label="Refund tender">
                    <select
                        value={method}
                        onChange={(e) =>
                            setMethod(e.target.value as TenderMethod)
                        }
                    >
                        {Array.from(
                            new Set(detail.tenders.map((t) => t.method)),
                        ).map((value) => (
                            <option key={value} value={value}>
                                {value.replaceAll("_", " ")}
                            </option>
                        ))}
                    </select>
                </Field>
                <label className="checkbox">
                    <input
                        type="checkbox"
                        checked={restock}
                        onChange={(e) => setRestock(e.target.checked)}
                    />{" "}
                    Restock inspected items into saleable stock
                </label>
                <Field label="Return reason">
                    <textarea
                        required
                        minLength={3}
                        maxLength={500}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Field>
                {!shift && (
                    <p className="error-text">
                        Open your register shift to process a return.
                    </p>
                )}
                <div className="modal-actions">
                    <button
                        className="primary"
                        disabled={action.busy || !shift}
                    >
                        Record return & refund
                    </button>
                </div>
            </form>
        </Modal>
    );
}
function Register(props: Props) {
    const { api, boot, registerId, can } = props;
    const scope = `${boot.seller_id}:${boot.cashier_id}:${registerId}`;
    const shifts = useQuery({
        queryKey: ["shifts", scope],
        queryFn: () => api.request<{ data: Shift[] }>("shifts", { web: true }),
        refetchInterval: 15000,
    });
    const [actionType, setActionType] = useState<
        "open" | "close" | "cash-in" | "cash-out" | null
    >(null);
    const [amount, setAmount] = useState("0.00");
    const [reason, setReason] = useState("");
    const action = useAction(props);
    const current = shifts.data?.data.find((row) => row.status === "open");
    const begin = (type: typeof actionType) => {
        setAmount("0.00");
        setReason("");
        setActionType(type);
    };
    const submit = () => {
        try {
            const minor = parseMinor(amount);
            action.run(
                (key) =>
                    actionType === "open"
                        ? api.mutate(
                              "shifts/open",
                              {
                                  client_shift_id: key,
                                  register_id: registerId,
                                  opening_minor: minor,
                              },
                              "POST",
                              false,
                              key,
                          )
                        : actionType === "close"
                          ? api.mutate(
                                `shifts/${current!.id}/close`,
                                { counted_minor: minor, reason },
                                "POST",
                                false,
                                key,
                            )
                          : api.mutate(
                                `shifts/${current!.id}/cash`,
                                {
                                    amount_minor:
                                        actionType === "cash-out"
                                            ? -minor
                                            : minor,
                                    reason,
                                },
                                "POST",
                                false,
                                key,
                            ),
                "Register ledger updated.",
                () => setActionType(null),
            );
        } catch (e) {
            props.onError(e);
        }
    };
    return (
        <section className="operations">
            <div className="section-heading">
                <div>
                    <h2>Your till, reconciled</h2>
                    <p>
                        Cash received less change, completed cash refunds and
                        till movements.
                    </p>
                </div>
                {!current && (
                    <button className="primary" onClick={() => begin("open")}>
                        <Plus size={16} /> Open shift
                    </button>
                )}
            </div>
            {shifts.isPending ? (
                <Loading />
            ) : shifts.error ? (
                <Empty
                    title="Register unavailable"
                    text={shifts.error.message}
                />
            ) : (
                <>
                    <div className="metric-grid">
                        <div className="metric-card">
                            <span>Shift status</span>
                            <strong>{current ? "Open" : "Closed"}</strong>
                            <small>
                                {current
                                    ? `${current.cashier_name} · #${current.id}`
                                    : "Count the opening float before selling"}
                            </small>
                        </div>
                        <div className="metric-card">
                            <span>Opening float</span>
                            <strong>
                                {formatMoney(
                                    current?.opening_minor || 0,
                                    boot.currency,
                                )}
                            </strong>
                        </div>
                        <div className="metric-card">
                            <span>Expected cash</span>
                            <strong>
                                {formatMoney(
                                    current?.expected_minor || 0,
                                    boot.currency,
                                )}
                            </strong>
                            <small>From the committed till ledger</small>
                        </div>
                    </div>
                    {current && (
                        <div className="register-actions">
                            {current.is_own ? (
                                <>
                                    <button
                                        className="secondary"
                                        disabled={!can("cash:write")}
                                        onClick={() => begin("cash-in")}
                                    >
                                        <ArrowDownLeft size={17} /> Cash in
                                    </button>
                                    <button
                                        className="secondary"
                                        disabled={!can("cash:write")}
                                        onClick={() => begin("cash-out")}
                                    >
                                        <ArrowUpRight size={17} /> Cash out
                                    </button>
                                    <button
                                        className="primary"
                                        onClick={() => begin("close")}
                                    >
                                        <CheckCircle2 size={17} /> Count & close
                                        shift
                                    </button>
                                </>
                            ) : (
                                <p className="hint">
                                    This shift belongs to {current.cashier_name}
                                    . That cashier must close it before you open
                                    another.
                                </p>
                            )}
                        </div>
                    )}
                    <h3 className="subheading">Shift history</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>Shift / cashier</th>
                                    <th>Opened</th>
                                    <th>Status</th>
                                    <th className="numeric">Expected</th>
                                    <th className="numeric">Counted</th>
                                    <th className="numeric">Variance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shifts.data?.data.map((row) => (
                                    <tr key={row.id}>
                                        <td>
                                            <strong>#{row.id}</strong>
                                            <small>{row.cashier_name}</small>
                                        </td>
                                        <td>{localTimestamp(row.opened_at)}</td>
                                        <td>
                                            <Badge
                                                tone={
                                                    row.status === "open"
                                                        ? "green"
                                                        : ""
                                                }
                                            >
                                                {row.status}
                                            </Badge>
                                        </td>
                                        <td className="numeric">
                                            {formatMoney(
                                                row.expected_minor,
                                                boot.currency,
                                            )}
                                        </td>
                                        <td className="numeric">
                                            {row.counted_minor === null
                                                ? "—"
                                                : formatMoney(
                                                      row.counted_minor,
                                                      boot.currency,
                                                  )}
                                        </td>
                                        <td
                                            className={`numeric ${row.variance_minor ? "danger-text" : ""}`}
                                        >
                                            {row.variance_minor === null
                                                ? "—"
                                                : formatMoney(
                                                      row.variance_minor,
                                                      boot.currency,
                                                  )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            {actionType && (
                <Modal
                    title={
                        {
                            open: "Open shift",
                            close: "Count & close shift",
                            "cash-in": "Cash in",
                            "cash-out": "Cash out",
                        }[actionType]
                    }
                    onClose={() => setActionType(null)}
                >
                    <p className="hint">
                        {actionType === "close"
                            ? "Count the physical cash. Explain any difference from the expected ledger balance."
                            : actionType === "open"
                              ? "Enter the physical cash float in this register."
                              : "Every cash movement needs a reason and is recorded in the till ledger."}
                    </p>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            submit();
                        }}
                    >
                        <Field
                            label={
                                actionType === "close"
                                    ? "Counted cash"
                                    : "Cash amount"
                            }
                        >
                            <input
                                inputMode="decimal"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </Field>
                        {actionType !== "open" && (
                            <Field label="Reason">
                                <textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    required={actionType !== "close"}
                                    minLength={3}
                                    maxLength={500}
                                />
                            </Field>
                        )}
                        <div className="modal-actions">
                            <button className="primary" disabled={action.busy}>
                                Confirm {actionType.replace("-", " ")}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </section>
    );
}
function Reports(props: Props) {
    const today = new Date().toLocaleDateString("en-CA");
    const [from, setFrom] = useState(today);
    const [to, setTo] = useState(today);
    const { api, boot } = props;
    const report = useQuery({
        queryKey: ["reports", api.registerId, from, to],
        queryFn: () =>
            api.request<Report>(
                `reports/summary?${queryString(dateParams(from, to))}`,
            ),
    });
    const exportCsv = () => {
        if (!report.data) return;
        const data = report.data;
        const rows = [
            ["metric", "minor_units", "currency"],
            ...Object.entries(data.totals)
                .filter(([key]) => key.endsWith("_minor"))
                .map(([key, value]) => [key, String(value), data.currency]),
            [
                "unsettled_sales_minor",
                String(data.unsettled_sales_minor),
                data.currency,
            ],
            [
                "pending_refund_payouts_minor",
                String(data.pending_refund_payouts_minor),
                data.currency,
            ],
        ];
        const blob = new Blob([rows.map((row) => row.join(",")).join("\r\n")], {
            type: "text/csv;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `pos-report-${from}-${to}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };
    return (
        <section className="operations">
            <div className="section-heading">
                <div>
                    <h2>Retail performance</h2>
                    <p>
                        Sales and returns use their own event dates. Amounts
                        include recorded tax.
                    </p>
                </div>
                <button
                    className="secondary"
                    disabled={!report.data}
                    onClick={exportCsv}
                >
                    <Download size={16} /> Export CSV
                </button>
            </div>
            <div className="toolbar">
                <DateFilters
                    from={from}
                    to={to}
                    setFrom={setFrom}
                    setTo={setTo}
                />
                <span className="hint">
                    Selected register · local date range
                </span>
            </div>
            {report.isPending ? (
                <Loading />
            ) : report.error ? (
                <Empty title="Report unavailable" text={report.error.message} />
            ) : (
                report.data && (
                    <>
                        <div className="metric-grid">
                            {[
                                ["Net sales", report.data.totals.net_minor],
                                ["Gross sales", report.data.totals.gross_minor],
                                ["Returns", report.data.totals.returns_minor],
                                ["Net tax", report.data.totals.net_tax_minor],
                            ].map(([label, value]) => (
                                <div className="metric-card" key={label}>
                                    <span>{label}</span>
                                    <strong>
                                        {formatMoney(
                                            Number(value),
                                            boot.currency,
                                        )}
                                    </strong>
                                </div>
                            ))}
                        </div>
                        <div className="report-panels">
                            <div className="panel">
                                <h3>Tender reconciliation</h3>
                                <div className="record-list">
                                    {report.data.tenders.map((t, index) => (
                                        <div key={index}>
                                            <strong>
                                                {t.method.replaceAll("_", " ")}
                                            </strong>
                                            <Badge
                                                tone={
                                                    t.status === "pending"
                                                        ? "amber"
                                                        : "green"
                                                }
                                            >
                                                {t.status}
                                            </Badge>
                                            <b>
                                                {formatMoney(
                                                    t.amount_minor,
                                                    boot.currency,
                                                )}
                                            </b>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="panel">
                                <h3>Needs attention</h3>
                                <div className="attention-row">
                                    <span>Pending sale payments</span>
                                    <strong>
                                        {formatMoney(
                                            report.data.unsettled_sales_minor,
                                            boot.currency,
                                        )}
                                    </strong>
                                </div>
                                <div className="attention-row">
                                    <span>Pending refund payouts</span>
                                    <strong>
                                        {formatMoney(
                                            report.data
                                                .pending_refund_payouts_minor,
                                            boot.currency,
                                        )}
                                    </strong>
                                </div>
                                <div className="attention-row">
                                    <span>Recorded sales</span>
                                    <strong>{report.data.totals.sales}</strong>
                                </div>
                                <div className="attention-row">
                                    <span>Discounts</span>
                                    <strong>
                                        {formatMoney(
                                            report.data.totals.discount_minor,
                                            boot.currency,
                                        )}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </>
                )
            )}
        </section>
    );
}
function Products(props: Props) {
    const { api } = props;
    const [q, setQ] = useState("");
    const [page, setPage] = useState(1);
    const action = useAction(props);
    const products = useQuery({
        queryKey: ["products", api.registerId, q, page],
        queryFn: ({ signal }) =>
            api.request<Page<Product>>(`products?${queryString({ q, page })}`, {
                web: true,
                signal,
            }),
    });
    return (
        <section className="operations">
            <div className="section-heading">
                <div>
                    <h2>Your POS catalog</h2>
                    <p>
                        Choose which of your products cashiers can sell.
                        Publishing and approval rules still apply.
                    </p>
                </div>
                <Badge>Current store only</Badge>
            </div>
            <div className="toolbar">
                <div className="search-box">
                    <Search size={17} />
                    <input
                        value={q}
                        onChange={(e) => {
                            setQ(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Find a product"
                        aria-label="Find a product"
                    />
                </div>
            </div>
            {products.isPending ? (
                <Loading />
            ) : products.error ? (
                <Empty
                    title="Products unavailable"
                    text={products.error.message}
                />
            ) : (
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Barcode</th>
                                <th>Retail eligibility</th>
                                <th>POS enabled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data?.data.map((product) => {
                                const eligible =
                                    !!product.published &&
                                    !!product.approved &&
                                    !product.digital &&
                                    !product.auction_product &&
                                    !product.wholesale_product;
                                return (
                                    <tr key={product.id}>
                                        <td>
                                            <strong>{product.name}</strong>
                                            <small>Product #{product.id}</small>
                                        </td>
                                        <td>
                                            {product.barcode || "No barcode"}
                                        </td>
                                        <td>
                                            <Badge
                                                tone={
                                                    eligible ? "green" : "amber"
                                                }
                                            >
                                                {eligible
                                                    ? "Physical retail product"
                                                    : "Not published, approved or retail"}
                                            </Badge>
                                        </td>
                                        <td>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    aria-label={`Enable ${product.name} for POS`}
                                                    checked={!!product.pos}
                                                    disabled={action.busy}
                                                    onChange={(e) =>
                                                        action.run(
                                                            (key) =>
                                                                api.mutate(
                                                                    `products/${product.id}`,
                                                                    {
                                                                        pos: e
                                                                            .target
                                                                            .checked,
                                                                    },
                                                                    "PUT",
                                                                    true,
                                                                    key,
                                                                ),
                                                            "POS product visibility updated.",
                                                        )
                                                    }
                                                />
                                                <span />
                                            </label>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {products.data && products.data.last_page > 1 && (
                <div className="pagination">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>
                    <span>
                        Page {page} of {products.data.last_page}
                    </span>
                    <button
                        disabled={page === products.data.last_page}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    );
}
function Settings(props: Props) {
    const { api, boot, can } = props;
    const [footer, setFooter] = useState(boot.settings.receipt_footer || "");
    const [inclusive, setInclusive] = useState(!!boot.settings.tax_inclusive);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [staffOpen, setStaffOpen] = useState(false);
    const [editing, setEditing] = useState<Staff | null>(null);
    const action = useAction(props);
    const staff = useQuery({
        queryKey: ["staff", api.registerId],
        queryFn: () => api.request<{ data: Staff[] }>("staff", { web: true }),
        enabled: can("staff:manage"),
    });
    const devices = useQuery({
        queryKey: ["devices", api.registerId],
        queryFn: () =>
            api.request<{
                data: Page<{
                    id: string;
                    name: string;
                    revoked_at: string | null;
                    last_seen_at: string | null;
                    last_sequence: number;
                    offline_allowed: boolean;
                }>;
            }>("devices"),
        enabled: can("device:manage"),
    });
    return (
        <section className="operations">
            <div className="section-heading">
                <div>
                    <h2>Store & register settings</h2>
                    <p>
                        Merchant settings are shared. Printer preferences apply
                        to this browser.
                    </p>
                </div>
                <Badge>{boot.currency} · integer minor units</Badge>
            </div>
            <div className="settings-grid">
                <section className="panel">
                    <h3>Receipts & pricing</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            action.run(
                                (key) =>
                                    api.mutate(
                                        "settings",
                                        {
                                            receipt_footer: footer,
                                            tax_inclusive: inclusive,
                                        },
                                        "PUT",
                                        false,
                                        key,
                                    ),
                                "Settings saved. New sales use this tax policy.",
                            );
                        }}
                    >
                        <Field label="Receipt footer">
                            <textarea
                                value={footer}
                                onChange={(e) => setFooter(e.target.value)}
                                maxLength={500}
                                disabled={!can("settings:manage")}
                            />
                        </Field>
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                checked={inclusive}
                                onChange={(e) => setInclusive(e.target.checked)}
                                disabled={!can("settings:manage")}
                            />{" "}
                            Product taxes are included in displayed prices
                        </label>
                        <p className="hint">
                            Changing tax treatment changes new sale totals.
                            Refresh open carts before payment.
                        </p>
                        <button
                            className="primary"
                            disabled={!can("settings:manage") || action.busy}
                        >
                            Save merchant settings
                        </button>
                    </form>
                </section>
                <section className="panel">
                    <h3>Browser printing</h3>
                    <Field label="Receipt paper">
                        <select
                            value={props.width}
                            onChange={(e) => props.setWidth(e.target.value)}
                        >
                            <option value="58">58 mm thermal</option>
                            <option value="80">80 mm thermal</option>
                            <option value="a4">A4 / PDF</option>
                        </select>
                    </Field>
                    <p className="hint">
                        Browser print dialog. Choose Save as PDF for a file.
                        Native silent printing, cutter and cash drawer control
                        require the future desktop hardware integration.
                    </p>
                    <div className="capability">
                        <Printer size={18} />
                        <span>HTML receipts · Audited duplicate prints</span>
                    </div>
                    <div className="capability">
                        <Monitor size={18} />
                        <span>HID scanner · Enter or Tab suffix</span>
                    </div>
                </section>
            </div>
            {can("settings:manage") && (
                <section className="panel">
                    <div className="section-heading">
                        <div>
                            <h3>Registers</h3>
                            <p>Registers share this merchant's stock pool.</p>
                        </div>
                        <button
                            className="secondary"
                            onClick={() => setRegisterOpen(true)}
                        >
                            <Plus size={16} /> Add register
                        </button>
                    </div>
                    <div className="record-list">
                        {boot.registers.map((register) => (
                            <div key={register.id}>
                                <Wallet size={18} />
                                <strong>{register.name}</strong>
                                <small>{register.code}</small>
                                <Badge
                                    tone={
                                        register.active_shift_id ? "green" : ""
                                    }
                                >
                                    {register.active_shift_id
                                        ? "Shift open"
                                        : "Available"}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            {can("staff:manage") && (
                <section className="panel">
                    <div className="section-heading">
                        <div>
                            <h3>Cashier permissions</h3>
                            <p>
                                Assign an existing RewaShop account by its user
                                ID.
                            </p>
                        </div>
                        <button
                            className="secondary"
                            onClick={() => {
                                setEditing(null);
                                setStaffOpen(true);
                            }}
                        >
                            <Plus size={16} /> Assign cashier
                        </button>
                    </div>
                    {staff.error && (
                        <p className="error-text">{staff.error.message}</p>
                    )}
                    <div className="record-list">
                        {staff.data?.data.map((row) => (
                            <div key={row.user_id}>
                                <div>
                                    <strong>
                                        {row.name} · #{row.user_id}
                                    </strong>
                                    <small>
                                        {row.abilities.length} permissions ·{" "}
                                        {row.max_discount_bps / 100}% discount
                                        limit
                                    </small>
                                </div>
                                <Badge tone={row.active ? "green" : "amber"}>
                                    {row.active ? "Active" : "Disabled"}
                                </Badge>
                                <button
                                    className="text-button"
                                    onClick={() => {
                                        setEditing(row);
                                        setStaffOpen(true);
                                    }}
                                >
                                    Edit assignment
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            {can("device:manage") && (
                <section className="panel">
                    <div className="section-heading">
                        <div>
                            <h3>Connected devices</h3>
                            <p>
                                Revoking a device stops authentication and
                                preserves its stock reservations.
                            </p>
                        </div>
                        <Badge>Desktop stage follows</Badge>
                    </div>
                    {devices.error && (
                        <p className="error-text">{devices.error.message}</p>
                    )}
                    <div className="record-list">
                        {devices.data?.data.data.map((row) => (
                            <div key={row.id}>
                                <div>
                                    <strong>{row.name}</strong>
                                    <small>
                                        Last seen {row.last_seen_at || "Never"}{" "}
                                        · sequence {row.last_sequence}
                                    </small>
                                </div>
                                <Badge
                                    tone={row.revoked_at ? "amber" : "green"}
                                >
                                    {row.revoked_at ? "Revoked" : "Active"}
                                </Badge>
                                {!row.revoked_at && (
                                    <button
                                        className="text-button danger-text"
                                        disabled={action.busy}
                                        onClick={() => {
                                            const reason = prompt(
                                                "Reason for revoking this device",
                                            );
                                            if (reason)
                                                action.run(
                                                    (key) =>
                                                        api.mutate(
                                                            `devices/${row.id}/revoke`,
                                                            { reason },
                                                            "POST",
                                                            false,
                                                            key,
                                                        ),
                                                    "Device revoked. Reservations remain protected.",
                                                );
                                        }}
                                    >
                                        Revoke
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}
            {registerOpen && (
                <Modal
                    title="Add register"
                    onClose={() => setRegisterOpen(false)}
                >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            action.run(
                                (key) =>
                                    api.mutate(
                                        "registers",
                                        { code, name },
                                        "POST",
                                        false,
                                        key,
                                    ),
                                "Register created.",
                                () => setRegisterOpen(false),
                            );
                        }}
                    >
                        <Field label="Register code">
                            <input
                                required
                                pattern="[A-Za-z0-9_-]+"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                maxLength={40}
                            />
                        </Field>
                        <Field label="Display name">
                            <input
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={150}
                            />
                        </Field>
                        <div className="modal-actions">
                            <button className="primary" disabled={action.busy}>
                                Create register
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
            {staffOpen && (
                <StaffModal
                    {...props}
                    value={editing}
                    onClose={() => setStaffOpen(false)}
                />
            )}
        </section>
    );
}
function StaffModal(
    props: Props & { value: Staff | null; onClose: () => void },
) {
    const { value, boot, api } = props;
    const [user, setUser] = useState(value?.user_id?.toString() || "");
    const [abilities, setAbilities] = useState(
        value?.abilities || [
            "pos:catalog:read",
            "pos:sale:write",
            "pos:sale:read",
            "pos:shift:write",
            "pos:receipt:read",
        ],
    );
    const [registers, setRegisters] = useState<number[]>(
        value?.register_ids || [props.registerId],
    );
    const [discount, setDiscount] = useState(
        String((value?.max_discount_bps || 0) / 100),
    );
    const [active, setActive] = useState(value ? !!value.active : true);
    const action = useAction(props);
    return (
        <Modal title="Cashier assignment" onClose={props.onClose} wide>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    try {
                        const bps = parseMinor(discount);
                        if (bps > boot.max_discount_bps)
                            throw new Error(
                                "The delegated discount limit exceeds your own.",
                            );
                        action.run(
                            (key) =>
                                api.mutate(
                                    "staff",
                                    {
                                        user_id: Number(user),
                                        abilities,
                                        register_ids: registers,
                                        max_discount_bps: bps,
                                        active,
                                    },
                                    "PUT",
                                    false,
                                    key,
                                ),
                            "Cashier permissions updated.",
                            props.onClose,
                        );
                    } catch (e) {
                        props.onError(e);
                    }
                }}
            >
                <div className="form-grid">
                    <Field label="Existing user ID">
                        <input
                            required
                            type="number"
                            min="1"
                            value={user}
                            disabled={!!value}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </Field>
                    <Field label="Maximum discount (%)">
                        <input
                            required
                            inputMode="decimal"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </Field>
                </div>
                <label className="checkbox">
                    <input
                        type="checkbox"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                    />{" "}
                    Assignment active
                </label>
                <h3 className="subheading">Permitted registers</h3>
                <div className="permission-grid">
                    {boot.registers.map((row) => (
                        <label className="checkbox" key={row.id}>
                            <input
                                type="checkbox"
                                checked={registers.includes(row.id)}
                                onChange={(e) =>
                                    setRegisters(
                                        e.target.checked
                                            ? [...registers, row.id]
                                            : registers.filter(
                                                  (id) => id !== row.id,
                                              ),
                                    )
                                }
                            />
                            {row.name}
                        </label>
                    ))}
                </div>
                <h3 className="subheading">Permissions</h3>
                <div className="permission-grid">
                    {boot.abilities
                        .filter((ability) => ability !== "pos:sync")
                        .map((ability) => (
                            <label className="checkbox" key={ability}>
                                <input
                                    type="checkbox"
                                    checked={abilities.includes(ability)}
                                    onChange={(e) =>
                                        setAbilities(
                                            e.target.checked
                                                ? [...abilities, ability]
                                                : abilities.filter(
                                                      (value) =>
                                                          value !== ability,
                                                  ),
                                        )
                                    }
                                />
                                {ability
                                    .replace("pos:", "")
                                    .replaceAll(":", " · ")}
                            </label>
                        ))}
                </div>
                <div className="modal-actions">
                    <button
                        className="primary"
                        disabled={action.busy || !registers.length}
                    >
                        Save assignment
                    </button>
                </div>
            </form>
        </Modal>
    );
}
