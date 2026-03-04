"use client";

import { motion } from "framer-motion";
import { Send, Mail, BarChart3, Wrench } from "lucide-react";
import React from "react";

const solutions = [
  {
    icon: Send,
    category: "OUTREACH",
    title: "AI B2B Outreach",
    description:
      "Automatiserad prospektering som identifierar era idealkunder och bokar möten medan ni sover.",
    outcome: "Spara 20+ timmar/vecka i manuell reach-out.",
    example: "Swedish Cold: 120k SEK på 2 veckor",
    features: [
      "AI-driven prospecting",
      "Personliga meddelanden",
      "Automatisk uppföljning",
    ],
  },
  {
    icon: Mail,
    category: "PERSONALIZATION",
    title: "AI-Mejlskalning",
    description:
      "Koppla AI till HubSpot eller Salesforce. Varje mejl blir personligt utan en sekunds extra arbete.",
    outcome: "3x högre svarsfrekvens på kalla mejl.",
    example: "Leia Health: 100% personliga vårdmejl",
    features: [
      "CRM-direktintegration",
      "Kontext-medveten AI",
      "Noll manuellt arbete",
    ],
  },
  {
    icon: BarChart3,
    category: "EFFICIENCY",
    title: "CRM-Dashboarding",
    description:
      "Få full kontroll över pipeline och teamets prestation utan att jaga rapporter.",
    outcome: "100% datadriven överblick i realtid.",
    example: "Extend Marketing: Real-time status",
    features: [
      "Automatiska månadsrapporter",
      "Proaktiva pipeline-varningar",
      "Sömlös team-sync",
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

// Simplified card component - removed expensive 3D transforms
function TiltCard({ children, className, colSpan = "" }: { children: React.ReactNode; className?: string; colSpan?: string }) {
  return (
    <div className={`relative ${colSpan} ${className}`}>
      {children}
    </div>
  );
}

export default function Solutions() {
  return (
    <section className="py-20 md:py-24 bg-black" id="solutions">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[-0.03em] text-white mb-4">
            Vad vi <span className="font-serif italic text-gradient-emerald text-neon-glow">bygger</span>
          </h2>
          <p className="text-white/60 font-light text-lg max-w-xl mx-auto">
            Konkreta AI-system som löser verkliga affärsproblem
          </p>
        </motion.div>

        {/* Bento Grid - asymmetric layout */}
        <div className="grid md:grid-cols-6 gap-6 mb-6">
          {/* First card - LARGE (spans 4 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-4"
          >
            <TiltCard
              className="group relative bg-white/5 rounded-2xl border border-white/10 p-10 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300"
            >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform duration-300">
              <Send className="w-6 h-6 text-white" />
            </div>

            <span className="text-[10px] font-semibold tracking-[0.15em] text-emerald-400 uppercase drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
              {solutions[0].category}
            </span>

            <h3 className="text-3xl font-display font-medium tracking-tight text-white mt-3 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {solutions[0].title}
            </h3>

            <p className="text-base text-white/60 font-light leading-relaxed mb-6 max-w-xl">
              {solutions[0].description}
            </p>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-wider">Outcome:</span>
              <p className="text-sm text-emerald-400 font-medium">
                {solutions[0].outcome}
              </p>
            </div>

            <ul className="space-y-3">
              {solutions[0].features.map((f) => (
                <li
                  key={f}
                  className="text-sm text-white/40 flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  {f}
                </li>
              ))}
            </ul>
            </TiltCard>
          </motion.div>

          {/* Second and third cards - smaller (2 columns each, stacked) */}
          <div className="md:col-span-2 space-y-6">
            {solutions.slice(1).map((sol, solIndex) => {
              const Icon = sol.icon;
              return (
                <motion.div
                  key={sol.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + solIndex * 0.1 }}
                >
                  <TiltCard
                    className="group relative bg-white/5 rounded-2xl border border-white/10 p-8 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300"
                  >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-emerald-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>

                  <span className="text-[10px] font-semibold tracking-[0.15em] text-emerald-400 uppercase">
                    {sol.category}
                  </span>

                  <h3 className="text-xl font-light tracking-tight text-white mt-2 mb-3">
                    {sol.title}
                  </h3>

                  <p className="text-sm text-white/60 font-light leading-relaxed mb-5">
                    {sol.description}
                  </p>

                  <div className="flex flex-col gap-1 mb-5">
                    <span className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-wider">Outcome:</span>
                    <p className="text-xs text-emerald-400 font-medium leading-tight">
                      {sol.outcome}
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {sol.features.map((f) => (
                      <li
                        key={f}
                        className="text-xs text-white/30 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Custom solution - wide card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <TiltCard
            className="group relative rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300"
          >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-700" />

          <div className="relative p-8 md:p-12 text-white grid md:grid-cols-[1fr,auto] gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-emerald-200" />
                </div>
                <span className="text-[10px] font-semibold tracking-[0.15em] text-emerald-200 uppercase">
                  {customSolution.category}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extralight tracking-tight mb-3">
                {customSolution.title}
              </h3>
              <p className="text-emerald-100/80 font-light leading-relaxed max-w-lg mb-4">
                {customSolution.description}
              </p>
              <p className="text-sm text-emerald-200 font-medium italic">
                Investering för långsiktig strategisk fördel.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="flex flex-wrap gap-2">
                {customSolution.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 text-xs font-medium bg-white/10 rounded-full text-emerald-100"
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
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
