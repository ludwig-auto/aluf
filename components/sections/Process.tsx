"use client";

import { useRef, useState, useEffect } from "react";
import { Search, Hammer, Rocket, RefreshCw } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";

const steps = [
  {
    number: "01",
    title: "Utforska",
    description:
      "Jag sätter mig in i hur ni jobbar idag och identifierar de största tidstjuvarna. Inga slides, inga vaga löften, bara en konkret lista på vad som kostar er mest.",
    duration: "1 vecka",
    Icon: Search,
  },
  {
    number: "02",
    title: "Bygg",
    description:
      "Jag designar och bygger systemet. AI-agenter, automations och integrationer. Ni ser vad jag gör, jag förklarar varför. Inga svarta lådor.",
    duration: "2–3 veckor",
    Icon: Hammer,
  },
  {
    number: "03",
    title: "Rulla ut",
    description:
      "Agil implementation i sprintar. Varje leverans kan mätas direkt. Ni slipper vänta sex månader för att se om det funkar.",
    duration: "1–2 veckor",
    Icon: Rocket,
  },
  {
    number: "04",
    title: "Förfina",
    description:
      "Jag övervakar systemet, fångar upp det som kan göras bättre och justerar löpande. Ni betalar inte för att hålla det vid liv, ni betalar för att det ska bli bättre.",
    duration: "Löpande",
    Icon: RefreshCw,
  },
];

function StepCard({
  step,
  index,
  isActive,
  reduced,
}: {
  step: (typeof steps)[0];
  index: number;
  isActive: boolean;
  reduced: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const Icon = step.Icon;
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  // Three-state machine: entering → idle → active
  const state: "entering" | "idle" | "active" = reduced
    ? "active"
    : !inView
    ? "entering"
    : isActive
    ? "active"
    : "idle";

  const animValues = {
    entering: { opacity: 0, y: 24 },
    idle: { opacity: 0.4, y: 0 },
    active: { opacity: 1, y: 0 },
  };

  return (
    <motion.li
      ref={ref}
      className="group relative"
      animate={animValues[state]}
      transition={{
        duration: 0.5,
        ease: "easeOut" as const,
        delay: state === "idle" ? index * 0.1 : 0,
      }}
    >
      {/* Mobile timeline dot */}
      <div
        className={`md:hidden absolute left-0 top-4 w-3 h-3 rounded-full border-2 z-10 transition-all duration-300 ${
          isActive
            ? "bg-violet-500 border-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.5)]"
            : "bg-[#040407] border-white/20"
        }`}
        style={{ transform: "translateX(-50%)" }}
      />

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
        className={`relative flex flex-col pl-8 pb-2
          md:h-full md:pl-10 md:pr-10 md:pt-8 md:pb-7 md:rounded-2xl md:border md:overflow-hidden
          transition-all duration-300
          ${
            isActive
              ? "md:bg-white/[0.03] md:border-violet-500/40"
              : "md:bg-white/[0.03] md:border-white/[0.07] md:hover:border-violet-500/20"
          }`}
      >
        {/* Cursor-follow glow */}
        {!reduced && (
          <div
            aria-hidden="true"
            className="hidden md:block pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(200px circle at ${cursor.x}px ${cursor.y}px, rgba(139,92,246,0.15), rgba(139,92,246,0.04) 50%, transparent 70%)`,
            }}
          />
        )}
        {/* Watermark number */}
        <motion.span
          className="hidden md:block absolute -bottom-3 -right-1 text-[5rem] font-black leading-none select-none pointer-events-none text-white/[0.04] group-hover:text-violet-500/10 transition-colors duration-500"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{
            duration: 0.4,
            delay: isActive ? 0.2 : 0,
            ease: "easeOut" as const,
          }}
        >
          {step.number}
        </motion.span>

        {/* Icon row */}
        <div className="flex items-center justify-between mb-5 relative z-10">
          {/* Icon with glow on activation */}
          <motion.div
            className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-colors duration-300 md:ml-auto ${
              isActive
                ? "bg-violet-600 border-violet-500"
                : "bg-white/5 border-white/10"
            }`}
            style={
              isActive
                ? { boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" }
                : undefined
            }
            animate={
              reduced ? undefined : isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }
            }
            transition={{ duration: 0.3, ease: "easeOut" as const }}
          >
            <Icon
              className={`w-4 h-4 transition-colors duration-300 ${
                isActive ? "text-white" : "text-white/50"
              }`}
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1">
          <h3
            className={`text-base font-medium tracking-tight mb-2 transition-colors duration-300 ${
              isActive ? "text-violet-300" : "text-white"
            }`}
          >
            {step.title}
          </h3>
          <p className="text-sm text-white/60 font-light leading-relaxed flex-1">
            {step.description}
          </p>
          <div className="flex items-center gap-2 mt-5">
            <div
              className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                isActive ? "bg-violet-500" : "bg-white/30"
              }`}
            />
            <span
              className={`text-[11px] font-semibold uppercase tracking-widest transition-colors duration-300 ${
                isActive ? "text-violet-400/80" : "text-white/30"
              }`}
            >
              {step.duration}
            </span>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default function Process() {
  const shouldReduceMotion = useReducedMotion();
  const reduced = !!shouldReduceMotion;
  const sectionRef = useRef<HTMLElement>(null);

  const [activeSteps, setActiveSteps] = useState<boolean[]>([
    true,
    false,
    false,
    false,
  ]);

  // Activate all immediately for reduced-motion users
  useEffect(() => {
    if (shouldReduceMotion) {
      setActiveSteps([true, true, true, true]);
    }
  }, [shouldReduceMotion]);

  // Scroll-driven activation via useScroll + useMotionValueEvent
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 55%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (val) => {
    if (shouldReduceMotion) return;
    setActiveSteps((prev) => [
      true,
      prev[1] || val >= 0.15,
      prev[2] || val >= 0.35,
      prev[3] || val >= 0.55,
    ]);
  });

  const activeCount = activeSteps.filter(Boolean).length;
  const lineProgress = ((activeCount - 1) / (steps.length - 1)) * 100;

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#040407] overflow-hidden"
      id="process"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-[-0.03em] text-white mb-3">
            Från första samtal till{" "}
            <span className="font-light text-white/90">
              mätbara resultat
            </span>
          </h2>
          <p className="text-white/50 font-light text-sm max-w-md mx-auto">
            4 till 6 veckor. Så här ser det ut:
          </p>
        </motion.div>

        {/* Desktop connector: numbered dots + animated fill line */}
        <div className="hidden lg:block relative mb-2" aria-hidden="true">
          {/* Base gray line */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          {/* Purple fill line, width driven by activeCount */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-violet-500/60"
            animate={{ width: `${lineProgress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
          />
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="flex justify-center">
                <div
                  className={`w-7 h-7 rounded-full border flex items-center justify-center relative z-10 transition-all duration-300 ${
                    activeSteps[i]
                      ? "bg-violet-600 border-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                      : "bg-[#040407] border-white/20 opacity-40"
                  }`}
                >
                  <span
                    className={`text-[9px] font-bold transition-colors duration-300 ${
                      activeSteps[i] ? "text-white" : "text-white/30"
                    }`}
                  >
                    {step.number}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards with mobile vertical timeline */}
        <div className="relative">
          {/* Mobile vertical timeline */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-white/[0.07]" aria-hidden="true" />
          <motion.div
            className="md:hidden absolute left-0 top-0 w-[2px] bg-violet-500/60 origin-top rounded-full"
            style={{ marginLeft: "-0.5px" }}
            animate={{ height: `${lineProgress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
          />

          <ol className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                index={index}
                isActive={activeSteps[index]}
                reduced={reduced}
              />
            ))}
          </ol>
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" as const }}
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white/90 bg-violet-500/20 border border-violet-400/40 hover:bg-violet-500/30 hover:border-violet-400/60 transition-all duration-200 group/link focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            Starta med ett gratis samtal
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="group-hover/link:translate-x-0.5 group-active/link:translate-x-1.5 transition-transform duration-200"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
