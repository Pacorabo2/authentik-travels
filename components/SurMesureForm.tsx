"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLead } from "../app/(marketing)/sur-mesure/action";
import * as z from "zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

const formSchema = z
  .object({
    firstName: z.string().min(2, "Le prénom est requis"),
    lastName: z.string().min(2, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    phone: z
      .string()
      .regex(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Numéro invalide",
      ),
    destination: z.string().min(2, "Destination requise"),
    startDate: z.string().min(1, "Date de début requise"),
    endDate: z.string().min(1, "Date de fin requise"),
    partySize: z.coerce.number().min(1, "Minimum 1 voyageur"),
    budget: z.string().min(1, "Budget requis"),
    experienceType: z.string().min(1, "Type d'expérience requis"), // Était manquant dans le HTML
    additionalNotes: z.string().optional(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "La date de fin doit être après la date de début",
    path: ["endDate"],
  });

type FormData = z.infer<typeof formSchema>;

export default function SurMesureForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState(""); // Pour le message de succès
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partySize: 1,
      firstName: "",
      lastName: "",
      email: "",
      destination: "",
      experienceType: "",
      budget: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createLead(data);
      if (result.success) {
        setSubmittedName(data.firstName);
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(result.error || "Une erreur est survenue.");
      }
    } catch (err) {
      setError("Connexion au serveur impossible.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 p-10 rounded-[2.5rem] text-center shadow-xl animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
          <CheckCircle2 className="text-white" size={40} />
        </div>
        <h3 className="text-3xl font-black italic uppercase tracking-tighter text-emerald-900 mb-4">
          Demande <span className="text-emerald-600">reçue</span> !
        </h3>
        <p className="text-emerald-700 font-medium leading-relaxed max-w-md mx-auto">
          Merci {submittedName} ! Nos experts analysent vos envies et vous
          recontactent sous 48h.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 space-y-8 relative overflow-hidden"
    >
      {error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 animate-shake">
          <AlertCircle size={20} />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
          Votre projet <span className="text-amber-500">sur-mesure</span>
        </h3>
        <p className="text-slate-400 text-sm font-medium">
          Réponse garantie sous 48h par nos experts locaux.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            Prénom
          </label>
          <input
            {...register("firstName")}
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-amber-500 focus:bg-white transition-all outline-none"
            placeholder="Ex: Lucas"
          />
          {errors.firstName && (
            <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="group">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            Nom
          </label>
          <input
            {...register("lastName")}
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-amber-500 focus:bg-white transition-all outline-none"
            placeholder="Ex: Martin"
          />
          {errors.lastName && (
            <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="group">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-amber-500 focus:bg-white transition-all outline-none"
            placeholder="lucas@exemple.com"
          />
          {errors.email && (
            <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="group">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            Téléphone
          </label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-amber-500 focus:bg-white transition-all outline-none"
            placeholder="+33 6..."
          />
          {errors.phone && (
            <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2 group">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            Destination
          </label>
          <input
            {...register("destination")}
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-amber-500 focus:bg-white transition-all outline-none"
            placeholder="Cuba, Colombie, Panama..."
          />
        </div>

        <div className="group">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            Départ prévu
          </label>
          <input
            {...register("startDate")}
            type="date"
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-amber-500 focus:bg-white transition-all outline-none"
          />
        </div>
        <div className="group">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            Retour prévu
          </label>
          <input
            {...register("endDate")}
            type="date"
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-amber-500 focus:bg-white transition-all outline-none"
          />
          {errors.endDate && (
            <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">
              {errors.endDate.message}
            </p>
          )}
        </div>

        <div className="group">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            Voyageurs
          </label>
          <input
            {...register("partySize")}
            type="number"
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-amber-500 focus:bg-white transition-all outline-none"
          />
        </div>

        {/* AJOUT DU CHAMP EXPERIENCE TYPE QUI BLOQUAIT TOUT */}
        <div className="group">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            Type d'expérience
          </label>
          <select
            {...register("experienceType")}
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-amber-500 focus:bg-white transition-all outline-none appearance-none"
          >
            <option value="">Sélectionnez...</option>
            <option value="Aventure">Aventure & Nature</option>
            <option value="Culture">Culture & Histoire</option>
            <option value="Detente">Détente & Plage</option>
          </select>
          {errors.experienceType && (
            <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">
              {errors.experienceType.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2 group">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            Budget estimé / pers.
          </label>
          <select
            {...register("budget")}
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-amber-500 focus:bg-white transition-all outline-none appearance-none"
          >
            <option value="">Sélectionnez...</option>
            <option value="1500-2000">1500€ - 2000€</option>
            <option value="2000-3000">2000€ - 3000€</option>
            <option value="3000+">3000€ et +</option>
          </select>
        </div>
      </div>

      <div className="group">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
          Notes particulières
        </label>
        <textarea
          {...register("additionalNotes")}
          rows={4}
          className="w-full px-5 py-4 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:border-amber-500 focus:bg-white transition-all outline-none"
          placeholder="Dites-nous tout..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-slate-900 text-white font-black uppercase text-xs tracking-[0.3em] py-6 rounded-[2rem] hover:bg-amber-500 hover:text-slate-900 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 group"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            <Send size={16} /> Créer mon voyage
          </>
        )}
      </button>
    </form>
  );
}
