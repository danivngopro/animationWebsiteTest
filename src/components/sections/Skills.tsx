"use client";

import { motion } from "motion/react";
import {
  Server,
  Monitor,
  Cloud,
  Database,
  Bot,
  Users,
} from "lucide-react";
import { SectionWrapper, SectionHeading } from "@/components/ui/SectionWrapper";
import { TechBadge } from "@/components/ui/TechBadge";
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

// Bento-style skill grid inspired by 21st.dev bento grid patterns.
// Each category card reveals with a staggered entrance, badges animate in on hover-like scroll.
export function Skills() {
  return (
    <SectionWrapper id="skills" className="bg-[var(--bg-surface)]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Skills"
          title="What I build with."
          subtitle="A full-spectrum stack — from database design and API architecture to polished frontends and cloud infrastructure."
          centered
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((category, catIndex) => {
            const Icon = iconMap[category.icon] ?? Server;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: catIndex * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative p-6 rounded-xl border overflow-hidden transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                {/* Gradient corner on hover */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
                  }}
                  aria-hidden
                />

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "var(--accent-indigo-dim)" }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: "var(--accent-indigo)" }}
                  />
                </div>

                {/* Category name */}
                <h3 className="text-sm font-bold text-slate-100 mb-4">
                  {category.category}
                </h3>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: catIndex * 0.06 + itemIndex * 0.04,
                      }}
                    >
                      <TechBadge label={item} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
