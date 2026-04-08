import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import TripItinerary from "@/components/TripItinerary";
import Image from "next/image";
import Link from "next/link";

export default async function GroupTripDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const trip = await prisma.groupTrip.findUnique({
    where: { slug },
    include: { destination: true },
  });

  if (!trip) return notFound();

  const isFull = trip.status === "FULL";

  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative h-[100vh] -mt-[80px] bg-slate-900 flex items-center justify-center">
        <Image
          src={trip.destination.imageUrl || "/default.jpg"}
          fill
          className="object-cover opacity-50"
          alt={trip.title}
        />
        <div className="absolute z-10 w-full h-full bg-black/45"></div>
        <div className="relative z-10 text-center px-4">
          <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-sm mb-4 block">
            Voyage de Groupe Thématique
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-medium leading-none">
            {trip.title} <span className="text-amber-500">.</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* INFOS CLÉS & PRÉSENTATION */}
      <section className="container mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex gap-4 items-center">
            <div className="bg-amber-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">
              {trip.destination.name}
            </div>
            <div className="text-slate-400 font-bold text-sm italic">
              Du {new Date(trip.startDate).toLocaleDateString()} au{" "}
              {new Date(trip.endDate).toLocaleDateString()}
            </div>
          </div>
          <p className="text-2xl text-slate-700 leading-relaxed font-medium italic decoration-amber-500 underline-offset-8">
            {trip.description}
          </p>

          <div className="pt-10">
            <TripItinerary program={trip.program} />
          </div>
        </div>

        {/* BOX DE RÉSERVATION */}
        <div className="bg-slate-50 p-10 rounded-[3rem] h-fit border border-slate-100 shadow-sm sticky top-24">
          <div className="space-y-6">
            <div className="pb-6 border-b border-slate-200">
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-1">
                Tarif unique
              </p>
              <p className="text-5xl font-black text-slate-900">
                {trip.priceBase}€
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <Link
                href={isFull ? "#" : `/booking/${trip.id}`}
                className={`block w-full text-center py-6 rounded-2xl font-black uppercase tracking-widest transition-all ${
                  isFull
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-slate-900 text-white hover:bg-amber-500 shadow-xl shadow-slate-200"
                }`}
              >
                {isFull ? "Voyage Complet" : "Réserver ma place"}
              </Link>
              <p className="text-[10px] text-center text-slate-400 uppercase font-black tracking-widest">
                Acompte de{" "}
                {trip.depositAmount || (trip.priceBase * 0.3).toFixed(0)}€ à la
                réservation
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
