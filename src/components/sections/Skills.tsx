"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Server, Monitor, Cloud, Database, Bot, Users } from "lucide-react";
import { skills } from "@/lib/data";

type LucideIcon = React.FC<{ className?: string; style?: React.CSSProperties }>;

const iconMap: Record<string, LucideIcon> = {
  Server: Server as LucideIcon,
  Monitor: Monitor as LucideIcon,
  Cloud: Cloud as LucideIcon,
  Database: Database as LucideIcon,
  Bot: Bot as LucideIcon,
  Users: Users as LucideIcon,
};

const ACCENT_COLORS = [
  "#6366f1", "#22d3ee", "#a78bfa", "#34d399", "#f59e0b", "#f472b6",
];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div id="skills" className="slide-section" ref={ref}
      style={{
        background: "var(--bg-surface)",
        backgroundImage: "radial-gradient(ellipse 80% 80% at 50% 100%, rgba(99,102,241,0.07) 0%, transparent 70%)",
      }}
    >
      <div className="h-full flex flex-col justify-between px-8 sm:px-14 lg:px-20 py-10 max-w-[1400px] mx-auto w-full">

        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-2"
              style={{ color: "var(--accent-cyan)" }}
            >
              Skills
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-black tracking-tight text-gradient-subtle"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              What I build with.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="hidden sm:block text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            Tap a category to expand
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 flex-1 my-6">
          {skills.map((cat, i) => {
            const Icon = iconMap[cat.icon] ?? Server;
            const accent = ACCENT_COLORS[i];
            const isOpen = expanded === i;

            return (
              <motion.button
                key={cat.category}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.07 }}
                onClick={() => setExpanded(isOpen ? null : i)}
                className="relative text-left rounded-2xl border overflow-hidden transition-all duration-300 p-5 flex flex-col gap-3"
                style={{
                  background: isOpen ? `${accent}10` : "var(--bg-card)",
                  borderColor: isOpen ? `${accent}40` : "var(--border-subtle)",
                  boxShadow: isOpen ? `0 0 30px ${accent}15` : "none",
                  minHeight: 0,
                }}
                aria-expanded={isOpen}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${accent}20` }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color: accent }} />
                </div>

                {/* Category name */}
                <div>
                  <p className="text-sm font-bold text-slate-100 leading-snug">{cat.category}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {cat.items.length} technologies
                  </p>
                </div>

                {/* Expanded badges */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {cat.items.map((item, j) => (
                          <motion.span
                            key={item}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: j * 0.04, duration: 0.2 }}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                            style={{
                              background: `${accent}15`,
                              color: accent,
                              border: `1px solid ${accent}30`,
                            }}
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Bottom bar */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          Full TypeScript across every layer — from schema to deployment.
        </motion.p>
      </div>
    </div>
  );
}
