// PLAYGROUND — your space to practice Playwright. Edit freely, break things,
// experiment. The other file (contact.spec.ts) is the "real" suite; this one is
// just for learning.
//
// ─── HOW TO RUN ──────────────────────────────────────────────────────────────
//   npm run e2e -- playground.spec.ts            run just this file (headless)
//   npx playwright test playground.spec.ts --ui  open the visual runner (BEST)
//   npx playwright test playground.spec.ts --headed --slowmo=800   watch it live
//   npx playwright show-report                   see results after a headless run
// ─────────────────────────────────────────────────────────────────────────────
//
// Tests marked `test.skip(...)` are EXERCISES for you — they won't run (so the
// suite stays green) until you change `test.skip` to `test` and fill in the
// blanks. The first few are complete, working examples to learn from.

import { test, expect } from "@playwright/test";

// `beforeEach` runs before every test below — here it loads the home page, so
// each test starts on a fresh page at "/" (baseURL is set in playwright.config).
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

// ─── WORKED EXAMPLES (these run and pass) ────────────────────────────────────

test("example: the page has the right title", async ({ page }) => {
  // expect(page).toHaveTitle accepts a string or a regex.
  await expect(page).toHaveTitle(/ClarityCristal/i);
});

test("example: the contact heading is visible", async ({ page }) => {
  // getByRole is the preferred, accessibility-first way to find elements.
  const heading = page.getByRole("heading", { name: /solicita tu/i });
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toBeVisible();
});

test("example: typing into the phone field auto-formats it", async ({ page }) => {
  const phone = page.getByLabel(/^teléfono$/i);
  await phone.scrollIntoViewIfNeeded();
  await phone.fill("600123456");
  // The component formats "600123456" -> "600 123 456" as you type.
  await expect(phone).toHaveValue("600 123 456");
});

// ─── EXERCISES (change `test.skip` to `test`, then make them pass) ────────────

test.skip("exercise 1: the name field starts empty", async ({ page }) => {
  // HINT: find the input with page.getByLabel(/nombre/i), then assert its value.
  // Useful matcher: await expect(locator).toHaveValue("");
  // ── your code here ──
});

test.skip("exercise 2: selecting a service highlights it", async ({ page }) => {
  // The service chips are <button> elements with aria-pressed="true|false".
  // 1. find the button named "Limpieza de paneles solares" (getByRole button)
  // 2. assert it starts with aria-pressed = "false"
  //    HINT: await expect(chip).toHaveAttribute("aria-pressed", "false")
  // 3. click it
  // 4. assert it becomes "true"
  // ── your code here ──
});

test.skip("exercise 3: submitting an empty form shows the name error", async ({ page }) => {
  // 1. scroll to and click the submit button (name: /enviar solicitud/i)
  // 2. assert the text "El nombre es obligatorio" becomes visible
  //    HINT: await expect(page.getByText("...")).toBeVisible()
  // ── your code here ──
});

test.skip("exercise 4: a full happy-path submit (uses network interception)", async ({ page }) => {
  // This is the big one — it mirrors contact.spec.ts.
  //
  // 1. Intercept the API so no real email is sent:
  //      await page.route("**/api/contact", async (route) => {
  //        await route.fulfill({ status: 200, contentType: "application/json",
  //          body: JSON.stringify({ success: true }) });
  //      });
  //    (Put this BEFORE you submit. Note: page is already at "/" from beforeEach,
  //     and page.route works for requests made after it's set up.)
  //
  // 2. Fill name (getByLabel /nombre/i) with "Test User"
  // 3. Fill phone (getByLabel /^teléfono$/i) with "600123456"
  // 4. Click the service button "Limpieza de ventanas"
  // 5. Click submit (/enviar solicitud/i)
  // 6. Assert the success text "¡Solicitud enviada!" is visible
  // ── your code here ──
});

// ─── SCRATCH SPACE ───────────────────────────────────────────────────────────
// Want to just poke around? Unskip this and add whatever you like.
test.skip("scratch: my experiments", async ({ page }) => {
  // Try things! Examples:
  //   console.log(await page.title());
  //   await page.getByRole("link", { name: /contacto/i }).click();
  //   await page.screenshot({ path: "my-screenshot.png" });   // saved to repo root
  //   await expect(page.getByRole("navigation")).toBeVisible();
  //
  // TIP: `await page.pause()` opens the inspector so you can step + explore live
  //      (run with: npx playwright test playground.spec.ts --headed)
});
