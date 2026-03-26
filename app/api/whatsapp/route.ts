// app/api/whatsapp/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // 1. On récupère le numéro depuis le fichier .env.local (côté serveur, en toute sécurité)
  const phoneNumber = process.env.WHATSAPP_SECRET_NUMBER;

  // 2. Message par défaut
  const defaultMessage =
    "Bonjour ! Je souhaite avoir plus d'informations sur vos voyages.";

  // 3. Si le numéro n'est pas configuré, on redirige vers la page contact classique
  if (!phoneNumber) {
    return NextResponse.redirect(
      new URL(
        "/contact",
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      ),
    );
  }

  // 4. On crée l'URL WhatsApp et on redirige l'utilisateur
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
  return NextResponse.redirect(whatsappUrl);
}
