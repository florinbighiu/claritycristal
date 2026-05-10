"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
type PlanKey = "esencial" | "plus" | "elite";

interface Plan {
  key: PlanKey;
  name: string;
  sessions: number;
  discount: number;
  popular: boolean;
  features: string[];
  rainGuarantee: string;
  badge?: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const WA_LINK = "https://wa.me/34604234496";
const WA_MSG = encodeURIComponent(
  "Hola, me gustaría solicitar un presupuesto gratuito para limpieza de cristales/paneles solares."
);

const PLANS: Plan[] = [
  {
    key: "esencial",
    name: "Claridad Esencial",
    sessions: 3,
    discount: 10,
    popular: false,
    rainGuarantee: "3 días",
    features: [
      "Agua 100% pura desmineralizada",
      "Limpieza interior & exterior",
      "Servicio cada 4 meses",
      "Garantía de lluvia 3 días",
      "Desplazamiento incluido",
    ],
  },
  {
    key: "plus",
    name: "Claridad Plus",
    sessions: 6,
    discount: 15,
    popular: true,
    rainGuarantee: "5 días",
    badge: "Más Popular",
    features: [
      "Agua 100% pura desmineralizada",
      "Flexibilidad total de horario",
      "Interior & exterior",
      "Recordatorios programados",
      "Prioridad en agenda",
      "Garantía de lluvia 5 días",
      "+5% desc. en servicios extra",
      "Cancela cuando quieras",
      "Garantía de precio fijo",
    ],
  },
  {
    key: "elite",
    name: "Claridad Elite",
    sessions: 10,
    discount: 20,
    popular: false,
    rainGuarantee: "7 días",
    features: [
      "Agua 100% pura desmineralizada",
      "Flexibilidad total de horario",
      "Atención prioritaria VIP",
      "Recordatorios personalizados",
      "Garantía de lluvia 7 días",
      "Sesiones urgencia sin coste",
      "+10% desc. en servicios extra",
      "Ideal para locales comerciales",
      "Cancela cuando quieras",
      "Garantía de precio fijo",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "¿Cada cuánto debería realizarse la limpieza de cristales?",
    a: "En Lanzarote, por la calima y el salitre, recomendamos cada 2-3 meses para viviendas y mensualmente para comercios. Con nuestros planes recurrentes obtienes hasta un 20% de descuento.",
  },
  {
    q: "¿La lluvia ya limpia los paneles solares?",
    a: "No. La lluvia NO elimina el polvo ni el salitre; al contrario, deja manchas que empeoran el rendimiento. Solo agua desmineralizada con tratamiento profesional garantiza limpieza total sin residuos ni corrosión.",
  },
  {
    q: "¿El agua del grifo deja marcas en los cristales?",
    a: "Sí. El agua del grifo tiene entre 100-500 ppm de minerales (cal, sales) que dejan marcas al secarse. Nuestra agua ultrapura (0 ppm) se evapora sin dejar rastros, reduciendo el tiempo de limpieza un 30% y aumentando el brillo un 50% más.",
  },
  {
    q: "¿Se pueden dañar los cristales durante la limpieza?",
    a: "No. Utilizamos exclusivamente agua pura desmineralizada y cepillos profesionales de cerdas suaves, diseñados específicamente para la limpieza de superficies delicadas. Nunca usamos productos químicos abrasivos.",
  },
  {
    q: "¿Necesito estar en casa durante el servicio?",
    a: "No es necesario. Solo necesitamos acceso al exterior. Te avisamos cuando llegamos y cuando terminamos. Ideal para propietarios de alojamientos vacacionales o personas con horarios ocupados.",
  },
  {
    q: "¿Cuánto rinde pérdida un panel solar sucio?",
    a: "En Lanzarote, la calima, polvo y salitre pueden hacer que los paneles pierdan hasta el 25-40% de su rendimiento. Una limpieza profesional mensual puede recuperar hasta 25-30% del rendimiento perdido, equivalente a cientos de euros al año en ahorro energético.",
  },
  {
    q: "¿Se adaptan a mi horario de trabajo o negocio?",
    a: "Sí. Trabajamos entre semana, fines de semana o fuera del horario laboral. Nuestro objetivo es realizar la limpieza sin interferir en su rutina diaria ni en la atención a clientes.",
  },
  {
    q: "¿Cuánto cuesta la limpieza de cristales o paneles solares?",
    a: "Residencial: desde 4€ por ventana. Comercial: desde 3€/m². Paneles solares: desde 5€ por panel. El desplazamiento es siempre gratuito. Solicita tu presupuesto sin compromiso.",
  },
];

const VALUES = [
  {
    icon: "🎯",
    title: "Fiabilidad",
    desc: "Cumplimos lo que prometemos. Puntuales, transparentes y confiables en cada visita.",
  },
  {
    icon: "✨",
    title: "Calidad",
    desc: "Limpiar ventanas es un arte. Lo hacemos perfecto, no rápido. Sin atajos.",
  },
  {
    icon: "🤝",
    title: "Respeto",
    desc: "Tratamos su espacio como si fuera el nuestro. Con cuidado y responsabilidad.",
  },
  {
    icon: "🌿",
    title: "Sostenibilidad",
    desc: "Sin químicos agresivos. Agua pura y rutas optimizadas para cuidar el entorno.",
  },
  {
    icon: "⚡",
    title: "Eficiencia",
    desc: "El agua desmineralizada actúa más rápido y deja resultados más duraderos.",
  },
  {
    icon: "🛡️",
    title: "Garantía Total",
    desc: "Si no queda perfecto, volvemos sin coste. Sin excusas, sin letra pequeña.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Cotización Gratuita",
    desc: "Contáctenos y evaluamos el número, tipo y tamaño de sus ventanas para ofrecerle un precio justo y transparente.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Programación Flexible",
    desc: "Usted elige cuándo, nosotros nos encargamos. Entre semana, fines de semana o fuera de horario laboral.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="15" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Limpieza Profesional",
    desc: "Llegamos con todo el equipo. Agua desmineralizada, pértigas telescópicas y técnicas seguras para un acabado perfecto.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M3 20l4-4m0 0l9-9a2.828 2.828 0 00-4-4L3 12l4 4zm0 0l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Revisión y Satisfacción",
    desc: "Antes de irnos, revisamos el resultado con usted. Si algo no está perfecto, lo solucionamos al instante.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#servicios", label: "Servicios" },
    { href: "#metodo", label: "Método" },
    { href: "#precios", label: "Precios" },
    { href: "#proceso", label: "Cómo funciona" },
    { href: "#faq", label: "FAQ" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md scrolled" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            aria-label="ClarityCristal - volver al inicio"
          >
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-white font-display font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
              C
            </div>
            <span
              className={`font-display text-xl font-bold transition-colors ${
                scrolled ? "text-volcanic" : "text-white"
              }`}
            >
              Clarity<span className="text-gold">Cristal</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-gold ${
                  scrolled ? "text-volcanic/70" : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href={`${WA_LINK}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex btn-gold text-white font-semibold text-sm px-5 py-2.5 rounded-full items-center gap-2 shadow-lg"
              aria-label="Solicitar presupuesto gratuito por WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Presupuesto gratis
            </a>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-volcanic" : "text-white"
              }`}
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden bg-white border-t border-smoke transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="px-5 py-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-volcanic/80 hover:text-gold hover:bg-gold/5 font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`${WA_LINK}?text=${WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 btn-gold text-white font-semibold text-sm px-5 py-3 rounded-full text-center"
          >
            Solicitar presupuesto gratis
          </a>
        </nav>
      </div>
    </header>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-volcanic to-[#071428]" />
      {/* Decorative orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-ocean/20 blur-3xl animate-float" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gold/15 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-gold/10 blur-2xl" />

      {/* Stars-like particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-px h-px bg-white/40 rounded-full"
          style={{
            top: `${10 + Math.sin(i * 2.5) * 40 + 40}%`,
            left: `${5 + (i * 4.7) % 90}%`,
            opacity: 0.3 + (i % 4) * 0.15,
          }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-5 lg:px-8 text-center pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold-light rounded-full px-4 py-1.5 text-sm font-medium mb-6 animate-fade-in">
          <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          Servicio Profesional en Lanzarote
        </div>

        <h1
          id="hero-heading"
          className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
        >
          Cristales que{" "}
          <span className="text-gold italic">brillan</span>
          ,<br />
          <span className="text-white/80">paneles que rinden</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
          Limpieza profesional de ventanas y paneles solares en Lanzarote con agua
          desmineralizada. Sin cal, sin manchas. Garantía 100% de satisfacción.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm">
          {[
            { icon: "🛡️", text: "Garantía 100%" },
            { icon: "🚗", text: "Desplazamiento gratis" },
            { icon: "⏱️", text: "Respuesta en 24h" },
            { icon: "💰", text: "Sin sorpresas" },
          ].map((b) => (
            <div
              key={b.text}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-white/80"
            >
              <span aria-hidden="true">{b.icon}</span>
              {b.text}
            </div>
          ))}
        </div>

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
            className="flex items-center gap-2 text-white/70 hover:text-white font-medium px-6 py-4 border border-white/20 rounded-full transition-colors hover:border-white/40"
          >
            Ver servicios
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 text-white/30 text-xs">
          <span>Descubrir más</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      id: "residencial",
      icon: "🏠",
      title: "Residencial",
      subtitle: "Para hogares y viviendas",
      desc: "Limpieza profesional de todas las ventanas de tu hogar con agua ultrapura. Sin rayas, sin manchas, sin necesidad de secar manualmente.",
      price: "Desde 4€ / ventana",
      href: "#contacto",
      items: [
        "Ventanas de todos los tamaños",
        "Puertas correderas y balconeras",
        "Interior y exterior",
        "Contraventanas y persianas",
      ],
    },
    {
      id: "empresas",
      icon: "🏢",
      title: "Empresas & Alojamientos",
      subtitle: "Hoteles, oficinas, comercios",
      desc: "Servicio adaptado a negocios sin interrumpir tu actividad. Escaparates impecables, fachadas cristalinas y clientes impresionados.",
      price: "Desde 3€ / m²",
      href: "#contacto",
      items: [
        "Escaparates y locales",
        "Fachadas y cristaleras",
        "Horario flexible sin interferencias",
        "Factura y seguro incluidos",
      ],
    },
    {
      id: "paneles",
      icon: "☀️",
      title: "Paneles Solares",
      subtitle: "Optimiza tu energía solar",
      desc: "Los paneles sucios pierden hasta un 40% de rendimiento. Con nuestra limpieza especializada recuperas ese rendimiento y ahorras cientos de euros al año.",
      price: "Desde 5€ / panel",
      href: "#contacto",
      highlight: true,
      items: [
        "Hasta +30% de rendimiento",
        "Sin daños ni rayaduras",
        "Agua pura sin cal",
        "Apto para todos los fabricantes",
      ],
    },
  ];

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
          {services.map((s, i) => (
            <article
              key={s.id}
              className={`reveal reveal-delay-${i + 1} group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
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
                    <li key={item} className={`flex items-center gap-2 text-sm ${s.highlight ? "text-white/80" : "text-volcanic/70"}`}>
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0 text-gold" aria-hidden="true">
                        <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`px-8 pb-8 border-t ${s.highlight ? "border-white/10" : "border-smoke"} pt-5 flex items-center justify-between`}>
                <span className={`font-display font-bold text-lg ${s.highlight ? "text-gold" : "text-volcanic"}`}>
                  {s.price}
                </span>
                <a
                  href={`${WA_LINK}?text=${WA_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-all ${
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
    </section>
  );
}

function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !dragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [handleMove]);

  return (
    <section
      id="metodo"
      className="py-24 lg:py-32 bg-pearl"
      aria-labelledby="method-heading"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="reveal text-gold font-semibold text-sm uppercase tracking-widest mb-3">
              Nuestro método exclusivo
            </p>
            <h2
              id="method-heading"
              className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-bold text-volcanic mb-6"
            >
              El secreto:{" "}
              <span className="italic text-ocean">agua sin cal</span>
            </h2>
            <p className="reveal reveal-delay-2 text-volcanic/60 text-lg mb-8 leading-relaxed">
              El agua del grifo tiene entre 100-500 ppm de minerales que dejan marcas al
              secarse. Nuestra agua ultrapura a <strong>0 ppm</strong> solo contiene H₂O, sin
              residuos que se depositen en el cristal.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { stat: "0 ppm", label: "Pureza del agua" },
                { stat: "30%", label: "Más rápido" },
                { stat: "50%", label: "Brillo más duradero" },
                { stat: "0€", label: "Sin desplazamiento" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="reveal reveal-delay-2 bg-white rounded-xl p-5 border border-smoke text-center"
                >
                  <div className="font-display text-3xl font-bold text-gold">{s.stat}</div>
                  <div className="text-xs text-volcanic/50 mt-1 font-medium uppercase tracking-wide">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-3 space-y-3">
              {[
                { icon: "💧", text: "Sin rayas ni manchas — no hay que secar manualmente" },
                { icon: "🌿", text: "Sin químicos agresivos — respetuoso con el medio ambiente" },
                { icon: "🔭", text: "Pértigas telescópicas — se limpia desde el suelo con total seguridad" },
                { icon: "⚡", text: "Hasta +30% de rendimiento en paneles fotovoltaicos" },
              ].map((f) => (
                <div key={f.text} className="flex items-start gap-3 text-sm text-volcanic/70">
                  <span className="shrink-0 text-base" aria-hidden="true">{f.icon}</span>
                  {f.text}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive slider */}
          <div className="reveal reveal-delay-2">
            <div
              ref={containerRef}
              className="before-after-slider h-80 lg:h-[420px] select-none"
              role="img"
              aria-label="Comparación antes y después de la limpieza: arrastre el divisor para comparar"
              onMouseDown={() => { dragging.current = true; }}
              onTouchStart={() => { dragging.current = true; }}
            >
              {/* Before */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #b8b0a0 0%, #9a9080 50%, #7a7060 100%)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌫️</div>
                    <div className="bg-black/40 text-white text-sm font-bold px-4 py-2 rounded-full backdrop-blur-sm">
                      ANTES — Agua del grifo
                    </div>
                    <p className="text-white/70 text-xs mt-2">Cal, manchas, residuos</p>
                  </div>
                </div>
                {/* Simulated dirty streaks */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-white/10 rounded-full"
                    style={{
                      width: `${30 + i * 10}px`,
                      height: `${2 + i % 3}px`,
                      top: `${15 + i * 10}%`,
                      left: `${5 + (i * 12) % 60}%`,
                      transform: `rotate(${-10 + i * 5}deg)`,
                    }}
                  />
                ))}
              </div>

              {/* After */}
              <div
                className="after-layer rounded-2xl overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #bde8ff 0%, #87ceeb 40%, #64b5f6 100%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">✨</div>
                    <div className="bg-white/40 text-volcanic text-sm font-bold px-4 py-2 rounded-full backdrop-blur-sm">
                      DESPUÉS — Agua pura
                    </div>
                    <p className="text-volcanic/60 text-xs mt-2">0 ppm · Sin residuos</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                className="divider"
                style={{ left: `${pos}%` }}
                aria-hidden="true"
              >
                <div className="divider-handle">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-volcanic" aria-hidden="true">
                    <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-volcanic/40 mt-3">
              Arrastra el divisor para comparar →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PacksSection() {
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
          {[
            {
              name: "Pack Básico Express",
              price: 29,
              badge: null,
              desc: "3 ventanas correderas + 1 puerta acristalada/ventana grande",
              color: "bg-pearl border-smoke border",
              textColor: "text-volcanic",
            },
            {
              name: "Pack Completo Hogar",
              price: 34,
              badge: null,
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
          ].map((p, i) => (
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

function PricingSection() {
  const [activePlan, setActivePlan] = useState<PlanKey>("plus");

  return (
    <section
      id="precios"
      className="py-24 lg:py-32 bg-pearl"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16">
          <p className="reveal text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Precios transparentes
          </p>
          <h2
            id="pricing-heading"
            className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-bold text-volcanic"
          >
            Sin letra pequeña,{" "}
            <span className="italic text-ocean">sin sorpresas</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-4 text-volcanic/60 text-lg max-w-xl mx-auto">
            Lo que ves es lo que pagas. Te informamos del precio exacto antes de empezar.
          </p>
        </div>

        {/* Base rates */}
        <div className="reveal reveal-delay-1 grid sm:grid-cols-3 gap-5 mb-20">
          {[
            { icon: "🏠", label: "Residencial", price: "4€", unit: "por ventana", note: "Todos los tamaños" },
            { icon: "🏢", label: "Comercial", price: "3€", unit: "por m²", note: "Consultar para fachadas" },
            { icon: "☀️", label: "Paneles Solares", price: "5€", unit: "por panel", note: "Hasta +30% rendimiento" },
          ].map((r) => (
            <div
              key={r.label}
              className="bg-white rounded-2xl p-6 border border-smoke text-center flex flex-col items-center gap-2 hover:shadow-lg transition-shadow"
            >
              <span className="text-3xl" aria-hidden="true">{r.icon}</span>
              <p className="text-xs font-semibold uppercase tracking-widest text-ocean">{r.label}</p>
              <div className="font-display text-4xl font-bold text-volcanic">{r.price}</div>
              <p className="text-sm text-volcanic/50">{r.unit}</p>
              <p className="text-xs text-volcanic/40 bg-smoke rounded-full px-3 py-1">{r.note}</p>
            </div>
          ))}
        </div>

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
                <h3
                  className={`font-display text-xl font-bold mb-1 ${
                    plan.popular ? "text-white" : "text-volcanic"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-5 ${plan.popular ? "text-white/60" : "text-volcanic/50"}`}
                >
                  {plan.sessions} sesiones / año
                </p>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`inline-flex items-baseline gap-1 font-display font-bold text-4xl ${
                      plan.popular ? "text-gold" : "text-volcanic"
                    }`}
                  >
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
                      className={`flex items-start gap-2 text-sm ${
                        plan.popular ? "text-white/80" : "text-volcanic/70"
                      }`}
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0 text-gold mt-0.5" aria-hidden="true">
                        <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

function ValuesSection() {
  return (
    <section className="py-24 lg:py-32 bg-volcanic relative overflow-hidden" aria-labelledby="values-heading">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ocean/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="reveal text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Nuestros valores
          </p>
          <h2
            id="values-heading"
            className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-bold text-white"
          >
            Cada limpieza refleja
            <br />
            <span className="italic text-gold">nuestro compromiso</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={`reveal reveal-delay-${(i % 3) + 1} group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="text-3xl mb-3" aria-hidden="true">{v.icon}</div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
        <div className="reveal mt-12 text-center">
          <p className="text-white/40 text-sm italic">
            ClarityCristal — Una empresa local comprometida, que trabaja con orgullo profesional y responsabilidad
          </p>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section
      id="proceso"
      className="py-24 lg:py-32 bg-white"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16">
          <p className="reveal text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            🔄 Proceso simple
          </p>
          <h2
            id="process-heading"
            className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-bold text-volcanic"
          >
            En solo 4 pasos,{" "}
            <span className="italic text-ocean">cristales impecables</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-4 text-volcanic/60 text-lg max-w-xl mx-auto">
            Sin complicaciones, sin estrés. Usted disfruta del resultado.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`reveal reveal-delay-${i + 1} relative flex flex-col`}
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden md:block absolute top-7 left-full w-full h-px z-0"
                  style={{
                    background: "linear-gradient(90deg, #e8a000, transparent)",
                  }}
                  aria-hidden="true"
                />
              )}
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-4">
                  {step.icon}
                </div>
                <div className="font-display text-5xl font-bold text-smoke leading-none mb-3 select-none" aria-hidden="true">
                  {step.num}
                </div>
                <h3 className="font-display text-lg font-bold text-volcanic mb-2">{step.title}</h3>
                <p className="text-sm text-volcanic/60 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-16 text-center">
          <div className="inline-block bg-pearl rounded-2xl border border-smoke p-8 max-w-lg">
            <p className="font-display text-2xl font-bold text-volcanic mb-2">
              ☀️ Disfrute de la luz.
            </p>
            <p className="text-volcanic/60 mb-6">
              Nosotros del trabajo. Tener ventanas limpias nunca fue tan fácil.
            </p>
            <a
              href={`${WA_LINK}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full shadow-lg"
              aria-label="Solicitar presupuesto gratuito por WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Solicitar presupuesto gratuito
            </a>
            <p className="mt-3 text-xs text-volcanic/40">
              💬 Gratis y sin compromiso · Respuesta en menos de 24 horas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
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
                  <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    services: [] as string[],
    frequency: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const SERVICES = [
    "Limpieza de ventanas",
    "Limpieza de paneles solares",
    "Limpieza post-obra",
    "Rótulos/Carteles y/o Fachadas",
    "Servicio urgente",
  ];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "El nombre es obligatorio";
    if (!form.phone.trim() && !form.email.trim())
      e.contact = "Introduce un teléfono o email de contacto";
    if (form.services.length === 0) e.services = "Selecciona al menos un servicio";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Build WA message
    const msg = encodeURIComponent(
      `Hola ClarityCristal,\n\n` +
        `Nombre: ${form.name}\n` +
        `Teléfono: ${form.phone || "—"}\n` +
        `Email: ${form.email || "—"}\n` +
        `Servicios: ${form.services.join(", ")}\n` +
        `Frecuencia: ${form.frequency || "Por determinar"}\n` +
        `Mensaje: ${form.message || "—"}\n\n` +
        `Solicito presupuesto gratuito.`
    );
    window.open(`${WA_LINK}?text=${msg}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const toggleService = (s: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }));
    setErrors((e) => { const { services: _, ...rest } = e; return rest; });
  };

  if (submitted) {
    return (
      <section id="contacto" className="py-24 lg:py-32 bg-white">
        <div className="max-w-lg mx-auto px-5 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="font-display text-3xl font-bold text-volcanic mb-3">
            ¡Solicitud enviada!
          </h2>
          <p className="text-volcanic/60 mb-6">
            Te hemos redirigido a WhatsApp. Te responderemos en menos de 24 horas con tu presupuesto personalizado.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-gold font-semibold hover:underline"
          >
            ← Nueva solicitud
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contacto"
      className="py-24 lg:py-32 bg-white"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <div>
            <p className="reveal text-gold font-semibold text-sm uppercase tracking-widest mb-3">
              Contacto
            </p>
            <h2
              id="contact-heading"
              className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-bold text-volcanic mb-6"
            >
              Solicita tu{" "}
              <span className="italic text-ocean">presupuesto gratis</span>
            </h2>
            <p className="reveal reveal-delay-2 text-volcanic/60 text-lg mb-10 leading-relaxed">
              Rellena el formulario y te enviamos una cotización detallada adaptada a tus
              necesidades. Sin compromiso, sin letra pequeña.
            </p>

            <div className="reveal reveal-delay-2 space-y-5">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  label: "Teléfono / WhatsApp",
                  value: "+34 604 234 496",
                  href: `tel:+34604234496`,
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  label: "Email",
                  value: "info@claritycristal.com",
                  href: "mailto:info@claritycristal.com",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  ),
                  label: "Dirección",
                  value: "Calle Puerto Rico nº 36, Arrecife, Las Palmas",
                  href: "https://maps.google.com/?q=Arrecife+Lanzarote",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-pearl transition-colors group"
                  aria-label={`${c.label}: ${c.value}`}
                >
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0 group-hover:bg-gold/20 transition-colors">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs text-volcanic/40 font-medium uppercase tracking-wide mb-0.5">
                      {c.label}
                    </p>
                    <p className="text-volcanic font-medium">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="reveal mt-8 p-5 bg-gold/5 border border-gold/20 rounded-2xl">
              <p className="font-semibold text-volcanic text-sm mb-1">🛡️ Garantía de satisfacción</p>
              <p className="text-volcanic/60 text-sm">
                Si no queda perfecto, volvemos sin coste alguno. Sin excusas, sin letra pequeña.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="reveal reveal-delay-2">
            <form
              onSubmit={handleSubmit}
              className="bg-pearl border border-smoke rounded-2xl p-7 space-y-5"
              noValidate
              aria-label="Formulario de solicitud de presupuesto"
            >
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-volcanic mb-1.5">
                  Nombre <span className="text-red-500" aria-label="requerido">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full rounded-xl border px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 transition ${errors.name ? "border-red-400" : "border-smoke"}`}
                  placeholder="Tu nombre completo"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>}
              </div>

              {/* Contact */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-semibold text-volcanic mb-1.5">
                    Teléfono
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl border border-smoke px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 transition"
                    placeholder="+34 600 000 000"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-volcanic mb-1.5">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-smoke px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 transition"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              {errors.contact && <p className="text-red-500 text-xs -mt-3" role="alert">{errors.contact}</p>}

              {/* Services */}
              <div>
                <p className="block text-sm font-semibold text-volcanic mb-2">
                  Servicios <span className="text-red-500" aria-label="requerido">*</span>
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Seleccionar servicios">
                  {SERVICES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggleService(s)}
                      aria-pressed={form.services.includes(s)}
                      className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
                        form.services.includes(s)
                          ? "bg-gold/10 border-gold text-gold"
                          : "bg-white border-smoke text-volcanic/60 hover:border-gold/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {errors.services && <p className="text-red-500 text-xs mt-1" role="alert">{errors.services}</p>}
              </div>

              {/* Frequency */}
              <div>
                <label htmlFor="contact-frequency" className="block text-sm font-semibold text-volcanic mb-1.5">
                  Frecuencia
                </label>
                <select
                  id="contact-frequency"
                  value={form.frequency}
                  onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                  className="w-full rounded-xl border border-smoke px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 transition"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Una sola vez">Una sola vez</option>
                  <option value="Mensual">Mensual</option>
                  <option value="Bimensual">Bimensual</option>
                  <option value="Trimestral">Trimestral</option>
                  <option value="Personalizado">Personalizado</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-volcanic mb-1.5">
                  Mensaje adicional
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-smoke px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 transition resize-none"
                  placeholder="Cuéntanos más sobre tu propiedad, número de ventanas, ubicación..."
                />
              </div>

              <button
                type="submit"
                className="btn-gold w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-xl text-sm"
                aria-label="Enviar solicitud de presupuesto por WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Enviar solicitud por WhatsApp
              </button>

              <p className="text-center text-xs text-volcanic/40">
                🔒 Tus datos están protegidos · Si no queda perfecto, volvemos gratis
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-volcanic text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-white font-display font-bold text-sm">
                C
              </div>
              <span className="font-display text-xl font-bold">
                Clarity<span className="text-gold">Cristal</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Especialistas en limpieza de superficies acristaladas y paneles solares en
              Lanzarote. Servicio profesional y confiable para empresas y particulares.
            </p>
            <div className="flex items-center gap-1 text-xs text-white/30 mb-2">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-gold" aria-hidden="true">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Seguro de Responsabilidad Civil
            </div>
            <p className="text-xs text-white/30">
              Calle Puerto Rico nº 36, Arrecife, Las Palmas
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-white/60 mb-4">
              Servicios
            </h3>
            <nav aria-label="Servicios">
              <ul className="space-y-2">
                {[
                  "Paneles solares",
                  "Empresas y comercios",
                  "Residencial",
                  "Limpieza post-obra",
                  "Rótulos y fachadas",
                ].map((s) => (
                  <li key={s}>
                    <a
                      href="#servicios"
                      className="text-white/50 hover:text-gold text-sm transition-colors"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-white/60 mb-4">
              Contacto
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="tel:+34604234496" className="text-white/50 hover:text-gold text-sm transition-colors">
                  +34 604 234 496
                </a>
              </li>
              <li>
                <a href="mailto:info@claritycristal.com" className="text-white/50 hover:text-gold text-sm transition-colors">
                  info@claritycristal.com
                </a>
              </li>
            </ul>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-white/60 mt-6 mb-4">
              Redes
            </h3>
            <div className="flex gap-3">
              {[
                { label: "Instagram", href: "https://www.instagram.com/claritycristalpro/", icon: "IG" },
                { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61579139587002", icon: "FB" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/daniel-claritycristal-707944397/", icon: "LI" },
                { label: "TikTok", href: "https://www.tiktok.com/@claritycristalpro", icon: "TK" },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gold/20 hover:text-gold text-white/40 flex items-center justify-center text-xs font-bold transition-all"
                  aria-label={`Seguir en ${soc.label}`}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2025 ClarityCristal. Todos los derechos reservados.
          </p>
          <nav aria-label="Legal" className="flex gap-5">
            {["Aviso Legal", "Política de Privacidad", "Términos y Condiciones"].map((l) => (
              <a key={l} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">
                {l}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <a
        href={`${WA_LINK}?text=${WA_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-pulse relative flex items-center gap-3 bg-[#25d366] text-white rounded-full shadow-2xl px-5 py-3.5 font-semibold text-sm hover:scale-105 transition-transform group"
        aria-label="Contactar por WhatsApp para presupuesto gratuito"
      >
        <WhatsAppIcon className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
          Presupuesto gratis
        </span>
      </a>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal();

  return (
    <main>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-white focus:px-4 focus:py-2 focus:rounded-lg font-semibold"
      >
        Saltar al contenido principal
      </a>

      <NavBar />

      <div id="main-content">
        <HeroSection />
        <ServicesSection />
        <BeforeAfterSlider />
        <PacksSection />
        <PricingSection />
        <ValuesSection />
        <ProcessSection />
        <FaqSection />
        <ContactSection />
      </div>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
