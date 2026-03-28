"use client";

import { useState } from "react";

interface Day {
  day: number;
  title: string;
  description: string;
}

export default function ProgramEditor({
  initialProgram,
}: {
  initialProgram: any;
}) {
  // On initialise l'état avec ce qui existe déjà en base ou un tableau vide
  const [program, setProgram] = useState<Day[]>(
    Array.isArray(initialProgram) ? initialProgram : [],
  );

  const addDay = () => {
    const nextDay = program.length + 1;
    setProgram([...program, { day: nextDay, title: "", description: "" }]);
  };

  const updateDay = (
    index: number,
    field: keyof Day,
    value: string | number,
  ) => {
    const newProgram = [...program];
    newProgram[index] = { ...newProgram[index], [field]: value };
    setProgram(newProgram);
  };

  const removeDay = (index: number) => {
    const newProgram = program.filter((_, i) => i !== index);
    // On recalcule les numéros de jours pour qu'ils se suivent
    const resetDays = newProgram.map((d, i) => ({ ...d, day: i + 1 }));
    setProgram(resetDays);
  };

  return (
    <div className="space-y-6 mt-12 border-t pt-10 border-slate-100">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black italic uppercase tracking-tight text-slate-900">
          Itinéraire du voyage
        </h2>
        <button
          type="button"
          onClick={addDay}
          className="bg-amber-500 text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-slate-900 transition-all"
        >
          + Ajouter un jour
        </button>
      </div>

      {/* Input caché pour envoyer le JSON via le formulaire standard */}
      <input type="hidden" name="program" value={JSON.stringify(program)} />

      <div className="space-y-4">
        {program.map((item, index) => (
          <div
            key={index}
            className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100 relative group"
          >
            <div className="grid grid-cols-[80px_1fr] gap-6">
              <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-black uppercase text-slate-400">
                  Jour
                </span>
                <span className="text-2xl font-black text-amber-500">
                  {item.day}
                </span>
              </div>

              <div className="space-y-4">
                <input
                  placeholder="Titre de la journée..."
                  value={item.title}
                  onChange={(e) => updateDay(index, "title", e.target.value)}
                  className="w-full bg-transparent border-b border-slate-200 focus:border-amber-500 outline-none font-bold text-slate-800 p-2"
                />
                <textarea
                  placeholder="Détails de l'étape..."
                  value={item.description}
                  onChange={(e) =>
                    updateDay(index, "description", e.target.value)
                  }
                  className="w-full bg-transparent border-none focus:ring-0 text-sm text-slate-600 resize-none h-20"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeDay(index)}
              className="absolute -top-2 -right-2 bg-white text-red-500 w-8 h-8 rounded-full shadow-md border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
