import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integritetspolicy | AutomationsLudwig",
  description: "Integritetspolicy och cookie-policy för AutomationsLudwig",
  robots: { index: false, follow: false },
};

export default function IntegritetspolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 max-w-3xl mx-auto">
      <a href="/" className="text-violet-400 hover:text-violet-300 transition-colors text-sm mb-12 inline-block">
        ← Tillbaka till startsidan
      </a>

      <h1 className="text-3xl font-light mb-2">Integritetspolicy</h1>
      <p className="text-white/40 text-sm mb-12">Senast uppdaterad: februari 2026</p>

      <div className="space-y-10 text-white/70 font-light leading-relaxed">
        <section>
          <h2 className="text-lg font-medium text-white mb-3">Personuppgiftsansvarig</h2>
          <p>
            AutomationsLudwig, Ludwig Andersson<br />
            <a href="mailto:ludwig@automationsludwig.com" className="text-violet-400 hover:text-violet-300 transition-colors">
              ludwig@automationsludwig.com
            </a><br />
            Stockholm, Sverige
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Vilka uppgifter vi samlar in</h2>
          <p>
            Vi samlar in uppgifter som du lämnar när du kontaktar oss eller bokar ett samtal.
            Det kan inkludera namn, e-postadress, telefonnummer och information om ditt företag.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Varför vi behandlar dina uppgifter</h2>
          <p>
            Vi behandlar dina uppgifter för att besvara förfrågningar, genomföra samtal och administrera kundrelationer.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Radering av personuppgifter</h2>
          <p>
            Om du vill att vi raderar dina personuppgifter, till exempel din e-postadress eller kontaktinformation,
            är du välkommen att höra av dig till{" "}
            <a href="mailto:ludwig@automationsludwig.com" className="text-violet-400 hover:text-violet-300 transition-colors">
              ludwig@automationsludwig.com
            </a>{" "}
            så hanterar vi det.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Verktyg vi använder</h2>
          <p className="mb-3">
            Vi använder följande verktyg i vår verksamhet som kan komma i kontakt med data:
          </p>
          <ul className="space-y-1.5 list-disc list-inside">
            <li><span className="text-white/90">OpenAI</span>, AI-bearbetning</li>
            <li><span className="text-white/90">Make.com</span>, automationsflöden</li>
            <li><span className="text-white/90">n8n</span>, automationsflöden</li>
            <li><span className="text-white/90">Google Workspace</span>, kommunikation och lagring</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Kontakt</h2>
          <p>
            Frågor om hur vi hanterar dina uppgifter besvaras på{" "}
            <a href="mailto:ludwig@automationsludwig.com" className="text-violet-400 hover:text-violet-300 transition-colors">
              ludwig@automationsludwig.com
            </a>.
          </p>
        </section>

        <div className="border-t border-white/10 pt-10">
          <h2 className="text-2xl font-light text-white mb-2">Cookie-policy</h2>
          <p className="text-white/40 text-sm mb-8">Senast uppdaterad: februari 2026</p>

          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-medium text-white mb-3">Vad är cookies</h3>
              <p>
                Cookies är små textfiler som lagras i din webbläsare när du besöker en webbplats.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-white mb-3">Vilka cookies vi använder</h3>
              <p>
                Vi använder endast nödvändiga cookies som krävs för att webbplatsen ska fungera.
                Vi använder inga spårnings- eller marknadsföringscookies.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-white mb-3">Kontakt</h3>
              <p>
                Frågor om cookies besvaras på{" "}
                <a href="mailto:ludwig@automationsludwig.com" className="text-violet-400 hover:text-violet-300 transition-colors">
                  ludwig@automationsludwig.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
