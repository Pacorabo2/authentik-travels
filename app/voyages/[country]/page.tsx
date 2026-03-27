import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function CountryLandingPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const countryName = decodeURIComponent(country).replace(/-/g, " ");

  // On pourrait imaginer une table "Destination" en BDD pour stocker la vidéo et le texte par pays
  // Pour l'instant, on utilise une logique dynamique

  return (
    <main className="min-h-screen bg-white">
      {/* 🎥 HERO SECTION ÉMOTIONNELLE (Montage Vidéo) */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          // La vidéo change dynamiquement selon le pays
          src={`/videos/destinations/${country.toLowerCase()}.mp4`}
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-7xl md:text-9xl font-black italic text-white uppercase tracking-tighter">
            {countryName}
            <span className="text-amber-500">.</span>
          </h1>
        </div>
      </section>

      {/* 📝 STORYTELLING DU PAYS */}
      <section className="py-24 max-w-5xl mx-auto px-6 text-center">
        <span className="text-amber-600 font-black uppercase tracking-widest text-sm mb-6 block">
          L&apos;Esprit Authentik
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 italic leading-tight">
          Bienvenue en terre d&apos;immersion.
        </h2>
        <p className="text-xl text-slate-600 leading-relaxed mb-12">
          {/* Ce texte devrait idéalement venir d'une table "Destination" dans Prisma */}
          Découvrez {countryName} à travers les visages de ceux qui le font
          vibrer. Entre partages avec les communautés locales et paysages hors
          du commun, nous vous ouvrons les portes d&apos;un voyage que vous
          n&apos;auriez jamais trouvé seul.
        </p>

        {/* 🔀 L'AIGUILLAGE (Le carrefour) */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="p-12 rounded-[3rem] bg-slate-900 text-white text-left group hover:bg-slate-800 transition-all">
            <h3 className="text-3xl font-black italic mb-4">
              L&apos;Énergie du Groupe
            </h3>
            <p className="text-slate-400 mb-8">
              Rejoins une tribu de passionnés pour un départ thématique (Salsa,
              Yoga).
            </p>
            <Link
              href={`/groupTrip?destination=${countryName}`}
              className="px-8 py-4 bg-amber-500 text-slate-900 font-black rounded-full inline-block"
            >
              VOIR LES DÉPARTS
            </Link>
          </div>

          <div className="p-12 rounded-[3rem] bg-amber-50 text-left border border-amber-100 group hover:shadow-xl transition-all">
            <h3 className="text-3xl font-black italic mb-4 text-slate-900">
              100% Sur-Mesure
            </h3>
            <p className="text-slate-600 mb-8">
              On s&apos;occupe de tout. Ton itinéraire, tes dates, ton rythme,
              notre expertise.
            </p>
            <Link
              href="/sur-mesure"
              className="px-8 py-4 bg-slate-900 text-white font-black rounded-full inline-block"
            >
              CRÉER MON PROJET
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
