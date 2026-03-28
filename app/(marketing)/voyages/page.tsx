import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function VoyagesCatalogue() {
  const destinations = await prisma.destination.findMany({
    where: { isPublished: true },
    include: {
      _count: {
        select: { soloTrips: true, groupTrips: true },
      },
    },
  });

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-6 pt-32">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-slate-900 leading-none">
            Explorer le monde<span className="text-amber-500">.</span>
          </h1>
          <p className="text-slate-500 text-xl mt-6 max-w-2xl font-medium">
            Découvrez nos destinations authentiques, entre immersion culturelle
            et aventure humaine.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/voyages/${dest.slug}`}
              className="group relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <Image
                src={
                  dest.presentationImg ||
                  "https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/_DSC3127.JPG"
                }
                fill
                alt={dest.name}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-90" />

              <div className="absolute bottom-12 left-12 right-12 text-white">
                <p className="text-amber-400 font-bold text-sm uppercase tracking-[0.2em] mb-3">
                  {dest._count.soloTrips} circuits • {dest._count.groupTrips}{" "}
                  départs
                </p>
                <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-4">
                  {dest.name}
                </h2>
                <div className="w-12 h-1.5 bg-white rounded-full transition-all duration-500 group-hover:w-24 group-hover:bg-amber-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
