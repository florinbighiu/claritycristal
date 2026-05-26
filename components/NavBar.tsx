"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const NAV_ANCHORS = [
  { anchor: "servicios", label: "Servicios" },
  { anchor: "metodo", label: "Método" },
  { anchor: "precios", label: "Precios" },
  { anchor: "faq", label: "FAQ" },
  { anchor: "contacto", label: "Contacto" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-4" role="banner">
      <div className="relative flex items-center justify-center px-5 h-10 lg:h-auto">

        {/* Logo — always visible, anchored top-left outside the pill */}
        <Link
          href={isHome ? "#" : "/"}
          className="absolute left-5 top-0 flex items-center group"
          aria-label="ClarityCristal - volver al inicio"
        >
          <Image
            src="/images/logo/logo.png"
            alt="ClarityCristal"
            width={160}
            height={52}
            className={`h-12 w-auto object-contain transition-all duration-300 group-hover:opacity-80 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
            priority
          />
        </Link>

        {/* Desktop pill — centered */}
        <div
          className={`hidden lg:block rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-white/30 border-black/10 backdrop-blur-xl shadow-lg shadow-black/15 ring-1 ring-black/5"
              : "bg-white/5 border-white/20 backdrop-blur-sm shadow-md shadow-black/10"
          }`}
        >
          <div className="flex items-center gap-1 px-8 h-16">
            <nav aria-label="Navegación principal" className="flex items-center gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`px-4 py-2 rounded-full text-base font-medium transition-colors ${
                    scrolled
                      ? "text-volcanic/70 hover:text-volcanic hover:bg-black/5"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile — hamburger button only, top-right */}
        <div className="lg:hidden absolute right-5 top-0">
          <button
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
              scrolled
                ? "bg-white/30 border-black/10 backdrop-blur-xl text-volcanic shadow-md"
                : "bg-white/5 border-white/20 backdrop-blur-sm text-white"
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
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="px-4 py-3 flex flex-col gap-1">
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
