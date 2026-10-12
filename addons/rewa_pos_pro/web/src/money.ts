import type { CartLine, OnlineSaleLine } from "./types";
const max = 1_000_000_000_000n;
function bound(value: bigint) {
    if (value < 0 || value > max)
        throw new Error("The amount is outside the supported range.");
    return Number(value);
}
const percent = (amount: bigint, bps: bigint) =>
    (amount * bps + 5000n) / 10000n;
export function parseMinor(input: string): number {
    if (!/^\d+(?:\.\d{0,2})?$/.test(input.trim()))
        throw new Error(
            "Enter a positive amount with up to two decimal places.",
        );
    const [whole, fraction = ""] = input.trim().split(".");
    return bound(BigInt(whole) * 100n + BigInt(fraction.padEnd(2, "0")));
}
export const decimal = (minor: number) =>
    `${Math.trunc(minor / 100)}.${String(Math.abs(minor % 100)).padStart(2, "0")}`;
export const formatMoney = (minor: number, currency = "NGN") =>
    new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
    }).format(minor / 100);
export function calculateLine(line: CartLine, discountBps = 10000) {
    const item = line.item;
    const unit = line.override_minor ?? item.unit_price_minor;
    if (
        !Number.isSafeInteger(line.quantity) ||
        line.quantity < 1 ||
        line.quantity > 10000
    )
        throw new Error("Use a whole quantity between 1 and 10,000.");
    const subtotal = BigInt(unit) * BigInt(line.quantity);
    const discount = BigInt(line.discount_minor);
    if (discount < 0n || discount > percent(subtotal, BigInt(discountBps)))
        throw new Error("This discount exceeds your cashier limit.");
    const net = subtotal - discount;
    const bps = BigInt(
        item.tax_rules
            .filter((t) => t.type === "percent")
            .reduce((sum, t) => sum + t.value, 0),
    );
    const fixed =
        BigInt(
            item.tax_rules
                .filter((t) => t.type === "amount")
                .reduce((sum, t) => sum + t.value, 0),
        ) * BigInt(line.quantity);
    if (bps > 10000n || fixed < 0n || (item.tax_inclusive && fixed > net))
        throw new Error("The product tax policy is invalid.");
    const tax = item.tax_inclusive
        ? net - ((net - fixed) * 10000n + (10000n + bps) / 2n) / (10000n + bps)
        : percent(net, bps) + fixed;
    const totalBeforeGst = item.tax_inclusive ? net : net + tax;
    const gst = percent(totalBeforeGst, BigInt(item.gst_bps));
    return {
        subtotal_minor: bound(subtotal),
        discount_minor: bound(discount),
        tax_minor: bound(tax + gst),
        total_minor: bound(totalBeforeGst + gst),
        unit_price_minor: unit,
    };
}
export function totals(lines: CartLine[], limit = 10000) {
    const calculated = lines.map((line) => calculateLine(line, limit));
    const sum = (
        key: "subtotal_minor" | "discount_minor" | "tax_minor" | "total_minor",
    ) => bound(calculated.reduce((a, l) => a + BigInt(l[key]), 0n));
    return {
        subtotal_minor: sum("subtotal_minor"),
        discount_minor: sum("discount_minor"),
        tax_minor: sum("tax_minor"),
        total_minor: sum("total_minor"),
    };
}
export function saleLines(lines: CartLine[], limit: number): OnlineSaleLine[] {
    return lines.map((line) => {
        const price = calculateLine(line, limit);
        return {
            stock_id: line.item.stock_id,
            quantity: line.quantity,
            discount_minor: line.discount_minor,
            ...(line.override_minor === undefined
                ? {}
                : {
                      override_minor: line.override_minor,
                      override_reason: line.override_reason,
                  }),
            unit_price_minor: price.unit_price_minor,
            tax_minor: price.tax_minor,
            total_minor: price.total_minor,
        };
    });
}
export function distributeDiscount(
    lines: CartLine[],
    amount: number,
    limit: number,
): CartLine[] {
    const subtotals = lines.map(
        (line) =>
            BigInt(line.override_minor ?? line.item.unit_price_minor) *
            BigInt(line.quantity),
    );
    const sum = subtotals.reduce((a, b) => a + b, 0n);
    if (sum === 0n || BigInt(amount) > percent(sum, BigInt(limit)))
        throw new Error("This discount exceeds your cashier limit.");
    let remaining = BigInt(amount);
    const updated = lines.map((line, index) => {
        const discount =
            index === lines.length - 1
                ? remaining
                : (BigInt(amount) * subtotals[index]) / sum;
        remaining -= discount;
        return { ...line, discount_minor: Number(discount) };
    });
    updated.forEach((line) => calculateLine(line, limit));
    return updated;
}
