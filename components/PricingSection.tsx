"use client";

import { useState } from "react";
import { PLANS, WA_LINK, type PlanKey } from "@/lib/data";

export function PricingSection() {
  const [, setActivePlan] = useState<PlanKey>("plus");

  return (
    <section
      id="precios"
      className="py-24 lg:py-32 bg-pearl"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Recurring plans */}
        <div className="text-center mb-10">
          <p className="reveal text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            💰 Ahorra con planes recurrentes
          </p>
          <h3 className="reveal reveal-delay-1 font-display text-3xl font-bold text-volcanic">
            Contratos de mantenimiento
          </h3>
          <p className="reveal reveal-delay-2 mt-3 text-volcanic/60 max-w-lg mx-auto text-sm">
            Mantén tus vistas siempre cristalinas. Cuantas más sesiones, mayor descuento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PLANS.map((plan, i) => (
            <article
              key={plan.key}
              onClick={() => setActivePlan(plan.key)}
              className={`reveal reveal-delay-${i + 1} relative rounded-2xl flex flex-col overflow-hidden transition-all hover:-translate-y-1 ${
                plan.popular
                  ? "card-popular bg-navy text-white"
                  : "bg-white border border-smoke"
              }`}
            >
              {plan.badge && (
                <div className="bg-gold text-white text-xs font-bold px-4 py-1.5 text-center">
                  {plan.badge}
                </div>
              )}
              <div className="p-7 flex-1">
                <h3 className={`font-display text-xl font-bold mb-1 ${plan.popular ? "text-white" : "text-volcanic"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-5 ${plan.popular ? "text-white/60" : "text-volcanic/50"}`}>
                  {plan.sessions} sesiones / año
                </p>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`inline-flex items-baseline gap-1 font-display font-bold text-4xl ${plan.popular ? "text-gold" : "text-volcanic"}`}>
                    -{plan.discount}%
                  </div>
                  <span className={`text-sm ${plan.popular ? "text-white/60" : "text-volcanic/50"}`}>
                    de descuento
                  </span>
                </div>
                <ul className="space-y-2.5" role="list">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2 text-sm ${plan.popular ? "text-white/80" : "text-volcanic/70"}`}
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0 text-gold mt-0.5" aria-hidden="true">
                        <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`px-7 pb-7 ${plan.popular ? "border-t border-white/10 pt-5" : "border-t border-smoke pt-5"}`}>
                <a
                  href={`${WA_LINK}?text=${encodeURIComponent(`Hola, me interesa el plan ${plan.name} (${plan.sessions} sesiones / año, -${plan.discount}%).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center text-sm font-semibold px-5 py-3 rounded-full transition-all w-full ${
                    plan.popular
                      ? "btn-gold text-white"
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
        <div className="reveal mt-12 bg-white rounded-2xl border border-smoke p-6">
          <p className="text-center font-semibold text-volcanic mb-4 text-sm uppercase tracking-wide">
            Incluido en todos los servicios
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: "💰", text: "Precios fijos" },
              { icon: "🚗", text: "Desplazamiento gratis" },
              { icon: "✅", text: "Pago al finalizar" },
              { icon: "🛡️", text: "Garantía total" },
              { icon: "📋", text: "Seguro incluido" },
              { icon: "♻️", text: "Sin químicos" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-2 text-sm text-volcanic/70 bg-pearl rounded-full px-4 py-2">
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
