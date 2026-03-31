"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- CRÉATION D'UN CIRCUIT ---
export async function createCircuit(formData: FormData) {
  const title = formData.get("title") as string;
  const destinationId = formData.get("destinationId") as string;
  const startDateStr = formData.get("startDate") as string;
  const duration = Number(formData.get("duration"));
  const price = Number(formData.get("price"));
  const maxCapacity = Number(formData.get("maxCapacity"));

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

  // 2. Calcul des dates
  const startDate = new Date(startDateStr);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + duration);

  // 3. Génération du slug
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  // 4. Insertion dans la base
  await prisma.groupTrip.create({
    data: {
      title,
      slug,
      description: formData.get("description") as string,
      startDate,
      endDate,
      duration, // N'oublie pas d'ajouter ce champ s'il est dans ton schéma
      capacity: maxCapacity,

      // On insère le tableau d'objets construit plus haut
      program: program,

      priceBase: price,
      pricePremium: price * 1.2,
      pricePlatinium: price * 1.5,
      depositAmount: price * 0.3,

      destinationId: destinationId,
      status: "PLANNED", // Statut par défaut
    },
  });

  revalidatePath("/admin/circuits");
  revalidatePath("/groupTrip");
  redirect("/admin/circuits?success=true");
}

// --- MODIFICATION D'UN CIRCUIT ---
// (Note: Si tu utilises aussi ItineraryBuilder pour l'édition,
// il faudra appliquer la même logique de boucle ici)
export async function updateCircuit(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const destinationId = formData.get("destinationId") as string;
  const startDateStr = formData.get("startDate") as string;
  const duration = Number(formData.get("duration"));
  const price = Number(formData.get("price"));

  const startDate = new Date(startDateStr);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + duration);

  // On essaie de voir si l'itinéraire vient du Builder dynamique
  const itineraryCount = Number(formData.get("itineraryCount"));
  let program = [];

  if (itineraryCount > 0) {
    for (let i = 0; i < itineraryCount; i++) {
      program.push({
        day: i + 1,
        title: formData.get(`day-title-${i}`),
        description: formData.get(`day-desc-${i}`),
      });
    }
  } else {
    // Sinon on garde l'ancien système de secours
    const programRaw = formData.get("program") as string;
    program = programRaw ? JSON.parse(programRaw) : [];
  }

  await prisma.groupTrip.update({
    where: { id: id }, // Utilise l'ID tel quel si c'est un String (CUID/UUID)
    data: {
      title,
      description: formData.get("description") as string,
      startDate,
      endDate,
      duration,
      capacity: Number(formData.get("maxCapacity")),
      priceBase: price,
      pricePremium: price * 1.2,
      pricePlatinium: price * 1.5,
      depositAmount: price * 0.3,
      destinationId: destinationId,
      program: program,
    },
  });

  revalidatePath("/admin/circuits");
  revalidatePath(`/groupTrip/${formData.get("slug")}`);
  redirect("/admin/circuits?success=true");
}

// --- SUPPRESSION ---
export async function deleteCircuit(id: string) {
  await prisma.groupTrip.delete({
    where: { id: id },
  });

  revalidatePath("/admin/circuits");
  redirect("/admin/circuits?deleted=true");
}
