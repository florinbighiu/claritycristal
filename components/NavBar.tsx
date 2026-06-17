"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SERVICE_LINKS = [
  { href: "/services/residencial", label: "Residencial", desc: "Ventanas y cristales en hogares" },
  { href: "/services/empresas", label: "Empresas", desc: "Comercios, oficinas y locales" },
  { href: "/services/paneles", label: "Paneles Solares", desc: "Limpieza fotovoltaica especializada" },
];

const NAV_ANCHORS = [
  { anchor: "metodo", label: "Método" },
  { anchor: "precios", label: "Precios" },
  { anchor: "faq", label: "FAQ" },
  { anchor: "contacto", label: "Contacto" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = NAV_ANCHORS.map((item) => ({
    href: isHome ? `#${item.anchor}` : `/#${item.anchor}`,
    label: item.label,
  }));

  useEffect(() => {
    setScrolled(window.scrollY > 40);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const linkClass =
    "px-4 py-2 rounded-full text-[15px] font-medium text-volcanic/70 transition-colors hover:text-gold hover:bg-gold/5";

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-4" role="banner">
      <div className="relative flex items-center justify-center px-5 h-10 lg:h-auto">

        {/* Desktop pill — centered */}
        <div
          className={`hidden rounded-full border transition-all duration-300 lg:block ${
            scrolled
              ? "border-volcanic/10 bg-white/70 shadow-lg shadow-volcanic/10 ring-1 ring-white/40 backdrop-blur-xl"
              : "border-volcanic/10 bg-white/40 shadow-md shadow-volcanic/5 backdrop-blur-md"
          }`}
        >
          <div className="flex items-center gap-1 px-8 h-16">
            <nav aria-label="Navegación principal" className="flex items-center gap-1">

              {/* Portada */}
              <a href={isHome ? "#inicio" : "/#inicio"} className={linkClass}>
                Portada
              </a>

              {/* Servicios dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 ${linkClass}`}
                >
                  Servicios
                  <svg viewBox="0 0 24 24" fill="none" className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} aria-hidden="true">
                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Dropdown panel */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-2xl bg-white border border-smoke shadow-xl transition-all duration-200 overflow-hidden ${
                    servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {SERVICE_LINKS.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setServicesOpen(false)}
                      className="flex flex-col px-4 py-3.5 hover:bg-gold/5 transition-colors border-b border-smoke last:border-0 group"
                    >
                      <span className="text-sm font-semibold text-volcanic group-hover:text-gold transition-colors">{s.label}</span>
                      <span className="text-xs text-volcanic/50 mt-0.5">{s.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Rest of links */}
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className={linkClass}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile — hamburger button only, top-right */}
        <div className="lg:hidden absolute right-5 top-0">
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full border text-volcanic transition-all duration-300 ${
              scrolled
                ? "border-volcanic/10 bg-white/70 shadow-md backdrop-blur-xl"
                : "border-volcanic/10 bg-white/50 shadow-sm backdrop-blur-md"
            }`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile menu — drops below */}
      <div
        id="mobile-menu"
        className={`lg:hidden mx-5 mt-2 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg transition-all duration-300 overflow-hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="px-4 py-3 flex flex-col gap-1">
          <a
            href={isHome ? "#inicio" : "/#inicio"}
            onClick={() => setOpen(false)}
            className="px-3 py-2.5 rounded-xl text-volcanic/80 hover:text-gold hover:bg-gold/5 font-medium transition-colors text-sm"
          >
            Portada
          </a>

          {/* Servicios group */}
          <div className="px-3 py-2">
            <p className="text-xs font-bold uppercase tracking-widest text-volcanic/40 mb-2">Servicios</p>
            {SERVICE_LINKS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2 text-sm text-volcanic/80 hover:text-gold transition-colors"
              >
                <span className="w-1 h-1 rounded-full bg-gold/60 shrink-0" />
                {s.label}
              </Link>
            ))}
          </div>

          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-xl text-volcanic/80 hover:text-gold hover:bg-gold/5 font-medium transition-colors text-sm"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
