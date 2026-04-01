import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  User,
  Calendar,
  CreditCard,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ChevronRight,
} from "lucide-react";

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Attendre la résolution des paramètres de l'URL
  const resolvedParams = await params;
  const bookingId = parseInt(resolvedParams.id);

  // Sécurité si l'ID dans l'URL n'est pas un chiffre
  if (isNaN(bookingId)) {
    notFound();
  }

  // 2. Récupération de la réservation avec ses relations
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      groupTrip: {
        include: { destination: true },
      },
      circuit: true,
    },
  });

  // 3. Si aucune réservation n'est trouvée
  if (!booking) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 px-4">
      {/* HEADER NAVIGATION */}
      <header className="mb-10 flex justify-between items-center">
        <Link
          href="/admin/bookings"
          className="flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Retour à la liste
        </Link>

        <div className="flex items-center gap-3">
          <span
            className={`px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest ${
              booking.status === "CONFIRMED"
                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                : "bg-amber-50 text-amber-600 border-amber-100"
            }`}
          >
            {booking.status === "CONFIRMED"
              ? "Dossier Confirmé"
              : "En attente de paiement"}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLONNE GAUCHE : INFOS CLIENT & VOYAGE */}
        <div className="lg:col-span-2 space-y-8">
          {/* CARTE CLIENT */}
          <section className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
            <h3 className="text-[10px] font-black uppercase text-amber-500 mb-8 tracking-[0.2em] flex items-center gap-2">
              <User size={14} /> Informations Voyageur
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 italic">
                  Identité
                </p>
                <p className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                  {booking.firstName} <br />
                  <span className="text-amber-500">{booking.lastName}</span>
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1 italic">
                    Email
                  </p>
                  <p className="font-bold text-slate-700 underline decoration-amber-200 underline-offset-4 tracking-tight">
                    {booking.email}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1 italic">
                    Téléphone
                  </p>
                  <p className="font-bold text-slate-900 tracking-widest">
                    {booking.phone || "NON RENSEIGNÉ"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CARTE VOYAGE */}
          <section className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
            <h3 className="text-[10px] font-black uppercase text-amber-500 mb-8 tracking-[0.2em] flex items-center gap-2">
              <MapPin size={14} /> Prestation & Itinéraire
            </h3>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-amber-500 shrink-0 shadow-lg">
                  <Calendar size={28} />
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    {booking.type === "GROUP"
                      ? "Voyage de Groupe"
                      : "Circuit Individuel"}
                  </span>
                  <p className="text-2xl font-black text-slate-900 uppercase italic leading-none mt-1">
                    {booking.groupTrip?.title ||
                      booking.circuit?.title ||
                      "Voyage Personnalisé"}
                  </p>
                  <p className="text-slate-500 font-bold mt-1">
                    {booking.groupTrip?.destination?.name} —{" "}
                    {new Date(booking.startDate).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                    Option
                  </p>
                  <p className="font-black text-slate-900 text-sm">
                    {booking.optionType}
                  </p>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                    Passagers
                  </p>
                  <p className="font-black text-slate-900 text-sm">
                    {booking.participants} PERS.
                  </p>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                    Durée
                  </p>
                  <p className="font-black text-slate-900 text-sm">
                    {booking.groupTrip?.duration ||
                      booking.circuit?.duration ||
                      "?"}{" "}
                    JOURS
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* COLONNE DROITE : FINANCE */}
        <div className="space-y-8">
          <section className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-[10px] font-black uppercase text-amber-500 mb-10 tracking-[0.2em] flex items-center gap-2">
                <CreditCard size={14} /> État Financier
              </h3>

              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 italic">
                    Prix de vente total
                  </p>
                  <p className="text-5xl font-black italic tracking-tighter text-white">
                    {booking.totalPrice.toLocaleString("fr-FR")}€
                  </p>
                </div>

                <div className="pt-8 border-t border-slate-800">
                  <div className="flex justify-between items-end mb-3">
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest italic">
                      Montant encaissé
                    </p>
                    <p className="text-2xl font-black text-emerald-400 tracking-tighter">
                      {booking.amountPaid.toLocaleString("fr-FR")}€
                    </p>
                  </div>

                  {/* Barre de progression stylisée */}
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000"
                      style={{
                        width: `${Math.min((booking.amountPaid / booking.totalPrice) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <p className="text-right text-[9px] font-bold text-slate-600 mt-2 uppercase tracking-widest">
                    Paiement :{" "}
                    {Math.round(
                      (booking.amountPaid / booking.totalPrice) * 100,
                    )}
                    %
                  </p>
                </div>

                <div className="bg-slate-800/40 p-5 rounded-[1.5rem] border border-slate-800/50">
                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1 italic">
                    Mode de règlement
                  </p>
                  <p className="font-black text-xs tracking-widest uppercase text-amber-500">
                    {booking.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            {/* Décoration en arrière-plan */}
            <CreditCard
              size={140}
              className="absolute -bottom-10 -right-10 text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-700"
            />
          </section>

          {/* ACTIONS ADMIN */}
          <div className="grid grid-cols-1 gap-4">
            <button className="w-full py-5 bg-white border border-slate-200 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              Générer le contrat
            </button>
            <button className="w-full py-5 bg-white border border-slate-200 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all shadow-sm">
              Annuler le dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
