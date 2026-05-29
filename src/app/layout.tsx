import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
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

export const viewport: Viewport = {
  themeColor: "#07070f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Daniel Ventura — Senior Full-Stack Developer",
    template: "%s | Daniel Ventura",
  },
  description:
    "Senior Full-Stack Developer specialising in AI-assisted engineering, scalable architecture, and technical leadership. TypeScript · React · Node.js · AWS.",
  keywords: [
    "full-stack developer",
    "senior engineer",
    "TypeScript",
    "React",
    "Node.js",
    "AI-assisted engineering",
    "software architect",
    "Israel",
  ],
  authors: [{ name: "Daniel Ventura" }],
  creator: "Daniel Ventura",
  metadataBase: new URL("https://portfolio.emperordanivn.com"),
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
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning prevents React from complaining about
    // server/client HTML attribute mismatches from browser extensions.
    <html
      lang="en"
      className={cn(geistSans.variable, geistMono.variable, "font-sans")}
      suppressHydrationWarning
    >
      <body>
        {children}
      </body>
    </html>
  );
}
