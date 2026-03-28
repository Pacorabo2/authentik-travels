// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Importation de nos composants globaux
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton"; // <-- 1. Nouvel import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentik Travels | Voyages Immersifs et Sur-Mesure",
  description:
    "Agence de voyage spécialisée dans les séjours de groupe (danse) et la création d'itinéraires sur mesure en Amérique Latine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.className} min-h-screen flex flex-col relative`}
        suppressHydrationWarning={true}
      >
        {/* LE MENU DE NAVIGATION */}
        <Header />

        <main className="flex-grow">{children}</main>

        <Footer />

        {/* <-- 2. Le bouton WhatsApp placé ici sera sur toutes les pages ! */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
