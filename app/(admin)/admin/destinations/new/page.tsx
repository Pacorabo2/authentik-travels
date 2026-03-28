import { createDestination } from "../actions";
import Link from "next/link";

export default function NewDestinationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-10">
        <Link
          href="/admin/destinations"
          className="text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors"
        >
          ← Retour
        </Link>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 mt-2">
          Nouveau Pays
        </h1>
      </header>

      <form
        action={createDestination}
        className="space-y-8 bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200"
      >
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
              Nom du pays
            </label>
            <input
              name="name"
              required
              placeholder="Ex: Mexique"
              className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-900"
            />
          </div>
          <div className="flex items-center space-x-4 pt-6">
            <input
              type="checkbox"
              name="isPublished"
              className="w-6 h-6 accent-slate-900"
            />
            <label className="font-bold text-slate-700">
              Publier immédiatement
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
            Accroche (Tagline)
          </label>
          <input
            name="tagline"
            placeholder="L'aventure au cœur de..."
            className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-medium"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
            Description narrative
          </label>
          <textarea
            name="description"
            rows={5}
            className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500 leading-relaxed font-medium"
          />
        </div>

        <div className="flex justify-end pt-4 space-x-4">
          <Link
            href="/admin/destinations"
            className="px-8 py-4 font-bold text-slate-400 hover:text-slate-900 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-slate-200"
          >
            Créer la destination
          </button>
        </div>
      </form>
    </div>
  );
}
