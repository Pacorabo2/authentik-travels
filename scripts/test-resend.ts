// scripts/test-resend.ts
import { config } from "dotenv";

// 1. Charger les variables d'environnement (.env.local) AVANT toute importation de module
config({ path: ".env.local" });

async function runTest() {
  console.log("🔄 Démarrage du test d’envoi d’e-mail via Resend...");

  // 2. Importation dynamique de lib/mail après le chargement des variables d'environnement
  const { sendGuideEmail } = await import("../lib/mail");

  const testRecipient = "info@authentika.io";

  try {
    const result = await sendGuideEmail(testRecipient);

    if (result && "data" in result && result.data) {
      console.log("✅ Succès ! L’e-mail a bien été envoyé.");
      console.log("📄 ID unique du message Resend :", result.data.id);
      console.log("📬 Vérifie ta boîte de réception :", testRecipient);
    } else {
      console.log("⚠️ Réponse reçue de l’API :", result);
    }
  } catch (error) {
    console.error("❌ Erreur lors de l’exécution du script :", error);
  }
}

// 3. Exécution du test
runTest();
