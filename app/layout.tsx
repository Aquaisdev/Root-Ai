import type { Metadata } from "next";
import "./globals.css";
import { XPProvider } from "@/context/XPContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ROOT AI — Heritage GPT",
  description:
    "Discover the stories that built us. An AI-powered interactive guide to India's heritage — chat, missions, comics and maps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-sandstone font-body antialiased">
        <XPProvider>
          <LanguageProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
          </LanguageProvider>
        </XPProvider>
      </body>
    </html>
  );
}
