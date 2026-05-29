"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { TechBadge } from "./TechBadge";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative flex flex-col gap-4 p-6 rounded-xl border transition-all duration-300",
        "bg-[var(--bg-card)] border-[var(--border-subtle)]",
        "hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)]"
      )}
    >
      {/* Gradient top border on hover */}
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(34,211,238,0.4), transparent)",
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-100 leading-snug">
          {project.title}
        </h3>
        <motion.span
          whileHover={{ scale: 1.1 }}
          className="shrink-0 flex items-center gap-1 text-xs rounded-full px-2 py-0.5"
          style={{
            background: "rgba(99,102,241,0.12)",
            color: "var(--accent-indigo)",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <ExternalLink className="w-3 h-3" />
          {project.year}
        </motion.span>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.tags.map((tag) => (
          <TechBadge key={tag} label={tag} variant="ghost" />
        ))}
      </div>
    </motion.div>
  );
}
