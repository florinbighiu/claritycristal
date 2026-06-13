// Makes Vitest's global APIs (describe/it/expect/vi/beforeEach/...) known to
// TypeScript. They're available at runtime because vitest.config.ts sets
// `globals: true`; this line tells the type-checker about them too, without
// having to import them in every test file.
/// <reference types="vitest/globals" />
