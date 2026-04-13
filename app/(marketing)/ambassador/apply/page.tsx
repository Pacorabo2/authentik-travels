"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

export default function AmbassadorApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    profile: "",
    audience: "",
    destination: "",
    timing: "",
    whatsapp: "",
  });

  // Fonctions de navigation
  const nextStep = () => {
    // Validation simple : on ne passe pas si le champ est vide
    if (step === 1 && !formData.profile)
      return toast.error("Sélectionnez votre profil");
    if (step === 2 && !formData.audience)
      return toast.error("Sélectionnez la taille de votre tribu");
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (!formData.whatsapp)
      return toast.error("Votre numéro WhatsApp est requis");

    toast.success("Analyse de votre profil en cours...");

    // Simulation : redirection vers Calendly après 1.5s
    setTimeout(() => {
      router.push("https://calendly.com/authentika-info");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 text-slate-900">
      <div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100 relative">
        {/* BOUTON RETOUR (Flottant en haut à gauche) */}
        {step > 1 && (
          <button
            onClick={prevStep}
            className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors font-bold text-xs uppercase tracking-widest"
          >
            <ChevronLeft size={16} /> Retour
          </button>
        )}

        {/* PROGRESS BAR */}
        <div className="flex gap-2 mb-12 mt-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? "bg-amber-500" : "bg-slate-100"}`}
            />
          ))}
        </div>

        {/* ÉTAPE 1 : PROFIL */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black uppercase italic mb-8">
              Quel est votre <span className="text-amber-500">profil ?</span>
            </h2>
            <div className="grid gap-3 mb-8">
              {[
                "Professeur de danse",
                "Influenceur / Créateur",
                "Association",
                "Autre",
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFormData({ ...formData, profile: opt })}
                  className={`p-5 text-left border-2 rounded-2xl font-bold transition-all ${
                    formData.profile === opt
                      ? "border-amber-500 bg-amber-50 shadow-md translate-x-2"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button
              onClick={nextStep}
              className="w-full bg-slate-900 text-white font-black uppercase py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-amber-500 transition-colors"
            >
              Suivant <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* ÉTAPE 2 : AUDIENCE */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-black uppercase italic mb-8">
              Taille de votre <span className="text-amber-500">tribu ?</span>
            </h2>
            <div className="grid gap-3 mb-8">
              {[
                "Moins de 10 personnes",
                "10 à 15 personnes",
                "15 à 20 personnes",
                "Plus de 20 personnes",
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFormData({ ...formData, audience: opt })}
                  className={`p-5 text-left border-2 rounded-2xl font-bold transition-all ${
                    formData.audience === opt
                      ? "border-amber-500 bg-amber-50 shadow-md translate-x-2"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button
              onClick={nextStep}
              className="w-full bg-slate-900 text-white font-black uppercase py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-amber-500 transition-colors"
            >
              Suivant <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* ÉTAPE 3 : INFOS FINALES */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-black uppercase italic mb-8">
              Vos <span className="text-amber-500">envies ?</span>
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest text-slate-400">
                  Destination souhaitée
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  className="w-full p-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-amber-500 transition-all font-bold"
                  placeholder="Ex: Colombie, Cuba..."
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest text-slate-400">
                  Votre WhatsApp (pour le rappel)
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  className="w-full p-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-amber-500 transition-all font-bold"
                  placeholder="+33 6 ..."
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-slate-900 text-white font-black uppercase py-6 rounded-2xl hover:bg-amber-500 transition-all shadow-lg hover:shadow-amber-500/20 mt-4"
              >
                Plannifier un appel
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
