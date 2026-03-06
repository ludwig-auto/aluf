import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const SYSTEM_PROMPT = `Du är AI-assistent för AutomationsLudwig, ett konsultbolag specialiserat på AI-automation för B2B-företag i Stockholm.

INSTRUKTIONER:
- Svara alltid på svenska
- Var hjälpsam, konkret och professionell
- Använd kontexten nedan för att ge exakta och relevanta svar
- Om användare frågar om priser, ge prisintervall och förklara att exakt pris beror på scope
- Om användare verkar intresserad, föreslå att boka ett gratis 30-minuters samtal
- Om du inte vet svaret från kontexten, var ärlig och hänvisa till kontakt (ludwig@automationsludwig.com)
- Fråga om användarens bransch, problem och budget för att kvalificera leads
- Fokusera på mätbara resultat och ROI
- Håll svar kortfattade och lättlästa (max 3-4 meningar per stycke)

KONTAKTINFORMATION:
- Email: ludwig@automationsludwig.com
- Boka samtal: calendly.com/ludwig-automationsludwig/30min
- Hemsida: automationsludwig.com
`;

async function retrieveContext(query: string): Promise<string> {
  try {
    const indexName = process.env.PINECONE_INDEX_NAME || "automationsludwig";
    const index = pinecone.index(indexName);

    // Generate embedding for the query
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });

    const queryEmbedding = embeddingResponse.data[0].embedding;

    // Search Pinecone for relevant context
    const searchResponse = await index.query({
      vector: queryEmbedding,
      topK: 3,
      includeMetadata: true,
    });

    // Extract and format context from matches
    const context = searchResponse.matches
      .map((match) => {
        const metadata = match.metadata as any;
        return metadata?.text || "";
      })
      .filter((text) => text.length > 0)
      .join("\n\n");

    return context;
  } catch (error) {
    console.error("Error retrieving context:", error);
    // Return fallback context if RAG fails
    return `AutomationsLudwig erbjuder AI-automation för B2B-företag. Projekt från 5 000 kr. Kontakta ludwig@automationsludwig.com eller boka samtal på calendly.com/ludwig-automationsludwig/30min`;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      );
    }

    // Get the latest user message
    const lastUserMessage = messages
      .filter((m: any) => m.role === "user")
      .pop();

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: "No user message found" },
        { status: 400 }
      );
    }

    // Retrieve relevant context from Pinecone
    const context = await retrieveContext(lastUserMessage.content);

    // Create chat completion with context
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `${SYSTEM_PROMPT}\n\nRELEVANT KONTEXT:\n${context}`,
        },
        ...messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage =
      completion.choices[0]?.message?.content ||
      "Ursäkta, jag kunde inte generera ett svar.";

    // Log conversation to webhook
    const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "chat_conversation",
            messages: [
              ...messages,
              { role: "assistant", content: assistantMessage },
            ],
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
