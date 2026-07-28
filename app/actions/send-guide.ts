// app/actions/send-guide.ts
"use server";

import { sendGuideEmail } from "@/lib/mail";

/**
 * Server Action pour traiter la demande d'envoi du Guide Ambassadeur.
 *
 * @param formData - Les données envoyées depuis le formulaire React
 * @returns Un objet contenant le statut de succès et un message d'erreur éventuel
 */
export async function handleGuideRequest(formData: FormData) {
  // 1. Récupération de l'adresse e-mail depuis le formulaire
  const email = formData.get("email") as string;

  // 2. Validation de l'adresse e-mail côté serveur
  if (!email || !email.includes("@")) {
    return {
      success: false,
      error: "Veuillez fournir une adresse e-mail valide.",
    };
  }

  try {
    // 3. Envoi de l'e-mail via le module lib/mail.ts
    const { data, error } = await sendGuideEmail(email);

    // 4. Traitement des erreurs renvoyées par Resend
    if (error) {
      console.error("❌ Erreur de réponse Resend :", error);
      return {
        success: false,
        error: "Impossible d'envoyer l'e-mail pour le moment.",
      };
    }

    // 5. Retour de succès pour mettre à jour l'interface utilisateur
    return { success: true };
  } catch (err) {
    console.error("💥 CRASH SERVEUR lors de l'envoi du guide :", err);
    return {
      success: false,
      error: "Une erreur serveur est survenue. Veuillez réessayer.",
    };
  }
}
