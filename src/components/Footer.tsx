import { Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 bg-[#050A12] border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-right">
            <span className="text-xl font-bold text-accent">
              Keshet<span className="text-foreground/70">.finance</span>
            </span>
            <p className="text-sm text-muted-foreground mt-2">
              קורסים מקצועיים בשוק ההון
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
            <a
              href="mailto:info@keshet.finance"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@keshet.finance
            </a>
            <span className="hidden sm:block text-border">|</span>
            <a
              href="tel:+972544919977"
              dir="ltr"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              054-491-9977
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/60">
          <p>
            {currentYear} &copy; Keshet Finance — כל הזכויות שמורות
          </p>
          <p className="max-w-md text-center md:text-left leading-relaxed">
            המידע באתר אינו מהווה ייעוץ השקעות או המלצה לפעולה בניירות ערך.
            כל פעולה פיננסית הינה באחריות המשתמש בלבד.
          </p>
        </div>
      </div>
    </footer>
  );
}
