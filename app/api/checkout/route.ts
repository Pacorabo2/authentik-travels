import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma"; // Import indispensable pour vérifier le prix

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia" as any,
});

const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export async function POST(req: Request) {
  try {
    const { tripId, userName, userEmail, participants, formula } =
      await req.json();

    // 1. VÉRIFICATION EN BASE DE DONNÉES (Sécurité anti-fraude)
    const trip = await prisma.groupTrip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      return NextResponse.json(
        { error: "Voyage introuvable" },
        { status: 404 },
      );
    }

    if (!trip.depositAmount) {
      return NextResponse.json(
        { error: "Aucun acompte défini pour ce voyage" },
        { status: 400 },
      );
    }

    // 2. LOGIQUE DU NOMBRE DE PARTICIPANTS
    let quantity = parseInt(participants) || 1;
    if (quantity > 2) quantity = 2;
    if (quantity < 1) quantity = 1;

    // 3. CRÉATION DE LA SESSION STRIPE
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Acompte : ${trip.title}`,
              description: `Formule ${formula || "Standard"} - Réservation pour ${quantity} voyageur(s)`,
            },
            // On utilise le VRAI acompte de la base de données (en centimes)
            unit_amount: Math.round(trip.depositAmount * 100),
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      // On redirige vers la page du voyage en cas d'annulation
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/groupTrip/${trip.slug}`,

      customer_email: userEmail,
      metadata: {
        tripId,
        userName,
        userEmail,
        participants: quantity.toString(),
        formula: formula || "base",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Erreur Stripe:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
