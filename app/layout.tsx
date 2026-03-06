import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ChatWidget } from "@/components/ChatWidget";

export const metadata: Metadata = {
  metadataBase: new URL("https://automationsludwig.se"),
  title: "AutomationsLudwig | AI-agenter & Automatisering för B2B i Stockholm",
  description:
    "AI-agenter och automatisering för B2B-bolag i Stockholm. Jag bygger AI-agenter som automatiserar säljprocessen, processautomatisering och CRM-integration. Mätbara resultat på 4–6 veckor.",
  authors: [{ name: "Ludwig", url: "https://automationsludwig.se" }],
  alternates: {
    canonical: "https://automationsludwig.se",
  },
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AutomationsLudwig | AI-automation för B2B-bolag i Stockholm",
    description:
      "Säljautomatisering och processautomatisering för B2B-bolag i Stockholm. Mätbara resultat på 4–6 veckor. Swedish Cold: 120 000 kr ROI på 28 dagar.",
    url: "https://automationsludwig.se",
    locale: "sv_SE",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "AutomationsLudwig | AI-agenter & automatisering för B2B-bolag" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutomationsLudwig | AI-automation för B2B-bolag i Stockholm",
    description:
      "Säljautomatisering och processautomatisering för B2B-bolag i Stockholm. Mätbara resultat på 4–6 veckor. Swedish Cold: 120 000 kr ROI på 28 dagar.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AutomationsLudwig",
  url: "https://automationsludwig.se",
  logo: "https://automationsludwig.se/aluf-logo.png",
  description:
    "AI-automation för B2B-bolag i Sverige. Från koncept till resultat på 4–6 veckor.",
  founder: {
    "@type": "Person",
    name: "Ludwig Andersson",
    url: "https://www.linkedin.com/in/ludwig-a-automationsludwig/",
  },
  email: "ludwig@automationsludwig.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Stockholm",
    addressRegion: "Stockholm",
    addressCountry: "SE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "59.3293",
    longitude: "18.0686",
  },
  sameAs: ["https://www.linkedin.com/in/ludwig-a-automationsludwig/"],
  areaServed: [
    {
      "@type": "City",
      name: "Stockholm",
    },
    {
      "@type": "Country",
      name: "Sverige",
    },
  ],
  inLanguage: "sv-SE",
  serviceType: [
    {
      "@type": "Service",
      name: "AI-agenter",
      description: "Intelligenta automationssystem baserade på AI för att hantera komplexa affärsprocesser och ersätta manuella arbetsflöden",
    },
    {
      "@type": "Service",
      name: "Säljautomatisering",
      description: "Automatiserad prospektering, lead qualification och customer outreach",
    },
    {
      "@type": "Service",
      name: "B2B Outreach Automation",
      description: "AI-driven email outreach och LinkedIn-prospektering för B2B-bolag",
    },
    {
      "@type": "Service",
      name: "Processautomatisering",
      description: "Automatisering av repetitiva affärsprocesser med n8n och Make.com",
    },
    {
      "@type": "Service",
      name: "CRM Integration",
      description: "Integration mellan olika CRM-system, automatiseringsplattformar och affärssystem",
    },
  ],
  offers: {
    "@type": "AggregateOffer",
    description: "Anpassade AI-automationslösningar för B2B-bolag",
    priceCurrency: "SEK",
    priceRange: "25000-200000",
    pricingModel: "Per projekt",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Sales",
    url: "https://calendly.com/ludwig-automationsludwig/30min",
    availableLanguage: ["sv", "en"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Hem",
      item: "https://automationsludwig.se",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tjänster",
      item: "https://automationsludwig.se#services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Case Studies",
      item: "https://automationsludwig.se#case",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Process",
      item: "https://automationsludwig.se#process",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "FAQ",
      item: "https://automationsludwig.se#faq",
    },
  ],
};

const caseStudyArticleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Case study: Swedish Cold — 120 000 kr ROI på 28 dagar med AI-outreach",
  description:
    "AI-drivet emailsystem som automatiserade prospektering och uppföljning för Swedish Cold, vilket resulterade i 15–20 möten per månad och 120 000 kr i direkt ROI.",
  datePublished: "2024-01-28",
  url: "https://automationsludwig.se#case",
  author: {
    "@type": "Person",
    name: "Ludwig Andersson",
    url: "https://www.linkedin.com/in/ludwig-a-automationsludwig/",
  },
  publisher: {
    "@type": "Organization",
    name: "AutomationsLudwig",
    url: "https://automationsludwig.se",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Vad är AI-agenter och hur skiljer de sig från vanlig automatisering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vanlig automatisering följer fasta regler: gör A, sedan B. AI-agenter kan resonera, fatta beslut och anpassa sig beroende på situation. Det betyder att de kan hantera undantag, skriva personliga meddelanden och lösa problem som en människa annars skulle behöva ta hand om. Resultatet är system som faktiskt fungerar i verkligheten, inte bara i demos.",
      },
    },
    {
      "@type": "Question",
      name: "Hur lång tid tar en implementation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De flesta projekt levererar första konkreta resultat inom 4 till 6 veckor. Exakt tid beror på scope och hur komplex befintlig stack är, det går jag igenom i det första samtalet.",
      },
    },
    {
      "@type": "Question",
      name: "Behöver vi teknisk kompetens internt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nej. Jag hanterar hela implementationen och ser till att systemet är enkelt att använda när jag lämnar över. Det ska inte krävas en utvecklare för att köra det ni betalat för.",
      },
    },
    {
      "@type": "Question",
      name: "Vilka system integrerar ni med?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HubSpot, Salesforce, LinkedIn, Google Workspace, Slack och de flesta API-baserade verktyg. Om ni är osäkra på om era system funkar, ta ett samtal så kollar jag.",
      },
    },
    {
      "@type": "Question",
      name: "Hur hanterar ni vår data enligt GDPR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jag kör på EU-baserade dataservrar och följer GDPR fullt ut. Jag kan redogöra för exakt hur data hanteras, inga luddiga svar.",
      },
    },
    {
      "@type": "Question",
      name: "Vad är förväntat ROI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Det beror på var tidstjuvarna sitter. Swedish Cold såg 120 000 kr tillbaka på 30 dagar. Jag tar bara uppdrag jag tror kommer ge en tydlig avkastning. Om jag inte ser det, säger jag det i det första samtalet.",
      },
    },
    {
      "@type": "Question",
      name: "Vad kostar det?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Det beror helt på vad ni behöver. Ett samtal på 30 minuter räcker för att ge er ett konkret svar.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/favicon.png" as="image" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyArticleJsonLd).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-black focus:text-white focus:outline-2 focus:outline-violet-400 focus:outline-offset-2">
          Hoppa till innehåll
        </a>
        {children}
        <CookieBanner />
        <GoogleAnalytics />
        <SpeedInsights />
        <ChatWidget />
      </body>
    </html>
  );
}
