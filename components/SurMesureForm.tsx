// components/SurMesureForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 1. DÉFINITION DE LA SÉCURITÉ (Schéma Zod)
// On dicte ici les règles strictes que notre formulaire doit respecter
const formSchema = z
  .object({
    firstName: z.string().min(2, "Le prénom est requis"),
    lastName: z.string().min(2, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    // Sécurité téléphone : accepte les formats internationaux, chiffres, espaces, points, parenthèses
    phone: z
      .string()
      .regex(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Numéro invalide",
      ),
    destination: z.string().min(2, "Destination requise"),
    startDate: z.string().min(1, "Date de début requise"),
    endDate: z.string().min(1, "Date de fin requise"),
    partySize: z.coerce.number().min(1),
    budget: z.string().min(1),
    experienceType: z.string().min(1),
    additionalNotes: z.string().optional(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "La date de fin doit être après la date de début",
    path: ["endDate"],
  });

// On extrait le type TypeScript à partir de notre schéma Zod
type FormData = z.infer<typeof formSchema>;

export default function SurMesureForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 2. CONFIGURATION DE REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema), // On connecte Zod à notre formulaire
    defaultValues: {
      partySize: 1, // Donne une valeur par défaut numérique
      firstName: "",
      lastName: "",
      email: "",
      destination: "",
      budget: "",
      experienceType: "",
    },
  });

  // 3. FONCTION D'ENVOI (Version Réelle)
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    // Calcul du nombre de jours (Différence en ms / ms par jour)
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const dayNumber = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const nightNumber = dayNumber - 1;

    const payload = {
      ...data,
      dayNumber,
      nightNumber,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };

    try {
      const response = await fetch("/api/sur-mesure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Une erreur est survenue");
      }

      // Si tout est OK
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Désolé, impossible d'envoyer votre demande : " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Affichage en cas de succès
  if (isSuccess) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-2xl text-center shadow-lg border border-green-100">
        <div className="text-4xl mb-4">✨</div>
        <h3 className="text-2xl font-bold mb-2">
          Demande envoyée avec succès !
        </h3>
        <p>
          Merci pour votre confiance. Nous analysons votre demande et vous
          recontactons sous 48h avec une première proposition.
        </p>
      </div>
    );
  }

  // 4. LE DESIGN DU FORMULAIRE
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Parlez-nous de votre projet
      </h3>

      {/* Ligne 1 : Nom et Prénom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prénom
          </label>
          <input
            {...register("firstName")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            placeholder="Jean"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            {...register("lastName")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            placeholder="Dupont"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Ligne 2 : Email et Nombre de personnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            placeholder="jean.dupont@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de voyageurs
          </label>
          <input
            type="number"
            min="1"
            {...register("partySize", { valueAsNumber: true })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            placeholder="2"
          />
          {errors.partySize && (
            <p className="text-red-500 text-sm mt-1">
              {errors.partySize.message}
            </p>
          )}
        </div>
      </div>

      {/* Téléphone */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Téléphone
        </label>
        <input
          {...register("phone")}
          type="tel"
          placeholder="+33 6 00 00 00 00"
          className="w-full p-3 border rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs">{errors.phone.message}</p>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Départ prévu</label>
          <input
            {...register("startDate")}
            type="date"
            className="w-full p-3 border rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Retour prévu</label>
          <input
            {...register("endDate")}
            type="date"
            className="w-full p-3 border rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
          />
          {errors.endDate && (
            <p className="text-red-500 text-xs">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {/* Ligne 3 : Destination */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Destination souhaitée
        </label>
        <input
          {...register("destination")}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
          placeholder="Ex: Cuba, Colombie, ou 'Je ne sais pas encore'"
        />
        {errors.destination && (
          <p className="text-red-500 text-sm mt-1">
            {errors.destination.message}
          </p>
        )}
      </div>

      {/* Ligne 4 : Budget et Type d'expérience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Budget estimé (par pers.)
          </label>
          <select
            {...register("budget")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white"
          >
            <option value="">Sélectionnez un budget</option>
            <option value="1500-2000">1500€ - 2000€</option>
            <option value="2000-3000">2000€ - 3000€</option>
            <option value="3000+">Plus de 3000€</option>
          </select>
          {errors.budget && (
            <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type d&apos;expérience
          </label>
          <select
            {...register("experienceType")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white"
          >
            <option value="">Sélectionnez une envie</option>
            <option value="Danse et Culture">Immersion Danse & Culture</option>
            <option value="Aventure et Nature">Aventure & Nature</option>
            <option value="Détente et Plage">Détente & Plage</option>
            <option value="Mixte">Un peu de tout !</option>
          </select>
          {errors.experienceType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.experienceType.message}
            </p>
          )}
        </div>
      </div>

      {/* Commentaires */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Commentaires</label>
        <textarea
          {...register("additionalNotes")}
          placeholder="Détaillez vos envies..."
          className="w-full p-3 border rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
          rows={4}
        />
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gray-900 text-white font-bold text-lg py-4 px-8 rounded-lg hover:bg-black transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4"
      >
        {isSubmitting ? "Envoi en cours..." : "Créer mon voyage"}
      </button>
    </form>
  );
}
