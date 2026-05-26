import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Política de Privacidad | ClarityCristal",
  description: "Política de privacidad y protección de datos de ClarityCristal.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-xl font-bold text-volcanic mb-3 pb-2 border-b border-smoke">
        {title}
      </h2>
      <div className="text-volcanic/70 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function PoliticaPrivacidadPage() {
  return (
    <main>
      <NavBar />

      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#002d4a] via-[#0a5272] to-[#001e38]" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-teal-400/15 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-teal-300 font-semibold text-sm uppercase tracking-widest mb-3">Legal</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Política de Privacidad</h1>
          <p className="text-white/50 text-sm">Última actualización: noviembre de 2025</p>
        </div>
      </section>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 py-16">

          <Section title="I. Responsable del tratamiento">
            <ul className="space-y-1">
              <li><strong className="text-volcanic">Nombre comercial:</strong> ClarityCristal</li>
              <li><strong className="text-volcanic">Titular:</strong> NICUSOR DANIEL MIHAI POPA</li>
              <li><strong className="text-volcanic">Domicilio:</strong> Calle Puerto Rico nº 36, Arrecife, Las Palmas</li>
              <li><strong className="text-volcanic">Teléfono:</strong> +34 604 234 496</li>
              <li><strong className="text-volcanic">Correo electrónico:</strong> info@claritycristal.com</li>
            </ul>
            <p>ClarityCristal trata los datos personales de sus usuarios y clientes de conformidad con el Reglamento (UE) 2016/679 del Parlamento Europeo (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).</p>
          </Section>

          <Section title="II. Principios del tratamiento">
            <p>ClarityCristal aplica los principios establecidos en el artículo 5 del RGPD:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong className="text-volcanic">Licitud, lealtad y transparencia:</strong> el tratamiento se basa en bases legales claras y el usuario es informado de forma comprensible.</li>
              <li><strong className="text-volcanic">Limitación de la finalidad:</strong> los datos solo se utilizan para los fines indicados en esta política.</li>
              <li><strong className="text-volcanic">Minimización:</strong> únicamente se recaban los datos estrictamente necesarios.</li>
              <li><strong className="text-volcanic">Exactitud:</strong> los datos se mantienen actualizados en la medida de lo posible.</li>
              <li><strong className="text-volcanic">Limitación del plazo de conservación:</strong> los datos no se guardan más tiempo del necesario.</li>
              <li><strong className="text-volcanic">Integridad y confidencialidad:</strong> se aplican medidas técnicas y organizativas para proteger los datos.</li>
            </ul>
          </Section>

          <Section title="III. Datos que se recaban">
            <p>ClarityCristal puede recoger las siguientes categorías de datos personales:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Datos identificativos: nombre, apellidos, teléfono, correo electrónico, dirección.</li>
              <li>Datos de contacto profesional (para representantes de empresas).</li>
              <li>Datos financieros: IBAN para reembolsos o domiciliaciones.</li>
              <li>Geolocalización del inmueble donde se presta el servicio.</li>
              <li>Fotografías de estado previo y posterior de las superficies limpiadas.</li>
            </ul>
            <p className="mt-2"><strong className="text-volcanic">ClarityCristal no trata categorías especiales de datos personales</strong> (origen étnico, salud, religión, etc.) en ningún momento.</p>
          </Section>

          <Section title="IV. Finalidades y bases jurídicas">
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-pearl">
                    <th className="border border-smoke px-3 py-2 text-left font-semibold text-volcanic">Finalidad</th>
                    <th className="border border-smoke px-3 py-2 text-left font-semibold text-volcanic">Base jurídica</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Gestión de solicitudes y presupuestos", "Interés legítimo / ejecución de contrato"],
                    ["Prestación del servicio de limpieza", "Ejecución del contrato (art. 6.1.b RGPD)"],
                    ["Gestión de garantías y reclamaciones", "Obligación legal / ejecución del contrato"],
                    ["Cumplimiento de obligaciones fiscales y legales", "Obligación legal (art. 6.1.c RGPD)"],
                    ["Envío de comunicaciones comerciales", "Consentimiento del interesado (art. 6.1.a RGPD)"],
                  ].map(([fin, base]) => (
                    <tr key={fin} className="even:bg-pearl/50">
                      <td className="border border-smoke px-3 py-2">{fin}</td>
                      <td className="border border-smoke px-3 py-2">{base}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="V. Plazos de conservación">
            <p>Los datos se conservan durante el tiempo estrictamente necesario para cumplir la finalidad para la que fueron recabados y, en todo caso, mientras existan obligaciones legales que lo requieran:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Datos contractuales: 5 años desde la finalización de la relación contractual (obligaciones civiles y mercantiles).</li>
              <li>Datos fiscales/contables: 4 años (Ley General Tributaria).</li>
              <li>Comunicaciones comerciales: hasta la retirada del consentimiento.</li>
              <li>Fotografías de calidad: 12 meses desde la prestación del servicio, salvo reclamación activa.</li>
            </ul>
          </Section>

          <Section title="VI. Cesión de datos a terceros">
            <p>ClarityCristal no cede ni vende datos personales a terceros con fines comerciales. Los datos únicamente pueden ser comunicados a:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Proveedores de servicios que actúan como encargados del tratamiento (plataformas de gestión, herramientas de comunicación), bajo contrato con las garantías exigidas por el RGPD.</li>
              <li>Administraciones públicas y autoridades competentes, cuando así lo exija la legislación vigente.</li>
              <li>Compañías aseguradoras, en caso de tramitación de siniestros relacionados con el servicio.</li>
            </ul>
          </Section>

          <Section title="VII. Derechos de los interesados">
            <p>Cualquier persona cuyos datos sean tratados por ClarityCristal tiene derecho a:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong className="text-volcanic">Acceso:</strong> conocer qué datos se tratan.</li>
              <li><strong className="text-volcanic">Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong className="text-volcanic">Supresión:</strong> solicitar la eliminación de los datos cuando ya no sean necesarios.</li>
              <li><strong className="text-volcanic">Limitación:</strong> solicitar que se restrinja el tratamiento en determinados supuestos.</li>
              <li><strong className="text-volcanic">Portabilidad:</strong> recibir los datos en formato estructurado y legible por máquina.</li>
              <li><strong className="text-volcanic">Oposición:</strong> oponerse al tratamiento basado en interés legítimo o comunicaciones comerciales.</li>
            </ul>
            <p>Para ejercer cualquiera de estos derechos, el interesado puede dirigirse a <strong className="text-volcanic">info@claritycristal.com</strong> o al domicilio indicado en el apartado I, adjuntando copia de su documento de identidad. ClarityCristal responderá en el plazo máximo de un mes.</p>
            <p>Si considera que el tratamiento no se ajusta a la normativa vigente, tiene derecho a presentar una reclamación ante la <strong className="text-volcanic">Agencia Española de Protección de Datos (AEPD)</strong> — <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">www.aepd.es</a>.</p>
          </Section>

          <Section title="VIII. Medidas de seguridad">
            <p>ClarityCristal adopta medidas técnicas y organizativas para garantizar la seguridad de los datos personales y evitar su alteración, pérdida o acceso no autorizado:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Cifrado en las comunicaciones (protocolo HTTPS/TLS).</li>
              <li>Control de acceso basado en roles.</li>
              <li>Copias de seguridad periódicas.</li>
              <li>Formación del personal en materia de protección de datos.</li>
              <li>Cortafuegos y sistemas antivirus actualizados.</li>
            </ul>
          </Section>

          <Section title="IX. Cookies">
            <p>Este sitio web utiliza cookies propias y de terceros. Para más información sobre qué cookies se utilizan, su finalidad y cómo gestionarlas, consulte nuestra Política de Cookies accesible desde el banner de consentimiento o en el pie de página.</p>
            <p>Las cookies estrictamente técnicas no requieren consentimiento; las cookies analíticas y de preferencia se activan únicamente si el usuario otorga su consentimiento.</p>
          </Section>

          <Section title="X. Modificaciones">
            <p>ClarityCristal se reserva el derecho a actualizar esta Política de Privacidad para adaptarla a cambios legislativos o de negocio. Se recomienda revisar periódicamente esta página. Los cambios sustanciales serán comunicados a los usuarios afectados con una antelación razonable.</p>
          </Section>

          <div className="mt-12 pt-6 border-t border-smoke flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-volcanic/40">
            <p>© 2025 ClarityCristal · NICUSOR DANIEL MIHAI POPA</p>
            <div className="flex gap-4">
              <Link href="/aviso-legal" className="hover:text-volcanic transition-colors">Aviso Legal</Link>
              <Link href="/terminos-y-condiciones" className="hover:text-volcanic transition-colors">Términos y Condiciones</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
