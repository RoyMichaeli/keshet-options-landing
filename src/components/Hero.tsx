"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-background overflow-hidden relative">
      {/* Mobile Image */}
      <div className="flex md:hidden">
        <motion.div
          className="relative w-full aspect-[16/9]"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/images/hero-mobile.webp"
            alt="קורס מעשי למסחר באופציות — קשת בן זאב"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          {/* Subtle bottom blend into next section */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent" />
        </motion.div>
      </div>

      {/* Desktop Image */}
      <div className="hidden md:flex justify-center bg-background">
        <motion.div
          className="relative w-full max-w-[1400px] aspect-[16/9]"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/images/hero-desktop.webp"
            alt="קורס מעשי למסחר באופציות — קשת בן זאב, מרצה למימון ומנהל תיקים"
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover"
          />
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-xs text-muted-foreground/60 tracking-widest">גלול למטה</span>
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5"
          aria-hidden="true"
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-accent/60"
            animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
