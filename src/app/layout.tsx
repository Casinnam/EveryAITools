import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Every AI Tools - Find, Compare & Choose the Perfect AI Tools",
  description: "Stop wasting time searching for random AI tools. Discover, compare, and choose the best AI tools for blogging, YouTube, coding, design, and business in under 3 minutes.",
  keywords: ["best AI tools", "free AI tools", "AI tool directory", "compare AI tools", "AI tool finder", "ChatGPT alternatives"],
  openGraph: {
    title: "Every AI Tools - Find your perfect AI helper",
    description: "Discover, compare, and choose the best AI tools in minutes.",
    type: "website",
    locale: "en_US",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="font-sans min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <LanguageProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
