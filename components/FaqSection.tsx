"use client";

import { useState } from "react";
import { FAQ_ITEMS, WA_LINK, WA_MSG } from "@/lib/data";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 bg-pearl"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-12">
          <p className="reveal text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Preguntas frecuentes
          </p>
          <h2
            id="faq-heading"
            className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-bold text-volcanic"
          >
            Resolvemos tus{" "}
            <span className="italic text-ocean">dudas</span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="reveal reveal-delay-1 bg-white border border-smoke rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-volcanic hover:text-ocean transition-colors"
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span>{item.q}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`w-5 h-5 shrink-0 text-gold transition-transform ${open === i ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                id={`faq-answer-${i}`}
                className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-48" : "max-h-0"}`}
              >
                <p className="px-6 pb-5 text-volcanic/60 text-sm leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 text-center">
          <p className="text-volcanic/60 mb-4">¿Tienes más preguntas?</p>
          <a
            href={`${WA_LINK}?text=${WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold font-semibold hover:underline"
            aria-label="Contactar por WhatsApp para resolver dudas"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
