"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(id: string, newStatus: string) {
  try {
    await prisma.customLead.update({
      where: { id },
      data: { status: newStatus },
    });

    revalidatePath("/admin/leads");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erreur lors de la mise à jour" };
  }
}

export async function getNewLeadsCount() {
  try {
    const count = await prisma.customLead.count({
      where: { status: "NEW" },
    });
    return count;
  } catch (error) {
    return 0;
  }
}
