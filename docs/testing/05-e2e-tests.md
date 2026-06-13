# Phase 5 — End-to-End (E2E) Tests

An **E2E test** runs the whole system the way a real user does: a real browser
loads the real, production-built app and clicks through a complete flow. No
mocked DOM, no mocked component — the actual site.

This is the **top of the pyramid**: highest confidence, but slowest and most
expensive. So we write *few* of them, only for the most important journeys. For
this site, the critical journey is: *a visitor submits the contact form and gets
confirmation.* That's literally how the business gets leads.

Files: `playwright.config.ts`, `e2e/contact.spec.ts`.
**Run them:** `npm run e2e` (or `npm run e2e:ui` for the visual debugger).

---

## A different tool: Playwright

Unit/component/API tests use **Vitest**. E2E uses **Playwright**, which has its
own runner — because it must launch and control a browser. Note the import:

```ts
import { test, expect } from "@playwright/test";   // NOT vitest
```

The concepts rhyme (`test`, `expect`, accessible queries), but the engine is
built for browser automation: navigation, clicking, waiting for elements,
screenshots, traces.

---

## Playwright starts the app for you

`playwright.config.ts` has a `webServer` block:

```ts
webServer: {
  command: "npm run build && npm run start",  // production build, like real life
  url: "http://localhost:3000",
  reuseExistingServer: !process.env.CI,
}
```

Before the tests run, Playwright builds and starts the app, waits until
`localhost:3000` responds, runs the tests against it, then shuts it down. We use
`build && start` (production) rather than `dev` so we test what users actually
get.

Two real-world snags we hit and fixed (this is normal — E2E surfaces
environment issues the lower layers can't):

1. **Corrupt SWC binary.** Next's native compiler had downloaded as a 1.3 MB
   stub instead of 135 MB, so `next build` crashed. Reinstalling fixed it. A
   unit test would never have caught this — it takes a real build to expose it.
2. **`new Resend(KEY)` at module load.** The contact route throws during
   `next build` if `RESEND_API_KEY` is unset (it works on Vercel because the
   secret exists there). We pass a dummy key via `webServer.env` so the build
   succeeds locally; the key is never used because we intercept the API call.

> Lesson: E2E tests don't just test your code — they test your *build and
> environment*. That's exactly their value, and why they're worth the cost.

---

## The new superpower: network interception

We want the full real flow — real form, real submit button, real success
panel — but we do **not** want to send real email. Playwright lets us intercept
the request inside the browser and answer it ourselves:

```ts
await page.route("**/api/contact", async (route) => {
  const body = route.request().postDataJSON();
  expect(body.name).toBe("Ana E2E");          // we can assert on the payload
  await route.fulfill({                         // and return a canned response
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ success: true }),
  });
});
```

Everything up to the network boundary is real; only the email provider is faked.
This is the E2E equivalent of the `fetch` mock from Phase 3, but at the browser
level.

The second test inverts it: it makes any call to `/api/contact` **throw**, so if
validation ever breaks and lets an empty form submit, the test fails loudly
instead of silently "passing":

```ts
await page.route("**/api/contact", async () => {
  throw new Error("Form should not submit when invalid");
});
```

---

## Driving the browser

```ts
await page.goto("/");                                  // baseURL + "/"
await page.getByLabel(/nombre/i).fill("Ana E2E");
await page.getByRole("button", { name: "Limpieza de ventanas" }).click();
await page.getByRole("button", { name: /enviar solicitud/i }).click();
await expect(page.getByText("¡Solicitud enviada!")).toBeVisible();
```

Things to notice:

- **Same accessible queries** as RTL (`getByLabel`, `getByRole`). Good habits
  transfer across tools.
- **Auto-waiting.** `expect(...).toBeVisible()` retries for a few seconds until
  the element appears. You rarely write manual sleeps — Playwright waits for the
  UI to settle. This is what makes E2E far less flaky than it used to be.
- **`scrollIntoViewIfNeeded()`** because the form is far down a long landing
  page; the element must be interactable.

---

## When it fails: traces

`playwright.config.ts` sets `trace: "on-first-retry"`. On a failure+retry,
Playwright records a **trace** — a frame-by-frame timeline with DOM snapshots,
network, and console for every action. Open it with:

```bash
npx playwright show-trace
```

It's like a time-travel debugger for the test. The HTML report (`npm run e2e`
opens it, or `npx playwright show-report`) links to these.

---

## How much E2E is enough?

E2E tests are slow (seconds to minutes) and more prone to flakiness (real
timing, real network). So:

- ✅ Cover the few **critical, money-making journeys** end to end (contact
  submit, checkout, login).
- ❌ Don't re-test every validation permutation here — the boundary cases,
  email-format table, etc. already live in fast unit/component tests. We keep
  just two E2E specs: the happy path and the "must not submit when invalid"
  guard.

This is the pyramid discipline: push detail *down* to cheap tests, keep the
*top* thin.

---

## Mental model

> Unit: a function is correct.
> Component: a UI behaves.
> API: a route honors its contract.
> **E2E: the whole thing actually works when assembled and built** — including
> the parts no other layer can see (routing, bundling, real browser, env).

We now have a complete, runnable suite. The last step is making it run *itself*
on every push, so nobody has to remember to.

→ Continue to `06-ci-cd.md`.
