"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Briefcase, TrendingUp } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const courseHighlights = [
  {
    icon: BookOpen,
    title: "6 שיעורים מעמיקים",
    description: "שיעורי עומק בהנחיית קשת בן זאב, מרצה למימון ומנהל תיקים",
  },
  {
    icon: Users,
    title: "3 סדנאות LIVE",
    description: "עם סוחר אופציות מקצועי על מערכות מסחר אמיתיות",
  },
  {
    icon: TrendingUp,
    title: "ניתוח בזמן אמת",
    description: "עסקאות אמיתיות וכלים לקבלת החלטות חכמות בשוק",
  },
  {
    icon: Briefcase,
    title: "ארגז כלים מקצועי",
    description: "ניהול סיכונים, אסטרטגיות גידור, וניתוח שוק מתקדם",
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

export function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="pt-8 pb-16 md:pt-16 md:pb-20 px-4 relative z-10 bg-background">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            על הקורס
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            השילוב המנצח בין תיאוריה אקדמית לפרקטיקה בשטח
          </p>
        </motion.div>

        {/* Course Highlights Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          variants={shouldReduceMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {courseHighlights.map((item, index) => (
            <motion.div
              key={index}
              variants={shouldReduceMotion ? {} : cardVariants}
              className="relative group"
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 via-teal/20 to-accent/20 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="relative bg-gradient-to-br from-card via-card to-secondary border border-accent/20 rounded-xl shadow-lg shadow-accent/5 h-full transition-colors group-hover:border-accent/40">
                <CardContent className="p-6 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
