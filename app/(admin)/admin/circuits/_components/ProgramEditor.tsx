"use client";

import { useState } from "react";
import { ProgramDayCard } from "./ProgramDayCard"; // On importe le petit composant

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
  // État local pour gérer la liste des jours
  const [program, setProgram] = useState<Day[]>(
    Array.isArray(initialProgram) ? initialProgram : [],
  );

  const addDay = () => {
    const nextDay = program.length + 1;
    setProgram([...program, { day: nextDay, title: "", description: "" }]);
  };

  const updateDay = (index: number, field: keyof Day, value: string) => {
    const newProgram = [...program];
    newProgram[index] = { ...newProgram[index], [field]: value };
    setProgram(newProgram);
  };

  const removeDay = (index: number) => {
    const newProgram = program.filter((_, i) => i !== index);
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

      {/* C'est ce champ caché qui envoie les données JSON au serveur lors du submit */}
      <input type="hidden" name="program" value={JSON.stringify(program)} />

      <div className="space-y-4">
        {program.map((item, index) => (
          <ProgramDayCard
            key={index}
            item={item}
            onUpdate={(field, value) => updateDay(index, field, value)}
            onRemove={() => removeDay(index)}
          />
        ))}
      </div>
    </div>
  );
}
