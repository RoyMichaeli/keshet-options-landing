import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const suitableFor = [
  "רוצה להבין לעומק",
  "סוחר מתחיל",
  "משקיע שרוצה להרחיב ידע",
  "מוכן להשקיע זמן",
];

const notSuitableFor = [
  "מחפש כסף קל",
  "לא מוכן להקדיש זמן",
  "מצפה לתוצאות ללא תרגול",
];

export function Audience() {
  return (
    <section className="py-16 md:py-24 px-4 bg-primary/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
          למי הקורס מתאים?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Suitable for */}
          <Card className="bg-card border border-success rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl text-success flex items-center gap-2">
                <Check className="w-6 h-6" />
                מתאים
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {suitableFor.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Not suitable for */}
          <Card className="bg-card border border-destructive rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl text-destructive flex items-center gap-2">
                <X className="w-6 h-6" />
                פחות מתאים
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {notSuitableFor.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <X className="w-5 h-5 text-destructive flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
