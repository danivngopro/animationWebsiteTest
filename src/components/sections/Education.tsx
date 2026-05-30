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
      style={{ background: "rgba(5,4,12,0.52)" }}
    >
      <div className="h-full flex flex-col justify-start sm:justify-between px-8 sm:px-14 lg:px-20 pt-8 pb-10 sm:pt-[134px] sm:pb-[74px] max-w-[1400px] mx-auto w-full gap-8">

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
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {education.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              whileHover={{ y: -4 }}
              transition={{
                opacity: { duration: 0.6, delay: 0.3 + i * 0.15 },
                y: { type: "spring", stiffness: 600, damping: 30 },
              }}
              className="relative p-4 sm:p-8 rounded-2xl border overflow-hidden group transition-colors duration-100"
              style={{
                background: "var(--bg-card)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.4)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
            >
              {/* Spotlight glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 70%)" }}
                aria-hidden
              />

              {/* Period badge */}
              <span
                className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-3 sm:mb-5"
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
                className="mt-0.5 text-xs sm:text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.institution}
              </p>

              {/* Divider */}
              <div
                className="hidden sm:block my-4 h-px"
                style={{
                  background: "linear-gradient(90deg, rgba(99,102,241,0.3), transparent)",
                }}
              />

              {/* Description */}
              <p className="hidden sm:block text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="hidden sm:block text-xs sm:-translate-y-[17px]"
          style={{ color: "var(--text-muted)" }}
        >
          Computer science, cybersecurity, and economics as the foundation for
          practical engineering leadership.
        </motion.p>
      </div>
    </div>
  );
}

