import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { sendConfirmationEmail } from "@/lib/mail"; // Ta fonction Resend

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia" as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  // 1. Validation de la signature Stripe
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error("Erreur Webhook Signature:", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // 2. Traitement du paiement réussi
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (metadata) {
      try {
        // A. On crée la réservation dans Supabase via Prisma
        await prisma.booking.create({
          data: {
            groupTrip: {
              connect: { id: metadata.tripId },
            },
            userName: metadata.userName,
            userEmail: metadata.userEmail,
            participants: parseInt(metadata.participants) || 1,
            status: "CONFIRMED",
          },
        });

        console.log(
          "✅ Réservation enregistrée en base pour:",
          metadata.userEmail,
        );

        // B. On envoie le mail de confirmation via ta lib/mail
        if (process.env.RESEND_API_KEY) {
          await sendConfirmationEmail(
            metadata.userEmail,
            metadata.userName,
            metadata.tripTitle || "Votre voyage Authentik", // On utilise le titre passé dans metadata
          );
          console.log("📧 Mail de confirmation envoyé via Resend");
        }
      } catch (error) {
        console.error("❌ Erreur lors du traitement post-paiement:", error);
        // On renvoie un 500 pour que Stripe réessaie plus tard si c'est un bug temporaire DB
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
