// components/TripCard.tsx
import Image from "next/image"; // Importation critique
import Link from "next/link";

export default function TripCard({ trip }: { trip: any }) {
  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm group border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
      {/* Conteneur de l'image avec ratio fixe */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={trip.imageUrl} // Ex: '/images/safari.jpg'
          alt={`Immersion ${trip.title}`}
          fill // Remplit le conteneur parent
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-w-788px) 108vw, (max-w-1200px) 50vw, 33vw" // Dit au navigateur quelle taille charger
          priority={trip.isHero} // Charge instantanément si c'est la première image de la page
        />
      </div>

      {/* Texte et Infos */}
      <div className="p-8">
        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
          {trip.duration}
        </span>
        <h3 className="text-2xl font-black mt-3 mb-6 leading-none tracking-tight text-slate-900">
          {trip.title}
        </h3>
        {/* ... reste de la carte ... */}
      </div>
    </div>
  );
}
