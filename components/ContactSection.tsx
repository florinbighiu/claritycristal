"use client";

import { useState } from "react";
import { pushEvent } from "@/lib/gtm";
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
      className="py-24 lg:py-32 bg-white"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <div>
            <p className="reveal text-gold font-semibold text-sm uppercase tracking-widest mb-3">
              Contacto
            </p>
            <h2
              id="contact-heading"
              className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-bold text-volcanic mb-6"
            >
              Solicita tu{" "}
              <span className="italic text-ocean">presupuesto gratis</span>
            </h2>
            <p className="reveal reveal-delay-2 text-volcanic/60 text-lg mb-10 leading-relaxed">
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
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-pearl transition-colors group"
                  aria-label={`${c.label}: ${c.value}`}
                >
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0 group-hover:bg-gold/20 transition-colors">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs text-volcanic/40 font-medium uppercase tracking-wide mb-0.5">
                      {c.label}
                    </p>
                    <p className="text-volcanic font-medium">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="reveal mt-8 p-5 bg-gold/5 border border-gold/20 rounded-2xl">
              <p className="font-semibold text-volcanic text-sm mb-1">🛡️ Garantía de satisfacción</p>
              <p className="text-volcanic/60 text-sm">
                Si no queda perfecto, volvemos sin coste alguno. Sin excusas, sin letra pequeña.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="reveal reveal-delay-2">
            {submitted ? (
              <div className="bg-pearl border border-smoke rounded-2xl p-7 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-display text-2xl font-bold text-volcanic mb-3">
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
              className="bg-pearl border border-smoke rounded-2xl p-7 space-y-5"
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
                      className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
                        form.services.includes(s)
                          ? "bg-gold/10 border-gold text-gold"
                          : "bg-white border-smoke text-volcanic/60 hover:border-gold/40"
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
                className="btn-gold w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-xl text-sm disabled:opacity-60 disabled:cursor-not-allowed"
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
