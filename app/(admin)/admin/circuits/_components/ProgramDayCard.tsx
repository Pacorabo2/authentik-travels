"use client";

interface Day {
  day: number;
  title: string;
  description: string;
}

interface Props {
  item: Day;
  onUpdate: (field: keyof Day, value: string) => void;
  onRemove: () => void;
}

export function ProgramDayCard({ item, onUpdate, onRemove }: Props) {
  return (
    <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100 relative group transition-all hover:shadow-md">
      <div className="grid grid-cols-[80px_1fr] gap-6">
        {/* Badge Jour */}
        <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200 shadow-sm h-20">
          <span className="text-[10px] font-black uppercase text-slate-400">
            Jour
          </span>
          <span className="text-2xl font-black text-amber-500">{item.day}</span>
        </div>

        {/* Champs de saisie */}
        <div className="space-y-4">
          <input
            placeholder="Titre de la journée..."
            value={item.title}
            onChange={(e) => onUpdate("title", e.target.value)}
            className="w-full bg-transparent border-b border-slate-200 focus:border-amber-500 outline-none font-bold text-slate-800 p-2"
          />
          <textarea
            placeholder="Détails de l'étape..."
            value={item.description}
            onChange={(e) => onUpdate("description", e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 text-sm text-slate-600 resize-none h-20"
          />
        </div>
      </div>

      {/* Bouton Supprimer */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-white text-red-500 w-8 h-8 rounded-full shadow-md border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold"
      >
        ×
      </button>
    </div>
  );
}
