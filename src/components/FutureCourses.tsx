"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BarChart3, PieChart, Clock } from "lucide-react";

const futureCourses = [
  {
    icon: BarChart3,
    title: "ניתוח טכני מתקדם",
    description: "קריאת גרפים, אינדיקטורים, וזיהוי דפוסים",
  },
  {
    icon: PieChart,
    title: "בניית תיק השקעות",
    description: "פיזור סיכונים, אלוקציית נכסים, וניהול תיק לטווח ארוך",
  },
  {
    icon: Clock,
    title: "מסחר יומי (Day Trading)",
    description: "אסטרטגיות למסחר יומי, ניהול זמן, ומשמעת מסחרית",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function FutureCourses() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToForm = () => {
    const el = document.getElementById("lead-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            קורסים נוספים בקרוב
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-xl mx-auto"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            אנחנו עובדים על תכנים חדשים — הישארו מעודכנים
          </motion.p>
        </div>

        {/* Cards Grid */}
        <motion.div
          ref={ref}
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {futureCourses.map((course, index) => (
            <motion.div
              key={index}
              variants={prefersReducedMotion ? undefined : cardVariants}
              className="relative"
            >
              <div className="relative bg-card/60 border-2 border-dashed border-border rounded-xl p-6 h-full opacity-80 hover:opacity-95 transition-opacity duration-300">
                {/* "Coming soon" badge */}
                <span className="absolute top-4 left-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal/15 text-teal border border-teal/25">
                  בקרוב
                </span>

                {/* Icon */}
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <course.icon className="w-5 h-5 text-accent/60" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground/80 mb-2">
                  {course.title}
                </h3>
                <p className="text-muted-foreground/70 text-sm leading-relaxed">
                  {course.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={handleScrollToForm}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 transition-colors duration-200"
          >
            רוצים לשמוע ראשונים?
          </button>
        </motion.div>
      </div>
    </section>
  );
}
