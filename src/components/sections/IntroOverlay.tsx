"use client";

import { useEffect, useRef, useState } from "react";

export function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [exited, setExited] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Block page scroll until first scroll-down gesture
    document.documentElement.style.overflowY = "hidden";

    let exiting = false;

    const exit = () => {
      if (exiting) return;
      exiting = true;
      document.documentElement.style.overflowY = "";
      // Signal Hero (and any other listener) that the intro is done
      window.dispatchEvent(new CustomEvent("intro-exit"));
      overlay.style.transition    = "opacity 0.7s ease";
      overlay.style.opacity       = "0";
      overlay.style.pointerEvents = "none";
      setTimeout(() => setExited(true), 700);
    };

    const onWheel = (e: WheelEvent) => { if (e.deltaY > 0) exit(); };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      if (touchStartY - e.touches[0].clientY > 10) exit();
    };

    overlay.addEventListener("wheel",      onWheel,      { passive: true });
    overlay.addEventListener("touchstart", onTouchStart, { passive: true });
    overlay.addEventListener("touchmove",  onTouchMove,  { passive: true });

    return () => {
      document.documentElement.style.overflowY = "";
      overlay.removeEventListener("wheel",      onWheel);
      overlay.removeEventListener("touchstart", onTouchStart);
      overlay.removeEventListener("touchmove",  onTouchMove);
    };
  }, []);

  if (exited) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        100,
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        justifyContent:"flex-end",
        paddingBottom: "40px",
        pointerEvents: "all",
      }}
    >
      {/* Scroll indicator */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        <span style={{
          fontSize:      "0.6rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.45)",
        }}>
          Scroll to Begin
        </span>
        <div style={{
          width:        "28px",
          height:       "46px",
          border:       "2px solid rgba(255,255,255,0.18)",
          borderRadius: "14px",
          position:     "relative",
        }}>
          <div className="intro-wheel" />
        </div>
      </div>
    </div>
  );
}
