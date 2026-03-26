import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newLead = await prisma.customLead.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        destination: body.destination,
        budget: body.budget,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        partySize: body.partySize,
        experienceType: body.experienceType,
        additionalNotes: body.additionalNotes,
        dayNumber: body.dayNumber, // Reçu du calcul front-end
        nightNumber: body.nightNumber, // Reçu du calcul front-end
        status: "NEW",
      },
    });

    return NextResponse.json(newLead);
  } catch (error: any) {
    console.error("Erreur API Sur-Mesure:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
