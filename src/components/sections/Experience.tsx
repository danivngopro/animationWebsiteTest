"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  animate,
} from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { experience } from "@/lib/data";

// Group last two words on the same line (e.g. "Full-Stack Team Lead" → ["Full-Stack", "Team Lead"])
function roleLines(role: string): string[] {
  const words = role.split(" ");
  if (words.length >= 3)
    return [...words.slice(0, -2), words.slice(-2).join(" ")];
  return words;
}

export function Experience() {
  const [active, setActive] = useState(experience.length - 1);
  const [dir, setDir] = useState(1);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const dragX = useMotionValue(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);

  const job = experience[active];

  const go = (next: number) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  };

  const onDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartX.current = e.clientX;
    isDragging.current = true;
  };

  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    dragX.set(e.clientX - dragStartX.current);
  };

  const onDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const offset = dragX.get();
    if (offset < -60 && active < experience.length - 1) {
      dragX.set(0);
      go(active + 1);
    } else if (offset > 60 && active > 0) {
      dragX.set(0);
      go(active - 1);
    } else {
      animate(dragX, 0, { type: "spring", stiffness: 500, damping: 35 });
    }
  };

  return (
    <div
      id="experience"
      className="slide-section"
      ref={ref}
      style={{ background: "rgba(5,5,12,0.50)" }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black tracking-tighter select-none"
          style={{
            fontSize: "clamp(5rem, 22vw, 24rem)",
            color: "rgba(255,255,255,0.018)",
            letterSpacing: "-0.06em",
            whiteSpace: "nowrap",
          }}
        >
          EXPERIENCE
        </span>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between px-8 sm:px-14 lg:px-20 pt-8 pb-10 sm:pt-[134px] sm:pb-[47px] max-w-[1400px] mx-auto w-full">
        {/* Top */}
        <div className="flex items-center justify-between">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: "var(--accent-cyan)" }}
          >
            Career
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 sm:gap-6"
          >
            {experience.map((e, i) => (
              <button
                key={e.id}
                onClick={() => go(i)}
                className="flex flex-col items-center gap-1.5 group text-center"
                aria-label={`View ${e.role}`}
              >
                <span
                  className="text-[10px] font-bold tracking-wider uppercase transition-colors duration-200 hidden sm:block"
                  style={{
                    color:
                      i === active
                        ? "var(--text-primary)"
                        : "var(--text-muted)",
                  }}
                >
                  {e.company.split(" ")[0]}
                </span>
                <span
                  className="text-[10px] font-semibold tracking-wider transition-colors duration-200 whitespace-nowrap"
                  style={{
                    color:
                      i === active ? "var(--accent-cyan)" : "var(--text-muted)",
                  }}
                >
                  {e.period.replace("Present", "Now")}
                </span>
                <motion.div
                  animate={{
                    width: i === active ? 32 : 8,
                    background:
                      i === active
                        ? "rgba(34,211,238,1)"
                        : "rgba(255,255,255,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`h-0.5 rounded-full ${i === active ? "animate-rgb-hue" : ""}`}
                />
              </button>
            ))}
          </motion.div>
        </div>

        {/* Centre — drag left/right to navigate */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          style={{ x: dragX, cursor: "grab" }}
          onPointerDown={onDragStart}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
          onPointerCancel={onDragEnd}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir * -60, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <p
                className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
                style={{ color: "var(--accent-indigo)" }}
              >
                {job.period}
              </p>

              {/* Title — last two words kept together */}
              <h2
                className="font-black leading-[1.0] tracking-tight text-gradient-subtle"
                style={{
                  fontSize: "clamp(2rem, 7.5vw, 8rem)",
                  letterSpacing: "-0.04em",
                  maxWidth: "90%",
                }}
              >
                {roleLines(job.role).map((line, i) => (
                  <span key={i} className="block">
                    {line.includes("Lead") ||
                    line.includes("Developer") ||
                    line.includes("Engineer") ? (
                      <span className="text-gradient-indigo">{line}</span>
                    ) : (
                      line
                    )}{" "}
                  </span>
                ))}
              </h2>

              <p
                className="mt-1 text-lg sm:text-xl font-semibold"
                style={{ color: "var(--accent-cyan)" }}
              >
                {job.company}
              </p>

              <p
                className="mt-5 text-sm sm:text-base leading-relaxed max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                {job.description}
              </p>

              <div className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2 max-w-2xl">
                {job.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex gap-2 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ background: "var(--accent-indigo)" }}
                    />
                    {h}
                  </div>
                ))}
              </div>

              {/* Tech tags with hover highlight */}
              <div className="mt-5 flex flex-wrap gap-2">
                {job.tech.map((t) => (
                  <motion.span
                    key={t}
                    onHoverStart={() => setHoveredTech(t)}
                    onHoverEnd={() => setHoveredTech(null)}
                    whileHover={{ scale: 1.08, y: -2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="inline-block px-3 py-1 text-xs font-semibold rounded-full cursor-default"
                    style={{
                      background:
                        hoveredTech === t
                          ? "rgba(99,102,241,0.2)"
                          : "rgba(99,102,241,0.08)",
                      color:
                        hoveredTech === t ? "#a5b4fc" : "var(--text-secondary)",
                      border: `1px solid ${hoveredTech === t ? "rgba(99,102,241,0.5)" : "rgba(99,102,241,0.2)"}`,
                      boxShadow:
                        hoveredTech === t
                          ? "0 0 12px rgba(99,102,241,0.3)"
                          : "none",
                      transition:
                        "background 0.1s, color 0.1s, border-color 0.1s, box-shadow 0.1s",
                    }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => go(Math.max(active - 1, 0))}
              disabled={active === 0}
              className="p-2 rounded-xl border transition-colors disabled:opacity-30"
              style={{
                borderColor: "var(--border-subtle)",
                color: "var(--text-secondary)",
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => go(Math.min(active + 1, experience.length - 1))}
              disabled={active === experience.length - 1}
              className="p-2 rounded-xl border transition-colors disabled:opacity-30"
              style={{
                borderColor: "var(--border-subtle)",
                color: "var(--text-secondary)",
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
          <p
            className="text-xs font-mono tabular-nums"
            style={{ color: "var(--text-muted)" }}
          >
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(experience.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}

