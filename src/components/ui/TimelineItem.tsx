"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TechBadge } from "./TechBadge";
import type { ExperienceItem } from "@/lib/data";

interface TimelineItemProps {
  item: ExperienceItem;
  index: number;
  isLast: boolean;
}

export function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-8">
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.1 }}
          className="relative z-10 mt-1.5 w-3 h-3 rounded-full shrink-0"
          style={{
            background: "linear-gradient(135deg, #6366f1, #22d3ee)",
            boxShadow: "0 0 10px rgba(99,102,241,0.5)",
          }}
        />
        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="w-px flex-1 mt-2"
            aria-hidden
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(99,102,241,0.4) 0%, rgba(99,102,241,0.05) 100%)",
                minHeight: "100%",
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.15, ease: "easeOut" }}
        className="pb-12 flex-1"
      >
        <div
          className="group p-6 rounded-xl border transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_0_24px_rgba(99,102,241,0.1)]"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-subtle)",
          }}
        >
          {/* Period */}
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--accent-cyan)" }}
          >
            {item.period}
          </span>

          {/* Role & Company */}
          <h3 className="mt-1 text-lg sm:text-xl font-bold text-slate-100">
            {item.role}
          </h3>
          <p className="text-sm font-medium mt-0.5" style={{ color: "var(--accent-indigo)" }}>
            {item.company}
          </p>

          {/* Description */}
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {item.description}
          </p>

          {/* Highlights */}
          <ul className="mt-4 space-y-2">
            {item.highlights.map((h, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--accent-indigo)" }}
                />
                {h}
              </li>
            ))}
          </ul>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mt-5">
            {item.tech.map((t) => (
              <TechBadge key={t} label={t} variant="ghost" />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
