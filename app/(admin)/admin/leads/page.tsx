import prisma from "@/lib/prisma";
import StatusSelect from "./_components/StatusSelct";
import {
  Calendar,
  User,
  Mail,
  Phone,
  PlaneTakeoff,
  Clock,
  BadgeEuro,
  Users,
} from "lucide-react";

export default async function AdminLeadsPage() {
  // Récupération des leads depuis la base de données
  const leads = await prisma.customLead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
            Demandes <span className="text-amber-500">Sur-Mesure</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            {leads.length} prospect{leads.length > 1 ? "s" : ""} en attente de
            voyage.
          </p>
        </div>
      </div>

      {/* LISTE DES LEADS */}
      <div className="grid grid-cols-1 gap-6">
        {leads.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center">
            <p className="text-slate-400 font-bold uppercase tracking-widest">
              Aucune demande pour le moment
            </p>
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
            >
              {/* Statut flottant */}
              <div className="absolute top-8 right-8">
                <StatusSelect
                  id={lead.id}
                  currentStatus={lead.status || "NEW"}
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-12">
                {/* 👤 CLIENT INFO */}
                <div className="space-y-6 lg:w-1/3">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                      Prospect
                    </p>
                    <h3 className="text-2xl font-black italic uppercase text-slate-900 group-hover:text-amber-500 transition-colors leading-none">
                      {lead.firstName} {lead.lastName}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                      <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <Mail size={16} />
                      </div>
                      {lead.email}
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                      <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <Phone size={16} />
                      </div>
                      {lead.phone}
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest pt-2">
                      <Clock size={14} /> Reçu le{" "}
                      {new Date(lead.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                </div>

                {/* ✈️ VOYAGE INFO */}
                <div className="flex-1 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-500 text-white p-3 rounded-2xl shadow-lg shadow-amber-200">
                      <PlaneTakeoff size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">
                        Destination
                      </p>
                      <p className="text-xl font-black italic uppercase text-slate-900">
                        {lead.destination}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                        Budget
                      </p>
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                        <BadgeEuro size={14} /> {lead.budget}€
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                        Voyageurs
                      </p>
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                        <Users size={14} /> {lead.partySize}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                        Dates
                      </p>
                      <p className="text-[10px] font-bold text-slate-900">
                        {new Date(lead.startDate).toLocaleDateString("fr-FR", {
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                        Style
                      </p>
                      <p className="text-sm font-bold text-slate-900">
                        {lead.experienceType}
                      </p>
                    </div>
                  </div>

                  {lead.additionalNotes && (
                    <div className="mt-4 pt-6 border-t border-slate-200">
                      <p className="text-[9px] font-black uppercase text-slate-400 mb-2">
                        Notes du client
                      </p>
                      <p className="text-sm text-slate-600 italic leading-relaxed">
                        &quot;{lead.additionalNotes}&quot;
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
