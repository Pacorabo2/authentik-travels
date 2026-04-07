// components/CtaSection.tsx
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Fond avec un joli dégradé aux couleurs de ta marque */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-500 z-0"></div>

      {/* Éléments décoratifs en arrière-plan pour donner de la texture */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Prêt à créer le voyage de vos rêves ?
        </h2>

        <p className="text-xl md:text-2xl mb-10 font-bold opacity-90 text-balance">
          Parlez-nous de vos envies, de votre budget et de vos dates. Nous nous
          occupons de concevoir une aventure qui vous ressemble.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/sur-mesure"
            className="bg-gray-900 text-white hover:bg-black font-bold text-lg py-4 px-10 rounded-full transition-all duration-300 shadow-xl hover:scale-105 w-full sm:w-auto"
          >
            Commencer mon projet
          </Link>
          <Link
            href="/contact"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-600 font-bold text-lg py-4 px-10 rounded-full transition-all duration-300 w-full sm:w-auto"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
