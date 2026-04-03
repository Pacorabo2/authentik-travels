//La page "Hub" (Hero pays + Présentation + 3 cartes Circuits Classiques).
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getEmbedVideoUrl } from "@/lib/video-utils";

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // On récupère la destination ET ses circuits classiques uniquement
  const destination = await prisma.destination.findUnique({
    where: { slug },
    include: {
      circuits: {
        where: { isPublished: true },
        take: 3,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const videoSrc = getEmbedVideoUrl(destination.heroVideoUrl);

  if (!destination) return notFound();
  console.log("Lien url de la vidéo : " + destination.heroVideoUrl);
  return (
    <main>
      {/* SECTION A : HERO - L'ÉMOTION (Le Pays) */}
      <section className="relative h-[80vh] -mt-[80px] w-full flex items-center justify-center bg-slate-900">
        {videoSrc ? (
          <div className="absolute inset-0 pointer-events-none">
            <iframe
              src={videoSrc}
              className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 border-none"
              allow="autoplay; fullscreen; picture-in-picture"
            />
          </div>
        ) : (
          <Image
            src={destination.imageUrl || "/default-country.jpg"}
            fill
            className="object-cover opacity-50"
            alt={destination.name}
          />
        )}
        <div className="relative z-10 text-center px-4">
          <span className="text-amber-500 font-black uppercase tracking-[0.2em] text-base mb-4 block animate-fade-in">
            Découvrez l&apos;Authentique
          </span>
          <h1 className="relative z-10 text-8xl font-bold text-white tracking-tighter">
            {destination.name}
            <span className="text-amber-500 text-7xl md:text-9xl">.</span>
          </h1>
        </div>
      </section>

      {/* SECTION B : PRÉSENTATION - L'EXPERTISE PAYS */}
      <section className="container mx-auto py-24 px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/3 relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image
              src={destination.imageUrl || "/placeholder.jpg"}
              fill
              className="object-cover"
              alt={`Découvrir ${destination.name}`}
            />
          </div>
          <div className="w-full md:w-2/3 space-y-6">
            <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-sm">
              L&apos;Esprit Authentik
            </span>
            <h2 className="text-5xl font-bold text-slate-900 leading-tight">
              {destination.tagline}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              {destination.description}
            </p>

            {/* CTA Vers les deux options de voyage classique */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem]">
                <h3 className="text-2xl font-bold italic text-slate-900">
                  Circuits Classiques
                </h3>
                <p className="mt-4 text-slate-500 mb-6">
                  Des itinéraires optimisés pour découvrir les essentiels de{" "}
                  {destination.name} en toute liberté.
                </p>
                <Link
                  href="#inspirations"
                  className="text-sm font-black uppercase tracking-widest text-amber-600 hover:text-slate-900 transition-colors"
                >
                  Voir nos exemples ↓
                </Link>
              </div>
              <Link
                href={`/sur-mesure?country=${destination.slug}`}
                className="p-8 bg-slate-900 text-white rounded-[2rem] hover:bg-amber-500 transition-all group"
              >
                <h3 className="text-2xl font-bold italic">
                  {destination.name} Sur-Mesure
                </h3>
                <p className="mt-4 text-slate-300 group-hover:text-white">
                  Créez votre propre aventure 100% personnalisée avec nos
                  experts locaux.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C : EXEMPLES DE CIRCUITS - LA PREUVE (Table 'Circuit') */}
      <section id="inspirations" className="bg-slate-50 py-24">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black uppercase italic tracking-tight">
                Inspirations{" "}
                <span className="text-amber-500 text-4xl">Classiques</span>
              </h2>
              <p className="text-slate-500 mt-2">
                Exemples de séjours personnalisables pour couples et familles
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destination.circuits.length > 0 ? (
              destination.circuits.map((circuit) => (
                <div
                  key={circuit.id}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex flex-col"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={
                        circuit.presentationImg || "/placeholder-circuit.jpg"
                      }
                      fill
                      className="object-cover"
                      alt={circuit.title}
                    />
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex justify-between items-start">
                      <span className="text-amber-500 font-bold text-sm uppercase">
                        {circuit.duration} jours
                      </span>
                      <span className="text-slate-400 font-bold text-xs">
                        À partir de {circuit.priceBase}€
                      </span>
                    </div>
                    <h4 className="text-2xl font-black mt-4 uppercase italic leading-tight">
                      {circuit.title}
                    </h4>
                    <p className="mt-4 text-slate-500 text-sm line-clamp-3 flex-grow">
                      {circuit.description}
                    </p>
                    <Link
                      href={`/circuits/${circuit.slug}`}
                      className="mt-8 block text-center font-black uppercase text-xs tracking-widest bg-slate-900 text-white px-6 py-4 rounded-xl hover:bg-amber-500 transition-colors"
                    >
                      Découvrir l&apos;itinéraire
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 italic">
                De nouveaux circuits classiques arrivent bientôt pour cette
                destination.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
