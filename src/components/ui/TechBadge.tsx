"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  variant?: "default" | "indigo" | "cyan" | "ghost";
  className?: string;
}

export function TechBadge({
  label,
  variant = "default",
  className,
}: TechBadgeProps) {
  const variants = {
    default:
      "bg-white/5 text-slate-300 border border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/10",
    indigo:
      "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/25",
    cyan: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25",
    ghost: "bg-transparent text-slate-400 border border-white/6 hover:border-white/20",
  };

  return (
    <motion.span
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "inline-block px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 cursor-default",
        variants[variant],
        className
      )}
    >
      {label}
    </motion.span>
  );
}
