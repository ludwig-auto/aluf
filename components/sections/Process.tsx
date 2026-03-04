"use client";

import { memo, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Search, Hammer, Rocket, RefreshCw } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Utforska",
    description:
      "Vi fördjupar oss i er vision, era mål och förutsättningar för att definiera högst-ROI-möjligheter.",
    duration: "1 vecka",
    Icon: Search,
  },
  {
    number: "02",
    title: "Bygg",
    description:
      "Vi designar AI-arkitekturen med fokus på skalbarhet, integritet och integration med befintlig stack.",
    duration: "2–3 veckor",
    Icon: Hammer,
  },
  {
    number: "03",
    title: "Inför",
    description:
      "Agil implementation i sprintar. Varje leverans ger mätbara resultat som kan valideras direkt.",
    duration: "1–2 veckor",
    Icon: Rocket,
  },
  {
    number: "04",
    title: "Förfina",
    description:
      "Kontinuerlig övervakning och förbättring. Systemet blir smartare med varje datapunkt.",
    duration: "Löpande",
    Icon: RefreshCw,
  },
];

const Process = memo(function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="py-20 md:py-24 bg-black overflow-hidden" id="process" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[-0.03em] text-white mb-4">
            Så här <span className="font-serif italic text-gradient-emerald text-neon-glow">funkar</span> det
          </h2>
          <p className="text-white/60 font-light text-lg max-w-xl mx-auto">
            Från första samtal till mätbara resultat
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) - animated based on scroll */}
          <div className="hidden lg:block absolute top-[44px] left-[15%] right-[15%] h-0.5 bg-white/10">
            <motion.div
              style={{ scaleX, transformOrigin: "left" }}
              className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 h-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.Icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className="relative bg-white/5 rounded-2xl border border-white/10 p-8 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/40 transition-all duration-500 group-hover:-translate-y-2">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-500" />

                    {/* Step number & Icon */}
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase mb-1 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
                          Steg
                        </span>
                        <span className="text-2xl font-display font-medium text-white leading-none">
                          {step.number}
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-emerald-500 group-hover:rotate-6 transition-all duration-500 shadow-sm group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                        <Icon className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors duration-500" />
                      </div>
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-medium tracking-tight text-white mb-3 group-hover:text-emerald-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-white/50 font-light leading-relaxed mb-6">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Process;
