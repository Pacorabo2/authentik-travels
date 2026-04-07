export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold tracking-medium text-slate-900 leading-none">
          Nous contacter<span className="text-amber-600">.</span>
        </h1>
        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div className="p-10 rounded-[2.5rem] bg-slate-50 text-left">
            <h3 className="font-black uppercase tracking-widest text-amber-600 mb-4">
              Email
            </h3>
            <a
              href="mailto:info@authentika.io"
              className="text-2xl font-bold text-slate-900 break-all"
            >
              info@authentika.io
            </a>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-amber-50 text-left">
            <h3 className="font-black uppercase tracking-widest text-amber-600 mb-4">
              WhatsApp
            </h3>
            <p className="text-2xl font-bold text-slate-900">
              Direct avec l&apos;expert
            </p>
            <button className="mt-4 px-6 py-3 bg-slate-900 text-white rounded-full font-bold">
              Lancer la discussion
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
