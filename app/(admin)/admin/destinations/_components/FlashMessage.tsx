"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function FlashMessage({
  message,
  type = "success",
}: {
  message: string;
  type?: "success" | "error" | "deleted";
}) {
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // On cache le message après 5 secondes
    const timer = setTimeout(() => {
      setVisible(false);
      // Optionnel : on nettoie l'URL pour enlever le ?success=true
      router.replace(pathname);
    }, 5000);

    return () => clearTimeout(timer);
  }, [pathname, router]);

  if (!visible) return null;

  const bgClass =
    type === "success"
      ? "bg-emerald-500 shadow-emerald-200"
      : "bg-amber-500 shadow-amber-200";

  return (
    <div
      className={`${bgClass} text-white p-4 rounded-2xl font-bold shadow-lg mb-6 animate-in fade-out exit-duration-500`}
    >
      {message}
    </div>
  );
}
