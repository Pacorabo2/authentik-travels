import Image from "next/image";
import Link from "next/link";
import { renderDescription } from "@/lib/text-utils";
import { CheckCircle2, Users, Plane, Star } from "lucide-react";
import { getEmbedVideoUrl } from "@/lib/video-utils";

export default function AmbassadorPage() {
  const introText =
    "Vous êtes prof de danse, vous avez une école, une association de danse, de yoga ou vous voulez partir en voyage avec votre communauté ? \n En devenant Ambassadeur, vous ne vous contentez pas de voyager : vous signez une expérience exclusive pour votre communauté, encadrée par une logistique infaillible.";

  const videoSrc = getEmbedVideoUrl("https://vimeo.com/688119406?fl=ip&fe=ec");

  return (
    <main className="bg-white min-h-screen">
      {/* SECTION 1 : HERO VIDÉO (TÉMOIGNAGES) */}
      <section className="relative h-[100vh] -mt-[80px] w-full flex items-center justify-center bg-slate-900 overflow-hidden">
        {/* On réutilise ici la logique d'embed pour tes vidéos de témoignages */}
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
            src="https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/_DSC3127.JPG"
            fill
            className="object-cover opacity-50"
            alt=""
          />
        )}

        {/* 2. L'OVERLAY SOMBRE (Filtre de lisibilité) */}
        {/* 'z-10' le place au-dessus de la vidéo (z-0) mais en dessous du texte (z-20) */}
        <div className="absolute z-10 w-full h-full bg-black/55"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-sm mb-6 block">
            Programme Ambassadeur
          </span>
          <h1 className="text-6xl md:text-[8rem] font-bold text-white tracking-medium mb-8">
            Devenez ambassadeur <span className="text-amber-500">.</span>
          </h1>
          <p className="text-white text-xl md:text-2xl font-medium max-w-2xl mx-auto italic opacity-90">
            "Proposez un voyage hos du commun à votre groupe sans vous soucier
            de l&apos;organisation ni de la logistique."
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* SECTION 2 : L'ARGUMENTAIRE (STICKY DESIGN) */}
      <section className="py-32 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="lg:sticky lg:top-32 relative h-[60vh] rounded-[3.5rem] overflow-hidden shadow-2xl">
            <Image
              src="https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/AUTENTIK%20(92%20de%20143).jpg"
              fill
              className="object-cover"
              alt="Groupe de danse Authentik"
            />
          </div>

          <div>
            <div className="mb-12">
              <h2 className="text-5xl font-black text-slate-900 italic uppercase tracking-tighter mb-8">
                Pourquoi devenir{" "}
                <span className="text-amber-500">Ambassadeur ?</span>
              </h2>
              <div className="border-l-4 border-amber-500 pl-8 py-2 text-slate-600 text-xl font-medium leading-relaxed">
                {renderDescription(introText)}
              </div>
            </div>

            <div className="space-y-8">
              {[
                {
                  title: "Rayonnement",
                  desc: "Renforcez votre image de marque et votre crédibilité auprès de vos élèves ou followers.",
                  icon: <Star className="text-amber-500 hover:text-white" />,
                },
                {
                  title: "Zéro Logistique",
                  desc: "On s'occupe de tout : vols, hébergements, transferts, visas. Vous vous concentrez sur l'humain.",
                  icon: <Plane className="text-amber-500 hover:text-white" />,
                },
                {
                  title: "ROI Garanti",
                  desc: "Un modèle économique avantageux pour vous permettre de voyager et d'être rémunéré.",
                  icon: <Users className="text-amber-500 hover:text-white" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-6 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black uppercase italic text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 : LES CHIFFRES CLÉS */}
      <section className="bg-slate-900 py-32 rounded-[4rem] text-center text-white mx-4">
        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-20">
          L&apos;impact <span className="text-amber-500">Authentik</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
          <div>
            <p className="text-7xl font-black text-amber-500 italic">12</p>
            <p className="text-slate-400 uppercase font-black tracking-widest text-xs mt-4">
              Taille idéale d&apos;un groupe
            </p>
          </div>
          <div>
            <p className="text-7xl font-black text-white italic">100%</p>
            <p className="text-slate-400 uppercase font-black tracking-widest text-xs mt-4">
              De satisfaction Ambassadeurs
            </p>
          </div>
          <div>
            <p className="text-7xl font-black text-amber-500 italic">0€</p>
            <p className="text-slate-400 uppercase font-black tracking-widest text-xs mt-4">
              De frais pour l&apos;organisateur
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 : CTA FINAL */}
      <section className="py-32 text-center px-6">
        <div className="max-w-3xl mx-auto bg-amber-500 p-16 rounded-[4rem] shadow-2xl shadow-amber-100">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900 mb-8">
            Prêt à emmener <br />
            votre tribu ?
          </h2>
          <p className="text-slate-900/70 text-xl font-medium mb-12">
            Nous sélectionnons un nombre limité de nouveaux ambassadeurs chaque
            saison pour garantir une qualité de service irréprochable.
          </p>
          <Link
            href="/contact?type=ambassador"
            className="inline-block bg-slate-900 text-white px-12 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all duration-300"
          >
            Déposer ma candidature
          </Link>
        </div>
      </section>
    </main>
  );
}
