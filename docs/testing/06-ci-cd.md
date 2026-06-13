# Phase 6 — CI/CD

We have a full test suite. The last problem: **a test only helps if it actually
runs.** People forget. So we make the suite run *itself*, automatically, on a
server, for every change — and block broken code from merging.

That's **CI** (Continuous Integration): every push/PR is automatically built and
tested. **CD** (Continuous Delivery/Deployment) is the next step — automatically
deploying when tests pass. This project already auto-deploys via **Vercel** on
push to `main`, so our job is to put a *test gate* in front of that.

File: `.github/workflows/ci.yml`.

---

## How GitHub Actions works (the vocabulary)

A **workflow** is a YAML file in `.github/workflows/`. GitHub runs it on events
you specify.

```yaml
on:                  # the trigger
  push:
    branches: [main]
  pull_request:      # also on every PR
```

- **Job** — an independent task that runs on a fresh virtual machine
  (`runs-on: ubuntu-latest`). Jobs run **in parallel** by default.
- **Step** — one command or action inside a job, run in order.
- **Action** — a reusable step published by others, referenced with `uses:`
  (e.g. `actions/checkout@v4` to clone your repo onto the runner).

Our workflow has **two jobs that run in parallel**:

| Job | Does | Speed |
|-----|------|-------|
| `test` | type-check + Vitest (unit/component/api) | seconds |
| `e2e` | build app + Playwright in real Chromium | a minute+ |

Splitting them means the fast feedback isn't stuck behind the slow build — you
see unit failures almost immediately.

---

## Walking through job 1 (`test`)

```yaml
steps:
  - uses: actions/checkout@v4          # 1. clone the repo onto the runner
  - uses: actions/setup-node@v4        # 2. install Node 20
    with:
      node-version: 20
      cache: npm                       #    cache ~/.npm for faster reruns
  - run: npm ci                        # 3. clean install from package-lock
  - run: npm run typecheck             # 4. tsc --noEmit
  - run: npm test                      # 5. vitest run
```

Key detail: **`npm ci`, not `npm install`.** `ci` does a clean, exact install
from `package-lock.json` and fails if the lockfile is out of sync. It's
reproducible — the whole point of CI. (This is also why we fixed the corrupt
SWC binary by reinstalling: CI would have done a clean `npm ci` and gotten a
correct binary anyway.)

If any step exits non-zero, the job fails, the red ✗ shows on the PR, and (with
branch protection, below) the merge button is blocked.

---

## Walking through job 2 (`e2e`)

```yaml
  - run: npx playwright install --with-deps chromium  # browser + OS libs
  - run: npm run e2e                                   # build + start + test
  - uses: actions/upload-artifact@v4                   # save the report
    if: always()
    with:
      name: playwright-report
      path: playwright-report/
```

Two things worth calling out:

1. **`--with-deps`** installs the Linux system libraries the browser needs —
   necessary on a clean CI runner (your laptop already had them).
2. **`if: always()` + upload-artifact.** When an E2E test fails on CI you can't
   watch the screen, so we upload the HTML report (with traces) as a downloadable
   artifact on the run page. That's how you debug a remote failure.

No secrets are required: `playwright.config.ts` falls back to a dummy
`RESEND_API_KEY`, and the test intercepts `/api/contact`, so CI needs nothing
from your Resend account.

---

## Closing the loop: branch protection

The workflow *reports* status, but to actually *block* bad merges you enable a
repo setting (one-time, in GitHub):

**Settings → Branches → Add branch ruleset for `main` → Require status checks to
pass before merging → select `test` and `e2e`.**

After that:

```
Open PR ──▶ CI runs test + e2e ──▶ all green? ──▶ merge enabled ──▶ Vercel deploys
                                 └─ any red?  ──▶ merge BLOCKED
```

Now a regression literally cannot reach `main`. The manual checklist from
Phase 1 that used to rely on someone remembering is now enforced by a machine on
every change.

---

## The complete picture

```
            Local (you)                         GitHub (automatic)
  ┌─────────────────────────────┐     ┌────────────────────────────────┐
  │ edit code                   │     │ push / open PR                 │
  │ npm test        (seconds)   │ ──▶ │  job: test  → typecheck+vitest │
  │ npm run e2e     (when big)  │     │  job: e2e   → build+playwright │
  │ npm run typecheck           │     │            ▼                   │
  └─────────────────────────────┘     │   all green → merge → Vercel   │
                                       │   any red   → blocked          │
                                       └────────────────────────────────┘
```

You run the fast tests constantly while coding; CI runs *everything* as the
gate. Same tests, two moments.

---

## Recap of the whole journey

| Phase | Layer | Tool | Speed | Confidence |
|-------|-------|------|-------|-----------|
| 1 | Manual | a checklist | slow (human) | exploratory |
| 2 | Unit | Vitest | ⚡ ms | logic correct |
| 3 | Component | Vitest + RTL | fast | UI behaves |
| 4 | API | Vitest + mocks | fast | server contract |
| 5 | E2E | Playwright | slow | whole thing works |
| 6 | CI/CD | GitHub Actions | — | runs forever, automatically |

You built the pyramid the right way up: many fast tests at the base, a few slow
ones at the top, all enforced automatically. That's a professional testing
setup — on a real project, written by you.
