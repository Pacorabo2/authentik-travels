import Stripe from "stripe";
import Link from "next/link";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia" as any,
});

export default async function SuccessPage({
  searchParams,
}: {
  // On définit searchParams comme une Promesse
  searchParams: Promise<{ session_id: string }>;
}) {
  // 1. On "déballe" les paramètres avec await
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-slate-500 mb-4">
            Session de paiement non trouvée.
          </p>
          <Link href="/" className="text-amber-600 font-bold underline">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  try {
    // 2. On récupère les détails chez Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const amountTotal = (session.amount_total || 0) / 100;
    const customerName = session.customer_details?.name || "Voyageur";

    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h1 className="text-3xl font-black italic text-slate-900 mb-2">
            C&apos;est confirmé !
          </h1>
          <p className="text-slate-500 mb-8">
            Merci {customerName}, ton aventure commence maintenant.
          </p>

          <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
              Montant réglé
            </p>
            <p className="text-4xl font-black text-slate-900">{amountTotal}€</p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-slate-400 italic">
              Un email de confirmation vient de t&apos;être envoyé avec les
              prochaines étapes.
            </p>
            <Link
              href="/"
              className="block w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:scale-[1.02] transition-transform"
            >
              Retour au site
            </Link>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Erreur récupération session Stripe:", error);
    return (
      <p className="text-center p-10">
        Erreur lors de la récupération du reçu.
      </p>
    );
  }
}
