// UNIT TESTS — Phase 2
//
// We test pure functions from lib/contactForm.ts in complete isolation:
// no browser, no React, no network. These run in milliseconds.
//
// Vocabulary you'll see:
//   describe(...)  groups related tests
//   it(...)        one test case (alias: test)
//   expect(x)      makes an assertion about x
//   .toBe(y)       asserts x === y (the "matcher")
//
// `globals: true` in vitest.config.ts means we don't import describe/it/expect.

import { formatPhone, validateContactForm, type ContactForm } from "@/lib/contactForm";

// ---------------------------------------------------------------------------
// formatPhone  (maps to manual cases TC-09, TC-10, TC-11)
// ---------------------------------------------------------------------------
describe("formatPhone", () => {
  it("groups local digits in threes (TC-09)", () => {
    expect(formatPhone("600123456")).toBe("600 123 456");
  });

  it("keeps a country code with a leading + (TC-10)", () => {
    expect(formatPhone("+34600123456")).toBe("+34 600 123 456");
  });

  it("ignores non-digit characters (TC-11)", () => {
    // Letters and symbols are stripped; only digits survive.
    expect(formatPhone("abc600def123")).toBe("600 123");
  });

  // Edge cases — the inputs that break naive implementations.
  it("returns empty string for empty input", () => {
    expect(formatPhone("")).toBe("");
  });

  it("returns just '+' when only a plus is typed", () => {
    expect(formatPhone("+")).toBe("+");
  });

  it("handles a trailing partial group", () => {
    expect(formatPhone("6001")).toBe("600 1");
  });
});

// ---------------------------------------------------------------------------
// validateContactForm  (maps to manual cases TC-01 through TC-07)
// ---------------------------------------------------------------------------

// A helper so each test only specifies what's relevant, defaults fill the rest.
// This keeps tests readable — a common, recommended pattern.
function makeForm(overrides: Partial<ContactForm> = {}): ContactForm {
  return {
    name: "Ana",
    phone: "600123456",
    email: "",
    services: ["Limpieza de ventanas"],
    frequency: "",
    message: "",
    ...overrides,
  };
}

describe("validateContactForm", () => {
  it("accepts a valid form (no errors)", () => {
    const errors = validateContactForm(makeForm());
    // An empty object means valid. Object.keys(...).length === 0 proves it.
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("requires a name (TC-01)", () => {
    const errors = validateContactForm(makeForm({ name: "" }));
    expect(errors.name).toBe("El nombre es obligatorio");
  });

  it("requires phone OR email (TC-02)", () => {
    const errors = validateContactForm(makeForm({ phone: "", email: "" }));
    expect(errors.contact).toBe("Introduce un teléfono o email de contacto");
  });

  it("requires at least one service (TC-07)", () => {
    const errors = validateContactForm(makeForm({ services: [] }));
    expect(errors.services).toBe("Selecciona al menos un servicio");
  });

  // --- Boundary Value Analysis on the 6–15 digit phone rule (TC-03, TC-04) ---
  // We test right at the edges, where off-by-one bugs hide.
  describe("phone digit-count boundaries", () => {
    it("rejects 5 digits (just below min) — TC-03", () => {
      const errors = validateContactForm(makeForm({ phone: "12345" }));
      expect(errors.phone).toBe("Introduce un número de teléfono válido");
    });

    it("accepts 6 digits (exactly min) — TC-04", () => {
      const errors = validateContactForm(makeForm({ phone: "123456" }));
      expect(errors.phone).toBeUndefined();
    });

    it("accepts 15 digits (exactly max)", () => {
      const errors = validateContactForm(makeForm({ phone: "123456789012345" }));
      expect(errors.phone).toBeUndefined();
    });

    it("rejects 16 digits (just above max)", () => {
      const errors = validateContactForm(makeForm({ phone: "1234567890123456" }));
      expect(errors.phone).toBe("Introduce un número de teléfono válido");
    });
  });

  // --- Email validation (TC-05, TC-06) ---
  describe("email format", () => {
    // it.each runs the same test body over a table of cases — concise and
    // it reports each row separately so you see exactly which input failed.
    it.each([
      ["ana@", false],
      ["ana@correo", false],
      ["@correo.com", false],
      ["ana correo.com", false],
      ["ana@correo.com", true],
      ["a.b+tag@sub.domain.es", true],
    ])("email %s -> valid=%s", (email, isValid) => {
      // Use email-only (no phone) so the email rule is what's exercised.
      const errors = validateContactForm(makeForm({ phone: "", email }));
      if (isValid) {
        expect(errors.email).toBeUndefined();
      } else {
        expect(errors.email).toBe("Introduce un email válido (ej: tu@email.com)");
      }
    });
  });
});
