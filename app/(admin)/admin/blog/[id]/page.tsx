import prisma from "@/lib/prisma";
import { updatePost } from "../actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Save, Globe, Layout, Type, Trash2 } from "lucide-react";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post, destinations] = await Promise.all([
    prisma.post.findUnique({ where: { id } }),
    prisma.destination.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!post) notFound();

  // On lie l'ID à l'action
  const updatePostWithId = updatePost.bind(null, post.id);

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <form action={updatePostWithId} className="space-y-10">
        {/* HEADER */}
        <div className="flex justify-between items-center sticky top-0 bg-slate-100/80 backdrop-blur-md py-6 z-30">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/blog"
              className="p-3 bg-white rounded-xl text-slate-400 hover:text-slate-900 transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-black italic uppercase leading-none">
                Modifier l'article
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                ID: {post.id}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-amber-500 transition-all shadow-xl flex items-center gap-2"
          >
            <Save size={18} /> Enregistrer les modifications
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* SECTION CONTENU */}
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <input
                name="title"
                defaultValue={post.title}
                className="w-full text-3xl font-bold border-none focus:ring-0 text-slate-900"
              />
              <input type="hidden" name="slug" defaultValue={post.slug} />

              <textarea
                name="excerpt"
                defaultValue={post.excerpt || ""}
                rows={3}
                className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500 font-medium"
              />

              <textarea
                name="content"
                defaultValue={post.content}
                rows={15}
                className="w-full p-6 bg-slate-50 rounded-3xl border-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
              />
            </section>

            {/* SECTION SEO */}
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <div className="flex items-center gap-3">
                <Globe className="text-amber-500" size={20} />
                <h2 className="font-black uppercase italic tracking-tighter text-xl">
                  SEO
                </h2>
              </div>
              <input
                name="metaTitle"
                defaultValue={post.metaTitle || ""}
                placeholder="Meta Title"
                className="w-full p-4 bg-slate-50 rounded-xl border-none"
              />
              <textarea
                name="metaDescription"
                defaultValue={post.metaDescription || ""}
                placeholder="Meta Description"
                rows={2}
                className="w-full p-4 bg-slate-50 rounded-xl border-none"
              />
            </section>
          </div>

          {/* SIDEBAR RÉGLAGES */}
          <div className="space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Image
                  </span>
                  <input
                    name="mainImage"
                    defaultValue={post.mainImage}
                    className="w-full mt-2 p-4 bg-slate-50 rounded-xl border-none text-sm"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Destination
                  </span>
                  <select
                    name="destinationId"
                    defaultValue={post.destinationId || "none"}
                    className="w-full mt-2 p-4 bg-slate-50 rounded-xl border-none text-sm"
                  >
                    <option value="none">Aucune</option>
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    value="true"
                    defaultChecked={post.published}
                    className="w-5 h-5 rounded border-slate-200 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-sm font-bold uppercase tracking-widest text-slate-900">
                    En ligne
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
