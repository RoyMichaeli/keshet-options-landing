"use client";

import { Quote, Star } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const testimonials = [
  {
    name: "יוסי כ.",
    role: "סוחר עצמאי",
    quote:
      "הקורס שינה לי את הגישה למסחר. לראשונה הבנתי באמת איך אופציות עובדות ולא רק הלכתי לפי תחושות.",
    color: "bg-amber-600",
  },
  {
    name: "מיכל ר.",
    role: "משקיעה פרטית",
    quote:
      'קשת מסביר בצורה ברורה ופשוטה גם נושאים מורכבים. הסדנאות ה-LIVE היו שווי זהב.',
    color: "bg-teal",
  },
  {
    name: "אלון ד.",
    role: "מתכנת ומשקיע",
    quote:
      "חיפשתי קורס שייתן לי כלים אמיתיים ולא רק תיאוריה. המודלים המתמטיים שלמדתי כאן שינו לי את התמונה.",
    color: "bg-indigo-500",
  },
  {
    name: "נועה ש.",
    role: "רואת חשבון",
    quote:
      "הרקע האקדמי של קשת מורגש בכל שיעור. הקורס מקצועי ברמה גבוהה מאוד.",
    color: "bg-rose-500",
  },
  {
    name: "דני ב.",
    role: "סוחר אופציות",
    quote:
      "אחרי קורסים אחרים שהיו בעיקר שיווק, סוף סוף מצאתי קורס עם תוכן אמיתי ומעמיק.",
    color: "bg-emerald-600",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-accent text-accent"
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            מה אומרים הסטודנטים
          </h2>
        </AnimatedSection>

        {/* Cards — horizontally scrollable on mobile, grid on desktop */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible scrollbar-hide">
          {testimonials.map((t, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.1}
              className="min-w-[300px] snap-center md:min-w-0"
            >
              <div className="relative h-full">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 via-teal/10 to-accent/20 rounded-xl blur-md" />

                <div className="relative bg-gradient-to-br from-card via-card to-secondary border border-accent/30 rounded-xl p-6 h-full flex flex-col">
                  {/* Quote icon & stars */}
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-8 h-8 text-accent/30" />
                    <StarRating />
                  </div>

                  {/* Quote text */}
                  <p className="text-foreground/90 text-sm md:text-base leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-4" />

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    {/* Avatar circle with initial */}
                    <div
                      className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-foreground font-semibold text-sm">
                        {t.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
