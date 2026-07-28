// scripts/check-dns.ts
import { promises as dns } from "dns";

/**
 * Script de diagnostic DNS pour valider les enregistrements OVH avant envoi via Resend.
 */
async function checkDnsRecords() {
  console.log(
    "🔍 Diagnostic des enregistrements DNS pour send.authentika.io...\n",
  );

  const domain = "send.authentika.io";
  const dkimDomain = "resend._domainkey.send.authentika.io";

  // 1. Vérification de l'enregistrement TXT (SPF)
  try {
    const txtRecords = await dns.resolveTxt(domain);
    console.log("✅ Enregistrements TXT trouvés pour", domain, ":");
    txtRecords.forEach((record) => {
      console.log("   ➔", record.join(""));
    });
  } catch (error) {
    console.log("❌ Aucun enregistrement TXT trouvé pour", domain);
  }

  console.log("--------------------------------------------------");

  // 2. Vérification de l'enregistrement DKIM
  try {
    const dkimRecords = await dns.resolveTxt(dkimDomain);
    console.log("✅ Enregistrement DKIM trouvé pour", dkimDomain, ":");
    dkimRecords.forEach((record) => {
      console.log("   ➔", record.join("").substring(0, 60) + "...");
    });
  } catch (error) {
    console.log("❌ Aucun enregistrement DKIM trouvé pour", dkimDomain);
  }

  console.log("--------------------------------------------------");

  // 3. Vérification de l'enregistrement MX
  try {
    const mxRecords = await dns.resolveMx(domain);
    console.log("✅ Enregistrements MX trouvés pour", domain, ":");
    mxRecords.forEach((record) => {
      console.log(
        `   ➔ Priorité: ${record.priority}, Exchange: ${record.exchange}`,
      );
    });
  } catch (error) {
    console.log("❌ Aucun enregistrement MX trouvé pour", domain);
  }
}

// Exécution du diagnostic
checkDnsRecords();
