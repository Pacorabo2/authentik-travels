import Image from "next/image";

export default function AproposPage() {
  return (
    <main className="min-h-screen bg-white pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Titre */}
        <div className="max-w-3xl mb-6">
          <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">
            L&apos;ADN Authentik
          </span>
          <h1 className="text-6xl md:text-7xl font-bold tracking-medium text-slate-900 leading-none">
            L&apos;histoire d&apos;une
            <br />
            passion brute<span className="text-amber-500">.</span>
          </h1>
        </div>

        {/* Section Contenu + Image */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
            <Image
              src="https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/_DSC3127.JPG"
              alt="Cubain fumant le cigare"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900 text-2xl">
              Authentik Travels n&apos;est pas née dans un bureau, mais dans les
              ruelles de la vieille Havane.
            </p>
            <p>
              Depuis 2017, notre mission est simple : briser la vitre qui sépare
              le touriste du local.
            </p>
            <p>
              Nous croyons qu&apos;un vrai voyage commence là où s&apos;arrêtent
              les cartes touristiques. Que pour comprendre un pays, il faut
              partager un repas avec ses habitants, se perdre dans ses marchés,
              s&apos;émerveiller devant ses paysages.
            </p>
            <p>
              Chez Authentik Travels, nous créons des expériences ancrées dans
              le réel. Chaque voyage est une histoire, écrite par les habitants
              qui vous partagent leur quotidien.
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
