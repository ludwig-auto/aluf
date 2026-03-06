import { config } from "dotenv";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

// Load environment variables
config({ path: ".env.local" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

// Content to index from the website
const CONTENT_CHUNKS = [
  {
    id: "services-ai-agents",
    text: "AI-agenter: Intelligenta automationssystem som kan resonera, fatta beslut och anpassa sig beroende på situation. De hanterar undantag, skriver personliga meddelanden och löser problem som en människa annars skulle behöva ta hand om.",
    metadata: { type: "service", category: "ai-agents" },
  },
  {
    id: "services-sales-automation",
    text: "Säljautomatisering: Automatiserad prospektering, lead qualification och customer outreach. Systemet kan identifiera rätt leads, skicka personliga meddelanden och följa upp automatiskt.",
    metadata: { type: "service", category: "sales" },
  },
  {
    id: "services-process-automation",
    text: "Processautomatisering: Automatisering av repetitiva affärsprocesser med n8n och Make.com. Kopplar ihop olika system och verktyg för att skapa sömlösa arbetsflöden.",
    metadata: { type: "service", category: "process" },
  },
  {
    id: "services-crm-integration",
    text: "CRM Integration: Integration mellan olika CRM-system, automatiseringsplattformar och affärssystem. Stöd för HubSpot, Salesforce, LinkedIn, Google Workspace, Slack och de flesta API-baserade verktyg.",
    metadata: { type: "service", category: "integration" },
  },
  {
    id: "pricing-range",
    text: "Priser: Projekt från 5 000 kr. Mindre projekt 5 000 - 25 000 kr, större implementationer 25 000 - 200 000 kr. Exakt pris beror på scope och komplexitet. Ett 30-minuters samtal räcker för att ge ett konkret svar.",
    metadata: { type: "pricing" },
  },
  {
    id: "case-swedish-cold",
    text: "Case study Swedish Cold: AI-drivet emailsystem som automatiserade prospektering och uppföljning. Resultat: 120 000 kr direkt ROI på 30 dagar, 15-20 kvalificerade möten per månad. Implementationstid: 4-6 veckor.",
    metadata: { type: "case-study", client: "swedish-cold" },
  },
  {
    id: "timeline",
    text: "Implementationstid: De flesta projekt levererar första konkreta resultat inom 4 till 6 veckor. Exakt tid beror på scope och hur komplex befintlig stack är.",
    metadata: { type: "info", category: "timeline" },
  },
  {
    id: "tech-requirement",
    text: "Tekniska krav: Ingen teknisk kompetens behövs internt. AutomationsLudwig hanterar hela implementationen och ser till att systemet är enkelt att använda när det lämnas över.",
    metadata: { type: "faq", category: "tech" },
  },
  {
    id: "gdpr-compliance",
    text: "GDPR och datasäkerhet: EU-baserade dataservrar och följer GDPR fullt ut. Tydlig dokumentation om exakt hur data hanteras, inga luddiga svar.",
    metadata: { type: "faq", category: "gdpr" },
  },
  {
    id: "roi-expectation",
    text: "Förväntat ROI: Beror på var tidstjuvarna sitter. Swedish Cold såg 120 000 kr tillbaka på 30 dagar. AutomationsLudwig tar bara uppdrag som förväntas ge tydlig avkastning.",
    metadata: { type: "faq", category: "roi" },
  },
  {
    id: "contact-info",
    text: "Kontakt: Email ludwig@automationsludwig.com. Boka gratis 30-minuters samtal på calendly.com/ludwig-automationsludwig/30min. Hemsida: automationsludwig.com",
    metadata: { type: "contact" },
  },
];

async function indexContent() {
  console.log("🚀 Starting content indexing...");

  // Get or create index
  const indexName = process.env.PINECONE_INDEX_NAME || "automationsludwig";

  try {
    const indexes = await pinecone.listIndexes();
    const indexExists = indexes.indexes?.some((idx) => idx.name === indexName);

    if (!indexExists) {
      console.log(`📊 Creating index: ${indexName}...`);
      await pinecone.createIndex({
        name: indexName,
        dimension: 1536, // OpenAI text-embedding-3-small
        metric: "cosine",
        spec: {
          serverless: {
            cloud: "aws",
            region: "us-east-1",
          },
        },
      });
      console.log("✅ Index created");

      // Wait for index to be ready (90 seconds)
      console.log("⏳ Waiting for index to be ready (90 seconds)...");
      await new Promise(resolve => setTimeout(resolve, 90000));
    } else {
      console.log(`✅ Index ${indexName} already exists`);
    }

    const index = pinecone.index(indexName).namespace("");

    console.log("🔤 Generating embeddings...");
    const vectors = [];

    for (const chunk of CONTENT_CHUNKS) {
      console.log(`  - Processing: ${chunk.id}`);

      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk.text,
      });

      vectors.push({
        id: chunk.id,
        values: response.data[0].embedding,
        metadata: {
          ...chunk.metadata,
          text: chunk.text,
        },
      });
    }

    console.log(`📤 Uploading ${vectors.length} vectors to Pinecone...`);

    if (vectors.length === 0) {
      throw new Error("No vectors generated - check embedding API");
    }

    // Debug: log first vector structure
    console.log("First vector structure:", JSON.stringify(vectors[0], null, 2).substring(0, 500));

    await index.upsert(vectors);

    console.log("✅ Content indexed successfully!");
    console.log(`📊 Total chunks: ${CONTENT_CHUNKS.length}`);
  } catch (error) {
    console.error("❌ Error indexing content:", error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  indexContent()
    .then(() => {
      console.log("🎉 Indexing complete!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Indexing failed:", error);
      process.exit(1);
    });
}

export { indexContent };
