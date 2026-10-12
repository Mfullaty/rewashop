import type { Configuration } from "./types";
export class ApiError extends Error {
    constructor(
        message: string,
        public code: string,
        public status: number,
        public uncertain = false,
    ) {
        super(message);
    }
}
// These errors arise inside the idempotent sale transaction after any prior
// result has been looked up. Authentication/configuration/validation failures
// can happen before that lookup and cannot prove an earlier sale was rejected.
export function isDefinitiveSaleRejection(error: unknown): boolean {
    return (
        error instanceof ApiError &&
        !error.uncertain &&
        [
            "STOCK_NOT_FOUND",
            "INSUFFICIENT_STOCK",
            "PRICE_MISMATCH",
            "DISCOUNT_LIMIT",
            "INVALID_DISCOUNT",
            "PRICE_OVERRIDE_DENIED",
            "CURRENCY_MISMATCH",
            "INVALID_EVENT_TIME",
            "SHIFT_UNAVAILABLE",
            "INVALID_CHANGE",
            "PAYMENT_REFERENCE_REQUIRED",
            "TENDER_TOTAL_MISMATCH",
            "INVALID_TENDER",
            "QUANTITY_LIMIT",
        ].includes(error.code)
    );
}
export const uuid = (): string => crypto.randomUUID();
export class Api {
    public scope = "";
    constructor(
        public config: Configuration,
        public registerId: number | null = config.registerId,
    ) {}
    async request<T>(
        path: string,
        options: {
            web?: boolean;
            method?: string;
            body?: unknown;
            key?: string;
            signal?: AbortSignal;
        } = {},
    ): Promise<T> {
        const url = new URL(
            (options.web ? this.config.webUrl : this.config.coreUrl) +
                "/" +
                path,
            location.origin,
        );
        if (this.registerId)
            url.searchParams.set("register_id", String(this.registerId));
        let response: Response;
        try {
            response = await fetch(url, {
                method: options.method || "GET",
                credentials: "same-origin",
                cache: "no-store",
                signal: options.signal || AbortSignal.timeout(20000),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": this.config.csrf,
                    ...(options.key ? { "Idempotency-Key": options.key } : {}),
                },
                body:
                    options.body === undefined
                        ? undefined
                        : JSON.stringify(options.body),
            });
        } catch (error) {
            if (options.signal?.aborted) throw error;
            throw new ApiError(
                "Connection interrupted. Your checkout identity is saved. Reconnect and retry.",
                "NETWORK",
                0,
                true,
            );
        }
        const data = await response.json().catch(() => null);
        if (!response.ok) {
            const fields = data?.error?.fields || data?.errors;
            const detail = fields ? Object.values(fields).flat().join(" ") : "";
            throw new ApiError(
                detail ||
                    data?.error?.message ||
                    data?.message ||
                    (response.status === 419
                        ? "Your session expired. Sign in again before retrying."
                        : "The request could not be completed."),
                data?.error?.code || "HTTP_ERROR",
                response.status,
                response.status >= 500 || response.status === 408,
            );
        }
        if (data === null)
            throw new ApiError(
                "The server response was interrupted. Retry with the saved checkout identity.",
                "BAD_RESPONSE",
                response.status,
                true,
            );
        return data as T;
    }
    async mutate<T>(
        path: string,
        body: unknown,
        method = "POST",
        web = false,
        key = uuid(),
    ) {
        if (web && path.startsWith("drafts/"))
            return this.request<T>(path, { body, method, web, key });
        // Keep only a digest and identity in browser storage. Re-entering the same
        // operation after a reload reuses its key; a changed unresolved action is
        // blocked until the recorded result has been reviewed.
        const record =
            body && typeof body === "object"
                ? (body as Record<string, unknown>)
                : null;
        const fingerprint = record ? { ...record } : body;
        if (fingerprint && typeof fingerprint === "object")
            for (const field of ["client_shift_id", "client_refund_id"])
                if (field in fingerprint)
                    (fingerprint as Record<string, unknown>)[field] =
                        "operation-identity";
        const digest = Array.from(
            new Uint8Array(
                await crypto.subtle.digest(
                    "SHA-256",
                    new TextEncoder().encode(JSON.stringify(fingerprint)),
                ),
            ),
        )
            .map((v) => v.toString(16).padStart(2, "0"))
            .join("");
        const journal = `rewa-pos:mutation:${this.scope}:${this.registerId}:${method}:${web ? "web" : "core"}:${path}`;
        const previous = sessionStorage.getItem(journal);
        if (previous) {
            const saved = JSON.parse(previous) as {
                key: string;
                digest: string;
            };
            if (saved.digest !== digest)
                throw new ApiError(
                    "This action is awaiting acknowledgment. Retry its original values before submitting a different action.",
                    "ACTION_UNRESOLVED",
                    409,
                    true,
                );
            key = saved.key;
            if (record)
                for (const field of ["client_shift_id", "client_refund_id"])
                    if (field in record) record[field] = key;
        }
        sessionStorage.setItem(journal, JSON.stringify({ key, digest }));
        try {
            const result = await this.request<T>(path, {
                body,
                method,
                web,
                key,
            });
            sessionStorage.removeItem(journal);
            return result;
        } catch (error) {
            if (
                error instanceof ApiError &&
                !error.uncertain &&
                error.status !== 401 &&
                error.status !== 419 &&
                error.status !== 403 &&
                error.status !== 404 &&
                error.code !== "CURRENCY_CHANGED" &&
                (path !== "sales" || isDefinitiveSaleRejection(error))
            )
                sessionStorage.removeItem(journal);
            throw error;
        }
    }
}
export function queryString(params: Record<string, unknown>) {
    return new URLSearchParams(
        Object.entries(params)
            .filter(([, v]) => v !== "" && v != null)
            .map(([k, v]) => [k, String(v)]),
    ).toString();
}
