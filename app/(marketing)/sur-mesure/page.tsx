// app/sur-mesure/page.tsx
import SurMesureForm from "@/components/SurMesureForm";

export default function SurMesurePage() {
  return (
    <div className="min-h-screen -mt-[80px] bg-gray-50 pt-24 pb-20">
      {/* 1. HERO SECTION DE LA PAGE */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16 text-center">
        <span className="text-amber-600 font-bold tracking-wider uppercase text-sm mb-4 block">
          Notre Expertise Historique
        </span>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-medium text-balance">
          Votre aventure, <br /> sur mesure<span className="text-amber-500 ">.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
          Loin des circuits touristiques classiques, nous créons avec vous un
          itinéraire 100% personnalisé. Vous rêvez, nous concevons.
        </p>
      </div>

      {/* 2. LE CONTENU PRINCIPAL (Grille avec le Processus et le Formulaire) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Colonne de gauche : Le Processus en 3 étapes */}
        <div className="lg:col-span-5 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Comment ça marche ?
            </h2>

            <div className="space-y-8">
              {/* Étape 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Le Brief
                  </h4>
                  <p className="text-gray-600">
                    Remplissez le formulaire ci-contre. Nous organisons ensuite
                    un appel pour comprendre vos envies profondes, votre rythme
                    et votre budget.
                  </p>
                </div>
              </div>

              {/* Étape 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Création de l&apos;itinéraire
                  </h4>
                  <p className="text-gray-600">
                    Nos experts terrain conçoivent un carnet de voyage sur
                    mesure. Nous l&apos;ajustons ensemble jusqu&apos;à ce
                    qu&apos;il soit parfait.
                  </p>
                </div>
              </div>

              {/* Étape 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Accompagnement
                  </h4>
                  <p className="text-gray-600">
                    Partez l&apos;esprit léger. Réservations, guides locaux,
                    assistance 24/7 : on s&apos;occupe de toute la logistique.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Petite carte de réassurance */}
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
            <h4 className="font-bold text-amber-900 mb-2">
              💡 Pourquoi nous faire confiance ?
            </h4>
            <p className="text-amber-800 text-sm">
              Authentik Travels bénéficie d&apos;un réseau de partenaires locaux
              de confiance (logements, guides, chauffeurs, professeurs de danse) construit
              méticuleusement depuis 2017.
            </p>
          </div>
        </div>

        {/* Colonne de droite : Le Formulaire */}
        <div className="lg:col-span-7">
          {/* On insère notre super composant ici ! */}
          <SurMesureForm />
        </div>
      </div>
    </div>
  );
}
