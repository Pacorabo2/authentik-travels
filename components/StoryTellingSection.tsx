import Link from "next/link";
import Image from "next/image";

export default function StorytellingSection() {
  return (
    <section className="py-24 bg-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* 1. L'IMAGE (Côté gauche sur grand écran, en haut sur mobile) */}
        <div className="w-full lg:w-1/2 relative">
          {/* Conteneur de l'image avec un ratio spécifique et une ombre */}
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative z-10">
            <Image
              src="https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/_DSC3127.JPG"
              alt="Un cubain avec un cigare à la main souriant"
              fill // Remplit le conteneur parent
              className="object-cover transition-transform duration-1000 hover:scale-105"
              sizes="(max-w-768px) 100vw, 50vw"
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
            Plus qu&apos;un voyage, <br /> une rencontre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-400">
              authentique
            </span>.
          </h2>

          {/* Paragraphes de texte */}
          <div className="space-y-6 text-lg text-gray-600 mb-8">
            <p>
              Depuis 2017, Authentik Travels repousse les limites du tourisme
              classique. Nous sommes nés d&apos;une{" "}
              <strong>passion pour l&apos;Amérique Latine</strong>, sa musique,
              son peuple, sa culture.
            </p>
            <p>
              Vous voulez vivre un voyage qui vous transforme ? Connaître les coutumes locales en étant accompagné par un local désireux de partager ses traditions ? <br />
              Notre promesse reste
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black uppercase text-xs tracking-widest rounded-full hover:bg-amber-600 transition-all shadow-lg hover:shadow-amber-200"
          >
            Découvrir notre agence
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
