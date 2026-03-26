"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Identifiants invalides");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-[2rem] shadow-xl border border-slate-200 w-full max-w-md"
      >
        <h1 className="text-3xl font-black italic mb-6 text-center text-slate-900">
          Authentik Admin
        </h1>
        {error && (
          <p className="text-red-500 mb-4 text-center font-bold">{error}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-4 rounded-xl border border-slate-200 focus:outline-amber-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-4 mb-6 rounded-xl border border-slate-200 focus:outline-amber-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
