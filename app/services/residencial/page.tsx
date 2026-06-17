import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { ServiceHero } from "@/components/ServiceHero";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { WA_LINK } from "@/lib/data";

const WA_MSG_RESIDENCIAL = encodeURIComponent(
  "Hola, me gustaría solicitar un presupuesto para limpieza de cristales residencial."
);

export default function ResidencialPage() {
  return (
    <main>
      <NavBar />

      <ServiceHero
        index="R"
        eyebrow="Servicio Residencial"
        title={
          <>
            Tu hogar, con la{" "}
            <span className="italic text-ocean">claridad</span> que merece
          </>
        }
        description="Limpieza profesional de ventanas y cristales para viviendas en Lanzarote. Agua ultrapura, sin marcas, sin esfuerzo por tu parte."
        waHref={`${WA_LINK}?text=${WA_MSG_RESIDENCIAL}`}
        ctaLabel="Presupuesto gratis"
      />

      {/* What we clean */}
      <section className="cc-paper-bg-alt cc-seam-top py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="mb-16 flex flex-col items-center text-center">
            <SectionEyebrow index="R—01" label="Qué limpiamos" align="center" />
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-5xl">
              Cubrimos todas las superficies{" "}
              <span className="italic text-ocean">acristaladas</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🪟", title: "Ventanas", desc: "Todos los tamaños. Simple, doble o triple acristalamiento." },
              { icon: "🚪", title: "Puertas correderas", desc: "Balconeras y puertas de terraza, por dentro y por fuera." },
              { icon: "🏠", title: "Contraventanas", desc: "Persianas enrollables y contraventanas de aluminio o PVC." },
              { icon: "🔲", title: "Claraboyas", desc: "Lucernarios y ventanas de techo con acceso seguro." },
            ].map((item) => (
              <div key={item.title} className="cc-card cc-topline overflow-hidden rounded-[20px] p-6 text-center">
                <div className="mb-3 text-4xl" aria-hidden="true">{item.icon}</div>
                <h3 className="mb-2 font-display text-lg font-semibold text-volcanic">{item.title}</h3>
                <p className="text-sm leading-relaxed text-volcanic/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="cc-paper-bg cc-seam-top relative overflow-hidden py-24">
        <div className="cc-grid absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <SectionEyebrow index="R—02" label="¿Por qué elegirnos?" />
              <h2 className="mt-6 mb-6 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-5xl">
                La diferencia está en el{" "}
                <span className="italic text-ocean">agua</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-volcanic/60">
                El agua del grifo deja depósitos de cal al secarse. Nosotros usamos agua
                ultrapura a <strong className="text-volcanic">0 ppm</strong> que se evapora limpiamente, sin dejar
                ningún residuo visible.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "✅", text: "Sin rayas ni manchas de cal — resultado duradero" },
                  { icon: "🌿", text: "Sin productos químicos agresivos — seguro para plantas y mascotas" },
                  { icon: "🔭", text: "Pértigas telescópicas — limpieza desde el suelo, sin escaleras" },
                  { icon: "🛡️", text: "Seguro de responsabilidad civil incluido" },
                  { icon: "⏰", text: "No necesitas estar en casa — solo acceso al exterior" },
                ].map((f) => (
                  <div key={f.text} className="flex items-start gap-3 text-sm text-volcanic/70">
                    <span className="shrink-0 text-base" aria-hidden="true">{f.icon}</span>
                    {f.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-volcanic/10 bg-volcanic/10">
              {[
                { stat: "0 ppm", label: "Pureza del agua" },
                { stat: "+50%", label: "Brillo más duradero" },
                { stat: "100%", label: "Satisfacción garantizada" },
                { stat: "0€", label: "Desplazamiento" },
              ].map((s) => (
                <div key={s.label} className="bg-pearl p-6 text-center">
                  <div className="mb-1 font-display text-4xl font-semibold text-volcanic">{s.stat}</div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-volcanic/45">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="cc-paper-bg-alt cc-seam-top py-24">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <div className="flex flex-col items-center">
            <SectionEyebrow index="R—03" label="Precios claros" align="center" />
          </div>
          <h2 className="mt-6 mb-4 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-5xl">
            Sin sorpresas, sin letra pequeña
          </h2>
          <p className="mb-12 text-volcanic/60">Precio fijo por ventana. Lo que ves es lo que pagas.</p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { type: "Ventana pequeña", price: "4€", note: "Hasta 80×100 cm" },
              { type: "Ventana mediana", price: "5€", note: "Hasta 120×150 cm" },
              { type: "Balconera / Grande", price: "6–8€", note: "Más de 150 cm" },
            ].map((p) => (
              <div key={p.type} className="cc-card cc-topline overflow-hidden rounded-[20px] p-6">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ocean">{p.type}</p>
                <div className="mb-1 font-display text-4xl font-semibold text-volcanic">{p.price}</div>
                <p className="text-xs text-volcanic/40">{p.note}</p>
              </div>
            ))}
          </div>

          <div className="bg-gold/5 border border-gold/20 rounded-2xl p-6 text-left max-w-lg mx-auto mb-10">
            <p className="font-semibold text-volcanic mb-3 text-sm">Incluido en todos los servicios:</p>
            <ul className="space-y-2 text-sm text-volcanic/70">
              {["Limpieza interior y exterior", "Desplazamiento gratuito a toda la isla", "Agua ultrapura desmineralizada", "Garantía de satisfacción total", "Seguro de responsabilidad civil"].map((item) => (
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
            href={`${WA_LINK}?text=${WA_MSG_RESIDENCIAL}`}
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
            <SectionEyebrow index="R—04" label="Preguntas frecuentes" align="center" />
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-5xl">
              Resolvemos tus <span className="italic text-ocean">dudas</span>
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-volcanic/10 bg-white/80 backdrop-blur-sm">
            {[
              { q: "¿Necesito estar en casa?", a: "No. Solo necesitamos acceso al exterior de la vivienda. Te avisamos cuando llegamos y cuando terminamos." },
              { q: "¿Cuánto tiempo tarda la limpieza?", a: "Depende del número de ventanas. Una vivienda media con 10-15 ventanas lleva entre 1 y 2 horas." },
              { q: "¿Limpiáis también por dentro?", a: "Sí. Limpiamos interior y exterior. Solo necesitamos acceso a las habitaciones." },
              { q: "¿Qué pasa si llueve después de la limpieza?", a: "Si llueve en los 3 días posteriores al servicio, podemos volver para repetir la limpieza. Ten en cuenta que esta repetición tendrá un coste adicional." },
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
