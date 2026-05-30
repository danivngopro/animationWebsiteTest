"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Brain, Zap, Code, Network, Bug, TestTube, Server, Cpu, BarChart2 } from "lucide-react";
import { aiWorkflow } from "@/lib/data";

type LucideIcon = React.FC<{ className?: string; style?: React.CSSProperties }>;

const iconMap: Record<string, LucideIcon> = {
  Brain:     Brain     as LucideIcon,
  Zap:       Zap       as LucideIcon,
  Code:      Code      as LucideIcon,
  Network:   Network   as LucideIcon,
  Bug:       Bug       as LucideIcon,
  TestTube:  TestTube  as LucideIcon,
  Server:    Server    as LucideIcon,
  Cpu:       Cpu       as LucideIcon,
  BarChart2: BarChart2 as LucideIcon,
};

export function AIWorkflow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div id="ai-workflow" className="slide-section" ref={ref} style={{ background: "rgba(5,5,12,0.50)" }}>
      <div className="absolute inset-0 flex items-center justify-end pr-10 pointer-events-none overflow-hidden" aria-hidden>
        <span className="font-black select-none"
          style={{ fontSize: "clamp(8rem, 35vw, 40rem)", color: "rgba(34,211,238,0.025)", letterSpacing: "-0.08em", lineHeight: 1 }}>
          AI
        </span>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between px-8 sm:px-14 lg:px-20 py-5 max-w-[1400px] mx-auto w-full">

        <div>
          <motion.p initial={{ opacity: 0, y: -10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: "var(--accent-cyan)" }}>
            AI-Assisted Engineering
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}>
            <span className="text-gradient-subtle">How I work </span>
            <span className="text-gradient-indigo">with AI.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 flex-1 my-6">
          {aiWorkflow.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Brain;
            return (
              <motion.div
                key={item.tool}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                whileHover={{ y: -4 }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.2 + i * 0.09 },
                  scale: { duration: 0.5, delay: 0.2 + i * 0.09 },
                  y: { type: "spring", stiffness: 600, damping: 30 },
                }}
                className="relative group p-5 rounded-2xl border overflow-hidden flex flex-col gap-3"
                style={{ background: "var(--bg-card)", borderColor: "rgba(255,255,255,0.07)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(34,211,238,0.35)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                {/* Spotlight glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(34,211,238,0.08) 0%, transparent 70%)" }}
                  aria-hidden
                />
                <span className="absolute top-4 right-4 text-5xl font-black opacity-[0.04] select-none tabular-nums"
                  style={{ color: "var(--accent-cyan)" }} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--accent-cyan-dim)" }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: "var(--accent-cyan)" }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-100">{item.tool}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: "var(--accent-cyan)" }}>{item.role}</p>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="px-5 py-3 rounded-xl border text-sm text-center"
          style={{ background: "rgba(34,211,238,0.04)", borderColor: "rgba(34,211,238,0.15)", color: "var(--text-secondary)" }}>
          <span className="font-semibold text-slate-200">AI accelerates.</span>{" "}
          Engineering judgment decides. Every output reviewed before it ships.
        </motion.div>
      </div>
    </div>
  );
}
