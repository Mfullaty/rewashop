import { describe, it, expect } from "vitest";
import {
    calculateLine,
    distributeDiscount,
    parseMinor,
    totals,
} from "../src/money";
import type { CartLine } from "../src/types";
const line = (price = 10000, quantity = 1): CartLine => ({
    item: {
        stock_id: 11,
        product_id: 101,
        name: "Rice",
        variant: "",
        sku: "RICE",
        barcode: "00101",
        category_id: 1,
        brand_id: null,
        unit: "piece",
        image_id: null,
        base_price_minor: price,
        promotion_minor: 0,
        unit_price_minor: price,
        tax_rules: [],
        tax_inclusive: false,
        gst_bps: 0,
        currency: "NGN",
        price_version: "v1",
        next_price_boundary: null,
        available_quantity: 100,
    },
    quantity,
    discount_minor: 0,
});
describe("integer-money checkout policy", () => {
    it("parses decimal input exactly and rejects signs, exponent notation and fractional cents", () => {
        expect(parseMinor("100.05")).toBe(10005);
        expect(parseMinor("0.1")).toBe(10);
        for (const value of ["-1", "1e3", "1.234", "NaN", ""])
            expect(() => parseMinor(value)).toThrow();
    });
    it("rounds exclusive percentage tax after the line discount", () => {
        const value = line(101, 3);
        value.discount_minor = 1;
        value.item.tax_rules = [{ type: "percent", value: 750 }];
        expect(calculateLine(value)).toMatchObject({
            subtotal_minor: 303,
            discount_minor: 1,
            tax_minor: 23,
            total_minor: 325,
        });
    });
    it("extracts inclusive tax and adds GST using the backend rounding policy", () => {
        const value = line(10750);
        value.item.tax_rules = [{ type: "percent", value: 750 }];
        value.item.tax_inclusive = true;
        value.item.gst_bps = 500;
        expect(calculateLine(value)).toMatchObject({
            tax_minor: 1288,
            total_minor: 11288,
        });
    });
    it("multiplies fixed taxes by quantity", () => {
        const value = line(100, 3);
        value.item.tax_rules = [{ type: "amount", value: 15 }];
        expect(calculateLine(value)).toMatchObject({
            tax_minor: 45,
            total_minor: 345,
        });
    });
    it("uses BigInt for intermediate products beyond JavaScript safe integer precision", () => {
        const value = line(950_000_000_000);
        value.item.tax_rules = [{ type: "percent", value: 1 }];
        expect(calculateLine(value).tax_minor).toBe(95_000_000);
    });
    it("rejects zero/fractional quantities, invalid tax policies and overflow", () => {
        expect(() => calculateLine(line(100, 0))).toThrow();
        expect(() => calculateLine(line(100, 1.5))).toThrow();
        expect(() => calculateLine(line(1_000_000_000_000, 2))).toThrow();
        const value = line();
        value.item.tax_rules = [{ type: "percent", value: 11000 }];
        expect(() => calculateLine(value)).toThrow();
    });
    it("enforces discount grants and distributes a cart discount without losing cents", () => {
        const rows = distributeDiscount([line(100, 1), line(200, 1)], 31, 2000);
        expect(rows.map((row) => row.discount_minor)).toEqual([10, 21]);
        expect(totals(rows).total_minor).toBe(269);
        expect(() => distributeDiscount(rows, 100, 2000)).toThrow();
    });
});
