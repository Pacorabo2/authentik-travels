import prisma from "@/lib/prisma";
import Link from "next/link";
import { createCircuit } from "../actions";
import ItineraryBuilder from "@/app/components/admin/ItineraryBuilder";

export default async function NewCircuitPage() {
  // On récupère toutes les destinations pour le menu déroulant
  const destinations = await prisma.destination.findMany({
    orderBy: { name: "asc" },
  });

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
          Nouveau Circuit
        </h1>
      </header>

      <form
        action={createCircuit}
        className="space-y-8 bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100"
      >
        {/* TITRE & DESTINATION */}
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Nom du circuit
            </label>
            <input
              name="title"
              required
              placeholder="Ex: Trésors de la Sierra Maestra"
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Pays de destination
            </label>
            <select
              name="destinationId"
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900 appearance-none"
            >
              <option value="">Sélectionner un pays...</option>
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* PRIX, DURÉE & PLACES */}
        <div className="grid grid-cols-3 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Prix (€)
            </label>
            <input
              name="price"
              type="number"
              required
              placeholder="1850"
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
              required
              placeholder="12"
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>
        </div>

        {/* DESCRIPTION COURTE */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Résumé du circuit
          </label>
          <textarea
            name="description"
            rows={4}
            className="w-full p-6 bg-slate-50 rounded-[1.5rem] border-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
          />
        </div>
        <div className="space-y-3 p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Image de présentation (URL)
          </label>
          <input
            name="presentationImg"
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full p-4 bg-white rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-medium"
          />
          <p className="text-[10px] text-slate-400 italic ml-1">
            Cette image sera affichée sur la carte du circuit dans le catalogue.
          </p>
        </div>

        {/* AJOUT DE L'ITINÉRAIRE DYNAMIQUE */}
        <ItineraryBuilder />

        <div className="flex justify-end pt-6 space-x-4">
          <Link
            href="/admin/circuits"
            className="px-8 py-5 font-bold text-slate-400 hover:text-slate-900 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="bg-slate-900 text-white px-12 py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl shadow-slate-200"
          >
            Créer le circuit
          </button>
        </div>
      </form>
    </div>
  );
}
