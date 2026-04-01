"use client";

import { useState, useEffect } from "react";
import { createManualBooking } from "../../actions";
import { User, MapPin, CreditCard } from "lucide-react";

interface Trip {
  id: string;
  title: string;
  startDate: Date;
  priceBase: number;
  pricePremium: number | null;
  pricePlatinium: number | null;
  destination: { name: string };
}

export default function BookingForm({ groupTrips }: { groupTrips: Trip[] }) {
  const [selectedTripId, setSelectedTripId] = useState("");
  const [optionType, setOptionType] = useState("BASE");
  const [participants, setParticipants] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calcul automatique du prix
  useEffect(() => {
    const trip = groupTrips.find((t) => t.id === selectedTripId);
    if (trip) {
      let unitPrice = trip.priceBase;
      if (optionType === "PREMIUM" && trip.pricePremium)
        unitPrice = trip.pricePremium;
      if (optionType === "PLATINIUM" && trip.pricePlatinium)
        unitPrice = trip.pricePlatinium;

      setTotalPrice(unitPrice * participants);
    } else {
      setTotalPrice(0);
    }
  }, [selectedTripId, optionType, participants, groupTrips]);

  return (
    <form
      action={createManualBooking}
      className="space-y-8 bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100"
    >
      {/* SECTION 1 : VOYAGEUR (Identique à ton code) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="firstName"
          required
          placeholder="Prénom"
          className="w-full p-4 bg-slate-50 rounded-xl border-none font-bold"
        />
        <input
          name="lastName"
          required
          placeholder="Nom"
          className="w-full p-4 bg-slate-50 rounded-xl border-none font-bold"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full p-4 bg-slate-50 rounded-xl border-none font-bold"
        />
        <input
          name="phone"
          placeholder="Téléphone"
          className="w-full p-4 bg-slate-50 rounded-xl border-none font-bold"
        />
      </div>

      {/* SECTION 2 : SELECTION DYNAMIQUE */}
      <div className="pt-8 border-t border-slate-50 space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
            Voyage de groupe
          </label>
          <select
            name="groupTripId"
            required
            value={selectedTripId}
            onChange={(e) => setSelectedTripId(e.target.value)}
            className="w-full p-5 bg-slate-50 rounded-[1.2rem] border-none focus:ring-2 focus:ring-amber-500 font-bold appearance-none shadow-inner"
          >
            <option value="">Sélectionner un départ...</option>
            {groupTrips.map((trip) => (
              <option key={trip.id} value={trip.id}>
                [{trip.destination.name}] {trip.title} —{" "}
                {new Date(trip.startDate).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
              Option
            </label>
            <select
              name="optionType"
              value={optionType}
              onChange={(e) => setOptionType(e.target.value)}
              className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-bold"
            >
              <option value="BASE">Base (Chambre partagée)</option>
              <option value="PREMIUM">Premium (Chambre individuelle)</option>
              <option value="PLATINIUM">Platinium (Suite)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">
              Participants
            </label>
            <input
              name="participants"
              type="number"
              value={participants}
              onChange={(e) => setParticipants(Number(e.target.value))}
              min="1"
              className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3 : FINANCE (AVEC CALCUL AUTO) */}
      <div className="pt-8 border-t border-slate-50 p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-slate-500 ml-1 italic">
              Total calculé automatiquement
            </label>
            <div className="w-full p-4 bg-slate-800 rounded-xl font-black text-amber-500 text-2xl flex items-center gap-2">
              {totalPrice.toLocaleString()}€
              {/* On garde un input hidden pour que la valeur soit envoyée dans le formData */}
              <input type="hidden" name="totalPrice" value={totalPrice} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-slate-500 ml-1">
              Montant Encaissé (€)
            </label>
            <input
              name="amountPaid"
              type="number"
              defaultValue="0"
              className="w-full p-4 bg-slate-800 rounded-xl border-none font-bold text-emerald-400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-slate-500 ml-1">
              Méthode
            </label>
            <select
              name="paymentMethod"
              className="w-full p-4 bg-slate-800 rounded-xl border-none font-bold"
            >
              <option value="VIREMENT">Virement</option>
              <option value="CHEQUE">Chèque</option>
              <option value="ESPECES">Espèces</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase text-slate-500 ml-1 italic">
            Statut
          </label>
          <select
            name="status"
            className="w-full p-4 bg-slate-800 rounded-xl border-none font-bold"
          >
            <option value="PENDING">En attente (Acompte non reçu)</option>
            <option value="CONFIRMED">Confirmé (Acompte reçu)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="bg-amber-500 text-slate-900 px-12 py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl"
        >
          Enregistrer le dossier
        </button>
      </div>
    </form>
  );
}
