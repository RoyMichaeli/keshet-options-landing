"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById("lead-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-lg border-b border-accent/10 shadow-lg shadow-background/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-xl md:text-2xl font-bold text-accent tracking-tight">
            Keshet<span className="text-foreground/70">.finance</span>
          </span>
          <Button
            onClick={scrollToForm}
            variant="outline"
            className="hidden md:inline-flex border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
          >
            הרשמה לקורס
          </Button>
        </div>
      </header>

      {/* Floating mobile CTA */}
      <motion.div
        className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-auto md:left-6 md:w-auto z-50"
        initial={shouldReduceMotion ? false : { y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: "easeOut" }}
      >
        <Button
          onClick={scrollToForm}
          className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90 rounded-full shadow-lg shadow-accent/25 px-6 py-3 text-base font-semibold transition-transform hover:scale-105 animate-glow-pulse"
        >
          שריינו מקום עכשיו
        </Button>
      </motion.div>
    </>
  );
}
