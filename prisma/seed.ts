// prisma/seed.ts
import { PrismaClient } from "../generated/client"; // On pointe vers le dossier local généré

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seeding...");

  // 1. Création de la Destination Cuba
  const cuba = await prisma.destination.upsert({
    where: { slug: "cuba" },
    update: {},
    create: {
      name: "Cuba",
      slug: "cuba",
      tagline: "L’île crocodile au rythme de la salsa.",
      heroVideoUrl:
        "@/public/videos/colombie.mp4",
      presentationImg:
        "https://images.unsplash.com/photo-1503192851959-c6da8ac80cff?q=80&w=2000",
      description: `Une terre de contrastes où le temps semble s'être arrêté. 
      Authentik Travels vous emmène au-delà des clichés, dans les "casas particulares" 
      pour partager le café avec les locaux et danser au cœur de la Havane.`,
      isPublished: true,
    },
  });

  // 2. Création d'un Solo Trip lié à Cuba
  await prisma.soloTrip.upsert({
    where: { slug: "essence-cuba-vinales" },
    update: {},
    create: {
      title: "Essence de Cuba : De la Havane à Viñales",
      slug: "essence-cuba-vinales",
      description:
        "Un itinéraire de 10 jours entre architecture coloniale et mogotes verdoyants.",
      duration: 10,
      priceBase: 1290,
      imageUrl:
        "https://images.unsplash.com/photo-1506452815418-60bb4d35e76a?q=80&w=1000",
      destinationId: cuba.id,
      isPublished: true,
    },
  });

  console.log("✅ Seeding terminé avec succès !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
