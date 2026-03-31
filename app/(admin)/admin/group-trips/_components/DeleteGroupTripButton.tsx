"use client";

import { Trash2 } from "lucide-react";
import { deleteGroupTrip } from "../actions"; // On va créer cette action

export default function DeleteGroupTripButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (
      confirm(
        "Voulez-vous vraiment supprimer ce voyage de groupe ? Cette action est irréversible.",
      )
    ) {
      await deleteGroupTrip(id);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-slate-300 hover:text-red-600 transition-colors"
    >
      <Trash2 size={18} />
    </button>
  );
}
