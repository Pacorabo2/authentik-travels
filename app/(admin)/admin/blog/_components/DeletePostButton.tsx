"use client"; // Indispensable ici

import { Trash2 } from "lucide-react";
import { deletePost } from "@/app/(admin)/admin/blog/actions";

export default function DeletePostButton({ id }: { id: string }) {
  return (
    <form 
      action={async () => {
        if (confirm("Es-tu sûr de vouloir supprimer cet article définitivement ?")) {
          await deletePost(id);
        }
      }}
    >
      <button 
        type="submit"
        className="p-4 bg-slate-50 text-red-300 hover:text-white hover:bg-red-500 rounded-2xl transition-all"
        title="Supprimer l'article"
      >
        <Trash2 size={20} />
      </button>
    </form>
  );
}