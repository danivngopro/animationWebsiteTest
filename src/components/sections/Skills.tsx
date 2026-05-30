"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, LayoutGroup } from "motion/react";
import { Server, Monitor, Cloud, Database, Bot, Users, X } from "lucide-react";
import { skills, techDescriptions } from "@/lib/data";

type LucideIcon = React.FC<{ className?: string; style?: React.CSSProperties }>;

const iconMap: Record<string, LucideIcon> = {
  Server:   Server   as LucideIcon,
  Monitor:  Monitor  as LucideIcon,
  Cloud:    Cloud    as LucideIcon,
  Database: Database as LucideIcon,
  Bot:      Bot      as LucideIcon,
  Users:    Users    as LucideIcon,
};

const ACCENT_COLORS = ["#6366f1","#22d3ee","#a78bfa","#34d399","#f59e0b","#f472b6"];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const category = skills[activeCategory];
  const accent   = ACCENT_COLORS[activeCategory];
  const detail   = selectedTech ? techDescriptions[selectedTech] : null;

  const handleTechClick = (tech: string) => {
    setSelectedTech(prev => prev === tech ? null : tech);
  };

  const handleCategorySwitch = (i: number) => {
    setActiveCategory(i);
    setSelectedTech(null);
  };

  return (
    <div
      id="skills"
      className="slide-section"
      ref={ref}
      style={{ background: "rgba(5,5,12,0.52)" }}
    >
      <div className="h-full flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-8 sm:py-10 max-w-[1400px] mx-auto w-full gap-7 sm:gap-8">

        {/* Header */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-1"
            style={{ color: "var(--accent-cyan)" }}
          >
            Skills
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-black tracking-tight text-gradient-subtle"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.8rem)", letterSpacing: "-0.03em" }}
          >
            What I build with.
          </motion.h2>
        </div>

        {/* Body: category sidebar + tech grid */}
        <div className="grid grid-cols-[auto_1fr] gap-6 sm:gap-8 min-h-0">

          {/* ── Left: category tabs ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-1 justify-start pt-1"
          >
            <LayoutGroup>
              {skills.map((cat, i) => {
                const Icon = iconMap[cat.icon] ?? Server;
                const catAccent = ACCENT_COLORS[i];
                const isActive = i === activeCategory;
                return (
                  <button
                    key={cat.category}
                    onClick={() => handleCategorySwitch(i)}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-left relative"
                    aria-pressed={isActive}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="skills-active-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: `${catAccent}18`, boxShadow: `inset 2px 0 0 ${catAccent}` }}
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon
                      className="w-4 h-4 shrink-0 transition-colors duration-150 relative z-10"
                      style={{ color: isActive ? catAccent : "var(--text-muted)" }}
                    />
                    <span
                      className="text-xs font-semibold whitespace-nowrap hidden sm:block transition-colors duration-150 relative z-10"
                      style={{ color: isActive ? "var(--text-primary)" : "var(--text-muted)" }}
                    >
                      {cat.category}
                    </span>
                  </button>
                );
              })}
            </LayoutGroup>
          </motion.div>

          {/* ── Right: tech grid + description ── */}
          <div className="flex flex-col gap-4 min-h-0 overflow-hidden">

            {/* Category heading */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeCategory}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: accent }}
              >
                {category.category}
              </motion.p>
            </AnimatePresence>

            {/* Tech chips — stagger on category switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-wrap gap-2"
              >
                {category.items.map((tech, j) => {
                  const isSelected = selectedTech === tech;
                  const hasDesc = !!techDescriptions[tech];
                  return (
                    <motion.button
                      key={tech}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: j * 0.04, duration: 0.18, ease: "easeOut" }}
                      onClick={() => hasDesc && handleTechClick(tech)}
                      whileHover={hasDesc ? { scale: 1.05, y: -2 } : {}}
                      whileTap={hasDesc ? { scale: 0.97 } : {}}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                      style={{
                        background: isSelected ? `${accent}25` : `${accent}10`,
                        color: isSelected ? accent : "var(--text-secondary)",
                        border: isSelected ? `1px solid ${accent}60` : `1px solid ${accent}25`,
                        cursor: hasDesc ? "pointer" : "default",
                        boxShadow: isSelected ? `0 0 12px ${accent}30` : "none",
                      }}
                      aria-pressed={isSelected}
                    >
                      {tech}
                      {!hasDesc && (
                        <span className="ml-1 opacity-30 text-[9px]">·</span>
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* ── Description panel ── */}
            <AnimatePresence>
              {selectedTech && detail && (
                <motion.div
                  initial={{ opacity: 0, y: 16, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 8, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className="p-5 rounded-2xl border relative"
                    style={{
                      background: `${accent}08`,
                      borderColor: `${accent}25`,
                    }}
                  >
                    {/* Close button */}
                    <button
                      onClick={() => setSelectedTech(null)}
                      className="absolute top-3 right-3 p-1 rounded-lg opacity-40 hover:opacity-100 transition-opacity"
                      style={{ color: "var(--text-secondary)" }}
                      aria-label="Close description"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    {/* Tech name */}
                    <p
                      className="text-sm font-bold mb-3"
                      style={{ color: accent }}
                    >
                      {selectedTech}
                    </p>

                    {/* What it is */}
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                      <span className="font-semibold text-slate-300">What it is: </span>
                      {detail.what}
                    </p>

                    {/* My experience */}
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      <span className="font-semibold text-slate-300">My experience: </span>
                      {detail.experience}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint */}
            {!selectedTech && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="text-[11px]"
                style={{ color: "var(--text-muted)" }}
              >
                Click any technology to see how I've used it
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
