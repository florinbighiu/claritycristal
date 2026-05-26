"use client";

import { WA_LINK, WA_MSG } from "@/lib/data";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#002d4a] via-[#0a5272] to-[#001e38]" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-teal-400/20 blur-3xl animate-float" />
      <div
        className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-emerald-400/15 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 lg:px-8 text-center">
        <h1
          id="hero-heading"
          className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
        >
          Cristales que{" "}
          <span className="text-emerald-400 italic">brillan</span>
          ,<br />
          <span className="text-cyan-100/80">paneles que rinden</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
          Limpieza profesional de ventanas y paneles solares en Lanzarote.
          Agua desmineralizada, sin cal, sin manchas.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`${WA_LINK}?text=${WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex items-center gap-3 text-white font-bold px-8 py-4 rounded-full text-lg shadow-2xl"
            aria-label="Solicitar presupuesto gratuito por WhatsApp"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Presupuesto gratis
          </a>
          <a
            href="#servicios"
            className="flex items-center gap-2 text-white/70 hover:text-emerald-300 font-medium px-6 py-4 border border-white/20 rounded-full transition-colors hover:border-emerald-400/40"
          >
            Ver servicios
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
