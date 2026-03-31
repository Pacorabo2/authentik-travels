import prisma from "@/lib/prisma";
import Link from "next/link";
import FlashMessage from "./_components/FlashMessage";
import DeleteDestinationButton from "./_components/DeleteDestinationButton";
import { Edit, Globe } from "lucide-react"; // Import pour le style

export default async function AdminDestinations({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; deleted?: string }>;
}) {
  const { success, deleted } = await searchParams;

  const destinations = await prisma.destination.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-8">
      {/* 1. ALERTES DE SUCCÈS OU SUPPRESSION (CONSERVÉES) */}
      {success === "true" && (
        <FlashMessage
          message="✅ Destination enregistrée avec succès !"
          type="success"
        />
      )}

      {deleted === "true" && (
        <FlashMessage
          message="🗑️ Destination supprimée avec succès."
          type="deleted"
        />
      )}

      {/* 2. HEADER DE LA PAGE */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">
            Destinations
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Gérez votre catalogue de pays et continents.
          </p>
        </div>

        <Link
          href="/admin/destinations/new"
          className="bg-slate-900 text-white px-8 py-4 rounded-[1.2rem] font-black uppercase tracking-widest text-xs hover:bg-amber-600 transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center"
        >
          <span className="text-xl mr-2">+</span> Ajouter une destination
        </Link>
      </div>

      {/* 3. TABLEAU DES DESTINATIONS (MIS À JOUR) */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Nom du Pays
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Monnaie1
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Monnaie2
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400">
                Statut
              </th>
              <th className="px-10 py-6 font-bold uppercase text-[10px] tracking-[0.2em] text-slate-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {destinations.map((dest) => (
              <tr
                key={dest.id}
                className="group hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-10 py-6 font-bold text-slate-900">
                  {dest.name}
                </td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                    <Globe size={14} className="text-slate-300" />
                    {dest.currency1 || "Non défini"}
                  </div>
                </td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                    <Globe size={14} className="text-slate-300" />
                    {dest.currency2 || "Non défini"}
                  </div>
                </td>
                <td className="px-10 py-6">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      dest.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {dest.isPublished ? "En ligne" : "Brouillon"}
                  </span>
                </td>
                <td className="px-10 py-6 text-right">
                  <div className="flex justify-end items-center gap-6">
                    <Link
                      href={`/admin/destinations/${dest.id}`}
                      className="flex items-center gap-1 text-amber-600 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors"
                    >
                      <Edit size={14} /> Modifier
                    </Link>
                    {/* TON COMPOSANT DE SUPPRESSION (CONSERVÉ) */}
                    <DeleteDestinationButton id={dest.id} />
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
