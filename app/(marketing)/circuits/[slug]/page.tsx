import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import TripItinerary from "@/components/TripItinerary";
import Image from "next/image";
import Link from "next/link";

export default async function CircuitDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const circuit = await prisma.circuit.findUnique({
    where: { slug },
    include: { destination: true },
  });

  if (!circuit) return notFound();

  return (
    <main className="bg-white">
      {/* SECTION A : HERO - VISUEL DU CIRCUIT */}
      <section className="relative h-[70vh] w-full flex items-center justify-center bg-slate-900">
        <Image
          src={circuit.presentationImg || "/default-circuit.jpg"}
          fill
          className="object-cover opacity-60"
          alt={circuit.title}
        />
        <div className="relative z-10 text-center px-4">
          <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-sm mb-4 block">
            Circuit Classique • {circuit.destination.name}
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter">
            {circuit.title}
          </h1>
        </div>
      </section>

      {/* SECTION B : PRÉSENTATION & TARIFS (Version Classique) */}
      <section className="container mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <span className="text-amber-500 font-black uppercase tracking-widest text-xs">
              L&apos;Esprit Authentik
            </span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 italic leading-tight">
              {circuit.tagline}
            </h2>
          </div>
          <p className="text-xl text-slate-600 leading-relaxed whitespace-pre-line">
            {circuit.description}
          </p>
        </div>

        {/* BOX DE RÉSUMÉ / APPEL À L'ACTION */}
        <div className="bg-slate-50 p-10 rounded-[3rem] h-fit border border-slate-100 shadow-sm sticky top-24">
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-6 border-b border-slate-200">
              <span className="font-bold text-slate-400 uppercase text-xs tracking-widest">
                Durée
              </span>
              <span className="font-black text-slate-900 text-xl">
                {circuit.duration} Jours
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-400 uppercase text-xs tracking-widest">
                À partir de
              </span>
              <p className="text-5xl font-black text-slate-900">
                {circuit.priceBase}€
                <span className="text-sm font-medium text-slate-400 ml-2">
                  / pers.
                </span>
              </p>
            </div>

            <div className="pt-6 space-y-4">
              <Link
                href={`/sur-mesure?base=${circuit.slug}`}
                className="block w-full text-center bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-500 transition-all shadow-xl shadow-slate-200"
              >
                Personnaliser ce voyage
              </Link>
              <p className="text-[10px] text-center text-slate-400 uppercase font-bold tracking-widest">
                Devis gratuit sous 48h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C : L'ITINÉRAIRE DÉTAILLÉ */}
      <section className="bg-slate-50/50 py-24 border-t border-slate-100">
        <div className="container mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-black uppercase italic text-slate-900">
            Le Programme <span className="text-amber-500">Suggéré</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto italic">
            Cet itinéraire est une base de travail. Nous l&apos;adaptons selon
            vos envies, votre rythme et votre budget.
          </p>
        </div>
        <TripItinerary program={circuit.program} />
      </section>
    </main>
  );
}
