// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 md:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Colonne 1 : La Marque */}
          <div>
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              Authentik<span className="text-amber-500">Travels</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 italic">
              Créateurs de voyages immersifs et sur mesure en Amérique Latine
              depuis 2017.
            </p>
          </div>

          {/* Colonne 2 : Nos Voyages */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase text-xs tracking-widest">
              Nos Voyages
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/groupTrip"
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
                  href="/destinations"
                  className="hover:text-amber-500 transition-colors"
                >
                  Nos Destinations
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : L'Agence */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase text-xs tracking-widest">
              L&apos;Agence
            </h4>
            <ul className="space-y-3 text-sm">
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
                  Le Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/ambassador"
                  className="hover:text-amber-500 transition-colors"
                >
                  Devenir Ambassadeur
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Contact & Réseaux */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase text-xs tracking-widest">
              Contact & Réseaux
            </h4>
            <ul className="space-y-3 text-sm mb-6">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-amber-500 transition-colors font-bold"
                >
                  Nous contacter
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@authentika.io"
                  className="hover:text-amber-500 transition-colors italic"
                >
                  info@authentika.io
                </a>
              </li>
            </ul>

            {/* RÉSEAUX SOCIAUX AVEC LOGOS */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/authentik_travels/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-amber-500 transition-all group shadow-lg"
              >
                <Image
                  src="/instagram.png"
                  alt="Instagram Authentik"
                  width={20}
                  height={20}
                  className="group-hover:brightness-0 group-hover:invert transition-all"
                />
              </a>
              <a
                href="https://www.facebook.com/authentiktravels"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-amber-500 transition-all group shadow-lg"
              >
                <Image
                  src="/facebook.png"
                  alt="Facebook Authentik"
                  width={20}
                  height={20}
                  className="group-hover:brightness-0 group-hover:invert transition-all"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-500">
          <p>© {currentYear} Authentik Travels. Tous droits réservés.</p>
          <div className="flex gap-6">
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
              Confidentialité
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
