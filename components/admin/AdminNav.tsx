"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();

  // Liste des liens de navigation
  const navLinks = [
    { href: "/admin/destinations", label: "Destinations", icon: "🌍" },
    { href: "/admin/circuits", label: "Circuits", icon: "🚀" },
    { href: "/admin/group-trips", label: "Voyages de groupes", icon: "🕺" },
    { href: "/admin/bookings", label: "Réservations", icon: "💳" },
    { href: "/admin/blog", label: "Blog", icon: "✍️" },
  ];

  return (
    <nav className="space-y-3 flex-grow">
      {navLinks.map((link) => {
        // On vérifie si le lien commence par le href (pour garder l'onglet actif en sous-page)
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
            <span className="mr-3 text-lg">{link.icon}</span> {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
