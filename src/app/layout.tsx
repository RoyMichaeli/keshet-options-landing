import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://keshet.finance"),
  title: "Keshet Finance | קורס מעשי למסחר באופציות",
  description:
    "קורס מעשי למסחר באופציות בהנחיית קשת בן זאב — מרצה למימון ומנהל תיקים. 6 שיעורי עומק, 3 סדנאות LIVE, וארגז כלים מקצועי לשוק ההון.",
  keywords: [
    "קורס אופציות",
    "מסחר באופציות",
    "שוק ההון",
    "קשת בן זאב",
    "קורס פיננסי",
    "מסחר בשוק ההון",
    "ניהול תיקים",
    "אסטרטגיות גידור",
  ],
  authors: [{ name: "קשת בן זאב" }],
  creator: "Keshet Finance",
  openGraph: {
    title: "Keshet Finance | קורס מעשי למסחר באופציות",
    description:
      "השילוב המנצח בין תיאוריה אקדמית לפרקטיקה בשטח. 6 שיעורי עומק, 3 סדנאות LIVE.",
    type: "website",
    locale: "he_IL",
    siteName: "Keshet Finance",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Keshet Finance - קורס מעשי למסחר באופציות",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keshet Finance | קורס מעשי למסחר באופציות",
    description: "השילוב המנצח בין תיאוריה אקדמית לפרקטיקה בשטח",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A1628",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="font-heebo antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
