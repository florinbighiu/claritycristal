"use client";

import { WA_LINK } from "@/lib/data";
import { pushEvent } from "@/lib/gtm";

const packs = [
  {
    name: "Pack Básico Express",
    price: 29,
    badge: null as string | null,
    desc: "3 ventanas correderas + 1 puerta acristalada/ventana grande",
    color: "bg-pearl border-smoke border",
    textColor: "text-volcanic",
  },
  {
    name: "Pack Completo Hogar",
    price: 34,
    badge: null as string | null,
    desc: "3 ventanas medianas + 1 pequeña + 2 puertas correderas/ventanas grandes",
    color: "bg-pearl border-smoke border",
    textColor: "text-volcanic",
  },
  {
    name: "Pack Premium Integral",
    price: 39,
    badge: "⭐ VIP",
    desc: "5 ventanas (exterior + interior) + 1 puerta corredera",
    color: "bg-navy",
    textColor: "text-white",
  },
];

export function PacksSection() {
  return (
    <section className="py-16 bg-white" aria-labelledby="packs-heading">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-12">
          <p className="reveal text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Packs más solicitados
          </p>
          <h2
            id="packs-heading"
            className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-bold text-volcanic"
          >
            Empieza con el pack{" "}
            <span className="italic text-ocean">perfecto para ti</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packs.map((p, i) => (
            <article
              key={p.name}
              className={`reveal reveal-delay-${i + 1} rounded-2xl p-7 flex flex-col gap-4 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl ${p.color}`}
            >
              {p.badge && (
                <span className="absolute top-4 right-4 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                  {p.badge}
                </span>
              )}
              <div>
                <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${p.badge ? "text-gold" : "text-ocean"}`}>
                  Precio fijo
                </p>
                <div className={`font-display text-4xl font-bold ${p.badge ? "text-gold" : "text-volcanic"}`}>
                  {p.price}€
                </div>
              </div>
              <h3 className={`font-display text-xl font-bold ${p.textColor}`}>{p.name}</h3>
              <p className={`text-sm leading-relaxed ${p.badge ? "text-white/60" : "text-volcanic/60"}`}>{p.desc}</p>
              <a
                href={`${WA_LINK}?text=${encodeURIComponent(`Hola, quiero reservar el ${p.name} (${p.price}€).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushEvent("click_whatsapp", { location: "packs", pack: p.name })}
                className={`mt-auto text-center text-sm font-semibold px-5 py-3 rounded-full transition-all ${
                  p.badge ? "btn-gold text-white" : "bg-volcanic text-white hover:bg-navy"
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
