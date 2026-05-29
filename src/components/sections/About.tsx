"use client";

import { motion } from "motion/react";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import { personal } from "@/lib/data";
import { Code2, ShieldCheck, Users, BrainCircuit } from "lucide-react";

type LucideIcon = React.FC<{ className?: string; style?: React.CSSProperties }>;

const pillars: { icon: LucideIcon; label: string; desc: string }[] = [
  {
    icon: Code2 as LucideIcon,
    label: "Full-Stack Architecture",
    desc: "End-to-end ownership from schema design to deployed frontend.",
  },
  {
    icon: Users as LucideIcon,
    label: "Technical Leadership",
    desc: "Team lead experience: reviews, mentoring, sprint planning, delivery.",
  },
  {
    icon: BrainCircuit as LucideIcon,
    label: "AI-Native Engineering",
    desc: "Claude, GPT-4, Copilot, and MCP as first-class development tools.",
  },
  {
    icon: ShieldCheck as LucideIcon,
    label: "Security-First Mindset",
    desc: "Cybersecurity major background baked into every architecture decision.",
  },
];

export function About() {
  return (
    <SectionWrapper id="about" className="bg-[var(--bg-surface)]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — bio */}
          <div>
            <SectionHeading
              label="About"
              title="Engineering with intention."
            />

            <div className="space-y-4">
              {personal.bio.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Quick stats */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { value: "7+", label: "Years Building" },
                { value: "3+", label: "Years Leading" },
                { value: "AI-First", label: "Workflow" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--accent-indigo)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — pillars */}
          <div className="grid sm:grid-cols-2 gap-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="group p-5 rounded-xl border transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: "var(--accent-indigo-dim)" }}
                  >
                    <Icon
                      className="w-4.5 h-4.5"
                      style={{ color: "var(--accent-indigo)" }}
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-100">
                    {pillar.label}
                  </h3>
                  <p
                    className="text-xs mt-1.5 leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
