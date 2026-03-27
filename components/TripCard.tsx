import Image from "next/image";
import Link from "next/link";

export default function TripCard({ trip }: { trip: any }) {
  // Calcul de la durée
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const days = Math.ceil(
    Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );
  const nights = days - 1;

  // Formatage prix
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(trip.priceBase);

  return (
    <div className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full">
      {/* IMAGE OPTIMISÉE NEXT/IMAGE */}
      <div className="aspect-[4/5] relative overflow-hidden bg-slate-200">
        <Image
          src={trip.flyerUrl || "/placeholder-travel.jpg"}
          alt={trip.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
          priority={trip.index < 2}
        />
        {/* Badge Pays */}
        {trip.country && (
          <div className="absolute top-6 left-6 z-10">
            <div className="flex items-center bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
              <span className="text-xs font-black uppercase tracking-widest text-slate-800">
                📍 {trip.country}
              </span>
            </div>
          </div>
        )}

        {/* Badge Prix */}
        <div className="absolute bottom-6 right-6 bg-slate-900/90 backdrop-blur-lg text-white px-5 py-2 rounded-2xl font-black text-lg shadow-lg">
          {formattedPrice}
        </div>
      </div>

      {/* CONTENU */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-4">
          <span>{days} Jours</span>
          <span>•</span>
          <span>{nights} Nuits</span>
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-6 leading-tight group-hover:text-amber-600 transition-colors">
          {trip.title}
        </h3>

        <div className="space-y-4 mb-8 flex-grow">
          <div className="flex items-center text-slate-500 text-sm font-medium">
            <span className="mr-3 opacity-50 text-lg">📅</span>
            {start.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="flex items-center text-slate-500 text-sm font-medium">
            <span className="mr-3 opacity-50 text-lg">👥</span>
            {trip.capacity > 0 ? (
              `${trip.capacity} places dispos`
            ) : (
              <span className="text-red-500 font-bold">COMPLET</span>
            )}
          </div>
        </div>

        <Link
          href={`/voyages/${trip.slug}`}
          className="flex items-center justify-center w-full py-5 rounded-[1.5rem] bg-slate-900 text-white font-black text-sm uppercase tracking-widest group-hover:bg-amber-500 transition-all duration-300"
        >
          Découvrir l&apos;itinéraire
        </Link>
      </div>
    </div>
  );
}
