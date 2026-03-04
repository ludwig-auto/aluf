import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allmänna villkor | AutomationsLudwig",
  description: "Allmänna villkor för AutomationsLudwig",
  robots: { index: false, follow: false },
};

export default function VillkorPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 max-w-3xl mx-auto">
      <a href="/" className="text-violet-400 hover:text-violet-300 transition-colors text-sm mb-12 inline-block">
        ← Tillbaka till startsidan
      </a>

      <h1 className="text-3xl font-light mb-2">Allmänna villkor</h1>
      <p className="text-white/40 text-sm mb-12">Senast uppdaterade: februari 2026</p>

      <div className="space-y-10 text-white/70 font-light leading-relaxed">
        <section>
          <h2 className="text-lg font-medium text-white mb-3">Parter</h2>
          <p>
            Dessa villkor gäller mellan AutomationsLudwig, Ludwig Andersson (nedan "Leverantören")
            och den som ingår avtal om tjänster (nedan "Kunden").
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Tjänster</h2>
          <p>
            Leverantören tillhandahåller AI-automationer, emailsystem, chattbotar, interna automationer
            och skräddarsydda webbapplikationer enligt vad som överenskommits skriftligen per projekt.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Avtal</h2>
          <p>
            Avtal anses ingånget när båda parter skriftligen bekräftat projektets omfattning,
            leveranstid och ersättning.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Betalning</h2>
          <p>
            Faktura skickas enligt överenskommelse med 30 dagars betalningsvillkor om inget annat avtalats.
            Vid försenad betalning utgår dröjsmålsränta enligt räntelagen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Leverans</h2>
          <p>
            Leverantören åtar sig att hålla överenskomna tidsramar. Vid förseningar som beror på Kunden
            förbehåller sig Leverantören rätten att justera tidsplanen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Äganderätt</h2>
          <p>
            Kunden äger de system och lösningar som byggs inom uppdraget efter att full betalning mottagits.
            Leverantören behåller rätten att använda generiska metoder och komponenter i andra uppdrag.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Ansvarsbegränsning</h2>
          <p>
            Leverantörens ansvar är begränsat till det belopp Kunden betalat för det aktuella uppdraget.
            Leverantören ansvarar inte för indirekta förluster eller skada till följd av tredjepartstjänsters driftstörningar.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Sekretess</h2>
          <p>
            Båda parter förbinder sig att inte röja konfidentiell information om den andra parten
            utan skriftligt medgivande.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Förtida avslut</h2>
          <p>
            Kunden kan avsluta uppdraget med 30 dagars skriftligt varsel.
            Arbete utfört till och med avslutsdatum faktureras.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-white mb-3">Tillämplig lag</h2>
          <p>
            Svensk lag tillämpas. Tvister avgörs i svensk domstol med Stockholms tingsrätt som första instans.
          </p>
        </section>
      </div>
    </main>
  );
}
