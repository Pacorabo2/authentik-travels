import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    // C'est ici que l'URL est maintenant gérée pour les commandes CLI
    url: process.env.DATABASE_URL,
  },
});
