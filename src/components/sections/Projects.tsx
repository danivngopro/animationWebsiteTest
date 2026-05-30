"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, animate } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { projects } from "@/lib/data";

export function Projects() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const ref        = useRef<HTMLDivElement>(null);
  const inView     = useInView(ref, { once: true, margin: "-10%" });
  const dragX      = useMotionValue(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);

  const project = projects[active];

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
    if (offset < -60 && active < projects.length - 1) {
      dragX.set(0); go(active + 1);
    } else if (offset > 60 && active > 0) {
      dragX.set(0); go(active - 1);
    } else {
      animate(dragX, 0, { type: "spring", stiffness: 500, damping: 35 });
    }
  };

  return (
    <div id="projects" className="slide-section" ref={ref} style={{ background: "rgba(5,5,12,0.50)" }}>
      {/* Project number watermark */}
      <div className="absolute inset-0 flex items-center justify-end pr-10 pointer-events-none overflow-hidden" aria-hidden>
        <span
          className="font-black select-none"
          style={{
            fontSize: "clamp(10rem, 40vw, 50rem)",
            color: "rgba(99,102,241,0.03)",
            letterSpacing: "-0.1em",
            lineHeight: 0.9,
          }}
        >
          {String(active + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between px-8 sm:px-14 lg:px-20 pt-8 pb-10 sm:pt-[134px] sm:pb-[47px] max-w-[1400px] mx-auto w-full">

        {/* Header */}
        <div className="flex items-center justify-between">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: "var(--accent-cyan)" }}
          >
            Projects
          </motion.p>

          {/* Dot selector */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2"
          >
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Project ${i + 1}`}
                className="transition-all duration-200"
              >
                <motion.div
                  animate={{
                    width: i === active ? 24 : 8,
                    background: i === active ? "rgba(34,211,238,1)" : "rgba(255,255,255,0.2)",
                  }}
                  transition={{ duration: 0.25 }}
                  className={`h-1.5 rounded-full ${i === active ? "animate-rgb-hue" : ""}`}
                />
              </button>
            ))}
          </motion.div>
        </div>

        {/* Main project display â€” drag left/right to navigate */}
        <motion.div
          className="flex-1 flex items-center"
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
              initial={{ opacity: 0, x: dir * 80, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir * -80, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full"
            >
              {/* Year */}
              <p
                className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
                style={{ color: "var(--accent-indigo)" }}
              >
                {project.year}
              </p>

              {/* Huge project title */}
              <h2
                className="font-black leading-[1.0] tracking-tight"
                style={{
                  fontSize: "clamp(2.2rem, 7vw, 7.5rem)",
                  letterSpacing: "-0.04em",
                  maxWidth: "80%",
                }}
              >
                {project.title.split(" ").map((word, i, arr) => (
                  <span
                    key={i}
                    className={i % 2 === 0 ? "text-gradient-subtle" : "text-gradient-indigo"}
                  >
                    {word}{i < arr.length - 1 ? " " : ""}
                  </span>
                ))}
              </h2>

              {/* Description */}
              <p
                className="mt-5 text-sm sm:text-base leading-relaxed max-w-2xl"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.description}
              </p>

              {/* Tags with hover highlight */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <motion.span
                    key={t}
                    onHoverStart={() => setHoveredTag(t)}
                    onHoverEnd={() => setHoveredTag(null)}
                    whileHover={{ scale: 1.08, y: -2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="inline-block px-3 py-1 text-xs font-semibold rounded-full cursor-default"
                    style={{
                      background: hoveredTag === t ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.08)",
                      color: hoveredTag === t ? "#a5b4fc" : "var(--text-secondary)",
                      border: `1px solid ${hoveredTag === t ? "rgba(99,102,241,0.5)" : "rgba(99,102,241,0.2)"}`,
                      boxShadow: hoveredTag === t ? "0 0 12px rgba(99,102,241,0.3)" : "none",
                      transition: "background 0.1s, color 0.1s, border-color 0.1s, box-shadow 0.1s",
                    }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => go(Math.max(active - 1, 0))}
              disabled={active === 0}
              className="p-2 rounded-xl border transition-colors disabled:opacity-30"
              style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => go(Math.min(active + 1, projects.length - 1))}
              disabled={active === projects.length - 1}
              className="p-2 rounded-xl border transition-colors disabled:opacity-30"
              style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          <p className="text-xs font-mono tabular-nums" style={{ color: "var(--text-muted)" }}>
            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}

