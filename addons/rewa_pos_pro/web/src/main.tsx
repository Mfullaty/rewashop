import {
    StrictMode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { createRoot } from "react-dom/client";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    ShoppingBag,
    ScanLine,
    Search,
    Plus,
    Minus,
    Trash2,
    Pause,
    Play,
    CreditCard,
    Check,
    Printer,
    ArrowLeft,
    BarChart3,
    Settings,
    ReceiptText,
    Wallet,
    Package,
    Wifi,
    WifiOff,
    Sun,
    Moon,
    Keyboard,
    ChevronRight,
    X,
} from "lucide-react";
import {
    Api,
    ApiError,
    isDefinitiveSaleRejection,
    queryString,
    uuid,
} from "./api";
import {
    calculateLine,
    decimal,
    distributeDiscount,
    formatMoney,
    parseMinor,
    saleLines,
    totals,
} from "./money";
import { persistDraft, submitIntent } from "./checkout";
import { onlineSaleSchema } from "./schema";
import { Badge, Empty, Field, Loading, Modal } from "./components";
import { PrintReceipt } from "./printing";
import { Operations } from "./operations";
import type {
    Bootstrap,
    CartLine,
    CatalogItem,
    Configuration,
    Draft,
    Intent,
    Receipt,
    SaleResult,
    Shift,
    TenderMethod,
    Workspace,
} from "./types";
import "./style.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false, staleTime: 10000 },
        mutations: { retry: false },
    },
});
const config: Configuration = JSON.parse(
    document.getElementById("rewa-pos-config")!.textContent!,
);
function Application() {
    const qc = useQueryClient();
    const [registerId, setRegisterId] = useState<number | null>(
        config.registerId,
    );
    const api = useMemo(() => new Api(config, registerId), [registerId]);
    const bootQuery = useQuery({
        queryKey: ["bootstrap", registerId],
        queryFn: ({ signal }) =>
            api.request<Bootstrap>("bootstrap", { signal }),
        refetchInterval: 30000,
    });
    const workspaceQuery = useQuery({
        queryKey: ["workspace", registerId],
        queryFn: ({ signal }) =>
            api.request<Workspace>("workspace", { web: true, signal }),
    });
    const boot = bootQuery.data;
    const workspace = workspaceQuery.data;
    if (boot) api.scope = `${boot.seller_id}:${boot.cashier_id}`;
    const [tab, setTab] = useState("checkout");
    const [dark, setDark] = useState(
        localStorage.getItem("rewa-pos-theme") === "dark",
    );
    const [online, setOnline] = useState(navigator.onLine);
    const [notice, setNotice] = useState("");
    const [error, setError] = useState("");
    const [receipt, setReceipt] = useState<Receipt | null>(null);
    const [duplicate, setDuplicate] = useState(false);
    const [receiptId, setReceiptId] = useState<number | null>(null);
    const [width, setWidth] = useState(
        localStorage.getItem("rewa-pos-print-width") || "80",
    );
    const [printPending, setPrintPending] = useState(false);
    const [cartLocked, setCartLocked] = useState(false);
    const [printing, setPrinting] = useState(false);
    const printBusy = useRef(false);
    const scanRef = useRef<HTMLInputElement>(null);
    const scope =
        boot && registerId
            ? `${boot.seller_id}:${boot.cashier_id}:${registerId}`
            : "";
    const printKey = `rewa-pos:print:${scope}`;
    const can = (ability: string) =>
        !!boot?.abilities.includes(`pos:${ability}`);
    const failure = (e: unknown) =>
        setError(
            e instanceof Error
                ? e.message
                : "The action could not be completed.",
        );
    const success = (message: string) => {
        setError("");
        setNotice(message);
    };
    useEffect(() => {
        if (boot && !registerId && boot.registers.length)
            setRegisterId(boot.registers[0].id);
    }, [boot, registerId]);
    useEffect(() => {
        const connected = () => setOnline(navigator.onLine);
        window.addEventListener("online", connected);
        window.addEventListener("offline", connected);
        return () => {
            window.removeEventListener("online", connected);
            window.removeEventListener("offline", connected);
        };
    }, []);
    useEffect(() => {
        document.documentElement.dataset.posTheme = dark ? "dark" : "light";
        localStorage.setItem("rewa-pos-theme", dark ? "dark" : "light");
    }, [dark]);
    useEffect(() => {
        if (notice) {
            const timer = setTimeout(() => setNotice(""), 6000);
            return () => clearTimeout(timer);
        }
    }, [notice]);
    useEffect(() => {
        const id = sessionStorage.getItem(printKey);
        if (id && scope) {
            setReceiptId(Number(id));
            setPrintPending(true);
        }
    }, [printKey, scope]);
    const showReceipt = async (
        id: number,
        isDuplicate = false,
        supplied?: Receipt,
    ) => {
        setReceiptId(id);
        setDuplicate(isDuplicate);
        const result =
            supplied ||
            (await api.request<{ receipt: Receipt }>(`receipts/${id}`)).receipt;
        setReceipt(result);
    };
    const committed = async (result: SaleResult) => {
        sessionStorage.setItem(printKey, String(result.receipt_id));
        setPrintPending(true);
        setReceiptId(result.receipt_id);
        success(
            `Sale #${result.sale_id} recorded. ${result.payment_status === "pending" ? "External payment awaits verification." : "Payment settled."}`,
        );
        qc.invalidateQueries();
        try {
            await showReceipt(result.receipt_id, !!result.duplicate);
        } catch (e) {
            failure(e);
        }
    };
    const print = async () => {
        if (printBusy.current || !receiptId) return;
        printBusy.current = true;
        setPrinting(true);
        try {
            const attemptsKey = `rewa-pos:print-attempts:${scope}:${receiptId}`;
            const attempts = Number(sessionStorage.getItem(attemptsKey) || 0);
            if (attempts > 0) {
                const result = await api.mutate<{ receipt: Receipt }>(
                    `receipts/${receiptId}/reprint`,
                    {
                        reason: "Previous browser print dispatch was not confirmed",
                    },
                );
                setReceipt(result.receipt);
                setDuplicate(true);
                await new Promise<void>((resolve) =>
                    requestAnimationFrame(() => resolve()),
                );
            }
            sessionStorage.setItem(attemptsKey, String(attempts + 1));
            await Promise.all(Array.from(document.querySelectorAll<HTMLImageElement>("#rewa-pos-receipt img"))
                .map((image) => Promise.race([image.decode().catch(() => undefined), new Promise((resolve) => setTimeout(resolve, 5000))])));
            window.print();
        } catch (error) {
            failure(
                new Error(
                    error instanceof ApiError
                        ? error.message
                        : "Printing could not start. The sale is recorded. Reopen its receipt to print.",
                ),
            );
        } finally {
            printBusy.current = false;
            setPrinting(false);
        }
    };
    const printed = () => {
        sessionStorage.removeItem(printKey);
        setPrintPending(false);
        setReceipt(null);
        success("Receipt marked printed.");
    };
    if (bootQuery.isPending || workspaceQuery.isPending) return <Loading />;
    if (!boot || !workspace || boot.owner_type !== config.area)
        return (
            <div className="startup-error">
                <ShoppingBag size={36} />
                <h1>Your register could not open</h1>
                <p>
                    {bootQuery.error?.message ||
                        workspaceQuery.error?.message ||
                        "Open the correct store workspace."}
                </p>
                <button onClick={() => qc.invalidateQueries()}>Retry</button>
                <a href={config.backUrl}>Return to workspace</a>
            </div>
        );
    const nav = [
        ["checkout", "Checkout", ShoppingBag, "sale:write"],
        ["sales", "Sales & returns", ReceiptText, "sale:read"],
        ["register", "Register", Wallet, "shift:write"],
        ["reports", "Reports", BarChart3, "report:read"],
        ["products", "Products", Package, "settings:manage"],
        ["settings", "Settings", Settings, "catalog:read"],
    ] as const;
    return (
        <div className="rp-app">
            <aside className="rail">
                <a
                    className="brand"
                    href={config.backUrl}
                    aria-label="Back to RewaShop"
                >
                    {boot.branding?.logo_url ? <img className="pos-store-logo" src={boot.branding.logo_url} alt="Store logo" /> : <span className="brand-mark">POS</span>}
                    <div>
                        <strong>
                            {boot.branding?.name || workspace.store_name}
                        </strong>
                        <small>POINT OF SALE</small>
                    </div>
                </a>
                <div className="store-label">
                    <span className="store-dot" />
                    <div>
                        <strong>{workspace.store_name}</strong>
                        <small>
                            {boot.owner_type === "admin"
                                ? "Platform store"
                                : "Seller store"}
                        </small>
                    </div>
                </div>
                <nav>
                    {nav
                        .filter(([, , , permission]) => can(permission))
                        .map(([key, label, Icon]) => (
                            <button
                                key={key}
                                aria-label={label}
                                className={tab === key ? "active" : ""}
                                onClick={() => setTab(key)}
                            >
                                <Icon size={19} />
                                <span>{label}</span>
                                {key === "checkout" && <kbd>F2</kbd>}
                            </button>
                        ))}
                </nav>
                <div className="rail-bottom">
                    <button onClick={() => setDark(!dark)}>
                        {dark ? <Sun size={18} /> : <Moon size={18} />}
                        <span>{dark ? "Light mode" : "Dark mode"}</span>
                    </button>
                    <a href={config.backUrl}>
                        <ArrowLeft size={18} /> Back to workspace
                    </a>
                    <div className="cashier">
                        <span>{workspace.cashier_name.charAt(0)}</span>
                        <div>
                            <strong>{workspace.cashier_name}</strong>
                            <small>Cashier · #{boot.cashier_id}</small>
                        </div>
                    </div>
                </div>
            </aside>
            <div className="main-shell">
                <header className="topbar">
                    <div>
                        <span className="eyebrow">REWASHOP POS PRO</span>
                        <h1>{nav.find(([key]) => key === tab)?.[1]}</h1>
                    </div>
                    <div className="topbar-right">
                        <Badge tone={online ? "green" : "amber"}>
                            {online ? (
                                <Wifi size={13} />
                            ) : (
                                <WifiOff size={13} />
                            )}{" "}
                            {online ? "Online" : "Offline"}
                        </Badge>
                        <select
                            aria-label="Register"
                            value={registerId || ""}
                            disabled={cartLocked}
                            onChange={(e) =>
                                setRegisterId(Number(e.target.value))
                            }
                        >
                            {boot.registers.map((register) => (
                                <option key={register.id} value={register.id}>
                                    {register.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </header>
                {!online && (
                    <div className="banner amber" role="status">
                        Checkout needs a connection. Your cart stays on this
                        screen; saved held carts remain in your store.
                    </div>
                )}
                {(error || notice || bootQuery.error) && (
                    <div
                        className={`banner ${error || bootQuery.error ? "danger" : "green"}`}
                        role="status"
                    >
                        {error || bootQuery.error?.message || notice}
                        <button
                            aria-label="Dismiss message"
                            onClick={() => {
                                setError("");
                                setNotice("");
                            }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
                {printPending && !receipt && (
                    <div className="print-reminder">
                        <Printer size={16} />
                        <span>
                            Sale recorded. Receipt #{receiptId} is awaiting
                            print confirmation.
                        </span>
                        <button
                            onClick={() =>
                                receiptId &&
                                showReceipt(receiptId).catch(failure)
                            }
                        >
                            Open receipt
                        </button>
                    </div>
                )}
                <div className="checkout-container" hidden={tab !== "checkout"}>
                    <Checkout
                        key={scope}
                        active={tab === "checkout"}
                        onCartChange={setCartLocked}
                        api={api}
                        boot={boot}
                        workspace={workspace}
                        registerId={registerId!}
                        online={online}
                        scope={scope}
                        scanRef={scanRef}
                        onCommit={committed}
                        onError={failure}
                        onSuccess={success}
                        can={can}
                    />
                </div>
                {tab !== "checkout" && (
                    <Operations
                        tab={tab}
                        api={api}
                        boot={boot}
                        workspace={workspace}
                        registerId={registerId!}
                        can={can}
                        onError={failure}
                        onSuccess={success}
                        onReceipt={showReceipt}
                        width={width}
                        setWidth={(value) => {
                            setWidth(value);
                            localStorage.setItem("rewa-pos-print-width", value);
                        }}
                    />
                )}
            </div>
            {receipt && (
                <>
                    <PrintReceipt
                        receipt={receipt}
                        duplicate={duplicate}
                        width={width}
                        footer={boot.settings.receipt_footer || ""}
                    />
                    <Modal
                        title={
                            duplicate ? "Duplicate receipt" : "Sale recorded"
                        }
                        onClose={() => setReceipt(null)}
                    >
                        <div className="sale-success">
                            <span className="success-icon">
                                <Check size={28} />
                            </span>
                            <h3>
                                {formatMoney(
                                    receipt.total_minor,
                                    boot.currency,
                                )}
                            </h3>
                            <p>
                                {receipt.number} · Order #{receipt.order_id}
                            </p>
                            <Badge
                                tone={
                                    receipt.payment_status === "settled"
                                        ? "green"
                                        : "amber"
                                }
                            >
                                {receipt.payment_status === "settled"
                                    ? "Payment settled"
                                    : "Payment awaiting verification"}
                            </Badge>
                        </div>
                        <div className="receipt-preview">
                            <strong>{receipt.store.name}</strong>
                            {receipt.lines.map((line, index) => (
                                <div key={index}>
                                    <span>
                                        {line.quantity} ×{" "}
                                        {line.name || line.snapshot?.name}
                                    </span>
                                    <b>
                                        {formatMoney(
                                            line.total_minor,
                                            boot.currency,
                                        )}
                                    </b>
                                </div>
                            ))}
                        </div>
                        <Field label="Paper size">
                            <select
                                value={width}
                                onChange={(e) => {
                                    setWidth(e.target.value);
                                    localStorage.setItem(
                                        "rewa-pos-print-width",
                                        e.target.value,
                                    );
                                }}
                            >
                                <option value="58">58 mm thermal</option>
                                <option value="80">80 mm thermal</option>
                                <option value="a4">A4 / Save as PDF</option>
                            </select>
                        </Field>
                        <p className="hint">
                            Your browser opens its print dialog. Confirm the
                            correct printer and paper size.
                        </p>
                        <div className="modal-actions">
                            <button className="secondary" onClick={printed}>
                                Mark printed
                            </button>
                            <button
                                className="primary"
                                onClick={print}
                                disabled={printing}
                            >
                                <Printer size={17} /> Print receipt
                            </button>
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
}

interface CheckoutProps {
    active: boolean;
    onCartChange: (locked: boolean) => void;
    api: Api;
    boot: Bootstrap;
    workspace: Workspace;
    registerId: number;
    online: boolean;
    scope: string;
    scanRef: React.RefObject<HTMLInputElement | null>;
    onCommit: (result: SaleResult) => Promise<void>;
    onError: (error: unknown) => void;
    onSuccess: (message: string) => void;
    can: (ability: string) => boolean;
}
function Checkout({
    active,
    onCartChange,
    api,
    boot,
    registerId,
    online,
    scope,
    scanRef,
    onCommit,
    onError,
    onSuccess,
    can,
    workspace,
}: CheckoutProps) {
    const qc = useQueryClient();
    const money = (minor: number) => formatMoney(minor, boot.currency);
    const [lines, setLines] = useState<CartLine[]>([]);
    const [query, setQuery] = useState("");
    const [debounced, setDebounced] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [after, setAfter] = useState(0);
    const [variantOptions, setVariantOptions] = useState<CatalogItem[] | null>(
        null,
    );
    const [scanning, setScanning] = useState(false);
    const [payOpen, setPayOpen] = useState(false);
    const [heldOpen, setHeldOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [customer, setCustomer] = useState<{
        name: string;
        email?: string;
        phone?: string;
    } | null>(null);
    const [customerOpen, setCustomerOpen] = useState(false);
    const [draft, setDraft] = useState({ id: uuid(), revision: 0 });
    const [intent, setIntent] = useState<Intent | null>(null);
    const [busy, setBusy] = useState(false);
    const draftRef = useRef(draft);
    const saveQueue = useRef(Promise.resolve());
    const updateDraft = (value: typeof draft) => {
        draftRef.current = value;
        setDraft(value);
    };
    const busyRef = useRef(false);
    const scanQueue = useRef(Promise.resolve());
    const recoveryChecked = useRef(false);
    const pointerKey = `rewa-pos:draft:${scope}`;
    const shifts = useQuery({
        queryKey: ["shifts", scope],
        queryFn: () => api.request<{ data: Shift[] }>("shifts", { web: true }),
        enabled: !!registerId && can("shift:write"),
        refetchInterval: 15000,
    });
    const openShift = shifts.data?.data.find(
        (shift) => shift.status === "open" && shift.is_own,
    );
    const drafts = useQuery({
        queryKey: ["drafts", scope],
        queryFn: () => api.request<{ data: Draft[] }>("drafts", { web: true }),
        enabled: !!registerId && can("sale:write"),
    });
    const catalog = useQuery({
        queryKey: ["catalog", scope, debounced, category, brand, after],
        queryFn: ({ signal }) =>
            api.request<{
                data: CatalogItem[];
                has_more: boolean;
                next_after: number;
            }>(
                `catalog/search?${queryString({ q: debounced, category_id: category, brand_id: brand, after, limit: 48 })}`,
                { signal },
            ),
        enabled: !!registerId,
    });
    const total = useMemo(() => {
        try {
            return { ...totals(lines, boot.max_discount_bps), error: "" };
        } catch (e) {
            return {
                subtotal_minor: 0,
                tax_minor: 0,
                discount_minor: 0,
                total_minor: 0,
                error: (e as Error).message,
            };
        }
    }, [lines, boot.max_discount_bps]);
    const reset = () => {
        setLines([]);
        setCustomer(null);
        setIntent(null);
        updateDraft({ id: uuid(), revision: 0 });
        sessionStorage.removeItem(pointerKey);
    };
    const save = (payload: import("./types").DraftPayload, label: string) => {
        const id = draftRef.current.id;
        const task = saveQueue.current
            .catch(() => {})
            .then(async () => {
                if (id !== draftRef.current.id)
                    throw new Error("The active cart changed before saving.");
                const saved = await persistDraft(
                    api,
                    draftRef.current,
                    label,
                    payload,
                );
                if (id === draftRef.current.id) {
                    updateDraft(saved);
                    sessionStorage.setItem(pointerKey, saved.id);
                }
                return saved;
            });
        saveQueue.current = task.then(() => {});
        return task;
    };
    useEffect(() => {
        onCartChange(lines.length > 0 || !!intent);
    }, [lines.length, intent, onCartChange]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounced(query);
            setAfter(0);
        }, 250);
        return () => clearTimeout(timer);
    }, [query]);
    useEffect(() => {
        scanRef.current?.focus();
    }, []);
    useEffect(() => {
        if (recoveryChecked.current || !drafts.data) return;
        recoveryChecked.current = true;
        const pointer = sessionStorage.getItem(pointerKey);
        const recovered = drafts.data.data.find((row) => row.id === pointer);
        if (recovered) {
            setLines(recovered.payload.lines);
            setCustomer(recovered.payload.customer || null);
            updateDraft({ id: recovered.id, revision: recovered.revision });
            setIntent(recovered.payload.intent || null);
            if (recovered.payload.intent) setPayOpen(true);
        }
    }, [drafts.data, pointerKey]);
    useEffect(() => {
        if (!lines.length || intent || !online || !recoveryChecked.current)
            return;
        const timer = setTimeout(() => {
            if (!busyRef.current)
                save({ lines, customer }, customer?.name || "Current cart")
                    .then(() =>
                        qc.invalidateQueries({ queryKey: ["drafts", scope] }),
                    )
                    .catch(onError);
        }, 800);
        return () => clearTimeout(timer);
    }, [lines, customer, intent, online]);
    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (!active) return;
            if (event.key === "F2") {
                event.preventDefault();
                scanRef.current?.focus();
            }
            if (event.key === "F8" && lines.length && !intent) {
                event.preventDefault();
                setPayOpen(true);
            }
            if (event.key === "F4" && !intent) {
                event.preventDefault();
                setHeldOpen(true);
            }
        };
        window.addEventListener("keydown", listener);
        return () => window.removeEventListener("keydown", listener);
    }, [lines.length, intent, active]);
    const addItem = useCallback(
        (item: CatalogItem) => {
            if (intent) return;
            setLines((current) => {
                const index = current.findIndex(
                    (line) => line.item.stock_id === item.stock_id,
                );
                const quantity = index < 0 ? 1 : current[index].quantity + 1;
                if (quantity > item.available_quantity || quantity > 10000) {
                    onError(
                        new Error(
                            "There is not enough available stock for this quantity.",
                        ),
                    );
                    return current;
                }
                if (index < 0)
                    return [...current, { item, quantity, discount_minor: 0 }];
                return current.map((line, i) =>
                    i === index ? { ...line, item, quantity } : line,
                );
            });
            setVariantOptions(null);
            scanRef.current?.focus();
        },
        [intent, onError],
    );
    const scan = (code: string) => {
        if (!code.trim() || intent) return;
        scanRef.current!.value = "";
        // Queue rapid/repeated keyboard scans rather than cancelling the previous one.
        scanQueue.current = scanQueue.current.then(async () => {
            setScanning(true);
            try {
                const pages = await Promise.all(
                    ["barcode", "sku"].map((field) =>
                        api.request<{ data: CatalogItem[]; has_more: boolean }>(
                            `catalog/search?${queryString({ [field]: code.trim(), limit: 200 })}`,
                        ),
                    ),
                );
                const exact = Array.from(
                    new Map(
                        pages
                            .flatMap((page) => page.data)
                            .map((item) => [item.stock_id, item]),
                    ).values(),
                );
                if (!exact.length)
                    throw new Error(
                        `No eligible product matches “${code}”. Search by name or check Products.`,
                    );
                if (pages.some((page) => page.has_more))
                    throw new Error(
                        "This code matches more than 200 variants. Search by product name and choose an exact variant.",
                    );
                if (exact.length === 1) addItem(exact[0]);
                else setVariantOptions(exact);
            } catch (e) {
                onError(e);
            } finally {
                setScanning(false);
            }
        });
    };
    const hold = async () => {
        if (!lines.length || intent || busyRef.current) return;
        busyRef.current = true;
        setBusy(true);
        try {
            await save(
                { lines, customer },
                customer?.name ||
                    `Held cart · ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
            );
            reset();
            qc.invalidateQueries({ queryKey: ["drafts", scope] });
            onSuccess("Cart held for this cashier and register.");
        } catch (e) {
            onError(e);
        } finally {
            busyRef.current = false;
            setBusy(false);
        }
    };
    const resume = async (row: Draft) => {
        if (lines.length || intent) {
            onError(
                new Error(
                    "Hold or clear the current cart before resuming another.",
                ),
            );
            return;
        }
        try {
            let restored = row.payload.lines;
            if (!row.payload.intent)
                restored = await Promise.all(
                    restored.map(async (line) => {
                        const page = await api.request<{ data: CatalogItem[] }>(
                            `catalog/search?stock_id=${line.item.stock_id}`,
                        );
                        if (!page.data.length)
                            throw new Error(
                                `${line.item.name} is no longer available for POS.`,
                            );
                        return { ...line, item: page.data[0] };
                    }),
                );
            setLines(restored);
            setCustomer(row.payload.customer || null);
            updateDraft({ id: row.id, revision: row.revision });
            setIntent(row.payload.intent || null);
            sessionStorage.setItem(pointerKey, row.id);
            setHeldOpen(false);
            if (row.payload.intent) setPayOpen(true);
        } catch (e) {
            onError(e);
        }
    };
    const refresh = async () => {
        try {
            const current = await Promise.all(
                lines.map(async (line) => {
                    const response = await api.request<{ data: CatalogItem[] }>(
                        `catalog/search?stock_id=${line.item.stock_id}`,
                    );
                    if (!response.data[0])
                        throw new Error(`${line.item.name} is unavailable.`);
                    return { ...line, item: response.data[0] };
                }),
            );
            setLines(current);
            onSuccess("Cart prices refreshed from your store.");
        } catch (e) {
            onError(e);
        }
    };
    const checkout = async (prepared: Intent) => {
        if (busyRef.current) return;
        busyRef.current = true;
        setBusy(true);
        try {
            onlineSaleSchema.parse(prepared.payload);
            const saved = await save(
                { lines, customer, intent: prepared },
                "Checkout awaiting response",
            );
            setIntent(prepared);
            const result = await submitIntent(api, prepared);
            // Commit is final even if receipt retrieval or draft cleanup subsequently fails.
            const cleanupDraft = saved;
            reset();
            setPayOpen(false);
            api.mutate(
                `drafts/${cleanupDraft.id}`,
                { revision: cleanupDraft.revision },
                "DELETE",
                true,
            ).catch(() => {});
            await onCommit(result);
        } catch (e) {
            onError(e);
            if (isDefinitiveSaleRejection(e)) {
                // A rejection inside the idempotent transaction is safe to
                // edit. A permission/session failure keeps recovery frozen.
                setIntent(null);
            }
        } finally {
            busyRef.current = false;
            setBusy(false);
        }
    };
    const quantity = (index: number, amount: number) => {
        if (intent) return;
        const line = lines[index];
        if (amount < 1 || amount > line.item.available_quantity) return;
        try {
            calculateLine({ ...line, quantity: amount }, boot.max_discount_bps);
            setLines(
                lines.map((row, i) =>
                    i === index ? { ...row, quantity: amount } : row,
                ),
            );
        } catch (e) {
            onError(e);
        }
    };
    return (
        <div className="checkout-layout">
            <section className="catalog-panel">
                <div className="catalog-tools">
                    <div className="scan-box">
                        <ScanLine size={22} />
                        <input
                            ref={scanRef}
                            aria-label="Scan barcode or SKU"
                            placeholder="Scan a barcode or SKU"
                            autoComplete="off"
                            disabled={!!intent || !online}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === "Tab") {
                                    if (e.currentTarget.value) {
                                        e.preventDefault();
                                        scan(e.currentTarget.value);
                                    }
                                }
                            }}
                        />
                        <kbd>F2</kbd>
                    </div>
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            aria-label="Search products"
                            placeholder="Search products by name…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <div className="filters">
                        <select
                            aria-label="Category"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setAfter(0);
                            }}
                        >
                            <option value="">All categories</option>
                            {workspace.categories.map((row) => (
                                <option key={row.id} value={row.id}>
                                    {row.name}
                                </option>
                            ))}
                        </select>
                        <select
                            aria-label="Brand"
                            value={brand}
                            onChange={(e) => {
                                setBrand(e.target.value);
                                setAfter(0);
                            }}
                        >
                            <option value="">All brands</option>
                            {workspace.brands.map((row) => (
                                <option key={row.id} value={row.id}>
                                    {row.name}
                                </option>
                            ))}
                        </select>
                        <span>
                            {scanning
                                ? "Looking up scan…"
                                : `${catalog.data?.data.length || 0} variants`}
                        </span>
                    </div>
                </div>
                <div className="catalog-grid-wrap">
                    {catalog.isPending ? (
                        <Loading />
                    ) : catalog.error ? (
                        <Empty
                            title="Catalog unavailable"
                            text={catalog.error.message}
                        />
                    ) : !catalog.data?.data.length ? (
                        <Empty
                            title="No products found"
                            text="Try a different search, or enable your products for POS."
                            icon={<Package size={35} />}
                        />
                    ) : (
                        <div className="product-grid">
                            {catalog.data.data.map((item, index) => (
                                <button
                                    className="product-card"
                                    key={item.stock_id}
                                    onClick={() => addItem(item)}
                                    disabled={
                                        item.available_quantity < 1 || !!intent
                                    }
                                >
                                    <div
                                        className={`product-art art-${index % 5}`}
                                    >
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt=""
                                                loading="lazy"
                                            />
                                        ) : (
                                            <Package
                                                size={35}
                                                strokeWidth={1.25}
                                            />
                                        )}
                                        <span>{item.unit || "piece"}</span>
                                        {item.promotion_minor > 0 && (
                                            <Badge tone="amber">Offer</Badge>
                                        )}
                                    </div>
                                    <div className="product-copy">
                                        <strong>{item.name}</strong>
                                        <small>
                                            {item.variant ||
                                                item.sku ||
                                                `Variant #${item.stock_id}`}
                                        </small>
                                        <div>
                                            <b>
                                                {money(item.unit_price_minor)}
                                            </b>
                                            <span
                                                className={
                                                    item.available_quantity < 1
                                                        ? "stock-out"
                                                        : ""
                                                }
                                            >
                                                {item.available_quantity > 0
                                                    ? `${item.available_quantity} left`
                                                    : "Out of stock"}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="product-add">
                                        <Plus size={14} />
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                    {catalog.data?.has_more && (
                        <button
                            className="load-more"
                            onClick={() => setAfter(catalog.data!.next_after)}
                        >
                            Next products <ChevronRight size={16} />
                        </button>
                    )}
                    {after > 0 && (
                        <button
                            className="load-more"
                            onClick={() => setAfter(0)}
                        >
                            Back to first page
                        </button>
                    )}
                </div>
                <footer className="catalog-footer">
                    <Keyboard size={15} />
                    <span>
                        <kbd>F2</kbd> Scan
                    </span>
                    <span>
                        <kbd>F4</kbd> Held carts
                    </span>
                    <span>
                        <kbd>F8</kbd> Payment
                    </span>
                    <span className="pool-note">One shared stock pool</span>
                </footer>
            </section>
            <section className="cart-panel">
                <header className="cart-heading">
                    <div>
                        <h2>
                            Current sale{" "}
                            <Badge>
                                {lines.reduce((sum, l) => sum + l.quantity, 0)}
                            </Badge>
                        </h2>
                        <span>
                            {openShift ? (
                                <>
                                    <i className="live-dot" /> Shift #
                                    {openShift.id} open
                                </>
                            ) : (
                                "Open a shift in Register to sell"
                            )}
                        </span>
                    </div>
                    <button
                        className="icon-button"
                        title="Clear cart"
                        aria-label="Clear cart"
                        disabled={!!intent || !lines.length}
                        onClick={() => {
                            if (confirm("Clear this unsaved cart?")) reset();
                        }}
                    >
                        <Trash2 size={18} />
                    </button>
                </header>
                <button
                    className="customer-button"
                    onClick={() => setCustomerOpen(true)}
                    disabled={!!intent}
                >
                    <span className="avatar">
                        {customer?.name.charAt(0) || "W"}
                    </span>
                    <span>
                        <strong>{customer?.name || "Walk-in customer"}</strong>
                        <small>
                            {customer
                                ? "Receipt contact saved"
                                : "Add receipt contact · optional"}
                        </small>
                    </span>
                    <Plus size={17} />
                </button>
                <div className="cart-lines">
                    {!lines.length ? (
                        <Empty
                            title="Ready for the first item"
                            text="Scan a barcode or tap a product to begin."
                            icon={<ShoppingBag size={36} />}
                        />
                    ) : (
                        lines.map((line, index) => (
                            <div className="cart-line" key={line.item.stock_id}>
                                <div className="line-info">
                                    <button
                                        className="line-name"
                                        onClick={() => setEditIndex(index)}
                                        disabled={!!intent}
                                    >
                                        <strong>{line.item.name}</strong>
                                        <small>
                                            {line.item.variant || line.item.sku}
                                        </small>
                                    </button>
                                    <button
                                        className="icon-button"
                                        aria-label={`Remove ${line.item.name}`}
                                        disabled={!!intent}
                                        onClick={() =>
                                            setLines(
                                                lines.filter(
                                                    (_, i) => i !== index,
                                                ),
                                            )
                                        }
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                                <div className="line-controls">
                                    <div className="quantity-control">
                                        <button
                                            aria-label={`Decrease ${line.item.name}`}
                                            disabled={
                                                !!intent || line.quantity === 1
                                            }
                                            onClick={() =>
                                                quantity(
                                                    index,
                                                    line.quantity - 1,
                                                )
                                            }
                                        >
                                            <Minus size={13} />
                                        </button>
                                        <input
                                            aria-label={`Quantity ${line.item.name}`}
                                            inputMode="numeric"
                                            value={line.quantity}
                                            disabled={!!intent}
                                            onChange={(e) =>
                                                quantity(
                                                    index,
                                                    Number(e.target.value),
                                                )
                                            }
                                        />
                                        <button
                                            aria-label={`Increase ${line.item.name}`}
                                            disabled={!!intent}
                                            onClick={() =>
                                                quantity(
                                                    index,
                                                    line.quantity + 1,
                                                )
                                            }
                                        >
                                            <Plus size={13} />
                                        </button>
                                    </div>
                                    <small>
                                        {money(
                                            line.override_minor ??
                                                line.item.unit_price_minor,
                                        )}{" "}
                                        each
                                    </small>
                                    <b>
                                        {money(calculateLine(line).total_minor)}
                                    </b>
                                </div>
                                {line.discount_minor > 0 && (
                                    <small className="line-discount">
                                        Discount -{money(line.discount_minor)}
                                    </small>
                                )}
                            </div>
                        ))
                    )}
                </div>
                <div className="cart-total">
                    <div className="total-row">
                        <span>Subtotal</span>
                        <span>{money(total.subtotal_minor)}</span>
                    </div>
                    <div className="total-row">
                        <button
                            className="text-button"
                            disabled={
                                !can("discount:write") ||
                                !!intent ||
                                !lines.length
                            }
                            onClick={() => {
                                const input = prompt(
                                    "Cart discount amount (replaces line discounts)",
                                );
                                if (input != null)
                                    try {
                                        setLines(
                                            distributeDiscount(
                                                lines,
                                                parseMinor(input),
                                                boot.max_discount_bps,
                                            ),
                                        );
                                    } catch (e) {
                                        onError(e);
                                    }
                            }}
                        >
                            Discount{" "}
                            {can("discount:write") && <Plus size={12} />}
                        </button>
                        <span>-{money(total.discount_minor)}</span>
                    </div>
                    <div className="total-row">
                        <span>
                            Tax{" "}
                            {boot.settings.tax_inclusive ? "(included)" : ""}
                        </span>
                        <span>{money(total.tax_minor)}</span>
                    </div>
                    <div className="total-due">
                        <span>Total due</span>
                        <strong>{money(total.total_minor)}</strong>
                    </div>
                    {total.error && <p className="error-text">{total.error}</p>}
                    {intent && (
                        <p className="error-text">
                            Checkout awaiting acknowledgment. Retry its saved
                            identity before starting another sale.
                        </p>
                    )}
                    <div className="cart-actions">
                        <button
                            className="secondary"
                            disabled={
                                busy || !!intent || !lines.length || !online
                            }
                            onClick={hold}
                        >
                            <Pause size={15} /> Hold
                        </button>
                        <button
                            className="secondary"
                            onClick={() => setHeldOpen(true)}
                            disabled={!!intent}
                        >
                            <Play size={15} /> Held{" "}
                            <Badge>{drafts.data?.data.length || 0}</Badge>
                        </button>
                    </div>
                    <button
                        className="pay-button"
                        disabled={
                            busy ||
                            !online ||
                            (!intent &&
                                (!openShift ||
                                    !lines.length ||
                                    !!total.error ||
                                    !can("sale:write")))
                        }
                        onClick={() => setPayOpen(true)}
                    >
                        <CreditCard size={19} />
                        <span>
                            {intent ? "Resolve checkout" : "Take payment"}
                        </span>
                        <kbd>F8</kbd>
                    </button>
                </div>
            </section>
            {variantOptions && (
                <Modal
                    title="Choose the exact variant"
                    onClose={() => setVariantOptions(null)}
                >
                    <p className="hint">
                        This code matches more than one stock variant.
                    </p>
                    <div className="option-list">
                        {variantOptions.map((item) => (
                            <button
                                key={item.stock_id}
                                onClick={() => addItem(item)}
                                disabled={item.available_quantity < 1}
                            >
                                <div>
                                    <strong>{item.name}</strong>
                                    <small>
                                        {item.variant || item.sku} · #
                                        {item.stock_id}
                                    </small>
                                </div>
                                <b>{money(item.unit_price_minor)}</b>
                                <Badge>{item.available_quantity} left</Badge>
                            </button>
                        ))}
                    </div>
                </Modal>
            )}
            {heldOpen && (
                <Modal title="Held carts" onClose={() => setHeldOpen(false)}>
                    {!drafts.data?.data.length ? (
                        <Empty
                            title="No held carts"
                            text="Hold a cart to come back to it later."
                        />
                    ) : (
                        <div className="option-list">
                            {drafts.data.data.map((row) => (
                                <button
                                    key={row.id}
                                    onClick={() => resume(row)}
                                >
                                    <div>
                                        <strong>{row.label}</strong>
                                        <small>
                                            {row.payload.lines.length} lines ·{" "}
                                            {new Date(
                                                row.updated_at,
                                            ).toLocaleString()}
                                        </small>
                                    </div>
                                    {row.payload.intent && (
                                        <Badge tone="amber">
                                            Awaiting response
                                        </Badge>
                                    )}
                                    <Play size={16} />
                                </button>
                            ))}
                        </div>
                    )}
                </Modal>
            )}
            {customerOpen && (
                <ContactModal
                    value={customer}
                    onClose={() => setCustomerOpen(false)}
                    onSave={(value) => {
                        setCustomer(value);
                        setCustomerOpen(false);
                    }}
                />
            )}
            {editIndex !== null && (
                <LineModal
                    line={lines[editIndex]}
                    can={can}
                    limit={boot.max_discount_bps}
                    onClose={() => setEditIndex(null)}
                    onSave={(line) => {
                        setLines(
                            lines.map((row, i) =>
                                i === editIndex ? line : row,
                            ),
                        );
                        setEditIndex(null);
                    }}
                />
            )}
            {payOpen && (
                <PaymentModal
                    total={total.total_minor}
                    currency={boot.currency}
                    intent={intent}
                    busy={busy}
                    online={online}
                    onClose={() => setPayOpen(false)}
                    onPay={(tenders) => {
                        if (intent) {
                            checkout(intent);
                            return;
                        }
                        if (!openShift) {
                            onError(
                                new Error(
                                    "Open your register shift before checkout.",
                                ),
                            );
                            return;
                        }
                        checkout({
                            key: uuid(),
                            payload: {
                                client_sale_id: uuid(),
                                register_id: registerId,
                                shift_id: openShift.id,
                                currency: boot.currency,
                                grand_total_minor: total.total_minor,
                                lines: saleLines(lines, boot.max_discount_bps),
                                tenders,
                                ...(customer ? { customer } : {}),
                            },
                        });
                    }}
                    onRefresh={refresh}
                />
            )}
        </div>
    );
}

function ContactModal({
    value,
    onClose,
    onSave,
}: {
    value: { name: string; email?: string; phone?: string } | null;
    onClose: () => void;
    onSave: (
        value: { name: string; email?: string; phone?: string } | null,
    ) => void;
}) {
    const [name, setName] = useState(value?.name || "");
    const [email, setEmail] = useState(value?.email || "");
    const [phone, setPhone] = useState(value?.phone || "");
    return (
        <Modal title="Receipt contact" onClose={onClose}>
            <p className="hint">
                Optional contact details. Walk-in sales need no address or
                customer account.
            </p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSave({
                        name,
                        ...(email ? { email } : {}),
                        ...(phone ? { phone } : {}),
                    });
                }}
            >
                <Field label="Name">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        maxLength={150}
                    />
                </Field>
                <Field label="Email (optional)">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={200}
                    />
                </Field>
                <Field label="Phone (optional)">
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={30}
                    />
                </Field>
                <div className="modal-actions">
                    <button
                        type="button"
                        className="secondary"
                        onClick={() => onSave(null)}
                    >
                        Use walk-in
                    </button>
                    <button className="primary">Save contact</button>
                </div>
            </form>
        </Modal>
    );
}
function LineModal({
    line,
    can,
    limit,
    onClose,
    onSave,
}: {
    line: CartLine;
    can: (permission: string) => boolean;
    limit: number;
    onClose: () => void;
    onSave: (line: CartLine) => void;
}) {
    const [discount, setDiscount] = useState(decimal(line.discount_minor));
    const [price, setPrice] = useState(
        decimal(line.override_minor ?? line.item.unit_price_minor),
    );
    const [reason, setReason] = useState(line.override_reason || "");
    const [error, setError] = useState("");
    return (
        <Modal title={line.item.name} onClose={onClose}>
            <p className="hint">
                {line.item.variant || line.item.sku} · Quantity {line.quantity}{" "}
                · Discount limit {limit / 100}%
            </p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    try {
                        const override = parseMinor(price);
                        const updated = {
                            ...line,
                            discount_minor: parseMinor(discount),
                            ...(override !== line.item.unit_price_minor
                                ? {
                                      override_minor: override,
                                      override_reason: reason,
                                  }
                                : {
                                      override_minor: undefined,
                                      override_reason: undefined,
                                  }),
                        };
                        if (
                            updated.override_minor !== undefined &&
                            reason.length < 3
                        )
                            throw new Error("Explain the price override.");
                        calculateLine(updated, limit);
                        onSave(updated);
                    } catch (e) {
                        setError((e as Error).message);
                    }
                }}
            >
                <Field label="Line discount amount">
                    <input
                        inputMode="decimal"
                        disabled={!can("discount:write")}
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                </Field>
                <Field label="Unit price">
                    <input
                        inputMode="decimal"
                        disabled={!can("price:override")}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Field>
                {can("price:override") && (
                    <Field label="Price override reason">
                        <input
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            maxLength={500}
                        />
                    </Field>
                )}
                {error && <p className="error-text">{error}</p>}
                <div className="modal-actions">
                    <button
                        type="button"
                        className="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button className="primary">Update item</button>
                </div>
            </form>
        </Modal>
    );
}
function PaymentModal({
    total,
    currency,
    intent,
    busy,
    online,
    onClose,
    onPay,
    onRefresh,
}: {
    total: number;
    currency: string;
    intent: Intent | null;
    busy: boolean;
    online: boolean;
    onClose: () => void;
    onPay: (
        tenders: import("../../../../contracts/pos-v1").TenderInput[],
    ) => void;
    onRefresh: () => void;
}) {
    const [rows, setRows] = useState<
        {
            method: TenderMethod;
            amount: string;
            received: string;
            reference: string;
        }[]
    >([
        {
            method: "cash",
            amount: decimal(total),
            received: decimal(total),
            reference: "",
        },
    ]);
    const [error, setError] = useState("");
    const update = (index: number, patch: Partial<(typeof rows)[number]>) =>
        setRows(
            rows.map((row, i) => (i === index ? { ...row, ...patch } : row)),
        );
    let applied = 0,
        change = 0;
    try {
        for (const row of rows) {
            applied += parseMinor(row.amount);
            if (row.method === "cash")
                change += Math.max(
                    0,
                    parseMinor(row.received) - parseMinor(row.amount),
                );
        }
    } catch {}
    const pay = () => {
        try {
            if (intent) {
                onPay(intent.payload.tenders);
                return;
            }
            const tenders = rows.map((row) => {
                const amount = parseMinor(row.amount);
                if (amount <= 0)
                    throw new Error("Tender amounts must be positive.");
                if (row.method === "cash") {
                    const received = parseMinor(row.received);
                    if (received < amount)
                        throw new Error(
                            "Cash received is below the cash tender.",
                        );
                    return {
                        method: row.method,
                        currency,
                        amount_minor: amount,
                        received_minor: received,
                        change_minor: received - amount,
                    };
                }
                if (row.reference.trim().length < 3)
                    throw new Error(
                        "Enter the external terminal or transfer reference.",
                    );
                return {
                    method: row.method,
                    currency,
                    amount_minor: amount,
                    reference: row.reference.trim(),
                };
            });
            if (tenders.reduce((sum, t) => sum + t.amount_minor, 0) !== total)
                throw new Error(
                    "Split tender amounts must equal the total due.",
                );
            setError("");
            onPay(tenders);
        } catch (e) {
            setError((e as Error).message);
        }
    };
    return (
        <Modal
            title={intent ? "Resolve saved checkout" : "Take payment"}
            onClose={onClose}
        >
            <div className="payment-total">
                <span>Total due</span>
                <strong>
                    {formatMoney(
                        intent?.payload.grand_total_minor ?? total,
                        currency,
                    )}
                </strong>
            </div>
            {intent ? (
                <div className="pending-intent">
                    <Badge tone="amber">Identity saved</Badge>
                    <p>
                        The previous response may have been lost. Retry this
                        exact sale to retrieve its recorded result or complete
                        it once.
                    </p>
                    <code>{intent.payload.client_sale_id}</code>
                </div>
            ) : (
                <>
                    <div className="tender-list">
                        {rows.map((row, index) => (
                            <div className="tender-row" key={index}>
                                <div className="tender-heading">
                                    <strong>Tender {index + 1}</strong>
                                    {rows.length > 1 && (
                                        <button
                                            className="icon-button"
                                            aria-label="Remove tender"
                                            onClick={() =>
                                                setRows(
                                                    rows.filter(
                                                        (_, i) => i !== index,
                                                    ),
                                                )
                                            }
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                                <Field label="Method">
                                    <select
                                        value={row.method}
                                        onChange={(e) =>
                                            update(index, {
                                                method: e.target
                                                    .value as TenderMethod,
                                            })
                                        }
                                    >
                                        <option value="cash">Cash</option>
                                        <option value="external_terminal">
                                            External card terminal
                                        </option>
                                        <option value="bank_transfer">
                                            Bank transfer
                                        </option>
                                    </select>
                                </Field>
                                <div className="form-grid">
                                    <Field label="Amount applied">
                                        <input
                                            aria-label={`Tender ${index + 1} amount`}
                                            inputMode="decimal"
                                            value={row.amount}
                                            onChange={(e) =>
                                                update(index, {
                                                    amount: e.target.value,
                                                })
                                            }
                                        />
                                    </Field>
                                    {row.method === "cash" ? (
                                        <Field label="Cash received">
                                            <input
                                                aria-label={`Tender ${index + 1} cash received`}
                                                inputMode="decimal"
                                                value={row.received}
                                                onChange={(e) =>
                                                    update(index, {
                                                        received:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </Field>
                                    ) : (
                                        <Field label="Payment reference">
                                            <input
                                                value={row.reference}
                                                onChange={(e) =>
                                                    update(index, {
                                                        reference:
                                                            e.target.value,
                                                    })
                                                }
                                                maxLength={100}
                                            />
                                        </Field>
                                    )}
                                </div>
                                {row.method !== "cash" && (
                                    <p className="hint amber-text">
                                        Recorded as pending. A supervisor must
                                        verify settlement evidence in Sales.
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        className="text-button"
                        disabled={rows.length >= 10}
                        onClick={() =>
                            setRows([
                                ...rows,
                                {
                                    method: "cash",
                                    amount: decimal(
                                        Math.max(0, total - applied),
                                    ),
                                    received: decimal(
                                        Math.max(0, total - applied),
                                    ),
                                    reference: "",
                                },
                            ])
                        }
                    >
                        <Plus size={15} /> Add split tender
                    </button>
                    <div className="payment-reconcile">
                        <span>
                            Remaining{" "}
                            <b>{formatMoney(total - applied, currency)}</b>
                        </span>
                        <span>
                            Cash change <b>{formatMoney(change, currency)}</b>
                        </span>
                    </div>
                </>
            )}
            {error && <p className="error-text">{error}</p>}
            <div className="modal-actions">
                {!intent && (
                    <button
                        className="secondary"
                        disabled={busy}
                        onClick={() => {
                            onRefresh();
                            onClose();
                        }}
                    >
                        Refresh prices
                    </button>
                )}
                <button
                    className="primary"
                    disabled={busy || !online}
                    onClick={pay}
                >
                    {busy
                        ? "Recording sale…"
                        : intent
                          ? "Retry saved checkout"
                          : "Record sale"}
                </button>
            </div>
        </Modal>
    );
}
createRoot(document.getElementById("rewa-pos-root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Application />
        </QueryClientProvider>
    </StrictMode>,
);
