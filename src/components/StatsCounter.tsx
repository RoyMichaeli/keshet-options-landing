"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";

/* ------------------------------------------------------------------ */
/*  useCountUp hook                                                    */
/* ------------------------------------------------------------------ */

function useCountUp(
  target: number,
  inView: boolean,
  duration = 1500,
): number {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut curve: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [target, duration]);

  useEffect(() => {
    if (inView) animate();
  }, [inView, animate]);

  return value;
}

/* ------------------------------------------------------------------ */
/*  Stat data                                                          */
/* ------------------------------------------------------------------ */

interface StatItem {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  format?: (n: number) => string;
}

const stats: StatItem[] = [
  { target: 6, suffix: "+", label: "שיעורי עומק" },
  { target: 3, label: "סדנאות LIVE" },
  { target: 100, suffix: "%", label: "תוכן מעשי" },
  {
    target: 4000,
    prefix: "₪",
    label: "מחיר הקורס",
    format: (n: number) => n.toLocaleString("he-IL"),
  },
];

/* ------------------------------------------------------------------ */
/*  StatCard                                                           */
/* ------------------------------------------------------------------ */

function StatCard({
  stat,
  inView,
  delay,
}: {
  stat: StatItem;
  inView: boolean;
  delay: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const count = useCountUp(
    stat.target,
    prefersReducedMotion ? true : inView,
  );

  const display = stat.format ? stat.format(count) : String(count);

  return (
    <AnimatedSection delay={delay} direction="up">
      <div className="relative group">
        {/* Subtle border glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 via-teal/10 to-accent/20 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative bg-gradient-to-br from-card via-card to-secondary border border-accent/20 rounded-xl p-6 md:p-8 text-center">
          <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-amber-400 bg-clip-text text-transparent mb-2">
            {stat.prefix}
            {display}
            {stat.suffix}
          </p>
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            {stat.label}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ------------------------------------------------------------------ */
/*  StatsCounter                                                       */
/* ------------------------------------------------------------------ */

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-16 md:py-24 px-4 bg-background" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            הקורס במספרים
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            כל מה שצריך כדי להתחיל לסחור באופציות
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              inView={inView}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
