"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface Day {
  title: string;
  desc: string;
}

interface ItineraryBuilderProps {
  initialDays?: any; // On accepte le JSON brut venant de Prisma
}

export default function ItineraryBuilder({
  initialDays,
}: ItineraryBuilderProps) {
  // 1. Initialisation intelligente du state
  const [days, setDays] = useState<Day[]>(() => {
    if (initialDays && Array.isArray(initialDays)) {
      return initialDays.map((d: any) => ({
        title: d.title || "",
        desc: d.desc || d.description || "",
      }));
    }
    return [{ title: "", desc: "" }];
  });

  const addDay = () => setDays([...days, { title: "", desc: "" }]);

  const removeDay = (index: number) => {
    if (days.length > 1) {
      setDays(days.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index: number, field: keyof Day, value: string) => {
    const newDays = [...days];
    newDays[index][field] = value;
    setDays(newDays);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Itinéraire Jour par Jour
        </label>
        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
          {days.length} {days.length > 1 ? "Étapes" : "Étape"}
        </span>
      </div>

      <div className="space-y-4">
        {days.map((day, index) => (
          <div
            key={index}
            className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4 relative group animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center shadow-lg shadow-slate-200">
                <span className="text-[8px] font-black uppercase leading-none mb-0.5">
                  Jour
                </span>
                <span className="font-black text-sm leading-none">
                  {index + 1}
                </span>
              </div>

              <input
                type="text"
                value={day.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                placeholder="Titre de l'étape (ex: Arrivée à La Havane)"
                className="flex-grow bg-transparent border-none focus:ring-0 font-black italic uppercase text-slate-900 text-lg p-0 placeholder:text-slate-300"
                required
              />

              {days.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDay(index)}
                  className="text-slate-300 hover:text-rose-500 transition-colors p-2"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            <textarea
              value={day.desc}
              onChange={(e) => handleChange(index, "desc", e.target.value)}
              placeholder="Décrivez les activités, les visites et les surprises du jour..."
              rows={3}
              className="w-full bg-white rounded-2xl p-5 border-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-600 leading-relaxed shadow-sm transition-all"
              required
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addDay}
        className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-black uppercase text-[10px] tracking-widest hover:border-amber-500 hover:text-amber-500 hover:bg-amber-50 transition-all flex items-center justify-center gap-3"
      >
        <Plus size={20} /> Ajouter une journée au programme
      </button>

      {/* 🚀 LE CHAMP CRUCIAL : On envoie tout l'objet d'un coup */}
      <input type="hidden" name="program" value={JSON.stringify(days)} />
    </div>
  );
}
