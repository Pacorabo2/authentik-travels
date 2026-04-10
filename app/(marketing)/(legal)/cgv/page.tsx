// app/(marketing)/(legal)/cgv/page.tsx
import { renderDescription } from "@/lib/text-utils";

export default function CGV() {
  const content = `Les présentes CGV régissent les relations contractuelles entre Authentik Travels et ses clients.

  1. RÉSERVATION ET ACOMPTE
  Toute réservation de voyage de groupe devient ferme à réception d'un acompte dont le montant est précisé sur la fiche du voyage. Le solde doit être réglé 30 jours avant le départ.

  2. ANNULATION
  En cas d'annulation par le client, des frais seront retenus selon le barème suivant :
  - Plus de 60 jours avant le départ : conservation de l'acompte.
  - Moins de 30 jours avant le départ : 100% du prix du voyage.

  3. RESPONSABILITÉ
  Authentik Travels agit en tant qu'intermédiaire entre les clients et les prestataires locaux (hôtels, transporteurs, guides). Nous ne saurions être tenus responsables des modifications d'itinéraires dues à des cas de force majeure.`;

  return (
    <main className="min-h-screen bg-white pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black italic uppercase mb-12">
          Conditions Générales <span className="text-amber-500">de Vente</span>
        </h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          {renderDescription(content)}
        </div>
      </div>
    </main>
  );
}
