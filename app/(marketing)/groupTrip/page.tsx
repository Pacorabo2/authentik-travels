import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users } from "lucide-react";

export default async function GroupTripsPage() {
  const groupTrips = await prisma.groupTrip.findMany({
    where: { status: "PUBLISHED" },
    include: { destination: true },
    orderBy: { startDate: "asc" },
  });

  // Fonction utilitaire pour dynamiser la couleur des pastilles par pays
  const getCountryColor = (countryName: string) => {
    const colors: { [key: string]: string } = {
      Cuba: "bg-blue-600",
      Colombie: "bg-yellow-500",
      "Costa Rica": "bg-emerald-600",
      "République Dominicaine": "bg-red-600",
    };
    return colors[countryName] || "bg-slate-800"; // Couleur par défaut
  };

  return (
    <main className="bg-white min-h-screen">
      {/* SECTION A : HERO INSPIRANT */}
      <section className="relative h-[90vh] -mt-[80px] w-full flex items-center justify-center bg-slate-900">
        <Image
          src="https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/AUTENTIK%20(92%20de%20143).jpg"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
          alt="Voyages de groupe Authentik"
        />
        <div className="relative z-10 text-center px-4">
          <span className="text-amber-500 font-black uppercase tracking-[0.em] text-base mb-4 block">
            Exprériences Immersives
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-medium leading-none">
            Nos Voyages
            <span className="text-amber-500">.</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* SECTION B : LISTE DES DÉPARTS */}
      <section className="container mx-auto px-6 py-20">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900">
            Nos prochains <span className="text-amber-500">départs</span>
          </h2>
          <div className="h-1.5 w-24 bg-slate-900 mt-4"></div>
          <p className="text-slate-400 mt-8 max-w-2xl font-medium text-lg leading-relaxed">
            Rejoignez nos départs thématiques accompagnés par nos ambassadeurs.
            <br />
            Découvrez la culture et faites des rencontres authentiques en petit
            comité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {groupTrips.map((trip) => (
            <div
              key={trip.id}
              className="group flex flex-col bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 h-full"
            >
              {/* IMAGE DE LA CARTE */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={trip.destination.imageUrl || "/placeholder.jpg"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt={trip.title}
                />
                {/* PASTILLE PAYS DYNAMIQUE */}
                <div className="absolute top-8 left-8">
                  <span
                    className={`${getCountryColor(trip.destination.name)} text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg`}
                  >
                    {trip.destination.name}
                  </span>
                </div>
              </div>

              {/* CONTENU TEXTUEL */}
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-amber-500 font-black uppercase text-[10px] tracking-widest mb-4">
                  <Calendar size={14} strokeWidth={3} />
                  <span>
                    {new Date(trip.startDate).toLocaleDateString("fr-FR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="text-3xl font-black italic uppercase leading-none text-slate-900 mb-4 min-h-[60px]">
                  {trip.title}
                </h3>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-6">
                  <Users size={16} />
                  <span>Capacité : {trip.capacity} personnes</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-6">
                  <MapPin size={14} />
                  <span>{trip.duration} jours d&apos;immersion</span>
                </div>

                {/* PRIX DIRECT */}
                <div className="mb-8 pt-6 border-t border-slate-50">
                  <p className="text-4xl font-black text-slate-900">
                    {trip.priceBase}€
                    <span className="text-sm text-slate-400 font-medium ml-2 italic">
                      / pers.
                    </span>
                  </p>
                </div>

                {/* BOUTON RÉSERVER CENTRÉ */}
                <Link
                  href={`/groupTrip/${trip.slug}`}
                  className="mt-auto block w-full text-center bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-amber-500 transition-all duration-300 shadow-xl shadow-slate-200"
                >
                  Réserver ma place
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
