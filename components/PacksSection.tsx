"use client";

import { WA_LINK } from "@/lib/data";
import { pushEvent } from "@/lib/gtm";
import { SectionEyebrow } from "@/components/SectionEyebrow";

const packs = [
  {
    name: "Pack Básico Express",
    price: 29,
    badge: null as string | null,
    desc: "3 ventanas correderas + 1 puerta acristalada/ventana grande",
  },
  {
    name: "Pack Completo Hogar",
    price: 34,
    badge: null as string | null,
    desc: "3 ventanas medianas + 1 pequeña + 2 puertas correderas/ventanas grandes",
  },
  {
    name: "Pack Premium Integral",
    price: 39,
    badge: "⭐ VIP",
    desc: "5 ventanas (exterior + interior) + 1 puerta corredera",
  },
];

export function PacksSection() {
  return (
    <section className="cc-paper-bg cc-seam-top relative overflow-hidden py-24 lg:py-32" aria-labelledby="packs-heading">
      <div className="cc-grid absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="reveal">
            <SectionEyebrow index="04" label="Packs más solicitados" align="center" />
          </div>
          <h2
            id="packs-heading"
            className="reveal reveal-delay-1 mt-6 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-[3.4rem] lg:leading-[1.02]"
          >
            Empieza con el pack{" "}
            <span className="italic text-ocean">perfecto para ti</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {packs.map((p, i) => (
            <article
              key={p.name}
              className={`reveal reveal-delay-${i + 1} cc-topline relative flex flex-col gap-4 overflow-hidden rounded-[20px] p-7 ${
                p.badge ? "cc-card-ink text-white" : "cc-card"
              }`}
            >
              {p.badge && (
                <span className="absolute right-5 top-5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-volcanic">
                  {p.badge}
                </span>
              )}
              <div>
                <p className={`mb-2 text-[11px] font-bold uppercase tracking-[0.2em] ${p.badge ? "text-gold" : "text-ocean"}`}>
                  Precio fijo
                </p>
                <div className={`flex items-baseline gap-1 font-display font-semibold ${p.badge ? "text-white" : "text-volcanic"}`}>
                  <span className="text-5xl">{p.price}</span>
                  <span className="text-2xl text-gold">€</span>
                </div>
              </div>
              <h3 className={`font-display text-xl font-semibold ${p.badge ? "text-white" : "text-volcanic"}`}>{p.name}</h3>
              <p className={`text-sm leading-relaxed ${p.badge ? "text-white/60" : "text-volcanic/60"}`}>{p.desc}</p>
              <a
                href={`${WA_LINK}?text=${encodeURIComponent(`Hola, quiero reservar el ${p.name} (${p.price}€).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushEvent("click_whatsapp", { location: "packs", pack: p.name })}
                className={`mt-auto rounded-full px-5 py-3 text-center text-sm font-semibold transition-all ${
                  p.badge ? "btn-gold" : "bg-volcanic text-white hover:bg-navy"
                }`}
                aria-label={`Reservar ${p.name} por ${p.price}€`}
              >
                Reservar ahora →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
