import React from "react";
import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import NextImage from "next/image";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  ChevronRight,
} from "lucide-react";

// Génération dynamique des Meta-données pour le SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Article non trouvé" };

  return {
    title: `${post.metaTitle || post.title} | Authentik Travels`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.mainImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO SECTION IMAGE & TITRE */}
      <section className="relative h-[70vh] w-full flex items-end pb-20">
        <NextImage
          src={post.mainImage}
          alt={post.title}
          fill
          priority
          sizes="100vw" // L'image prend toute la largeur de l'écran
          className="object-cover brightness-[0.65]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="relative max-w-5xl mx-auto px-4 md:px-8 w-full">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-amber-400 font-bold text-sm transition-colors mb-8 group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Retour au blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
              {post.category}
            </span>
            {post.destination && (
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/20">
                {post.destination.name}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-[0.85] max-w-4xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* 2. CONTENU DE L'ARTICLE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* COLONNE GAUCHE : INFOS & PARTAGE */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32 space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-900">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <User size={20} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Rédigé par
                    </p>
                    <p className="font-bold text-sm italic">
                      {post.authorName}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Calendar size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <Clock size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {post.readingTime} min de lecture
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <button className="flex items-center gap-3 text-slate-900 font-black uppercase text-[10px] tracking-widest hover:text-amber-500 transition-colors">
                  <Share2 size={16} /> Partager l'aventure
                </button>
              </div>
            </div>
          </aside>

          {/* COLONNE DROITE : LE CORPS DE L'ARTICLE */}
          <div className="lg:col-span-8 lg:col-start-5">
            {/* Résumé / Excerpt */}
            <div className="mb-12">
              <p className="text-2xl font-medium text-slate-600 italic leading-relaxed border-l-4 border-amber-500 pl-8">
                &quot;{post.excerpt}&quot;
              </p>
            </div>

            {/* Contenu principal stylisé avec prose */}
            <article
              className="prose prose-slate prose-lg max-w-none 
              prose-headings:uppercase prose-headings:italic prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-900
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-a:text-amber-500 hover:prose-a:text-amber-600 transition-colors
              prose-strong:text-slate-900
              prose-img:rounded-[2.5rem] prose-img:shadow-2xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA DE FIN D'ARTICLE */}
            <div className="mt-20 p-12 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl group">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-md">
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4 leading-none">
                    Envie de vivre cette{" "}
                    <span className="text-amber-500">expérience</span> ?
                  </h3>
                  <p className="text-slate-400 text-sm font-medium">
                    Nos experts créent pour vous le voyage qui vous ressemble au{" "}
                    {post.destination?.name}.
                  </p>
                </div>
                <Link
                  href="/sur-mesure"
                  className="bg-amber-500 text-slate-900 px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-white hover:scale-105 transition-all flex items-center gap-3 shadow-xl"
                >
                  Créer mon voyage <ChevronRight size={16} />
                </Link>
              </div>
              {/* Cercle décoratif */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors" />
            </div>
          </div>
        </div>
      </section>
      {/* SECTION CIRCUITS SUGGÉRÉS */}
      <section>
        {post.destination?.circuits && post.destination.circuits.length > 0 && (
          <div className="mt-20 pt-16 border-t border-slate-100">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-8">
              Prêt à partir au{" "}
              <span className="text-amber-500">{post.destination.name}</span> ?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.destination.circuits.map((circuit) => (
                <Link
                  key={circuit.id}
                  href={`/circuits/${circuit.slug}`}
                  className="group flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-slate-100"
                >
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <NextImage
                      src={circuit.presentationImg || "/placeholder.jpg"}
                      alt={circuit.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px" // 100% sur mobile, 300px sur desktop
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-amber-600 tracking-widest mb-1">
                      {circuit.duration} jours
                    </p>
                    <h4 className="font-black uppercase italic text-slate-900 group-hover:text-amber-500 transition-colors leading-none mb-2">
                      {circuit.title}
                    </h4>
                    <p className="text-xs font-bold text-slate-400">
                      À partir de {circuit.priceBase}€
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
