import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateDestination } from "./actions";

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dest = await prisma.destination.findUnique({ where: { id } });

  if (!dest) return notFound();

  // On lie l'action au formulaire
  const updateDestWithId = updateDestination.bind(null, id);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-10">
        Modifier : {dest.name}
      </h1>

      <form
        action={updateDestWithId}
        className="space-y-8 bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200"
      >
        {/* NOM & STATUT */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Nom du pays
            </label>
            <input
              name="name"
              defaultValue={dest.name}
              className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>
          <div className="flex items-center space-x-4 pt-6">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={dest.isPublished}
              className="w-6 h-6 accent-slate-900"
            />
            <label className="font-bold text-slate-700">Publier la page</label>
          </div>
        </div>

        {/* TAGLINE */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Accroche (Tagline)
          </label>
          <input
            name="tagline"
            defaultValue={dest.tagline || ""}
            className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-medium"
            placeholder="Ex: L'île crocodile au rythme de la salsa..."
          />
        </div>

        {/* MÉDIAS (VIDÉO & IMAGE) */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
              URL Vidéo Hero (Supabase)
            </label>
            <input
              name="heroVideoUrl"
              defaultValue={dest.heroVideoUrl || ""}
              className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
              URL Image Présentation
            </label>
            <input
              name="presentationImg"
              defaultValue={dest.presentationImg || ""}
              className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Description détaillée
          </label>
          <textarea
            name="description"
            rows={6}
            defaultValue={dest.description}
            className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
          />
        </div>

        {/* BOUTONS */}
        <div className="flex justify-end space-x-4 pt-6">
          <button type="button" className="px-8 py-4 font-bold text-slate-400">
            Annuler
          </button>
          <button
            type="submit"
            className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-slate-200"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}
