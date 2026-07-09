import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MobileSponsorStrip, SitewideSponsorRail } from "@/components/SitewideSponsors";
import { organizationJsonLd, SITE_NAME, SITE_URL, websiteJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Every AI Finder - Find, Compare & Choose the Perfect AI Tools",
    template: `%s | ${SITE_NAME}`,
  },
  description: "Curated AI tool database with editor-tested recommendations. Discover, compare, and choose the best AI tools for blogging, YouTube, coding, design, and business in under 3 minutes.",
  keywords: ["best AI tools", "free AI tools", "AI tool directory", "compare AI tools", "AI tool finder", "ChatGPT alternatives"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Every AI Finder - Find your perfect AI helper",
    description: "Curated AI tool database, updated weekly. Discover, compare, and choose the best AI tools in minutes.",
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Every AI Finder - Find your perfect AI helper",
    description: "Curated AI tool database, updated weekly. Discover, compare, and choose the best AI tools in minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      "naver-site-verification": "2e706cfc4ba73a5d5764ab90cbd1b7ce3f6b494a",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="font-sans min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
        <GoogleAnalytics />
        <LanguageProvider>
          <AuthProvider>
            <Header />
            <SitewideSponsorRail />
            <main className="flex-grow">
              {children}
              <MobileSponsorStrip position="bottom" />
            </main>
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
