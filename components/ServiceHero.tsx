import Link from "next/link";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { SectionEyebrow } from "@/components/SectionEyebrow";

interface ServiceHeroProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  waHref: string;
  ctaLabel: string;
}

/**
 * Editorial hero shared by every /services/* page — the same
 * paper-and-grid, indexed-eyebrow, Fraunces-display language as the
 * home hero, so sub-pages never fall back to the old dark-blob look.
 */
export function ServiceHero({
  index,
  eyebrow,
  title,
  description,
  waHref,
  ctaLabel,
}: ServiceHeroProps) {
  return (
    <section className="cc-paper-bg noise relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="cc-grid absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 lg:px-8">
        <SectionEyebrow index={index} label={eyebrow} />

        <h1 className="mt-7 max-w-3xl font-display text-[2.7rem] font-semibold leading-[1.0] tracking-[-0.02em] text-volcanic sm:text-6xl lg:text-7xl">
          {title}
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-volcanic/60">
          {description}
        </p>

        <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-bold shadow-xl"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {ctaLabel}
          </a>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-volcanic/15 px-6 py-4 text-sm font-semibold text-volcanic/70 transition-colors hover:border-volcanic/40 hover:text-volcanic"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
