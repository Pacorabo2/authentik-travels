import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function VoyagesPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string; sort?: string }>;
}) {
  const params = await searchParams;

  // 1. Récupération des données avec filtres simples
  const trips = await prisma.groupTrip.findMany({
    where: {
      status: "PUBLISHED", // On remplace isPublished par le statut de l'Enum
      ...(params.destination ? { country: params.destination } : {}),
    },
    orderBy: {
      startDate: "asc", // Optionnel : pour afficher les voyages les plus proches en premier
    },
  });

  // Liste des pays pour les filtres (unique)
  const countries = [
    "Cuba",
    "Colombie",
    "République Dominicaine",
    "Costa Rica",
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* HEADER & FILTRES */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 italic">
              Nos Prochains Départs
            </h1>
            <p className="text-slate-500 mt-2 font-light">
              Des expériences authentiques, testées et approuvées.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/voyages"
              className="px-4 py-2 bg-white rounded-full text-sm border hover:border-amber-500 transition-colors"
            >
              Toutes
            </Link>
            {countries.map((c) => (
              <Link
                key={c}
                href={`/voyages?destination=${c}`}
                className="px-4 py-2 bg-white rounded-full text-sm border hover:border-amber-500 transition-colors"
              >
                {c}
              </Link>
            ))}
            <Link
              href="/voyages?sort=price-asc"
              className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
            >
              Prix ↑
            </Link>
          </div>
        </div>

        {/* GRILLE DE CARTES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {trips.map((trip) => {
            // Calcul humain des durées
            const start = new Date(trip.startDate);
            const end = new Date(trip.endDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const nights = days - 1;

            // Formatage prix (Ex: 1 890 €)
            const formattedPrice = new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }).format(trip.priceBase);

            return (
              <div
                key={trip.id}
                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
              >
                {/* Image & Badges */}
                <div className="aspect-[4/5] relative overflow-hidden bg-slate-200">
                  <img
                    src={trip.flyerUrl || ""}
                    alt={trip.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Pastille Pays - Dynamique et Stylisée */}
                  {trip.country && (
                    <div className="absolute top-5 left-5 z-10">
                      <div className="flex items-center bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/20">
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 mr-2">
                          📍
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-800">
                          {trip.country}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Badge Prix */}
                  <div className="absolute bottom-5 right-5 bg-slate-900/80 backdrop-blur-lg text-white px-5 py-2 rounded-2xl font-bold text-lg shadow-lg border border-white/10">
                    {formattedPrice}
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-8">
                  <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase mb-3">
                    <span>{days} Jours</span>
                    <span>•</span>
                    <span>{nights} Nuits</span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-amber-600 transition-colors">
                    {trip.title}
                  </h3>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-slate-500 text-sm">
                      <span className="mr-3 text-lg">📅</span>
                      {start.toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center text-slate-500 text-sm">
                      <span className="mr-3 text-lg">👥</span>
                      {trip.capacity > 0 ? (
                        `${trip.capacity} places disponibles`
                      ) : (
                        <span className="text-red-500 font-bold underline text-xs">
                          COMPLET
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/voyages/${trip.slug}`}
                    className="flex items-center justify-center w-full py-4 rounded-2xl bg-slate-900 text-white font-bold group-hover:bg-amber-600 transition-all duration-300"
                  >
                    Découvrir l&apos;itinéraire
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
