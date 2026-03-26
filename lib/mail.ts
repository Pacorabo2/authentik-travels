import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendConfirmationEmail = async (
  userEmail: string,
  userName: string,
  tripTitle: string,
) => {
  try {
    await resend.emails.send({
      from: "Authentik Travels <onboarding@resend.dev>", // Plus tard, tu mettras ton propre domaine
      to: [userEmail, "info@authentika.io"], // Envoi au client ET à toi
      subject: `Confirmation de réservation : ${tripTitle} 🌴`,
      html: `
        <h1>Merci pour votre confiance, ${userName} !</h1>
        <p>Votre acompte pour l'immersion <strong>${tripTitle}</strong> a bien été reçu.</p>
        <p>L'équipe Authentik Travels prépare déjà votre arrivée. Vous recevrez prochainement le carnet de voyage complet.</p>
        <hr />
        <p><em>Ceci est une confirmation automatique pour votre agence.</em></p>
      `,
    });
  } catch (error) {
    console.error("Erreur envoi email:", error);
  }
};
