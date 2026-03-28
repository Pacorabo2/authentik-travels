import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDestinations() {
  // On récupère toutes les destinations
  const destinations = await prisma.destination.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">
            Gestion des Pays
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Modifier les contenus dynamiques de vos pages destinations.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Destination
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400 text-center">
                Statut
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {destinations.map((dest) => (
              <tr
                key={dest.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-10 py-6 font-bold text-slate-900 text-lg">
                  {dest.name}
                </td>
                <td className="px-10 py-6 text-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${dest.isPublished ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {dest.isPublished ? "En ligne" : "Brouillon"}
                  </span>
                </td>
                <td className="px-10 py-6 text-right">
                  <Link
                    href={`/admin/destinations/${dest.id}`}
                    className="inline-block bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-amber-600 transition-all shadow-md shadow-slate-200"
                  >
                    Éditer le contenu
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
