import type { Metadata, Viewport } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/DataProvider";
import { AuthProvider } from "@/hooks/useAuth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mindwell - Your Mental Wellness Companion",
  description: "A comprehensive mental health platform with therapy, CBT tools, mood tracking, and crisis support.",
  keywords: ["mental health", "therapy", "CBT", "wellness", "mindfulness", "crisis support"],
  authors: [{ name: "Mindwell Team" }],
  openGraph: {
    title: "Mindwell - Your Mental Wellness Companion",
    description: "A comprehensive mental health platform with therapy, CBT tools, mood tracking, and crisis support.",
    type: "website",
    locale: "en_US",
    siteName: "Mindwell",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindwell - Your Mental Wellness Companion",
    description: "A comprehensive mental health platform with therapy, CBT tools, mood tracking, and crisis support.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${dmSerif.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}