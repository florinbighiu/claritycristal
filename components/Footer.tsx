import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#002d4a] via-[#0a3d5c] to-[#001e38] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo/logo.png"
                alt="ClarityCristal"
                width={140}
                height={46}
                className="h-11 w-auto object-contain brightness-0 invert"
              />
              <span className="font-bodoni text-xl font-semibold tracking-wide text-white leading-none">
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
