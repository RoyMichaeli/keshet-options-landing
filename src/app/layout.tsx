import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  title: "Keshet.finance | קורס מסחר באופציות",
  description: "קורס מעשי וממוקד למסחר באופציות בשוק ההון",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-heebo min-h-screen bg-background text-foreground antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
