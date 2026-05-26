import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Aviso Legal | ClarityCristal",
  description: "Aviso legal e información corporativa de ClarityCristal.",
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

export default function AvisoLegalPage() {
  return (
    <main>
      <NavBar />

      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#002d4a] via-[#0a5272] to-[#001e38]" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-teal-400/15 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-teal-300 font-semibold text-sm uppercase tracking-widest mb-3">Legal</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Aviso Legal</h1>
          <p className="text-white/50 text-sm">Última actualización: noviembre de 2025</p>
        </div>
      </section>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 py-16">

          <Section title="I. Identificación del titular">
            <p>En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan a continuación los datos de identificación del titular del sitio web:</p>
            <ul className="space-y-1 mt-3">
              <li><strong className="text-volcanic">Nombre comercial:</strong> ClarityCristal</li>
              <li><strong className="text-volcanic">Titular:</strong> NICUSOR DANIEL MIHAI POPA</li>
              <li><strong className="text-volcanic">Domicilio:</strong> Calle Puerto Rico nº 36, Arrecife, Las Palmas</li>
              <li><strong className="text-volcanic">Teléfono:</strong> +34 604 234 496</li>
              <li><strong className="text-volcanic">Correo electrónico:</strong> info@claritycristal.com</li>
              <li><strong className="text-volcanic">Sitio web:</strong> https://claritycristal.com</li>
              <li><strong className="text-volcanic">Actividad:</strong> Limpieza profesional de superficies acristaladas, fachadas comerciales y paneles solares fotovoltaicos</li>
            </ul>
          </Section>

          <Section title="II. Objeto y ámbito de aplicación">
            <p>El presente Aviso Legal regula el acceso y uso del sitio web https://claritycristal.com, así como los contenidos, servicios e información que se ponen a disposición de los usuarios. El acceso y uso del sitio web implica la aceptación plena de las condiciones establecidas en este Aviso Legal.</p>
            <p>ClarityCristal se reserva el derecho a modificar el presente aviso en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio web.</p>
          </Section>

          <Section title="III. Propiedad intelectual e industrial">
            <p>Todos los contenidos del sitio web —incluyendo, sin carácter limitativo, textos, fotografías, gráficos, imágenes, iconos, logotipos, videos, software y bases de datos— son titularidad de ClarityCristal o de terceros que han autorizado su uso, y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.</p>
            <p>Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación de dichos contenidos sin autorización previa y escrita de ClarityCristal. El uso no autorizado de los contenidos podrá dar lugar al ejercicio de las acciones legales correspondientes.</p>
            <p>Los usuarios que crean que algún contenido del sitio web infringe sus derechos de propiedad intelectual pueden comunicarlo a: <strong className="text-volcanic">info@claritycristal.com</strong>, indicando la descripción del derecho presuntamente infringido y la URL del contenido en cuestión.</p>
          </Section>

          <Section title="IV. Responsabilidad">
            <p>ClarityCristal no se hace responsable de los daños o perjuicios que pudieran derivarse de:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Interrupciones, errores o problemas técnicos en el acceso al sitio web.</li>
              <li>La presencia de virus u otros elementos lesivos en los contenidos que puedan producir alteraciones en los sistemas informáticos de los usuarios.</li>
              <li>El incumplimiento de la legislación vigente por parte de los usuarios en el uso del sitio web.</li>
              <li>Los contenidos publicados por terceros accesibles mediante enlaces desde este sitio web.</li>
            </ul>
            <p>ClarityCristal se reserva el derecho a suspender el acceso al sitio web de manera temporal por razones técnicas o de mantenimiento, sin previo aviso.</p>
          </Section>

          <Section title="V. Enlaces a terceros">
            <p>El sitio web puede contener enlaces a páginas web de terceros. ClarityCristal no controla ni se hace responsable del contenido de dichos sitios, ni de las prácticas de privacidad o condiciones de uso que apliquen. La inclusión de un enlace no implica ninguna relación de afiliación, patrocinio o respaldo.</p>
          </Section>

          <Section title="VI. Política de privacidad y cookies">
            <p>El tratamiento de los datos personales de los usuarios se rige por la <Link href="/politica-de-privacidad" className="text-ocean hover:underline">Política de Privacidad</Link> y la Política de Cookies publicadas en este sitio web, de conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).</p>
          </Section>

          <Section title="VII. Ley aplicable y jurisdicción">
            <p>El presente Aviso Legal se rige por la legislación española vigente. Para la resolución de cualquier controversia derivada del acceso o uso de este sitio web, las partes se someten, con renuncia expresa a cualquier otro fuero, a los Juzgados y Tribunales de Lanzarote, salvo que la normativa aplicable establezca un fuero imperativo distinto.</p>
          </Section>

          <div className="mt-12 pt-6 border-t border-smoke text-xs text-volcanic/40">
            <p>© 2025 ClarityCristal · NICUSOR DANIEL MIHAI POPA · Arrecife, Lanzarote</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
