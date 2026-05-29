"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Shield, Lock, ShieldAlert, Timer, Bot, AlertCircle, FileCode, Package, Brain } from "lucide-react";
import { securityMeasures } from "@/lib/data";

type LucideIcon = React.FC<{ className?: string; style?: React.CSSProperties }>;

const iconMap: Record<string, LucideIcon> = {
  Shield: Shield as LucideIcon,
  Lock: Lock as LucideIcon,
  ShieldAlert: ShieldAlert as LucideIcon,
  Timer: Timer as LucideIcon,
  Bot: Bot as LucideIcon,
  AlertCircle: AlertCircle as LucideIcon,
  FileCode: FileCode as LucideIcon,
  Package: Package as LucideIcon,
  Brain: Brain as LucideIcon,
};

// Animated scanning line
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(34,211,238,0.3), transparent)",
      }}
      initial={{ top: "0%", opacity: 0 }}
      animate={{ top: ["0%", "100%"], opacity: [0, 0.8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      aria-hidden
    />
  );
}

export function Security() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div id="security" className="slide-section hex-bg" ref={ref} style={{ background: "transparent" }}>
      <ScanLine />

      {/* Semi-transparent overlay — hex pattern + galaxy both show through */}
      <div className="absolute inset-0" style={{ background: "rgba(4,4,10,0.55)" }} aria-hidden />

      <div className="relative z-10 h-full flex flex-col justify-between px-8 sm:px-14 lg:px-20 py-10 max-w-[1400px] mx-auto w-full">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-2"
              style={{ color: "var(--accent-cyan)" }}
            >
              Security & Countermeasures
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-black tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              <span className="text-gradient-subtle">Defense </span>
              <span className="text-gradient-indigo">as a default.</span>
            </motion.h2>
          </div>

          {/* Shield icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
            className="shrink-0"
          >
            <Shield
              className="w-14 h-14 sm:w-16 sm:h-16 animate-glow-pulse"
              style={{ color: "var(--accent-indigo)" }}
            />
          </motion.div>
        </div>

        {/* 3×3 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 my-4">
          {securityMeasures.map((m, i) => {
            const Icon = iconMap[m.icon] ?? Shield;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                whileHover={{ y: -3 }}
                transition={{
                  opacity: { duration: 0.4, delay: 0.25 + i * 0.06 },
                  x: { duration: 0.4, delay: 0.25 + i * 0.06 },
                  y: { type: "spring", stiffness: 600, damping: 30 },
                }}
                className="relative flex items-start gap-3 p-4 rounded-xl border overflow-hidden group transition-colors duration-100"
                style={{ background: "rgba(17,17,37,0.7)", borderColor: "rgba(255,255,255,0.07)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.4)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                {/* Spotlight glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
                  aria-hidden
                />

                {/* Index watermark */}
                <span
                  className="absolute bottom-2 right-3 text-4xl font-black opacity-[0.04] select-none tabular-nums"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div
                  className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                  style={{ background: "var(--accent-indigo-dim)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "var(--accent-indigo)" }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-semibold text-slate-100 leading-snug">{m.title}</p>
                  </div>
                  <span
                    className="inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-full mb-1.5"
                    style={{
                      background: "rgba(99,102,241,0.12)",
                      color: "var(--accent-indigo)",
                      border: "1px solid rgba(99,102,241,0.2)",
                    }}
                  >
                    {m.tag}
                  </span>
                  <p className="text-[11px] leading-relaxed hidden sm:block" style={{ color: "var(--text-secondary)" }}>
                    {m.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          Cybersecurity major — security is baked in, not bolted on.
        </motion.p>
      </div>
    </div>
  );
}
