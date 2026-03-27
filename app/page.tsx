import prisma from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import DoubleOfferSection from "@/components/DoubleOfferSection";
import StorytellingSection from "@/components/StoryTellingSection";
import CtaSection from "@/components/CtaSection";

export default async function Home() {
  // Récupération des voyages
  const trips = await prisma.groupTrip.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <HeroSection />
      {/* Transmission des données au sous-composant via la prop 'trips' */}
      <DoubleOfferSection trips={trips} />
      <StorytellingSection />
      <CtaSection />
    </main>
  );
}
