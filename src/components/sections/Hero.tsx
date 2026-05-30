"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { useGlitchText } from "@/hooks/useGlitchText";
import { personal } from "@/lib/data";

// ─── Animated neon border that traces the viewport edges ──────────────
function ViewportBorder({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Top edge */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        style={{
          originX: 0,
          position: "absolute", top: 0, left: 0, right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(34,211,238,0.4), transparent)",
        }}
      />
      {/* Bottom edge */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
        style={{
          originX: 1,
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.4), rgba(99,102,241,0.6), transparent)",
        }}
      />
    </div>
  );
}

export function Hero() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  // Gate all animations on the intro overlay completing.
  // When the page loads mid-scroll (browser scroll restoration), IntroOverlay
  // fires intro-exit synchronously in its own useEffect — before Hero's useEffect
  // can attach a listener. Mirror the same scrollY check so we don't miss it.
  const [introReady, setIntroReady] = useState(false);
  useEffect(() => {
    if (window.scrollY > window.innerHeight * 0.5) {
      setIntroReady(true);
      return;
    }
    const handler = () => setIntroReady(true);
    window.addEventListener("intro-exit", handler, { once: true });
    return () => window.removeEventListener("intro-exit", handler);
  }, []);

  const active    = introReady && inView;
  const firstName = useGlitchText("DANIEL",  active);
  const lastName  = useGlitchText("VENTURA", active);

  const scrollNext = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  const scrollContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div id="hero" className="slide-section" ref={ref} style={{ background: "transparent" }}>
      {/* Background handled by SpaceBackground (fixed canvas) */}

      {/* Deep radial glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(99,102,241,0.11) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <ViewportBorder active={active} />

      {/* ── Neon atmosphere rings ── */}
      {active && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
          {([
            { size: 180, color: "rgba(34,211,238,0.28)",  shadow: "rgba(34,211,238,0.14)",  dur: 4.5, delay: 0   },
            { size: 320, color: "rgba(99,102,241,0.18)",  shadow: "rgba(99,102,241,0.09)",  dur: 6,   delay: 1.2 },
            { size: 480, color: "rgba(167,139,250,0.12)", shadow: "rgba(167,139,250,0.06)", dur: 8,   delay: 2.4 },
          ] as const).map(({ size, color, shadow, dur, delay }) => (
            <motion.div
              key={size}
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
              style={{
                position: "absolute",
                width: size, height: size, borderRadius: "50%",
                border: `1px solid ${color}`,
                boxShadow: `0 0 24px 4px ${shadow}, inset 0 0 24px 4px ${shadow}`,
              }}
            />
          ))}
        </div>
      )}

      {/* ── Top bar ── */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-8 py-6 z-10">
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.3em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Portfolio
        </motion.span>

        {/* Status badges */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="flex flex-col items-end gap-2"
        >
          {["Available for Senior Roles", "Available for Leading Roles"].map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium"
              style={{
                borderColor: "rgba(34,211,238,0.3)",
                background: "rgba(34,211,238,0.06)",
                color: "var(--accent-cyan)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-status-blink" style={{ background: "var(--accent-cyan)" }} />
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-14 lg:px-20">

        {/* First name — top-left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="font-black leading-none tracking-tight select-none"
            style={{
              fontSize: "clamp(3rem, 13vw, 14rem)",
              color: "#f1f5f9",
              fontFamily: "var(--font-syncopate), var(--font-sans)",
              letterSpacing: "0.02em",
            }}
            aria-label="Daniel"
          >
            {firstName.split("").map((ch, i) => (
              <span
                key={i}
                className="glitch-char"
                style={{ color: ch === "░" || ch === "▒" ? "rgba(99,102,241,0.5)" : undefined }}
              >
                {ch}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Last name — offset right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="self-end sm:self-start sm:pl-[8vw]"
        >
          <div
            className="font-black leading-none tracking-tight select-none text-gradient-indigo"
            style={{
              fontSize: "clamp(3rem, 13vw, 14rem)",
              fontFamily: "var(--font-syncopate), var(--font-sans)",
              letterSpacing: "0.02em",
            }}
            aria-label="Ventura"
          >
            {lastName.split("").map((ch, i) => (
              <span key={i} className="glitch-char">
                {ch}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={active ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{
            originX: 0,
            height: 1,
            marginTop: "2rem",
            marginBottom: "1.5rem",
            background: "linear-gradient(90deg, rgba(99,102,241,0.5), rgba(34,211,238,0.3), transparent)",
          }}
        />

        {/* Subtitle row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            <p className="text-lg sm:text-xl font-medium" style={{ color: "var(--text-secondary)" }}>
              {personal.title}
            </p>
            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase mt-1" style={{ color: "var(--text-muted)" }}>
              {personal.tagline}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={scrollContact}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(99,102,241,0.45)]"
              style={{ background: "var(--accent-indigo)" }}
            >
              Get in Touch
            </button>
            <a
              href="/Daniel-Ventura-Resume.pdf"
              download="Daniel-Ventura-Resume.pdf"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/8"
              style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-xl border transition-colors hover:border-white/20 hover:bg-white/6"
              style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}
            >
              <GitHubIcon className="w-4.5 h-4.5" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-xl border transition-colors hover:border-white/20 hover:bg-white/6"
              style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}
            >
              <LinkedInIcon className="w-4.5 h-4.5" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.button
        onClick={scrollNext}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.25em] uppercase transition-colors hover:text-slate-300 z-10"
        style={{ color: "var(--text-muted)" }}
        aria-label="Next section"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.button>
    </div>
  );
}
