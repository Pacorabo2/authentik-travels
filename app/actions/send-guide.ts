// app/actions/send-guide.ts
"use server"
import { sendGuideEmail } from "@/lib/mail";

export async function handleGuideRequest(formData: FormData) {
  const email = formData.get("email") as string;
  
  try {
    const { data, error } = await sendGuideEmail(email);
    
    if (error) {
      console.error("Erreur Resend:", error);
      return { success: false, error: "Erreur lors de l'envoi." };
    }

    return { success: true }; // C'est ce 'success' que le composant cherche
  } catch (err) {
    console.log("💥 CRASH SERVEUR :", err);
    return { success: false, error: "Erreur serveur." };
  }
}