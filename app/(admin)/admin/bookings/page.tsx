import prisma from "@/lib/prisma";

export default async function AdminBookings() {
  const bookings = await prisma.booking.findMany({
    include: {
      groupTrip: true, // On lie à GroupTrip pour savoir quel voyage a été acheté
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black italic uppercase text-slate-900">
        Suivi des <span className="text-amber-500 text-4xl">Réservations</span>
      </h1>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <tr>
              <th className="p-6">Client</th>
              <th className="p-6">Voyage</th>
              <th className="p-6">Participants</th>
              <th className="p-6">Statut</th>
              <th className="p-6">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
              >
                <td className="p-6">
                  <p className="font-bold text-slate-900">{booking.userName}</p>
                  <p className="text-slate-500 text-xs">{booking.userEmail}</p>
                </td>
                <td className="p-6 font-medium text-slate-700">
                  {booking.groupTrip?.title || "N/A"}
                </td>
                <td className="p-6 font-bold">{booking.participants}</td>
                <td className="p-6">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${booking.status === "CONFIRMED" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-6 text-slate-400">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
