// MANUAL PAGE CREATION — same contact-form test, but we build the page object
// ourselves instead of using the injected `{ page }` fixture.
//
// Compare with contact.spec.ts (which uses the fixture). This shows what the
// fixture does for you automatically: create a context, open a page, and clean
// them up afterward. Here you do it by hand.
//
// We only ask for `{ browser }` — the already-launched Chromium. From it we
// make our own context (an isolated session) and our own page (a tab).

import { test, expect, type BrowserContext, type Page } from "@playwright/test";

test.describe("Contact form (manual page)", () => {
  let context: BrowserContext;
  let page: Page;

  // Build the context + page before each test...
  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();   // isolated session (own cookies/storage)
    page = await context.newPage();          // a single tab — this is OUR page
  });

  // ...and tear them down after, so nothing leaks into the next test.
  // (The fixture would do this for you; manually, it's your responsibility.)
  test.afterEach(async () => {
    await context.close();                   // closes the page too
  });

  test("submits the contact form and sees confirmation", async () => {
    // Intercept the API so no real email is sent. Note: page.route is called on
    // OUR manually-created page, exactly like with the fixture page.
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    // baseURL from playwright.config.ts still applies to a manual page, so "/"
    // resolves to http://localhost:3000/.
    await page.goto("/");

    const name = page.getByLabel(/nombre/i);
    await name.scrollIntoViewIfNeeded();
    await name.fill("Ana Manual");
    await page.getByLabel(/^teléfono$/i).fill("600123456");
    await page.getByRole("button", { name: "Limpieza de ventanas" }).click();
    await page.getByRole("button", { name: /enviar solicitud/i }).click();

    await expect(page.getByText("¡Solicitud enviada!")).toBeVisible();
  });

  test("shows the name error on empty submit", async () => {
    await page.goto("/");
    const submit = page.getByRole("button", { name: /enviar solicitud/i });
    await submit.scrollIntoViewIfNeeded();
    await submit.click();
    await expect(page.getByText("El nombre es obligatorio")).toBeVisible();
  });
});
