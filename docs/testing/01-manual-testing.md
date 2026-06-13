# Phase 1 — Manual Testing

Before we automate anything, we test by hand. This teaches you to think like a
tester: **what exactly should happen, and how would I prove it does?**

Automated tests are just manual test cases written in code. So if you can't
describe a test in plain language, you can't automate it either. This phase is
the foundation for everything after.

---

## Anatomy of a test case

Every good test case — manual or automated — has the same shape:

| Part | Meaning | Example |
|------|---------|---------|
| **ID** | A label to refer to it | `TC-CONTACT-03` |
| **Precondition** | The starting state | "On the home page, contact form visible" |
| **Steps** | Exact actions | "Type 'Ana' in Nombre, click Enviar" |
| **Expected result** | What *should* happen | "Error 'Selecciona al menos un servicio' appears" |
| **Actual result** | What *did* happen (you fill in) | ✅ Pass / ❌ Fail + notes |

The magic is in **Expected result**. "Test the form" is useless. "When I submit
with no services selected, I see the error message and the form does *not*
submit" is a test.

---

## Two techniques you'll use constantly

These come straight from the contact form's `validate()` logic.

### 1. Equivalence Partitioning
Group inputs that should behave the same, then test *one* from each group
instead of all of them.

For the **phone field** (`validate()` requires 6–15 digits):
- Group A — too short (0–5 digits): all rejected → test one, e.g. `12345`
- Group B — valid (6–15 digits): all accepted → test one, e.g. `600123456`
- Group C — too long (16+ digits): all rejected → test one

You don't need to test `123`, `1234`, `12345` separately — they're the same
group. One representative is enough.

### 2. Boundary Value Analysis
Bugs love edges. For a 6–15 digit rule, test *right at the boundaries*:
- `5` digits → should fail (just below min)
- `6` digits → should pass (exactly min)
- `15` digits → should pass (exactly max)
- `16` digits → should fail (just above max)

Off-by-one errors (`<` vs `<=`) hide exactly here.

---

## The Manual Test Plan

Work through these by running the site (`npm run dev`, open the printed URL,
scroll to **Contacto**). Mark each Pass/Fail. These same cases reappear as
automated tests in later phases — notice the 1:1 mapping.

### Contact form — validation (the `validate()` function)

| ID | Precondition | Steps | Expected result |
|----|--------------|-------|-----------------|
| TC-01 | Empty form | Click **Enviar solicitud** without filling anything | Errors appear: name required, contact required, services required. Form does NOT submit. |
| TC-02 | Empty form | Type a name, leave phone+email empty, pick a service, submit | Error "Introduce un teléfono o email de contacto". No submit. |
| TC-03 | Name + service filled | Enter phone `12345` (5 digits), submit | Error "Introduce un número de teléfono válido" (below 6-digit min). |
| TC-04 | Name + service filled | Enter phone `600123` (6 digits), submit | Phone accepted (boundary: exactly min). |
| TC-05 | Name + service filled | Enter email `ana@` (malformed), submit | Error "Introduce un email válido". |
| TC-06 | Name + service filled | Enter email `ana@correo.com`, submit | Email accepted. |
| TC-07 | Valid name+phone | Don't pick any service, submit | Error "Selecciona al menos un servicio". |
| TC-08 | — | Click a service chip, then click it again | First click selects (gold border), second click deselects. |

### Contact form — phone formatting (the `formatPhone()` function)

| ID | Steps | Expected result |
|----|-------|-----------------|
| TC-09 | Type `600123456` in phone | Auto-formats to `600 123 456` (groups of 3). |
| TC-10 | Type `+34600123456` | Formats to `+34 600 123 456` (country code + groups). |
| TC-11 | Type letters `abc` | Ignored — only digits appear. |

### Contact form — submission (happy path)

| ID | Precondition | Steps | Expected result |
|----|--------------|-------|-----------------|
| TC-12 | Valid form (name, phone, ≥1 service) | Click **Enviar solicitud** | Button shows "Enviando..." spinner, then a green ✅ "¡Solicitud enviada!" panel replaces the form. |
| TC-13 | After successful submit | Click "← Nueva solicitud" | Form returns, all fields cleared. |
| TC-14 | Valid form, but server down (simulate by going offline) | Submit | Error "Error al enviar. Inténtalo de nuevo..." appears; form stays. |

### Accessibility & cross-cutting (manual-only — hard to automate)

| ID | Steps | Expected result |
|----|-------|-----------------|
| TC-15 | Tab through the form with keyboard only | Every field reachable in logical order, focus ring visible. |
| TC-16 | Submit invalid form, inspect with screen reader / devtools | Error messages have `role="alert"` and inputs get `aria-invalid="true"`. |
| TC-17 | Resize browser to mobile width (~375px) | Form stacks to one column, nothing overflows. |
| TC-18 | Click phone/email contact links | `tel:` and `mailto:` open; a GTM event fires (check `window.dataLayer` in console). |

---

## How to run a manual pass

1. `npm run dev`
2. Open the URL, go to **Contacto**.
3. Go down the table top to bottom. For each row: do the steps, compare to
   Expected, mark ✅ or ❌.
4. For any ❌, write what *actually* happened — that's your bug report.

A bug report needs: **what you did**, **what you expected**, **what happened**,
and ideally a screenshot. "It's broken" is not a bug report.

---

## Why we now automate

Manual testing TC-01 through TC-14 takes ~10 minutes. You will not do it on
every commit — nobody does. So bugs sneak back in (a "regression"). The fix:
turn these exact cases into code that runs in 2 seconds on every change.

That's Phase 2. Notice that TC-09/10/11 (phone formatting) become unit tests,
TC-01–08 become component tests, TC-12–14 become an E2E test. The manual plan
*is* the spec for the automated suite.

→ Continue to `02-unit-tests.md`.
