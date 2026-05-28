"use client";

import { useRouter } from "next/navigation";
import { WA_LINK, WA_MSG, SERVICES } from "@/lib/data";
import { pushEvent } from "@/lib/gtm";
import { ReviewsSection } from "@/components/ReviewsSection";

export function ServicesSection() {
  const router = useRouter();

  return (
    <section
      id="servicios"
      className="py-24 lg:py-32 bg-white"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16">
          <p className="reveal text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Nuestros servicios
          </p>
          <h2
            id="services-heading"
            className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-bold text-volcanic"
          >
            Todo lo que necesitas,
            <br />
            <span className="italic text-ocean">en un solo equipo</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-4 text-volcanic/60 text-lg max-w-xl mx-auto">
            Atendemos a particulares y empresas en cualquier punto de la isla.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((s, i) => (
            <article
              key={s.id}
              onClick={() => router.push(`/services/${s.slug}`)}
              className={`reveal reveal-delay-${i + 1} group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${
                s.highlight
                  ? "bg-navy text-white shadow-xl shadow-navy/20"
                  : "bg-pearl border border-smoke"
              }`}
            >
              {s.highlight && (
                <div className="absolute top-4 right-4 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                  Más solicitado
                </div>
              )}

              {/* "Ver más" hint overlay on hover */}
              <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 rounded-2xl ${
                s.highlight ? "bg-navy/60" : "bg-volcanic/10"
              }`}>
                <span className="bg-white text-volcanic font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg">
                  Ver detalles →
                </span>
              </div>

              <div className="p-8 flex-1">
                <div
                  className={`text-4xl mb-4 w-14 h-14 flex items-center justify-center rounded-xl ${
                    s.highlight ? "bg-white/10" : "bg-gold/10"
                  }`}
                  aria-hidden="true"
                >
                  {s.icon}
                </div>
                <p
                  className={`text-xs font-semibold uppercase tracking-widest mb-1 ${
                    s.highlight ? "text-gold" : "text-ocean"
                  }`}
                >
                  {s.subtitle}
                </p>
                <h3
                  className={`font-display text-2xl font-bold mb-3 ${
                    s.highlight ? "text-white" : "text-volcanic"
                  }`}
                >
                  {s.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-5 ${s.highlight ? "text-white/70" : "text-volcanic/60"}`}>
                  {s.desc}
                </p>
                <ul className="space-y-2 mb-6" role="list">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2 text-sm ${s.highlight ? "text-white/80" : "text-volcanic/70"}`}
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0 text-gold" aria-hidden="true">
                        <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`px-8 pb-8 border-t ${s.highlight ? "border-white/10" : "border-smoke"} pt-5 flex items-center justify-between`}
              >
                <span className={`font-display font-bold text-lg ${s.highlight ? "text-gold" : "text-volcanic"}`}>
                  {s.price}
                </span>
                <a
                  href={`${WA_LINK}?text=${WA_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => { e.stopPropagation(); pushEvent("click_whatsapp", { location: "services", service: s.title }); }}
                  className={`relative z-20 text-sm font-semibold px-5 py-2.5 rounded-full transition-all ${
                    s.highlight
                      ? "btn-gold text-white"
                      : "bg-volcanic text-white hover:bg-navy"
                  }`}
                  aria-label={`Solicitar presupuesto para ${s.title}`}
                >
                  Solicitar →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ReviewsSection />
    </section>
  );
}
