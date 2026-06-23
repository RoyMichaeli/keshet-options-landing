import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-background">
      <div className="container mx-auto max-w-2xl text-center">
        {/* Thank You Image */}
        <div className="relative w-full max-w-md mx-auto mb-8 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/images/thank_page.png"
            alt="תודה על פנייתך"
            width={500}
            height={400}
            className="w-full h-auto scale-[1.02]"
            priority
          />
        </div>

        {/* Thank You Message */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-amber-400 bg-clip-text text-transparent">
          תודה רבה!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          הפרטים שלך התקבלו בהצלחה.
          <br />
          ניצור איתך קשר בהקדם האפשרי.
        </p>

        {/* Back to Home Button */}
        <Link href="/">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-lg px-8 py-6">
            חזרה לעמוד הראשי
          </Button>
        </Link>
      </div>
    </main>
  );
}
