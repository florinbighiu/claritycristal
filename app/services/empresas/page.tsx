import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { ServiceHero } from "@/components/ServiceHero";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { WA_LINK } from "@/lib/data";

const WA_MSG_EMPRESAS = encodeURIComponent(
  "Hola, me gustaría solicitar un presupuesto para limpieza de cristales para mi negocio/alojamiento."
);

export default function EmpresasPage() {
  return (
    <main>
      <NavBar />

      <ServiceHero
        index="E"
        eyebrow="Servicio Empresas & Alojamientos"
        title={
          <>
            Tu negocio, siempre{" "}
            <span className="italic text-ocean">impecable</span>
          </>
        }
        description="Escaparates, fachadas y cristaleras siempre limpias, sin interferir en tu actividad. Servicio profesional para hoteles, oficinas, comercios y alojamientos turísticos."
        waHref={`${WA_LINK}?text=${WA_MSG_EMPRESAS}`}
        ctaLabel="Presupuesto para empresa"
      />

      {/* Types of businesses */}
      <section className="cc-paper-bg-alt cc-seam-top py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="mb-16 flex flex-col items-center text-center">
            <SectionEyebrow index="E—01" label="Atendemos a" align="center" />
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-5xl">
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
              <div key={item.title} className="cc-card cc-topline overflow-hidden rounded-[20px] p-6">
                <div className="mb-3 text-3xl" aria-hidden="true">{item.icon}</div>
                <h3 className="mb-2 font-display text-lg font-semibold text-volcanic">{item.title}</h3>
                <p className="text-sm leading-relaxed text-volcanic/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="cc-ink-bg cc-seam-gold noise relative overflow-hidden py-24">
        <div className="cc-grid-dark absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <SectionEyebrow index="E—02" label="Ventajas para tu negocio" tone="dark" />
              <h2 className="mt-6 mb-6 font-display text-4xl font-semibold tracking-tight text-white lg:text-5xl">
                Limpieza que no{" "}
                <span className="italic text-gold">interrumpe</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-white/60">
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

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {[
                { stat: "—", label: "Consultar / m²" },
                { stat: "0€", label: "Desplazamiento" },
                { stat: "24h", label: "Respuesta" },
                { stat: "100%", label: "Garantizado" },
              ].map((s) => (
                <div key={s.label} className="bg-[#0a1830]/60 p-6 text-center">
                  <div className="mb-1 font-display text-4xl font-semibold text-gold">{s.stat}</div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-white/50">{s.label}</p>
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
            <SectionEyebrow index="E—03" label="Tarifas comerciales" align="center" />
          </div>
          <h2 className="mt-6 mb-4 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-5xl">
            Precios adaptados a{" "}
            <span className="italic text-ocean">tu negocio</span>
          </h2>
          <p className="mb-12 text-volcanic/60">Para presupuestos de gran volumen o contratos anuales, contacta directamente.</p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { type: "Escaparates", price: "Consultar", note: "por m² de superficie" },
              { type: "Cristaleras", price: "Consultar", note: "por m² incluye marco" },
              { type: "Fachadas completas", price: "Presupuesto", note: "según dimensiones" },
            ].map((p) => (
              <div key={p.type} className="cc-card cc-topline overflow-hidden rounded-[20px] p-6">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ocean">{p.type}</p>
                <div className="mb-1 font-display text-3xl font-semibold text-volcanic">{p.price}</div>
                <p className="text-xs text-volcanic/40">{p.note}</p>
              </div>
            ))}
          </div>

          <a
            href={`${WA_LINK}?text=${WA_MSG_EMPRESAS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-lg shadow-xl"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Solicitar presupuesto empresarial
          </a>
          <p className="mt-3 text-xs text-volcanic/40">💬 Respuesta en menos de 24 horas · Contrato sin permanencia</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="cc-paper-bg cc-seam-top relative overflow-hidden py-24">
        <div className="cc-grid absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl px-5 lg:px-8">
          <div className="mb-12 flex flex-col items-center text-center">
            <SectionEyebrow index="E—04" label="Preguntas frecuentes" align="center" />
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-5xl">
              Resolvemos tus <span className="italic text-ocean">dudas</span>
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-volcanic/10 bg-white/80 backdrop-blur-sm">
            {[
              { q: "¿Podéis limpiar fuera del horario de apertura?", a: "Sí. Trabajamos en el horario que más te convenga: madrugada, fines de semana o festivos. No interrumpiremos tu actividad ni tu atención a clientes." },
              { q: "¿Emitís factura oficial?", a: "Sí. Emitimos factura oficial con IVA desglosado para que puedas deducirla como gasto de empresa." },
              { q: "¿Tenéis seguro de responsabilidad civil?", a: "Sí. Disponemos de seguro de responsabilidad civil vigente. Puedes solicitarnos el certificado si lo necesitas." },
              { q: "¿Hacéis contratos de mantenimiento?", a: "Sí. Ofrecemos contratos recurrentes mensuales, bimensuales o trimestrales con descuentos de hasta el 20% sobre tarifa normal." },
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
