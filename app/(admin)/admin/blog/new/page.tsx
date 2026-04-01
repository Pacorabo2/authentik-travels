import prisma from "@/lib/prisma";
import { createPost } from "../actions";
import Link from "next/link";
import { ArrowLeft, Save, Globe, Layout, Type } from "lucide-react";

export default async function NewPostPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <form action={createPost} className="space-y-10">
        {/* HEADER FIXE */}
        <div className="flex justify-between items-center sticky top-0 bg-slate-100/80 backdrop-blur-md py-6 z-30">
          <Link
            href="/admin/blog"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors"
          >
            <ArrowLeft size={20} /> Retour
          </Link>
          <button
            type="submit"
            className="bg-amber-500 text-slate-900 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl flex items-center gap-2"
          >
            <Save size={18} /> Publier l'article
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLONNE PRINCIPALE (CONTENU) */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Type className="text-amber-500" size={20} />
                <h2 className="font-black uppercase italic tracking-tighter text-xl">
                  Contenu de l'article
                </h2>
              </div>

              <input
                name="title"
                placeholder="Titre de l'article"
                required
                className="w-full text-3xl font-bold border-none focus:ring-0 placeholder:text-slate-200"
              />

              <textarea
                name="excerpt"
                placeholder="Résumé accrocheur (apparaît sur les cartes)..."
                rows={3}
                className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-600"
              />

              <textarea
                name="content"
                placeholder="Rédigez votre histoire ici (accepte le HTML)..."
                required
                rows={15}
                className="w-full p-6 bg-slate-50 rounded-3xl border-none focus:ring-2 focus:ring-amber-500 font-mono text-sm leading-relaxed"
              />
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="text-amber-500" size={20} />
                <h2 className="font-black uppercase italic tracking-tighter text-xl">
                  Optimisation SEO
                </h2>
              </div>
              <input
                name="metaTitle"
                placeholder="Meta Title (Google)"
                className="w-full p-4 bg-slate-50 rounded-xl border-none"
              />
              <textarea
                name="metaDescription"
                placeholder="Meta Description"
                rows={2}
                className="w-full p-4 bg-slate-50 rounded-xl border-none"
              />
            </section>
          </div>

          {/* SIDEBAR (RÉGLAGES) */}
          <div className="space-y-8">
            <section className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Layout className="text-amber-500" size={20} />
                <h2 className="font-black uppercase italic tracking-tighter text-xl text-white">
                  Paramètres
                </h2>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Image de couverture
                  </span>
                  <input
                    name="mainImage"
                    placeholder="URL Unsplash..."
                    required
                    className="w-full mt-2 p-4 bg-slate-800 rounded-xl border-none text-sm"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Destination liée
                  </span>
                  <select
                    name="destinationId"
                    className="w-full mt-2 p-4 bg-slate-800 rounded-xl border-none text-sm appearance-none"
                  >
                    <option value="none">Aucune (Général)</option>
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="flex gap-4">
                  <label className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Catégorie
                    </span>
                    <input
                      name="category"
                      placeholder="Conseils..."
                      className="w-full mt-2 p-4 bg-slate-800 rounded-xl border-none text-sm"
                    />
                  </label>
                  <label className="w-24">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Lecture
                    </span>
                    <input
                      name="readingTime"
                      type="number"
                      defaultValue={5}
                      className="w-full mt-2 p-4 bg-slate-800 rounded-xl border-none text-sm"
                    />
                  </label>
                </div>

                <label className="flex items-center gap-3 p-4 bg-slate-800 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    value="true"
                    className="w-5 h-5 rounded border-none text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-sm font-bold uppercase tracking-widest">
                    Publier
                  </span>
                </label>
              </div>
            </section>
          </div>
        </div>
      </form>
    </div>
  );
}
