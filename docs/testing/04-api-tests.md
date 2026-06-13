# Phase 4 — API Route Tests

The contact form posts to `POST /api/contact` (sends email via Resend) and the
site reads reviews from `GET /api/reviews` (calls Google Places). These run on
the *server*. Here we test them directly — without an HTTP server, without
sending real email, and without spending real API quota.

Files: `tests/api/contact.test.ts`, `tests/api/reviews.test.ts`.

---

## Key insight: a route handler is just a function

A Next.js App Router route exports `GET`/`POST` functions shaped like
`(Request) => Response`. There's nothing magic to "start." We import the
function and call it:

```ts
import { POST } from "@/app/api/contact/route";

const req = new Request("http://localhost/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Ana", /* ... */ }),
});

const res = await POST(req);
expect(res.status).toBe(400);
expect(await res.json()).toEqual({ error: "Datos incompletos" });
```

`Request` and `Response` are Web-standard globals (built into modern Node), so
this works with no extra setup.

---

## New tool: `@vitest-environment node`

The first line of each API test file is a docblock:

```ts
// @vitest-environment node
```

This overrides the project default (`jsdom`) **for that file only**, running it
in plain Node. Server code has no DOM, and Node matches production more closely.
It's a useful pattern: most files use the global env, but a file can opt into a
different one when its needs differ.

---

## Mocking a whole module (`vi.mock`)

The contact route does, at the top level:

```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);   // runs on import
```

We can't let that send real email. So we replace the entire `resend` package
with a fake:

```ts
const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock("resend", () => ({
  Resend: vi.fn(function () {            // ← `function`, because it's `new`-ed
    return { emails: { send: sendMock } };
  }),
}));

import { POST } from "@/app/api/contact/route";   // imported AFTER the mock
```

Three things worth understanding here:

1. **`vi.mock` is hoisted.** Vitest moves it above the imports so the fake is in
   place *before* the route module loads. That's why the route's top-level
   `new Resend(...)` gets the fake.
2. **`vi.hoisted`** is how we create `sendMock` early enough to be referenced
   inside the (also-hoisted) mock factory, while still keeping a handle to it in
   our tests so we can assert on it.
3. **`function`, not arrow.** The route calls `new Resend(...)`. Arrow functions
   can't be constructed with `new`, so the mock must be a regular `function`
   (or a `class`). We hit this exact error first and fixed it — a good reminder
   that the mock has to match how the real thing is *used*, not just its shape.

Now every test controls the "email send" outcome:

```ts
sendMock.mockResolvedValue({ error: null });                 // success
sendMock.mockResolvedValue({ error: { message: "down" } });  // failure → 500
```

and spies on what was sent:

```ts
const payload = sendMock.mock.calls[0][0];      // first call, first argument
expect(payload.to).toBe("info@claritycristal.com");
expect(payload.subject).toContain("Ana García");
expect(payload.replyTo).toBe("ana@correo.com");
```

---

## Mocking env vars and globals (`reviews.test.ts`)

The reviews route reads `process.env` and calls global `fetch`. Two more tools:

```ts
vi.stubEnv("GOOGLE_PLACES_API_KEY", "test-key");   // fake the environment
vi.stubGlobal("fetch", fetchMock);                  // fake global fetch
```

This lets us test all three branches with zero real dependencies:

| Test | Setup | Asserts |
|------|-------|---------|
| missing config | empty API key | 500 + "Missing configuration" |
| success | `fetch` → `{ ok: true, … }` | 200 + data, and the request used the key |
| upstream error | `fetch` → `{ ok: false }` | 500 + "Failed to fetch reviews" |

Always clean up in `afterEach` (`vi.unstubAllEnvs()`, `vi.unstubAllGlobals()`)
so one test's fakes don't leak into the next. Isolation again.

---

## Why test the server when the client already validates?

The component (Phase 3) validates before submitting — so why re-check on the
server? **Because you can never trust the client.** A bad actor (or a bug, or a
script) can POST straight to `/api/contact`, skipping the form entirely. The
server's validation is the real gate; the client's is just UX. We test both
because they're two independent guarantees.

This is also why the API tests assert `sendMock` was **not** called on invalid
input — proving the guard runs *before* any email work.

---

## Mental model

> Unit tests: is the logic right?
> Component tests: does the user's experience work?
> API tests: does the server honor its contract — accept the good, reject the
> bad, and survive when a dependency fails?

All three layers so far run in a *simulated* world (jsdom / Node, mocked
network). The final layer drops the simulation: a real browser, a real running
app.

→ Continue to `05-e2e-tests.md`.
