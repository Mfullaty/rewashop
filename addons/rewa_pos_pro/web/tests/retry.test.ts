import { beforeEach, it, expect, vi } from "vitest";
import { Api, ApiError, isDefinitiveSaleRejection } from "../src/api";
beforeEach(() => {
    const storage = new Map<string, string>();
    vi.stubGlobal("location", { origin: "https://pos.example.test" });
    vi.stubGlobal("sessionStorage", {
        getItem: (key: string) => storage.get(key) || null,
        setItem: (key: string, value: string) => storage.set(key, value),
        removeItem: (key: string) => storage.delete(key),
    });
});
it("does not treat a permission or changed-currency failure as a rejected earlier sale", () => {
    expect(
        isDefinitiveSaleRejection(
            new ApiError("Revoked", "PERMISSION_DENIED", 403),
        ),
    ).toBe(false);
    expect(
        isDefinitiveSaleRejection(
            new ApiError("Currency changed", "CURRENCY_CHANGED", 409),
        ),
    ).toBe(false);
    expect(
        isDefinitiveSaleRejection(
            new ApiError("New price", "PRICE_MISMATCH", 409),
        ),
    ).toBe(true);
});
it("retains an unresolved cash action key across a new API instance and rejects changed values", async () => {
    const configuration = {
        coreUrl: "/pos/backend",
        webUrl: "/rewa-pos/web",
        csrf: "test",
        backUrl: "/admin",
        registerId: 1,
        area: "admin" as const,
    };
    const requests: RequestInit[] = [];
    vi.stubGlobal(
        "fetch",
        vi.fn(async (_url: unknown, init: RequestInit) => {
            requests.push(init);
            if (requests.length === 1) throw new TypeError("Connection lost");
            return new Response(JSON.stringify({ movement_id: 7 }), {
                status: 200,
            });
        }),
    );
    const first = new Api(configuration);
    first.scope = "1:1";
    await expect(
        first.mutate("shifts/1/cash", {
            amount_minor: 100,
            reason: "Opening top up",
        }),
    ).rejects.toBeInstanceOf(ApiError);
    const afterReload = new Api(configuration);
    afterReload.scope = "1:1";
    await expect(
        afterReload.mutate("shifts/1/cash", {
            amount_minor: 200,
            reason: "Opening top up",
        }),
    ).rejects.toMatchObject({ code: "ACTION_UNRESOLVED" });
    await expect(
        afterReload.mutate("shifts/1/cash", {
            amount_minor: 100,
            reason: "Opening top up",
        }),
    ).resolves.toEqual({ movement_id: 7 });
    expect(requests).toHaveLength(2);
    expect(requests[0].headers).toEqual(requests[1].headers);
});
it("recovers generated shift identity with the journal key on retry", async () => {
    const config = {
        coreUrl: "/pos/backend",
        webUrl: "/rewa-pos/web",
        csrf: "test",
        backUrl: "/admin",
        registerId: 1,
        area: "admin" as const,
    };
    const requests: RequestInit[] = [];
    vi.stubGlobal(
        "fetch",
        vi.fn(async (_url: unknown, init: RequestInit) => {
            requests.push(init);
            if (requests.length === 1) throw new TypeError("Lost ack");
            return new Response("{}", { status: 200 });
        }),
    );
    const api = new Api(config);
    await expect(
        api.mutate(
            "shifts/open",
            {
                client_shift_id: "11111111-1111-4111-8111-111111111111",
                register_id: 1,
                opening_minor: 500,
            },
            "POST",
            false,
            "11111111-1111-4111-8111-111111111111",
        ),
    ).rejects.toThrow();
    await api.mutate("shifts/open", {
        client_shift_id: "22222222-2222-4222-8222-222222222222",
        register_id: 1,
        opening_minor: 500,
    });
    expect(requests[1].body).toEqual(requests[0].body);
});
