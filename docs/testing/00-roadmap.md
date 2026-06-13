# Testing Roadmap — ClarityCristal

This folder is a hands-on course in testing, built around **this real project**.
Read the files in order. Each one explains the *why*, then points at the actual
test code in the repo so you can see the *how*.

| Doc | Phase | What you learn |
|-----|-------|----------------|
| `00-roadmap.md` | — | The big picture (this file) |
| `01-manual-testing.md` | Manual | How to test by hand, methodically |
| `02-unit-tests.md` | Unit | Testing pure functions in isolation |
| `03-component-tests.md` | Component | Testing React UI like a user |
| `04-api-tests.md` | API | Testing server routes without side effects |
| `05-e2e-tests.md` | E2E | Driving a real browser end-to-end |
| `06-ci-cd.md` | CI/CD | Running every test automatically on push |

---

## The core idea: the Testing Pyramid

Not all tests are equal. We organize them in a pyramid — **lots of cheap fast
tests at the bottom, few expensive slow tests at the top.**

```
            /\
           /  \      E2E (Playwright)        ← few, slow, realistic
          /----\        a real browser clicks through the whole site
         /      \
        /--------\   Component + API          ← some, medium speed
       /          \     render the form, call the route handler
      /------------\
     /              \ Unit (Vitest)           ← many, fast, focused
    /----------------\   one function, no browser, milliseconds
```

**Why this shape?**

- **Unit tests** run in milliseconds and pinpoint exactly what broke. If
  `formatPhone("600123456")` returns the wrong thing, one tiny test fails and
  tells you the exact function. Cheap to write, cheap to run → write many.
- **E2E tests** spin up the whole app and a real browser. They catch problems
  nothing else can (routing, real network, real clicks) but they're slow and
  flaky-prone. High value, high cost → write a few for critical flows only.
- **Component/API** sit in the middle: more realistic than a unit test, far
  faster than a browser.

A common mistake is the "ice cream cone" (lots of slow E2E, few unit) — it's
slow and painful. We'll build the pyramid the right way up.

---

## What we'll actually test in *this* project

| Layer | Target in this repo | File |
|-------|--------------------|------|
| Unit | `formatPhone()` — formats a phone as you type | `components/ContactSection.tsx` |
| Unit | `validateContactForm()` — required fields, email/phone rules | (we'll extract it) |
| Unit | `pushEvent()` — Google Tag Manager dataLayer push | `lib/gtm.ts` |
| Component | `<ContactSection />` — fill form, submit, see success | `components/ContactSection.tsx` |
| API | `POST /api/contact` — validation + email send | `app/api/contact/route.ts` |
| API | `GET /api/reviews` — env config + Google Places fetch | `app/api/reviews/route.ts` |
| E2E | Visit site → open contact → submit → success message | the whole app |

---

## Manual vs. Automated — when to use which

- **Manual testing** is a human following a checklist. Irreplaceable for *new*
  features, visual/design checks, "does this feel right", and exploratory
  "what if I do something weird" testing.
- **Automated testing** is code that checks code. Irreplaceable for *regression*
  — making sure the thing that worked yesterday still works today, on every
  commit, without a human re-checking it.

The workflow we're building:

```
You change code
      │
      ▼
Run unit + component + API tests locally   (seconds)   ← Phases 2–4
      │
      ▼
Run E2E before a release                   (a minute)  ← Phase 5
      │
      ▼
Push to GitHub → CI runs ALL of it for you (automatic) ← Phase 6
      │
      ▼
Green check ✅ → safe to deploy
```

Start with `01-manual-testing.md`.
