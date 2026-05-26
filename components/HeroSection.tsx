"use client";

import { WA_LINK, WA_MSG } from "@/lib/data";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden noise"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#002d4a] via-[#0a5272] to-[#001e38]" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-teal-400/20 blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 w-full px-5 lg:px-16">
        <div className="flex flex-col items-center justify-center min-h-screen py-32 text-center w-full">

          <div className="flex items-center gap-3 mb-8">
            <span className="block w-8 h-px bg-teal-400/60" />
            <p className="text-teal-300 text-xs font-bold uppercase tracking-[0.3em]">
              Lanzarote · Servicio Profesional
            </p>
            <span className="block w-8 h-px bg-teal-400/60" />
          </div>

          <h1
            id="hero-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.02] tracking-tight mb-8 w-full"
          >
            Cristales que{" "}
            <span className="text-emerald-400 italic">brillan</span>.
            <br />
            Paneles que{" "}
            <span className="text-teal-300 italic">rinden</span>.
          </h1>

          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl">
            Agua desmineralizada a 0 ppm. Sin cal, sin manchas, sin químicos.
            Garantía de satisfacción en cada visita.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={`${WA_LINK}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-3 text-white font-bold px-8 py-4 rounded-full text-base shadow-2xl"
              aria-label="Solicitar presupuesto gratuito por WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Presupuesto gratis
            </a>
            <a
              href="#servicios"
              className="flex items-center gap-2 text-white/60 hover:text-emerald-300 font-medium px-6 py-4 border border-white/15 rounded-full transition-colors hover:border-emerald-400/40 text-sm"
            >
              Ver servicios
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
