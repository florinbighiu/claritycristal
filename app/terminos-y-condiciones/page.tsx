import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Términos y Condiciones | ClarityCristal",
  description: "Términos y condiciones de contratación de los servicios de ClarityCristal.",
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

export default function TerminosCondicionesPage() {
  return (
    <main>
      <NavBar />

      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#002d4a] via-[#0a5272] to-[#001e38]" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-teal-400/15 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-teal-300 font-semibold text-sm uppercase tracking-widest mb-3">Legal</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Términos y Condiciones</h1>
          <p className="text-white/50 text-sm">Última actualización: noviembre de 2025</p>
        </div>
      </section>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 py-16">

          <Section title="I. Naturaleza y ámbito">
            <p>Las presentes Condiciones Generales regulan la contratación de los servicios ofrecidos por <strong className="text-volcanic">ClarityCristal</strong>, titularidad de <strong className="text-volcanic">NICUSOR DANIEL MIHAI POPA</strong>, con domicilio en Calle Puerto Rico nº 36, Arrecife, Las Palmas, accesible en https://claritycristal.com.</p>
            <p>La contratación de cualquier servicio de ClarityCristal implica la aceptación plena de estas condiciones, sin perjuicio de las condiciones particulares que pudieran acordarse por escrito entre las partes.</p>
            <p>ClarityCristal opera de conformidad con el Texto Refundido de la Ley General para la Defensa de los Consumidores y Usuarios (TRLGDCU), la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI) y la normativa aplicable en las Islas Canarias.</p>
          </Section>

          <Section title="II. Servicios ofrecidos">
            <p>ClarityCristal presta, entre otros, los siguientes servicios profesionales en Lanzarote:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Limpieza de ventanas y cristales residenciales.</li>
              <li>Limpieza de escaparates, fachadas y cristaleras comerciales.</li>
              <li>Limpieza de paneles solares fotovoltaicos (residencial, comercial e industrial).</li>
              <li>Limpieza post-obra.</li>
              <li>Limpieza de rótulos, carteles y fachadas.</li>
              <li>Servicio urgente.</li>
            </ul>
            <p>Todos los servicios se prestan con personal cualificado, equipos profesionales y agua desmineralizada (0 ppm), siguiendo los protocolos de seguridad vigentes.</p>
          </Section>

          <Section title="III. Formación del contrato">
            <p>El contrato se perfecciona cuando el cliente acepta expresamente el presupuesto facilitado por ClarityCristal. Dicha aceptación podrá realizarse por correo electrónico, WhatsApp, llamada telefónica o firma física.</p>
            <p>ClarityCristal confirmará el pedido por un medio duradero, indicando: partes intervinientes, descripción detallada del servicio, fecha prevista, precio total con desglose del IGIC (7%), forma de pago y referencia a estas condiciones.</p>
            <p>Los presupuestos tienen una validez de <strong className="text-volcanic">treinta (30) días naturales</strong> desde su emisión, salvo indicación contraria.</p>
          </Section>

          <Section title="IV. Precios y forma de pago">
            <p>Los precios se determinan mediante presupuesto personalizado, atendiendo a variables como la superficie, altura, accesibilidad, nivel de suciedad, necesidad de medios auxiliares y ubicación geográfica. Todos los precios incluyen el <strong className="text-volcanic">IGIC al 7%</strong> (Impuesto General Indirecto Canario).</p>
            <p>Tarifas orientativas:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Ventanas residenciales: desde <strong className="text-volcanic">4 € por ventana</strong>.</li>
              <li>Superficie comercial: precio a <strong className="text-volcanic">consultar según superficie</strong>.</li>
              <li>Paneles solares: desde <strong className="text-volcanic">5 € por panel</strong>.</li>
              <li>Desplazamiento: <strong className="text-volcanic">gratuito</strong> en toda la isla de Lanzarote.</li>
            </ul>
            <p>Los métodos de pago aceptados son <strong className="text-volcanic">efectivo y transferencia bancaria</strong>. El pago se realiza a la finalización del servicio, salvo acuerdo distinto. ClarityCristal emitirá factura oficial conforme a la normativa tributaria vigente.</p>
          </Section>

          <Section title="V. Obligaciones de las partes">
            <p><strong className="text-volcanic">ClarityCristal se compromete a:</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Ejecutar el servicio con la diligencia profesional debida.</li>
              <li>Respetar la fecha y hora acordadas, salvo causa de fuerza mayor o condiciones meteorológicas adversas, notificando previamente al cliente.</li>
              <li>Utilizar agua desmineralizada y equipos adecuados para evitar daños en las superficies.</li>
            </ul>
            <p className="mt-3"><strong className="text-volcanic">El cliente se compromete a:</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Facilitar el acceso a las instalaciones en el horario acordado.</li>
              <li>Retirar o proteger objetos de valor situados junto a las superficies a limpiar.</li>
              <li>Informar de condiciones especiales del material (cristales templados, recubrimientos, etc.).</li>
              <li>Controlar mascotas domésticas durante la prestación del servicio.</li>
              <li>Proporcionar punto de agua, salvo acuerdo en contrario.</li>
            </ul>
            <p>Si el cliente no facilita el acceso sin previo aviso de al menos 24 horas, ClarityCristal podrá repercutir hasta el <strong className="text-volcanic">50 % del importe del servicio</strong> en concepto de gastos de movilización.</p>
          </Section>

          <Section title="VI. Garantía de calidad y satisfacción">
            <p>ClarityCristal ofrece una <strong className="text-volcanic">Garantía 100 % de Satisfacción</strong>:</p>
            <ul className="list-disc list-inside space-y-1 mt-3">
              <li><strong className="text-volcanic">Repetición del servicio:</strong> si el cliente no queda satisfecho con la calidad de la limpieza, ClarityCristal repetirá las zonas deficientes sin coste adicional, siempre que la incidencia sea imputable a ClarityCristal.</li>
              <li><strong className="text-volcanic">Plazo de notificación:</strong> el cliente dispone de <strong>24 horas</strong> desde la finalización del servicio para comunicar cualquier incidencia a través de correo electrónico o WhatsApp, describiendo las zonas afectadas. ClarityCristal responderá en un plazo máximo de 72 horas.</li>
              <li><strong className="text-volcanic">Lluvia posterior al servicio:</strong> si llueve en los días siguientes a la prestación del servicio en el plazo acordado (3, 5 o 7 días según el plan contratado), ClarityCristal podrá repetir el servicio con un coste adicional.</li>
            </ul>
            <p>La garantía no cubre:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Suciedad posterior derivada de condiciones meteorológicas o factores externos.</li>
              <li>Deterioro natural del material o degradación ambiental.</li>
              <li>Daños preexistentes no comunicados por el cliente antes del servicio.</li>
              <li>Disconformidades de carácter puramente subjetivo sin fundamento objetivo.</li>
            </ul>
          </Section>

          <Section title="VII. Desistimiento, cancelaciones y reembolsos">
            <p><strong className="text-volcanic">Derecho de desistimiento:</strong> para contratos celebrados íntegramente a distancia, el cliente podrá desistir antes de que comience la ejecución del servicio. Este derecho no aplica una vez iniciado el servicio con el consentimiento expreso y previo del cliente y con conocimiento de la pérdida del derecho al desistimiento.</p>
            <p><strong className="text-volcanic">Procedimiento:</strong> el cliente debe notificar su desistimiento por escrito a <strong>info@claritycristal.com</strong> dentro de los 14 días naturales siguientes a la celebración del contrato. ClarityCristal reembolsará los importes abonados en un plazo máximo de 14 días usando el mismo método de pago.</p>
            <p><strong className="text-volcanic">Reembolso por garantía:</strong> si, tras la repetición del servicio, el cliente sigue insatisfecho por causa objetivamente imputable a ClarityCristal, tendrá derecho al reembolso íntegro del importe pagado mediante transferencia bancaria en un plazo de 14 días desde la solicitud escrita.</p>
            <p>No procederá reembolso cuando el cliente cancele tras el inicio del trabajo, cuando la reclamación carezca de fundamento objetivo o cuando el cliente haya incumplido sus obligaciones.</p>
          </Section>

          <Section title="VIII. Responsabilidad civil y seguros">
            <p>ClarityCristal asume plena responsabilidad por los daños materiales y personales directamente causados por una ejecución negligente o defectuosa del servicio. La empresa cuenta con un <strong className="text-volcanic">seguro de responsabilidad civil profesional</strong> que cubre los posibles daños a terceros dentro de los límites de la póliza.</p>
            <p>El cliente deberá comunicar cualquier incidente inmediatamente, adjuntando la documentación acreditativa correspondiente.</p>
            <p>Queda excluida la responsabilidad de ClarityCristal por:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Defectos ocultos preexistentes no detectables mediante inspección visual ordinaria.</li>
              <li>Fenómenos meteorológicos o causas de fuerza mayor.</li>
              <li>Actuaciones de terceros ajenos a ClarityCristal.</li>
              <li>Incumplimiento de las obligaciones del cliente.</li>
              <li>Daños indirectos, lucro cesante o pérdida de negocio.</li>
            </ul>
          </Section>

          <Section title="IX. Planes de mantenimiento recurrente">
            <p>ClarityCristal ofrece contratos de mantenimiento periódico con las siguientes condiciones generales:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong className="text-volcanic">Claridad Esencial:</strong> 3 sesiones/año, descuento del 10 %, garantía de lluvia 3 días.</li>
              <li><strong className="text-volcanic">Claridad Plus:</strong> 6 sesiones/año, descuento del 15 %, garantía de lluvia 5 días, prioridad en agenda.</li>
              <li><strong className="text-volcanic">Claridad Elite:</strong> 10 sesiones/año, descuento del 20 %, garantía de lluvia 7 días, atención VIP.</li>
            </ul>
            <p>Los planes pueden cancelarse en cualquier momento sin penalización, con un preaviso mínimo de 15 días naturales. Los servicios ya programados dentro del periodo de preaviso se ejecutarán normalmente.</p>
          </Section>

          <Section title="X. Propiedad intelectual">
            <p>Todos los contenidos del sitio web son propiedad de ClarityCristal o de terceros que han autorizado su uso. Queda prohibida su reproducción, distribución o uso comercial sin autorización expresa y escrita. Para más información, consulte el <Link href="/aviso-legal" className="text-ocean hover:underline">Aviso Legal</Link>.</p>
          </Section>

          <Section title="XI. Protección de datos">
            <p>El tratamiento de datos personales derivado de la contratación de servicios se rige por la <Link href="/politica-de-privacidad" className="text-ocean hover:underline">Política de Privacidad</Link> de ClarityCristal, accesible en el sitio web.</p>
          </Section>

          <Section title="XII. Ley aplicable y jurisdicción">
            <p>Las presentes condiciones se rigen por la legislación española. Para la resolución de controversias con consumidores, serán competentes los tribunales del domicilio del consumidor. Para controversias entre empresas, ambas partes se someten a los Juzgados y Tribunales de Lanzarote, renunciando a cualquier otro fuero.</p>
            <p>Si alguna cláusula fuera declarada nula o inaplicable, las restantes mantendrán su plena vigencia y eficacia.</p>
          </Section>

          <div className="mt-12 pt-6 border-t border-smoke flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-volcanic/40">
            <p>© 2025 ClarityCristal · NICUSOR DANIEL MIHAI POPA</p>
            <div className="flex gap-4">
              <Link href="/aviso-legal" className="hover:text-volcanic transition-colors">Aviso Legal</Link>
              <Link href="/politica-de-privacidad" className="hover:text-volcanic transition-colors">Privacidad</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
