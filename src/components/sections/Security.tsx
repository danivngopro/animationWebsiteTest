"use client";

import { motion } from "motion/react";
import {
  Shield,
  Lock,
  ShieldAlert,
  Timer,
  Bot,
  AlertCircle,
  FileCode,
  Package,
  Brain,
} from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
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

// Security & AI-Abuse Countermeasures section.
// Presents only defensive, professional measures — no offensive functionality.
// Card grid inspired by 21st.dev numbered feature card patterns.
export function Security() {
  return (
    <SectionWrapper id="security" className="bg-[var(--bg-surface)]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Security & Countermeasures"
          title="Defense as a default."
          subtitle="A Cybersecurity background means security is never an afterthought. These are the practical measures built into every system I ship."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {securityMeasures.map((measure, index) => {
            const Icon = iconMap[measure.icon] ?? Shield;
            return (
              <motion.div
                key={measure.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="group relative p-5 rounded-xl border overflow-hidden transition-all duration-300 hover:border-indigo-500/25 hover:shadow-[0_0_24px_rgba(99,102,241,0.09)]"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                {/* Index number watermark */}
                <span
                  className="absolute bottom-3 right-4 text-5xl font-black opacity-[0.04] select-none tabular-nums"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--accent-indigo-dim)" }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: "var(--accent-indigo)" }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-sm font-semibold text-slate-100 leading-snug">
                        {measure.title}
                      </h3>
                      <span
                        className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(99,102,241,0.12)",
                          color: "var(--accent-indigo)",
                          border: "1px solid rgba(99,102,241,0.2)",
                        }}
                      >
                        {measure.tag}
                      </span>
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {measure.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
