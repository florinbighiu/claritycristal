"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { SectionEyebrow } from "@/components/SectionEyebrow";

export function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !dragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [handleMove]);

  return (
    <section
      id="metodo"
      className="cc-paper-bg-alt cc-seam-top relative overflow-hidden py-24 lg:py-32"
      aria-labelledby="method-heading"
    >
      <div className="cc-grid absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text */}
          <div>
            <div className="reveal">
              <SectionEyebrow index="03" label="Nuestro método exclusivo" />
            </div>
            <h2
              id="method-heading"
              className="reveal reveal-delay-1 mt-6 mb-6 font-display text-4xl font-semibold tracking-tight text-volcanic lg:text-[3.4rem] lg:leading-[1.02]"
            >
              El secreto:{" "}
              <span className="italic text-ocean">agua sin cal</span>
            </h2>
            <p className="reveal reveal-delay-2 mb-8 text-lg leading-relaxed text-volcanic/60">
              El agua del grifo tiene entre 100-500 ppm de minerales que dejan marcas al
              secarse. Nuestra agua ultrapura a <strong className="text-volcanic">0 ppm</strong> solo contiene H₂O, sin
              residuos que se depositen en el cristal.
            </p>

            <div className="mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-volcanic/10 bg-volcanic/10">
              {[
                { stat: "0 ppm", label: "Pureza del agua" },
                { stat: "30%", label: "Más rápido" },
                { stat: "50%", label: "Brillo más duradero" },
                { stat: "0€", label: "Sin desplazamiento" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="reveal reveal-delay-2 bg-pearl p-5"
                >
                  <div className="font-display text-3xl font-semibold text-volcanic">{s.stat}</div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-volcanic/45">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-3 space-y-3">
              {[
                { icon: "💧", text: "Sin rayas ni manchas — no hay que secar manualmente" },
                { icon: "🌿", text: "Sin químicos agresivos — respetuoso con el medio ambiente" },
                { icon: "🔭", text: "Pértigas telescópicas — se limpia desde el suelo con total seguridad" },
                { icon: "⚡", text: "Hasta +30% de rendimiento en paneles fotovoltaicos" },
              ].map((f) => (
                <div key={f.text} className="flex items-start gap-3 text-sm text-volcanic/70">
                  <span className="shrink-0 text-base" aria-hidden="true">{f.icon}</span>
                  {f.text}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive slider */}
          <div className="reveal reveal-delay-2">
            <div
              ref={containerRef}
              className="before-after-slider h-80 lg:h-[420px] select-none"
              role="img"
              aria-label="Comparación antes y después de la limpieza: arrastre el divisor para comparar"
              onMouseDown={() => { dragging.current = true; }}
              onTouchStart={() => { dragging.current = true; }}
            >
              {/* After — base layer (always visible underneath) */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Image
                  src="/images/slider/after.png"
                  alt="Después de la limpieza"
                  fill
                  className="object-cover"
                  draggable={false}
                />
                <div className="absolute bottom-4 right-4">
                  <div className="bg-white/60 text-volcanic text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                    DESPUÉS
                  </div>
                </div>
              </div>

              {/* Before — clipped top layer (reveals left side) */}
              <div
                className="after-layer rounded-2xl overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <Image
                  src="/images/slider/before.png"
                  alt="Antes de la limpieza"
                  fill
                  className="object-cover"
                  draggable={false}
                />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-black/50 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                    ANTES
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="divider" style={{ left: `${pos}%` }} aria-hidden="true">
                <div className="divider-handle">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-volcanic" aria-hidden="true">
                    <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-volcanic/40 mt-3">
              Arrastra el divisor para comparar →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
