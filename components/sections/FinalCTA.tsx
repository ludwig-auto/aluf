"use client";

import { ArrowRight } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { CALENDLY_URL } from "@/lib/constants";
import { motion, useReducedMotion } from "framer-motion";

export default function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16 bg-[#040407]" id="contact">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="relative bg-gradient-to-br from-violet-900/60 via-violet-800/40 to-transparent rounded-3xl overflow-hidden border border-violet-500/20 shadow-2xl"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Top highlight line */}
          <div className="absolute top-0 inset-x-0 h-px bg-violet-500/30 pointer-events-none" />

          {/* Radial glow behind heading */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[240px] bg-violet-500/20 blur-[80px] rounded-full pointer-events-none" />

          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none" />

          {/* Content */}
          <div className="relative px-6 py-8 md:px-10 md:py-12 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight text-white mb-5 tracking-[-0.03em]">
              Boka 30 minuter. Ta reda på vad det kostar er att vänta.
            </h2>

            <p className="text-base text-white/80 font-light mb-6 max-w-2xl mx-auto leading-relaxed">
              Boka ett kostnadsfritt strategisamtal. Jag går igenom vad som stjäl mest tid
              i din organisation och tar fram en konkret plan, utan förpliktelser.
            </p>

            <GlassButton
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              contentClassName="gap-2"
            >
              Boka gratis samtal
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-active:translate-x-1.5 shrink-0" aria-hidden="true" />
            </GlassButton>

            <p className="mt-4 text-sm text-white/40 font-light text-balance">
              Inga demos. Inga slides. Bara ett samtal om vad som faktiskt kan förändras.
            </p>

            <p className="mt-3 text-xs text-white/25 font-light">
              Projekt från 5 000 kr
            </p>

            <p className="text-white/50 text-sm mt-4 flex flex-col sm:flex-row gap-1 items-center justify-center">
              <span>Föredrar du att skriva?</span>
              <span>
                {" "}
                <a href="mailto:ludwig@automationsludwig.com" className="text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-2 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400">
                  Skicka ett mejl
                </a>{" "}
                eller{" "}
                <a href="https://www.linkedin.com/in/ludwig-a-automationsludwig/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-2 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400">
                  hitta mig på LinkedIn
                </a>
                .
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
