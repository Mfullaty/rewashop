import { useEffect, useRef, type ReactNode } from "react";
import { X, LoaderCircle } from "lucide-react";
export function Modal({
    title,
    children,
    onClose,
    wide = false,
}: {
    title: string;
    children: ReactNode;
    onClose: () => void;
    wide?: boolean;
}) {
    const ref = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        ref.current?.showModal();
        const dialog = ref.current;
        return () => dialog?.close();
    }, []);
    return (
        <dialog
            className={`rp-modal ${wide ? "rp-modal-wide" : ""}`}
            ref={ref}
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
        >
            <header>
                <h2>{title}</h2>
                <button
                    className="icon-button"
                    aria-label="Close dialog"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>
            </header>
            {children}
        </dialog>
    );
}
export function Empty({
    title,
    text,
    icon,
}: {
    title: string;
    text: string;
    icon?: ReactNode;
}) {
    return (
        <div className="empty-state">
            {icon}
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );
}
export function Loading() {
    return (
        <div className="loading-state" role="status">
            <LoaderCircle className="spin" size={24} /> Loading your workspace
        </div>
    );
}
export function Badge({
    children,
    tone = "",
}: {
    children: ReactNode;
    tone?: string;
}) {
    return <span className={`badge ${tone}`}>{children}</span>;
}
export function Field({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <label className="field">
            <span>{label}</span>
            {children}
        </label>
    );
}
