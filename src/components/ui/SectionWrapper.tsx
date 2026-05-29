"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

// Reusable scroll-reveal container.
// Wraps section content in a whileInView fade+translateY animation.
// Respects prefers-reduced-motion — skips animation if user has it enabled.
export function SectionWrapper({
  id,
  className,
  children,
  delay = 0,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <section
      id={id}
      ref={ref}
      className={cn("section-padding relative", className)}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 32 }}
        animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

// Reusable section label + heading block
interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-16", centered && "text-center")}>
      <span
        className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
        style={{ color: "var(--accent-cyan)" }}
      >
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient-subtle leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg max-w-2xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
