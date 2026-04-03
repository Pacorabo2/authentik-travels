import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="bg-white min-h-screen">
      {/* SECTION A : HERO (Inchangé pour la cohérence) */}
      <section className="relative h-[90vh] -mt-[80px] w-full flex items-center justify-center bg-slate-900 overflow-hidden">
        <Image
          src="https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/_DSC9533.JPG"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
          alt="Destinations Authentik"
        />
        <div className="relative z-10 text-center px-4">
          <span className="text-amber-500 font-black uppercase tracking-[0.2em] text-base mb-4 block animate-fade-in">
            Explorez nos
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-medium leading-none">
            Nos Destinations
            <span className="text-amber-500 text-7xl md:text-9xl">.</span>
          </h1>
        </div>

        {/* DÉGRADÉ SUBTILE (128px) VERS LE BLANC */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* SECTION B : LES SECTIONS PAYS EN DEUX COLONNES */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-20">
          <div className="space-y-32">
            {" "}
            {/* Grand espace entre les pays */}
            {destinations.map((dest, index) => (
              <div
                key={dest.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center group"
              >
                {/* COLONNE GAUCHE : LA PHOTO */}
                <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full overflow-hidden rounded-[3rem] shadow-2xl transition-all duration-700 hover:-translate-y-2">
                  <Image
                    src={dest.imageUrl || "/placeholder-country.jpg"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    alt={dest.name}
                  />
                  {/* Petit overlay sombre en bas pour le style */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>

                {/* COLONNE DROITE : LE TEXTE */}
                <div className="space-y-8 flex flex-col justify-center">
                  <div className="space-y-3">
                    {/* Numérotation élégante (01, 02, etc.) */}
                    <span className="text-amber-500 font-black text-5xl opacity-30 block italic tracking-tighter">
                      0{index + 1}
                    </span>
                    <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-sm block">
                      {dest.tagline}
                    </span>
                    <h2 className="text-6xl md:text-8xl font-black text-slate-900 italic uppercase tracking-tighter leading-none group-hover:text-amber-500 transition-colors">
                      {dest.name}
                    </h2>
                  </div>

                  <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                    {dest.description}
                  </p>

                  <div className="pt-8">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-6 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-amber-500 transition-all duration-300 shadow-xl shadow-slate-200 group/btn"
                    >
                      Découvrir cette destination
                      <span className="group-hover/btn:translate-x-2 transition-transform">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
