import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#002d4a] via-[#0a3d5c] to-[#001e38] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/images/logo/logo.png"
                alt="ClarityCristal"
                width={200}
                height={66}
                className="h-16 w-auto object-contain brightness-0 invert"
              />
              <span className="font-serif text-2xl font-semibold tracking-wide text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] leading-none">
                Clarity<span className="text-gold">Cristal</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Especialistas en limpieza de superficies acristaladas y paneles solares en
              Lanzarote. Servicio profesional y confiable para empresas y particulares.
            </p>
            <div className="flex items-center gap-1 text-xs text-white/30 mb-2">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-gold" aria-hidden="true">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Seguro de Responsabilidad Civil
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-white/60 mb-4">
              Servicios
            </h3>
            <nav aria-label="Servicios">
              <ul className="space-y-2">
                {[
                  { label: "Paneles solares", href: "/services/paneles" },
                  { label: "Empresas y comercios", href: "/services/empresas" },
                  { label: "Residencial", href: "/services/residencial" },
                  { label: "Limpieza post-obra", href: "/#servicios" },
                  { label: "Rótulos y fachadas", href: "/#servicios" },
                ].map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="text-white/50 hover:text-gold text-sm transition-colors"
                    >
                      {s.label}
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
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/claritycristalpro/",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ),
                },
                {
                  label: "Facebook",
                  href: "https://www.facebook.com/profile.php?id=61579139587002",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/daniel-claritycristal-707944397/",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  label: "TikTok",
                  href: "https://www.tiktok.com/@claritycristalpro",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
                    </svg>
                  ),
                },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gold/20 hover:text-gold text-white/40 flex items-center justify-center transition-all"
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
            © 2026 ClarityCristal. Todos los derechos reservados.
          </p>
          <p className="text-white/30 text-xs">
            Diseñado y desarrollado por - {" "}
            <a href="https://florinbighiu.dev" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-gold transition-colors">Florin Bighiu</a>
          </p>
          <nav aria-label="Legal" className="flex gap-5">
            {[
              { label: "Aviso Legal", href: "/aviso-legal" },
              { label: "Política de Privacidad", href: "/politica-de-privacidad" },
              { label: "Términos y Condiciones", href: "/terminos-y-condiciones" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="text-white/30 hover:text-white/60 text-xs transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
