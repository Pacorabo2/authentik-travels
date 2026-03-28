"use client";

import { deleteDestination } from "../actions";

export default function DeleteDestinationButton({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        if (confirm("Es-tu sûr de vouloir supprimer cette destination ?")) {
          await deleteDestination(id);
        }
      }}
    >
      <button
        type="submit"
        className="text-slate-600 hover:text-red-600 transition-colors font-medium text-sm"
      >
        Supprimer
      </button>
    </form>
  );
}
