import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. On récupère la session directement sur le serveur
  const session = await getServerSession(authOptions);

  // 2. Si l'utilisateur n'est pas connecté, redirection immédiate
  if (!session) {
    redirect("/login");
  }

  // 3. Si on est ici, l'utilisateur est admin, on affiche la Sidebar
  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <aside className="w-72 bg-slate-900 text-white p-8 flex flex-col shadow-2xl">
        <div className="mb-12">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">
            Admin<span className="text-amber-500">.</span>
          </h2>
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em] mt-2">
            Athentik Travels
          </p>
        </div>

        <nav className="space-y-3 flex-grow">
          <Link
            href="/admin/destinations"
            className="group flex items-center p-4 rounded-2xl bg-slate-800 text-amber-500 font-bold transition-all"
          >
            <span className="mr-3">🌍</span> Destinations
          </Link>
          <Link
            href="/admin/circuits"
            className="group flex items-center p-4 rounded-2xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all font-bold"
          >
            <span className="mr-3">🚀</span> Circuits
          </Link>
        </nav>

        <div className="pt-8 border-t border-slate-800">
          <p className="text-xs text-slate-500 mb-4 font-medium italic">
            Connecté en tant que : <br />
            {session.user?.email}
          </p>
          <Link
            href="/"
            className="text-sm font-bold text-slate-400 hover:text-white flex items-center transition-colors"
          >
            ← Retour au site
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto">{children}</main>
    </div>
  );
}
