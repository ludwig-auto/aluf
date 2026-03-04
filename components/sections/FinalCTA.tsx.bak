"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 bg-white" id="contact">
      <div className="max-w-4xl mx-auto">
        {/* Card with pixelated gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-700" />

          {/* Dithered overlay (CSS method) */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px)
              `,
            }}
          />

          {/* Content */}
          <div className="relative px-8 py-12 md:px-12 md:py-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight">
              Redo att täppa till era intäktsläckor?
            </h2>

            <p className="text-lg text-white/90 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
              Boka ett kostnadsfritt strategisamtal så kartlägger vi era största
              möjligheter och tar fram en konkret plan.
            </p>

            <GlassButton
              href="mailto:hej@automationsludwig.se"
              size="lg"
              contentClassName="gap-2"
            >
              Boka strategisamtal
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </GlassButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
