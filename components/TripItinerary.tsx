"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react"; // Si tu as lucide-react, sinon utilise "v"

interface Day {
  day: number;
  title: string;
  description: string;
}

export default function TripItinerary({ program }: { program: any }) {
  const [openDay, setOpenDay] = useState<number | null>(1); // Le Jour 1 est ouvert par défaut

  const itinerary = Array.isArray(program) ? (program as Day[]) : [];

  if (itinerary.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-4 my-12">
      <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8 text-slate-900">
        Le Programme <span className="text-amber-500">Détaillé</span>
      </h2>

      <div className="space-y-3">
        {itinerary.map((step, i) => (
          <div
            key={`step-${step.day}-${i}`}
            className="border border-slate-100 rounded-[1.5rem] overflow-hidden bg-white shadow-sm transition-all"
          >
            {/* EN-TÊTE DE L'ACCORDÉON */}
            <button
              onClick={() => setOpenDay(openDay === step.day ? null : step.day)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-6">
                <div className="bg-slate-900 text-white w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-bold uppercase opacity-60">
                    Jour
                  </span>
                  <span className="text-lg font-black leading-none">
                    {step.day}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-lg">
                  {step.title}
                </h3>
              </div>
              <ChevronDown
                className={`text-slate-400 transition-transform duration-300 ${openDay === step.day ? "rotate-180" : ""}`}
              />
            </button>

            {/* CONTENU DÉROULANT */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openDay === step.day
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-8 pt-0 ml-[72px] text-slate-600 leading-relaxed border-t border-slate-50 mt-4">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
