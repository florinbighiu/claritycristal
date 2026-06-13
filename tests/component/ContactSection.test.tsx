// COMPONENT TESTS — Phase 3
//
// We render the real <ContactSection /> into a simulated DOM (jsdom) and drive
// it the way a user would: type into fields, click buttons, read messages.
//
// Guiding principle of React Testing Library (RTL):
//   "Test behavior, not implementation."
// We never check component state or internal variables. We find elements the
// way a human/screen-reader would (by label, role, text) and assert on what's
// visible. This means the tests survive refactors as long as behavior holds.
//
// Tools:
//   render(...)            mounts the component into jsdom
//   screen.getByLabelText  finds an input by its <label> (accessible query)
//   userEvent             simulates real typing/clicking (async)
//   vi.fn / vi.stubGlobal  create mocks (fake functions) — here, fake fetch

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactSection } from "@/components/ContactSection";

// Helper: fill the form with valid data so each test starts from "almost ready
// to submit" and only varies what it's testing.
async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/nombre/i), "Ana García");
  await user.type(screen.getByLabelText(/^teléfono$/i), "600123456");
  await user.click(screen.getByRole("button", { name: "Limpieza de ventanas" }));
}

describe("<ContactSection />", () => {
  beforeEach(() => {
    // Reset GTM's dataLayer and any mocks before each test (isolation).
    window.dataLayer = [];
    vi.restoreAllMocks();
  });

  it("renders the form with its key fields", () => {
    render(<ContactSection />);
    // getByRole throws if not found, so these double as assertions.
    expect(screen.getByRole("heading", { name: /solicita tu/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar solicitud/i })).toBeInTheDocument();
  });

  // TC-01: submit an empty form → validation errors, no network call.
  it("blocks submit and shows errors when the form is empty", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactSection />);
    await user.click(screen.getByRole("button", { name: /enviar solicitud/i }));

    // Errors are rendered with role="alert" — assert the user sees them.
    expect(await screen.findByText("El nombre es obligatorio")).toBeInTheDocument();
    expect(screen.getByText("Selecciona al menos un servicio")).toBeInTheDocument();
    // Crucially: it must NOT have hit the network.
    expect(fetchMock).not.toHaveBeenCalled();
  });

  // TC-02: name present but no phone and no email.
  it("requires a phone or email", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn());

    render(<ContactSection />);
    await user.type(screen.getByLabelText(/nombre/i), "Ana");
    await user.click(screen.getByRole("button", { name: "Limpieza de ventanas" }));
    await user.click(screen.getByRole("button", { name: /enviar solicitud/i }));

    expect(
      await screen.findByText("Introduce un teléfono o email de contacto")
    ).toBeInTheDocument();
  });

  // TC-08: service chips toggle on/off and update their pressed state.
  it("toggles a service chip on and off", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    const chip = screen.getByRole("button", { name: "Limpieza de paneles solares" });
    // aria-pressed reflects selection — accessible and testable.
    expect(chip).toHaveAttribute("aria-pressed", "false");
    await user.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "true");
    await user.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "false");
  });

  // TC-09 (integration): typing into the phone field formats live.
  it("formats the phone number as you type", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    const phone = screen.getByLabelText(/^teléfono$/i) as HTMLInputElement;
    await user.type(phone, "600123456");
    expect(phone.value).toBe("600 123 456");
  });

  // TC-12: the happy path — valid form submits, success panel appears,
  // and the GTM conversion event fires. fetch is mocked to a 200.
  it("submits successfully and shows the confirmation panel", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactSection />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /enviar solicitud/i }));

    // The success heading replaces the form.
    expect(await screen.findByText("¡Solicitud enviada!")).toBeInTheDocument();

    // It called our API exactly once, with the right method + payload shape.
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(options.method).toBe("POST");
    const body = JSON.parse(options.body);
    expect(body.name).toBe("Ana García");
    expect(body.services).toContain("Limpieza de ventanas");

    // And it fired the analytics conversion event.
    expect(window.dataLayer).toContainEqual({ event: "form_submit_contact" });
  });

  // TC-13: from the success panel, "Nueva solicitud" returns an empty form.
  it("resets back to an empty form after success", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));

    render(<ContactSection />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /enviar solicitud/i }));
    await screen.findByText("¡Solicitud enviada!");

    await user.click(screen.getByRole("button", { name: /nueva solicitud/i }));

    // Form is back and the name field is empty again.
    const name = screen.getByLabelText(/nombre/i) as HTMLInputElement;
    expect(name.value).toBe("");
  });

  // TC-14: server returns an error → user sees a recoverable error message,
  // the form is NOT replaced by the success panel.
  it("shows an error message when the server fails", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    render(<ContactSection />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /enviar solicitud/i }));

    expect(await screen.findByText(/error al enviar/i)).toBeInTheDocument();
    expect(screen.queryByText("¡Solicitud enviada!")).not.toBeInTheDocument();
  });
});
