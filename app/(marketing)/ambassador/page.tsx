import Image from "next/image";
import Link from "next/link";
import { renderDescription } from "@/lib/text-utils";
import { Users, Plane, Star } from "lucide-react";
import { getEmbedVideoUrl } from "@/lib/video-utils";
import LeadMagnetForm from "./LeadMagnetForm";

export default function AmbassadorPage() {
  const introText =
    "Vous êtes professeur de danse, vous avez une école, une association de danse, de yoga ou vous voulez partir en voyage avec votre communauté ? \n En devenant Ambassadeur, vous ne vous contentez pas de voyager : vous signez une expérience exclusive pour votre communauté, encadrée par une logistique infaillible.";

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
            priority
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
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white tracking-medium text-balance">
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
          {/* COLONNE GAUCHE : On garde le sticky sur le conteneur extérieur */}
          <div className="lg:sticky lg:top-32">
            <div className="relative h-[60vh] rounded-[3.5rem] overflow-hidden shadow-2xl">
              <Image
                src="https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/AUTENTIK%20(92%20de%20143).jpg"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                alt="Groupe de danse Authentik"
              />
            </div>
          </div>

          {/* COLONNE DROITE : Texte */}
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
      <section className="bg-amber-500 py-32 rounded-[4rem] text-center text-white mx-4">
        <h2 className="text-4xl text-white md:text-6xl font-black italic uppercase tracking-tighter mb-20">
          L&apos;impact <span className="text-slate-900">Authentik</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
          <div>
            <p className="text-7xl font-black text-slate-900 italic">12</p>
            <p className="text-slate-600 uppercase font-black tracking-widest text-4xs mt-4">
              Taille idéale d&apos;un groupe
            </p>
          </div>
          <div>
            <p className="text-7xl font-black text-white italic">100%</p>
            <p className="text-slate-600 uppercase font-black tracking-widest text-4xs mt-4">
              Satisfaction Ambassadeurs
            </p>
          </div>
          <div>
            <p className="text-7xl font-black text-slate-900 italic">0€</p>
            <p className="text-slate-600 uppercase font-black tracking-widest text-4xs mt-4">
              Frais pour l&apos;ambassadeur
            </p>
          </div>
        </div>
      </section>

      {/* SECTION : PREUVE SOCIALE LIVE */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-black uppercase tracking-widest text-xs">
              La voix des experts
            </span>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900 mt-4">
              Ils ont franchi <span className="text-amber-500">le pas</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Marco",
                role: "Professeur de Salsa",
                text: "J'appréhendais la logistique pour mes 12 élèves. Authentik a tout géré, j'ai pu me concentrer sur la danse.",
                img: "https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/lachi.jpg",
              },
              {
                name: "Elena",
                role: "Influenceuse Voyage",
                text: "Le concept d'immersion brute a conquis ma communauté. Un voyage complet en moins de 48h !",
                img: "https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/lachi.jpg",
              },
              {
                name: "Thomas",
                role: "Coach Bien-être",
                text: "La Colombie avec Authentik a été une révélation. La sécurité est impeccable, l'immersion est totale.",
                img: "https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/lachi.jpg",
              },
            ].map((testimo, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="relative w-24 h-24 mb-6 rounded-full overflow-hidden ring-4 ring-amber-500 ring-offset-4">
                  <Image
                    src={testimo.img}
                    fill
                    sizes="15vw"
                    className="object-cover"
                    alt={testimo.name}
                  />
                </div>
                <p className="text-slate-600 italic mb-6 leading-relaxed">
                  "{testimo.text}"
                </p>
                <h4 className="font-black uppercase italic text-slate-900 tracking-tighter">
                  {testimo.name}
                </h4>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                  {testimo.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 : CTA FINAL OPTIMISÉ */}
      <section className="py-32 text-center px-6">
        <div className="max-w-4xl mx-auto bg-slate-900 p-16 rounded-[4rem] shadow-2xl relative overflow-hidden">
          {/* Décoration subtile */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-8 relative z-10">
            Prêt à transformer <br />
            votre passion en <span className="text-amber-500">aventure ?</span>
          </h2>

          <p className="text-slate-400 text-xl font-medium mb-12 max-w-2xl mx-auto relative z-10">
            Choisissez un créneau de 15 minutes pour discuter de votre projet et
            découvrir comment nous gérons toute la logistique pour vous.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center relative z-10">
            {/* BOUTON PRINCIPAL : CALENDRIER */}
            <Link
              href="/ambassador/apply"
              target="_blank"
              className="bg-amber-500 text-slate-900 px-10 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-xl shadow-amber-500/20"
            >
              📅 Réserver mon appel découverte
            </Link>

            {/* BOUTON SECONDAIRE : WHATSAPP */}
            <a
              href="/api/whatsapp"
              target="_blank"
              className="bg-white/10 text-white border border-white/20 px-10 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
              </svg>{" "}
              WhatsApp Direct
            </a>
          </div>

          <p className="mt-8 text-slate-500 text-xs uppercase tracking-widest font-bold">
            — Réponse garantie sous 24h —
          </p>
        </div>
      </section>

      {/* SECTION : LEAD MAGNET - LE GUIDE PDF */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[4rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
          {/* Visuel du Guide */}
          <div className="w-full md:w-1/2 relative h-80 md:h-auto bg-amber-500 flex items-center justify-center p-12">
            <div className="relative w-full h-full shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
              <Image
                src="https://twszcusnnpsazakoxuxn.supabase.co/storage/v1/object/public/trips/flyer2his.png"
                fill
                sizes="(max-width: 768px) 100vw, 33vw" // Ajout du sizes pour la perf
                className="object-cover rounded-lg"
                alt="Guide Ambassadeur Authentik Travels"
                priority
              />
            </div>
          </div>

          {/* Texte et Formulaire */}
          <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
            <span className="text-amber-500 font-black uppercase tracking-widest text-[10px] mb-4">
              Ressource Gratuite
            </span>
            <h3 className="text-3xl md:text-4xl font-black italic uppercase text-white leading-none mb-6">
              Le Guide <span className="text-amber-500">Complet </span> de
              l&apos;Ambassadeur
            </h3>
            <p className="text-slate-400 mb-8 font-medium">
              Apprenez à fédérer votre tribu, choisir la bonne période et
              rentabiliser votre projet de voyage en 10 étapes clés.
            </p>

            {/* APPEL DU COMPOSANT CLIENT */}
            <LeadMagnetForm />

            <p className="mt-4 text-[9px] text-slate-500 uppercase tracking-widest text-center">
              🔒 Vos données restent privées. Pas de spam.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
