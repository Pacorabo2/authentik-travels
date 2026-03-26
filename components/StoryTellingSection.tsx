// components/StorytellingSection.tsx
import Link from "next/link";

export default function StorytellingSection() {
  return (
    <section className="py-24 bg-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* 1. L'IMAGE (Côté gauche sur grand écran, en haut sur mobile) */}
        <div className="w-full lg:w-1/2 relative">
          {/* Conteneur de l'image avec un ratio spécifique et une ombre */}
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative z-10">
            <img
              src="https://images.unsplash.com/photo-1506452815418-60bb4d35e76a?q=80&w=2000&auto=format&fit=crop"
              alt="Voyageurs dansant et souriant en Amérique Latine"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Éléments de décoration (Cercles de couleur en arrière-plan) */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-100 rounded-full z-0 hidden md:block"></div>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-50 rounded-full z-0 hidden md:block"></div>
        </div>

        {/* 2. LE TEXTE ET L'HISTOIRE (Côté droit) */}
        <div className="w-full lg:w-1/2">
          {/* Petit sur-titre coloré */}
          <span className="text-amber-600 font-bold tracking-wider uppercase text-sm mb-4 block">
            Notre Histoire
          </span>

          {/* Titre principal avec un mot en dégradé pour le côté Premium */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Plus qu&apos;un voyage, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-400">
              une rencontre authentique.
            </span>
          </h2>

          {/* Paragraphes de texte */}
          <div className="space-y-6 text-lg text-gray-600 mb-8">
            <p>
              Depuis 2017, Authentik Travels repousse les limites du tourisme
              classique. Nous sommes nés d&apos;une passion pour l&apos;Amérique
              Latine, sa musique vibrante et ses cultures chaleureuses.
            </p>
            <p>
              Que vous partiez perfectionner vos pas de salsa à La Havane avec
              nos professeurs partenaires, ou que vous nous confiiez la création
              de votre itinéraire sur mesure au Costa Rica, notre promesse reste
              la même :{" "}
              <strong>vous faire vivre le pays de l&apos;intérieur</strong>.
            </p>
          </div>

          {/* Liste d'avantages (Bullet points visuels) */}
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                ✓
              </div>
              <span className="text-gray-800 font-medium">
                Expertise terrain (Cuba, Colombie, Rép. Dom., Costa Rica)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                ✓
              </div>
              <span className="text-gray-800 font-medium">
                Immersion garantie avec des guides et professeurs locaux
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                ✓
              </div>
              <span className="text-gray-800 font-medium">
                Création de voyages sur mesure de A à Z
              </span>
            </li>
          </ul>

          {/* Lien vers la page 'À propos' */}
          <Link
            href="/a-propos"
            className="inline-flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 transition-colors"
          >
            Découvrir notre agence
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
