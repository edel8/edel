import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/DataProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";

export const metadata: Metadata = {
  title: "Edel - مساحة آمنة لفهم ذاتك | Your Mental Wellness Companion",
  description: "منصة عربية للصحة النفسية - أدوات علاجية، تتبع مزاج، تمارين تنفس، ومجتمع داعم. A comprehensive mental health platform with therapy tools, mood tracking, and crisis support.",
  keywords: ["صحة نفسية", "mental health", "علاج", "therapy", "CBT", "wellness", "mindfulness", "اكتئاب", "قلق", "إدمان"],
  authors: [{ name: "عادل الخالدي - Adel Al-Khaldi" }],
  openGraph: {
    title: "Edel - مساحة آمنة لفهم ذاتك",
    description: "بنيت هذه المنصة بجهد شخصي وتعب حقيقي بهدف مساعدة الناس. كل جزء يعكس الالتزام بالجودة.",
    type: "website",
    locale: "ar_SA",
    siteName: "Edel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edel - مساحة آمنة لفهم ذاتك",
    description: "Mental wellness platform crafted with dedication by Adel Al-Khaldi",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFCF5" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <Providers>
          <AuthProvider>
            <SiteHeader />
            <main className="relative z-10">
              {children}
            </main>
            <SiteFooter />
            <ThemeSwitcher />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
