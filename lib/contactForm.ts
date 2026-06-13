// Pure, framework-free logic for the contact form.
//
// We keep this OUT of the React component so it can be unit-tested in isolation
// (no browser, no rendering) and reused by both the UI and the API route.
// A "pure" function just maps inputs to outputs with no side effects — the
// easiest kind of code to test.

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_SERVICES = [
  "Limpieza de ventanas",
  "Limpieza de paneles solares",
  "Limpieza post-obra",
  "Rótulos/Carteles y/o Fachadas",
  "Servicio urgente",
] as const;

export type ContactForm = {
  name: string;
  phone: string;
  email: string;
  services: string[];
  frequency: string;
  message: string;
};

/**
 * Formats a phone number as the user types.
 * - Strips non-digits.
 * - Groups digits in threes: "600123456" -> "600 123 456".
 * - Preserves a leading "+" and treats the first two digits as a country code:
 *   "+34600123456" -> "+34 600 123 456".
 */
export function formatPhone(value: string): string {
  const hasPlus = value.trimStart().startsWith("+");
  const digits = value.replace(/\D/g, "");
  if (!digits) return hasPlus ? "+" : "";

  if (hasPlus) {
    const countryCode = digits.slice(0, 2);
    const rest = digits.slice(2);
    const groups = rest.match(/\d{1,3}/g) ?? [];
    return "+" + countryCode + (groups.length ? " " + groups.join(" ") : "");
  }

  const groups = digits.match(/\d{1,3}/g) ?? [];
  return groups.join(" ");
}

/**
 * Validates the contact form. Returns a map of fieldName -> error message.
 * An empty object means the form is valid.
 *
 * Rules:
 * - name is required
 * - at least one of phone/email is required
 * - if phone given, it must have 6–15 digits
 * - if email given, it must match EMAIL_REGEX
 * - at least one service must be selected
 */
export function validateContactForm(form: ContactForm): Record<string, string> {
  const e: Record<string, string> = {};
  if (!form.name.trim()) e.name = "El nombre es obligatorio";

  const phoneEmpty = !form.phone.trim();
  const emailEmpty = !form.email.trim();

  if (phoneEmpty && emailEmpty) {
    e.contact = "Introduce un teléfono o email de contacto";
  } else {
    const digitCount = form.phone.replace(/\D/g, "").length;
    if (!phoneEmpty && (digitCount < 6 || digitCount > 15)) {
      e.phone = "Introduce un número de teléfono válido";
    }
    if (!emailEmpty && !EMAIL_REGEX.test(form.email.trim())) {
      e.email = "Introduce un email válido (ej: tu@email.com)";
    }
  }

  if (form.services.length === 0) e.services = "Selecciona al menos un servicio";
  return e;
}
