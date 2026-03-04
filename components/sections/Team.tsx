"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

export default function Team() {
  return (
    <section className="py-20 md:py-24 bg-black" id="team">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight text-white mb-4">
            Teamet
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <div className="group bg-white/5 rounded-2xl border border-white/10 p-8 text-center hover:shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-0.5">
            {/* Initials instead of generic icon */}
            <div className="w-24 h-24 rounded-full bg-emerald-700 flex items-center justify-center mx-auto mb-6 ring-4 ring-emerald-500/10 group-hover:ring-emerald-500/20 transition-all">
              <span className="text-3xl font-semibold text-white">LA</span>
            </div>

            <h3 className="text-xl font-light tracking-tight text-white mb-1">
              Ludwig Andersson
            </h3>
            <p className="text-sm text-emerald-400 font-medium mb-4">
              Founder / AI Automation Engineer
            </p>
            <p className="text-sm text-white/50 font-light leading-relaxed mb-6">
              Bygger AI-system som faktiskt går i produktion. Kan automera allt
              utom sina egna mejl.
            </p>

            <div className="flex items-center justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/ludwig-a-automationsludwig/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-emerald-500/20 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-white/40 hover:text-emerald-400 transition-colors" />
              </a>
              <a
                href="mailto:ludwig@automationsludwig.com"
                aria-label="E-post"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-emerald-500/20 transition-colors"
              >
                <Mail className="w-4 h-4 text-white/40 hover:text-emerald-400 transition-colors" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
