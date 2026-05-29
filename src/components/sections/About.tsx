"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Code2, Users, BrainCircuit, ShieldCheck } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

type LucideIcon = React.FC<{ className?: string; style?: React.CSSProperties }>;

const pillars: { icon: LucideIcon; label: string; sub: string; color: string }[] = [
  { icon: Code2 as LucideIcon,       label: "Full-Stack",  sub: "Architecture",      color: "var(--accent-indigo)" },
  { icon: Users as LucideIcon,       label: "Technical",   sub: "Leadership",         color: "var(--accent-cyan)"   },
  { icon: BrainCircuit as LucideIcon,label: "AI-Native",   sub: "Engineering",        color: "#a78bfa"              },
  { icon: ShieldCheck as LucideIcon, label: "Security",    sub: "First Mindset",      color: "#34d399"              },
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
      initial={{ opacity: 0, y: 20 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
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
        }}
      >
        {count}{suffix}
      </div>
      <div className="text-xs font-semibold tracking-[0.2em] uppercase mt-2" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div id="about" className="slide-section" ref={ref}
      style={{
        background: "var(--bg-surface)",
        backgroundImage: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(34,211,238,0.05) 0%, transparent 60%)",
      }}
    >
      <div className="h-full flex flex-col justify-center px-8 sm:px-14 lg:px-20 max-w-[1400px] mx-auto w-full">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-10"
          style={{ color: "var(--accent-cyan)" }}
        >
          About
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">

          {/* Left — big statement + stats */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black leading-[1.0] tracking-tight text-gradient-subtle"
              style={{
                fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Engineering<br />
              <span className="text-gradient-indigo">with intention.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-base sm:text-lg leading-relaxed max-w-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Senior full-stack engineer with production experience across
              military-grade internal systems and commercial platforms. I design,
              build, and ship end-to-end — from schema to UI. I lead teams and
              embed AI tools as a first-class engineering practice.
            </motion.p>

            {/* Stats row */}
            <div className="mt-10 flex gap-10">
              <StatBlock value={7}  suffix="+" label="Years Building"   started={inView} delay={0.5} />
              <StatBlock value={3}  suffix="+" label="Years Leading"    started={inView} delay={0.65} />
              <StatBlock value={100} suffix="%" label="AI-Native"       started={inView} delay={0.8} />
            </div>
          </div>

          {/* Right — pillar cards */}
          <div className="grid grid-cols-2 gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.35 + i * 0.12 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group p-6 rounded-2xl border transition-all duration-300"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${p.color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: p.color }} />
                  </div>
                  <p className="text-base font-bold text-slate-100 leading-snug">
                    {p.label}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {p.sub}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
