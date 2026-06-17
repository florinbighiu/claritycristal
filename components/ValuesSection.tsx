import { VALUES } from "@/lib/data";
import { SectionEyebrow } from "@/components/SectionEyebrow";

export function ValuesSection() {
  return (
    <section
      className="cc-ink-bg cc-seam-gold noise relative overflow-hidden py-24 lg:py-32"
      aria-labelledby="values-heading"
    >
      <div className="cc-grid-dark absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <SectionEyebrow index="06" label="Nuestros valores" tone="dark" />
          <h2
            id="values-heading"
            className="mt-6 font-display text-4xl font-semibold tracking-tight text-white lg:text-[3.6rem] lg:leading-[1.0]"
          >
            Cada limpieza refleja{" "}
            <span className="italic text-gold">nuestro compromiso</span>
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="group relative bg-[#0a1830]/40 p-7 transition-colors duration-300 hover:bg-white/[0.04] lg:p-8"
            >
              <span
                className="cc-mono absolute right-6 top-6 text-[11px] tracking-widest text-white/25"
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <div className="mb-4 text-3xl transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true">
                {v.icon}
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-white">{v.title}</h3>
              <p className="text-sm leading-relaxed text-white/55">{v.desc}</p>
              <span className="mt-5 block h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-500 group-hover:w-16" />
            </div>
          ))}
        </div>

        <p className="mt-12 text-center font-display text-sm italic text-white/40">
          ClarityCristal — una empresa local comprometida, que trabaja con orgullo profesional y responsabilidad
        </p>
      </div>
    </section>
  );
}
