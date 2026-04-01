import prisma from "@/lib/prisma";
import {
  Users,
  Calendar,
  Plus,
  ChevronRight,
  Euro,
  CreditCard,
  Search,
} from "lucide-react";
import Link from "next/link";

// Helper pour le style des badges de statut (BookingStatus)
const getStatusBadge = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "PENDING":
      return "bg-amber-50 text-amber-600 border-amber-100";
    case "CANCELLED":
      return "bg-rose-50 text-rose-600 border-rose-100";
    default:
      return "bg-slate-50 text-slate-400 border-slate-100";
  }
};

export default async function AdminBookingsPage() {
  // Récupération des réservations avec les relations nécessaires
  const bookings = await prisma.booking.findMany({
    include: {
      groupTrip: {
        select: { title: true, startDate: true },
      },
      circuit: {
        select: { title: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 pb-20">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
            Gestion des <span className="text-amber-500">Réservations</span>
          </h1>
          <p className="text-slate-500 mt-3 font-medium flex items-center gap-2">
            <Users size={16} className="text-amber-500" />
            {bookings.length} dossiers enregistrés. Suivi des ventes et
            acomptes.
          </p>
        </div>

        {/* 🚀 LE BOUTON D'ACTION AJOUTÉ ICI */}
        <Link
          href="/admin/bookings/new"
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 group"
        >
          <Plus
            size={16}
            className="group-hover:rotate-90 transition-transform"
          />
          Créer une réservation
        </Link>
      </div>

      {/* --- TABLEAU DES RÉSULTATS --- */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-200">
            <tr>
              <th className="px-8 py-6 font-bold uppercase text-[10px] tracking-widest text-slate-400">
                Voyageur
              </th>
              <th className="px-8 py-6 font-bold uppercase text-[10px] tracking-widest text-slate-400">
                Produit
              </th>
              <th className="px-8 py-6 font-bold uppercase text-[10px] tracking-widest text-slate-400">
                Finance
              </th>
              <th className="px-8 py-6 font-bold uppercase text-[10px] tracking-widest text-slate-400">
                Statut
              </th>
              <th className="px-8 py-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-20 text-center text-slate-300 font-bold uppercase tracking-widest text-xs"
                >
                  Aucun dossier de réservation trouvé.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  {/* Voyageur */}
                  <td className="px-8 py-6">
                    <div className="font-black uppercase text-slate-900 leading-none mb-1">
                      {booking.firstName} {booking.lastName}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold tracking-tight uppercase">
                      {booking.email}
                    </div>
                  </td>

                  {/* Détails Voyage */}
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest mb-1">
                        {booking.type}
                      </span>
                      <div className="font-bold text-slate-700 leading-tight">
                        {booking.groupTrip?.title ||
                          booking.circuit?.title ||
                          "Circuit Sur-mesure"}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 font-medium">
                        <Calendar size={10} />{" "}
                        {new Date(booking.startDate).toLocaleDateString(
                          "fr-FR",
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Finance */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1.5 font-black text-slate-900">
                      {booking.totalPrice.toLocaleString()}€
                    </div>
                    <div className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter mt-1 flex items-center gap-1">
                      <CreditCard size={10} /> Payé: {booking.amountPaid}€
                    </div>
                  </td>

                  {/* Statut */}
                  <td className="px-8 py-6">
                    <span
                      className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${getStatusBadge(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-6 text-right">
                    <Link
                      href={`/admin/bookings/${booking.id}`}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                    >
                      <ChevronRight size={18} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
