"use client";

import { useEffect, useRef, useState } from "react";

interface Review {
  rating: number;
  authorAttribution: { displayName: string };
  text: { text: string };
  relativePublishTimeDescription: string;
}

interface PlaceData {
  rating: number;
  userRatingCount: number;
  reviews: Review[];
}

const CARD_W = 300;
const GAP = 20;
const STEP = CARD_W + GAP;

const PALETTES = [
  { bg: "bg-gradient-to-b from-[#fffbf0] to-white", strip: "from-gold to-gold-light/40" },
  { bg: "bg-gradient-to-b from-[#eef4fc] to-white", strip: "from-ocean/80 to-ocean/20" },
  { bg: "bg-gradient-to-b from-pearl to-white",      strip: "from-volcanic/40 to-transparent" },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={`w-3.5 h-3.5 ${i <= rating ? "text-gold" : "text-volcanic/15"}`} fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const initial = review.authorAttribution.displayName.charAt(0).toUpperCase();
  const { bg, strip } = PALETTES[index % PALETTES.length];
  return (
    <div
      className={`flex-shrink-0 ${bg} border border-smoke rounded-2xl overflow-hidden flex flex-col shadow-sm snap-start`}
      style={{ width: CARD_W }}
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${strip}`} />
      <div className="p-5 flex flex-col gap-3 flex-1">
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <GoogleIcon />
      </div>
      <p className="text-volcanic/80 text-sm leading-relaxed line-clamp-4 flex-1">
        &ldquo;{review.text.text}&rdquo;
      </p>
      <div className="flex items-center gap-2.5 pt-2 border-t border-smoke">
        <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
          {initial}
        </div>
        <div>
          <p className="text-volcanic text-xs font-semibold leading-none mb-0.5">
            {review.authorAttribution.displayName}
          </p>
          <p className="text-volcanic/60 text-xs">{review.relativePublishTimeDescription}</p>
        </div>
      </div>
      </div>
    </div>
  );
}

function ArrowButton({ dir, onClick, disabled }: { dir: "left" | "right"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Anterior reseña" : "Siguiente reseña"}
      className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-smoke shadow-sm flex items-center justify-center text-volcanic transition-all hover:bg-pearl hover:shadow-md disabled:opacity-25 disabled:cursor-not-allowed disabled:shadow-none"
    >
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left"
          ? <path d="M12 5l-5 5 5 5" />
          : <path d="M8 5l5 5-5 5" />}
      </svg>
    </button>
  );
}

export function ReviewsSection() {
  const [data, setData] = useState<PlaceData | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => null);
  }, []);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const scroll = (dir: "left" | "right") => {
    trackRef.current?.scrollBy({ left: dir === "left" ? -STEP : STEP, behavior: "smooth" });
  };

  if (!data?.reviews?.length) return null;

  return (
    <div className="pt-16 pb-10 bg-white">
      {/* Header */}
      <div className="max-w-xl mx-auto px-5 lg:px-8 text-center mb-10">
        <div className="inline-flex items-center gap-2.5 border border-gold/50 rounded-full px-4 py-2 mb-5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 text-gold" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="font-bold text-volcanic text-sm">{data.rating.toFixed(1)}</span>
          <span className="text-volcanic/40">·</span>
          <span className="text-volcanic text-sm">{data.userRatingCount} reseñas en Google</span>
        </div>
        <h2 className="font-display text-3xl font-bold text-volcanic mb-2">
          Lo que dicen nuestros clientes
        </h2>
        <p className="text-volcanic/70 text-sm">Reseñas verificadas de Google</p>
      </div>

      {/* Carousel */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center gap-3">
          <ArrowButton dir="left" onClick={() => scroll("left")} disabled={!canPrev} />

          <div
            ref={trackRef}
            onScroll={updateButtons}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar flex-1"
          >
            {data.reviews.map((review, i) => (
              <ReviewCard key={i} review={review} index={i} />
            ))}
          </div>

          <ArrowButton dir="right" onClick={() => scroll("right")} disabled={!canNext} />
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {data.reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                trackRef.current?.scrollTo({ left: i * STEP, behavior: "smooth" });
              }}
              aria-label={`Ir a reseña ${i + 1}`}
              className="w-1.5 h-1.5 rounded-full bg-volcanic/20 hover:bg-gold transition-colors"
            />
          ))}
        </div>
      </div>

    </div>
  );
}
