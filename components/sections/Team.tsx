"use client";

import Image from "next/image";
import { Linkedin as LinkedInIcon, Mail, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function Team() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, ease: "easeOut" as const, delay },
        };

  return (
    <section className="py-16 md:py-24 bg-black" id="team" aria-labelledby="team-heading">
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div className="mb-10" {...fadeUp()}>
          <h2 id="team-heading" className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-[-0.03em] text-white">
            Du jobbar alltid med{" "}
            <span className="font-light text-white/90">
              samma person
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-start max-w-4xl">
          {/* Avatar + social */}
          <motion.div
            className="shrink-0 flex flex-col items-center gap-5"
            {...fadeUp(0.1)}
          >
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden ring-2 ring-violet-500/20">
              <Image
                src="/ludwig.jpeg"
                alt="Ludwig Andersson"
                width={112}
                height={112}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/ludwig-a-automationsludwig/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn-profil (öppnas i nytt fönster)"
                className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center hover:bg-violet-500/20 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                <LinkedInIcon className="w-4 h-4 text-white/60 hover:text-violet-400 transition-colors" aria-hidden="true" />
              </a>
              <a
                href="mailto:ludwig@automationsludwig.com"
                aria-label="Skicka e-post till ludwig@automationsludwig.com"
                className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center hover:bg-violet-500/20 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                <Mail className="w-4 h-4 text-white/60 hover:text-violet-400 transition-colors" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div className="flex-1" {...fadeUp(0.2)}>
            <h3 className="text-xl md:text-2xl font-light tracking-tight text-white mb-1">
              Ludwig Andersson
            </h3>
            <p className="text-violet-400 font-medium text-sm mb-6 tracking-wide">
              Founder · AI Automation Engineer
            </p>

            <p className="text-white/60 font-light leading-relaxed mb-8">
              Jag har byggt AI-system som faktiskt går i produktion, inte demos
              som ser bra ut i ett möte men aldrig används i verkligheten.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "AI-agenter",
                "Säljautomatisering",
                "Processautomatisering",
                "n8n / Make",
                "API-integrationer",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[11px] font-medium text-white/40 border border-white/[0.07] rounded-full bg-white/[0.02]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium text-white/90 bg-primary-glass border border-primary hover:bg-violet-500/30 hover:border-violet-400/60 transition-colors duration-200 interactive-hover group/link focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              Prata direkt med Ludwig
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-active/link:translate-x-1.5 transition-transform duration-200 shrink-0" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
