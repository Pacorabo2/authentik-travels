import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function DestinationsPage() {
  // On récupère toutes les destinations pour les lister
  const destinations = await prisma.destination.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="bg-white min-h-screen">
      {/* HERO DE LA PAGE LISTE */}
      <section className="bg-slate-900 py-24 px-6 text-center">
        <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">
          Explorez le monde
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter">
          Nos{" "}
          <span className="text-amber-500 text-6xl md:text-8xl">
            Destinations
          </span>
        </h1>
      </section>

      {/* GRILLE DES PAYS */}
      <section className="container mx-auto py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 duration-500"
            >
              {/* Image de fond du pays */}
              <Image
                src={
                  dest.imageUrl ||
                  "https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/_DSC3127.JPG"
                }
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                alt={dest.name}
              />

              {/* Overlay dégradé pour la lisibilité */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80" />

              {/* Infos du pays */}
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <span className="text-amber-500 font-black uppercase tracking-widest text-sm mb-2 block">
                  {dest.tagline}
                </span>
                <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-4">
                  {dest.name}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">
                    Nos circuits →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {destinations.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 italic">
              Chargement des destinations...
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
