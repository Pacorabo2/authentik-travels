"use server";

import { sendApplicationEmail } from "@/lib/mail";

export async function handleAmbassadorApply(data: any) {
  try {
    const { data: mailData, error } = await sendApplicationEmail(data);

    if (error) {
      console.error("Erreur Resend:", error);
      return { success: false };
    }

    return { success: true };
  } catch (err) {
    return { success: false };
  }
}
