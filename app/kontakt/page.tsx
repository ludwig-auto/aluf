import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt — AutomationsLudwig | Boka ett samtal om AI-automation",
  description:
    "Berätta om ditt behov och få en personlig analys av vad som kan automatiseras i ditt bolag — inom 24 timmar. Baserad i Stockholm, arbetar med B2B-bolag i hela Sverige.",
  alternates: {
    canonical: "https://automationsludwig.se/kontakt",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Kontakt — AutomationsLudwig | AI-automation för B2B-bolag",
    description:
      "Berätta om ditt behov och få en personlig analys av vad som kan automatiseras i ditt bolag — inom 24 timmar.",
    url: "https://automationsludwig.se/kontakt",
    locale: "sv_SE",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AutomationsLudwig — Kontakta oss för AI-automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt — AutomationsLudwig | AI-automation för B2B-bolag",
    description:
      "Berätta om ditt behov och få en personlig analys av vad som kan automatiseras i ditt bolag — inom 24 timmar.",
  },
};

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-[#040407]">
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
