"use client";

import { useRef, useState } from "react";
import { Send, Settings, Wrench, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";

const solutions = [
  {
    icon: Send,
    category: "EXTERN",
    title: "AI B2B Outreach",
    description:
      "Jag bygger AI-agenter som automatiserar prospektering och personlig e-postuppföljning. Swedish Cold gick från 0 till 15 möten i månaden, på 14 dagar.",
    outcome: "Spara 15–20 timmar i månaden. Fler möten, samma team.",
    features: [
      "Säljautomatisering & LinkedIn-outreach",
      "Personalisering som faktiskt känns personlig",
      "Automatisk säljuppföljning",
    ],
  },
  {
    icon: Settings,
    category: "INTERN",
    title: "Admin-automatisering",
    description:
      "Rapporter som ingen orkar skriva, system som inte pratar med varandra och processer i Excel från 2019. Jag bygger bort det.",
    outcome: "Mindre friktionsarbete. Mer tid till det som faktiskt driver bolaget.",
    features: [
      "Automatiska rapporter och notiser",
      "Processautomatisering skräddarsydd för er",
      "Integrationer mot befintliga system",
    ],
  },
];

const customSolution = {
  icon: Wrench,
  category: "CUSTOM",
  title: "Plattformar och appar byggda för hur ni faktiskt jobbar",
  description: "Jag bygger det ni faktiskt skulle använda, inte det ni kringgår.",
  cta: "Hiems AB bytte ut sitt CRM mot ett skräddarsytt system. De sparade tid och slutade kringgå sina egna verktyg.",
  features: [
    "Skräddarsytt efter er process, inte tvärtom",
    "CRM-integration & API-kopplingar",
    "Långsiktig support",
  ],
};

const noiseStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
};

// ─── SolutionCard ─────────────────────────────────────────────────────────────
function SolutionCard({
  sol,
  reduced,
}: {
  sol: (typeof solutions)[0];
  reduced: boolean;
}) {
  const Icon = sol.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  // Cursor-follow spotlight
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  // Shimmer one-shot per hover
  const [shimmer, setShimmer] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHovered(true);
    setShimmer(false);
    // tiny delay so CSS class is removed and re-added to restart animation
    requestAnimationFrame(() => setShimmer(true));
  }

  function handleMouseLeave() {
    setHovered(false);
    setShimmer(false);
  }

  return (
    // Gradient-border wrapper: 1px padding + gradient background simulates border
    <div
      className="rounded-2xl p-px transition-all duration-300"
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(139,92,246,0.5), rgba(139,92,246,0.15), rgba(139,92,246,0.4))"
          : "rgba(255,255,255,0.06)",
      }}
    >
      <div
        ref={cardRef}
        className="group relative rounded-[15px] bg-[#040407] p-6 md:p-8 overflow-hidden cursor-default"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cursor-follow radial spotlight */}
        {!reduced && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(300px circle at ${cursor.x}px ${cursor.y}px, rgba(255,255,255,0.03), transparent 70%)`,
            }}
          />
        )}

        {/* Top-right corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Icon area with spotlight */}
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              {/* Icon spotlight */}
              {!reduced && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-[400ms] ease-out"
                  style={{
                    background: hovered
                      ? "radial-gradient(80px circle at center, rgba(139,92,246,0.15), transparent)"
                      : "radial-gradient(0px circle at center, rgba(139,92,246,0), transparent)",
                  }}
                />
              )}
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <Icon
                  className="w-4 h-4 transition-all duration-300 ease-out"
                  style={{
                    color: hovered ? "rgb(139,92,246)" : "rgb(167,139,250)",
                    transform: hovered && !reduced ? "rotate(8deg)" : "rotate(0deg)",
                  }}
                />
              </div>
            </div>
            <span className="text-[10px] font-medium tracking-[0.15em] text-violet-400/70 uppercase">
              {sol.category}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-light tracking-tight text-white mb-3">
            {sol.title}
          </h3>

          <p className="text-sm text-white/70 font-light leading-relaxed mb-8">
            {sol.description}
          </p>

          {/* Highlight pill with shimmer */}
          <div
            className={`relative flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-500/[0.08] border border-violet-500/10 w-fit mb-8 overflow-hidden${shimmer && !reduced ? " sol-shimmer-run" : ""}`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
            <p className="text-xs text-violet-300/90 font-light relative z-10">{sol.outcome}</p>
          </div>

          {/* Feature tags with stagger on hover */}
          <ul className="flex flex-wrap gap-2">
            {sol.features.map((f, i) => (
              <li
                key={f}
                className="px-3 py-1.5 text-[11px] text-white/60 font-light rounded-full border border-white/[0.06] bg-white/[0.02] transition-all duration-200 ease-out"
                style={
                  reduced
                    ? undefined
                    : {
                        transitionDelay: hovered ? `${i * 0.05}s` : "0s",
                        transform: hovered ? "translateY(0)" : "translateY(4px)",
                        opacity: hovered ? 1 : 0.6,
                      }
                }
              >
                {f}
              </li>
            ))}
          </ul>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/90 bg-violet-500/20 border border-violet-400/40 hover:bg-violet-500/30 hover:border-violet-400/60 transition-all duration-200 mt-4 group/link focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            Diskutera er utmaning
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="group-hover/link:translate-x-1 group-active/link:translate-x-2 transition-transform duration-200"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Solutions ─────────────────────────────────────────────────────────────────
export default function Solutions() {
  const shouldReduceMotion = useReducedMotion();
  const reduced = !!shouldReduceMotion;

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      className="py-16 md:py-24 bg-[#040407] relative overflow-hidden"
      id="solutions"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div ref={sectionRef} className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 relative">
        {/* Header */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <p className="text-[11px] font-medium tracking-[0.2em] text-violet-400/80 uppercase mb-4">
            Lösningar
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[-0.03em] text-white mb-4">
            Tre typer av problem.{" "}
            <span className="text-gradient-purple">
              En person som faktiskt löser dem.
            </span>
          </h2>
        </motion.div>

        {/* Two main cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={reduced ? undefined : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.5,
                ease: "easeOut" as const,
                delay: 0.15 + i * 0.15,
              }}
            >
              <SolutionCard sol={sol} reduced={reduced} />
            </motion.div>
          ))}
        </div>

        {/* Custom solution block */}
        <motion.div
          className="group relative rounded-2xl custom-block-glow"
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.45 }}
        >
          {/* Inner wrapper clips content to rounded corners without clipping the outer box-shadow glow */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 via-violet-700/90 to-violet-900/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(167,139,250,0.25),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(109,40,217,0.3),transparent_60%)]" />

            {/* Drifting inner gradient — CSS driven */}
            {!reduced && (
              <div
                aria-hidden="true"
                className="absolute inset-0 custom-block-drift pointer-events-none"
                style={{ zIndex: 0 }}
              />
            )}

            <div className="absolute inset-0 opacity-[0.15]" style={noiseStyle} />
          </div>
          <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-500" />

          <div className="relative z-10 p-6 md:p-10 text-white grid md:grid-cols-[1fr,auto] gap-8 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <Wrench className="w-4 h-4 text-white/80" />
                </div>
                <span className="text-[10px] font-medium tracking-[0.15em] text-white/60 uppercase">
                  {customSolution.category}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-extralight tracking-tight mb-3">
                {customSolution.title}
              </h3>
              <p className="text-white/60 font-light leading-relaxed max-w-xl mb-4 text-sm">
                {customSolution.description}
              </p>
              <p className="text-sm text-white/80 font-light mb-6">
                {customSolution.cta}
              </p>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white/90 bg-violet-500/20 border border-violet-400/40 hover:bg-violet-500/30 hover:border-violet-400/60 transition-all duration-200 group/link focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                Diskutera ert projekt
                <ArrowRight
                  aria-hidden={true}
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-active/link:translate-x-1.5"
                />
              </a>
            </div>

            <div className="flex flex-col items-start md:items-end gap-5">
              <div className="flex flex-wrap gap-2">
                {customSolution.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 text-[11px] font-light bg-white/[0.08] backdrop-blur-sm rounded-full text-white/70 border border-white/[0.08]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
