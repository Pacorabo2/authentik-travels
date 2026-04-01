// app/(admin)/admin/group-trips/new/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";
import { createGroupTrip } from "../actions";
import ItineraryBuilder from "@/components/admin/ItineraryBuilder";

export default async function NewGroupTripPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-10">
        <Link
          href="/admin/group-trips"
          className="text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors"
        >
          ← Retour aux voyages de groupe
        </Link>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 mt-4">
          Programmer un <span className="text-amber-500">Départ</span>
        </h1>
      </header>

      {/* Note: On garde l'action directe, ItineraryBuilder s'occupera d'injecter le JSON */}
      <form
        action={createGroupTrip}
        className="space-y-8 bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100"
      >
        {/* SECTION 1 : INFOS GÉNÉRALES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Nom de l&apos;édition
            </label>
            <input
              name="title"
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900"
              placeholder="Ex: Cuba Salsa Tour 2026"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Destination
            </label>
            <select
              name="destinationId"
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900 appearance-none"
            >
              <option value="">Choisir un pays...</option>
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* DATES & LOGISTIQUE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Date de départ
            </label>
            <input
              name="startDate"
              type="date"
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Date de retour
            </label>
            <input
              name="endDate"
              type="date"
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Capacité (Places)
            </label>
            <input
              name="capacity"
              type="number"
              required
              placeholder="12"
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>
        </div>

        {/* TARIFICATION */}
        <div className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100 space-y-6">
          <h3 className="font-black uppercase text-xs tracking-widest text-amber-600 flex items-center gap-2">
            💰 Tarification & Options d&apos;hébergement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-400 ml-1 italic">
                Price Base (Chambre à partager)
              </label>
              <input
                name="priceBase"
                type="number"
                required
                className="w-full p-4 bg-white rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-bold"
                placeholder="1500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-400 ml-1 italic">
                Acompte / Réservation (€)
              </label>
              <input
                name="depositAmount"
                type="number"
                required
                className="w-full p-4 bg-white rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-bold"
                placeholder="500"
              />
            </div>

            {/* NOUVEAUX CHAMPS */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-400 ml-1 italic">
                Price Premium (Chambre Individuelle)
              </label>
              <input
                name="pricePremium"
                type="number"
                className="w-full p-4 bg-white rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-bold"
                placeholder="1850"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-400 ml-1 italic">
                Price Platinium (Surclassé / Suite)
              </label>
              <input
                name="pricePlatinium"
                type="number"
                className="w-full p-4 bg-white rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-bold"
                placeholder="2200"
              />
            </div>
          </div>
        </div>

        {/* ITINÉRAIRE DYNAMIQUE */}
        <div className="pt-6 border-t border-slate-100">
          <ItineraryBuilder />
        </div>

        {/* SUBMIT */}
        <div className="flex justify-end pt-10 border-t border-slate-50 gap-4">
          <Link
            href="/admin/group-trips"
            className="px-8 py-5 font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase text-[10px] tracking-widest"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="bg-slate-900 text-amber-500 px-12 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black transition-all shadow-xl shadow-slate-200"
          >
            Publier l'édition
          </button>
        </div>
      </form>
    </div>
  );
}
