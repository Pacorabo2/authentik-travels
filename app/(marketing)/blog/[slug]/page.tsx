// app/(marketing)/blog/[slug]/page.tsx

import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Plus tard, nous ferons : const post = await prisma.post.findUnique(...)
  // Pour l'instant, on simule les données
  const post = {
    title: "Comment préparer son sac pour la Colombie ?",
    date: "24 Mars 2026",
    author: "L'équipe Authentik",
    readTime: "5 min",
    category: "Conseils",
    content: `
      <p>Partir en Colombie est une aventure inoubliable, mais la préparation du sac peut vite devenir un casse-tête entre la chaleur de Carthagène et la fraîcheur de Bogota...</p>
      <h2>1. Les indispensables</h2>
      <p>Pensez à prendre des vêtements légers en coton, mais n'oubliez pas une petite laine pour les soirées en altitude.</p>
      <h2>2. Côté pharmacie</h2>
      <p>Un bon répulsif est essentiel si vous prévoyez de visiter le parc Tayrona.</p>
    `,
  };

  return (
    <main className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* RETOUR ET META */}
        <Link
          href="/blog"
          className="flex items-center gap-2 text-slate-400 hover:text-amber-500 font-bold text-sm transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Retour au blog
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="bg-amber-100 text-amber-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.9] mb-8">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-slate-400 text-xs font-bold border-b border-slate-100 pb-8 mb-10">
          <div className="flex items-center gap-2">
            <Calendar size={14} /> {post.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} /> {post.readTime} de lecture
          </div>
          <div className="flex items-center gap-2">
            <User size={14} /> Par {post.author}
          </div>
        </div>

        {/* CONTENU DE L'ARTICLE */}
        <article
          className="prose prose-slate prose-lg max-w-none 
          prose-headings:uppercase prose-headings:italic prose-headings:font-black prose-headings:tracking-tighter
          prose-a:text-amber-500 hover:prose-a:text-amber-600 transition-colors"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* FOOTER DE L'ARTICLE */}
        <footer className="mt-16 pt-10 border-t border-slate-100">
          <div className="bg-slate-50 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-black uppercase text-slate-900 italic">
                Cet article vous a plu ?
              </h4>
              <p className="text-slate-500 text-sm">
                Partagez vos impressions avec nous sur les réseaux sociaux.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-amber-500 transition-all shadow-xl"
            >
              Nous contacter
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
