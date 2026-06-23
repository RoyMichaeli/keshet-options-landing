"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";

const faqs = [
  {
    question: "למי הקורס מתאים?",
    answer:
      "הקורס מתאים למתחילים ולמשקיעים בעלי ניסיון בסיסי שרוצים להבין לעומק את עולם האופציות. לא נדרש ידע מוקדם במתמטיקה או בפיננסים.",
  },
  {
    question: "כמה זמן נמשך הקורס?",
    answer:
      "הקורס כולל 6 שיעורי עומק מוקלטים בתוספת 3 סדנאות LIVE. קצב הלמידה הוא אישי — התכנים זמינים 24/7.",
  },
  {
    question: "האם יש תעודה בסיום?",
    answer:
      "בשלב זה הקורס מתמקד בהקניית ידע מעשי ולא כולל הסמכה רשמית. הערך האמיתי הוא בכלים שתקבלו.",
  },
  {
    question: "מה ההבדל בין הקורס הזה לקורסים אחרים?",
    answer:
      "הקורס משלב תיאוריה אקדמית מעמיקה (מודלים מתמטיים, Greeks) עם עבודה מעשית על מערכות מסחר אמיתיות — לא רק מצגות תיאורטיות.",
  },
  {
    question: "האם הקורס מתאים למי שכבר סוחר?",
    answer:
      "בהחלט. סוחרים פעילים ימצאו ערך רב באסטרטגיות המתקדמות, ניהול הסיכונים, ומודלי התמחור.",
  },
  {
    question: "איך נרשמים?",
    answer:
      "השאירו פרטים בטופס למטה ונחזור אליכם בהקדם עם כל המידע.",
  },
  {
    question: "מה מדיניות הביטולים?",
    answer:
      "ניתן לבטל לפני תחילת הקורס. לאחר השתתפות בשיעור הראשון לא יינתן החזר כספי.",
  },
  {
    question: "האם יש תמיכה לאחר הקורס?",
    answer:
      "כן, בוגרי הקורס מקבלים גישה לקבוצת תמיכה ולעדכונים שוטפים.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            שאלות נפוצות
          </h2>
        </AnimatedSection>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <AnimatedSection key={index} delay={index * 0.05}>
                <div
                  className={`rounded-xl border transition-colors duration-300 ${
                    isOpen
                      ? "bg-secondary/50 border-accent/30 border-r-2 border-r-accent"
                      : "bg-card/50 border-border hover:border-accent/20"
                  }`}
                >
                  {/* Question header */}
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-right"
                    aria-expanded={isOpen}
                  >
                    <span className="text-foreground font-medium text-base md:text-lg">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-accent" />
                    </motion.div>
                  </button>

                  {/* Answer body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0">
                          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
