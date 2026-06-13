// Runs before every test file (configured via setupFiles in vitest.config.ts).
//
// This single import adds DOM-aware assertions to `expect`, e.g.
//   expect(element).toBeInTheDocument()
//   expect(input).toBeInvalid()
// which we'll use heavily in the component tests (Phase 3).
import "@testing-library/jest-dom/vitest";
