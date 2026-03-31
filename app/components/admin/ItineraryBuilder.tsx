"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function ItineraryBuilder() {
  const [days, setDays] = useState([{ title: "", desc: "" }]);

  const addDay = () => setDays([...days, { title: "", desc: "" }]);
  const removeDay = (index: number) =>
    setDays(days.filter((_, i) => i !== index));

  return (
    <div className="space-y-6">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
        Itinéraire Jour par Jour
      </label>

      {days.map((day, index) => (
        <div
          key={index}
          className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 space-y-4 relative group"
        >
          <div className="flex items-center gap-4">
            <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs">
              {index + 1}
            </span>
            <input
              name={`day-title-${index}`}
              placeholder="Titre de la journée..."
              className="flex-grow bg-transparent border-none focus:ring-0 font-bold text-slate-900 p-0"
              required
            />
            <button
              type="button"
              onClick={() => removeDay(index)}
              className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <textarea
            name={`day-desc-${index}`}
            placeholder="Détails de l'étape..."
            rows={2}
            className="w-full bg-white rounded-xl p-4 border-none focus:ring-1 focus:ring-amber-500 text-sm"
            required
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addDay}
        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[1.5rem] text-slate-400 font-bold hover:border-amber-500 hover:text-amber-500 transition-all flex items-center justify-center gap-2 text-sm"
      >
        <Plus size={18} /> Ajouter une étape
      </button>

      {/* On stocke le nombre de jours pour que l'action Prisma sache combien en lire */}
      <input type="hidden" name="itineraryCount" value={days.length} />
    </div>
  );
}
