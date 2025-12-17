import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Briefcase, TrendingUp } from "lucide-react";

const courseHighlights = [
  {
    icon: BookOpen,
    title: "6 שיעורים מעמיקים בתחום האופציות",
    description: "בהנחיית קשת בן זאב, מרצה למימון ומנהל תיקים",
  },
  {
    icon: Users,
    title: "3 סדנאות LIVE",
    description: "עם סוחר אופציות מקצועי על מערכות מסחר אמיתיות",
  },
  {
    icon: TrendingUp,
    title: "ניתוח בזמן אמת",
    description: "עסקאות אמיתיות וכלים לקבלת החלטות בשוק",
  },
  {
    icon: Briefcase,
    title: "ארגז כלים מקצועי",
    description: "ניהול סיכונים, אסטרטגיות גידור וניתוח שוק",
  },
];


export function About() {
  return (
    <section className="-mt-64 pt-0 pb-16 md:mt-0 md:pt-0 md:pb-25 px-4 relative z-10 bg-background">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            על הקורס
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            השילוב המנצח בין תיאוריה אקדמית לפרקטיקה בשטח
          </p>
        </div>

        {/* Course Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {courseHighlights.map((item, index) => (
            <Card
              key={index}
              className="bg-card border border-border hover:border-accent/50 transition-colors rounded-xl"
            >
              <CardContent className="p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Price Section */}
        <div className="text-center">
          <div className="inline-block relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-teal/20 to-accent/20 rounded-2xl blur-lg" />
            <Card className="relative bg-gradient-to-br from-card via-card to-secondary border border-accent/30 rounded-2xl shadow-xl shadow-accent/5">
              <CardContent className="p-6 md:p-8">
                <p className="text-foreground/70 mb-3 text-sm font-medium tracking-wide">מחיר הקורס</p>
                <div className="flex items-baseline justify-center gap-2 mb-3">
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-amber-400 bg-clip-text text-transparent">
                    4,000
                  </span>
                  <span className="text-xl font-medium bg-gradient-to-r from-accent to-amber-400 bg-clip-text text-transparent">₪</span>
                </div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent mx-auto mb-4" />
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    הקורס מתבצע באופן מקוון
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    כולל גישה מלאה לכל ההרצאות
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
