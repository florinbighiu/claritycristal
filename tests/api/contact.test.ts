// @vitest-environment node
//
// API ROUTE TESTS — Phase 4 (POST /api/contact)
//
// We import the route's POST handler and call it directly with a fake Request,
// then inspect the Response. No HTTP server needed — a Next.js route handler is
// just an async function: (Request) => Response.
//
// The route sends email through the `resend` package. We must NOT send real
// email in a test, so we MOCK the entire "resend" module with a fake whose
// .emails.send we control and spy on.
//
// The docblock at the very top (@vitest-environment node) makes THIS FILE run
// in a Node environment instead of the project default (jsdom). Server code has
// no DOM, and Node is closer to how the route actually runs in production.

import { describe, it, expect, vi, beforeEach } from "vitest";

// vi.hoisted runs before the (hoisted) vi.mock and module imports, so sendMock
// exists when the mock factory references it. This is the standard way to get a
// handle on a mocked function you want to assert against later.
const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock("resend", () => ({
  // The route does `new Resend(apiKey)` then `resend.emails.send(...)`.
  // Because it's called with `new`, the mock must be constructable — so we use
  // a `function` (arrow functions can't be used with `new`). It returns an
  // object with the exact shape the route expects.
  Resend: vi.fn(function () {
    return { emails: { send: sendMock } };
  }),
}));

// Import AFTER the mock is registered, so the route picks up the fake resend.
import { POST } from "@/app/api/contact/route";

// Small helper to build a POST Request with a JSON body, like the browser sends.
function postRequest(body: unknown): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: "Ana García",
  phone: "600 123 456",
  email: "ana@correo.com",
  services: ["Limpieza de ventanas"],
  frequency: "Mensual",
  message: "Tengo 12 ventanas",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    // Default: pretend the email send succeeds (resend returns { error: null }).
    sendMock.mockReset();
    sendMock.mockResolvedValue({ error: null });
  });

  // --- Validation: these mirror the server-side guard, the safety net behind
  //     the client-side validation we already tested. Never trust the client. ---

  it("rejects a request with no name (400) and sends no email", async () => {
    const res = await POST(postRequest({ ...validBody, name: "" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Datos incompletos" });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects when both phone and email are missing (400)", async () => {
    const res = await POST(postRequest({ ...validBody, phone: "", email: "" }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects when no services are selected (400)", async () => {
    const res = await POST(postRequest({ ...validBody, services: [] }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  // --- Happy path ---

  it("accepts a valid request (200) and sends one email", async () => {
    const res = await POST(postRequest(validBody));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });

    // It sent exactly one email...
    expect(sendMock).toHaveBeenCalledTimes(1);
    // ...to the business inbox, with the customer name in the subject,
    // and replyTo set to the customer's email so a reply reaches them.
    const payload = sendMock.mock.calls[0][0];
    expect(payload.to).toBe("info@claritycristal.com");
    expect(payload.subject).toContain("Ana García");
    expect(payload.replyTo).toBe("ana@correo.com");
    // The chosen services end up in the email body.
    expect(payload.html).toContain("Limpieza de ventanas");
  });

  it("omits replyTo when the customer left email empty", async () => {
    await POST(postRequest({ ...validBody, email: "" }));
    const payload = sendMock.mock.calls[0][0];
    expect(payload.replyTo).toBeUndefined();
  });

  // --- Failure path: the email provider errors → route returns 500 ---

  it("returns 500 when the email provider fails", async () => {
    sendMock.mockResolvedValue({ error: { message: "Resend is down" } });
    const res = await POST(postRequest(validBody));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Resend is down" });
  });
});
