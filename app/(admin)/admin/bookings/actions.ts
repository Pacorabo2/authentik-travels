"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BookingStatus, BookingType } from "@prisma/client";

export async function createManualBooking(formData: FormData) {
  // 1. Extraction et typage des données
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const groupTripId = formData.get("groupTripId") as string;
  const optionType = formData.get("optionType") as string;
  const participants = Number(formData.get("participants"));
  const totalPrice = Number(formData.get("totalPrice"));
  const amountPaid = Number(formData.get("amountPaid"));
  const paymentMethod = formData.get("paymentMethod") as string;
  const status = formData.get("status") as BookingStatus;

  // 2. Récupération des infos du voyage pour les dates
  const trip = await prisma.groupTrip.findUnique({
    where: { id: groupTripId },
  });

  if (!trip) {
    throw new Error("Le voyage sélectionné n'existe plus ou est invalide.");
  }

  try {
    // 3. Création de la réservation dans la table unifiée
    await prisma.booking.create({
      data: {
        type: BookingType.GROUP,
        groupTripId: trip.id,
        firstName,
        lastName,
        email,
        phone,
        startDate: trip.startDate,
        endDate: trip.endDate,
        participants,
        optionType,
        totalPrice,
        amountPaid,
        paymentMethod,
        status,
      },
    });

    // 4. Mise à jour de la jauge de remplissage si nécessaire
    // (Prisma s'en occupe via le count dans tes autres vues)
  } catch (error) {
    console.error("Erreur création booking manuel:", error);
    throw new Error("Impossible d'enregistrer la réservation.");
  }

  // 5. Revalidation des caches pour mettre à jour les listes
  revalidatePath("/admin/bookings");
  revalidatePath("/admin/group-trips");

  redirect("/admin/bookings?success=true");
}
