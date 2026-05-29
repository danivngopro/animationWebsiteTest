"use client";

import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?<>░▒▓";

// Character-scramble hook. When `started` flips to true it animates
// each character from random noise to the real character, left-to-right.
export function useGlitchText(target: string, started: boolean): string {
  const [display, setDisplay] = useState(() =>
    target.replace(/[^\s]/g, "░")
  );

  useEffect(() => {
    if (!started) return;

    const chars = target.split("");
    let frame = 0;
    const totalFrames = chars.length * 5; // 5 scramble frames per character
    let rafId: number;

    const animate = () => {
      const revealedUpTo = Math.floor((frame / totalFrames) * chars.length);
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
      if (frame <= totalFrames + 3) {
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
