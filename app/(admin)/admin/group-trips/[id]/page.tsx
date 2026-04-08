import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updateGroupTrip } from "../actions";
import ItineraryBuilder from "@/components/admin/ItineraryBuilder";

export default async function EditGroupTripPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Récupérer le voyage et les destinations en parallèle
  const [trip, destinations] = await Promise.all([
    prisma.groupTrip.findUnique({ where: { id } }),
    prisma.destination.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!trip) return notFound();

  // Formatage des dates pour les inputs HTML (YYYY-MM-DD)
  const startDateFormatted = new Date(trip.startDate)
    .toISOString()
    .split("T")[0];
  const endDateFormatted = trip.endDate
    ? new Date(trip.endDate).toISOString().split("T")[0]
    : "";

  // On prépare l'action avec l'ID déjà injecté
  const updateTripWithId = updateGroupTrip.bind(null, trip.id);

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-10">
        <Link
          href="/admin/group-trips"
          className="text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors flex items-center gap-2"
        >
          ← Retour à la liste
        </Link>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 mt-4">
          Modifier le <span className="text-amber-500">Voyage</span>
        </h1>
        <div className="flex items-center gap-4 mt-2">
          <p className="text-slate-400 text-[10px] font-mono uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
            ID: {trip.id}
          </p>
        </div>
      </header>

      <form
        action={updateTripWithId}
        className="space-y-8 bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100"
      >
        {/* SECTION 0 : STATUT DU VOYAGE (NOUVEAU) */}
        <div
          className={`p-8 rounded-[2rem] border-2 transition-all ${
            trip.status === "PUBLISHED"
              ? "border-emerald-100 bg-emerald-50/30"
              : trip.status === "FULL"
                ? "border-slate-200 bg-slate-50 opacity-75"
                : trip.status === "CANCELLED"
                  ? "border-red-100 bg-red-50/30"
                  : trip.status === "COMPLETED"
                    ? "border-blue-100 bg-blue-50/30"
                    : "border-amber-100 bg-amber-50/30" // Cas DRAFT
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="font-black uppercase text-[10px] tracking-[0.2em] text-slate-900 mb-1">
                État de visibilité
              </h3>
              <p className="text-slate-500 text-xs font-medium">
                Définissez si ce voyage est visible par vos clients ou s'il est
                complet.
              </p>
            </div>
            <select
              name="status"
              defaultValue={trip.status}
              className="p-4 bg-white rounded-xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 font-black uppercase text-xs tracking-widest shadow-sm min-w-[200px]"
            >
              <option value="DRAFT">🟠 Brouillon (Caché)</option>
              <option value="PUBLISHED">🟢 Publié (Visible)</option>
              <option value="FULL">⚫ Complet (Affiché "Complet")</option>
              <option value="CANCELLED">🔴 CANCELLED - Annulé</option>
              <option value="COMPLETED">🔵 COMPLETED - Terminé / Passé</option>
            </select>
          </div>
        </div>

        {/* SECTION 1 : INFOS GÉNÉRALES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Nom de l'édition
            </label>
            <input
              name="title"
              defaultValue={trip.title}
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900 shadow-inner"
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
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900 appearance-none shadow-inner"
            >
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SECTION 2 : LOGISTIQUE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              Date de retour
            </label>
            <input
              name="endDate"
              type="date"
              defaultValue={endDateFormatted}
              required
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Capacité (Places)
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

        {/* SECTION 3 : TARIFICATION AVANCÉE */}
        <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6 shadow-2xl">
          <h3 className="font-black uppercase text-[10px] tracking-[0.2em] text-amber-500">
            💰 Tarification & Options d'hébergement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 ml-1">
                Prix de base (Partagé)
              </label>
              <input
                name="priceBase"
                type="number"
                defaultValue={trip.priceBase}
                required
                className="w-full p-4 bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-bold text-white shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 ml-1">
                Acompte requis (€)
              </label>
              <input
                name="depositAmount"
                type="number"
                defaultValue={trip.depositAmount || ""}
                required
                className="w-full p-4 bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-bold text-white shadow-inner"
              />
            </div>
            {/* Les autres prix... */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 ml-1">
                Price Premium (Individuelle)
              </label>
              <input
                name="pricePremium"
                type="number"
                defaultValue={trip.pricePremium || ""}
                className="w-full p-4 bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-bold text-white shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 ml-1">
                Price Platinium (Surclassé)
              </label>
              <input
                name="pricePlatinium"
                type="number"
                defaultValue={trip.pricePlatinium || ""}
                className="w-full p-4 bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-bold text-white shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4 : CONTENU VISUEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Image de présentation (URL)
            </label>
            <input
              name="imageUrl"
              defaultValue={trip.imageUrl || ""}
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-medium text-sm"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Vidéo Hero (URL)
            </label>
            <input
              name="videoUrl"
              defaultValue={trip.videoUrl || ""}
              className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-medium text-sm"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Description courte
          </label>
          <textarea
            name="description"
            defaultValue={trip.description}
            rows={4}
            className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
        </div>

        {/* SECTION 5 : ITINÉRAIRE */}
        <div className="pt-10 border-t border-slate-100">
          <ItineraryBuilder initialDays={trip.program} />
        </div>

        <div className="flex justify-end gap-4 pt-10 border-t border-slate-50">
          <Link
            href="/admin/group-trips"
            className="px-8 py-5 font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase text-[10px] tracking-widest"
          >
            Annuler
          </Link>
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
