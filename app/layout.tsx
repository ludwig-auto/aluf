import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutomationsLudwig — AI-automation som faktiskt levererar",
  description:
    "Små, skalbara AI-system för B2B-bolag med 5-15M i omsättning. Från koncept till resultat på 4-8 veckor.",
  keywords: [
    "AI-automation",
    "B2B",
    "outreach",
    "CRM",
    "Sverige",
    "AI-system",
  ],
  openGraph: {
    title: "AutomationsLudwig — AI-automation som faktiskt levererar",
    description:
      "Små, skalbara AI-system för B2B-bolag. Swedish Cold genererade 120k SEK på två veckor.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="antialiased">{children}</body>
    </html>
  );
}
