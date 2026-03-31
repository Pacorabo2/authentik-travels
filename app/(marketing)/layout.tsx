import type { Metadata } from "next";
import { Inter } from "next/font/google";
import prisma from "@/lib/prisma";

// Importation des composants
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Optimisation de la police Inter
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Améliore le temps d'affichage initial (LCP)
});

export const metadata: Metadata = {
  title: {
    default: "Authentik Travels | Voyages Immersifs et Sur-Mesure",
    template: "%s | Authentik Travels", // Permet d'avoir "Colombie | Authentik Travels" sur les sous-pages
  },
  description:
    "Agence de voyage spécialisée dans les séjours de groupe (danse) et la création d'itinéraires sur mesure en Amérique Latine.",
  robots: {
    index: true,
    follow: true,
  },
};

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // PERFORMANCE : On ne récupère que le nécessaire pour le menu
  // Cette requête est faite côté serveur, donc invisible pour l'utilisateur
  const destinationsData = await prisma.destination.findMany({
    select: {
      name: true,
      slug: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className={`${inter.className} min-h-screen flex flex-col relative`}>
      {/* On injecte le Header ICI avec ses données. 
          Il ne s'affichera donc QUE dans le groupe (marketing) 
      */}
      <Header destinations={destinationsData} />

      <main className="flex-grow pt-20 md:pt-24">
        {/* pt-20 permet de compenser le Header fixe pour que le contenu ne passe pas dessous */}
        {children}
      </main>

      <Footer />

      {/* Le bouton WhatsApp reste présent sur toutes les pages marketing */}
      <WhatsAppButton />
    </div>
  );
}
