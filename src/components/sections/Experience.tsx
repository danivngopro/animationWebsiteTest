"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { TechBadge } from "@/components/ui/TechBadge";
import { experience } from "@/lib/data";

export function Experience() {
  const [active, setActive] = useState(experience.length - 1); // most recent first
  const [dir, setDir] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const job = experience[active];

  const go = (next: number) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  };

  return (
    <div id="experience" className="slide-section" ref={ref} style={{ background: "var(--bg-base)" }}>
      {/* "EXPERIENCE" watermark */}
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

      <div className="relative z-10 h-full flex flex-col justify-between px-8 sm:px-14 lg:px-20 py-10 max-w-[1400px] mx-auto w-full">

        {/* Top: label + job selector */}
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

          {/* Timeline selector */}
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
                className="flex flex-col items-center gap-1.5 group"
                aria-label={`View ${e.role}`}
              >
                <span
                  className="text-[10px] font-semibold tracking-wider uppercase transition-colors duration-200"
                  style={{ color: i === active ? "var(--accent-cyan)" : "var(--text-muted)" }}
                >
                  {e.period.split("–")[0].trim()}
                </span>
                <motion.div
                  animate={{
                    width: i === active ? 32 : 8,
                    background: i === active ? "var(--accent-indigo)" : "rgba(255,255,255,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 rounded-full"
                />
              </button>
            ))}
          </motion.div>
        </div>

        {/* Centre: big job title + details */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir * -60, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {/* Period */}
              <p
                className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
                style={{ color: "var(--accent-indigo)" }}
              >
                {job.period}
              </p>

              {/* Giant job title */}
              <h2
                className="font-black leading-[1.0] tracking-tight text-gradient-subtle"
                style={{
                  fontSize: "clamp(2rem, 7.5vw, 8rem)",
                  letterSpacing: "-0.04em",
                  maxWidth: "90%",
                }}
              >
                {job.role.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {word === "Team" || word === "Lead" || word === "Developer" || word === "Engineer"
                      ? <span className="text-gradient-indigo">{word}</span>
                      : word
                    }{" "}
                  </span>
                ))}
              </h2>

              <p
                className="mt-1 text-lg sm:text-xl font-semibold"
                style={{ color: "var(--accent-cyan)" }}
              >
                {job.company}
              </p>

              {/* Description */}
              <p
                className="mt-5 text-sm sm:text-base leading-relaxed max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                {job.description}
              </p>

              {/* Highlights — 2-col on desktop */}
              <div className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2 max-w-2xl">
                {job.highlights.map((h, i) => (
                  <div key={i} className="flex gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--accent-indigo)" }} />
                    {h}
                  </div>
                ))}
              </div>

              {/* Tech */}
              <div className="mt-5 flex flex-wrap gap-2">
                {job.tech.map((t) => <TechBadge key={t} label={t} variant="ghost" />)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom: navigation arrows + counter */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => go(Math.max(active - 1, 0))}
              disabled={active === 0}
              className="p-2 rounded-xl border transition-colors disabled:opacity-30"
              style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
              aria-label="Previous role"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => go(Math.min(active + 1, experience.length - 1))}
              disabled={active === experience.length - 1}
              className="p-2 rounded-xl border transition-colors disabled:opacity-30"
              style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
              aria-label="Next role"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          <p className="text-xs font-mono tabular-nums" style={{ color: "var(--text-muted)" }}>
            {String(active + 1).padStart(2, "0")} / {String(experience.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}
