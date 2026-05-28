import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { WA_LINK } from "@/lib/data";

const WA_MSG_EMPRESAS = encodeURIComponent(
  "Hola, me gustaría solicitar un presupuesto para limpieza de cristales para mi negocio/alojamiento."
);

export default function EmpresasPage() {
  return (
    <main>
      <NavBar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f3d] via-[#1a3a6b] to-[#0a1428]" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-ocean/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold-light rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-gold rounded-full" />
            Servicio Empresas & Alojamientos
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Tu negocio, siempre{" "}
            <span className="text-gold italic">impecable</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            Escaparates, fachadas y cristaleras siempre limpias, sin interferir en tu actividad.
            Servicio profesional para hoteles, oficinas, comercios y alojamientos turísticos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`${WA_LINK}?text=${WA_MSG_EMPRESAS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-3 text-white font-bold px-8 py-4 rounded-full text-lg shadow-2xl"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Presupuesto para empresa
            </a>
            <Link href="/" className="text-white/60 hover:text-white font-medium px-6 py-4 border border-white/20 rounded-full transition-colors hover:border-white/40">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </section>

      {/* Types of businesses */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
              Atendemos a
            </p>
            <h2 className="font-display text-4xl font-bold text-volcanic">
              Todos los tipos de{" "}
              <span className="italic text-ocean">negocio</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🏨", title: "Hoteles & Alojamientos", desc: "Habitaciones, zonas comunes y fachadas. Check-out impecable para cada huésped." },
              { icon: "🛍️", title: "Tiendas & Comercios", desc: "Escaparates que atraen clientes. Limpieza fuera de horario para no interrumpir." },
              { icon: "🍽️", title: "Restaurantes & Bares", desc: "Terrazas acristaladas, divisorias y ventanales. Ambiente siempre limpio." },
              { icon: "🏢", title: "Oficinas", desc: "Cristaleras de entrada y fachadas que proyectan imagen profesional." },
              { icon: "🏥", title: "Clínicas & Centros", desc: "Higiene y limpieza rigurosa. Certificado de servicio disponible." },
              { icon: "🏠", title: "Apartamentos turísticos", desc: "Servicio entre reservas para que cada huésped llegue a un espacio impecable." },
            ].map((item) => (
              <div key={item.title} className="bg-pearl border border-smoke rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
                <h3 className="font-display text-lg font-bold text-volcanic mb-2">{item.title}</h3>
                <p className="text-sm text-volcanic/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                Ventajas para tu negocio
              </p>
              <h2 className="font-display text-4xl font-bold text-white mb-6">
                Limpieza que no{" "}
                <span className="italic text-gold">interrumpe</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Sabemos que tu tiempo es dinero. Por eso trabajamos en el horario que mejor
                te convenga — madrugada, fines de semana o festivos.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "🕐", text: "Horario flexible: madrugadas, fines de semana, festivos" },
                  { icon: "📋", text: "Factura oficial y seguro de responsabilidad civil" },
                  { icon: "🔄", text: "Planes de mantenimiento recurrente con descuento hasta 20%" },
                  { icon: "📞", text: "Atención prioritaria para clientes con contrato" },
                  { icon: "🛡️", text: "Garantía total: si no queda perfecto, volvemos gratis" },
                  { icon: "🚗", text: "Desplazamiento gratuito a cualquier punto de Lanzarote" },
                ].map((f) => (
                  <div key={f.text} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="shrink-0 text-base" aria-hidden="true">{f.icon}</span>
                    {f.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "—", label: "Consultar / m²" },
                { stat: "0€", label: "Desplazamiento" },
                { stat: "24h", label: "Respuesta" },
                { stat: "100%", label: "Garantizado" },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <div className="font-display text-4xl font-bold text-gold mb-1">{s.stat}</div>
                  <p className="text-xs text-white/50 uppercase tracking-wide font-medium">{s.label}</p>
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
            Tarifas comerciales
          </p>
          <h2 className="font-display text-4xl font-bold text-volcanic mb-4">
            Precios adaptados a{" "}
            <span className="italic text-ocean">tu negocio</span>
          </h2>
          <p className="text-volcanic/60 mb-12">Para presupuestos de gran volumen o contratos anuales, contacta directamente.</p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { type: "Escaparates", price: "Consultar", note: "por m² de superficie" },
              { type: "Cristaleras", price: "Consultar", note: "por m² incluye marco" },
              { type: "Fachadas completas", price: "Presupuesto", note: "según dimensiones" },
            ].map((p) => (
              <div key={p.type} className="bg-pearl border border-smoke rounded-2xl p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-ocean mb-2">{p.type}</p>
                <div className="font-display text-3xl font-bold text-volcanic mb-1">{p.price}</div>
                <p className="text-xs text-volcanic/40">{p.note}</p>
              </div>
            ))}
          </div>

          <a
            href={`${WA_LINK}?text=${WA_MSG_EMPRESAS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full text-lg shadow-xl"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Solicitar presupuesto empresarial
          </a>
          <p className="mt-3 text-xs text-volcanic/40">💬 Respuesta en menos de 24 horas · Contrato sin permanencia</p>
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
              { q: "¿Podéis limpiar fuera del horario de apertura?", a: "Sí. Trabajamos en el horario que más te convenga: madrugada, fines de semana o festivos. No interrumpiremos tu actividad ni tu atención a clientes." },
              { q: "¿Emitís factura oficial?", a: "Sí. Emitimos factura oficial con IVA desglosado para que puedas deducirla como gasto de empresa." },
              { q: "¿Tenéis seguro de responsabilidad civil?", a: "Sí. Disponemos de seguro de responsabilidad civil vigente. Puedes solicitarnos el certificado si lo necesitas." },
              { q: "¿Hacéis contratos de mantenimiento?", a: "Sí. Ofrecemos contratos recurrentes mensuales, bimensuales o trimestrales con descuentos de hasta el 20% sobre tarifa normal." },
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
