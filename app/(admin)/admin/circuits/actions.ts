"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- CRÉATION D'UN CIRCUIT ---
export async function createCircuit(formData: FormData) {
  const title = formData.get("title") as string;
  const destinationId = formData.get("destinationId") as string;
  const duration = Number(formData.get("duration"));
  const price = Number(formData.get("price"));

  // 1. Extraction dynamique de l'itinéraire (ItineraryBuilder)
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

  // 2. Génération du slug
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  // 3. Insertion dans la base (Uniquement les champs valides pour la table Circuit)
  await prisma.circuit.create({
    data: {
      title,
      slug,
      description: formData.get("description") as string,
      duration,
      program: program,
      priceBase: price,
      pricePremium: price * 1.2,
      pricePlatinium: price * 1.5,
      destinationId: destinationId,
      // Note: startDate, endDate, capacity et status sont pour la table GroupTrip, pas Circuit
    },
  });

  revalidatePath("/admin/circuits");
  revalidatePath("/voyages"); // Chemin public
  redirect("/admin/circuits?success=true");
}

// --- MODIFICATION D'UN CIRCUIT ---
export async function updateCircuit(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const duration = Number(formData.get("duration"));
  const price = Number(formData.get("price"));
  const destinationId = formData.get("destinationId") as string;

  // 1. Reconstruction du programme
  const itineraryCount = Number(formData.get("itineraryCount") || 0);
  const program = [];

  for (let i = 0; i < itineraryCount; i++) {
    const dTitle = formData.get(`day-title-${i}`) as string;
    const dDesc = formData.get(`day-desc-${i}`) as string;

    if (dTitle || dDesc) {
      program.push({
        day: i + 1,
        title: dTitle || "",
        description: dDesc || "",
      });
    }
  }

  // 2. Mise à jour Prisma
  await prisma.circuit.update({
    where: { id: id },
    data: {
      title,
      description,
      duration,
      destinationId,
      program: program,
      priceBase: price,
      pricePremium: price * 1.2,
      pricePlatinium: price * 1.5,
    },
  });

  revalidatePath("/admin/circuits");
  revalidatePath(`/admin/circuits/${id}`);
  redirect("/admin/circuits?success=true");
}

// --- SUPPRESSION ---
export async function deleteCircuit(id: string) {
  await prisma.circuit.delete({
    where: { id: id },
  });

  revalidatePath("/admin/circuits");
  redirect("/admin/circuits?deleted=true");
}
