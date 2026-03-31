// Gère le CRUD groupTrips
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TripStatus } from "@prisma/client";

/**
 * CRÉATION D'UN VOYAGE DE GROUPE
 */
// --- 1. CRÉATION D'UN VOYAGE DE GROUPE ---
export async function createGroupTrip(formData: FormData) {
  const title = formData.get("title") as string;
  const priceBase = Number(formData.get("priceBase"));
  const startDateStr = formData.get("startDate") as string;
  const duration = Number(formData.get("duration"));
  const imageUrl = formData.get("imageUrl") as string;
  const videoUrl = formData.get("videoUrl") as string;

  // Calcul automatique de la date de fin
  const startDate = new Date(startDateStr);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + duration);

  // Reconstruction du programme (ItineraryBuilder)
  const itineraryCount = Number(formData.get("itineraryCount") || 0);
  const program = [];
  for (let i = 0; i < itineraryCount; i++) {
    const t = formData.get(`day-title-${i}`) as string;
    const d = formData.get(`day-desc-${i}`) as string;
    if (t || d) {
      program.push({
        day: i + 1,
        title: t || "",
        description: d || "",
      });
    }
  }

  // Génération du slug unique
  const slug = `${title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")}-${Date.now()}`;

  try {
    await prisma.groupTrip.create({
      data: {
        title,
        slug,
        description: (formData.get("description") as string) || "", // Correction de l'erreur "missing description"
        startDate,
        endDate,
        duration,
        capacity: Number(formData.get("capacity")),
        priceBase,
        pricePremium: Number(formData.get("pricePremium")) || priceBase * 1.2,
        pricePlatinium:
          Number(formData.get("pricePlatinium")) || priceBase * 1.5,
        depositAmount: Number(formData.get("depositAmount")) || priceBase * 0.3,
        destinationId: formData.get("destinationId") as string,
        program: program as any,
        imageUrl: imageUrl || null,
        videoUrl: videoUrl || null,
        status: TripStatus.DRAFT, // Correction de l'erreur "Expected TripStatus"
      },
    });
  } catch (error) {
    console.error("Erreur Prisma lors de la création :", error);
    throw new Error("Erreur lors de l'enregistrement du voyage.");
  }

  revalidatePath("/admin/group-trips");
  redirect("/admin/group-trips?success=true");
}

// --- 2. MODIFICATION D'UN VOYAGE DE GROUPE ---
export async function updateGroupTrip(id: string, formData: FormData) {
  const priceBase = Number(formData.get("priceBase"));
  const startDate = new Date(formData.get("startDate") as string);
  const duration = Number(formData.get("duration"));
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + duration);

  const itineraryCount = Number(formData.get("itineraryCount") || 0);
  const program = [];
  for (let i = 0; i < itineraryCount; i++) {
    const t = formData.get(`day-title-${i}`) as string;
    const d = formData.get(`day-desc-${i}`) as string;
    if (t || d)
      program.push({ day: i + 1, title: t || "", description: d || "" });
  }

  try {
    await prisma.groupTrip.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        startDate,
        endDate,
        duration,
        capacity: Number(formData.get("capacity")),
        priceBase,
        pricePremium: Number(formData.get("pricePremium")) || priceBase * 1.2,
        pricePlatinium:
          Number(formData.get("pricePlatinium")) || priceBase * 1.5,
        depositAmount: Number(formData.get("depositAmount")),
        destinationId: formData.get("destinationId") as string,
        program: program as any,
        imageUrl: formData.get("imageUrl") as string,
        videoUrl: formData.get("videoUrl") as string,
      },
    });
  } catch (error) {
    console.error("Erreur Prisma lors de la mise à jour :", error);
    throw new Error("Erreur lors de la modification.");
  }

  revalidatePath("/admin/group-trips");
  revalidatePath(`/admin/group-trips/${id}`);
  redirect("/admin/group-trips?success=true");
}

/**
 * SUPPRESSION D'UN VOYAGE DE GROUPE
 */
export async function deleteGroupTrip(id: string) {
  try {
    await prisma.groupTrip.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du GroupTrip:", error);
    throw new Error(
      "Impossible de supprimer ce voyage (vérifiez s'il y a des réservations liées)",
    );
  }

  revalidatePath("/admin/group-trips");
  redirect("/admin/group-trips?deleted=true");
}
