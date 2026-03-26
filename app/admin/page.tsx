import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // L'import est vital ici
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminDashboard() {
  // 1. RÉCUPÉRATION DE LA SESSION
  const session = await getServerSession(authOptions);

  // 2. SÉCURITÉ : SI PAS DE SESSION -> REDIRECTION LOGIN
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login");
  }

  // 3. SÉCURITÉ : SI PAS LE RÔLE ADMIN -> REDIRECTION LOGIN
  if ((session.user as any).role !== "ADMIN") {
    redirect("/login");
  }

  // 4. RÉCUPÉRATION DES DONNÉES (Seulement si autorisé)
  const trips = await prisma.groupTrip.findMany({
    include: {
      bookings: true,
    },
  });

  // CALCULS
  const totalInscribedUsers = trips.reduce((acc, trip) => {
    const tripSum = trip.bookings.reduce(
      (sum, b) => sum + (b.participants || 0),
      0,
    );
    return acc + tripSum;
  }, 0);

  const totalGlobalCapacity = trips.reduce(
    (acc, trip) => acc + (trip.capacity || 0),
    0,
  );
  const totalRevenue = totalInscribedUsers * 500;
  const globalFillingRate =
    totalGlobalCapacity > 0
      ? Math.round((totalInscribedUsers / totalGlobalCapacity) * 100)
      : 0;

  return (
    <main className="p-8 bg-slate-50 min-h-screen font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex justify-between items-start mb-12 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter">
              ADMIN<span className="text-amber-500">.</span>
            </h1>
            <p className="text-slate-400 font-medium mt-2">
              Connecté en tant que : {session.user?.email}
            </p>
            <div className="mt-4">
              <LogoutButton />
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">
              Revenus Acomptes
            </p>
            <p className="text-5xl font-black text-emerald-600 tracking-tight">
              {totalRevenue.toLocaleString()}€
            </p>
          </div>
        </header>

        {/* KIPS / STATS RAPIDES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">
              Immersions
            </p>
            <p className="text-4xl font-black">{trips.length}</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">
              Voyageurs Totaux
            </p>
            <p className="text-4xl font-black">{totalInscribedUsers}</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">
              Remplissage Global
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black text-amber-500">
                {globalFillingRate}%
              </p>
              <p className="text-slate-300 text-sm font-bold">
                / {totalGlobalCapacity} places
              </p>
            </div>
          </div>
        </div>

        {/* LISTE DÉTAILLÉE PAR VOYAGE */}
        <h2 className="text-2xl font-black text-slate-800 mb-8 ml-4 italic">
          Détails des sessions
        </h2>

        <div className="space-y-8">
          {trips.map((trip) => {
            const tripInscribed = trip.bookings.reduce(
              (sum, b) => sum + (b.participants || 0),
              0,
            );
            const tripProgress =
              trip.capacity > 0 ? (tripInscribed / trip.capacity) * 100 : 0;

            return (
              <div
                key={trip.id}
                className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-12"
              >
                <div className="lg:w-1/3">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 bg-amber-50 px-3 py-1 rounded-full">
                    {trip.duration}
                  </span>
                  <h3 className="text-3xl font-black mt-4 mb-6 leading-none tracking-tight">
                    {trip.title}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <p className="text-slate-400 font-bold text-sm uppercase">
                        Occupation
                      </p>
                      <p className="font-black">
                        {tripInscribed} / {trip.capacity}
                      </p>
                    </div>
                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${tripProgress >= 100 ? "bg-red-500" : "bg-amber-500"}`}
                        style={{ width: `${Math.min(tripProgress, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-2/3">
                  <table className="w-full">
                    <thead>
                      <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                        <th className="pb-4 text-left">Client</th>
                        <th className="pb-4 text-center">Pers.</th>
                        <th className="pb-4 text-right">Date de résa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {trip.bookings.length > 0 ? (
                        trip.bookings.map((booking) => (
                          <tr key={booking.id} className="group">
                            <td className="py-4">
                              <p className="font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                                {booking.userName}
                              </p>
                              <p className="text-xs text-slate-400">
                                {booking.userEmail}
                              </p>
                            </td>
                            <td className="py-4 text-center">
                              <span className="bg-slate-100 text-slate-600 font-black text-xs px-2 py-1 rounded">
                                +{booking.participants}
                              </span>
                            </td>
                            <td className="py-4 text-right text-slate-400 text-xs font-medium">
                              {new Date(booking.createdAt).toLocaleDateString(
                                "fr-FR",
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="py-8 text-center text-slate-300 italic text-sm"
                          >
                            Aucune réservation pour le moment.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
