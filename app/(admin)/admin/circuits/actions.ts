"use server"; // INDISPENSABLE ICI

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- CRÉATION D'UN CIRCUIT---
export async function createCircuit(formData: FormData) {
  const title = formData.get("title") as string;
  const destinationId = formData.get("destinationId") as string;
  const startDateStr = formData.get("startDate") as string;
  const duration = Number(formData.get("duration"));
  const price = Number(formData.get("price"));
  const maxCapacity = Number(formData.get("maxCapacity"));

  // 1. Calcul des dates
  const startDate = new Date(startDateStr);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + duration);

  // 2. Génération du slug
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  // 3. Insertion avec TOUS les champs obligatoires (Non-Nullable)
  await prisma.groupTrip.create({
    data: {
      title,
      slug,
      description: formData.get("description") as string,
      startDate,
      endDate,
      capacity: maxCapacity,
      program: [], // Champ jsonb Non-Nullable

      // Champs monétaires (float8 Non-Nullable)
      priceBase: price,
      pricePremium: price * 1.2, // Valeur par défaut (ex: +20%)
      pricePlatinium: price * 1.5, // Valeur par défaut (ex: +50%)
      depositAmount: price * 0.3, // Acompte par défaut (30%)

      // Relation et Statut
      destinationId: destinationId,
      status: "DRAFT", // Ou la valeur correspondante à ton Enum TripStatus (ex: 'OPEN', 'PLANNED')

      // Les champs createdAt/updatedAt sont normalement gérés par Prisma/DB
    },
  });

  revalidatePath("/admin/circuits");
  revalidatePath("/voyages");
  redirect("/admin/circuits?success=true");
}

// --- MODIFICATION D'UN CIRCUIT---

export async function updateCircuit(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const destinationId = formData.get("destinationId") as string;
  const startDateStr = formData.get("startDate") as string;
  const duration = Number(formData.get("duration"));
  const price = Number(formData.get("price"));
  const maxCapacityValue = Number(formData.get("maxCapacity"));

  const startDate = new Date(startDateStr);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + duration);

  // Conversion explicite en nombre (Int)
  const circuitId = parseInt(id);

  await prisma.groupTrip.update({
    where: { id: circuitId },
    data: {
      title,
      description: formData.get("description") as string,
      startDate,
      endDate,
      capacity: maxCapacityValue, // On met à jour la capacité dispo
      priceBase: price,
      pricePremium: price * 1.2,
      pricePlatinium: price * 1.5,
      depositAmount: price * 0.3,
      destinationId: destinationId,
      // Note: On ne touche pas au 'program' ici, on fera une action dédiée
    },
  });

  revalidatePath("/admin/circuits");
  revalidatePath(`/admin/circuits/${id}`);
  redirect("/admin/circuits?success=true");
}

// --- SUPPRESSION D'UN CIRCUIT---
export async function deleteCircuit(id: string) {
  await prisma.groupTrip.delete({
    where: { id: parseInt(id) || id }, // S'adapte si ton ID est un nombre ou un string CUID
  });

  revalidatePath("/admin/circuits");
  redirect("/admin/circuits?deleted=true");
}
