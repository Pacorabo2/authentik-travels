"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const destinationId = formData.get("destinationId") as string;

  // Génération automatique du slug
  const slug = title
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  await prisma.post.create({
    data: {
      title,
      slug,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      mainImage: formData.get("mainImage") as string,
      category: formData.get("category") as string,
      readingTime: parseInt(formData.get("readingTime") as string) || 5,
      metaTitle: formData.get("metaTitle") as string,
      metaDescription: formData.get("metaDescription") as string,
      published: formData.get("published") === "true",
      featured: formData.get("featured") === "true",
      destinationId: destinationId === "none" ? null : destinationId,
      authorName:
        (formData.get("authorName") as string) || "L'équipe Authentik",
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updatePost(id: string, formData: FormData) {
  const title = formData.get("title") as string;

  await prisma.post.update({
    where: { id },
    data: {
      title,
      // On ne recalcule pas le slug par défaut pour éviter de casser les liens SEO existants
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      mainImage: formData.get("mainImage") as string,
      category: formData.get("category") as string,
      readingTime: parseInt(formData.get("readingTime") as string) || 5,
      metaTitle: formData.get("metaTitle") as string,
      metaDescription: formData.get("metaDescription") as string,
      published: formData.get("published") === "true",
      featured: formData.get("featured") === "true",
      destinationId:
        formData.get("destinationId") === "none"
          ? null
          : (formData.get("destinationId") as string),
      authorName: formData.get("authorName") as string,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${formData.get("slug")}`);
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({
      where: { id },
    });

    // On purgera le cache des pages concernées
    revalidatePath("/blog");
    revalidatePath("/admin/blog");

    // Pas besoin de redirect ici si on reste sur la liste,
    // revalidatePath s'occupe de mettre à jour l'affichage.
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    throw new Error("Impossible de supprimer l'article.");
  }
}
