"use client";

import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>░▒▓";
const FRAMES_PER_CHAR = 10; // frames before each character locks in

// Character-scramble hook. Reveals characters left-to-right at a fixed rate
// so that matching indices in two names (DANIEL / VENTURA) animate together.
export function useGlitchText(target: string, started: boolean): string {
  const [display, setDisplay] = useState(() => target.replace(/[^\s]/g, "░"));

  useEffect(() => {
    if (!started) return;

    const chars = target.split("");
    let frame = 0;
    let rafId: number;

    const animate = () => {
      // Lock chars one-by-one at the same frame rate regardless of word length
      const revealedUpTo = Math.floor(frame / FRAMES_PER_CHAR);
      setDisplay(
        chars
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < revealedUpTo) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      frame++;
      if (frame <= chars.length * FRAMES_PER_CHAR + 6) {
        rafId = requestAnimationFrame(animate);
      } else {
        setDisplay(target);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [target, started]);

  return display;
}
