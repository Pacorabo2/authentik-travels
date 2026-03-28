"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createDestination(formData: FormData) {
  const name = formData.get("name") as string;
  // Nettoyage du nom pour créer l'URL (slug)
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Enlever les accents
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  await prisma.destination.create({
    data: {
      name,
      slug,
      tagline: formData.get("tagline") as string,
      description: formData.get("description") as string,
      heroVideoUrl: formData.get("heroVideoUrl") as string,
      presentationImg: formData.get("presentationImg") as string,
      isPublished: formData.get("isPublished") === "on",
    },
  });

  revalidatePath("/voyages");
  revalidatePath("/admin/destinations");
  redirect("/admin/destinations?success=true");
}

export async function updateDestination(id: string, formData: FormData) {
  // 1. On récupère les données du formulaire
  const name = formData.get("name") as string;
  const tagline = formData.get("tagline") as string;
  const description = formData.get("description") as string;
  const heroVideoUrl = formData.get("heroVideoUrl") as string;
  const presentationImg = formData.get("presentationImg") as string;
  const isPublished = formData.get("isPublished") === "on";

  // 2. On met à jour et on récupère la destination (pour avoir le slug)
  const updatedDest = await prisma.destination.update({
    where: { id },
    data: {
      name,
      tagline,
      description,
      heroVideoUrl,
      presentationImg,
      isPublished,
    },
  });

  // 3. On rafraîchit les caches avec le slug réel
  revalidatePath("/voyages"); // La liste
  revalidatePath(`/voyages/${updatedDest.slug}`); // La page spécifique (ex: /voyages/cuba)
  revalidatePath("/admin/destinations"); // La liste admin pour voir le changement de statut

  // 4. Redirection
  redirect("/admin/destinations?success=true");
}

export async function deleteDestination(id: string) {
  // 1. Suppression dans la base de données
  await prisma.destination.delete({
    where: { id },
  });

  // 2. Nettoyage du cache pour que le pays disparaisse partout
  revalidatePath("/admin/destinations");
  revalidatePath("/voyages");

  // 3. Retour à la liste avec un petit signal de succès
  redirect("/admin/destinations?deleted=true");
}
