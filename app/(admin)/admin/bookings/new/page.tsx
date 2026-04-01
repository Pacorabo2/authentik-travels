import prisma from "@/lib/prisma";
import Link from "next/link";
import BookingForm from "./_components/BOOKINGFORM";

export default async function NewManualBookingPage() {
  // On récupère les voyages de groupe disponibles pour le sélecteur
  const groupTrips = await prisma.groupTrip.findMany({
    where: { status: "PUBLISHED" },
    include: { destination: { select: { name: true } } },
    orderBy: { startDate: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-10">
        <Link
          href="/admin/bookings"
          className="text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors"
        >
          ← Retour aux réservations
        </Link>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 mt-4">
          Saisie <span className="text-amber-500">Manuelle</span>
        </h1>
        <p className="text-slate-400 text-sm mt-2 font-medium">
          Utilisez ce formulaire pour enregistrer un client (Sénior, virement,
          chèque).
        </p>
      </header>

      <BookingForm groupTrips={groupTrips} />
    </div>
  );
}
