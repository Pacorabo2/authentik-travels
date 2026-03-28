"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateDestination(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const tagline = formData.get("tagline") as string;
  const description = formData.get("description") as string;
  const heroVideoUrl = formData.get("heroVideoUrl") as string;
  const presentationImg = formData.get("presentationImg") as string;
  const isPublished = formData.get("isPublished") === "on";

  await prisma.destination.update({
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

  // On demande à Next.js de rafraîchir les pages pour voir les changements
  revalidatePath("/voyages");
  revalidatePath(`/voyages/${formData.get("slug")}`);

  redirect("/admin/destinations");
}
