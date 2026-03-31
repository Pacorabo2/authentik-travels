import prisma from "@/lib/prisma";
import Link from "next/link";
import FlashMessage from "../destinations/_components/FlashMessage";
import DeleteCircuitButton from "./_components/DeleteCircuitButton";
import { Clock, MapPin, Euro, Edit3 } from "lucide-react";

export default async function AdminCircuits({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; deleted?: string }>;
}) {
  const { success, deleted } = await searchParams;

  // 1. On change la table : On récupère les 'circuit' et non les 'groupTrip'
  const circuits = await prisma.circuit.findMany({
    include: { destination: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {/* ALERTES (CONSERVÉES) */}
      {success === "true" && (
        <FlashMessage
          message="✅ Circuit enregistré avec succès !"
          type="success"
        />
      )}
      {deleted === "true" && (
        <FlashMessage
          message="🗑️ Circuit supprimé du catalogue."
          type="deleted"
        />
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">
            Catalogue <span className="text-amber-500">Circuits</span>
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Gérez vos itinéraires classiques et programmes par destination.
          </p>
        </div>

        <Link
          href="/admin/circuits/new"
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
        >
          <span className="text-lg">+</span> Nouveau circuit
        </Link>
      </div>

      {/* TABLEAU DES CIRCUITS */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Itinéraire
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Destination
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Prix de base
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {circuits.length > 0 ? (
              circuits.map((circuit) => (
                <tr
                  key={circuit.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-10 py-6">
                    <div className="font-bold text-slate-900 text-lg leading-tight mb-1">
                      {circuit.title}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 uppercase font-black tracking-widest">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {circuit.duration} jours
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-amber-500" />
                      <span className="font-bold text-slate-700">
                        {circuit.destination.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-1 font-black text-slate-900">
                      <Euro size={14} className="text-slate-300" />
                      {circuit.priceBase}
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right space-x-6">
                    <Link
                      href={`/admin/circuits/${circuit.id}`}
                      className="inline-flex items-center gap-1 text-amber-600 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors"
                    >
                      <Edit3 size={14} /> Modifier
                    </Link>
                    <DeleteCircuitButton id={circuit.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-10 py-12 text-center text-slate-400 italic text-sm"
                >
                  Aucun circuit classique créé pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
