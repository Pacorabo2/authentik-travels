// lib/mail.ts
import { Resend } from "resend";

// Adresse d'expédition alignée avec le domaine déclaré sur le tableau de bord Resend
const FROM_EMAIL = "Authentik Travels <info@send.authentika.io>";

/**
 * Helper d'initialisation du client Resend.
 * Permet de charger la clé API au moment exact de l'exécution.
 */
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "❌ La clé d'API RESEND_API_KEY est manquante dans .env.local",
    );
  }
  return new Resend(apiKey);
}

/**
 * Envoie un e-mail de confirmation de réservation.
 *
 * @param userEmail - Adresse e-mail du client destinataire
 * @param userName - Nom complet du client
 * @param tripTitle - Intitulé du voyage réservé
 */
export const sendConfirmationEmail = async (
  userEmail: string,
  userName: string,
  tripTitle: string,
) => {
  try {
    const resend = getResendClient();
    return await resend.emails.send({
      from: FROM_EMAIL,
      to: [userEmail, "info@authentika.io"],
      subject: `Confirmation de réservation : ${tripTitle} 🌴`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h1>Merci pour votre confiance, ${userName} !</h1>
          <p>Votre acompte pour l'immersion <strong>${tripTitle}</strong> a bien été reçu.</p>
          <p>L'équipe Authentik Travels prépare déjà votre arrivée.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de la confirmation :", error);
    return { success: false, error };
  }
};

/**
 * Envoie l'e-mail contenant le lien vers le Guide PDF Ambassadeur.
 *
 * @param email - Adresse e-mail du destinataire
 */
export const sendGuideEmail = async (email: string) => {
  const GUIDE_URL =
    "https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/Authentik%20Travels%20Marketing/Programme%20ambassador.pdf";

  try {
    const resend = getResendClient();
    return await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "🎒 Votre Guide Ambassadeur - Authentik Travels",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h1 style="color: #f59e0b;">Prêt pour l'aventure ?</h1>
          <p>Voici votre ressource pour découvrir notre programme :</p>
          <a href="${GUIDE_URL}" target="_blank" rel="noopener noreferrer"
             style="display: inline-block; background: #0f172a; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">
             Télécharger le Guide PDF
          </a>
        </div>
      `,
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi du guide :", error);
    return { success: false, error };
  }
};
