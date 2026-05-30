"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Code2, Users, BrainCircuit, ShieldCheck, X } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

type LucideIcon = React.FC<{ className?: string; style?: React.CSSProperties }>;

const pillars: {
  icon: LucideIcon;
  label: string;
  sub: string;
  color: string;
  description: string;
  points: string[];
}[] = [
  {
    icon: Code2 as LucideIcon,
    label: "Full-Stack",
    sub: "Architecture",
    color: "var(--accent-indigo)",
    description: "TypeScript at every layer — schema to polished UI.",
    points: [
      "React + Node.js",
      "PostgreSQL, MongoDB, Redis",
      "REST + WebSockets",
    ],
  },
  {
    icon: Users as LucideIcon,
    label: "Technical",
    sub: "Leadership",
    color: "var(--accent-cyan)",
    description: "3+ years leading at IDF: sprints, reviews, mentoring.",
    points: [
      "IDF platform architecture",
      "Code quality standards",
      "AI workflow adoption",
    ],
  },
  {
    icon: BrainCircuit as LucideIcon,
    label: "AI-Native",
    sub: "Engineering",
    color: "#a78bfa",
    description:
      "AI is the first tool, not an afterthought. Integrated into every phase of the stack.",
    points: [
      "Claude, GPT-4, Copilot daily",
      "Local LLM via Ollama",
      "MCP server integrations",
    ],
  },
  {
    icon: ShieldCheck as LucideIcon,
    label: "Security",
    sub: "First Mindset",
    color: "#34d399",
    description:
      "Security baked in from design. Every input validated, every API surface hardened.",
    points: [
      "Zod input validation at boundaries",
      "CSP headers + XSS prevention",
      "Prompt injection awareness",
    ],
  },
];

function StatBlock({
  value,
  suffix = "",
  label,
  started,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  started: boolean;
  delay?: number;
}) {
  const count = useCountUp(value, started, 1200);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={started ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div
        className="font-black leading-none"
        style={{
          fontSize: "clamp(3rem, 8vw, 7rem)",
          background: "linear-gradient(135deg, #a5b4fc, #6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.04em",
          display: "inline-block",
          minWidth: `${(String(value) + suffix).length}ch`,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        className="text-xs font-semibold tracking-[0.2em] uppercase mt-2"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [selected, setSelected] = useState<number | null>(null);
  const [layoutEnabled, setLayoutEnabled] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setLayoutEnabled(true), 700);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <div
      id="about"
      className="slide-section"
      ref={ref}
      style={{ background: "rgba(6,6,14,0.52)" }}
    >
      <div className="h-full flex flex-col justify-center px-8 sm:px-14 lg:px-20 pt-9 pb-10 sm:pt-12 sm:pb-14 max-w-[1400px] mx-auto w-full translate-y-[55px]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-10"
          style={{ color: "var(--accent-cyan)" }}
        >
          About
        </motion.p>

        <div className="grid grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-black leading-[1.0] tracking-tight text-gradient-subtle"
              style={{
                fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Engineering
              <br />
              <span className="text-gradient-indigo whitespace-nowrap">
                with intention.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg leading-relaxed max-w-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Senior full-stack engineer with production experience across
              military-grade internal systems and commercial platforms. I
              design, build, and ship end-to-end — from design to production. I
              lead teams and embed AI tools as a first-class engineering
              practice.
            </motion.p>

            <div className="mt-10 flex gap-10">
              <StatBlock
                value={7}
                suffix="+"
                label="Years Building"
                started={inView}
                delay={0.5}
              />
              <StatBlock
                value={3}
                suffix="+"
                label="Years Leading"
                started={inView}
                delay={0.65}
              />
              <StatBlock
                value={100}
                suffix="%"
                label="AI-Native"
                started={inView}
                delay={0.8}
              />
            </div>
          </div>

          {/* Right — interactive pillar cards */}
          <div className="grid grid-cols-2 gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              const isOpen = selected === i;
              return (
                <motion.div
                  key={p.label}
                  layout={layoutEnabled}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  onClick={() => setSelected(isOpen ? null : i)}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                    transition: { duration: 0.1 },
                  }}
                  className="relative p-5 rounded-2xl border cursor-pointer overflow-hidden"
                  style={{
                    background: isOpen ? `${p.color}14` : "var(--bg-card)",
                    borderColor: isOpen
                      ? `${p.color}55`
                      : "var(--border-subtle)",
                    transition: "background 0.1s, border-color 0.1s",
                    minHeight: "140px",
                  }}
                >
                  {/* Glow spot */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${p.color}12 0%, transparent 70%)`,
                      opacity: isOpen ? 1 : 0,
                      transition: "opacity 0.1s",
                    }}
                    aria-hidden
                  />

                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="expanded"
                        layout
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className="relative z-10 flex flex-col gap-2"
                      >
                        {/* Close hint */}
                        <div className="flex items-center justify-between mb-1">
                          <p
                            className="text-sm font-bold"
                            style={{ color: p.color }}
                          >
                            {p.label}
                          </p>
                          <X
                            className="w-3 h-3 opacity-40"
                            style={{ color: p.color }}
                          />
                        </div>
                        <p
                          className="text-[11px] leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {p.description}
                        </p>
                        <ul className="mt-1 flex flex-col gap-1">
                          {p.points.map((pt) => (
                            <li
                              key={pt}
                              className="flex items-start gap-1.5 text-[10px]"
                              style={{ color: "var(--text-muted)" }}
                            >
                              <span
                                className="mt-1 w-1 h-1 rounded-full shrink-0"
                                style={{ background: p.color }}
                              />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="compact"
                        layout
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className="relative z-10"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                          style={{ background: `${p.color}22` }}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: p.color }}
                          />
                        </div>
                        <p className="text-base font-bold text-slate-100 leading-snug">
                          {p.label}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {p.sub}
                        </p>
                        <p
                          className="mt-2 text-[10px] tracking-wide"
                          style={{ color: `${p.color}80` }}
                        >
                          tap to expand →
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hidden sm:block absolute inset-x-0 bottom-14 px-14 lg:px-20 max-w-[1400px] mx-auto w-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-xs max-w-lg"
          style={{ color: "var(--text-muted)" }}
        >
          Production systems, leadership, AI workflow, and security-first
          delivery.
        </motion.p>
      </div>
    </div>
  );
}
