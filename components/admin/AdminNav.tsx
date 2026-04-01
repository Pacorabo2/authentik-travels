"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NewLeadsBadge from "./NewLeadsBadge";

export default function AdminNav() {
  const pathname = usePathname();

  // Liste des liens de navigation mise à jour
  const navLinks = [
    { href: "/admin/destinations", label: "Destinations", icon: "🌍" },
    { href: "/admin/circuits", label: "Circuits", icon: "🚀" },
    { href: "/admin/group-trips", label: "Voyages de groupes", icon: "🕺" },
    { href: "/admin/bookings", label: "Réservations", icon: "💳" },
    { href: "/admin/blog", label: "Blog", icon: "✍️" },
    // AJOUT DU NOUVEAU LIEN :
    { href: "/admin/leads", label: "Demandes Client", icon: "📥" },
  ];

  return (
    <nav className="space-y-3 flex-grow">
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`group flex items-center p-4 rounded-2xl transition-all font-bold hover:scale-[1.02] ${
              isActive
                ? "bg-slate-800 text-amber-500 shadow-lg" // Style Actif
                : "text-slate-400 hover:bg-slate-800 hover:text-white" // Style Repos
            }`}
          >
            <span className="mr-3 text-lg">{link.icon}</span>
            <span className="flex-grow">{link.label}</span>

            {/* AFFICHAGE DU BADGE : Uniquement pour le lien 'leads' */}
            {link.href === "/admin/leads" && (
              <div className="ml-2">
                <NewLeadsBadge />
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
