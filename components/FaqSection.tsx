"use client";

import { useState } from "react";
import { FAQ_ITEMS, WA_LINK, WA_MSG } from "@/lib/data";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { SectionEyebrow } from "@/components/SectionEyebrow";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="cc-paper-bg cc-seam-top relative overflow-hidden py-24 lg:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="cc-grid absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="reveal">
            <SectionEyebrow index="07" label="Preguntas frecuentes" align="center" />
          </div>
          <h2
            id="faq-heading"
            className="reveal reveal-delay-1 mt-6 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-5xl"
          >
            Resolvemos tus{" "}
            <span className="italic text-ocean">dudas</span>
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-volcanic/10 bg-white/80 backdrop-blur-sm">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="reveal border-b border-volcanic/8 last:border-0"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-volcanic transition-colors hover:text-ocean"
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="flex items-baseline gap-3">
                  <span className="cc-mono text-xs text-gold" aria-hidden="true">{(i + 1).toString().padStart(2, "0")}</span>
                  {item.q}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                id={`faq-answer-${i}`}
                className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96" : "max-h-0"}`}
              >
                <p className="px-6 pb-5 pl-[3.65rem] text-sm leading-relaxed text-volcanic/60">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 text-center">
          <p className="mb-4 text-volcanic/60">¿Tienes más preguntas?</p>
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
