// components/DoubleOfferSection.tsx
import Link from "next/link";

export default function DoubleOfferSection() {
  return (
    <section className="py-20 bg-gray-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de la section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Deux façons de vivre l&apos;Authentik
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Que vous cherchiez la force du collectif ou l&apos;intimité
            d&apos;un parcours sur-mesure, nous transformons votre voyage en une
            immersion profonde au coeur des cultures d&apos;Amérique Latine.
          </p>
        </div>

        {/* Grille des offres (1 colonne sur mobile, 2 sur PC) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CARTE 1 : VOYAGES DE GROUPE */}
          {/* 'group' permet d'activer des effets sur les éléments enfants lors du survol de la carte */}
          <Link
            href="/groupTrip"
            className="group relative rounded-2xl overflow-hidden h-[500px] shadow-lg flex items-end"
          >
            {/* Image de fond (Placeholder) */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/AUTENTIK%20(92%20de%20143).jpg')",
              }}
            />

            {/* Filtre assombrissant (Gradient) pour lire le texte */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Contenu de la carte */}
            <div className="relative z-10 p-8 text-white w-full">
              <span className="uppercase tracking-widest text-sm font-semibold text-amber-500 mb-2 block">
                Immersion & Danse
              </span>
              <h3 className="text-3xl font-bold mb-3">Voyages de Groupe</h3>
              <p className="text-gray-200 mb-6">
                Rejoignez d&apos;autres passionnés. <br />
                Une immersion guidée par nos ambassadeurs où la danse,
                l&apos;art et les rencontres locales deviennent votre quotidien.{" "}
                <br />
                Bienvenue dans l&apos;Amérique Latine des initiés.
              </p>
              <span className="inline-block bg-white text-black font-semibold py-3 px-6 rounded-full transition-colors group-hover:bg-amber-500 group-hover:text-white">
                Rejoindre l&apos;aventure
              </span>
            </div>
          </Link>

          {/* CARTE 2 : VOYAGES SUR MESURE */}
          <Link
            href="/sur-mesure"
            className="group relative rounded-2xl overflow-hidden h-[500px] shadow-lg flex items-end"
          >
            {/* Image de fond (Placeholder) */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/AUTENTIK%20(8%20de%2052).jpg')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 p-8 text-white w-full">
              <span className="uppercase tracking-widest text-sm font-semibold text-amber-500 mb-2 block">
                100% Personnalisé
              </span>
              <h3 className="text-3xl font-bold mb-3">Voyages Sur-Mesure</h3>
              <p className="text-gray-200 mb-6">
                L’expertise de nos racines. <br />
                Confiez-nous vos envies et vos dates : <br />
                nous dessinons un itinéraire hors-piste, taillé sur mesure pour
                votre curiosité.
              </p>
              <span className="inline-block bg-white text-black font-semibold py-3 px-6 rounded-full transition-colors group-hover:bg-amber-500 group-hover:text-white">
                Tracer mon itinéraire
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
