"use client";

import { updateLeadStatus } from "../actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-amber-100 text-amber-700 border-amber-200",
  CONTACTED: "bg-blue-100 text-blue-700 border-blue-200",
  WON: "bg-emerald-100 text-emerald-700 border-emerald-200",
  LOST: "bg-slate-100 text-slate-500 border-slate-200",
};

export default function StatusSelect({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    await updateLeadStatus(id, e.target.value);
    setLoading(false);
  };

  return (
    <div className="relative flex items-center">
      {loading && (
        <Loader2
          size={14}
          className="animate-spin absolute -left-6 text-slate-400"
        />
      )}
      <select
        defaultValue={currentStatus}
        onChange={handleChange}
        className={`appearance-none border px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer outline-none transition-all ${STATUS_STYLES[currentStatus] || STATUS_STYLES.NEW}`}
      >
        <option value="NEW">Nouveau</option>
        <option value="CONTACTED">Contacté</option>
        <option value="WON">Gagné ✨</option>
        <option value="LOST">Perdu</option>
      </select>
    </div>
  );
}
