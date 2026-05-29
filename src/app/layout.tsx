import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { LenisProvider } from "@/components/layout/LenisProvider";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Daniel Ventura — Senior Full-Stack Developer",
    template: "%s | Daniel Ventura",
  },
  description:
    "Senior Full-Stack Developer specialising in AI-assisted engineering, scalable architecture, and technical leadership. TypeScript, React, Node.js, AWS.",
  keywords: [
    "full-stack developer",
    "senior engineer",
    "TypeScript",
    "React",
    "Node.js",
    "AI-assisted engineering",
    "software architect",
  ],
  authors: [{ name: "Daniel Ventura" }],
  creator: "Daniel Ventura",
  metadataBase: new URL("https://danielventura.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Daniel Ventura — Senior Full-Stack Developer",
    description:
      "AI-native senior full-stack engineer. Architecture, leadership, and production delivery.",
    siteName: "Daniel Ventura",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Ventura — Senior Full-Stack Developer",
    description:
      "AI-native senior full-stack engineer. Architecture, leadership, and production delivery.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(geistSans.variable, geistMono.variable, "font-sans")}
      suppressHydrationWarning
    >
      <body className="min-h-screen" style={{ background: "var(--bg-base)" }}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
