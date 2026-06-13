// END-TO-END TESTS — Phase 5
//
// A real Chromium browser loads the real, production-built app and clicks
// through the actual contact flow — the closest thing to a real user.
//
// Note the import: Playwright has its OWN test runner (`@playwright/test`),
// separate from Vitest. Same ideas (test/expect), different engine, because it
// orchestrates a browser.
//
// THE ONE THING WE FAKE: the email send. We intercept the POST to /api/contact
// with page.route() and fulfill it ourselves, so the full UI flow runs but no
// real email goes out and we don't depend on Resend credentials.

import { test, expect } from "@playwright/test";

test.describe("Contact flow", () => {
  test("a visitor submits the contact form and sees confirmation", async ({ page }) => {
    // Intercept the API call the form makes. The browser never reaches the real
    // route handler — we return a canned 200 success instead.
    await page.route("**/api/contact", async (route) => {
      // (You could also assert on the posted body here:)
      const body = route.request().postDataJSON();
      expect(body.name).toBe("Ana E2E");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    // 1. Load the home page (baseURL from playwright.config.ts).
    await page.goto("/");

    // 2. Jump to the contact section by its anchor and find the form.
    //    getByLabel / getByRole are accessibility-first, just like RTL.
    const nameField = page.getByLabel(/nombre/i);
    await nameField.scrollIntoViewIfNeeded();
    await nameField.fill("Ana E2E");

    await page.getByLabel(/^teléfono$/i).fill("600123456");
    await page.getByRole("button", { name: "Limpieza de ventanas" }).click();

    // 3. Submit.
    await page.getByRole("button", { name: /enviar solicitud/i }).click();

    // 4. The real success panel renders in the real browser.
    await expect(page.getByText("¡Solicitud enviada!")).toBeVisible();
  });

  test("shows validation errors when submitting an empty form", async ({ page }) => {
    // Guard: if validation is broken and it submits anyway, fail loudly instead
    // of silently sending. Any hit to the API here is unexpected.
    await page.route("**/api/contact", async (route) => {
      throw new Error("Form should not submit when invalid");
    });

    await page.goto("/");
    // Submit straight away without filling anything.
    const submit = page.getByRole("button", { name: /enviar solicitud/i });
    await submit.scrollIntoViewIfNeeded();
    await submit.click();

    // The same error strings we asserted in unit + component tests, now in a
    // real browser.
    await expect(page.getByText("El nombre es obligatorio")).toBeVisible();
    await expect(page.getByText("Selecciona al menos un servicio")).toBeVisible();
  });
});
