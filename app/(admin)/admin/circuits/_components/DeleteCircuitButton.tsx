"use client";

import { deleteCircuit } from "../actions";

export default function DeleteCircuitButton({ id }: { id: string }) {
  return (
    <button 
      onClick={async () => {
        if (confirm("Voulez-vous vraiment supprimer ce circuit ?")) {
          await deleteCircuit(id);
        }
      }}
      className="text-slate-300 hover:text-red-600 transition-colors font-medium text-sm"
    >
      Supprimer
    </button>
  );
}