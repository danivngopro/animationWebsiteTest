"use client";

import { motion } from "motion/react";
import { ExternalLink, Construction } from "lucide-react";
import { TechBadge } from "./TechBadge";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isTodo = project.status === "TODO";

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
        {isTodo ? (
          <span className="shrink-0 flex items-center gap-1 text-xs text-amber-400/80 bg-amber-400/10 border border-amber-400/20 rounded-full px-2 py-0.5">
            <Construction className="w-3 h-3" />
            TODO
          </span>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="shrink-0 p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/8 transition-colors"
            aria-label={`View ${project.title}`}
          >
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {project.description}
      </p>

      {isTodo && (
        <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>
          {project.note}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.tags.map((tag) => (
          <TechBadge key={tag} label={tag} variant="ghost" />
        ))}
      </div>
    </motion.div>
  );
}
