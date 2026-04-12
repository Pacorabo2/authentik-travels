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

export const sendGuideEmail = async (email: string) => {
  const GUIDE_URL =
    "https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/Authentik%20Travels%20Marketing/Guide-des-tailles-STIHL.pdf";
  return await resend.emails.send({
    from: "Authentik Travels <onboarding@resend.dev>", // Plus tard, tu mettras ton propre domaine
    to: [email, "info@authentika.io"], // Envoi au client ET à toi
    subject: "🎒 Votre Guide Ambassadeur - Authentik Travels",
    html: `
      <div style="font-family: sans-serif; color: #333;">
        <h1 style="color: #f59e0b;">Prêt pour l'aventure ?</h1>
        <p>Merci de l'intérêt que vous portez à notre programme. Voici votre ressource :</p>
        <a href="${GUIDE_URL}" target="_blank" rel="noopener noreferrer"
           style="display: inline-block; background:#0f172a; color:#fff; padding:15px 25px; border-radius:10px; text-decoration:none; font-weight:bold;">
           Télécharger le Guide PDF
        </a>
        <p>À très vite sur les routes,</p>
        <p><strong>L'équipe Authentik</strong></p>
      </div>
    `,
  });
};
