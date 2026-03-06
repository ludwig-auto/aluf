"use client";

import { memo, useState, useRef } from "react";
import { Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const faqItems = [
  {
    question: "Vad är AI-agenter och hur skiljer de sig från vanlig automatisering?",
    answer:
      "Vanlig automatisering följer fasta regler: gör A, sedan B. AI-agenter kan resonera, fatta beslut och anpassa sig beroende på situation. Det betyder att de kan hantera undantag, skriva personliga meddelanden och lösa problem som en människa annars skulle behöva ta hand om. Resultatet är system som faktiskt fungerar i verkligheten, inte bara i demos.",
  },
  {
    question: "Hur lång tid tar en implementation?",
    answer:
      "De flesta projekt levererar första konkreta resultat inom 4 till 6 veckor. Exakt tid beror på scope och hur komplex befintlig stack är, det går jag igenom i det första samtalet.",
  },
  {
    question: "Behöver vi teknisk kompetens internt?",
    answer:
      "Nej. Jag hanterar hela implementationen och ser till att systemet är enkelt att använda när jag lämnar över. Det ska inte krävas en utvecklare för att köra det ni betalat för.",
  },
  {
    question: "Vilka system integrerar ni med?",
    answer:
      "HubSpot, Salesforce, LinkedIn, Google Workspace, Slack och de flesta API-baserade verktyg. Om ni är osäkra på om era system funkar, ta ett samtal så kollar jag.",
  },
  {
    question: "Hur hanterar ni vår data enligt GDPR?",
    answer:
      "Jag kör på EU-baserade dataservrar och följer GDPR fullt ut. Jag kan redogöra för exakt hur data hanteras, inga luddiga svar.",
  },
  {
    question: "Vad är förväntat ROI?",
    answer:
      "Det beror på var tidstjuvarna sitter. Swedish Cold såg 120 000 kr tillbaka på 30 dagar. Jag tar bara uppdrag jag tror kommer ge en tydlig avkastning. Om jag inte ser det, säger jag det i det första samtalet.",
  },
  {
    question: "Vad kostar det?",
    answer:
      "Priset beror på vad ni behöver. Efter ett första samtal där jag förstår er situation kan jag ge er en offert inom ett uppföljningsmöte. Räkna med att ha ett konkret pris inom två möten.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
  reduced,
  answerRef,
}: {
  item: (typeof faqItems)[0];
  index: number;
  isOpen: boolean;
  onToggle: (id: number) => void;
  reduced: boolean;
  answerRef: (el: HTMLDivElement | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group"
      variants={reduced ? undefined : itemVariants}
    >
      <div
        ref={cardRef}
        onMouseMove={(e) => {
          if (reduced) return;
          const rect = cardRef.current?.getBoundingClientRect();
          if (rect) setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseEnter={(e) => {
          if (reduced) return;
          const rect = cardRef.current?.getBoundingClientRect();
          if (rect) setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${
          isOpen
            ? "bg-white/[0.05] border-violet-500/30"
            : "bg-white/[0.03] border-white/[0.07] hover:border-violet-500/20"
        }`}
      >
        {/* Cursor-follow glow */}
        {!reduced && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(200px circle at ${cursor.x}px ${cursor.y}px, rgba(139,92,246,0.15), rgba(139,92,246,0.04) 50%, transparent 70%)`,
            }}
          />
        )}
        <button
          type="button"
          id={`faq-button-${index}`}
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
          className="relative z-10 w-full text-left px-4 py-4 md:p-5 rounded-2xl focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm md:text-base font-light text-white/90 group-hover:text-white transition-colors">
              {item.question}
            </span>
            <div
              aria-hidden="true"
              className={`shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 ${
                isOpen ? "rotate-45" : ""
              }`}
            >
              <Plus className={`w-4 h-4 ${isOpen ? "text-violet-400" : "text-white/50"}`} />
            </div>
          </div>
        </button>
        <div
          id={`faq-answer-${index}`}
          role="region"
          aria-labelledby={`faq-button-${index}`}
          aria-hidden={!isOpen}
          ref={answerRef}
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ overflow: "hidden" }}
        >
          <p className="relative z-10 pt-3 md:pt-4 text-sm text-white/75 font-light leading-relaxed border-t border-white/5 mt-0 px-4 md:px-5 pb-3 md:pb-5">
            {item.answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const FAQ = memo(function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);
  const answerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const shouldReduceMotion = useReducedMotion();

  const toggleItem = (id: number) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#040407]" id="faq" aria-labelledby="faq-heading">
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2
            id="faq-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-[-0.03em] text-white mb-4"
          >
            De frågor jag får i varje{" "}
            <span className="font-light text-white/90">
              första samtal
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="space-y-2"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqItems.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openId === index}
              onToggle={toggleItem}
              reduced={!!shouldReduceMotion}
              answerRef={(el) => { answerRefs.current[index] = el; }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default FAQ;
