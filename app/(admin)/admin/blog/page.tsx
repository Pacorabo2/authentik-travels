import prisma from "@/lib/prisma";
import Link from "next/link";
import DeletePostButton from "./_components/DeletePostButton";
import {
  Plus,
  FileText,
  Eye,
  Pencil,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";

export default async function AdminBlogList() {
  // On récupère tous les articles, du plus récent au plus ancien
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { destination: true },
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* HEADER DE LA PAGE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
            Gestion du <span className="text-amber-500">Blog</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            {posts.length} article{posts.length > 1 ? "s" : ""} enregistré
            {posts.length > 1 ? "s" : ""} en base de données.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-amber-500 hover:text-slate-900 transition-all flex items-center gap-3 shadow-xl transform hover:-translate-y-1"
        >
          <Plus size={18} /> Nouvel Article
        </Link>
      </div>

      {/* LISTE DES ARTICLES */}
      <div className="grid grid-cols-1 gap-4">
        {posts.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 text-center">
            <FileText size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              Aucun article pour le moment
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-5 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div className="flex items-center gap-6 w-full md:w-auto">
                {/* Miniature de l'image */}
                <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden relative flex-shrink-0 shadow-inner">
                  <img
                    src={post.mainImage}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    alt={post.title}
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        post.published
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${post.published ? "bg-emerald-500" : "bg-slate-300"}`}
                      />
                      {post.published ? "Publié" : "Brouillon"}
                    </span>

                    {post.destination && (
                      <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-amber-600">
                        <MapPin size={10} /> {post.destination.name}
                      </span>
                    )}
                  </div>

                  <h3 className="font-black italic uppercase text-lg text-slate-900 group-hover:text-amber-500 transition-colors leading-tight">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {post.readingTime} min
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-2 mt-4 md:mt-0 w-full md:w-auto justify-end">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="p-4 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all"
                >
                  <Eye size={20} />
                </Link>

                <Link
                  href={`/admin/blog/${post.id}`}
                  className="flex items-center gap-2 px-6 py-4 bg-slate-50 text-slate-900 hover:bg-amber-500 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all"
                >
                  <Pencil size={16} /> Modifier
                </Link>

                {/* Nouveau bouton client sécurisé */}
                <DeletePostButton id={post.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
