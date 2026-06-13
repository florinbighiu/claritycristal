import { defineConfig, devices } from "@playwright/test";

// Playwright config — drives a REAL browser against a REAL running build of the
// app. This is separate from Vitest (which handles unit/component/api).
export default defineConfig({
  testDir: "./e2e",

  // Fail the CI build if someone accidentally commits a test.only().
  forbidOnly: !!process.env.CI,
  // Retry flaky tests once on CI (real browsers/network are less deterministic).
  retries: process.env.CI ? 1 : 0,
  reporter: "html",

  use: {
    // Tests can navigate with relative paths like page.goto("/").
    baseURL: "http://localhost:3000",
    // Capture a trace (DOM snapshots + actions) on first retry — invaluable for
    // debugging why an E2E test failed. Open with: npx playwright show-trace
    trace: "on-first-retry",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // Add more browsers later, e.g.:
    // { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    // { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],

  // Playwright starts the app itself before running tests, and shuts it down
  // after. We build + start (production-like) rather than `dev` for speed and
  // realism. reuseExistingServer lets you keep a local server running between
  // runs during development.
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // The /api/contact route constructs `new Resend(KEY)` at module load, and
    // Resend throws if KEY is missing — which would break `next build` locally.
    // E2E intercepts that API call in the browser, so the key is never actually
    // used; a dummy value just lets the build/start succeed without real secrets.
    env: {
      RESEND_API_KEY: process.env.RESEND_API_KEY ?? "re_dummy_key_for_tests",
    },
  },
});
