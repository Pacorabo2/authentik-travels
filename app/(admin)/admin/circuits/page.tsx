import prisma from "@/lib/prisma";
import Link from "next/link";
import FlashMessage from "../destinations/_components/FlashMessage"; // On réutilise !
import DeleteCircuitButton from "./_components/DeleteCircuitButton";

export default async function AdminCircuits({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; deleted?: string }>;
}) {
  const { success, deleted } = await searchParams;

  // On récupère les circuits ET leur destination associée
  const circuits = await prisma.groupTrip.findMany({
    include: { destination: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {success === "true" && <FlashMessage message="✅ Circuit enregistré !" />}
      {deleted === "true" && (
        <FlashMessage message="🗑️ Circuit supprimé." type="deleted" />
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">
            Circuits
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Gérez vos départs groupés et itinéraires.
          </p>
        </div>

        <Link
          href="/admin/circuits/new"
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs hover:bg-amber-600 transition-all shadow-xl shadow-slate-200"
        >
          + Nouveau voyage
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Voyage
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Pays
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Prix
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {circuits.map((trip) => (
              <tr
                key={trip.id}
                className="group hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-10 py-6">
                  <div className="font-bold text-slate-900">{trip.title}</div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                    {trip.duration} jours
                  </div>
                </td>
                <td className="px-10 py-6">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-600">
                    {trip.destination.name}
                  </span>
                </td>
                <td className="px-10 py-6 font-bold text-amber-600">
                  {trip.price} €
                </td>
                <td className="px-10 py-6 text-right space-x-6">
                  <Link
                    href={`/admin/circuits/${trip.id}`}
                    className="text-amber-600 font-bold hover:underline"
                  >
                    Modifier
                  </Link>
                  <DeleteCircuitButton id={trip.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
