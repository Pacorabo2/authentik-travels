import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia" as any,
});

const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export async function POST(req: Request) {
  try {
    const { tripId, tripTitle, userName, userEmail, participants } =
      await req.json();

    // SÉCURITÉ : On force le nombre entre 1 et 2
    let quantity = parseInt(participants) || 1;
    if (quantity > 2) quantity = 2; // On bride à 2 maximum
    if (quantity < 1) quantity = 1;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Acompte : ${tripTitle}`,
              description: `Réservation pour ${quantity} voyageur(s)`,
            },
            unit_amount: 50000, // 500.00€ en centimes
          },
          quantity: quantity, // 👈 C'est ICI que la multiplication opère
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/voyages`,
      // Métadonnées pour le Webhook (pour enregistrer en base après)
      metadata: {
        tripId,
        userName,
        userEmail,
        participants: quantity.toString(),
      },
    });

    return NextResponse.json({ url: session.url }); // On renvoie l'URL directe de Stripe
  } catch (err: any) {
    console.error("Erreur Stripe:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
