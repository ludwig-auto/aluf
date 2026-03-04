"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TrendingUp } from "lucide-react";
import { motion, useReducedMotion, useInView } from "framer-motion";

// ─── BigNumber120k ─────────────────────────────────────────────────────────────
// Phase 1 (0–0.4s): noise — random digits every 40ms
// Phase 2 (0.4–0.8s): digits lock right→left with vibration
// Phase 3: glow burst + 4s pulse loop
const FINAL_CHARS = ["1", "2", "0", "k"];
const NOISE_POOL = "0123456789";

function BigNumber120k({
  triggered,
  reduced,
}: {
  triggered: boolean;
  reduced: boolean;
}) {
  const [chars, setChars] = useState<string[]>(() =>
    FINAL_CHARS.map(() => "0")
  );
  const [locked, setLocked] = useState<boolean[]>([false, false, false, false]);
  const [vibIndex, setVibIndex] = useState<number | null>(null);
  const [glowing, setGlowing] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!triggered) return;

    if (reduced) {
      setChars([...FINAL_CHARS]);
      setLocked([true, true, true, true]);
      setGlowing(true);
      return;
    }

    if (hasRun.current) return;
    hasRun.current = true;

    // mutable lock map for use inside setInterval closure
    const lockedState = [false, false, false, false];

    // Phase 1: noise every 40ms
    const noiseId = setInterval(() => {
      setChars((prev) =>
        prev.map((c, i) =>
          lockedState[i]
            ? c
            : NOISE_POOL[Math.floor(Math.random() * NOISE_POOL.length)]
        )
      );
    }, 40);

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 2: lock digits right→left starting at 400ms
    for (let i = FINAL_CHARS.length - 1; i >= 0; i--) {
      const delay = 400 + (FINAL_CHARS.length - 1 - i) * 100;
      const idx = i;
      timers.push(
        setTimeout(() => {
          lockedState[idx] = true;
          setVibIndex(idx);
          setChars((prev) => {
            const next = [...prev];
            next[idx] = FINAL_CHARS[idx];
            return next;
          });
          setLocked((prev) => {
            const next = [...prev];
            next[idx] = true;
            return next;
          });

          // Clear vibration after 120ms
          timers.push(
            setTimeout(
              () => setVibIndex((v) => (v === idx ? null : v)),
              120
            )
          );

          // Glow when leftmost digit locks
          if (idx === 0) {
            timers.push(setTimeout(() => setGlowing(true), 200));
          }
        }, delay)
      );
    }

    // Stop noise after lock-in phase ends
    timers.push(setTimeout(() => clearInterval(noiseId), 820));

    return () => {
      clearInterval(noiseId);
      timers.forEach(clearTimeout);
    };
  }, [triggered, reduced]);

  return (
    <div style={{ opacity: triggered ? 1 : 0, transition: "opacity 0.2s" }}>
      <motion.p
        className="relative text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.5rem] font-light tracking-[-0.06em] text-white leading-none select-none"
        animate={
          glowing
            ? {
                filter: [
                  "drop-shadow(0 0 24px rgba(139,92,246,0.8)) drop-shadow(0 0 48px rgba(139,92,246,0.4))",
                  "drop-shadow(0 0 8px rgba(139,92,246,0.2))",
                  "drop-shadow(0 0 24px rgba(139,92,246,0.8)) drop-shadow(0 0 48px rgba(139,92,246,0.4))",
                ],
              }
            : { filter: "drop-shadow(0 0 0px transparent)" }
        }
        transition={
          glowing
            ? { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
            : { duration: 0.3 }
        }
      >
        {chars.map((ch, i) => (
          <motion.span
            key={i}
            animate={vibIndex === i ? { x: [-2, 2, -1, 1, 0] } : { x: 0 }}
            transition={{ duration: 0.1, ease: "linear" as const }}
            style={{
              display: "inline-block",
              color: locked[i] ? "white" : "rgba(255,255,255,0.3)",
            }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
}

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
      className="px-4 py-5 rounded-xl border flex flex-col"
      initial={reduced ? undefined : { opacity: 0, y: 16 }}
      animate={triggered ? { opacity: 1, y: 0 } : undefined}
      transition={{
        opacity: { duration: 0.5, delay: reduced ? 0 : staggerDelay },
        y: { duration: 0.5, ease: "easeOut" as const, delay: reduced ? 0 : staggerDelay },
      }}
      style={{
        backgroundColor: pulsing
          ? "rgba(139,92,246,0.05)"
          : "rgba(255,255,255,0.03)",
        borderColor: done
          ? "rgba(139,92,246,0.4)"
          : "rgba(255,255,255,0.07)",
        transition: "background-color 0.3s, border-color 0.4s",
      }}
    >
      <dt className="text-[10px] text-violet-400/80 uppercase tracking-[0.12em] font-semibold order-2">
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
  { day: "Dag 1",  label: "System live"  },
  { day: "Dag 5",  label: "Första leads" },
  { day: "Dag 14", label: "120k ROI",    accent: true },
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
      className="pt-12 pb-20 md:pt-16 md:pb-24 bg-[#040407] relative overflow-hidden"
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

      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 relative">

        {/* ─── Header row: logo left, sprint label right ──────────── */}
        <motion.div
          className="flex items-end justify-between gap-6 mb-8 md:mb-16"
          {...fadeUp()}
        >
          <div className="flex flex-col gap-2.5">
            <span className="text-[9px] font-semibold tracking-[0.4em] text-violet-400/50 uppercase">
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
            <p className="text-[11px] text-white/30 font-light tracking-wide">
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
                <BigNumber120k triggered={hasTriggered} reduced={reduced} />
                <DataStream triggered={hasTriggered} reduced={reduced} />
              </div>
              <motion.div className="flex items-center gap-2.5 mt-3" {...fadeUp(0.1)}>
                <TrendingUp className="w-5 h-5 text-violet-400 shrink-0" />
                <p className="text-base md:text-xl font-light tracking-tight text-white/55">
                  i direkt ROI.{" "}
                  <span className="text-white/90">På 14 dagar.</span>
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

          {/* RIGHT: Timeline + Story — vertical separator on lg */}
          <div className="mt-14 lg:mt-0 lg:pl-14 xl:pl-20 lg:border-l lg:border-white/[0.05]">

            {/* Timeline */}
            <motion.div className="mb-10 md:mb-14" {...fadeUp(0.15)}>
              <p className="text-[9px] font-semibold tracking-[0.35em] text-white/20 uppercase mb-3">
                14-dagars sprint
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
                        <div className="relative flex items-center justify-center w-3 h-3">
                          {/* Soft glow */}
                          <div className="absolute w-6 h-6 bg-violet-500/30 blur-[8px] rounded-full" />
                          {/* Pulsing ring */}
                          {hasTriggered && !reduced && (
                            <motion.div
                              className="absolute w-3 h-3 rounded-full bg-violet-400/40"
                              animate={{ scale: [1, 2.6, 1], opacity: [0.5, 0, 0.5] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1.7,
                              }}
                            />
                          )}
                          <div className="w-3 h-3 rounded-full bg-violet-400 relative z-10" />
                        </div>
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-white/25 bg-transparent" />
                      )}

                      {/* Labels */}
                      <div className="flex flex-col items-center gap-1 text-center">
                        <span className="text-[9px] font-semibold tracking-[0.15em] text-white/30 uppercase">
                          {m.day}
                        </span>
                        <span
                          className={`text-[11px] ${
                            m.accent
                              ? "font-medium text-white"
                              : "font-light text-white/75"
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

            {/* Story + tag */}
            <motion.div {...fadeUp(0.25)}>
              <h3 className="text-[1.1rem] md:text-[1.25rem] font-semibold text-white mb-3 leading-snug tracking-tight">
                Från 0 till 15 möten i månaden. På 14 dagar.
              </h3>
              <p className="text-sm md:text-[15px] text-white/50 font-light leading-relaxed max-w-[400px]">
                Swedish Colds säljare lade sin tid på att boka möten, inte på att
                stänga dem. Jag byggde ett AI-emailsystem som sköter prospektering
                och uppföljning automatiskt. Nu sitter säljarna på closing.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <p className="text-[9px] font-semibold tracking-[0.35em] text-white/20 uppercase">
                  Tekniker
                </p>
                <span className="inline-block px-3 py-2 text-[10px] font-medium text-white/40 bg-white/[0.025] border border-white/[0.07] rounded-lg tracking-widest uppercase w-fit whitespace-nowrap">
                  Outreach-system
                </span>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
