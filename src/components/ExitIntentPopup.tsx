"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const SESSION_KEY = "keshet_exit_popup_shown";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const scrollToForm = useCallback(() => {
    close();
    const form = document.getElementById("lead-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  }, [close]);

  /* -------------------------------------------------------------- */
  /*  Desktop detection via pointer: fine                             */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsDesktop(mq.matches);

    function handleChange(e: MediaQueryListEvent) {
      setIsDesktop(e.matches);
    }

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  /* -------------------------------------------------------------- */
  /*  Exit intent listener                                           */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    if (!isDesktop) return;

    function handleMouseMove(e: MouseEvent) {
      // Only trigger when mouse is near the top and moving upward
      if (e.clientY < 10 && e.movementY < 0) {
        // Only show once per session
        if (sessionStorage.getItem(SESSION_KEY)) return;

        sessionStorage.setItem(SESSION_KEY, "true");
        setIsOpen(true);
      }
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop]);

  /* -------------------------------------------------------------- */
  /*  Close on Escape key                                            */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  /* -------------------------------------------------------------- */
  /*  Animation variants                                             */
  /* -------------------------------------------------------------- */
  const backdropVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      };

  const cardVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.3, ease: "easeOut" as const },
        },
        exit: {
          opacity: 0,
          scale: 0.95,
          transition: { duration: 0.2, ease: "easeIn" as const },
        },
      };

  // Never render on mobile
  if (!isDesktop) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Card */}
          <motion.div
            className="relative w-full max-w-md"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="הצעה מיוחדת לפני שעוזבים"
          >
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/25 via-teal/15 to-accent/25 rounded-2xl blur-lg" />

            <div className="relative bg-gradient-to-br from-card via-card to-secondary border border-accent/30 rounded-2xl shadow-2xl shadow-accent/10 p-8 md:p-10">
              {/* Close button */}
              <button
                onClick={close}
                className="absolute top-4 left-4 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="סגירה"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  ...רגע לפני שעוזבים
                </h3>

                <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent mx-auto mb-5" />

                <p className="text-muted-foreground mb-3 leading-relaxed">
                  השאירו פרטים וקבלו גישה לשיעור היכרות
                  <span className="font-semibold text-foreground"> בחינם</span>
                  , ישירות למייל.
                </p>

                <p className="text-sm text-muted-foreground/80 mb-8">
                  ללא התחייבות. ניתן לבטל בכל עת.
                </p>

                {/* CTA Button */}
                <button
                  onClick={scrollToForm}
                  className="w-full bg-accent text-accent-foreground font-semibold rounded-lg py-3.5 text-lg hover:bg-accent/90 transition-colors animate-glow-pulse"
                >
                  לשיעור חינמי
                </button>

                <button
                  onClick={close}
                  className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  לא תודה, אמשיך לגלוש
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
