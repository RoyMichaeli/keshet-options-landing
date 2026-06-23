"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldCheck, Clock, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { leadFormSchema, type LeadFormData } from "@/lib/validations";

const trustSignals = [
  { icon: ShieldCheck, text: "מאובטח ופרטי" },
  { icon: Clock, text: "נחזור תוך 24 שעות" },
  { icon: Users, text: "הצטרפו לבוגרי הקורס" },
];

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      consent: undefined,
      termsConsent: undefined,
      website: "",
    },
  });

  const consentValue = watch("consent");
  const termsConsentValue = watch("termsConsent");

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        router.push("/thank-you");
      } else {
        throw new Error(result.error || "שגיאה בשליחת הטופס");
      }
    } catch (error) {
      toast({
        title: "שגיאה בשליחה",
        description:
          error instanceof Error ? error.message : "נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-lg">
        <motion.div
          className="relative"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-teal/20 to-accent/20 rounded-2xl blur-lg" />
          <Card className="relative bg-gradient-to-br from-card via-card to-secondary border border-accent/30 rounded-2xl shadow-xl shadow-accent/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-accent to-amber-400 bg-clip-text text-transparent">
                שריון מקום
              </CardTitle>
              <p className="text-center text-muted-foreground mt-2">
                השאירו פרטים ונחזור אליכם בהקדם
              </p>

              {/* Trust signals */}
              <div className="flex justify-center gap-4 mt-4 flex-wrap">
                {trustSignals.map((signal, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground/80"
                  >
                    <signal.icon className="w-3.5 h-3.5 text-accent/70" />
                    <span>{signal.text}</span>
                  </div>
                ))}
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <Input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("website")}
                  />
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground text-sm">
                    שם מלא
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="הזינו את שמכם המלא"
                    className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-accent/50 transition-colors"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground text-sm">
                    טלפון
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="050-0000000"
                    dir="ltr"
                    className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/50 text-left focus:border-accent/50 transition-colors"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground text-sm">
                    אימייל
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    dir="ltr"
                    className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground/50 text-left focus:border-accent/50 transition-colors"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={consentValue === true}
                    onCheckedChange={(checked) => {
                      setValue(
                        "consent",
                        checked === true
                          ? true
                          : (undefined as unknown as true)
                      );
                    }}
                    className="mt-1 border-accent/50 bg-card data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                  />
                  <Label
                    htmlFor="consent"
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    אני מאשר/ת קבלת מידע על הקורס ושירותים נוספים
                  </Label>
                </div>
                {errors.consent && (
                  <p className="text-sm text-destructive">
                    {errors.consent.message}
                  </p>
                )}

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="termsConsent"
                    checked={termsConsentValue === true}
                    onCheckedChange={(checked) => {
                      setValue(
                        "termsConsent",
                        checked === true
                          ? true
                          : (undefined as unknown as true)
                      );
                    }}
                    className="mt-1 border-accent/50 bg-card data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                  />
                  <Label
                    htmlFor="termsConsent"
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    אני מאשר/ת שקראתי היטב את{" "}
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="text-accent hover:underline font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          התקנון
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[80vh] overflow-y-auto bg-card border-accent/30">
                        <DialogHeader>
                          <DialogTitle className="text-xl text-accent text-center">
                            תקנון ותנאי השתתפות בקורס
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed pr-2">
                          <p>
                            1. הקורס נועד למטרות לימוד והעשרה בלבד. אין לראות
                            בתכניו המלצה, ייעוץ או חוות דעת מקצועית מכל סוג
                            שהוא.
                          </p>
                          <p>
                            2. המשתתף מודע לכך שכל פעולה פיננסית הינה באחריותו
                            הבלעדית.
                          </p>
                          <p>
                            3. חל איסור מוחלט לצלם, להקליט, להסריט, לשכפל,
                            להפיץ או לעשות כל שימוש בתכני הקורס, לרבות שיעורי
                            זום מוקלטים ושאינם מוקלטים, ללא אישור בכתב ממפעיל
                            הקורס.
                          </p>
                          <p>
                            4. זכויות היוצרים בתכני הקורס שמורות במלואן למפעיל
                            הקורס.
                          </p>
                          <p>
                            5. לאחר השתתפות בשיעור הראשון, לא יינתן החזר כספי
                            מכל סיבה שהיא.
                          </p>
                          <p>
                            6. ההשתתפות בקורס מהווה הסכמה מלאה לתנאים אלו.
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {" "}והסכמתי לתנאים
                  </Label>
                </div>
                {errors.termsConsent && (
                  <p className="text-sm text-destructive">
                    {errors.termsConsent.message}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-lg py-6 font-semibold transition-all hover:shadow-lg hover:shadow-accent/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      שולח...
                    </>
                  ) : (
                    "שריינו לי מקום!"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Price reminder below form */}
        <motion.div
          className="mt-6 text-center"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground/60">
            מחיר הקורס:{" "}
            <span className="text-accent font-semibold">₪4,000</span>
            {" "}•{" "}
            <span>אפשרות לתשלומים</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
