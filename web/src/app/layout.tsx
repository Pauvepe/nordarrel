import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CookieBanner from "@/components/shared/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "NordArrel | Diagnostico capilar masculino",
  description: "Clinica de salud capilar masculina con diagnostico inicial, tratamientos personalizados y seguimiento presencial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[var(--bg)] font-sans text-[var(--text)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton numero="34637682568" mensaje="Hola, tengo una duda sobre NordArrel." />
        <CookieBanner />
      </body>
    </html>
  );
}
