import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { WA_LINK } from "@/lib/data";

const WA_MSG_PANELES = encodeURIComponent(
  "Hola, me gustaría solicitar un presupuesto para limpieza de paneles solares."
);

export default function PanelesPage() {
  return (
    <main>
      <NavBar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1200] via-[#3d2a00] to-[#1a0e00]" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-gold/20 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-amber-400/15 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold-light rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            Servicio Paneles Solares
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Recupera hasta el{" "}
            <span className="text-gold italic">+30%</span> de tu energía solar
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            La calima y el salitre de Lanzarote hacen que los paneles sucios pierdan hasta
            el 40% de su rendimiento. Limpiamos con agua ultrapura sin dañar las células fotovoltaicas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${WA_LINK}?text=${WA_MSG_PANELES}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-3 text-white font-bold px-8 py-4 rounded-full text-lg shadow-2xl"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Presupuesto gratis
            </a>
            <Link href="/" className="text-white/60 hover:text-white font-medium px-6 py-4 border border-white/20 rounded-full transition-colors hover:border-white/40">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </section>

      {/* The problem in Lanzarote */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
              El problema en Lanzarote
            </p>
            <h2 className="font-display text-4xl font-bold text-volcanic">
              La calima y el salitre{" "}
              <span className="italic text-ocean">cuestan dinero</span>
            </h2>
            <p className="text-volcanic/60 mt-4 text-lg max-w-2xl mx-auto">
              Lanzarote tiene condiciones únicas que afectan especialmente al rendimiento de las instalaciones fotovoltaicas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: "🌪️", title: "Calima del Sáhara", desc: "Polvo fino que cubre las células en horas. Invisible pero muy efectivo reduciendo la luz captada." },
              { icon: "🌊", title: "Salitre marino", desc: "La brisa atlántica deposita sal que forma una película opaca y corrosiva en los paneles." },
              { icon: "🌧️", title: "Lluvia ácida", desc: "Las escasas lluvias, lejos de limpiar, depositan más minerales y empeoran el estado." },
              { icon: "☀️", title: "Sol intenso", desc: "El calor seca los depósitos formando costras difíciles de eliminar sin equipo especializado." },
            ].map((item) => (
              <div key={item.title} className="bg-pearl border border-smoke rounded-2xl p-6">
                <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
                <h3 className="font-display text-base font-bold text-volcanic mb-2">{item.title}</h3>
                <p className="text-sm text-volcanic/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Impact stats */}
          <div className="bg-navy rounded-2xl p-10 text-center">
            <h3 className="font-display text-2xl font-bold text-white mb-8">
              Impacto real en tu instalación
            </h3>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { stat: "25–40%", label: "Pérdida de rendimiento con paneles sucios" },
                { stat: "+30%", label: "Recuperación tras limpieza profesional" },
                { stat: "Cientos €", label: "Ahorro anual en factura eléctrica" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-5xl font-bold text-gold mb-2">{s.stat}</div>
                  <p className="text-white/60 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our process */}
      <section className="py-24 bg-pearl">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                Nuestro proceso
              </p>
              <h2 className="font-display text-4xl font-bold text-volcanic mb-6">
                Limpieza especializada,{" "}
                <span className="italic text-ocean">sin riesgos</span>
              </h2>
              <p className="text-volcanic/60 text-lg mb-8 leading-relaxed">
                Los paneles solares requieren cuidado especial. El agua del grifo deja cal
                que reduce aún más la captación. Nosotros usamos <strong>agua ultrapura a 0 ppm</strong>
                {" "}que se evapora limpiamente.
              </p>
              <div className="space-y-5">
                {[
                  { num: "01", title: "Inspección inicial", desc: "Evaluamos el estado de los paneles y medimos la suciedad acumulada." },
                  { num: "02", title: "Pre-aclarado", desc: "Retiramos el polvo suelto con agua pura a baja presión para no dañar las células." },
                  { num: "03", title: "Limpieza profunda", desc: "Cepillos suaves de microfibra con agua desmineralizada (0 ppm). Sin productos químicos." },
                  { num: "04", title: "Aclarado final", desc: "Agua pura para eliminar cualquier resto. Los paneles se secan sin manchas ni cal." },
                ].map((step) => (
                  <div key={step.num} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-display font-bold text-sm shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="font-semibold text-volcanic text-sm">{step.title}</h4>
                      <p className="text-volcanic/60 text-sm mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-white border border-smoke rounded-2xl p-6">
                <h3 className="font-display text-xl font-bold text-volcanic mb-4">Garantías incluidas</h3>
                <div className="space-y-3">
                  {[
                    { icon: "💧", text: "Agua ultrapura 0 ppm — sin cal ni minerales" },
                    { icon: "🧽", text: "Cepillos de microfibra — sin rayaduras" },
                    { icon: "🚫", text: "Sin productos químicos — no daña el recubrimiento antireflectante" },
                    { icon: "🛡️", text: "Seguro de responsabilidad civil incluido" },
                    { icon: "✅", text: "Apto para todos los fabricantes (Solaria, Canadian, Longi, etc.)" },
                  ].map((f) => (
                    <div key={f.text} className="flex items-start gap-3 text-sm text-volcanic/70">
                      <span className="shrink-0 text-base" aria-hidden="true">{f.icon}</span>
                      {f.text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gold/5 border border-gold/20 rounded-2xl p-6">
                <p className="font-semibold text-volcanic text-sm mb-2">💡 ¿Cada cuánto limpiar?</p>
                <p className="text-volcanic/60 text-sm leading-relaxed">
                  En Lanzarote recomendamos limpieza <strong>mensual</strong> para uso intensivo y
                  cada 2-3 meses para instalaciones residenciales. Con nuestros planes
                  recurrentes ahorras hasta un 20%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Tarifas paneles solares
          </p>
          <h2 className="font-display text-4xl font-bold text-volcanic mb-4">
            Precio justo,{" "}
            <span className="italic text-ocean">rendimiento máximo</span>
          </h2>
          <p className="text-volcanic/60 mb-12">
            La inversión en limpieza profesional se amortiza en pocas semanas gracias a la energía recuperada.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { type: "Residencial", price: "5€", note: "por panel fotovoltaico" },
              { type: "Comercial / Empresa", price: "4€", note: "por panel (desde 20 paneles)" },
              { type: "Instalación grande", price: "Presupuesto", note: "más de 50 paneles" },
            ].map((p) => (
              <div key={p.type} className="bg-pearl border border-smoke rounded-2xl p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-ocean mb-2">{p.type}</p>
                <div className="font-display text-3xl font-bold text-volcanic mb-1">{p.price}</div>
                <p className="text-xs text-volcanic/40">{p.note}</p>
              </div>
            ))}
          </div>

          <div className="bg-gold/5 border border-gold/20 rounded-2xl p-6 text-left max-w-lg mx-auto mb-10">
            <p className="font-semibold text-volcanic mb-3 text-sm">Siempre incluido:</p>
            <ul className="space-y-2 text-sm text-volcanic/70">
              {["Desplazamiento gratuito", "Agua ultrapura desmineralizada (0 ppm)", "Equipos especializados para fotovoltaica", "Garantía de satisfacción", "Seguro de responsabilidad civil"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0 text-gold">
                    <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={`${WA_LINK}?text=${WA_MSG_PANELES}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full text-lg shadow-xl"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Solicitar presupuesto gratuito
          </a>
          <p className="mt-3 text-xs text-volcanic/40">💬 Respuesta en menos de 24 horas · Sin compromiso</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-pearl">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-volcanic">
              Preguntas <span className="italic text-ocean">frecuentes</span>
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "¿La lluvia no limpia los paneles?", a: "No. La lluvia en Lanzarote arrastra calima y deposita minerales al secarse, empeorando el estado del panel. Solo agua desmineralizada elimina por completo los residuos." },
              { q: "¿Pueden dañarse los paneles durante la limpieza?", a: "Con nuestra técnica no. Usamos cepillos de microfibra suaves y agua pura a baja presión. Nunca productos abrasivos ni alta presión que puedan dañar las células o el recubrimiento." },
              { q: "¿Cuánto suele mejorar el rendimiento?", a: "En Lanzarote, tras una limpieza profesional, la mejora media es del 20-30%. En paneles muy sucios o con calima acumulada puede llegar al 40%." },
              { q: "¿Necesito apagar la instalación?", a: "No es necesario. Trabajamos con los paneles encendidos y en funcionamiento. Solo en casos especiales pedimos apagado temporal por seguridad." },
              { q: "¿Tenéis plan de mantenimiento mensual?", a: "Sí. Ofrecemos mantenimiento mensual, bimensual y trimestral con descuentos de hasta el 20% sobre tarifa estándar." },
            ].map((item) => (
              <details key={item.q} className="bg-white border border-smoke rounded-2xl overflow-hidden group">
                <summary className="px-6 py-5 font-semibold text-volcanic cursor-pointer hover:text-ocean transition-colors list-none flex items-center justify-between">
                  {item.q}
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0 text-gold group-open:rotate-180 transition-transform" aria-hidden="true">
                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 text-volcanic/60 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
