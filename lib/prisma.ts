// lib/prisma.ts
import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client";

// 1. On récupère le lien de la base de données
const connectionString = process.env.DATABASE_URL!;

// 2. On configure le pilote PostgreSQL
const pool = new Pool({ connectionString });
// On transforme 'pool' en 'unknown' d'abord, puis on force le type attendu par PrismaPg
const adapter = new PrismaPg(pool as unknown as never);

// 3. LA CORRECTION EST ICI : On passe uniquement l'adapter, plus de "datasources" !
const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
