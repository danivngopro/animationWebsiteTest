"use client";

import { motion } from "motion/react";
import {
  Brain,
  Zap,
  Code,
  Network,
  Bug,
  TestTube,
} from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import { aiWorkflow } from "@/lib/data";

type LucideIcon = React.FC<{ className?: string; style?: React.CSSProperties }>;

const iconMap: Record<string, LucideIcon> = {
  Brain: Brain as LucideIcon,
  Zap: Zap as LucideIcon,
  Code: Code as LucideIcon,
  Network: Network as LucideIcon,
  Bug: Bug as LucideIcon,
  TestTube: TestTube as LucideIcon,
};

// AI Workflow section — spotlight feature cards inspired by 21st.dev spotlight card patterns.
// Each card highlights one tool/practice in Daniel's AI-assisted engineering workflow.
export function AIWorkflow() {
  return (
    <SectionWrapper id="ai-workflow" className="bg-[var(--bg-base)]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="AI-Assisted Engineering"
          title="How I work with AI."
          subtitle="Not prompt-and-paste. AI tools are embedded in every phase — architecture, review, debugging, testing — with human judgement at every checkpoint."
        />

        {/* Workflow grid — 2 columns on desktop, spotlight effect per card */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiWorkflow.map((item, index) => {
            const Icon = iconMap[item.icon] ?? Brain;
            return (
              <motion.div
                key={item.tool}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.09 }}
                className="group relative p-6 rounded-xl border overflow-hidden transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                {/* Spotlight glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(34,211,238,0.07) 0%, transparent 70%)",
                  }}
                  aria-hidden
                />

                {/* Step number */}
                <span
                  className="absolute top-5 right-5 text-4xl font-black opacity-5 select-none"
                  style={{ color: "var(--accent-cyan)" }}
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "var(--accent-cyan-dim)" }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: "var(--accent-cyan)" }}
                  />
                </div>

                {/* Tool name */}
                <h3 className="text-sm font-bold text-slate-100 mb-1">
                  {item.tool}
                </h3>
                <p
                  className="text-xs font-medium mb-3"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  {item.role}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="mt-10 p-6 rounded-xl border text-center"
          style={{
            background: "rgba(34,211,238,0.04)",
            borderColor: "rgba(34,211,238,0.15)",
          }}
        >
          <p
            className="text-sm leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Every AI output is reviewed before it ships.{" "}
            <span className="text-slate-200 font-medium">
              AI accelerates; engineering judgment decides.
            </span>{" "}
            This is the professional standard for AI-native senior engineering.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
