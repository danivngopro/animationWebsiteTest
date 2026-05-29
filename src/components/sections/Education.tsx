"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { education } from "@/lib/data";

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div
      id="education"
      className="slide-section"
      ref={ref}
      style={{
        background: "var(--bg-surface)",
        backgroundImage: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(99,102,241,0.07) 0%, transparent 70%)",
      }}
    >
      <div className="h-full flex flex-col justify-center px-8 sm:px-14 lg:px-20 max-w-[1400px] mx-auto w-full gap-12">

        {/* Header */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-2"
            style={{ color: "var(--accent-cyan)" }}
          >
            Education
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", letterSpacing: "-0.04em" }}
          >
            <span className="text-gradient-subtle">The </span>
            <span className="text-gradient-indigo">foundation.</span>
          </motion.h2>
        </div>

        {/* Degree cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {education.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              whileHover={{ y: -6, borderColor: "rgba(99,102,241,0.4)" }}
              className="p-8 rounded-2xl border transition-all duration-300"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-subtle)",
              }}
            >
              {/* Period badge */}
              <span
                className="inline-block text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-5"
                style={{
                  background: "var(--accent-indigo-dim)",
                  color: "var(--accent-indigo)",
                  border: "1px solid rgba(99,102,241,0.2)",
                }}
              >
                {item.period}
              </span>

              {/* Degree in huge text */}
              <h3
                className="font-black leading-tight text-slate-100"
                style={{ fontSize: "clamp(1.3rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
              >
                {item.degree}
              </h3>

              {/* Major */}
              <p
                className="mt-1 text-sm font-semibold"
                style={{ color: "var(--accent-cyan)" }}
              >
                {item.major}
              </p>

              {/* Institution */}
              <p
                className="mt-0.5 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.institution}
              </p>

              {/* Divider */}
              <div
                className="my-4 h-px"
                style={{
                  background: "linear-gradient(90deg, rgba(99,102,241,0.3), transparent)",
                }}
              />

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
