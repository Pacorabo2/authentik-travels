import Link from "next/link";
import prisma from "@/lib/prisma";
import TripCard from "@/components/TripCard";

export default async function VoyagesPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string; sort?: string }>;
}) {
  const params = await searchParams;

  // Récupération des données
  const trips = await prisma.groupTrip.findMany({
    where: {
      status: "PUBLISHED",
      ...(params.destination ? { country: params.destination } : {}),
    },
    orderBy: {
      startDate: "asc",
    },
  });

  const countries = [
    "Cuba",
    "Colombie",
    "République Dominicaine",
    "Costa Rica",
  ];

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER & FILTRES */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter text-slate-900">
              NOS PROCHAINS DÉPARTS<span className="text-amber-500">.</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/voyages"
              className="px-5 py-2.5 bg-white rounded-full text-xs font-black uppercase tracking-widest border border-slate-100 hover:border-amber-500 transition-all"
            >
              Toutes
            </Link>
            {countries.map((c) => (
              <Link
                key={c}
                href={`/voyages?destination=${c}`}
                className="px-5 py-2.5 bg-white rounded-full text-xs font-black uppercase tracking-widest border border-slate-100 hover:border-amber-500 transition-all"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>

        {/* GRILLE DE CARTES (PROPRE ET DYNAMIQUE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </main>
  );
}
