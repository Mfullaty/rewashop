import { z } from "zod";
const minor = z.number().int().min(0).max(1_000_000_000_000);
export const onlineSaleSchema = z.strictObject({
    client_sale_id: z.uuid(),
    register_id: z.number().int().positive(),
    shift_id: z.number().int().positive().optional(),
    currency: z.string().regex(/^[A-Z]{3}$/),
    grand_total_minor: minor.refine((value) => value > 0),
    customer: z
        .strictObject({
            name: z.string().min(1).max(150),
            email: z.email().max(200).optional(),
            phone: z.string().max(30).optional(),
        })
        .optional(),
    lines: z
        .array(
            z.strictObject({
                stock_id: z.number().int().positive(),
                quantity: z.number().int().min(1).max(10000),
                discount_minor: minor,
                unit_price_minor: minor,
                tax_minor: minor,
                total_minor: minor,
                override_minor: minor.optional(),
                override_reason: z.string().min(3).max(500).optional(),
            }),
        )
        .min(1)
        .max(200),
    tenders: z
        .array(
            z.strictObject({
                method: z.enum(["cash", "external_terminal", "bank_transfer"]),
                currency: z.string().length(3),
                amount_minor: minor.refine((value) => value > 0),
                received_minor: minor.optional(),
                change_minor: minor.optional(),
                reference: z.string().max(100).optional(),
            }),
        )
        .min(1)
        .max(10),
});
