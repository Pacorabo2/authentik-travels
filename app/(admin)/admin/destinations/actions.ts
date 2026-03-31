"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- CRÉATION ---
export async function createDestination(formData: FormData) {
  const name = formData.get("name") as string;
  
  // Génération du slug à partir du nom
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  await prisma.destination.create({
    data: {
      name,
      slug,
      tagline: formData.get("tagline") as string,
      description: formData.get("description") as string, // Attention à l'orthographe 'description' (vérifie si ta table n'a pas la faute 'descritpion' mentionnée dans ton message)
      heroVideoUrl: formData.get("heroVideoUrl") as string,
      imageUrl: formData.get("imageUrl") as string,
      currency1: formData.get("currency1") as string,
      currency2: formData.get("currency2") as string,
      // Note : createdAt et updatedAt sont gérés automatiquement par Prisma/DB
    },
  });

  revalidatePath("/voyages");
  revalidatePath("/admin/destinations");
  redirect("/admin/destinations?success=true");
}

// --- MODIFICATION ---
export async function updateDestination(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  
  const updatedDest = await prisma.destination.update({
    where: { id },
    data: {
      name,
      // On ne change généralement pas le slug en update pour ne pas casser le SEO des liens existants
      tagline: formData.get("tagline") as string,
      description: formData.get("description") as string,
      heroVideoUrl: formData.get("heroVideoUrl") as string,
      imageUrl: formData.get("imageUrl") as string,
      currency1: formData.get("currency1") as string,
      currency2: formData.get("currency2") as string,
    },
  });

  revalidatePath("/voyages");
  revalidatePath(`/voyages/${updatedDest.slug}`);
  revalidatePath("/admin/destinations");
  
  redirect("/admin/destinations?success=true");
}

// --- SUPPRESSION ---
export async function deleteDestination(id: string) {
  await prisma.destination.delete({
    where: { id },
  });

  revalidatePath("/admin/destinations");
  revalidatePath("/voyages");
  
  redirect("/admin/destinations?deleted=true");
}