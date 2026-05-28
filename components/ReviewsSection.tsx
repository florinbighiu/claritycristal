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

function ReviewCard({ review }: { review: Review }) {
  const initial = review.authorAttribution.displayName.charAt(0).toUpperCase();
  return (
    <div
      className="flex-shrink-0 bg-white border border-smoke rounded-2xl p-5 flex flex-col gap-3 shadow-sm snap-start"
      style={{ width: CARD_W }}
    >
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-volcanic/20" fill="currentColor">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
      </div>
      <p className="text-volcanic/60 text-sm leading-relaxed line-clamp-4 flex-1">
        &ldquo;{review.text.text}&rdquo;
      </p>
      <div className="flex items-center gap-2.5 pt-2 border-t border-smoke">
        <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center text-gold font-bold text-xs flex-shrink-0">
          {initial}
        </div>
        <div>
          <p className="text-volcanic text-xs font-semibold leading-none mb-0.5">
            {review.authorAttribution.displayName}
          </p>
          <p className="text-volcanic/35 text-xs">{review.relativePublishTimeDescription}</p>
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
    <div className="pt-16 pb-10">
      {/* Header */}
      <div className="max-w-xl mx-auto px-5 lg:px-8 text-center mb-10">
        <div className="inline-flex items-center gap-2.5 bg-gold/8 border border-gold/15 rounded-full px-4 py-2 mb-5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 text-gold" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="font-bold text-volcanic text-sm">{data.rating.toFixed(1)}</span>
          <span className="text-volcanic/25">·</span>
          <span className="text-volcanic/50 text-sm">{data.userRatingCount} reseñas en Google</span>
        </div>
        <h2 className="font-display text-3xl font-bold text-volcanic mb-2">
          Lo que dicen nuestros clientes
        </h2>
        <p className="text-volcanic/45 text-sm">Reseñas verificadas de Google</p>
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
              <ReviewCard key={i} review={review} />
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

      {/* CTA */}
      <div className="text-center mt-8">
        <a
          href="https://www.google.com/maps/place/?q=place_id:ChIJ8_3S2N3joUwROU_Bvqy1EmA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-volcanic/40 hover:text-volcanic/70 text-sm transition-colors"
        >
          Ver todas las reseñas en Google
          <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M7 17l9.2-9.2M17 17V7.8H7.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
