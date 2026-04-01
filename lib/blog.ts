// lib/blog.ts
import prisma from "@/lib/prisma";

// 1. Pour la page LISTE (Affiche tous les articles)
export async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: { destination: true },
    orderBy: { createdAt: "desc" },
  });
}

// 2. Pour la page DÉTAIL (Affiche un article + ses circuits liés)
export async function getPostBySlug(slug: string) {
  return await prisma.post.findUnique({
    where: { slug },
    include: {
      destination: {
        include: {
          circuits: {
            where: { isPublished: true },
            take: 2, // Pour afficher les circuits suggérés en bas d'article
          },
        },
      },
    },
  });
}
