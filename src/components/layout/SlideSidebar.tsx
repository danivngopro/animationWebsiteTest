"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export const SLIDE_IDS = [
  "hero",
  "about",
  "experience",
  "skills",
  "ai-workflow",
  "security",
  "projects",
  "education",
  "contact",
] as const;

export type SlideId = (typeof SLIDE_IDS)[number];

const SLIDE_LABELS: Record<SlideId, string> = {
  hero: "Home",
  about: "About",
  experience: "Experience",
  skills: "Skills",
  "ai-workflow": "AI Workflow",
  security: "Security",
  projects: "Projects",
  education: "Education",
  contact: "Contact",
};

const AUTOPLAY_MS = 5000;

// ─── SlideSidebar ────────────────────────────────────────────────────
// Fixed right-side navigation: numbered dots + section labels on hover.
// Autoplay advances through slides every AUTOPLAY_MS ms.
// Inspired by 21st.dev vertical slide navigation patterns.
export function SlideSidebar() {
  const [current, setCurrent] = useState<SlideId>("hero");
  const [hovered, setHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100

  const progressRef = useRef(0);
  const playingRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  // ── Track active section via Intersection Observer ────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            setCurrent(entry.target.id as SlideId);
          }
        }
      },
      { threshold: 0.45 }
    );

    SLIDE_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Programmatic navigation ───────────────────────────────────────
  const goTo = useCallback((id: SlideId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    // Reset autoplay timer on manual navigation
    startTimeRef.current = null;
    progressRef.current = 0;
    setProgress(0);
  }, []);

  // ── Autoplay RAF loop ─────────────────────────────────────────────
  const autoplayTick = useCallback((timestamp: number) => {
    if (!playingRef.current) return;

    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const pct = Math.min((elapsed / AUTOPLAY_MS) * 100, 100);
    progressRef.current = pct;
    setProgress(pct);

    if (pct >= 100) {
      // Advance to next slide
      setCurrent((prev) => {
        const idx = SLIDE_IDS.indexOf(prev);
        const next = SLIDE_IDS[(idx + 1) % SLIDE_IDS.length];
        document.getElementById(next)?.scrollIntoView({ behavior: "smooth" });
        return next;
      });
      startTimeRef.current = null;
      progressRef.current = 0;
      setProgress(0);
    }

    rafRef.current = requestAnimationFrame(autoplayTick);
  }, []);

  useEffect(() => {
    playingRef.current = isPlaying;
    if (isPlaying) {
      startTimeRef.current = null;
      rafRef.current = requestAnimationFrame(autoplayTick);
    } else {
      cancelAnimationFrame(rafRef.current);
      startTimeRef.current = null;
      setProgress(0);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, autoplayTick]);

  // Pause autoplay when user navigates manually (current slide changed externally)
  useEffect(() => {
    startTimeRef.current = null;
    setProgress(0);
  }, [current]);

  const currentIdx = SLIDE_IDS.indexOf(current);

  // ── Circular progress SVG ─────────────────────────────────────────
  const R = 16;
  const CIRC = 2 * Math.PI * R;
  const dashOffset = CIRC * (1 - progress / 100);

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1 select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Section navigation"
    >
      {SLIDE_IDS.map((id, i) => {
        const isActive = id === current;
        return (
          // Entire row is the click target — label text and dot both navigate
          <motion.button
            key={id}
            onClick={() => goTo(id)}
            aria-label={`Go to ${SLIDE_LABELS[id]}`}
            aria-pressed={isActive}
            whileHover={{ x: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative flex items-center justify-end gap-3 py-1 pl-2 rounded-lg"
          >
            {/* Label — slides in from right on hover */}
            <AnimatePresence>
              {hovered && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18, delay: i * 0.03 }}
                  className="text-xs font-medium whitespace-nowrap"
                  style={{
                    color: isActive ? "var(--accent-cyan)" : "var(--text-muted)",
                  }}
                >
                  {SLIDE_LABELS[id]}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <div className="flex items-center justify-center" style={{ width: 12, height: 12 }}>
              <motion.div
                animate={{
                  width: isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  backgroundColor: isActive
                    ? "var(--accent-indigo)"
                    : "rgba(255,255,255,0.25)",
                  boxShadow: isActive
                    ? "0 0 10px rgba(99,102,241,0.7)"
                    : "none",
                }}
                transition={{ duration: 0.25 }}
                className="rounded-full"
              />
            </div>
          </motion.button>
        );
      })}

      {/* Autoplay button with circular progress SVG */}
      <div className="mt-4">
        <motion.button
          onClick={() => setIsPlaying((p) => !p)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
          className="relative flex items-center justify-center"
          style={{ width: 40, height: 40 }}
        >
          {/* Progress ring */}
          <svg
            width={40}
            height={40}
            className="absolute inset-0 -rotate-90"
            aria-hidden
          >
            {/* Track */}
            <circle
              cx={20}
              cy={20}
              r={R}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={2}
            />
            {/* Progress */}
            {isPlaying && (
              <circle
                cx={20}
                cy={20}
                r={R}
                fill="none"
                stroke="var(--accent-indigo)"
                strokeWidth={2}
                strokeDasharray={CIRC}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Icon */}
          <motion.div
            animate={{ opacity: 1 }}
            className="relative z-10 flex items-center justify-center"
          >
            {isPlaying ? (
              /* Pause icon */
              <svg width={12} height={12} viewBox="0 0 12 12" fill="currentColor"
                style={{ color: "var(--accent-indigo)" }}>
                <rect x="1" y="1" width="4" height="10" rx="1" />
                <rect x="7" y="1" width="4" height="10" rx="1" />
              </svg>
            ) : (
              /* Play icon */
              <svg width={12} height={12} viewBox="0 0 12 12" fill="currentColor"
                style={{ color: "var(--text-muted)" }}>
                <path d="M2 1.5l9 4.5-9 4.5V1.5z" />
              </svg>
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* Slide counter */}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIdx}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] font-mono tabular-nums mt-1"
          style={{ color: "var(--text-muted)" }}
        >
          {String(currentIdx + 1).padStart(2, "0")}/{SLIDE_IDS.length}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
