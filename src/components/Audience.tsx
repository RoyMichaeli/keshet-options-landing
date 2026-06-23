"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const suitableFor = [
  "רוצה להבין לעומק את עולם האופציות",
  "סוחר מתחיל שרוצה בסיס חזק",
  "משקיע שרוצה להרחיב ידע ולגוון אסטרטגיות",
  "מוכן להשקיע זמן ואנרגיה בלמידה",
];

const notSuitableFor = [
  "מחפש כסף קל וקיצורי דרך",
  "לא מוכן להקדיש זמן לתרגול",
  "מצפה לתוצאות מובטחות ללא מאמץ",
];

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function Audience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          למי הקורס מתאים?
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Suitable for */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card border border-success/30 rounded-xl h-full hover:border-success/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl text-success flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  מתאים
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.ul
                  className="space-y-3"
                  variants={shouldReduceMotion ? {} : listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {suitableFor.map((item, index) => (
                    <motion.li
                      key={index}
                      variants={shouldReduceMotion ? {} : itemVariants}
                      className="flex items-start gap-3 text-foreground"
                    >
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Not suitable for */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Card className="bg-card border border-destructive/30 rounded-xl h-full hover:border-destructive/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl text-destructive flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="w-5 h-5" />
                  </div>
                  פחות מתאים
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.ul
                  className="space-y-3"
                  variants={shouldReduceMotion ? {} : listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {notSuitableFor.map((item, index) => (
                    <motion.li
                      key={index}
                      variants={shouldReduceMotion ? {} : itemVariants}
                      className="flex items-start gap-3 text-foreground"
                    >
                      <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
