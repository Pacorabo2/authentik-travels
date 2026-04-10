// app/(marketing)/(legal)/mentions-legales/page.tsx
import { renderDescription } from "@/lib/text-utils";

export default function MentionsLegales() {
  const content = `Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (L.C.E.N.), nous portons à la connaissance des utilisateurs du site Authentik Travels les informations suivantes :

  ÉDITEUR
  Le site authentika.io est la propriété exclusive de [NOM DE TON ENTREPRISE], qui l'édite.
  [FORME JURIDIQUE : ex SAS] au capital de [MONTANT] €
  Tél : [TON NUMÉRO]
  [ADRESSE DU SIÈGE SOCIAL]
  Immatriculée au Registre du Commerce et des Sociétés de [VILLE] sous le numéro [TON SIRET]
  Numéro TVA intracommunautaire : [TON NUMÉRO TVA]
  Adresse de courrier électronique : info@authentika.io

  HÉBERGEMENT
  Le site est hébergé par Vercel Inc., situé au 340 S Lemon Ave #1135 Walnut, CA 91789, USA.`;

  return (
    <main className="min-h-screen bg-white pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black italic uppercase mb-12">
          Mentions <span className="text-amber-500">Légales</span>
        </h1>
        <div className="prose prose-slate max-w-none text-slate-600">
          {renderDescription(content)}
        </div>
      </div>
    </main>
  );
}
