"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { WA_LINK, WA_MSG } from "@/lib/data";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

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

  // On the home page use anchor-only links; elsewhere prefix with / so the
  // browser navigates to the home page and then scrolls to the section.
  const navLinks = NAV_ANCHORS.map((item) => ({
    href: isHome ? `#${item.anchor}` : `/#${item.anchor}`,
    label: item.label,
  }));

  // Re-evaluate scroll state immediately on every navigation so the navbar
  // doesn't carry stale state from the previous page (e.g. white on dark hero).
  useEffect(() => {
    setScrolled(window.scrollY > 40);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md scrolled" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            href={isHome ? "#" : "/"}
            className="flex items-center group"
            aria-label="ClarityCristal - volver al inicio"
          >
            <Image
              src="/images/logo/logo.png"
              alt="ClarityCristal"
              width={180}
              height={60}
              className={`h-14 w-auto object-contain transition-all duration-300 group-hover:opacity-90 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
              priority
            />
          </Link>

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
