"use client";

import { useEffect, useState } from "react";
import { getNewLeadsCount } from "@/app/(admin)/admin/leads/actions";

export default function NewLeadsBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // On récupère le compte au chargement
    getNewLeadsCount().then(setCount);

    // Optionnel : On pourrait rafraîchir toutes le 2 minutes
    const interval = setInterval(() => {
      getNewLeadsCount().then(setCount);
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  if (count === 0) return null;

  return (
    <span className="ml-auto bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm animate-pulse">
      {count}
    </span>
  );
}
