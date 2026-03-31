import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav"; // Importe le nouveau composant

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans antialiased text-slate-900">
      <aside className="w-72 bg-slate-900 text-white p-8 flex flex-col shadow-2xl sticky top-0 h-screen">
        <div className="mb-12">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">
            Admin<span className="text-amber-500">.</span>
          </h2>
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em] mt-2 leading-none">
            Authentik Travels
          </p>
        </div>

        {/* ON REMPLACE L'ANCIEN NAV PAR LE NOUVEAU COMPOSANT DYNAMIQUE */}
        <AdminNav />

        <div className="pt-8 border-t border-slate-800 mt-auto">
          <div className="mb-6">
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">
              Session active
            </p>
            <p className="text-xs text-white font-bold truncate italic">
              {session.user?.email}
            </p>
          </div>

          <Link
            href="/"
            className="group text-sm font-bold text-slate-400 hover:text-white flex items-center transition-all"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            Retour au site
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-12 bg-slate-100 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
