import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 0–5, may be fractional (e.g. 4.5)
  size?: number; // px per star
  gap?: number; // px between stars
  className?: string;
}

// Renders 5 stars with a precise fractional fill (4.5 → four and a half filled).
// A gold layer is clipped to the exact filled width over a gray base layer.
export function StarRating({ rating, size = 14, gap = 2, className = '' }: StarRatingProps) {
  const clamped = Math.max(0, Math.min(5, rating));
  const full = Math.floor(clamped);
  const frac = clamped - full;
  const totalWidth = size * 5 + gap * 4;
  // width covering `full` whole stars plus a fraction of the next one (incl. gaps)
  const filledWidth = Math.min(totalWidth, full * (size + gap) + frac * size);

  const row = (filled: boolean) => (
    <span style={{ display: 'flex', gap }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size, flex: '0 0 auto' }}
          className={
            filled
              ? 'fill-amber-400 text-amber-400'
              : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'
          }
        />
      ))}
    </span>
  );

  return (
    <span
      className={`relative inline-flex shrink-0 ${className}`}
      style={{ width: totalWidth, height: size }}
      role="img"
      aria-label={`${clamped} ${clamped === 1 ? 'star' : 'stars'} out of 5`}
    >
      {row(false)}
      <span className="absolute inset-0 overflow-hidden" style={{ width: filledWidth }}>
        {row(true)}
      </span>
    </span>
  );
}

export default StarRating;
