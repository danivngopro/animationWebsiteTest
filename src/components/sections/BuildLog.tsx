"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Bot, Layers, Server, Shield, Sparkles } from "lucide-react";

const BUILD_CARDS = [
  {
    icon: Layers,
    title: "Stack",
    items: [
      "Next.js 15 App Router",
      "TypeScript 5 strict mode",
      "Tailwind CSS v4",
      "Motion for React",
      "React Three Fiber / Three.js",
      "Zod + react-hook-form",
    ],
  },
  {
    icon: Bot,
    title: "AI",
    items: [
      "Ventura's AI — local Ollama integration (qwen2.5:0.5b, self-hosted)",
      "Deterministic FAQ router + intent detection",
      "Safety checks + grounded rewrite prompts",
      "Fallback behavior for safe/offline responses",
    ],
  },
  {
    icon: Server,
    title: "Deployment",
    items: [
      "Docker container",
      "Nginx reverse proxy",
      "Production Next.js build",
      "Security headers via next.config.ts",
    ],
  },
  {
    icon: Shield,
    title: "Security",
    items: [
      "CSP, X-Frame-Options, HSTS, Permissions-Policy",
      "Zod validation at all system boundaries",
      "No dangerouslySetInnerHTML",
      "No secrets committed",
      "Honeypot anti-spam on contact form",
    ],
  },
  {
    icon: Sparkles,
    title: "Planned improvements",
    items: [
      "Public OpsBoard Lite demo",
      "Analytics dashboard",
      "Contact API rate limiting (Upstash Redis)",
      "Turnstile / hCaptcha integration",
    ],
  },
] as const;

export function BuildLog() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div
      id="build-log"
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
            Build Log
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.03em" }}
          >
            <span className="text-gradient-subtle">This portfolio</span>
            <br />
            <span className="text-gradient-indigo">is a product.</span>
          </motion.h2>
        </div>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm leading-relaxed max-w-2xl"
          style={{ color: "var(--text-secondary)" }}
        >
          This portfolio is not only a resume page — it is a small production-style product built
          to demonstrate modern full-stack development, AI-assisted workflows, deployment awareness,
          and security-minded implementation.
        </motion.p>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BUILD_CARDS.map(({ icon: Icon, title, items }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ y: -3 }}
              transition={{
                opacity: { duration: 0.5, delay: 0.3 + i * 0.08 },
                y: { type: "spring", stiffness: 600, damping: 30 },
              }}
              className="p-4 rounded-2xl border flex flex-col gap-3"
              style={{ background: "var(--bg-card)", borderColor: "rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,102,241,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "var(--accent-indigo-dim)" }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: "var(--accent-indigo)" }} />
                </div>
                <p className="text-sm font-bold text-slate-100">{title}</p>
              </div>
              <ul className="flex flex-col gap-1">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ background: "var(--accent-indigo)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
