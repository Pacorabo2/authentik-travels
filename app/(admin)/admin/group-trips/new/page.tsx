import prisma from "@/lib/prisma";
import Link from "next/link";
import { createGroupTrip } from "../actions";
import ItineraryBuilder from "@/app/components/admin/ItineraryBuilder";

export default async function NewGroupTripPage() {
  // On récupère les destinations pour le menu déroulant
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

      <form
        action={createGroupTrip}
        className="space-y-8 bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100"
      >
        {/* SECTION 1 : INFOS GÉNÉRALES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Nom de l'édition (ex: Salsa Tour 2026)
            </label>
            <input
              name="title"
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900"
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

        {/* DATES & DURÉE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Nombre de places
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

        {/* SECTION 3 : TARIFICATION (FINANCE) */}
        <div className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100 space-y-6">
          <h3 className="font-black uppercase text-xs tracking-widest text-amber-600">
            Tarification & Options Stripe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Prix de base (€)
              </label>
              <input
                name="priceBase"
                type="number"
                required
                placeholder="1500"
                className="w-full p-5 bg-white rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Acompte à la réservation (€)
              </label>
              <input
                name="depositAmount"
                type="number"
                required
                placeholder="500"
                className="w-full p-5 bg-white rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Prix Premium Optionnel (€)
              </label>
              <input
                name="premiumPrice"
                type="number"
                required
                placeholder="500"
                className="w-full p-5 bg-white rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Prix Platinium Optionnel (€)
              </label>
              <input
                name="platinumPrice"
                type="number"
                required
                placeholder="500"
                className="w-full p-5 bg-white rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900"
              />
            </div>
          </div>
        </div>
        {/* SECTION 4 : DESCRIPTION DU VOYAGE*/}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Description du voyage
          </label>
          <textarea
            name="description"
            rows={4}
            className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500"
            placeholder="Présentez ce départ en quelques mots..."
          />
        </div>
        {/* SECTION 5 : CHARGEMENT VIDEO ET IMAGEURL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Image de présentation (URL)
            </label>
            <input
              name="imageUrl"
              placeholder="https://images.unsplash.com/..."
              className="w-full p-5 bg-white rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Vidéo Hero (URL)
            </label>
            <input
              name="videoUrl"
              placeholder="Lien YouTube ou MP4..."
              className="w-full p-5 bg-white rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
          </div>
        </div>

        {/* SECTION 6 : PROGRAMME DYNAMIQUE */}
        <hr className="border-slate-100" />
        <ItineraryBuilder />

        <div className="flex justify-end pt-6 space-x-4">
          <Link
            href="/admin/group-trips"
            className="px-8 py-5 font-bold text-slate-400 hover:text-slate-900 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="bg-slate-900 text-white px-12 py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl"
          >
            Publier le voyage
          </button>
        </div>
      </form>
    </div>
  );
}
