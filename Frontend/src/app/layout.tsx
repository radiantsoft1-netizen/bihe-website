import type { Metadata } from "next";
import { Assistant, Cabin } from "next/font/google";
import { BackToHeroButton } from "@/components/ui/BackToHeroButton";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import "./globals.css";

const cabin = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["latin"],
  variable: "--font-assistant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bapuji Institute of Hi-Tech Education | BIHE",
  description:
    "Bapuji Institute of Hi-Tech Education (BIHE) — BCA & B.Com programs. AICTE approved, Davangere University affiliated.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cabin.variable} ${assistant.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        <BackToHeroButton />
      </body>
    </html>
  );
}
