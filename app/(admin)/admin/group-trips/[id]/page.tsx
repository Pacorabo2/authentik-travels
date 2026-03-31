import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updateGroupTrip } from "../actions"; // On va l'ajouter à tes actions

export default async function EditGroupTripPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Récupérer le voyage et les destinations
  const [trip, destinations] = await Promise.all([
    prisma.groupTrip.findUnique({ where: { id } }),
    prisma.destination.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!trip) return notFound();

  // Formatage de la date pour l'input HTML (YYYY-MM-DD)
  const startDateFormatted = new Date(trip.startDate)
    .toISOString()
    .split("T")[0];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-10">
        <Link
          href="/admin/group-trips"
          className="text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors"
        >
          ← Retour à la liste
        </Link>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 mt-4">
          Modifier le <span className="text-amber-500">Voyage</span>
        </h1>
        <p className="text-slate-400 text-xs font-mono mt-2 uppercase tracking-widest">
          ID: {trip.id}
        </p>
      </header>

      {/* On utilise une Server Action avec l'ID lié via bind ou un champ caché */}
      <form
        action={updateGroupTrip}
        className="space-y-8 bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100"
      >
        <input type="hidden" name="id" value={trip.id} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Nom de l'édition
            </label>
            <input
              name="title"
              defaultValue={trip.title}
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Destination
            </label>
            <select
              name="destinationId"
              defaultValue={trip.destinationId}
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900 appearance-none"
            >
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Date de départ
            </label>
            <input
              name="startDate"
              type="date"
              defaultValue={startDateFormatted}
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Durée (jours)
            </label>
            <input
              name="duration"
              type="number"
              defaultValue={trip.duration}
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Places disponibles
            </label>
            <input
              name="capacity"
              type="number"
              defaultValue={trip.capacity}
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>
        </div>

        <div className="p-8 bg-slate-900 rounded-[2rem] text-white space-y-6">
          <h3 className="font-black uppercase text-[10px] tracking-widest text-amber-500">
            Tarification & Finance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Prix de base (€)
              </label>
              <input
                name="priceBase"
                type="number"
                defaultValue={trip.priceBase}
                required
                className="w-full p-5 bg-slate-800 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-white"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Acompte Stripe (€)
              </label>
              <input
                name="depositAmount"
                type="number"
                defaultValue={trip.depositAmount}
                required
                className="w-full p-5 bg-slate-800 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="bg-amber-500 text-slate-900 px-12 py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}
