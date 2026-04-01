"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLead(data: any) {
  try {
    // 1. Validation de sécurité minimale pour les dates
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return {
        success: false,
        error: "Les dates fournies ne sont pas valides.",
      };
    }

    // 2. Création du Lead dans Prisma
    const lead = await prisma.customLead.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        destination: data.destination,
        startDate: start,
        endDate: end,
        partySize: Number(data.partySize) || 1,
        budget: data.budget,
        experienceType: data.experienceType,
        additionalNotes: data.additionalNotes || "",
        status: "NEW",
      },
    });

    // 3. Mise à jour du cache de l'admin
    // Cela permet que la demande apparaisse direct dans ton tableau de bord sans refresh
    revalidatePath("/admin/leads");

    return {
      success: true,
      id: lead.id,
      message: "Demande enregistrée avec succès.",
    };
  } catch (error: any) {
    // Log précis pour le développeur (toi)
    console.error("❌ Erreur Prisma Lead:", error.message);

    return {
      success: false,
      error:
        "Désolé, une erreur technique empêche l'envoi de votre demande. Veuillez nous contacter directement.",
    };
  }
}
