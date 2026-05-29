"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { personal } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Dynamic import prevents SSR for the WebGL canvas
const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

const EASE_OUT_CURVE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const stagger = {
  container: {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT_CURVE } },
  },
};

export function Hero() {
  const reduced = useReducedMotion();

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* R3F particle field background */}
      <HeroCanvas />

      {/* Radial glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          variants={reduced ? undefined : stagger.container}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow */}
          <motion.div
            variants={reduced ? undefined : stagger.item}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase"
            style={{
              borderColor: "rgba(99,102,241,0.35)",
              background: "rgba(99,102,241,0.08)",
              color: "var(--accent-cyan)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--accent-cyan)" }}
            />
            Available for Senior Roles
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={reduced ? undefined : stagger.item}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-none"
          >
            <span className="text-gradient-subtle">{personal.name.split(" ")[0]} </span>
            <span className="text-gradient-indigo">{personal.name.split(" ")[1]}</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={reduced ? undefined : stagger.item}
            className="mt-5 text-lg sm:text-xl lg:text-2xl font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            {personal.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={reduced ? undefined : stagger.item}
            className="mt-3 text-sm sm:text-base tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            {personal.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={reduced ? undefined : stagger.item}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={`mailto:${personal.email}`}
              className="group px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
              style={{ background: "var(--accent-indigo)" }}
            >
              Get in Touch
            </a>
            <button
              onClick={scrollToAbout}
              className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 border"
              style={{
                color: "var(--text-secondary)",
                borderColor: "var(--border-subtle)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              View My Work
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={reduced ? undefined : stagger.item}
            className="mt-8 flex items-center justify-center gap-5"
          >
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-slate-100"
              style={{ color: "var(--text-muted)" }}
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-slate-100"
              style={{ color: "var(--text-muted)" }}
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs tracking-widest uppercase transition-colors hover:text-slate-300"
        style={{ color: "var(--text-muted)" }}
        aria-label="Scroll to about section"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--bg-base))",
        }}
        aria-hidden
      />
    </section>
  );
}
