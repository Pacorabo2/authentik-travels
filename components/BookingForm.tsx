"use client";

import { useState } from "react";

export default function BookingForm({
  tripId,
  tripTitle,
}: {
  tripId: string;
  tripTitle: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      tripId,
      userName: formData.get("userName"),
      userEmail: formData.get("userEmail"),
      participants: parseInt(formData.get("participants") as string),
    };

    // Note : On créera l'API juste après, pour l'instant on simule l'envoi
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) setIsSuccess(true);
    } catch (error) {
      console.error("Erreur réservation:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 p-8 rounded-[2rem] border border-green-100 text-center">
        <span className="text-4xl mb-4 block">🎉</span>
        <h3 className="text-xl font-bold text-green-900">Demande envoyée !</h3>
        <p className="text-green-700 text-sm mt-2">
          Nous vous recontacterons très vite pour confirmer votre départ pour{" "}
          {tripTitle}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">
          Nom complet
        </label>
        <input
          name="userName"
          required
          type="text"
          placeholder="Juan Del Pueblo"
          className="w-full p-4 rounded-2xl bg-white border border-slate-200 focus:border-amber-500 outline-none transition-all"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">
          Email
        </label>
        <input
          name="userEmail"
          required
          type="email"
          placeholder="juan@gmail.com"
          className="w-full p-4 rounded-2xl bg-white border border-slate-200 focus:border-amber-500 outline-none transition-all"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">
          Nombre de voyageurs
        </label>
        <select
          name="participants"
          className="w-full p-4 rounded-2xl bg-white border border-slate-200 focus:border-amber-500 outline-none transition-all appearance-none"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n > 1 ? "personnes" : "personne"}
            </option>
          ))}
        </select>
      </div>

      <button
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-slate-900 py-5 text-white font-bold text-lg hover:bg-amber-600 transition-all shadow-lg disabled:opacity-50"
      >
        {isSubmitting ? "Envoi en cours..." : "Confirmer ma réservation"}
      </button>
    </form>
  );
}
