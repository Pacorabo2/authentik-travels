"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TripStatus } from "@prisma/client";

/**
 * 1. CRÉATION D'UN VOYAGE DE GROUPE
 */
export async function createGroupTrip(formData: FormData) {
  const title = formData.get("title") as string;
  const priceBase = Number(formData.get("priceBase"));

  const startDate = new Date(formData.get("startDate") as string);
  const endDate = new Date(formData.get("endDate") as string);
  const duration = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Récupération propre du JSON via le nouveau ItineraryBuilder
  const programRaw = formData.get("program") as string;
  const program = programRaw ? JSON.parse(programRaw) : [];

  try {
    await prisma.groupTrip.create({
      data: {
        title,
        slug: `${title.toLowerCase().replace(/ /g, "-")}-${Date.now()}`,
        description: (formData.get("description") as string) || "",
        startDate,
        endDate,
        duration: duration || 1,
        capacity: Number(formData.get("capacity")),
        priceBase,
        // Nouveaux champs de prix explicites
        pricePremium: formData.get("pricePremium")
          ? Number(formData.get("pricePremium"))
          : null,
        pricePlatinium: formData.get("pricePlatinium")
          ? Number(formData.get("pricePlatinium"))
          : null,
        depositAmount: Number(formData.get("depositAmount")),
        destinationId: formData.get("destinationId") as string,
        program: program,
        imageUrl: (formData.get("imageUrl") as string) || null,
        videoUrl: (formData.get("videoUrl") as string) || null,
        status: TripStatus.DRAFT,
      },
    });
  } catch (error: any) {
    console.error("❌ Erreur création:", error.message);
    throw new Error("Erreur lors de l'enregistrement.");
  }

  revalidatePath("/admin/group-trips");
  redirect("/admin/group-trips?success=true");
}

/**
 * 2. MODIFICATION D'UN VOYAGE DE GROUPE (Version 100% JSON)
 */
export async function updateGroupTrip(id: string, formData: FormData) {
  const priceBase = Number(formData.get("priceBase"));
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = new Date(formData.get("endDate") as string);
  const duration = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  // On attend UNIQUEMENT le champ 'program' envoyé par l'ItineraryBuilder moderne
  const programRaw = formData.get("program") as string;
  const program = programRaw ? JSON.parse(programRaw) : [];

  try {
    await prisma.groupTrip.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        startDate,
        endDate,
        duration: duration || 1,
        capacity: Number(formData.get("capacity")),
        priceBase,
        // Mise à jour des options d'hébergement
        pricePremium: formData.get("pricePremium")
          ? Number(formData.get("pricePremium"))
          : null,
        pricePlatinium: formData.get("pricePlatinium")
          ? Number(formData.get("pricePlatinium"))
          : null,
        depositAmount: Number(formData.get("depositAmount")),
        destinationId: formData.get("destinationId") as string,
        program: program,
        imageUrl: (formData.get("imageUrl") as string) || null,
        videoUrl: (formData.get("videoUrl") as string) || null,
      },
    });
  } catch (error: any) {
    console.error("❌ Erreur modification:", error.message);
    throw new Error("Erreur lors de la modification.");
  }

  revalidatePath("/admin/group-trips");
  revalidatePath(`/admin/group-trips/${id}`);
  redirect("/admin/group-trips?success=true");
}

/**
 * 3. SUPPRESSION
 */
export async function deleteGroupTrip(id: string) {
  try {
    await prisma.groupTrip.delete({ where: { id } });
  } catch (error) {
    throw new Error("Impossible de supprimer ce voyage.");
  }
  revalidatePath("/admin/group-trips");
  redirect("/admin/group-trips?deleted=true");
}
