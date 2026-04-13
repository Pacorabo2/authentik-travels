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


export const sendApplicationEmail = async (data: {
  profile: string;
  audience: string;
  destination: string;
  timing?: string;
  whatsapp: string;
}) => {
  return await resend.emails.send({
    from: "Authentik Travels <onboarding@resend.dev>", // À remplacer par info@authentika.io après validation
    to: "info@authentika.io",
    subject: `🚀 Nouvelle Candidature Ambassadeur : ${data.profile}`,
    html: `
      <div style="font-family: sans-serif; color: #333; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
        <h2 style="color: #f59e0b; text-transform: uppercase;">Nouvelle Candidature reçue !</h2>
        <p>Un futur ambassadeur vient de remplir le formulaire de qualification :</p>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Profil :</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.profile}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Tribu estimée :</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.audience}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Destination :</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.destination}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>WhatsApp :</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
              <a href="https://wa.me/${data.whatsapp.replace(/\s+/g, '')}">${data.whatsapp}</a>
            </td>
          </tr>
        </table>

        <p style="margin-top: 20px; font-size: 12px; color: #999;">
          L'utilisateur a été redirigé vers Calendly après avoir validé ces infos.
        </p>
      </div>
    `,
  });
};
