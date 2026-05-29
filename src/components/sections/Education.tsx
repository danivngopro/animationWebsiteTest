"use client";

import { motion } from "motion/react";
import { GraduationCap, BookOpen } from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import { education } from "@/lib/data";

type LucideIcon = React.FC<{ className?: string; style?: React.CSSProperties }>;

const iconMap: LucideIcon[] = [GraduationCap as LucideIcon, BookOpen as LucideIcon];

export function Education() {
  return (
    <SectionWrapper id="education" className="bg-[var(--bg-surface)]">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          label="Education"
          title="The foundation."
          centered
        />

        <div className="grid sm:grid-cols-2 gap-6">
          {education.map((item, index) => {
            const Icon = iconMap[index] ?? GraduationCap;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -4 }}
                className="group p-7 rounded-xl border transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_0_28px_rgba(99,102,241,0.1)]"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                {/* Icon + period */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--accent-indigo-dim)" }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "var(--accent-indigo)" }}
                    />
                  </div>
                  <span
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: "var(--accent-cyan)" }}
                  >
                    {item.period}
                  </span>
                </div>

                {/* Degree */}
                <h3 className="text-lg font-bold text-slate-100 leading-snug">
                  {item.degree}
                </h3>

                {/* Major */}
                <p
                  className="text-xs font-semibold mt-1 mb-0.5"
                  style={{ color: "var(--accent-indigo)" }}
                >
                  {item.major}
                </p>

                {/* Institution */}
                <p
                  className="text-sm font-medium mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.institution}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
