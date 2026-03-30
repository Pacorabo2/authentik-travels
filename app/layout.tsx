import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import prisma from "@/lib/prisma"; // Vérifie que ce chemin pointe bien vers ton fichier prisma

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Authentik Travels | Immersion & Aventure",
  description: "Voyages authentiques et séjours chez l'habitant.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // RÉCUPÉRATION DES DONNÉES
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
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {/* IMPORTANT : On passe 'destinationsData' à la prop 'destinations' */}
        <Header destinations={destinationsData} />
        {children}
      </body>
    </html>
  );
}
