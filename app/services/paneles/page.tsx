import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { ServiceHero } from "@/components/ServiceHero";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { WA_LINK } from "@/lib/data";

const WA_MSG_PANELES = encodeURIComponent(
  "Hola, me gustaría solicitar un presupuesto para limpieza de paneles solares."
);

export default function PanelesPage() {
  return (
    <main>
      <NavBar />

      <ServiceHero
        index="P"
        eyebrow="Servicio Paneles Solares"
        title={
          <>
            Recupera hasta el{" "}
            <span className="italic text-gold">+30%</span> de tu energía solar
          </>
        }
        description="La calima y el salitre de Lanzarote hacen que los paneles sucios pierdan hasta el 40% de su rendimiento. Limpiamos con agua ultrapura sin dañar las células fotovoltaicas."
        waHref={`${WA_LINK}?text=${WA_MSG_PANELES}`}
        ctaLabel="Presupuesto gratis"
      />

      {/* The problem in Lanzarote */}
      <section className="cc-paper-bg-alt cc-seam-top py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="mb-16 flex flex-col items-center text-center">
            <SectionEyebrow index="P—01" label="El problema en Lanzarote" align="center" />
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-5xl">
              La calima y el salitre{" "}
              <span className="italic text-ocean">cuestan dinero</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-volcanic/60">
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
              <div key={item.title} className="cc-card cc-topline overflow-hidden rounded-[20px] p-6">
                <div className="mb-3 text-3xl" aria-hidden="true">{item.icon}</div>
                <h3 className="mb-2 font-display text-base font-semibold text-volcanic">{item.title}</h3>
                <p className="text-sm leading-relaxed text-volcanic/60">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Impact stats */}
          <div className="cc-ink-bg relative overflow-hidden rounded-[24px] border border-gold/20 p-10 text-center">
            <div className="cc-grid-dark absolute inset-0" aria-hidden="true" />
            <div className="relative z-10">
              <h3 className="mb-8 font-display text-2xl font-semibold text-white">
                Impacto real en tu instalación
              </h3>
              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  { stat: "25–40%", label: "Pérdida de rendimiento con paneles sucios" },
                  { stat: "+30%", label: "Recuperación tras limpieza profesional" },
                  { stat: "Cientos €", label: "Ahorro anual en factura eléctrica" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="mb-2 font-display text-5xl font-semibold text-gold">{s.stat}</div>
                    <p className="text-sm text-white/60">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our process */}
      <section className="cc-paper-bg cc-seam-top relative overflow-hidden py-24">
        <div className="cc-grid absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <SectionEyebrow index="P—02" label="Nuestro proceso" />
              <h2 className="mt-6 mb-6 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-5xl">
                Limpieza especializada,{" "}
                <span className="italic text-ocean">sin riesgos</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-volcanic/60">
                Los paneles solares requieren cuidado especial. El agua del grifo deja cal
                que reduce aún más la captación. Nosotros usamos <strong className="text-volcanic">agua ultrapura a 0 ppm</strong>
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
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 font-display text-sm font-semibold text-gold">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-volcanic">{step.title}</h4>
                      <p className="mt-0.5 text-sm text-volcanic/60">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="cc-card cc-topline overflow-hidden rounded-[20px] p-6">
                <h3 className="mb-4 font-display text-xl font-semibold text-volcanic">Garantías incluidas</h3>
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

              <div className="rounded-[20px] border border-gold/20 bg-gold/5 p-6">
                <p className="mb-2 text-sm font-semibold text-volcanic">💡 ¿Cada cuánto limpiar?</p>
                <p className="text-sm leading-relaxed text-volcanic/60">
                  En Lanzarote recomendamos limpieza <strong className="text-volcanic">mensual</strong> para uso intensivo y
                  cada 2-3 meses para instalaciones residenciales. Con nuestros planes
                  recurrentes ahorras hasta un 20%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="cc-paper-bg-alt cc-seam-top py-24">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <div className="flex flex-col items-center">
            <SectionEyebrow index="P—03" label="Tarifas paneles solares" align="center" />
          </div>
          <h2 className="mt-6 mb-4 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-5xl">
            Precio justo,{" "}
            <span className="italic text-ocean">rendimiento máximo</span>
          </h2>
          <p className="mb-12 text-volcanic/60">
            La inversión en limpieza profesional se amortiza en pocas semanas gracias a la energía recuperada.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { type: "Residencial", price: "5€", note: "por panel fotovoltaico" },
              { type: "Comercial / Empresa", price: "4€", note: "por panel (desde 20 paneles)" },
              { type: "Instalación grande", price: "Presupuesto", note: "más de 50 paneles" },
            ].map((p) => (
              <div key={p.type} className="cc-card cc-topline overflow-hidden rounded-[20px] p-6">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ocean">{p.type}</p>
                <div className="mb-1 font-display text-3xl font-semibold text-volcanic">{p.price}</div>
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
            className="btn-gold inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-lg shadow-xl"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Solicitar presupuesto gratuito
          </a>
          <p className="mt-3 text-xs text-volcanic/40">💬 Respuesta en menos de 24 horas · Sin compromiso</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="cc-paper-bg cc-seam-top relative overflow-hidden py-24">
        <div className="cc-grid absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl px-5 lg:px-8">
          <div className="mb-12 flex flex-col items-center text-center">
            <SectionEyebrow index="P—04" label="Preguntas frecuentes" align="center" />
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-5xl">
              Resolvemos tus <span className="italic text-ocean">dudas</span>
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-volcanic/10 bg-white/80 backdrop-blur-sm">
            {[
              { q: "¿La lluvia no limpia los paneles?", a: "No. La lluvia en Lanzarote arrastra calima y deposita minerales al secarse, empeorando el estado del panel. Solo agua desmineralizada elimina por completo los residuos." },
              { q: "¿Pueden dañarse los paneles durante la limpieza?", a: "Con nuestra técnica no. Usamos cepillos de microfibra suaves y agua pura a baja presión. Nunca productos abrasivos ni alta presión que puedan dañar las células o el recubrimiento." },
              { q: "¿Cuánto suele mejorar el rendimiento?", a: "En Lanzarote, tras una limpieza profesional, la mejora media es del 20-30%. En paneles muy sucios o con calima acumulada puede llegar al 40%." },
              { q: "¿Necesito apagar la instalación?", a: "No es necesario. Trabajamos con los paneles encendidos y en funcionamiento. Solo en casos especiales pedimos apagado temporal por seguridad." },
              { q: "¿Tenéis plan de mantenimiento mensual?", a: "Sí. Ofrecemos mantenimiento mensual, bimensual y trimestral con descuentos de hasta el 20% sobre tarifa estándar." },
            ].map((item) => (
              <details key={item.q} className="group border-b border-volcanic/8 last:border-0">
                <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 font-semibold text-volcanic transition-colors hover:text-ocean">
                  {item.q}
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 text-gold transition-transform group-open:rotate-180" aria-hidden="true">
                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-volcanic/60">{item.a}</p>
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
