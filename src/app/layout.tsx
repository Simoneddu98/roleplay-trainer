import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/store/useStore";

const geistSans = Geist({
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
      <body className={`${geistSans.variable} antialiased bg-slate-50 text-slate-900`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
