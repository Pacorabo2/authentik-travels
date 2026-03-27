import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import BookingZone from "@/components/BookingZone"; // Le composant qu'on a créé au message précédent
import TrustSection from "@/components/TrustSection"; // Le composant de réassurance

export default async function VoyageDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 1. ATTENDRE les paramètres (Obligatoire en Next.js 15+)
  const { slug } = await params;

  // 1. RÉCUPÉRATION DU VOYAGE (Attention au nom du modèle GroupTrip)
  const trip = await prisma.groupTrip.findUnique({
    where: { slug: slug },
    include: {
      bookings: true,
    },
  });

  // Si le voyage n'existe pas ou n'est pas publié
  if (!trip || trip.status === "DRAFT") {
    return notFound();
  }

  // 2. CALCUL DES PLACES RESTANTES (Logique métier simple)
  const remainingPlaces = trip.capacity - trip.bookings.length;

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* HERO SECTION : VIDÉO OU IMAGE */}
      <section className="relative h-[60vh] w-full overflow-hidden bg-slate-900">
        {trip.heroVideoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          >
            <source src={trip.heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4 uppercase tracking-widest">
            {trip.country || "Destination Immersion"}
          </span>
          <h1 className="text-5xl md:text-7xl font-black italic text-white uppercase drop-shadow-2xl">
            {trip.title}
          </h1>
        </div>
      </section>

      {/* CONTENU PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLONNE GAUCHE : INFOS & PROGRAMME */}
          <div className="lg:col-span-2 space-y-8">
            {/* Carte Description */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black italic mb-4 text-slate-900">
                L&apos;Expérience
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                {trip.description}
              </p>
            </div>

            {/* Programme (JSON) */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black italic mb-6 text-slate-900">
                Le Programme
              </h2>
              <div className="space-y-6">
                {(trip.program as any[]).map((day, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-none w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-black italic">
                      J{index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xl">
                        {day.title}
                      </h4>
                      <p className="text-slate-500">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COMPOSANT DE RÉASSURANCE (TrustSection) */}
            <TrustSection />
          </div>

          {/* COLONNE DROITE : RÉSERVATION (BookingZone) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              {/* Badge Places restantes */}
              <div
                className={`p-4 rounded-2xl text-center font-bold ${
                  remainingPlaces <= 3
                    ? "bg-red-50 text-red-600 animate-pulse"
                    : "bg-green-50 text-green-600"
                }`}
              >
                {remainingPlaces > 0
                  ? `🔥 Plus que ${remainingPlaces} places disponibles !`
                  : "⌛ Voyage Complet"}
              </div>

              {/* LE COMPOSANT DE CHOIX DE PRIX & PAIEMENT */}
              <BookingZone trip={trip} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
