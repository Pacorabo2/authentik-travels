"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { renderDescription } from "@/lib/text-utils"; // Import de ton utilitaire d'aération

interface Day {
  day?: number; // Optionnel car absent du JSON
  title: string;
  desc: string; // Changé de 'description' à 'desc' pour matcher ton JSON
}

export default function TripItinerary({ program }: { program: any }) {
  const [openDay, setOpenDay] = useState<number | null>(0); // Ouvrir l'index 0 par défaut

  const itinerary = Array.isArray(program) ? (program as Day[]) : [];

  if (itinerary.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-4 my-12">
      <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8 text-slate-900 px-6 md:px-0">
        Le Programme <span className="text-amber-500">Détaillé</span>
      </h2>

      <div className="space-y-3 px-4 md:px-0">
        {itinerary.map((step, i) => {
          // Si 'step.day' n'existe pas, on utilise l'index + 1
          const dayNumber = step.day || i + 1;
          const isOpen = openDay === i;

          return (
            <div
              key={`step-${dayNumber}-${i}`}
              className={`border rounded-[1.5rem] overflow-hidden transition-all duration-500 ${
                isOpen
                  ? "border-amber-200 bg-white shadow-md"
                  : "border-slate-100 bg-white shadow-sm"
              }`}
            >
              {/* EN-TÊTE DE L'ACCORDÉON */}
              <button
                onClick={() => setOpenDay(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-6">
                  {/* NUMÉRO DU JOUR DYNAMIQUE */}
                  <div
                    className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen
                        ? "bg-amber-500 text-slate-900"
                        : "bg-slate-900 text-white"
                    }`}
                  >
                    <span className="text-[8px] font-black uppercase opacity-60">
                      Jour
                    </span>
                    <span className="text-lg font-black leading-none">
                      {dayNumber}
                    </span>
                  </div>
                  <h3
                    className={`font-black uppercase italic tracking-tight transition-colors ${
                      isOpen ? "text-amber-600" : "text-slate-800"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
                <ChevronDown
                  className={`text-slate-400 transition-transform duration-500 ${
                    isOpen ? "rotate-180 text-amber-500" : ""
                  }`}
                />
              </button>

              {/* CONTENU DÉROULANT */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-8 pt-0 ml-0 md:ml-[72px] text-slate-600 leading-relaxed border-t border-slate-50 mt-4">
                  <div className="pt-6 prose prose-slate">
                    {/* On utilise 'step.desc' au lieu de 'description' */}
                    {renderDescription(step.desc)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
