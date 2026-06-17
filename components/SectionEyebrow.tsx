interface SectionEyebrowProps {
  index: string;
  label: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

/**
 * The indexed kicker that threads the whole site together —
 * a Fraunces index numeral, a hairline gold rule, and a
 * letter-spaced label. Light tone on paper, dark on ink.
 */
export function SectionEyebrow({
  index,
  label,
  align = "left",
  tone = "light",
}: SectionEyebrowProps) {
  const labelColor = tone === "dark" ? "text-white/55" : "text-volcanic/55";
  const justify = align === "center" ? "justify-center" : "";

  return (
    <div className={`flex items-center gap-4 ${justify}`}>
      <span className="font-display text-sm italic text-gold">{index}</span>
      <span className="cc-rule h-px w-12" />
      <span className={`text-[11px] font-bold uppercase tracking-[0.32em] ${labelColor}`}>
        {label}
      </span>
      {align === "center" && <span className="cc-rule h-px w-12 rotate-180" />}
    </div>
  );
}
