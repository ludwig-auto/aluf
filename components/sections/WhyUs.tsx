"use client";

import { useRef, useState } from "react";
import { Zap, Target, Users, Shield } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";

const points = [
  {
    Icon: Zap,
    title: "Resultat på 4–6 veckor, inte ett halvår",
    description:
      "Swedish Cold såg ROI dag 14. Jag levererar mätbara resultat snabbt, inte efter ett halvår av slides och piloter.",
  },
  {
    Icon: Target,
    title: "Jag mäter i kronor och tid",
    description:
      "ROI från dag ett. Inte i features, inte i slides. I faktisk avkastning som syns i kassan.",
  },
  {
    Icon: Users,
    title: "Du jobbar alltid direkt med Ludwig",
    description:
      "Inget mellanlager. Du har mitt nummer och jag svarar. Du vet alltid exakt vem som gör jobbet.",
  },
  {
    Icon: Shield,
    title: "GDPR utan krångel",
    description:
      "EU-baserade dataservrar. Full transparens i hur din data hanteras. Inga kompromisser.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function WhyUsCard({ Icon, title, description, reduced }: { Icon: typeof Zap; title: string; description: string; reduced: boolean }) {
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
        className="relative rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 md:p-8 overflow-hidden transition-all duration-300 hover:border-violet-500/20 h-full flex flex-col"
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
        <div className="relative z-10">
          <div className="w-9 h-9 rounded-xl bg-violet-500/[0.06] border border-violet-500/20 flex items-center justify-center mb-3 group-hover:bg-violet-500/10 group-hover:border-violet-500/40 transition-colors duration-300">
            <Icon className="w-5 h-5 text-violet-400/70 group-hover:text-violet-400 transition-colors duration-300" />
          </div>
          <h3 className="text-base md:text-lg font-light tracking-tight text-white/90 mb-2 group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          <p className="text-white/45 font-light leading-relaxed text-sm md:text-base group-hover:text-white/60 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyUs() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="why-us" className="py-16 md:py-24 bg-black">
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="mb-10 md:mb-14 max-w-3xl"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-tight text-white">
            Varför bolag väljer mig framför{" "}
            <span
              className="text-gradient-purple"
              style={{ filter: "drop-shadow(0 0 10px rgba(139,92,246,0.5)) drop-shadow(0 0 24px rgba(139,92,246,0.2))" }}
            >
              byrån med 40 slides
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 md:gap-8"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {points.map(({ Icon, title, description }) => (
            <WhyUsCard key={title} Icon={Icon} title={title} description={description} reduced={!!shouldReduceMotion} />
          ))}
        </motion.div>

        <motion.div
          className="mt-10"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white/90 bg-violet-500/20 border border-violet-400/40 hover:bg-violet-500/30 hover:border-violet-400/60 transition-all duration-200 group/link"
          >
            Boka gratis samtal
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="group-hover/link:translate-x-0.5 group-active/link:translate-x-1.5 transition-transform duration-200"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
