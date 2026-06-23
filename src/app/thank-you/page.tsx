"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function ThankYouPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-success/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-2xl text-center relative z-10">
        {/* Success icon */}
        <motion.div
          initial={shouldReduceMotion ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="mb-6"
        >
          <CheckCircle2 className="w-16 h-16 text-success mx-auto" />
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative w-full max-w-sm mx-auto mb-8 rounded-2xl overflow-hidden shadow-xl shadow-success/10"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Image
            src="/images/keshet-green.webp"
            alt="קשת בן זאב — הפרטים התקבלו בהצלחה"
            width={400}
            height={500}
            className="w-full h-auto"
            priority
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-amber-400 bg-clip-text text-transparent">
            תודה רבה!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-2">
            הפרטים שלך התקבלו בהצלחה.
          </p>
          <p className="text-muted-foreground/70 mb-8">
            ניצור איתך קשר בהקדם האפשרי — שיהיה לך המשך יום ירוק!
          </p>

          <Link href="/">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-lg px-8 py-6 font-semibold">
              חזרה לעמוד הראשי
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
