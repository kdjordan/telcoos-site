import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://telcoos.io"),
  title: {
    default: "TelcoOS - Unified Telecom Operations",
    template: "%s | TelcoOS",
  },
  description:
    "One App. Every Carrier. Total Control. The AI-powered desktop application that unifies telecom carrier operations into a single intelligent interface.",
  keywords: [
    "telecom",
    "carrier management",
    "rate decks",
    "VoIP",
    "operations",
    "AI",
    "Claude",
    "telecom software",
    "carrier operations",
    "rate analysis",
    "deal pipeline",
    "telecom AI",
  ],
  authors: [{ name: "TelcoOS" }],
  creator: "TelcoOS",
  publisher: "TelcoOS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://telcoos.io",
    siteName: "TelcoOS",
    title: "TelcoOS - Unified Telecom Operations",
    description:
      "One App. Every Carrier. Total Control. The AI-powered desktop application that unifies telecom carrier operations into a single intelligent interface.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TelcoOS - One App. Every Carrier. Total Control.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TelcoOS - Unified Telecom Operations",
    description:
      "One App. Every Carrier. Total Control. AI-powered desktop app for unified telecom operations.",
    creator: "@telcoos",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://telcoos.io",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0b] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
