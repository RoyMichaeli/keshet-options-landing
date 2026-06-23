"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Award, GraduationCap, TrendingUp } from "lucide-react";

const credentials = [
  { icon: Award, label: "ניסיון בניהול תיקים ב-IBI" },
  { icon: GraduationCap, label: "מרצה למימון באקדמיה" },
  { icon: TrendingUp, label: "מומחה באופציות ונגזרים" },
];

export function Instructor() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            מי מלמד אתכם?
          </h2>
        </AnimatedSection>

        {/* Two-column layout: image right (RTL), text left */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Image column — appears first in RTL (right side) */}
          <AnimatedSection
            direction="right"
            className="flex justify-center"
          >
            <div className="relative">
              {/* Gold border glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/30 via-accent/10 to-teal/20 rounded-2xl blur-lg" />
              <div className="relative rounded-2xl overflow-hidden border-2 border-accent/20">
                <Image
                  src="/images/keshet-green.webp"
                  alt="קשת בן זאב — מרצה למימון ומנהל תיקים"
                  width={440}
                  height={520}
                  className="object-cover w-full max-w-[400px]"
                  sizes="(max-width: 768px) 90vw, 440px"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Text column */}
          <AnimatedSection direction="left" delay={0.15}>
            <div className="space-y-6">
              {/* Name & role */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  קשת בן זאב
                </h3>
                <p className="text-accent font-medium text-lg">
                  מרצה למימון | מנהל תיקים
                </p>
              </div>

              {/* Decorative divider */}
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-accent/50 to-accent/30" />

              {/* Bio */}
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                קשת בן זאב הוא מרצה למימון ומנהל תיקים עם ניסיון רב בשוק ההון
                הישראלי. הקורס שלו משלב תיאוריה אקדמית מעמיקה עם עבודה מעשית על
                מערכות מסחר אמיתיות — כדי שתצאו עם ידע שאפשר ליישם מיד.
              </p>

              {/* Credential badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                {credentials.map((cred, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-teal/10 text-teal border border-teal/20"
                  >
                    <cred.icon className="w-4 h-4 flex-shrink-0" />
                    {cred.label}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
