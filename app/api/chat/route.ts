import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Knowledge base about AutomationsLudwig services
const KNOWLEDGE_BASE = `
Du är AI-assistent för AutomationsLudwig, ett konsultbolag specialiserat på AI-automation för B2B-företag i Stockholm.

TJÄNSTER:
- AI-agenter: Intelligenta automationssystem som kan resonera och fatta beslut
- Säljautomatisering: Automatiserad prospektering, lead qualification och outreach
- Processautomatisering: Automatisering av repetitiva affärsprocesser med n8n och Make.com
- CRM Integration: Integration mellan olika CRM-system och affärssystem

PRISER:
- Projekt från 5 000 kr
- Mindre projekt: 5 000 - 25 000 kr
- Större implementationer: 25 000 - 200 000 kr
- Exakt pris beror på scope och komplexitet

ROI & RESULTAT:
- Swedish Cold: 120 000 kr ROI på 30 dagar
- 15-20 möten per månad automatiskt
- Implementationstid: 4-6 veckor för första resultat

CASE STUDY - SWEDISH COLD:
- Problem: Manuell prospektering och uppföljning tog för mycket tid
- Lösning: AI-drivet email-system som automatiserade prospektering och uppföljning
- Resultat: 120 000 kr direkt ROI på 30 dagar, 15-20 kvalificerade möten per månad

INTEGRATIONS:
- HubSpot, Salesforce, LinkedIn, Google Workspace, Slack
- De flesta API-baserade verktyg

GDPR:
- EU-baserade dataservrar
- Full GDPR-efterlevnad
- Tydlig dokumentation om datahantering

KONTAKT:
- Email: ludwig@automationsludwig.com
- Boka samtal: calendly.com/ludwig-automationsludwig/30min
- Hemsida: automationsludwig.com

INSTRUKTIONER:
- Svara alltid på svenska
- Var hjälpsam och konkret
- Om användare frågar om priser, ge prisintervall och förklara att exakt pris beror på scope
- Om användare verkar intresserad, föreslå att boka ett 30-minuters samtal
- Om du inte vet svaret, var ärlig och hänvisa till kontakt
- Fråga om användarens bransch, problem och budget för att kvalificera leads
- Fokusera på mätbara resultat och ROI
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      );
    }

    // Create chat completion with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: KNOWLEDGE_BASE,
        },
        ...messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = completion.choices[0]?.message?.content || "Ursäkta, jag kunde inte generera ett svar.";

    // Log conversation to webhook (optional)
    const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "chat_conversation",
            messages: [...messages, { role: "assistant", content: assistantMessage }],
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error("Failed to log conversation:", error);
      }
    }

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
