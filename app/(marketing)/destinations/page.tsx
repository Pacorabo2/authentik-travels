import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { renderDescription } from "@/lib/text-utils";

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="bg-white min-h-screen">
      {/* SECTION A : HERO (Inchangé pour la cohérence) */}
      <section className="relative h-[100vh] -mt-[80px] w-full flex items-center justify-center bg-slate-900 overflow-hidden">
        <Image
          src="https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/_DSC9533.JPG"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
          alt="Destinations Authentik"
        />
        <div className="absolute z-10 w-full h-full bg-black/45"></div>
        <div className="relative z-11 text-center px-4">
          <span className="text-amber-500 font-black uppercase tracking-[0.2em] text-base mb-4 block animate-fade-in">
            Explorez
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-medium leading-none">
            Nos destinations
            <span className="text-amber-500 text-7xl md:text-9xl">.</span>
          </h1>
        </div>

        {/* DÉGRADÉ SUBTILE (128px) VERS LE BLANC */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* SECTION B : LES SECTIONS PAYS EN DEUX COLONNES */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="space-y-48">
            {" "}
            {/* Espacement massif entre les pays pour l'élégance */}
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start group"
              >
                {/* COLONNE GAUCHE : LE CONTENEUR STICKY */}
                <div className="lg:sticky lg:top-32 relative h-[50vh] h-fit md:h-[65vh] w-full overflow-hidden rounded-[3.5rem] shadow-2xl transition-all duration-700">
                  {/* ENVELOPPE RELATIVE POUR L'IMAGE*/}
                  <div className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden rounded-[3.5rem] shadow-2xl">
                    <Image
                      src={dest.imageUrl || "/placeholder-country.jpg"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
                      alt={dest.name}
                    />
                  </div>
                </div>

                {/* COLONNE DROITE : LE TEXTE AVEC LE GUIDE JAUNE */}
                <div className="space-y-8 flex flex-col justify-center">
                  <div className="space-y-3">
                    <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block italic">
                      {dest.tagline}
                    </span>
                    <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-medium leading-none mb-6">
                      {dest.name}
                    </h2>
                  </div>

                  {/* LE TRAIT JAUNE ET LE TEXTE AÉRÉ */}
                  <div className="border-l-4 border-amber-500 pl-8 py-2 text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                    {renderDescription(dest.description)}
                  </div>

                  <div className="pt-12">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-6 bg-slate-900 text-white px-12 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-amber-500 transition-all duration-300 shadow-xl shadow-slate-200 group/btn"
                    >
                      Explorer {dest.name}
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
