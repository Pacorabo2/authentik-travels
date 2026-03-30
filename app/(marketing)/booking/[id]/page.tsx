import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
// On utilise un chemin relatif pour être sûr de le trouver
import BookingZone from "../../../../components/BookingZone";
import Image from "next/image";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const trip = await prisma.groupTrip.findUnique({
    where: { id: id },
    include: {
      destination: true,
      bookings: true,
    },
  });

  if (!trip) return notFound();

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8 lg:sticky lg:top-32">
            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
              Finaliser votre <br />
              <span className="text-amber-500">immersion</span>
            </h1>

            <div className="relative h-[400px] w-full rounded-[3rem] overflow-hidden shadow-2xl bg-slate-200">
              <Image
                src={trip.destination.imageUrl || "/placeholder.jpg"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                alt={trip.title}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <span className="text-amber-500 font-black uppercase tracking-widest text-xs">
                  {trip.destination.name}
                </span>
                <h2 className="text-3xl font-black italic uppercase mt-2 leading-none">
                  {trip.title}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Départ
                </p>
                <p className="font-bold text-slate-900 mt-1">
                  {new Date(trip.startDate).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Durée
                </p>
                <p className="font-bold text-slate-900 mt-1">
                  {trip.duration} jours
                </p>
              </div>
            </div>
          </div>

          <div>
            <BookingZone trip={trip} />
          </div>
        </div>
      </div>
    </main>
  );
}
