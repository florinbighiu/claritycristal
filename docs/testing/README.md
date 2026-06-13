# Testing Course — ClarityCristal

A hands-on testing course built on this real project. Read the numbered docs in
order; each explains the concepts, then points at real, runnable code.

1. [`00-roadmap.md`](./00-roadmap.md) — the testing pyramid, the big picture
2. [`01-manual-testing.md`](./01-manual-testing.md) — testing by hand, test-case design
3. [`02-unit-tests.md`](./02-unit-tests.md) — pure logic with Vitest
4. [`03-component-tests.md`](./03-component-tests.md) — the React form with Testing Library
5. [`04-api-tests.md`](./04-api-tests.md) — server routes with mocks
6. [`05-e2e-tests.md`](./05-e2e-tests.md) — a real browser with Playwright
7. [`06-ci-cd.md`](./06-ci-cd.md) — automate it all with GitHub Actions

## Commands

```bash
npm run typecheck     # tsc --noEmit
npm test              # all Vitest tests once (unit + component + api)
npm run test:watch    # re-run on save while developing
npm run test:coverage # coverage report → coverage/index.html
npm run e2e           # Playwright E2E (builds app, runs Chromium)
npm run e2e:ui        # Playwright visual debugger
```

## Where the code lives

```
lib/contactForm.ts            ← logic extracted to be testable
tests/unit/                   ← Phase 2
tests/component/              ← Phase 3
tests/api/                    ← Phase 4
e2e/                          ← Phase 5
vitest.config.ts, vitest.setup.ts, vitest.d.ts
playwright.config.ts
.github/workflows/ci.yml      ← Phase 6
```
