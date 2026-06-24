'use client';

import React, { useEffect, useRef, useState } from 'react';

// A single odometer digit: rests on `digit`, and every few seconds rolls upward
// one full revolution (0→9 wrap) before snapping back to rest. Slow + readable.
function RollingDigit({ digit, delay }: { digit: number; delay: number }) {
  const [rolled, setRolled] = useState(false);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const cycle = () => {
      if (!aliveRef.current) return;
      setRolled(true); // transition on → roll up a full turn
      timers.push(
        setTimeout(() => {
          if (!aliveRef.current) return;
          setRolled(false); // transition off → snap back to rest instantly
          timers.push(setTimeout(cycle, 4200)); // rest, then roll again
        }, 1700),
      );
    };
    timers.push(setTimeout(cycle, 1400 + delay));

    return () => {
      aliveRef.current = false;
      timers.forEach(clearTimeout);
    };
  }, [delay]);

  // rest position shows `digit` in the first set; rolled shows the same glyph
  // one full set higher, so the slide is a clean upward revolution.
  const offset = digit + (rolled ? 10 : 0);

  return (
    <span className="rd-window">
      <span
        className={`rd-reel${rolled ? ' rd-anim' : ''}`}
        style={{ transform: `translateY(-${offset}em)` }}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <span className="rd-cell" key={i}>
            {i % 10}
          </span>
        ))}
      </span>
      <style jsx>{`
        .rd-window {
          display: inline-block;
          height: 1em;
          line-height: 1em;
          overflow: hidden;
          vertical-align: bottom;
        }
        .rd-reel {
          display: flex;
          flex-direction: column;
          will-change: transform;
        }
        .rd-anim {
          transition: transform 1.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .rd-cell {
          height: 1em;
          line-height: 1em;
          text-align: center;
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </span>
  );
}

// Renders a number as a rolling odometer. Digits animate; separators (commas)
// are static. The real value is exposed to screen readers.
export function RollingNumber({ value }: { value: number }) {
  const chars = value.toLocaleString('en-US').split('');

  return (
    <span aria-label={String(value)} role="text" style={{ fontVariantNumeric: 'tabular-nums' }}>
      {chars.map((ch, i) =>
        /\d/.test(ch) ? (
          <RollingDigit key={i} digit={Number(ch)} delay={i * 180} />
        ) : (
          <span key={i} aria-hidden="true">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

export default RollingNumber;
