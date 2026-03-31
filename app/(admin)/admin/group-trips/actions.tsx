// Gère le CRUD groupTrips
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * CRÉATION D'UN VOYAGE DE GROUPE
 */
export async function createGroupTrip(formData: FormData) {
  const title = formData.get("title") as string;
  const destinationId = formData.get("destinationId") as string;
  const startDateStr = formData.get("startDate") as string;
  const duration = Number(formData.get("duration"));
  const priceBase = Number(formData.get("priceBase"));
  const capacity = Number(formData.get("capacity"));
  const depositAmount = Number(formData.get("depositAmount"));

  // 1. Extraction dynamique de l'itinéraire (notre composant ItineraryBuilder)
  const itineraryCount = Number(formData.get("itineraryCount") || 0);
  const program = [];

  for (let i = 0; i < itineraryCount; i++) {
    const dayTitle = formData.get(`day-title-${i}`) as string;
    const dayDesc = formData.get(`day-desc-${i}`) as string;

    if (dayTitle || dayDesc) {
      program.push({
        day: i + 1,
        title: dayTitle || "",
        description: dayDesc || "",
      });
    }
  }

  // 2. Calcul de la date de fin (endDate)
  const startDate = new Date(startDateStr);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + duration);

  // 3. Génération du slug unique
  const slug = `${title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")}-${new Date().getFullYear()}`;

  // 4. Insertion en base de données
  await prisma.groupTrip.create({
    data: {
      title,
      slug,
      description: "", // On pourra ajouter un champ description plus tard si besoin
      startDate,
      endDate,
      duration,
      capacity,
      // On insère le tableau d'objets construit plus haut
      program: program,
      priceBase,
      // Calcul automatique des options (modifiable via l'Edit plus tard)
      pricePremium: priceBase * 1.2,
      pricePlatinium: priceBase * 1.5,
      depositAmount: depositAmount || priceBase * 0.3, // 30% par défaut si vide
      destinationId,
      status: "PLANNED", // Statut initial
    },
  });

  // 4. Rafraîchissement des pages
  revalidatePath("/admin/group-trips");
  revalidatePath("/groupTrip"); // La page catalogue client
  redirect("/admin/group-trips?success=true");
}

/**
 * MODIFICATION D'UN VOYAGE DE GROUPE
 */
export async function updateGroupTrip(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const duration = Number(formData.get("duration"));
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + duration);

  await prisma.groupTrip.update({
    where: { id },
    data: {
      title,
      destinationId: formData.get("destinationId") as string,
      startDate,
      endDate,
      duration,
      capacity: Number(formData.get("capacity")),
      priceBase: Number(formData.get("priceBase")),
      depositAmount: Number(formData.get("depositAmount")),
    },
  });

  revalidatePath("/admin/group-trips");
  revalidatePath("/groupTrip");
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
