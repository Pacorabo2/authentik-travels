// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Récupère l'année en cours automatiquement

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 md:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Grille principale du Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Colonne 1 : La Marque */}
          <div>
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              Authentik<span className="text-amber-500">Travels</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Créateurs de voyages immersifs et sur mesure en Amérique Latine
              depuis 2017. Plongez au cœur de la culture.
            </p>
          </div>

          {/* Colonne 2 : Nos Voyages */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
              Nos Voyages
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/voyages"
                  className="hover:text-amber-500 transition-colors"
                >
                  Voyages de Groupe
                </Link>
              </li>
              <li>
                <Link
                  href="/sur-mesure"
                  className="hover:text-amber-500 transition-colors"
                >
                  Créer du Sur-Mesure
                </Link>
              </li>
              <li>
                <Link
                  href="/voyages/cuba"
                  className="hover:text-amber-500 transition-colors"
                >
                  Destinations (Cuba, etc.)
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : L'Agence */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
              L&apos;Agence
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/a-propos"
                  className="hover:text-amber-500 transition-colors"
                >
                  À Propos de nous
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-amber-500 transition-colors"
                >
                  Le Blog (Carnets de voyage)
                </Link>
              </li>
              <li>
                <Link
                  href="/ambassadeur"
                  className="hover:text-amber-500 transition-colors"
                >
                  Devenir Professeur Partenaire
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Contact & Légal */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
              Contact & Infos
            </h4>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-amber-500 transition-colors"
                >
                  Nous contacter
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@authentika.io"
                  className="hover:text-amber-500 transition-colors"
                >
                  info@authentika.io
                </a>
              </li>
            </ul>
            <div className="flex gap-4">
              {/* Emplacements pour les icônes de réseaux sociaux */}
              <a
                href="https://www.instagram.com/authentik_travels/"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors"
              >
                Ig
              </a>
              <a
                href="https://www.facebook.com/authentiktravels"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors"
              >
                Fb
              </a>
            </div>
          </div>
        </div>

        {/* Barre du bas (Copyright et Mentions légales) */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} Authentik Travels. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link
              href="/mentions-legales"
              className="hover:text-white transition-colors"
            >
              Mentions Légales
            </Link>
            <Link
              href="/confidentialite"
              className="hover:text-white transition-colors"
            >
              Politique de Confidentialité
            </Link>
            <Link href="/cgv" className="hover:text-white transition-colors">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
