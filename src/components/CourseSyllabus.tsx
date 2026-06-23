"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Zap } from "lucide-react";

const modules = [
  {
    number: 1,
    title: "מבוא לעולם האופציות",
    description: "מושגי יסוד, מבנה השוק, וסוגי האופציות הנפוצות",
  },
  {
    number: 2,
    title: "תמחור אופציות",
    description: "מודלים מתמטיים, Greeks, וניתוח רגישות",
  },
  {
    number: 3,
    title: "אסטרטגיות מסחר בסיסיות",
    description: "קניית Call/Put, כתיבת אופציות, ואסטרטגיות כיווניות",
  },
  {
    number: 4,
    title: "אסטרטגיות מתקדמות",
    description: "Spreads, Straddles, Iron Condor, וניהול תנודתיות",
  },
  {
    number: 5,
    title: "ניהול סיכונים",
    description: "גידור תיקים, Position Sizing, ומודלי סיכון-תשואה",
  },
  {
    number: 6,
    title: "סדנה מעשית",
    description: "עבודה על מערכות מסחר אמיתיות עם עסקאות בזמן אמת",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function CourseSyllabus() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-24 px-4 bg-primary/30">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            מה תלמדו בקורס
          </motion.h2>
        </div>

        {/* Timeline */}
        <motion.div
          ref={ref}
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Vertical timeline line — right side for RTL */}
          <div className="absolute right-5 md:right-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/30 to-transparent" />

          <div className="space-y-6 md:space-y-8">
            {modules.map((mod) => (
              <motion.div
                key={mod.number}
                variants={prefersReducedMotion ? undefined : itemVariants}
                className="relative flex gap-4 md:gap-6 items-start"
              >
                {/* Numbered circle on timeline */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border-2 border-accent flex items-center justify-center shadow-lg shadow-accent/10">
                  <span className="text-accent font-bold text-sm md:text-base">
                    {mod.number}
                  </span>
                </div>

                {/* Module card */}
                <div className="flex-1 bg-card border border-border rounded-xl p-4 md:p-5 shadow-sm hover:border-accent/30 transition-colors duration-300">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1.5">
                    {mod.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* LIVE workshops badge */}
          <motion.div
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="relative flex gap-4 md:gap-6 items-start mt-8"
          >
            {/* Circle on timeline */}
            <div className="relative z-10 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal/15 border-2 border-teal flex items-center justify-center shadow-lg shadow-teal/10">
              <Zap className="w-5 h-5 text-teal" />
            </div>

            {/* Badge card */}
            <div className="flex-1 bg-gradient-to-l from-teal/10 via-card to-card border border-teal/30 rounded-xl p-4 md:p-5 shadow-sm">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold bg-teal/15 text-teal border border-teal/25">
                  LIVE
                </span>
                <h3 className="text-lg md:text-xl font-semibold text-foreground">
                  3 סדנאות LIVE
                </h3>
              </div>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-1.5">
                עם סוחר אופציות מקצועי על מערכות מסחר אמיתיות — תרגול מעשי
                בזמן אמת
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
