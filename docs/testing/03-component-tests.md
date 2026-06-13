# Phase 3 — Component Tests

A **component test** renders a real React component into a simulated browser
(jsdom) and interacts with it the way a user would — typing, clicking, reading
messages — then asserts on what's visible.

This is the middle of the pyramid: more realistic than a unit test (it exercises
the actual JSX, state, and event handlers), but far faster than a real browser.

**Run them:** `npm test` runs these alongside the unit tests.

File: `tests/component/ContactSection.test.tsx`.

---

## The golden rule: test behavior, not implementation

We use **React Testing Library (RTL)**. Its whole philosophy is one sentence:

> The more your tests resemble the way your software is used, the more
> confidence they give you.

In practice that means:

- ❌ We never read component state (`form.name`) or call internal functions.
- ✅ We find elements the way a person (or screen reader) would — by their
  label, role, or visible text — and assert on what's on screen.

Why this matters: if you later rewrite `ContactSection` to use a different state
library but it still *behaves* the same, these tests stay green. They test the
contract with the user, not the wiring.

---

## How you find things (queries)

RTL gives queries ordered by how "accessible" they are. Prefer the top ones:

| Query | Finds by | Example |
|-------|----------|---------|
| `getByRole` | ARIA role + name | `getByRole("button", { name: /enviar/i })` |
| `getByLabelText` | the `<label>` tied to an input | `getByLabelText(/nombre/i)` |
| `getByText` | visible text | `getByText("¡Solicitud enviada!")` |

Three variants control timing and presence:

- `getBy...` — must exist **now**, else throws. (Also doubles as an assertion.)
- `queryBy...` — returns `null` if absent. Use to assert something is **gone**:
  `expect(screen.queryByText("...")).not.toBeInTheDocument()`.
- `findBy...` — **async**, waits up to ~1s for it to appear. Use after an action
  that updates the UI asynchronously (like a submit).

```ts
// "after I click submit, an error eventually appears"
expect(await screen.findByText("El nombre es obligatorio")).toBeInTheDocument();
```

---

## Simulating a real user (`userEvent`)

```ts
const user = userEvent.setup();
await user.type(screen.getByLabelText(/nombre/i), "Ana García");
await user.click(screen.getByRole("button", { name: /enviar solicitud/i }));
```

`userEvent` fires the full sequence of real browser events (focus → keydown →
input → keyup …), so it catches bugs a naive "just set the value" approach
misses. It's **async** — always `await` it, because state updates and re-renders
happen between events. This is why our `fillValidForm` helper is `async`.

---

## The big new idea: mocking the network

The form submits with `fetch("/api/contact", …)`. In a component test we do
**not** want to hit a real server or send real email. So we replace `fetch`
with a fake — a **mock** — that we control:

```ts
const fetchMock = vi.fn().mockResolvedValue({ ok: true });  // pretend success
vi.stubGlobal("fetch", fetchMock);
```

Now the component calls our fake instead of the network. A mock lets us:

1. **Control the response** — return `{ ok: true }` to test the happy path, or
   `{ ok: false }` to test the error path (TC-14), on demand.
2. **Spy on the call** — verify it was called correctly:

```ts
expect(fetchMock).toHaveBeenCalledTimes(1);
const [url, options] = fetchMock.mock.calls[0];   // arguments of the 1st call
expect(url).toBe("/api/contact");
expect(JSON.parse(options.body).name).toBe("Ana García");
```

And to prove validation blocks bad submits, we assert the mock was **never**
called (TC-01):

```ts
expect(fetchMock).not.toHaveBeenCalled();
```

> A **mock/stub** is a stand-in you control. A **spy** records how it was
> called. `vi.fn()` is both. Mocking is how you isolate the unit under test from
> slow/external things (network, time, randomness).

---

## What each test proves (mapped to the manual plan)

| Test | Manual case | What it locks in |
|------|-------------|------------------|
| renders key fields | — | The form mounts and is reachable by label/role |
| blocks empty submit | TC-01 | Errors show **and** `fetch` is never called |
| requires phone or email | TC-02 | Cross-field rule surfaces the right message |
| toggles a service chip | TC-08 | `aria-pressed` flips on/off |
| formats phone as you type | TC-09 | The extracted `formatPhone` is wired in correctly |
| submits successfully | TC-12 | Success panel shows, correct payload sent, GTM event fires |
| resets after success | TC-13 | "Nueva solicitud" clears the form |
| shows error on failure | TC-14 | Server error → recoverable message, no false success |

Notice "submits successfully" checks three things at once: the **UI** (success
panel), the **contract** (POST to `/api/contact` with the right body), and the
**analytics** (`form_submit_contact` pushed to `dataLayer`). One realistic test,
several guarantees.

---

## Why `environment: "jsdom"` matters

These tests need a DOM (`document`, `window`, elements) but there's no browser
in Node. `vitest.config.ts` sets `environment: "jsdom"`, which provides a
JavaScript implementation of the DOM. It's not a *real* browser — no actual
rendering, no real layout — which is exactly why it's fast. For true
browser behavior (real CSS, real navigation) we use Playwright in Phase 5.

---

## Mental model

> Unit tests pin the *logic*. Component tests pin the *experience* — "when a
> user does X in this form, they see Y." They're your safety net against
> breaking the UI's behavior during a redesign.

Next: testing the *server* side — the API route that the form posts to — without
sending a single real email.

→ Continue to `04-api-tests.md`.
