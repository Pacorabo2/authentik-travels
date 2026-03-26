"use client";
import { useState } from "react";

export default function BookingZone({ trip }: { trip: any }) {
  const [selectedOption, setSelectedOption] = useState("base");
  const [showContact, setShowContact] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. AJOUT DE L'ÉTAT POUR LE NOMBRE DE PARTICIPANTS
  const [nbParticipants, setNbParticipants] = useState(1);

  // On calcule les places restantes (si tu as passé trip.bookings et trip.capacity)
  const placesRestantes =
    trip.capacity -
    (trip.bookings?.reduce((acc: number, b: any) => acc + b.participants, 0) ||
      0);

  // On définit la limite : le plus petit chiffre entre 2 et les places restantes
  const maxPossible = Math.min(2, placesRestantes);

  const handleBooking = async () => {
    if (!email || !name) {
      alert("Merci de remplir votre nom et email avant de réserver.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId: trip.id,
          tripTitle: trip.title,
          userName: name,
          userEmail: email,
          participants: nbParticipants, // Maintenant défini !
          formula: selectedOption,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // C'est la méthode la plus propre : on suit l'URL générée par ton serveur
        window.location.href = data.url;
      } else {
        console.error("L'API n'a pas renvoyé d'URL :", data);
        throw new Error(data.error || "Erreur de génération du lien Stripe");
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de la redirection vers Stripe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
      <h3 className="text-2xl font-black italic mb-6">
        Réserver mon immersion
      </h3>

      {/* 2. AJOUT DU SÉLECTEUR DE NOMBRE DE PERSONNES */}
      <div className="mb-8 p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
        <span className="font-bold text-slate-700">Nombre de voyageurs</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setNbParticipants(Math.max(1, nbParticipants - 1))}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold hover:bg-slate-100"
          >
            -
          </button>

          <span className="font-black text-xl w-6 text-center">
            {nbParticipants}
          </span>
          <button
            onClick={() => {
              if (nbParticipants < maxPossible) {
                setNbParticipants(nbParticipants + 1);
              } else {
                alert(
                  placesRestantes < 2
                    ? "Il ne reste qu'une place !"
                    : "Maximum 2 participants par réservation en ligne.",
                );
              }
            }}
            className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold transition-all ${
              nbParticipants >= maxPossible
                ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                : "bg-white border-slate-200 hover:bg-slate-100"
            }`}
          >
            +
          </button>
        </div>
      </div>

      {/* SÉLECTEUR DE FORMULE */}
      <div className="space-y-3 mb-8">
        {[
          { id: "base", label: "Chambre Partagée", price: trip.priceBase },
          { id: "premium", label: "Chambre Double", price: trip.pricePremium },
          {
            id: "platinum",
            label: "Chambre Individuelle",
            price: trip.pricePlatinum,
          },
        ].map((option) => (
          <label
            key={option.id}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedOption === option.id
                ? "border-amber-500 bg-amber-50"
                : "border-slate-100 hover:border-slate-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="formula"
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
                className="w-5 h-5 accent-amber-600"
              />
              <span className="font-bold text-slate-700">{option.label}</span>
            </div>
            <span className="font-black text-slate-900">{option.price}€</span>
          </label>
        ))}
      </div>

      {/* FORMULAIRE INFOS CLIENT */}
      <div className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Nom complet"
          className="w-full p-4 rounded-2xl border border-slate-100 outline-none focus:border-amber-500 transition-all"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Votre email"
          className="w-full p-4 rounded-2xl border border-slate-100 outline-none focus:border-amber-500 transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <button
          onClick={handleBooking}
          disabled={loading}
          className={`w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-lg shadow-slate-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading
            ? "Chargement..."
            : `Réserver (${nbParticipants * trip.depositAmount}€ d'acompte)`}
        </button>

        <button
          onClick={() => setShowContact(!showContact)}
          className="w-full py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-colors"
        >
          Poser une question
        </button>
      </div>

      {showContact && (
        <div className="mt-6 p-4 bg-slate-50 rounded-2xl animate-fade-in">
          <textarea
            placeholder="Votre question..."
            className="w-full p-3 rounded-xl border-none ring-1 ring-slate-200 focus:ring-amber-500 outline-none mb-3"
          />
          <button className="w-full py-2 bg-amber-500 text-white rounded-xl font-bold text-sm">
            Envoyer
          </button>
        </div>
      )}
    </div>
  );
}
