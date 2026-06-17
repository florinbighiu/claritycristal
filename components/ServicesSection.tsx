"use client";

import { useRouter } from "next/navigation";
import { WA_LINK, WA_MSG, SERVICES } from "@/lib/data";
import { pushEvent } from "@/lib/gtm";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SectionEyebrow } from "@/components/SectionEyebrow";

export function ServicesSection() {
  const router = useRouter();

  return (
    <section
      id="servicios"
      className="cc-paper-bg cc-seam-top relative overflow-hidden py-24 lg:py-32"
      aria-labelledby="services-heading"
    >
      <div className="cc-grid absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="reveal">
            <SectionEyebrow index="02" label="Nuestros servicios" align="center" />
          </div>
          <h2
            id="services-heading"
            className="reveal reveal-delay-1 mt-6 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-[3.4rem] lg:leading-[1.02]"
          >
            Todo lo que necesitas,
            <br />
            <span className="italic text-ocean">en un solo equipo</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-5 max-w-xl text-lg text-volcanic/60">
            Atendemos a particulares y empresas en cualquier punto de la isla.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-7">
          {SERVICES.map((s, i) => (
            <article
              key={s.id}
              onClick={() => router.push(`/services/${s.slug}`)}
              className={`reveal reveal-delay-${i + 1} cc-topline group relative flex cursor-pointer flex-col overflow-hidden rounded-[20px] ${
                s.highlight ? "cc-card-ink text-white" : "cc-card"
              }`}
            >
              {/* index marker */}
              <span
                className={`cc-mono absolute right-6 top-6 text-[11px] font-medium tracking-widest ${
                  s.highlight ? "text-white/30" : "text-volcanic/25"
                }`}
                aria-hidden="true"
              >
                S—0{i + 1}
              </span>

              {s.highlight && (
                <div className="absolute left-6 top-6 rounded-full bg-gold px-3 py-1 text-xs font-bold text-volcanic">
                  Más solicitado
                </div>
              )}

              {/* "Ver más" hint overlay on hover */}
              <div className={`absolute inset-0 z-10 flex items-center justify-center rounded-[20px] opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${
                s.highlight ? "bg-[#06101d]/60" : "bg-volcanic/10 backdrop-blur-[2px]"
              }`}>
                <span className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-volcanic shadow-lg">
                  Ver detalles →
                </span>
              </div>

              <div className="flex-1 p-8 pt-16">
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${
                    s.highlight ? "bg-white/10 ring-1 ring-white/15" : "bg-gold/10 ring-1 ring-gold/15"
                  }`}
                  aria-hidden="true"
                >
                  {s.icon}
                </div>
                <p
                  className={`mb-1.5 text-[11px] font-bold uppercase tracking-[0.2em] ${
                    s.highlight ? "text-gold" : "text-ocean"
                  }`}
                >
                  {s.subtitle}
                </p>
                <h3
                  className={`mb-3 font-display text-2xl font-semibold ${
                    s.highlight ? "text-white" : "text-volcanic"
                  }`}
                >
                  {s.title}
                </h3>
                <p className={`mb-6 text-sm leading-relaxed ${s.highlight ? "text-white/65" : "text-volcanic/60"}`}>
                  {s.desc}
                </p>
                <ul className="space-y-2.5" role="list">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2.5 text-sm ${s.highlight ? "text-white/80" : "text-volcanic/70"}`}
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0 text-gold" aria-hidden="true">
                        <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`flex items-center justify-between border-t px-8 pb-8 pt-5 ${s.highlight ? "border-white/10" : "border-volcanic/8"}`}
              >
                <span className={`font-display text-lg font-semibold ${s.highlight ? "text-gold" : "text-volcanic"}`}>
                  {s.price}
                </span>
                <a
                  href={`${WA_LINK}?text=${WA_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => { e.stopPropagation(); pushEvent("click_whatsapp", { location: "services", service: s.title }); }}
                  className={`relative z-20 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    s.highlight
                      ? "btn-gold"
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
