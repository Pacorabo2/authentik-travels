// app/(marketing)/(legal)/confidentialite/page.tsx
import { renderDescription } from "@/lib/text-utils";

export default function Confidentialite() {
  const content = `Chez Authentik Travels, nous accordons une importance capitale à la protection de vos données personnelles.

  COLLECTE DES DONNÉES
  Nous collectons les informations que vous nous communiquez lors de vos demandes de devis sur-mesure ou de vos réservations de voyages de groupe (Nom, prénom, email, téléphone, préférences de voyage).

  UTILISATION DES DONNÉES
  Vos données servent exclusivement à la gestion de vos réservations, à l'envoi de vos carnets de voyage et, si vous l'avez accepté, à l'envoi de nos actualités. Nous ne revendons jamais vos données à des tiers.

  DROITS DES UTILISATEURS
  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, contactez-nous à : info@authentika.io.`;

  return (
    <main className="min-h-screen bg-white pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black italic uppercase mb-12">
          Politique de <span className="text-amber-500">Confidentialité</span>
        </h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          {renderDescription(content)}
        </div>
      </div>
    </main>
  );
}
