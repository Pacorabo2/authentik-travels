// prisma.config.ts
import "dotenv/config"; // 1. OBLIGATOIRE en Prisma 7 : Force la lecture du fichier .env !
import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    // 2. Le "!" à la fin dit à VS Code : "Je te promets que cette variable n'est pas undefined"
    url: process.env.DATABASE_URL!,
  },
});
