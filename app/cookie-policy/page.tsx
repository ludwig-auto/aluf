import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie-policy | AutomationsLudwig",
  description: "Cookie-policy för AutomationsLudwig",
  robots: { index: false, follow: false },
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 max-w-3xl mx-auto">
      <a href="/" className="text-violet-400 hover:text-violet-300 transition-colors text-sm mb-12 inline-block">
        ← Tillbaka till startsidan
      </a>

      <h1 className="text-3xl font-light mb-2">Cookie-policy</h1>
      <p className="text-white/40 text-sm mb-12">Senast uppdaterad: februari 2026</p>

      <div className="space-y-10 text-white/70 font-light leading-relaxed">
        <section>
          <h2 className="text-lg font-medium text-white mb-3">Vad är cookies</h2>
          <p>
            Cookies är små textfiler som lagras i din webbläsare när du besöker en webbplats.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Vilka cookies vi använder</h2>
          <p className="mb-3">Vi använder två typer av cookies:</p>
          <ul className="space-y-3 list-disc list-inside">
            <li>
              <span className="text-white/90">Nödvändiga cookies</span>, lagrar ditt cookie-val så att bannern inte visas vid varje besök.
            </li>
            <li>
              <span className="text-white/90">Analytiska cookies (Google Analytics)</span>, anonymiserad besöksstatistik som hjälper oss förstå hur sajten används. Ingen data kopplas till dig personligen eller säljs vidare.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Kontakt</h2>
          <p>
            Frågor om cookies besvaras på{" "}
            <a href="mailto:ludwig@automationsludwig.com" className="text-violet-400 hover:text-violet-300 transition-colors">
              ludwig@automationsludwig.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
