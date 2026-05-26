import { VALUES } from "@/lib/data";

export function ValuesSection() {
  return (
    <section className="py-24 lg:py-32 bg-volcanic relative overflow-hidden" aria-labelledby="values-heading">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ocean/10 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="reveal text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Nuestros valores
          </p>
          <h2
            id="values-heading"
            className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-bold text-white"
          >
            Cada limpieza refleja
            <br />
            <span className="italic text-gold">nuestro compromiso</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={`reveal reveal-delay-${(i % 3) + 1} group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="text-3xl mb-3" aria-hidden="true">{v.icon}</div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
        <div className="reveal mt-12 text-center">
          <p className="text-white/40 text-sm italic">
            ClarityCristal — Una empresa local comprometida, que trabaja con orgullo profesional y responsabilidad
          </p>
        </div>
      </div>
    </section>
  );
}
