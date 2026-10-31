import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Anu Sah // Creative Developer & Tech Explorer",
  description:
    "Personal digital identity and futuristic developer portfolio of Anu Sah. Exploring modern web technologies, creative frontend experiences, and the future of digital interfaces.",
  keywords: [
    "Anu Sah",
    "Creative Developer",
    "Frontend Engineer",
    "HTML",
    "CSS",
    "JavaScript",
    "Tailwind CSS",
    "Next.js",
    "Three.js",
    "Cyberpunk Portfolio",
    "IT Enthusiast",
  ],
  authors: [{ name: "Anu Sah", url: "https://github.com/Anusah99" }],
  creator: "Anu Sah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/Anusah99",
    title: "Anu Sah // Creative Developer & Tech Explorer",
    description:
      "Exploring technology. Creating digital experiences. An immersive futuristic developer portfolio.",
    siteName: "Anu Sah Digital Identity",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anu Sah // Creative Developer",
    description: "Exploring technology. Creating digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-[#050505] text-[#f0f6fc] min-h-screen antialiased selection:bg-[#00f5ff] selection:text-[#050505]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
