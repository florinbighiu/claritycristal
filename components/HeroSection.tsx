"use client";

import { useState } from "react";
import Image from "next/image";
import { WA_LINK, WA_MSG } from "@/lib/data";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { pushEvent } from "@/lib/gtm";

const SPECS = [
  { value: "0 ppm", label: "Agua ultrapura" },
  { value: "+30%", label: "Rendimiento solar" },
  { value: "100%", label: "Garantía total" },
];

const MARQUEE = [
  "Sin cal",
  "Sin manchas",
  "Sin químicos",
  "Sin rayas",
  "Desplazamiento gratis",
  "Agua osmotizada",
  "Pértiga telescópica",
];

export function HeroSection() {
  // Incrementing key remounts the frost layer to replay the squeegee wipe.
  const [wipe, setWipe] = useState(0);
  const replay = () => setWipe((w) => w + 1);

  return (
    <section
      id="inicio"
      className="cc-hero-bg noise relative min-h-screen overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="cc-grid absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-16 pt-28 sm:px-8 lg:px-14 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">

          {/* ── Editorial column ── */}
          <div className="lg:col-span-8 xl:col-span-8">

            {/* Brand + coordinates row */}
            <div className="cc-rise flex flex-wrap items-center gap-x-5 gap-y-3" style={{ animationDelay: "0.05s" }}>
              <div className="flex items-center gap-2.5">
                <Image
                  src="/images/logo/logo.png"
                  alt="ClarityCristal"
                  width={140}
                  height={46}
                  className="h-9 w-auto object-contain"
                  priority
                />
                <span className="font-display text-xl font-semibold tracking-tight text-volcanic">
                  Clarity<span className="text-ocean">Cristal</span>
                </span>
              </div>
              <span className="hidden h-5 w-px bg-volcanic/15 sm:block" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-volcanic/45">
                28.96°N&nbsp;·&nbsp;13.55°W&nbsp;— Lanzarote
              </span>
            </div>

            {/* Index kicker */}
            <div className="cc-rise mt-9 flex items-center gap-4" style={{ animationDelay: "0.15s" }}>
              <span className="font-display text-sm italic text-gold">01</span>
              <span className="cc-rule h-px w-12" />
              <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-volcanic/55">
                Limpieza con agua desmineralizada
              </span>
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="cc-rise mt-6 font-display text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.02em] text-volcanic sm:text-6xl lg:text-[4.6rem]"
              style={{ animationDelay: "0.25s" }}
            >
              <span className="lg:whitespace-nowrap">Cristales que <span className="cc-mark">brillan</span>.</span>
              <br />
              <span className="lg:whitespace-nowrap">Paneles que <span className="cc-mark" style={{ color: "var(--ocean)" }}>rinden</span>.</span>
            </h1>

            <p
              className="cc-rise mt-7 max-w-md text-lg leading-relaxed text-volcanic/60"
              style={{ animationDelay: "0.35s" }}
            >
              En Lanzarote la calima y el salitre lo empañan todo. Lo devolvemos a
              cero — sin cal, sin marcas, sin atajos.
            </p>

            {/* CTAs */}
            <div
              className="cc-rise mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
              style={{ animationDelay: "0.45s" }}
            >
              <a
                href={`${WA_LINK}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-bold shadow-xl"
                aria-label="Solicitar presupuesto gratuito por WhatsApp"
                onClick={() => pushEvent("click_whatsapp", { location: "hero" })}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Presupuesto gratis
              </a>
              <a
                href="#servicios"
                className="group inline-flex items-center gap-2 rounded-full border border-volcanic/15 px-6 py-4 text-sm font-semibold text-volcanic/70 transition-colors hover:border-volcanic/40 hover:text-volcanic"
              >
                Ver servicios
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true">
                  <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Spec strip */}
            <dl
              className="cc-rise mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-volcanic/10 pt-6"
              style={{ animationDelay: "0.55s" }}
            >
              {SPECS.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl font-semibold text-volcanic sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-volcanic/45">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Glass window column ── */}
          <div className="cc-rise lg:col-span-4 xl:col-span-4" style={{ animationDelay: "0.3s" }}>
            <div className="relative mx-auto max-w-[420px]">

              {/* Rotated foil stamp */}
              <div className="cc-stamp absolute -left-4 -top-5 z-20 flex h-20 w-20 -rotate-12 items-center justify-center rounded-full text-center sm:-left-6">
                <span className="font-display text-[10px] font-bold uppercase leading-tight tracking-wider text-white drop-shadow">
                  Cero<br />residuos
                </span>
              </div>

              {/* The pane */}
              <button
                type="button"
                onMouseEnter={replay}
                onClick={replay}
                aria-label="Repetir efecto de limpieza del cristal"
                className="cc-window block aspect-[4/5] w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-pearl"
              >
                <div className="cc-sky" />
                <div className="cc-horizon" />

                {/* sun bloom */}
                <div className="absolute right-[14%] top-[16%] z-[5] h-16 w-16 rounded-full bg-[#fff3c8] blur-[2px]" />

                {/* mullions */}
                <span className="cc-mullion cc-mullion-v" />
                <span className="cc-mullion cc-mullion-h" />

                {/* frost + squeegee (keyed to replay) */}
                <div key={wipe} className="absolute inset-0 z-[8]">
                  <div className="cc-frost" />
                  <div className="cc-squeegee" />
                </div>

                <div className="cc-glass-sheen" />
              </button>

              {/* Floating spec chip */}
              <div className="cc-chip absolute -bottom-5 -right-3 z-20 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-right-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ocean/10 text-ocean">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="leading-tight">
                  <p className="font-display text-base font-semibold text-volcanic">Acabado sin rayas</p>
                  <p className="text-[11px] text-volcanic/50">Se seca solo · 0 ppm</p>
                </div>
              </div>

              {/* hint */}
              <p className="mt-9 text-center text-[11px] uppercase tracking-[0.3em] text-volcanic/35">
                Pasa el cursor para limpiar
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust marquee */}
      <div className="cc-marquee-wrap absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-volcanic/10 bg-pearl/40 py-3 backdrop-blur-sm">
        <div className="cc-marquee" aria-hidden="true">
          {[...MARQUEE, ...MARQUEE].map((word, i) => (
            <span key={i} className="flex items-center whitespace-nowrap px-6 text-sm font-medium text-volcanic/55">
              <span className="mr-6 text-gold">✦</span>
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
