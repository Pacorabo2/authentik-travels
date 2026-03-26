import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma"; // Vérifie que ton instance Prisma est bien là
import { headers } from "next/headers";
import { sendConfirmationEmail } from "@/lib/mail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia" as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error("Erreur Webhook:", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (metadata) {
      // 📝 C'est ici qu'on écrit dans Supabase !
      await prisma.booking.create({
        data: {
          tripId: parseInt(metadata.tripId),
          userName: metadata.userName,
          userEmail: metadata.userEmail,
          participants: parseInt(metadata.participants),
          status: "CONFIRMED",
        },
      });

      // 📧 ENVOI DE L'EMAIL ICI
      await sendConfirmationEmail(
        metadata.userEmail,
        metadata.userName,
        metadata.tripTitle || "Votre voyage",
      );

      console.log("✅ Réservation enregistrée et email envoyé!");
    }
  }

  return NextResponse.json({ received: true });
}
