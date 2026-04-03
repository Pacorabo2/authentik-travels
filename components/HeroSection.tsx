// components/HeroSection.tsx
import Link from "next/link";
import { getEmbedVideoUrl } from "@/lib/video-utils";

export default function HeroSection() {
  // C'est ici que tu mettras l'URL de ta vidéo stockée sur Supabase ou AWS
  // Pour l'instant, j'ai mis une vidéo de test libre de droits pour que tu voies le résultat
  const videoSrc = getEmbedVideoUrl("https://vimeo.com/688119406?fl=ip&fe=ec");

  return (
    // 'relative h-screen' = prend toute la hauteur de l'écran et sert de repère pour les éléments absolus
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 1. LA VIDÉO EN ARRIÈRE-PLAN */}
      <div className="absolute inset-0 pointer-events-none">
        <iframe
          src={videoSrc}
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 border-none"
          allow="autoplay; fullscreen; picture-in-picture"
        />
      </div>

      {/* 2. L'OVERLAY SOMBRE (Filtre de lisibilité) */}
      {/* 'z-10' le place au-dessus de la vidéo (z-0) mais en dessous du texte (z-20) */}
      <div className="absolute z-10 w-full h-full bg-black/55"></div>

      {/* 3. LE CONTENU (Texte et Boutons) */}
      <div className="relative z-20 text-center text-white px-4 flex flex-col items-center">
        {/* Titre Principal */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-medium text-balance">
          Vivez l&apos;Authentique
          <span className="text-amber-500 md:text-9xl">.</span>
        </h1>

        {/* Sous-titre */}
        <p className="text-xl md:text-2xl mb-10 max-w-2xl font-light text-balance">
          Plongez au cœur de la culture par la danse ou créez votre aventure sur
          mesure en Amérique Latine.
        </p>

        {/* Double Call-to-Action */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
          {/* Bouton Primaire (Le plus important : le Sur-Mesure) */}
          <Link
            href="/sur-mesure"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Créer mon voyage
          </Link>

          {/* Bouton Secondaire (Voyages de groupe) */}
          <Link
            href="/groupTrip"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-semibold py-4 px-8 rounded-full transition-all duration-300"
          >
            Voir les voyages
          </Link>
        </div>
      </div>
    </section>
  );
}
