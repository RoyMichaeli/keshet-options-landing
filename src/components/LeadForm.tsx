"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { leadFormSchema, type LeadFormData } from "@/lib/validations";

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
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
      website: "",
    },
  });

  const consentValue = watch("consent");

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        description: error instanceof Error ? error.message : "נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto max-w-lg">
        <div className="relative">
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
            </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot field - hidden from users */}
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
                <Label htmlFor="name" className="text-foreground">
                  שם מלא
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="הזינו את שמכם המלא"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  טלפון
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="050-0000000"
                  dir="ltr"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground text-left"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  אימייל
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  dir="ltr"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground text-left"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={consentValue === true}
                  onCheckedChange={(checked) => {
                    setValue("consent", checked === true ? true : undefined as unknown as true);
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
                <p className="text-sm text-destructive">{errors.consent.message}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-lg py-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    שולח...
                  </>
                ) : (
                  "שליחה"
                )}
              </Button>
            </form>
          </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
