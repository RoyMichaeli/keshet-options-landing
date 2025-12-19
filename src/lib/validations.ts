import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().min(2, { message: "שם חייב להכיל לפחות 2 תווים" }),
  phone: z
    .string()
    .regex(/^05\d[-]?\d{7}$/, { message: "מספר טלפון לא תקין" }),
  email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
  consent: z.literal(true, { message: "יש לאשר קבלת מידע" }),
  termsConsent: z.literal(true, { message: "יש לאשר את התקנון" }),
  website: z.string().max(0).optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
