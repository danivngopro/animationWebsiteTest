"use client";

import { motion } from "motion/react";

function HUDBracket({ corner, hueDelay = "0s" }: {
  corner: "tl" | "tr" | "bl" | "br";
  hueDelay?: string;
}) {
  const top  = corner.startsWith("t");
  const left = corner.endsWith("l");

  return (
    <motion.div
      className="absolute animate-rgb-hue-corner"
      style={{
        // Position at the very viewport edge — nothing can appear outside these marks
        [top  ? "top"    : "bottom"]: 0,
        [left ? "left"   : "right" ]: 0,
        width: 56, height: 56,
        borderTop:    top  ? "1.5px solid rgba(34,211,238,1)" : undefined,
        borderBottom: !top ? "1.5px solid rgba(34,211,238,1)" : undefined,
        borderLeft:   left ? "1.5px solid rgba(34,211,238,1)" : undefined,
        borderRight:  !left? "1.5px solid rgba(34,211,238,1)" : undefined,
        animationDelay: hueDelay,
      }}
      animate={{ opacity: [0.55, 1, 0.55] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: top ? 0 : 1 }}
    />
  );
}

export function NeonOverlay() {
  return (
    <div
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", overflow: "hidden" }}
    >
      {/* Corners sit at the absolute viewport edge — they ARE the boundary */}
      <HUDBracket corner="tl" hueDelay="0s"  />
      <HUDBracket corner="tr" hueDelay="-1s" />
      <HUDBracket corner="bl" hueDelay="-2s" />
      <HUDBracket corner="br" hueDelay="-3s" />

      {/* Top neon bar — 2.5px, aligns with the top of TL/TR corner brackets */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2.5,
        background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.6) 30%, rgba(99,102,241,0.85) 60%, rgba(34,211,238,0.6) 85%, transparent 100%)",
        boxShadow: "0 0 20px 4px rgba(34,211,238,0.28), 0 0 40px 8px rgba(99,102,241,0.18)",
      }} />
    </div>
  );
}
