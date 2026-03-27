import Image from "next/image";

export default function AproposPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Titre */}
        <div className="max-w-3xl mb-20">
          <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">
            L&apos;ADN Authentik
          </span>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-slate-900 leading-[0.9]">
            L&apos;HISTOIRE D&apos;UNE
            <br />
            PASSION BRUTE<span className="text-amber-500">.</span>
          </h1>
        </div>

        {/* Section Contenu + Image */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000"
              alt="Notre fondateur sur le terrain"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900 text-2xl">
              Authentik Travels n&apos;est pas née dans un bureau, mais sur les
              pistes de danse de La Havane et les sentiers de la Sierra Nevada.
            </p>
            <p>
              Depuis 2017, notre mission est simple : briser la vitre qui sépare
              le touriste du local. Nous croyons que le voyage commence là où
              les guides papier s&apos;arrêtent.
            </p>
            <p>
              Chaque itinéraire que nous proposons a été testé, dormi, mangé et
              dansé par notre équipe. Nous ne vendons pas des destinations, nous
              partageons nos attaches.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <p className="text-4xl font-black text-slate-900">+500</p>
                <p className="text-sm uppercase font-bold text-amber-600">
                  Voyageurs
                </p>
              </div>
              <div>
                <p className="text-4xl font-black text-slate-900">100%</p>
                <p className="text-sm uppercase font-bold text-amber-600">
                  Local partners
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
