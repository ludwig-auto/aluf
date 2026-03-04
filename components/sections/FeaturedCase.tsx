"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TrendingUp } from "lucide-react";
import { motion, useReducedMotion, useInView } from "framer-motion";

// ─── DataStream ────────────────────────────────────────────────────────────────
// 24 vertical bars, 3px tall, randomised widths, fly-in with stagger on trigger,
// then quietly update every 1.5s with CSS ease transitions.
const BAR_COUNT = 24;

function makeWidths(): number[] {
  return Array.from({ length: BAR_COUNT }, () => 20 + Math.floor(Math.random() * 41));
}

function DataStream({
  triggered,
  reduced,
}: {
  triggered: boolean;
  reduced: boolean;
}) {
  const [widths, setWidths] = useState<number[]>(makeWidths);
  const [visible, setVisible] = useState(reduced);
  const [flyInDone, setFlyInDone] = useState(reduced);

  useEffect(() => {
    if (!triggered) return;
    setVisible(true);
    const doneTimer = setTimeout(() => setFlyInDone(true), BAR_COUNT * 20 + 400);
    const interval = setInterval(() => setWidths(makeWidths()), 1500);
    return () => {
      clearTimeout(doneTimer);
      clearInterval(interval);
    };
  }, [triggered]);

  return (
    <div className="hidden sm:flex flex-col gap-[3px] justify-end ml-4 mb-1 shrink-0 self-end">
      {widths.map((w, i) => (
        <div
          key={i}
          style={{
            height: 3,
            borderRadius: 9999,
            flexShrink: 0,
            backgroundColor:
              i % 3 === 0
                ? "rgba(139,92,246,0.7)"
                : i % 3 === 1
                ? "rgba(255,255,255,0.2)"
                : "rgba(139,92,246,0.4)",
            width: visible ? w : 0,
            opacity: visible ? 1 : 0,
            transition: flyInDone
              ? "width 0.3s ease-out"
              : `width 0.3s ease-out ${i * 0.02}s, opacity 0.15s ease-out ${i * 0.02}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── StatCard ──────────────────────────────────────────────────────────────────
// fadeIn + slideUp on trigger (staggered), countUp 1.2s, border activates
// when count completes, subtle pulse every 6s thereafter.
function StatCard({
  label,
  value,
  suffix = "",
  from = 0,
  staggerDelay,
  triggered,
  reduced,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  from?: number;
  staggerDelay: number;
  triggered: boolean;
  reduced: boolean;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const hasRun = useRef(false);

  // Reduced motion: show final value immediately
  useEffect(() => {
    if (!reduced || !triggered || hasRun.current) return;
    hasRun.current = true;
    setDisplayed(
      typeof value === "number" ? value.toLocaleString("sv-SE") : String(value)
    );
    setDone(true);
  }, [reduced, triggered, value]);

  // Normal: count-up animation
  useEffect(() => {
    if (!triggered || hasRun.current || reduced) return;
    hasRun.current = true;

    if (typeof value !== "number") {
      setDisplayed(String(value));
      const t = setTimeout(() => setDone(true), (staggerDelay + 1.3) * 1000);
      return () => clearTimeout(t);
    }

    let rafId = 0;

    const startTimer = setTimeout(() => {
      const startTime = performance.now();
      const duration = 1200;

      function tick(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(
          (from as number) + eased * ((value as number) - (from as number))
        );
        setDisplayed(current.toLocaleString("sv-SE"));
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setDone(true);
        }
      }

      rafId = requestAnimationFrame(tick);
    }, staggerDelay * 1000);

    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(rafId);
    };
  }, [triggered, value, from, staggerDelay, reduced]);

  // Pulse loop every 6s after done
  useEffect(() => {
    if (!done || reduced) return;
    let pulseOff: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setPulsing(true);
      pulseOff = setTimeout(() => setPulsing(false), 600);
    }, 6000);
    return () => {
      clearInterval(interval);
      clearTimeout(pulseOff);
    };
  }, [done, reduced]);

  return (
    <motion.div
      className="px-4 py-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:border-violet-500/20 flex flex-col transition-colors duration-300"
      initial={reduced ? undefined : { opacity: 0, y: 16 }}
      animate={triggered ? { opacity: 1, y: 0 } : undefined}
      transition={{
        opacity: { duration: 0.5, delay: reduced ? 0 : staggerDelay },
        y: { duration: 0.5, ease: "easeOut" as const, delay: reduced ? 0 : staggerDelay },
      }}
    >
      <dt className="text-[10px] text-white/50 uppercase tracking-[0.12em] font-semibold order-2">
        {label}
      </dt>
      <dd className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-1 whitespace-nowrap order-1">
        {displayed}
        {suffix}
      </dd>
    </motion.div>
  );
}

// ─── Sprint milestones for timeline ────────────────────────────────────────────
const MILESTONES = [
  { day: "Dag 1",  label: "Discovery Call"  },
  { day: "Dag 14", label: "System Live" },
  { day: "Dag 21", label: "Första mötena" },
  { day: "Dag 28", label: "120k ROI",    accent: true },
];

// ─── FeaturedCase ──────────────────────────────────────────────────────────────
export default function FeaturedCase() {
  const shouldReduceMotion = useReducedMotion();
  const reduced = !!shouldReduceMotion;

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (inView && !hasTriggered) {
      const t = setTimeout(() => setHasTriggered(true), 200);
      return () => clearTimeout(t);
    }
  }, [inView, hasTriggered]);

  const fadeUp = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.55, ease: "easeOut" as const, delay },
        };

  return (
    <section
      ref={sectionRef}
      className="pt-12 pb-20 md:pt-16 md:pb-24 bg-black relative overflow-hidden"
      id="case"
      aria-labelledby="case-heading"
    >
      {/* Scan line removed */}

      {/* Ambient glow — top-right radial */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16 relative">

        {/* ─── Header row: logo left, sprint label right ──────────── */}
        <motion.div
          className="flex items-end justify-between gap-6 mb-8 md:mb-16"
          {...fadeUp()}
        >
          <div className="flex flex-col gap-2.5">
            <span className="text-[9px] font-semibold tracking-[0.4em] text-[#7C5CBF]/70 uppercase">
              Case study
            </span>
            <h2 id="case-heading" className="sr-only">
              Swedish Cold Case Study
            </h2>
            <Image
              src="/logos/swedish-cold.webp"
              alt="Swedish Cold"
              width={100}
              height={48}
              className="h-12 sm:h-16 w-auto brightness-0 invert"
              priority={false}
              loading="lazy"
            />
            <p className="text-[11px] text-[#8888AA] font-light tracking-wide">
              B2B-sälj · AI-outreach
            </p>
          </div>
        </motion.div>

        {/* ─── Main 2-col layout ───────────────────────────────────── */}
        <div className="grid lg:grid-cols-[55fr_45fr] items-center">

          {/* LEFT: 120k + DataStream + stats */}
          <div className="lg:pr-14 xl:pr-20">

            {/* Big number + DataStream */}
            <div className="mb-8 md:mb-10">
              <div className="relative inline-flex items-end">
                <div className="absolute -inset-10 bg-violet-400/[0.07] blur-[90px] rounded-full pointer-events-none" />
                <motion.p
                  className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.5rem] font-light tracking-[-0.06em] text-white leading-none select-none"
                  initial={reduced ? undefined : { opacity: 0, y: 16 }}
                  animate={hasTriggered ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.6, ease: "easeOut" as const }}
                >
                  120k
                </motion.p>
                <DataStream triggered={hasTriggered} reduced={reduced} />
              </div>
              <motion.div className="flex items-center gap-2.5 mt-3" {...fadeUp(0.1)}>
                <TrendingUp className="w-5 h-5 text-violet-400 shrink-0" />
                <p className="text-base md:text-xl font-light tracking-tight text-white/55">
                  i direkt ROI.{" "}
                  <span className="text-white/90">På 28 dagar.</span>
                </p>
              </motion.div>
            </div>

            {/* Stats — 3-col with violet left-accent strip */}
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
              {[
                { label: "Direkt ROI",  value: 120,     suffix: "k SEK",  from: 80  },
                { label: "Pipeline",    value: 500,     suffix: "k+ SEK", from: 400 },
                { label: "Möten/mån",   value: "15–20", suffix: ""                  },
              ].map((stat, i) => (
                <div key={stat.label} className="relative pl-[3px]">
                  <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-violet-500/35" />
                  <StatCard
                    label={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                    from={stat.from as number | undefined}
                    staggerDelay={0.3 + i * 0.1}
                    triggered={hasTriggered}
                    reduced={reduced}
                  />
                </div>
              ))}
            </dl>

          </div>

          {/* RIGHT: Timeline + Story — styled box with highlight */}
          <div className="mt-14 lg:mt-0 lg:pl-14 xl:pl-20 lg:p-6 lg:rounded-2xl lg:border border-white/[0.07] bg-white/[0.03] hover:border-violet-500/20">

            {/* Timeline */}
            <motion.div className="mb-10 md:mb-14" {...fadeUp(0.15)}>
              <p className="text-[9px] font-semibold tracking-[0.35em] text-[#8888AA]/60 uppercase mb-3">
                28-dagars sprint
              </p>
              <div className="relative">
                {/* Track base */}
                <div className="absolute top-[6px] left-0 right-0 h-px bg-white/[0.06]" />

                {/* Animated gradient fill */}
                {hasTriggered && !reduced && (
                  <motion.div
                    className="absolute top-[6px] left-0 h-px"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(255,255,255,0.08) 0%, rgba(139,92,246,0.45) 55%, rgba(139,92,246,0.85) 100%)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.6, ease: "easeOut", delay: 0.6 }}
                  />
                )}

                {/* Milestone dots + labels */}
                <div className="flex justify-between">
                  {MILESTONES.map((m, i) => (
                    <motion.div
                      key={m.day}
                      className="flex flex-col items-center gap-3"
                      initial={reduced ? undefined : { opacity: 0, y: 8 }}
                      animate={hasTriggered ? { opacity: 1, y: 0 } : undefined}
                      transition={{ delay: 0.6 + i * 0.32, duration: 0.45 }}
                    >
                      {/* Dot */}
                      {m.accent ? (
                        <div className="relative flex items-center justify-center w-4 h-4">
                          {/* Soft glow */}
                          <div className="absolute w-8 h-8 bg-violet-500/40 blur-[10px] rounded-full" />
                          {/* Pulsing ring */}
                          {hasTriggered && !reduced && (
                            <motion.div
                              className="absolute w-4 h-4 rounded-full bg-violet-400/50"
                              animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1.7,
                              }}
                            />
                          )}
                          <div className="w-4 h-4 rounded-full bg-violet-400 relative z-10" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-white/40 bg-white/[0.05]" />
                      )}

                      {/* Labels */}
                      <div className="flex flex-col items-center gap-1.5 text-center">
                        <span className={`text-[10px] font-semibold tracking-[0.15em] uppercase ${
                          m.accent ? "text-white/60" : "text-white/40"
                        }`}>
                          {m.day}
                        </span>
                        <span
                          className={`text-[12px] ${
                            m.accent
                              ? "font-semibold text-white"
                              : "font-light text-white/70"
                          }`}
                        >
                          {m.label}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Story */}
            <motion.div {...fadeUp(0.25)}>
              <h3 className="text-[1.1rem] md:text-[1.25rem] font-semibold text-white mb-3 leading-snug tracking-tight">
                Från 0 till 15 möten i månaden. På 28 dagar.
              </h3>
              <p className="text-sm md:text-[15px] text-white/50 font-light leading-relaxed max-w-[400px]">
                Swedish Colds säljare lade sin tid på att boka möten, inte på att
                stänga dem. Jag byggde ett AI-emailsystem som sköter prospektering
                och uppföljning automatiskt. Nu sitter säljarna på closing.
              </p>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
