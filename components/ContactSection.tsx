"use client";

import { useState } from "react";
import { pushEvent } from "@/lib/gtm";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import {
  CONTACT_SERVICES,
  formatPhone,
  validateContactForm,
} from "@/lib/contactForm";

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    services: [] as string[],
    frequency: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateContactForm(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSending(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSending(false);

    if (res.ok) {
      setSubmitted(true);
      pushEvent("form_submit_contact");
    } else {
      setErrors({ submit: "Error al enviar. Inténtalo de nuevo o contáctanos por WhatsApp." });
    }
  };

  const toggleService = (s: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }));
    setErrors((e) => { const { services: _, ...rest } = e; return rest; });
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrors({});
    setForm({ name: "", phone: "", email: "", services: [], frequency: "", message: "" });
    setFormKey((k) => k + 1);
  };

  return (
    <section
      id="contacto"
      className="cc-paper-bg-alt cc-seam-top noise relative overflow-hidden py-24 lg:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="cc-grid absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Info */}
          <div>
            <div className="reveal">
              <SectionEyebrow index="08" label="Contacto" tone="light" />
            </div>
            <h2
              id="contact-heading"
              className="reveal reveal-delay-1 mt-6 mb-6 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-[3.4rem] lg:leading-[1.02]"
            >
              Solicita tu{" "}
              <span className="italic text-ocean">presupuesto gratis</span>
            </h2>
            <p className="reveal reveal-delay-2 mb-10 text-lg leading-relaxed text-volcanic/70">
              Rellena el formulario y te enviamos una cotización detallada adaptada a tus
              necesidades. Sin compromiso, sin letra pequeña.
            </p>

            <div className="reveal reveal-delay-2 space-y-5">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ),
                  label: "Teléfono / WhatsApp",
                  value: "+34 604 234 496",
                  href: "tel:+34604234496",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  label: "Email",
                  value: "info@claritycristal.com",
                  href: "mailto:info@claritycristal.com",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => pushEvent(c.href.startsWith("tel:") ? "click_phone" : "click_email", { location: "contact" })}
                  className="group flex items-start gap-4 rounded-xl border border-volcanic/10 bg-white/70 p-4 shadow-sm shadow-volcanic/5 transition-colors hover:bg-white"
                  aria-label={`${c.label}: ${c.value}`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ocean/10 text-ocean transition-colors group-hover:bg-ocean/20">
                    {c.icon}
                  </div>
                  <div>
                    <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-volcanic/55">
                      {c.label}
                    </p>
                    <p className="font-medium text-volcanic">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="reveal mt-8 rounded-2xl border border-gold/40 bg-gold/10 p-5">
              <p className="mb-1 text-sm font-semibold text-volcanic">🛡️ Garantía de satisfacción</p>
              <p className="text-sm text-volcanic/70">
                Si no queda perfecto, volvemos sin coste alguno. Sin excusas, sin letra pequeña.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="reveal reveal-delay-2">
            {submitted ? (
              <div className="rounded-2xl border border-volcanic/10 bg-white p-7 text-center shadow-2xl shadow-black/20">
                <div className="mb-4 text-5xl">✅</div>
                <h3 className="mb-3 font-display text-2xl font-semibold text-volcanic">
                  ¡Solicitud enviada!
                </h3>
                <p className="text-volcanic/60 mb-6">
                  Hemos recibido tu solicitud. Te responderemos en menos de 24 horas con tu presupuesto personalizado.
                </p>
                <button onClick={handleReset} className="text-gold font-semibold hover:underline">
                  ← Nueva solicitud
                </button>
              </div>
            ) : (
            <form
              key={formKey}
              onSubmit={handleSubmit}
              className="cc-topline space-y-5 overflow-hidden rounded-2xl border border-volcanic/10 bg-white p-7 shadow-2xl shadow-black/20"
              noValidate
              aria-label="Formulario de solicitud de presupuesto"
            >
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-volcanic mb-1.5">
                  Nombre <span className="text-red-500" aria-label="requerido">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setErrors((prev) => { const { name: _, ...rest } = prev; return rest; });
                  }}
                  className={`w-full rounded-xl border px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 transition ${errors.name ? "border-red-400" : "border-smoke"}`}
                  placeholder="Tu nombre completo"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-semibold text-volcanic mb-1.5">
                    Teléfono
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => {
                      setForm({ ...form, phone: formatPhone(e.target.value) });
                      setErrors((prev) => { const { phone: _, contact: __, ...rest } = prev; return rest; });
                    }}
                    className={`w-full rounded-xl border px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 transition ${errors.phone || errors.contact ? "border-red-400" : "border-smoke"}`}
                    placeholder="+34 600 000 000"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && <p id="phone-error" className="text-red-500 text-xs mt-1" role="alert">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-volcanic mb-1.5">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      setErrors((prev) => { const { email: _, contact: __, ...rest } = prev; return rest; });
                    }}
                    className={`w-full rounded-xl border px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 transition ${errors.email || errors.contact ? "border-red-400" : "border-smoke"}`}
                    placeholder="tu@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
                </div>
              </div>
              {errors.contact && <p className="text-red-500 text-xs -mt-3" role="alert">{errors.contact}</p>}

              <div>
                <p className="block text-sm font-semibold text-volcanic mb-2">
                  Servicios <span className="text-red-500" aria-label="requerido">*</span>
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Seleccionar servicios">
                  {CONTACT_SERVICES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggleService(s)}
                      aria-pressed={form.services.includes(s)}
                      className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${
                        form.services.includes(s)
                          ? "bg-gold/15 border-gold text-volcanic ring-1 ring-gold"
                          : "bg-white border-smoke text-volcanic/60 font-medium hover:border-gold/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {errors.services && <p className="text-red-500 text-xs mt-1" role="alert">{errors.services}</p>}
              </div>

              <div>
                <label htmlFor="contact-frequency" className="block text-sm font-semibold text-volcanic mb-1.5">
                  Frecuencia
                </label>
                <select
                  id="contact-frequency"
                  value={form.frequency}
                  onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                  className="w-full rounded-xl border border-smoke px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 transition"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Una sola vez">Una sola vez</option>
                  <option value="Mensual">Mensual</option>
                  <option value="Bimensual">Bimensual</option>
                  <option value="Trimestral">Trimestral</option>
                  <option value="Personalizado">Personalizado</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-volcanic mb-1.5">
                  Mensaje adicional
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-smoke px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 transition resize-none"
                  placeholder="Cuéntanos más sobre tu propiedad, número de ventanas..."
                />
              </div>

              {errors.submit && (
                <p className="text-red-500 text-sm text-center" role="alert">{errors.submit}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="btn-gold w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Enviar solicitud de presupuesto"
              >
                {sending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Enviar solicitud
                  </>
                )}
              </button>

              <p className="text-center text-xs text-volcanic/40">
                🔒 Tus datos están protegidos · Si no queda perfecto, volvemos gratis
              </p>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
