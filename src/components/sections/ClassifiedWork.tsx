"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Code2, GitBranch, Lock } from "lucide-react";

const CARDS = [
  {
    icon: Lock,
    title: "Sanitized architecture, not classified details",
    body: "Architecture decisions and tradeoffs are described generically — no classified system details, internal tooling names, or infrastructure specifics are included.",
  },
  {
    icon: GitBranch,
    title: "Engineering decisions and tradeoffs",
    body: "System design thinking, technology selection rationale, delivery approach, and production lessons — described at a level safe for public discussion.",
  },
  {
    icon: Code2,
    title: "Public proof through reference implementations",
    body: "Where possible, public reference implementations demonstrate the same skills: this portfolio site, open-source tooling, and AI workflow examples.",
  },
] as const;

export function ClassifiedWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div
      id="classified-work"
      className="slide-section"
      ref={ref}
      style={{ background: "rgba(5,5,12,0.50)" }}
    >
      <div className="h-full flex flex-col justify-between px-8 sm:px-14 lg:px-20 pt-8 pb-10 sm:pt-[124px] sm:pb-14 max-w-[1400px] mx-auto w-full">

        {/* Header */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--accent-cyan)" }}
          >
            Classified Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", letterSpacing: "-0.04em" }}
          >
            <span className="text-gradient-subtle">Built for</span>
            <br />
            <span className="text-gradient-indigo">internal teams.</span>
          </motion.h2>
        </div>

        {/* Copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm sm:text-base leading-relaxed max-w-2xl"
          style={{ color: "var(--text-secondary)" }}
        >
          Most of my production work was built for internal military environments, so I cannot
          publish source code, screenshots, infrastructure details, or live demos. Instead, this
          portfolio exposes the parts that matter to recruiters and engineering managers: sanitized
          architecture decisions, system design thinking, AI-assisted development workflow, security
          mindset, and public reference implementations.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CARDS.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ y: -4 }}
              transition={{
                opacity: { duration: 0.5, delay: 0.35 + i * 0.1 },
                y: { type: "spring", stiffness: 600, damping: 30 },
              }}
              className="relative group p-5 rounded-2xl border flex flex-col gap-3"
              style={{ background: "var(--bg-card)", borderColor: "rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(34,211,238,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "var(--accent-cyan-dim)" }}
              >
                <Icon className="w-4 h-4" style={{ color: "var(--accent-cyan)" }} />
              </div>
              <p className="text-sm font-bold text-slate-100 leading-snug">{title}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
