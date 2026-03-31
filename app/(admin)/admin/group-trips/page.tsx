import prisma from "@/lib/prisma";
import Link from "next/link";
import FlashMessage from "../destinations/_components/FlashMessage";
import DeleteGroupTripButton from "./_components/DeleteGroupTripButton";
import { Calendar, Users, Euro, Edit3 } from "lucide-react";

export default async function AdminGroupTrips({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; deleted?: string }>;
}) {
  const { success, deleted } = await searchParams;

  const groupTrips = await prisma.groupTrip.findMany({
    include: { destination: true },
    orderBy: { startDate: "asc" },
  });

  return (
    <div className="space-y-8">
      {success === "true" && (
        <FlashMessage message="✅ Voyage de groupe créé !" type="success" />
      )}
      {deleted === "true" && (
        <FlashMessage message="🗑️ Voyage supprimé." type="deleted" />
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">
            Voyages <span className="text-amber-500">de Groupe</span>
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Planifiez vos départs à dates fixes et gérez les stocks.
          </p>
        </div>

        <Link
          href="/admin/group-trips/new"
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
        >
          + Nouveau Départ
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400 text-center">
                Départ
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Titre & Destination
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Places / Prix
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {groupTrips.map((trip) => (
              <tr
                key={trip.id}
                className="group hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-10 py-6 text-center">
                  <div className="bg-slate-100 rounded-2xl p-3 inline-block min-w-[70px]">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                      {new Date(trip.startDate).toLocaleDateString("fr-FR", {
                        month: "short",
                      })}
                    </p>
                    <p className="text-xl font-black text-slate-900 leading-none">
                      {new Date(trip.startDate).getDate()}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 leading-none mt-1">
                      {new Date(trip.startDate).getFullYear()}
                    </p>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <div className="font-bold text-slate-900 text-lg leading-tight">
                    {trip.title}
                  </div>
                  <div className="text-[10px] text-amber-600 uppercase font-black tracking-widest mt-1">
                    {trip.destination.name}
                  </div>
                </td>
                <td className="px-10 py-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Users size={14} className="text-slate-300" />{" "}
                      {trip.capacity} places max
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                      <Euro size={14} className="text-amber-500" />{" "}
                      {trip.priceBase} € (Base)
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6 text-right">
                  <div className="flex justify-end items-center gap-6">
                    <Link
                      href={`/admin/group-trips/${trip.id}`}
                      className="inline-flex items-center gap-1 text-amber-600 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors"
                    >
                      <Edit3 size={14} /> Modifier
                    </Link>
                    <DeleteGroupTripButton id={trip.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
