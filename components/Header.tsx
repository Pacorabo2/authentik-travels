"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

interface DestinationNav {
  name: string;
  slug: string;
}

export default function Header({
  destinations = [],
}: {
  destinations: DestinationNav[];
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer les menus si on change de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  const isSolidBackground = !isHome || isScrolled;

  const headerClasses = isSolidBackground
    ? "bg-white text-slate-900 shadow-md py-3"
    : "bg-white text-slate-900 py-6";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${headerClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* 1. LOGO */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo Authentik Travels"
            className="h-10 w-auto object-contain"
            // On ajoute loading="eager" pour simuler le comportement "priority"
            loading="eager"
          />
        </Link>

        {/* 2. NAVIGATION DESKTOP */}
        <nav className="hidden md:flex items-center gap-10 font-black uppercase text-[12px] tracking-[0.2em]">
          {/* MENU DÉROULANT DESTINATIONS */}
          <div
            className="relative py-2"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link
              href="/destinations"
              className="flex items-center gap-1 hover:text-amber-500 transition-colors outline-none cursor-pointer uppercase"
            >
              Destinations
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </Link>

            {/* LE PANNEAU (Dropdown) */}
            <div
              className={`absolute top-full left-0 w-64 bg-white shadow-2xl rounded-[2rem] p-4 mt-2 transition-all duration-300 border border-slate-100
              ${isDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"}`}
            >
              <div className="flex flex-col gap-3">
                {destinations && destinations.length > 0 ? (
                  destinations.map((dest) => (
                    <Link
                      key={dest.slug}
                      href={`/destinations/${dest.slug}`}
                      className="group/item flex items-center justify-between px-5 py-4 rounded-2xl hover:bg-slate-50 transition-all"
                    >
                      <span className="text-sm font-bold text-slate-700 normal-case tracking-normal group-hover/item:text-amber-600">
                        {dest.name}
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="px-5 py-4 text-[10px] text-slate-400 italic normal-case tracking-normal">
                    Aucune destination
                  </div>
                )}
              </div>
            </div>
          </div>

          <Link
            href="/groupTrip"
            className="hover:text-amber-500 transition-colors"
          >
            Nos Voyages
          </Link>
          <Link
            href="/ambassador"
            className="hover:text-amber-500 transition-colors"
          >
            Devenir Ambassadeur
          </Link>
          <Link
            href="/a-propos"
            className="hover:text-amber-500 transition-colors"
          >
            L&apos;Agence
          </Link>
          <Link
            href="/contact"
            className="hover:text-amber-500 transition-colors"
          >
            Contact
          </Link>

          <Link
            href="/sur-mesure"
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl hover:bg-amber-500 hover:scale-105"
          >
            Créer mon voyage
          </Link>
        </nav>

        {/* 3. MOBILE TOGGLE */}
        <button
          className="md:hidden p-2 text-current outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 4. MENU MOBILE */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl transition-all duration-500 overflow-hidden
        ${isMobileMenuOpen ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible"}`}
      >
        <div className="p-8 space-y-8">
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
              Nos Destinations
            </p>
            <div className="grid grid-cols-2 gap-3">
              {destinations.map((d) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="text-sm font-bold p-4 bg-slate-50 rounded-2xl text-slate-700"
                >
                  {d.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 flex flex-col font-black uppercase text-xs tracking-widest text-slate-900">
            <Link href="/groupTrip">Nos Voyages</Link>
            <Link href="/a-propos">L&apos;Agence</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <Link
            href="/sur-mesure"
            className="block text-center bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest"
          >
            Créer mon voyage
          </Link>
        </div>
      </div>
    </header>
  );
}
