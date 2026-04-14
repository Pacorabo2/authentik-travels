// app/not-found.tsx
import Link from "next/link";
import Image from "next/image";
import { MapPin, MoveRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pt-32 pb-20 text-slate-900">
      <div className="max-w-4xl w-full bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-12 md:gap-16 relative overflow-hidden">
        {/* Décoration subtile en arrière-plan */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-slate-900/5 rounded-full blur-3xl" />

        {/* COLONNE GAUCHE : VISUEL */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden ring-8 ring-amber-500 ring-offset-8 shadow-2xl rotate-[-5deg]">
            <Image
              src="https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/_DSC3127.JPG"
              alt="Voyageur perdu mais heureux"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
          {/* Badge 404 stylisé */}
          <div className="absolute -top-4 -right-4 bg-slate-900 text-white font-black text-6xl px-6 py-3 rounded-2xl rotate-[15deg] shadow-xl italic tracking-tighter">
            404
          </div>
        </div>

        {/* COLONNE DROITE : TEXTE & CTA */}
        <div className="w-full md:w-1/2 text-center md:text-left relative z-10">
          <span className="flex items-center justify-center md:justify-start gap-2 text-amber-500 font-black uppercase tracking-[0.3em] text-xs mb-4">
            <MapPin size={14} /> Oups... Itinéraire Inconnu
          </span>

          <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none mb-6 text-balance">
            Même les meilleurs <br />
            se perdent{" "}
            <span className="text-amber-500 text-not-italic">en route .</span>
          </h1>

          <p className="text-slate-600 text-lg font-medium leading-relaxed mb-10 text-balance">
            On dirait que cette étape ne figurait pas au programme. Pas de
            panique, l&apos;aventure brute, c&apos;est aussi savoir improviser
            et retrouver son chemin.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/"
              className="group bg-slate-900 text-white px-8 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-amber-500 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-amber-500/20"
            >
              Retourner au Camp de Base
              <MoveRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
