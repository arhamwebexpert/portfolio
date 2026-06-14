import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Arham Mehmood | Full-Stack Developer",
  description:
    "Portfolio of Arham Mehmood — Full-Stack Developer specializing in .NET, React, Python AI/ML, and cloud-native systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <ScrollProgress />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
