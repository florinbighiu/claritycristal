# Phase 2 — Unit Tests

A **unit test** checks one small piece of logic (a "unit" — usually a function)
in complete isolation. No browser, no network, no database. Just: given this
input, do I get the right output?

These are the bottom of the pyramid: the most numerous, the fastest, the first
to write.

**Run them:** `npm test` (or `npm run test:watch` to re-run on save).

---

## What we did first: made the code testable

You can't unit-test logic that's trapped inside a React component. So step one
was a **refactor** (changing structure without changing behavior):

- We moved `formatPhone()` and the validation logic out of
  `components/ContactSection.tsx` and into a new pure module:
  **`lib/contactForm.ts`**.
- The component now imports them. It behaves exactly the same.

This is a golden rule: **testable code and well-structured code are the same
thing.** If something is hard to test, that's usually a design smell telling you
to separate concerns. "Extract the logic" is the most common fix.

> Pure function = same input always gives same output, and it changes nothing
> outside itself. These are trivial to test because there's no setup or cleanup.

---

## The files

| File | Role |
|------|------|
| `vitest.config.ts` | Configures the test runner (env, aliases, coverage) |
| `vitest.setup.ts` | Loads extra `expect` matchers, runs before tests |
| `tests/unit/contactForm.test.ts` | Tests `formatPhone` + `validateContactForm` |
| `tests/unit/gtm.test.ts` | Tests `pushEvent` (a side-effecting function) |

We chose **Vitest** as the runner — it's the modern standard for Vite/Next
projects: fast, TypeScript-native, and its API matches Jest (`describe`/`it`/
`expect`) so the knowledge transfers anywhere.

---

## Anatomy of a test, in code

```ts
describe("formatPhone", () => {            // a group of related tests
  it("groups local digits in threes", () => {   // one test case
    expect(formatPhone("600123456")).toBe("600 123 456");
    //     └── the thing we test    └── matcher: asserts equality
  });
});
```

- `describe` — a labeled bucket. Groups make output readable and let you share
  setup.
- `it` (alias `test`) — one scenario. The string should read like a sentence:
  *"it groups local digits in threes."* If a test fails, this sentence is the
  headline you'll see.
- `expect(x).matcher(y)` — the assertion. If it's false, the test fails. Common
  matchers: `toBe` (strict ===), `toEqual` (deep equality for objects/arrays),
  `toHaveLength`, `toBeUndefined`, `toBeInTheDocument` (DOM).

---

## The three techniques on display

### 1. The manual plan became code
Look at the comments: `TC-09`, `TC-10`, `TC-11` from `01-manual-testing.md` are
now executable. The manual checklist was the spec; these are the implementation.

### 2. Boundary Value Analysis (the phone rule)
The rule is "6–15 digits". We don't test random lengths — we test the **edges**:

```ts
it("rejects 5 digits (just below min)", ...)   // 5  → fail
it("accepts 6 digits (exactly min)", ...)      // 6  → pass
it("accepts 15 digits (exactly max)", ...)     // 15 → pass
it("rejects 16 digits (just above max)", ...)  // 16 → fail
```

These four catch the classic off-by-one bug: if someone wrote `<= 5` instead of
`< 6`, or `< 15` instead of `<= 15`, one of these turns red instantly.

### 3. Table-driven tests (`it.each`)
For the email regex we test many inputs without copy-pasting:

```ts
it.each([
  ["ana@",            false],
  ["ana@correo.com",  true],
  // ...
])("email %s -> valid=%s", (email, isValid) => { ... });
```

Each row is reported as its own test, so a failure tells you *exactly* which
input broke. This is equivalence partitioning in action — one representative per
group.

---

## Testing side effects (`gtm.test.ts`)

Not every function returns a value. `pushEvent("click_phone")` **pushes onto
`window.dataLayer`** (what Google Tag Manager reads) and returns nothing.

So we assert on the *effect*, not a return value:

```ts
beforeEach(() => { window.dataLayer = []; });  // clean slate per test

it("pushes the event name", () => {
  pushEvent("form_submit_contact");
  expect(window.dataLayer[0]).toEqual({ event: "form_submit_contact" });
});
```

Two lessons here:
- **`beforeEach`** resets shared state so tests stay independent. Order must
  never matter — that's *test isolation*.
- `window` exists in these tests because `vitest.config.ts` sets
  `environment: "jsdom"` — a fake browser DOM running in Node.

---

## Reading the output

```
 Test Files  2 passed (2)
      Tests  24 passed (24)
   Duration  659ms
```

24 assertions about your core logic, verified in under a second. Run it after
every change. When one goes red, the test name + the `expect` line point you
straight at the break.

### Coverage
`npm run test:coverage` generates a report (`coverage/index.html`) showing which
lines ran during tests. Useful to spot untested branches — but **100% coverage
is not the goal.** Coverage tells you what *wasn't* tested, not whether your
tests are *good*. A test with no meaningful `expect` can have high coverage and
catch nothing.

---

## Mental model

> Unit tests are a vise that holds your logic in place. Once `formatPhone` is
> pinned by tests, you can refactor it fearlessly — if you break the behavior,
> a test goes red in milliseconds.

Next we go up a level: rendering the actual React form and interacting with it
like a user.

→ Continue to `03-component-tests.md`.
