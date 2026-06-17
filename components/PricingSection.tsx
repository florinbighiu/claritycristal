"use client";

import { useState } from "react";
import { PLANS, WA_LINK, type PlanKey } from "@/lib/data";
import { pushEvent } from "@/lib/gtm";
import { SectionEyebrow } from "@/components/SectionEyebrow";

export function PricingSection() {
  const [, setActivePlan] = useState<PlanKey>("plus");

  return (
    <section
      id="precios"
      className="cc-paper-bg-alt cc-seam-top relative overflow-hidden py-24 lg:py-32"
      aria-labelledby="pricing-heading"
    >
      <div className="cc-grid absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[90rem] px-5 lg:px-8">
        {/* Recurring plans */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="reveal">
            <SectionEyebrow index="05" label="Ahorra con planes recurrentes" align="center" />
          </div>
          <h3 id="pricing-heading" className="reveal reveal-delay-1 mt-6 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-5xl">
            Contratos de mantenimiento
          </h3>
          <div className="reveal reveal-delay-2 mt-8 flex max-w-3xl items-start gap-4 rounded-2xl border border-volcanic/10 bg-white/70 p-5 text-left backdrop-blur-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-volcanic mb-1">Cómo funciona</p>
              <p className="text-volcanic/70 text-sm leading-relaxed">
                En tu primera limpieza calculamos y fijamos tu precio. A partir de ahí,
                ese precio queda congelado todo el año y cada sesión dentro de tu plan
                tiene descuento. Cuanto más a menudo, más barata te sale cada visita.
              </p>
              <p className="mt-3 text-volcanic/70 text-xs leading-relaxed">
                <span className="font-semibold text-volcanic">Ejemplo orientativo:</span> una
                limpieza de 100€ quedaría en 90€ (Esencial), 85€ (Plus) u 80€ (Elite) por
                sesión. Tu precio real se calcula en la primera visita.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
          {PLANS.map((plan, i) => (
            <article
              key={plan.key}
              onClick={() => setActivePlan(plan.key)}
              className={`reveal reveal-delay-${i + 1} cc-topline relative flex flex-col overflow-hidden rounded-[20px] ${
                plan.popular
                  ? "cc-card-ink text-white lg:-mt-4 lg:mb-4"
                  : "cc-card"
              }`}
            >
              {plan.badge && (
                <div className="bg-gold px-4 py-1.5 text-center text-xs font-bold uppercase tracking-wider text-volcanic">
                  {plan.badge}
                </div>
              )}
              <div className="flex-1 p-7">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className={`font-display text-xl font-semibold ${plan.popular ? "text-white" : "text-volcanic"}`}>
                    {plan.name}
                  </h3>
                  <span className={`cc-mono text-[11px] tracking-widest ${plan.popular ? "text-white/30" : "text-volcanic/25"}`} aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
                <p className={`mb-5 text-sm ${plan.popular ? "text-white/60" : "text-volcanic/50"}`}>
                  {plan.cadence}
                </p>
                <div className="mb-5 flex items-baseline gap-3">
                  <div className={`font-display text-5xl font-semibold ${plan.popular ? "text-gold" : "text-volcanic"}`}>
                    -{plan.discount}%
                  </div>
                  <span className={`text-sm ${plan.popular ? "text-white/60" : "text-volcanic/50"}`}>
                    por sesión
                  </span>
                </div>
                <ul className="space-y-2.5" role="list">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2 text-sm ${plan.popular ? "text-white/80" : "text-volcanic/70"}`}
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true">
                        <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`px-7 pb-7 pt-5 ${plan.popular ? "border-t border-gold" : "border-t border-volcanic/8"}`}>
                <a
                  href={`${WA_LINK}?text=${encodeURIComponent(`Hola, me interesa el plan ${plan.name} (${plan.sessions} sesiones / año, -${plan.discount}%).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => pushEvent("click_whatsapp", { location: "pricing", plan: plan.name })}
                  className={`block text-center text-sm font-semibold px-5 py-3 rounded-full transition-all w-full ${
                    plan.popular
                      ? "btn-gold"
                      : "bg-volcanic text-white hover:bg-navy"
                  }`}
                  aria-label={`Solicitar información sobre ${plan.name}`}
                >
                  Solicitar información →
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Included in all */}
        <div className="reveal mt-12 rounded-2xl border border-volcanic/10 bg-white/70 p-6 backdrop-blur-sm">
          <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-volcanic/50">
            Incluido en todos los servicios
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: "💰", text: "Precios fijos" },
              { icon: "🚗", text: "Desplazamiento gratis" },
              { icon: "✅", text: "Pago al finalizar" },
              { icon: "🛡️", text: "Garantía total" },
              { icon: "📋", text: "Seguro incluido" },
              { icon: "♻️", text: "Sin químicos" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-2 rounded-full border border-volcanic/8 bg-pearl px-4 py-2 text-sm text-volcanic/70">
                <span aria-hidden="true">{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
