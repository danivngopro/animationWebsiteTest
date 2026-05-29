"use client";

import { useState, useEffect, useRef } from "react";

// Animates a number from 0 → end when started = true.
// Uses an easeOutExpo curve for a natural deceleration feel.
export function useCountUp(end: number, started: boolean, duration = 1400): number {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (!started) return;

    const easeOut = (t: number) => 1 - Math.pow(2, -10 * t);

    const tick = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOut(progress) * end));
      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        setCount(end);
      }
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [end, started, duration]);

  return count;
}
