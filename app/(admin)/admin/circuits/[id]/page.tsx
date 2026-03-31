import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updateCircuit } from "../actions";
import ProgramEditor from "../_components/ProgramEditor";
import ItineraryManager from "@/app/components/admin/ItineraryManager";

export default async function EditCircuitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Conversion explicite en nombre (Int)
  const circuitId = parseInt(id);

  // 1. Récupération des données en parallèle (Circuit + Liste des pays)
  const [trip, destinations] = await Promise.all([
    prisma.groupTrip.findUnique({ where: { id: circuitId } }),
    prisma.destination.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!trip) return notFound();

  // 2. Préparation de l'action avec l'ID (Technique du bind)
  const updateWithId = updateCircuit.bind(null, id);

  // 3. Formatage de la date pour l'input type="date" (format YYYY-MM-DD requis)
  const formattedDate = trip.startDate.toISOString().split("T")[0];

  return (
    <div className="max-w-4xl">
      <header className="mb-10">
        <Link
          href="/admin/circuits"
          className="text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors"
        >
          ← Retour aux circuits
        </Link>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 mt-4">
          Modifier : {trip.title}
        </h1>
      </header>

      <form
        action={updateWithId}
        className="space-y-8 bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100"
      >
        {/* TITRE & DESTINATION */}
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Nom du voyage
            </label>
            <input
              name="title"
              defaultValue={trip.title}
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Pays de destination
            </label>
            <select
              name="destinationId"
              defaultValue={trip.destinationId || ""}
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

        {/* DATE, PRIX & DURÉE */}
        <div className="grid grid-cols-3 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Départ
            </label>
            <input
              name="startDate"
              type="date"
              defaultValue={formattedDate}
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Prix de base (€)
            </label>
            <input
              name="price"
              type="number"
              defaultValue={trip.priceBase}
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
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
        </div>

        {/* CAPACITÉ */}
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Places maximum
            </label>
            <input
              name="maxCapacity"
              type="number"
              defaultValue={trip.capacity}
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Description du voyage
          </label>
          <textarea
            name="description"
            rows={6}
            defaultValue={trip.description || ""}
            className="w-full p-6 bg-slate-50 rounded-[1.5rem] border-none focus:ring-2 focus:ring-amber-500 leading-relaxed text-slate-700"
          />
        </div>
        {/* PROGRAMME JOURNALIER STRUCTURE JSON*/}
        <ProgramEditor initialProgram={trip.program} />

        <div className="flex justify-end pt-6 space-x-4">
          <Link
            href="/admin/circuits"
            className="px-8 py-5 font-bold text-slate-400 hover:text-slate-900 transition-colors text-sm uppercase tracking-widest"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="bg-slate-900 text-white px-12 py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-slate-200"
          >
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  );
}
