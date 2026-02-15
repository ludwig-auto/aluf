"use client";

import { motion } from "framer-motion";
import { Send, Mail, BarChart3, Wrench } from "lucide-react";

const solutions = [
  {
    icon: Send,
    category: "OUTREACH",
    title: "Outreach-system",
    description:
      "Identifiera, nå ut till och boka möten med er idealkund. Systemet arbetar dygnet runt medan ni fokuserar på att sälja.",
    example: "Swedish Cold: 120k SEK på 2 veckor",
    features: [
      "AI-driven prospecting",
      "Personliga meddelanden",
      "Automatisk uppföljning",
    ],
  },
  {
    icon: Mail,
    category: "AI-INTEGRATION",
    title: "AI-mejlpersonalisering",
    description:
      "HubSpot, Salesforce, Gmail — vi kopplar AI till era system så varje mejl blir personligt utan extra arbetstid.",
    example: "Leia Health: Personliga vårdmejl i skala",
    features: [
      "HubSpot/Salesforce-integration",
      "Kontext-medveten AI",
      "Noll manuellt arbete",
    ],
  },
  {
    icon: BarChart3,
    category: "CRM-AUTOMATION",
    title: "CRM-övervakning",
    description:
      "Automatiska statusrapporter, arbetsflödesövervakning och notifieringar. Ledningen får överblick. Teamet slipper rapportera.",
    example: "Extend Marketing: Real-time projektstatus",
    features: [
      "Automatiska rapporter",
      "Smart övervakning",
      "Proaktiva varningar",
    ],
  },
];

const customSolution = {
  icon: Wrench,
  category: "CUSTOM SOLUTIONS",
  title: "Skräddarsydda plattformar",
  description:
    "Dashboards, interna verktyg, custom integrationer. Vi bygger det era standardverktyg inte klarar.",
  example: "Från koncept till produktion",
  features: ["Full tech-stack", "Skalbar arkitektur", "Långsiktig support"],
  pricing: "Från 100 000 SEK",
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Solutions() {
  return (
    <section className="py-20 md:py-24 bg-gray-50/50" id="solutions">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[-0.03em] text-gray-900 mb-4">
            Vad vi <span className="font-serif italic text-emerald-700">bygger</span>
          </h2>
          <p className="text-gray-500 font-light text-lg max-w-xl mx-auto">
            Konkreta AI-system som löser verkliga affärsproblem
          </p>
        </motion.div>

        {/* 3 standard cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {solutions.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <motion.div
                key={sol.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group relative bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg hover:shadow-emerald-50 hover:border-emerald-100 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>

                <span className="text-[10px] font-semibold tracking-[0.15em] text-emerald-600 uppercase">
                  {sol.category}
                </span>

                <h3 className="text-xl font-light tracking-tight text-gray-900 mt-2 mb-3">
                  {sol.title}
                </h3>

                <p className="text-sm text-gray-500 font-light leading-relaxed mb-5">
                  {sol.description}
                </p>

                <p className="text-sm text-emerald-700 font-medium mb-5">
                  {sol.example}
                </p>

                <ul className="space-y-2">
                  {sol.features.map((f) => (
                    <li
                      key={f}
                      className="text-xs text-gray-400 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Custom solution - wide card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="group relative rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-emerald-200 transition-all duration-300 hover:-translate-y-1"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-700" />

          {/* Dithered overlay */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px)
              `,
            }}
          />

          <div className="relative p-8 md:p-12 text-white grid md:grid-cols-[1fr,auto] gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Wrench className="w-5 h-5 text-emerald-200" />
                </div>
                <span className="text-[10px] font-semibold tracking-[0.15em] text-emerald-200 uppercase">
                  {customSolution.category}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extralight tracking-tight mb-3">
                {customSolution.title}
              </h3>
              <p className="text-emerald-100/80 font-light leading-relaxed max-w-lg">
                {customSolution.description}
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="flex flex-wrap gap-2">
                {customSolution.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full text-emerald-100"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <p className="text-sm text-emerald-200/70">
                {customSolution.pricing}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
