"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, TrendingUp, Cpu, Plus } from "lucide-react";

const faqCategories = [
  {
    title: "Implementation",
    icon: Zap,
    items: [
      {
        question: "Hur lång tid tar en implementation?",
        answer: "Typiskt 1–2 veckor för de första resultaten. Vi arbetar i korta sprintar så ni ser faktiskt värde direkt, inte om sex månader.",
      },
      {
        question: "Behöver vi teknisk kompetens internt?",
        answer: "Nej. Vi fungerar som er externa automation-partner. Vi bygger, implementerar och underhåller systemen åt er.",
      },
    ]
  },
  {
    title: "Teknik & Integration",
    icon: Cpu,
    items: [
      {
        question: "Vilka system integrerar ni med?",
        answer: "De flesta moderna CRM (HubSpot, Salesforce), ERP (Fortnox) och kommunikationstjänster (Slack, Gmail). Vi kan även bygga custom-API:er om det krävs.",
      },
      {
        question: "Är det verkligen GDPR-compliant?",
        answer: "Absolut. Vi använder svenska servrar där det krävs och säkerställer att all AI-hantering sker inom strikta rättsliga ramar. Ni äger er data.",
      },
    ]
  },
  {
    title: "Leverans & ROI",
    icon: TrendingUp,
    items: [
      {
        question: "Vad är förväntat ROI?",
        answer: "Våra kunder ser ofta en tidsbesparing på 20-30 timmar per säljare i månaden, eller som i vårt Swedish Cold-case, 120k i stängda affärer på 14 dagar.",
      },
      {
        question: "Vad kostar en investering?",
        answer: "Varje projekt är unikt, men mindre automatiseringar börjar från 20 000 SEK. Boka ett strategisamtal för en fast offert.",
      },
    ]
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-24 bg-black" id="faq">
      <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight text-white mb-6">
            Strategisk <span className="font-serif italic text-gradient-emerald text-neon-glow">klarhet</span>
          </h2>
          <p className="text-white/60 font-light text-lg">De vanligaste frågorna från företagsledare</p>
        </motion.div>

        <div className="space-y-12">
          {faqCategories.map((category, catIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-bold tracking-[0.2em] text-emerald-400/80 uppercase">
                    {category.title}
                  </h3>
                </div>

                <div className="grid gap-3">
                  {category.items.map((item, itemIndex) => {
                    const id = `${catIndex}-${itemIndex}`;
                    const isOpen = openId === id;
                    return (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <button
                          onClick={() => setOpenId(isOpen ? null : id)}
                          className={`w-full text-left p-6 rounded-2xl glass-panel neon-border transition-all duration-300 ${isOpen ? "bg-white/10" : "bg-white/5 hover:bg-white/10"
                            }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-lg font-light text-white/90 group-hover:text-white transition-colors">
                              {item.question}
                            </span>
                            <div className={`shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                              <Plus className={`w-4 h-4 ${isOpen ? "text-emerald-400" : "text-white/40"}`} />
                            </div>
                          </div>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <p className="pt-6 text-base text-white/60 font-light leading-relaxed border-t border-white/5 mt-6">
                                  {item.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
