import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { WA_LINK } from "@/lib/data";

const WA_MSG_RESIDENCIAL = encodeURIComponent(
  "Hola, me gustaría solicitar un presupuesto para limpieza de cristales residencial."
);

export default function ResidencialPage() {
  return (
    <main>
      <NavBar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#002d4a] via-[#0a5272] to-[#001e38]" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-teal-400/15 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 bg-teal-400/15 border border-teal-300/30 text-teal-200 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-teal-400 rounded-full" />
            Servicio Residencial
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Tu hogar, con la{" "}
            <span className="text-emerald-400 italic">claridad</span> que merece
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            Limpieza profesional de ventanas y cristales para viviendas en Lanzarote.
            Agua ultrapura, sin marcas, sin esfuerzo por tu parte.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${WA_LINK}?text=${WA_MSG_RESIDENCIAL}`}
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

      {/* What we clean */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
              Qué limpiamos
            </p>
            <h2 className="font-display text-4xl font-bold text-volcanic">
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
              <div key={item.title} className="bg-pearl border border-smoke rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3" aria-hidden="true">{item.icon}</div>
                <h3 className="font-display text-lg font-bold text-volcanic mb-2">{item.title}</h3>
                <p className="text-sm text-volcanic/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-24 bg-pearl">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                ¿Por qué elegirnos?
              </p>
              <h2 className="font-display text-4xl font-bold text-volcanic mb-6">
                La diferencia está en el{" "}
                <span className="italic text-ocean">agua</span>
              </h2>
              <p className="text-volcanic/60 text-lg mb-8 leading-relaxed">
                El agua del grifo deja depósitos de cal al secarse. Nosotros usamos agua
                ultrapura a <strong>0 ppm</strong> que se evapora limpiamente, sin dejar
                ningún residuo visible.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "✅", text: "Sin rayas ni manchas de cal — resultado duradero" },
                  { icon: "🌿", text: "Sin productos químicos agresivos — seguro para plantas y mascotas" },
                  { icon: "🔭", text: "Pértigas telescópicas — limpieza desde el suelo, sin escaleras" },
                  { icon: "🛡️", text: "Seguro de responsabilidad civil incluido" },
                  { icon: "⏰", text: "No necesitas estar en casa — solo acceso al exterior" },
                  { icon: "🌧️", text: "Lluvia posterior: si llueve en 3 días, la repetición tiene un coste adicional" },
                ].map((f) => (
                  <div key={f.text} className="flex items-start gap-3 text-sm text-volcanic/70">
                    <span className="shrink-0 text-base" aria-hidden="true">{f.icon}</span>
                    {f.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "0 ppm", label: "Pureza del agua" },
                { stat: "+50%", label: "Brillo más duradero" },
                { stat: "100%", label: "Satisfacción garantizada" },
                { stat: "0€", label: "Desplazamiento" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-6 border border-smoke text-center">
                  <div className="font-display text-4xl font-bold text-gold mb-1">{s.stat}</div>
                  <p className="text-xs text-volcanic/50 uppercase tracking-wide font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Precios claros
          </p>
          <h2 className="font-display text-4xl font-bold text-volcanic mb-4">
            Sin sorpresas, sin letra pequeña
          </h2>
          <p className="text-volcanic/60 mb-12">Precio fijo por ventana. Lo que ves es lo que pagas.</p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { type: "Ventana pequeña", price: "4€", note: "Hasta 80×100 cm" },
              { type: "Ventana mediana", price: "5€", note: "Hasta 120×150 cm" },
              { type: "Balconera / Grande", price: "6–8€", note: "Más de 150 cm" },
            ].map((p) => (
              <div key={p.type} className="bg-pearl border border-smoke rounded-2xl p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-ocean mb-2">{p.type}</p>
                <div className="font-display text-4xl font-bold text-volcanic mb-1">{p.price}</div>
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
              { q: "¿Necesito estar en casa?", a: "No. Solo necesitamos acceso al exterior de la vivienda. Te avisamos cuando llegamos y cuando terminamos." },
              { q: "¿Cuánto tiempo tarda la limpieza?", a: "Depende del número de ventanas. Una vivienda media con 10-15 ventanas lleva entre 1 y 2 horas." },
              { q: "¿Limpiáis también por dentro?", a: "Sí. Limpiamos interior y exterior. Solo necesitamos acceso a las habitaciones." },
              { q: "¿Qué pasa si llueve después de la limpieza?", a: "Si llueve en los 3 días posteriores al servicio, podemos volver para repetir la limpieza. Ten en cuenta que esta repetición tendrá un coste adicional." },
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
