// app/(marketing)/blog/page.tsx

import React from "react";

export default function BlogPage() {
  return (
    <main className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900">
          Le <span className="text-amber-500">Blog</span>
        </h1>
        <p className="text-slate-500 mt-6 font-medium">
          Les récits d&apos;aventures Authentik Travels arrivent très bientôt.
        </p>

        {/* Grille de test vide */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-center text-slate-300 italic"
            >
              Article en cours de rédaction...
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
