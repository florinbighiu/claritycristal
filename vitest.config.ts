import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  // Lets Vitest understand JSX/TSX (needed for component tests in Phase 3).
  plugins: [react()],
  test: {
    // Make describe/it/expect available without importing them in every file.
    globals: true,
    // Simulate a browser DOM in Node so component tests can render React.
    // (Unit tests of pure functions don't need it, but it's harmless.)
    environment: "jsdom",
    // Runs once before the test files — registers extra matchers like
    // toBeInTheDocument(). See vitest.setup.ts.
    setupFiles: ["./vitest.setup.ts"],
    // Only pick up our automated unit/component/api tests, not Playwright E2E.
    include: ["tests/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["lib/**", "components/**", "app/api/**"],
    },
  },
  resolve: {
    // Mirror the "@/*" path alias from tsconfig.json so imports like
    // "@/lib/contactForm" resolve in tests too.
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
