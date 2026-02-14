import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/store/useStore";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roleplay Trainer — Formazione Interattiva",
  description:
    "Piattaforma di formazione basata su roleplay e simulazioni interattive per professionisti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} antialiased bg-[#06060a] text-slate-100 noise-bg`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
