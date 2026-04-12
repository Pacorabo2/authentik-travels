"use client";

import { useState } from "react";
import { handleGuideRequest } from "@/app/actions/send-guide";
import toast from "react-hot-toast";

export default function LeadMagnetForm() {
  const [isPending, setIsPending] = useState(false);

  async function actionWrapper(formData: FormData) {
    setIsPending(true);
    const result = await handleGuideRequest(formData);
    setIsPending(false);

    if (result?.success) {
      toast.success("🎒 Le guide est en route vers votre boîte mail !");
    } else {
      toast.error(result?.error || "Une erreur est survenue.");
    }
  }

  return (
    <form action={actionWrapper} className="space-y-4">
      <input
        name="email"
        type="email"
        required
        placeholder="Votre adresse email"
        className="w-full p-5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500 transition-all outline-none"
      />
      <button
        disabled={isPending}
        className="w-full bg-amber-500 text-slate-900 font-black uppercase py-5 rounded-2xl hover:bg-white transition-colors text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Envoi en cours..." : "Recevoir le guide PDF"}
      </button>
    </form>
  );
}
