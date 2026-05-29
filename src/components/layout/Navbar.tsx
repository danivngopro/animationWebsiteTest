"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, personal } from "@/lib/data";
import { cn } from "@/lib/utils";

// Floating glassmorphism navbar.
// Inspired by 21st.dev floating-nav patterns — transparent on top, blurred on scroll.
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "py-3"
            : "py-5"
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-6xl px-6 flex items-center justify-between rounded-2xl transition-all duration-300",
            scrolled
              ? "backdrop-blur-xl border border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "backdrop-blur-none border-transparent"
          )}
          style={{
            background: scrolled
              ? "rgba(7, 7, 15, 0.8)"
              : "transparent",
            padding: scrolled ? "0.75rem 1.5rem" : "0",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-bold tracking-tight text-slate-100 hover:text-white transition-colors"
          >
            {personal.name.split(" ")[0]}{" "}
            <span style={{ color: "var(--accent-indigo)" }}>
              {personal.name.split(" ")[1]}
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                {link.label}
              </button>
            ))}
            <a
              href={`mailto:${personal.email}`}
              className="ml-3 px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                background: "var(--accent-indigo)",
                color: "#fff",
              }}
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/8 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(13, 13, 26, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <nav className="flex flex-col p-4 gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 text-sm font-medium rounded-xl transition-colors duration-200 hover:bg-white/6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={`mailto:${personal.email}`}
                className="mt-2 px-4 py-3 text-sm font-semibold text-center rounded-xl transition-colors duration-200"
                style={{
                  background: "var(--accent-indigo)",
                  color: "#fff",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
