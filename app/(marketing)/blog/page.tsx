// app/(marketing)/blog/page.tsx
import { getPosts } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-12">
          Le <span className="text-amber-500">Blog</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.mainImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {post.destination && (
                  <span className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900">
                    {post.destination.name}
                  </span>
                )}
              </div>
              <div className="p-8">
                <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                  {post.category}
                </p>
                <h2 className="text-2xl font-black italic uppercase leading-none mb-4 group-hover:text-amber-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {post.readingTime} min de lecture
                  </span>
                  <span className="text-slate-900 font-black text-sm group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
