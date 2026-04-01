"use client";

import { Trash2 } from "lucide-react";
import { deleteGroupTrip } from "../actions";

export default function DeleteGroupTripButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (
      confirm(
        "Voulez-vous vraiment supprimer ce voyage de groupe ? Cette action est irréversible.",
      )
    ) {
      try {
        await deleteGroupTrip(id);
      } catch (error) {
        alert(
          "Erreur lors de la suppression. Vérifiez s'il n'y a pas de réservations liées.",
        );
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex items-center gap-1.5 text-slate-300 hover:text-rose-600 transition-all group/del"
    >
      <Trash2
        size={14}
        className="group-hover/del:scale-110 transition-transform"
      />
      <span className="font-black uppercase text-[10px] tracking-widest">
        Supprimer
      </span>
    </button>
  );
}
