import prisma from "@/lib/prisma";
import Link from "next/link";
import FlashMessage from "../destinations/_components/FlashMessage";
import DeleteGroupTripButton from "./_components/DeleteGroupTripButton";
import { Calendar, Users, Euro, Edit3, MapPin, Info } from "lucide-react";

// Fonction utilitaire pour le style des badges de statut
const getStatusStyle = (status: string) => {
  switch (status) {
    case "PUBLISHED":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "DRAFT":
      return "bg-slate-100 text-slate-400 border-slate-200";
    case "FULL":
      return "bg-rose-50 text-rose-600 border-rose-100";
    case "CANCELLED":
      return "bg-red-100 text-red-700 border-red-200";
    case "COMPLETED":
      return "bg-blue-50 text-blue-600 border-blue-100";
    default:
      return "bg-amber-50 text-amber-600 border-amber-100";
  }
};

export default async function AdminGroupTrips({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; deleted?: string }>;
}) {
  const { success, deleted } = await searchParams;

  // On récupère les voyages avec le compte des réservations associées
  const groupTrips = await prisma.groupTrip.findMany({
    include: {
      destination: true,
      _count: {
        select: { bookings: true },
      },
    },
    orderBy: { startDate: "asc" },
  });

  return (
    <div className="space-y-8 pb-20">
      {/* Alertes de succès/suppression */}
      {success === "true" && (
        <FlashMessage
          message="✅ Voyage de groupe créé avec succès !"
          type="success"
        />
      )}
      {deleted === "true" && (
        <FlashMessage
          message="🗑️ Voyage supprimé du catalogue."
          type="deleted"
        />
      )}

      {/* Header de la page */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
            Voyages de <span className="text-amber-500">Groupe</span>
          </h1>
          <p className="text-slate-500 mt-3 font-medium flex items-center gap-2">
            <Info size={16} className="text-amber-500" />
            {groupTrips.length} départs programmés. Gérez vos disponibilités en
            temps réel.
          </p>
        </div>

        <Link
          href="/admin/group-trips/new"
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 group"
        >
          Créer un nouveau départ
        </Link>
      </div>

      {/* Table des voyages */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-200">
            <tr>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400 text-center">
                Départ
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Voyage & Statut
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400 text-center">
                Remplissage
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Tarif Base
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {groupTrips.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs"
                >
                  Aucun voyage de groupe créé pour le moment.
                </td>
              </tr>
            ) : (
              groupTrips.map((trip) => {
                const totalBooked = trip._count.bookings;
                const fillPercentage = Math.min(
                  (totalBooked / trip.capacity) * 100,
                  100,
                );
                const isFull = totalBooked >= trip.capacity;

                return (
                  <tr
                    key={trip.id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Colonne Date */}
                    <td className="px-4 py-8 text-center">
                      <div className="bg-slate-100 rounded-2xl p-3 inline-block min-w-[80px] group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-200 shadow-sm">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter leading-none mb-1">
                          {new Date(trip.startDate).toLocaleDateString(
                            "fr-FR",
                            { month: "short" },
                          )}
                        </p>
                        <p className="text-2xl font-black text-slate-900 leading-none">
                          {new Date(trip.startDate).getDate()}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 leading-none mt-1">
                          {new Date(trip.startDate).getFullYear()}
                        </p>
                      </div>
                    </td>

                    {/* Colonne Titre & Statut */}
                    <td className="px-4 py-8">
                      <div className="flex flex-col gap-2">
                        <span
                          className={`self-start px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${getStatusStyle(trip.status)}`}
                        >
                          {trip.status}
                        </span>
                        <div>
                          <div className="font-black italic uppercase text-slate-900 text-lg leading-tight group-hover:text-amber-500 transition-colors">
                            {trip.title}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1.5">
                            <MapPin size={10} className="text-amber-500" />{" "}
                            {trip.destination.name} — {trip.duration} jours
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Colonne Remplissage (Barre de progression) */}
                    <td className="px-4 py-8">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-32 space-y-1.5">
                          <div className="flex justify-between text-[9px] font-black uppercase tracking-tighter text-slate-500">
                            <span>Places</span>
                            <span
                              className={
                                isFull
                                  ? "text-rose-500 font-bold"
                                  : "text-slate-900"
                              }
                            >
                              {totalBooked} / {trip.capacity}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                            <div
                              className={`h-full transition-all duration-500 ${isFull ? "bg-rose-500" : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"}`}
                              style={{ width: `${fillPercentage}%` }}
                            />
                          </div>
                        </div>
                        {isFull && (
                          <span className="text-[8px] font-black uppercase text-rose-500 tracking-widest animate-pulse">
                            Complet
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Colonne Prix */}
                    <td className="px-4 py-8">
                      <div className="flex items-center gap-2 text-base font-black text-slate-900">
                        <Euro size={16} className="text-amber-500" />
                        {trip.priceBase.toLocaleString("fr-FR")}€
                        <span className="text-[10px] text-slate-400 font-bold tracking-normal italic ml-0.5">
                          / pers.
                        </span>
                      </div>
                    </td>

                    {/* Colonne Actions */}
                    <td className="px-10 py-8 text-right">
                      <div className="flex justify-end items-center gap-6">
                        <Link
                          href={`/admin/group-trips/${trip.id}`}
                          className="inline-flex items-center gap-1.5 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-amber-600 transition-colors"
                        >
                          <Edit3 size={14} /> Modifier
                        </Link>
                        <DeleteGroupTripButton id={trip.id} />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
