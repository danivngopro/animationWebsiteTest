"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { caseStudies } from "@/lib/data";

export function CaseStudies() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const study = caseStudies[active];

  return (
    <div
      id="case-studies"
      className="slide-section"
      ref={ref}
      style={{ background: "rgba(5,5,12,0.50)" }}
    >
      <div className="h-full flex flex-col px-8 sm:px-14 lg:px-20 pt-8 pb-10 sm:pt-[124px] sm:pb-14 max-w-[1400px] mx-auto w-full">

        {/* Header */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--accent-cyan)" }}
          >
            Architecture Case Studies
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.03em" }}
          >
            <span className="text-gradient-subtle">How I approached </span>
            <span className="text-gradient-indigo">hard problems.</span>
          </motion.h2>
        </div>

        {/* Tabs + content grouped — explicit spacing */}
        <div className="flex-1 flex flex-col gap-6 sm:gap-8 mt-8 sm:mt-10 min-h-0">

          {/* Tab row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-2 flex-wrap shrink-0"
          >
            {caseStudies.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{
                  background: active === i ? "var(--accent-indigo)" : "var(--bg-card)",
                  color: active === i ? "#fff" : "var(--text-secondary)",
                  border: `1px solid ${active === i ? "transparent" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                {s.title}
              </button>
            ))}
          </motion.div>

          {/* Case study content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={study.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="flex-1 flex flex-col gap-4 min-h-0 overflow-hidden"
            >
            {/* Label */}
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border"
                style={{
                  borderColor: "rgba(34,211,238,0.35)",
                  color: "var(--accent-cyan)",
                  background: "rgba(34,211,238,0.06)",
                }}
              >
                {study.label}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="flex flex-col gap-4">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Problem
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {study.problem}
                  </p>
                </div>
                <div>
                  <p
                    className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Approach
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {study.approach.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--accent-cyan)" }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    My Role
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {study.role}
                  </p>
                </div>
                <div>
                  <p
                    className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Result
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {study.result}
                  </p>
                </div>
                {/* Sanitized note */}
                <div
                  className="mt-auto px-3 py-2 rounded-lg text-xs"
                  style={{
                    background: "rgba(99,102,241,0.06)",
                    border: "1px solid rgba(99,102,241,0.18)",
                    color: "var(--text-muted)",
                  }}
                >
                  ⚠ {study.note}
                </div>
              </div>
            </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
