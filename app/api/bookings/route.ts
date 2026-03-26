import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const booking = await prisma.booking.create({
      data: {
        tripId: body.tripId,
        userName: body.userName,
        userEmail: body.userEmail,
        participants: body.participants,
        // On ne met PAS de userId ici si l'utilisateur n'est pas connecté
        // (C'est pour ça qu'il doit être "userId String?" dans le schéma)
      },
    });
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
