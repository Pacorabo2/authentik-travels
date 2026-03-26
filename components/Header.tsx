// components/Header.tsx

// Cette ligne est OBLIGATOIRE pour utiliser les interactions (clics, scroll)
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Permet de savoir sur quelle page on est

export default function Header() {
  // Variables d'état pour gérer le comportement du menu
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // On récupère l'adresse de la page actuelle (ex: '/', '/sur-mesure', etc.)
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Effet pour détecter si l'utilisateur fait défiler la page (scroll)
  useEffect(() => {
    const handleScroll = () => {
      // Si on descend de plus de 50 pixels, isScrolled devient vrai
      setIsScrolled(window.scrollY > 50);
    };

    // On écoute l'événement "scroll" sur la fenêtre
    window.addEventListener("scroll", handleScroll);

    // Nettoyage de l'événement quand on quitte la page
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logique visuelle : le fond est blanc si on a scrollé OU si on n'est PAS sur la page d'accueil
  const isSolidBackground = !isHome || isScrolled;

  const headerClasses = isSolidBackground
    ? "bg-white text-gray-900 shadow-md py-3"
    : "bg-transparent text-white py-6";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* 1. LOGO */}
        <Link href="/" className="flex items-center">
          {/* Si tu utilises un PNG, remplace "/logo.svg" par "/logo.png" */}
          <Image
            src="/logo.png"
            alt="Logo Authentik Travels"
            width={180} // Largeur estimée (tu peux ajuster)
            height={40} // Hauteur estimée (tu peux ajuster)
            className="w-auto h-12 md:h-10" // h-8 sur mobile, h-10 sur PC
            style={{ height: "48px", width: "auto" }}
            priority // Très important pour le logo : dit au navigateur de le charger en priorité absolue (bon pour le SEO)
          />
        </Link>

        {/* 2. MENU ORDINATEUR (Caché sur mobile grâce à 'hidden md:flex') */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link
            href="/voyages"
            className="hover:text-amber-500 transition-colors"
          >
            Nos Voyages
          </Link>
          <Link
            href="/a-propos"
            className="hover:text-amber-500 transition-colors"
          >
            L&apos;Agence
          </Link>
          <Link
            href="/contact"
            className="hover:text-amber-500 transition-colors"
          >
            Contact
          </Link>
          {/* Bouton d'action principal du menu */}
          <Link
            href="/sur-mesure"
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Créer mon voyage
          </Link>
        </nav>

        {/* 3. BOUTON MENU MOBILE (Hamburger) */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Ouvrir le menu"
        >
          {/* Icône SVG dynamique (Hamburger ou Croix selon l'état) */}
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              // Dessin de la croix (Fermer)
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Dessin des 3 lignes (Ouvrir)
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* 4. PANNEAU DU MENU MOBILE */}
      {/* S'affiche uniquement si isMobileMenuOpen est VRAI */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white text-gray-900 shadow-xl border-t border-gray-100 flex flex-col py-4 px-4 gap-4 font-medium">
          {/* On ajoute onClick pour fermer le menu quand l'utilisateur clique sur un lien */}
          <Link
            href="/voyages"
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-50 rounded-lg"
          >
            Nos Voyages
          </Link>
          <Link
            href="/sur-mesure"
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-50 rounded-lg text-amber-600 font-bold"
          >
            Créer mon voyage
          </Link>
          <Link
            href="/a-propos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-50 rounded-lg"
          >
            L&apos;Agence
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-50 rounded-lg"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
