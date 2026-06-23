"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";

const items = [
  "מרצה למימון באקדמיה",
  "מנהל תיקים ב-IBI",
  "ניסיון של שנים בשוק ההון",
  "6 שיעורי עומק",
  "3 סדנאות LIVE",
  "תוכן מעשי 100%",
  "ארגז כלים מקצועי",
];

function MarqueeContent() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-4 whitespace-nowrap">
          <span className="text-muted-foreground text-sm font-medium">
            {item}
          </span>
          <span className="text-accent text-lg select-none" aria-hidden="true">
            &bull;
          </span>
        </span>
      ))}
    </>
  );
}

export function Marquee() {
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  // If the user prefers reduced motion, render a static strip
  if (prefersReducedMotion) {
    return (
      <div className="w-full bg-secondary/60 border-y border-border/50 py-3 overflow-hidden">
        <div className="flex items-center justify-center gap-4 flex-wrap px-4">
          <MarqueeContent />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-secondary/60 border-y border-border/50 py-3 overflow-hidden relative">
      {/* Scrolling track */}
      <div
        className="flex items-center gap-4 animate-marquee w-max"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* First copy */}
        <MarqueeContent />
        {/* Second copy for seamless loop */}
        <span aria-hidden="true" className="flex items-center gap-4">
          <MarqueeContent />
        </span>
      </div>

      {/* Pause / Play toggle button — WCAG 2.2.2 */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-1/2 -translate-y-1/2 start-2 z-10 w-7 h-7 rounded-full bg-card/80 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors"
        aria-label={isPaused ? "הפעל גלילה" : "עצור גלילה"}
      >
        {isPaused ? (
          <Play className="w-3 h-3" />
        ) : (
          <Pause className="w-3 h-3" />
        )}
      </button>
    </div>
  );
}
