import { test, expect, type Page } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "../../../../../");
test.beforeEach(() => {
    execFileSync(
        process.env.POS_PHP || "php",
        [resolve(root, "tests/Support/create-pos-web-fixture.php")],
        { cwd: root },
    );
});
async function login(page: Page, id = 1) {
    await page.addLocatorHandler(page.getByRole("dialog", {name:"Done", exact:true}), async () => {
        await page.getByRole("dialog", {name:"Done", exact:true}).getByRole("button", {name:"OK, I understand"}).click();
    });
    await page.goto(`/__pos_test/login/${id}`);
    await expect(
        page.getByRole("heading", { name: "Checkout", exact: true }),
    ).toBeVisible();
}
async function openShift(page: Page) {
    await page.getByRole("button", { name: "Register", exact: true }).click();
    await page.getByRole("button", { name: "Open shift", exact: true }).click();
    await page.getByLabel("Cash amount").fill("500.00");
    await page.getByRole("button", { name: "Confirm open" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await page.getByRole("button", { name: "Checkout", exact: true }).click();
}
async function scan(page: Page, code: string) {
    const input = page.getByLabel("Scan barcode or SKU");
    await input.fill(code);
    await input.press("Enter");
}
test("walk-in cash checkout creates an order once, prints, returns and closes the till", async ({
    page,
}) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await login(page);
    await openShift(page);
    await scan(page, "00101");
    await expect(page.getByLabel("Quantity Premium Basmati Rice")).toHaveValue(
        "1",
    );
    await scan(page, "00101");
    await expect(page.getByLabel("Quantity Premium Basmati Rice")).toHaveValue(
        "2",
    );
    await page.getByRole("button", { name: "Take payment" }).click();
    await page.getByLabel("Tender 1 cash received").fill("300.00");
    await page
        .getByRole("button", { name: "Record sale", exact: true })
        .click();
    await expect(
        page.getByRole("heading", { name: "Sale recorded", exact: true }),
    ).toBeVisible();
    await page.screenshot({
        path: resolve(root, "dist/web-sale-recorded.png"),
    });
    await page.emulateMedia({ media: "print" });
    await expect(page.locator("#rewa-pos-receipt")).toContainText(
        "Premium Basmati Rice",
    );
    await expect(page.locator("#rewa-pos-receipt")).toContainText(
        "Walk-in customer",
    );
    await page.pdf({
        path: resolve(root, "dist/web-receipt-80mm.pdf"),
        width: "80mm",
        height: "200mm",
        printBackground: true,
    });
    await page.emulateMedia({ media: "screen" });
    await page.getByRole("button", { name: "Mark printed" }).click();
    await page.getByRole("button", { name: "Sales & returns" }).click();
    await expect(page.getByRole("button", { name: "View sale" })).toHaveCount(
        1,
    );
    await page.getByRole("button", { name: "View sale" }).click();
    await page.getByRole("button", { name: "Return items" }).click();
    await page.getByLabel("Premium Basmati Rice · 2 returnable").fill("1");
    await page
        .getByLabel("Return reason")
        .fill("Customer returned unopened item");
    await page.getByRole("button", { name: "Record return & refund" }).click();
    await expect(
        page.getByRole("heading", { name: "Return items", exact: true }),
    ).not.toBeVisible();
    await page.getByRole("button", { name: "Close dialog" }).click();
    await page.getByRole("button", { name: "Register", exact: true }).click();
    await expect(
        page.locator(".metric-card").filter({ hasText: "Expected cash" }),
    ).toContainText("600.00");
    await page.getByRole("button", { name: "Count & close shift" }).click();
    await page.getByLabel("Counted cash").fill("600.00");
    await page.getByRole("button", { name: "Confirm close" }).click();
    await expect(
        page.getByRole("button", { name: "Open shift", exact: true }),
    ).toBeVisible();
    expect(errors).toEqual([]);
});
test("lost committed response survives reload and retries the same sale without a second stock deduction", async ({
    page,
}) => {
    await login(page);
    await openShift(page);
    await scan(page, "00101");
    await expect(page.getByLabel("Quantity Premium Basmati Rice")).toHaveValue(
        "1",
    );
    let first = true;
    const requests: { key: string | undefined; body: unknown }[] = [];
    await page.route("**/pos/backend/sales?*", async (route) => {
        if (route.request().method() !== "POST") return route.continue();
        requests.push({
            key: route.request().headers()["idempotency-key"],
            body: route.request().postDataJSON(),
        });
        if (first) {
            first = false;
            await route.fetch();
            await route.abort("failed");
        } else await route.continue();
    });
    await page.getByRole("button", { name: "Take payment" }).click();
    await page
        .getByRole("button", { name: "Record sale", exact: true })
        .click();
    await page.getByRole("dialog",{name:"Please check this"}).getByRole("button",{name:"OK, I understand"}).click();
    await expect(
        page.getByRole("button", { name: "Retry saved checkout" }),
    ).toBeVisible();
    await page.reload();
    await expect(
        page.getByRole("button", { name: "Retry saved checkout" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Retry saved checkout" }).click();
    await expect(
        page.getByRole("heading", { name: "Duplicate receipt" }),
    ).toBeVisible();
    expect(requests).toHaveLength(2);
    expect(requests[1]).toEqual(requests[0]);
    await page.getByRole("button", { name: "Mark printed" }).click();
    await page.getByRole("button", { name: "Sales & returns" }).click();
    await expect(page.getByRole("button", { name: "View sale" })).toHaveCount(
        1,
    );
    const stock = await page.request.get(
        "/pos/backend/catalog/search?stock_id=11&register_id=1",
    );
    expect((await stock.json()).data[0].available_quantity).toBe(19);
});
test("seller checkout sees only own products and server rejects another sellers product and receipt", async ({
    page,
}) => {
    await login(page, 2);
    await expect(page.locator(".product-card")).toHaveCount(1);
    await expect(page.locator(".product-card")).toContainText(
        "Seller Rice 5 kg",
    );
    await expect(page.locator(".store-label")).toContainText("Amina Retail");
    await page.screenshot({
        path: resolve(root, "dist/web-seller-checkout.png"),
    });
    const forbidden = await page.request.get(
        "/pos/backend/catalog/search?stock_id=33&register_id=2",
    );
    expect((await forbidden.json()).data).toEqual([]);
    const receipt = await page.request.get(
        "/pos/backend/receipts/999&register_id=2",
    );
    expect(receipt.status()).toBe(404);
});
test("barcode ambiguity, cart persistence, keyboard suffix and responsive layout", async ({
    page,
}) => {
    await login(page);
    await scan(page, "SHARED");
    await expect(
        page.getByRole("heading", { name: "Choose the exact variant" }),
    ).toBeVisible();
    await page
        .getByRole("dialog")
        .getByRole("button", { name: /Organic Flour.*2 kg/ })
        .click();
    await expect(page.getByLabel("Quantity Organic Flour")).toHaveValue("1");
    await page.getByRole("button", { name: "Reports", exact: true }).click();
    await page.getByRole("button", { name: "Checkout", exact: true }).click();
    await expect(page.getByLabel("Quantity Organic Flour")).toHaveValue("1");
    await page.getByRole("button", { name: "Hold", exact: true }).click();
    await expect(
        page.getByRole("heading", { name: "Ready for the first item" }),
    ).toBeVisible();
    await page.getByRole("button", { name: /^Held/ }).click();
    await page.getByRole("button", { name: /Held cart/ }).click();
    await expect(page.getByLabel("Quantity Organic Flour")).toHaveValue("1");
    await page.screenshot({
        path: resolve(root, "dist/web-admin-checkout.png"),
    });
    expect(
        await page
            .locator(".pay-button")
            .evaluate(
                (element) =>
                    element.getBoundingClientRect().bottom <=
                    window.innerHeight,
            ),
    ).toBe(true);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
        path: resolve(root, "dist/web-mobile-checkout.png"),
    });
    expect(
        await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
    ).toBe(true);
});
test("split cash and bank transfer remains pending until independent evidence is verified", async ({
    page,
}) => {
    await login(page);
    await openShift(page);
    await scan(page, "00101");
    await expect(page.getByLabel("Quantity Premium Basmati Rice")).toHaveValue(
        "1",
    );
    await page.getByRole("button", { name: "Take payment" }).click();
    await page.getByLabel("Tender 1 amount").fill("50.00");
    await page.getByLabel("Tender 1 cash received").fill("100.00");
    await page.getByRole("button", { name: "Add split tender" }).click();
    await page
        .getByRole("dialog")
        .getByLabel("Method")
        .nth(1)
        .selectOption("bank_transfer");
    await page.getByLabel("Payment reference").fill("BANK-2026-123");
    await page
        .getByRole("button", { name: "Record sale", exact: true })
        .click();
    await expect(
        page.getByText("Payment awaiting verification", { exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Mark printed" }).click();
    await page.getByRole("button", { name: "Sales & returns" }).click();
    await page.getByRole("button", { name: "View sale" }).click();
    await page.getByRole("button", { name: "Verify evidence" }).click();
    await page.getByLabel("Settlement reference").fill("SETTLEMENT-2026-123");
    await page
        .getByLabel("Evidence and reconciliation notes")
        .fill("Verified against the bank statement entry for this transfer");
    await page
        .getByRole("button", { name: "Confirm verified settlement" })
        .click();
    await expect(
        page.getByRole("heading", { name: "Verify payment settlement" }),
    ).not.toBeVisible();
    await expect(
        page.getByRole("button", { name: "Return items" }),
    ).toBeVisible();
});
test("browser print failure never submits or cancels another sale", async ({
    page,
}) => {
    await login(page);
    await openShift(page);
    await scan(page, "00101");
    await expect(page.getByLabel("Quantity Premium Basmati Rice")).toHaveValue(
        "1",
    );
    await page.getByRole("button", { name: "Take payment" }).click();
    await page
        .getByRole("button", { name: "Record sale", exact: true })
        .click();
    await expect(
        page.getByRole("heading", { name: "Sale recorded", exact: true }),
    ).toBeVisible();
    await page.evaluate(() => {
        window.print = () => {
            throw new Error("Printer unavailable");
        };
    });
    await page
        .getByRole("button", { name: "Print receipt", exact: true })
        .click();
    await expect(
        page.getByText("Printing could not start.", { exact: false }),
    ).toBeVisible();
    const reprint = page.waitForResponse(
        (response) =>
            response.url().includes("/reprint") &&
            response.request().method() === "POST",
    );
    await page
        .getByRole("button", { name: "Print receipt", exact: true })
        .click();
    expect((await reprint).status()).toBe(200);
    await expect(
        page.getByRole("heading", { name: "Duplicate receipt" }),
    ).toBeVisible();
    const sales = await page.request.get("/pos/backend/sales?register_id=1");
    expect((await sales.json()).total).toBe(1);
    const stock = await page.request.get(
        "/pos/backend/catalog/search?stock_id=11&register_id=1",
    );
    expect((await stock.json()).data[0].available_quantity).toBe(19);
});

test("seller branding appears on POS and thermal receipts without exposing the global switch", async ({ page }) => {
    test.setTimeout(60000);
    await login(page, 2);
    await page.getByRole("button", { name: "Settings", exact: true }).click();
    await expect(page.getByLabel("Enable POS for all sellers")).toHaveCount(0);
    await page.getByLabel("Receipt store name", { exact: true }).fill("Amina Counter");
    await page.getByLabel("POS logo URL (HTTPS)").fill("https://example.com/logo.png");
    await page.route("https://example.com/logo.png", (route) => route.fulfill({
        contentType: "image/svg+xml",
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="40"><text x="2" y="24">AMINA</text></svg>',
    }));
    await page.getByLabel("Store address", { exact: true }).fill("Kano store");
    await page.getByLabel("Store phone", { exact: true }).fill("+2348000000000");
    await page.getByLabel("Tax registration details").fill("TIN 123");
    await page.getByLabel("Receipt footer", { exact: true }).fill("Shop with Amina again");
    await page.getByRole("button", { name: "Save merchant settings" }).click();
    await expect(page.locator(".store-label")).toContainText("Amina Counter");
    await expect(page.locator(".pos-store-logo")).toHaveAttribute("src", "https://example.com/logo.png");
    await page.getByRole("combobox", { name: "Receipt paper", exact: true }).selectOption("58");
    await openShift(page);
    await scan(page, "00202");
    await page.getByRole("button", { name: "Take payment" }).click();
    await page.getByLabel("Tender 1 cash received").fill("100.00");
    await page.getByRole("button", { name: "Record sale", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Sale recorded", exact: true })).toBeVisible();
    await page.emulateMedia({ media: "print" });
    const receipt = page.locator("#rewa-pos-receipt");
    await expect(receipt).toHaveClass(/receipt-58/);
    await expect(receipt).toContainText("Amina Counter");
    await expect(receipt).toContainText("Kano store");
    await expect(receipt).toContainText("TIN 123");
    await expect(receipt).toContainText("Shop with Amina again");
    await expect(receipt.locator("img")).toHaveAttribute("src", "https://example.com/logo.png");
    await page.emulateMedia({ media: "screen" });
});

test("owner approves a desktop pairing through store settings", async ({ page }) => {
    await login(page, 2);
    const start = await page.request.post('/api/pos/v1/devices/pair/start', {data: {name: 'Amina Windows till'}});
    expect(start.status()).toBe(201);
    const pairing = await start.json();
    await page.getByRole('button', {name: 'Settings', exact: true}).click();
    await page.getByLabel('Connection number from desktop').fill(pairing.pairing_id);
    await page.getByRole('button', {name: 'Approve computer', exact: true}).click();
    await expect(page.getByText('Computer approved. Return to the desktop app and confirm connection.')).toBeVisible();
    const confirm = await page.request.post('/api/pos/v1/devices/pair/confirm', {data: {pairing_id: pairing.pairing_id, pairing_secret: pairing.pairing_secret}});
    expect(confirm.status()).toBe(200);
    const claimed = await confirm.json();
    expect(claimed.status).toBe('paired');
    const boot = await page.request.get('/api/pos/v1/bootstrap', {headers: {Authorization: `Bearer ${claimed.token}`}});
    expect((await boot.json()).seller_id).toBe(2);
});

test("cashier can pay without opening a shift and success messages use dialogs", async ({page}) => {
    await login(page);
    await page.removeLocatorHandler(page.getByRole("dialog",{name:"Done",exact:true}));
    await scan(page,"00101");
    await expect(page.getByRole("button",{name:"Take payment"})).toBeEnabled();
    await page.getByRole("button",{name:"Take payment"}).click();
    const posted=page.waitForResponse(response=>response.url().includes("/pos/backend/sales")&&response.request().method()==="POST");
    await page.getByRole("button",{name:"Record sale",exact:true}).click();
    expect((await posted).status()).toBe(201);
    await expect(page.getByRole("heading",{name:"Sale recorded",exact:true})).toBeVisible();
    await page.getByRole("button",{name:"Mark printed"}).click();
    await expect(page.getByRole("dialog",{name:"Done",exact:true})).toBeVisible();
});
