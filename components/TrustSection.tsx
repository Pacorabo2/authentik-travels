export default function TrustSection() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-12 text-slate-700">
      <div className="space-y-4">
        <h3 className="font-bold text-xl text-slate-900 italic">
          🛡️ Réassurance & Annulation
        </h3>
        <p className="text-sm leading-relaxed">
          <strong>Politique flexible :</strong> Annulation gratuite jusqu&apos;à
          J-45. Entre J-45 et J-15, l&apos;acompte est conservé sous forme
          d&apos;avoir.
        </p>
        <ul className="text-sm space-y-2">
          <li>✅ Hébergements sélectionnés avec soin</li>
          <li>✅ Accompagnement expert Authentik Travels</li>
          <li>✅ Immersion culturelle garantie</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-xl text-slate-900 italic">
          💳 Facilités de Paiement
        </h3>
        <p className="text-sm leading-relaxed">
          Pour valider votre place, seul l&apos;acompte est prélevé
          aujourd&apos;hui.
        </p>
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
          <p className="text-xs font-medium text-amber-800 uppercase tracking-wider mb-2">
            Options disponibles :
          </p>
          <ul className="text-sm text-amber-900 font-semibold italic">
            <li>• Paiement en 2 fois (solde à J-30)</li>
            <li>• Paiement en 3 fois (sur accord spécial)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
