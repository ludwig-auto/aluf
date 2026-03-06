"use client";

import { useRef, useState, useEffect } from "react";
import {
  Clock, BarChart2, Building2, AlertTriangle,
  Zap, Target, User, Shield,
  ChevronLeft, ChevronRight, Check, X,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";

// ─── Card data ─────────────────────────────────────────────────────────────────

const byranCards = [
  {
    Icon: Clock,
    badge: "Långsamt",
    title: "Resultat efter 6–12 månader",
    body: "Efter discovery, workshops och 40 slides tar det ett halvår innan något faktiskt händer.",
  },
  {
    Icon: BarChart2,
    badge: "Vagt",
    title: "Vi mäter i features och leveranser",
    body: "Framgång definieras av antal slides, möten och milstolpar – inte din faktiska avkastning.",
  },
  {
    Icon: Building2,
    badge: "Distans",
    title: "Junior konsulter, senior pitchers",
    body: "Den som säljer in jobbet är inte den som utför det. Du vet aldrig vem du pratar med.",
  },
  {
    Icon: AlertTriangle,
    badge: "Risk",
    title: "GDPR-osäkra serverplaceringar",
    body: "Data kan hamna utanför EU utan att du ens vet om det.",
  },
];

const ludwigCards = [
  {
    Icon: Zap,
    badge: "Snabbt",
    title: "Resultat på 4–6 veckor, inte ett halvår",
    body: "Swedish Cold såg ROI dag 14. Mätbara resultat snabbt – inte efter slides och piloter.",
  },
  {
    Icon: Target,
    badge: "ROI",
    title: "Jag mäter i kronor och tid",
    body: "ROI från dag ett. Inte i features, inte i slides. I faktisk avkastning som syns i kassan.",
  },
  {
    Icon: User,
    badge: "Direkt",
    title: "Du jobbar alltid direkt med Ludwig",
    body: "Inget mellanlager. Du har mitt nummer och jag svarar. Du vet exakt vem som gör jobbet.",
  },
  {
    Icon: Shield,
    badge: "Trygg",
    title: "GDPR utan krångel",
    body: "EU-baserade dataservrar. Full transparens i hur din data hanteras. Inga kompromisser.",
  },
];

// ─── Card grid ─────────────────────────────────────────────────────────────────

function CompCard({
  Icon, badge, title, body, isLudwig,
}: {
  Icon: LucideIcon; badge: string; title: string; body: string; isLudwig: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const spotColor = isLudwig ? "rgba(139,92,246,0.25)" : "rgba(239,68,68,0.2)";

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={cardRef}
      className="relative rounded-xl border p-3 sm:p-5 flex flex-col gap-2 sm:gap-3 min-h-[130px] sm:min-h-[180px] overflow-hidden"
      style={{
        background: isLudwig ? "#0c0818" : "#130a0a",
        borderColor: isLudwig ? "rgba(139,92,246,0.22)" : "rgba(239,68,68,0.22)",
      }}
      onMouseMove={onMove}
      onMouseEnter={(e) => { onMove(e); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(180px circle at ${cursor.x}px ${cursor.y}px, ${spotColor}, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-2">
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 border"
          style={{
            background: isLudwig ? "rgba(139,92,246,0.08)" : "rgba(239,68,68,0.08)",
            borderColor: isLudwig ? "rgba(139,92,246,0.2)" : "rgba(239,68,68,0.2)",
          }}
        >
          <Icon
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            style={{ color: isLudwig ? "rgb(167,139,250)" : "rgb(248,113,113)" }}
          />
        </div>
        <span
          className="hidden sm:inline-flex items-center gap-1 text-[9px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-full border shrink-0"
          style={{
            background: isLudwig ? "rgba(139,92,246,0.08)" : "rgba(239,68,68,0.08)",
            borderColor: isLudwig ? "rgba(139,92,246,0.2)" : "rgba(239,68,68,0.2)",
            color: isLudwig ? "rgb(167,139,250)" : "rgb(248,113,113)",
          }}
        >
          {isLudwig ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
          {badge}
        </span>
      </div>
      <div className="relative z-10">
        <p className="text-white/85 font-medium text-[11px] sm:text-[13px] leading-snug sm:mb-1.5">{title}</p>
        <p className="hidden sm:block text-white/55 text-xs font-light leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function CardGrid({ cards, variant }: { cards: typeof byranCards; variant: "byran" | "ludwig" }) {
  const isLudwig = variant === "ludwig";
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      {cards.map((card) => (
        <CompCard key={card.title} {...card} isLudwig={isLudwig} />
      ))}
    </div>
  );
}

// ─── WhyUs (Comparison Slider) ────────────────────────────────────────────────

export default function WhyUs() {
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();

  // Auto-hint: briefly nudge left then back to center
  useEffect(() => {
    if (reduced || interacted) return;

    let frame: number;
    let startTs: number | null = null;
    const delay = 1400;
    const phase = 700; // ms per direction

    function tick(now: number) {
      if (interacted) return;
      if (startTs === null) startTs = now;
      const elapsed = now - startTs;

      if (elapsed < delay) { frame = requestAnimationFrame(tick); return; }

      const t = elapsed - delay;
      let newPct: number;
      if (t < phase) {
        newPct = 50 - 22 * (t / phase); // 50 → 28
      } else if (t < phase * 2) {
        newPct = 28 + 22 * ((t - phase) / phase); // 28 → 50
      } else {
        setPct(50);
        return;
      }
      setPct(newPct);
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, interacted]);

  // Drag mechanics
  useEffect(() => {
    if (!dragging) return;

    function getNewPct(clientX: number) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPct(Math.max(2, Math.min(98, (clientX - rect.left) / rect.width * 100)));
    }

    function onMouseMove(e: MouseEvent) { getNewPct(e.clientX); }
    function onTouchMove(e: TouchEvent) { e.preventDefault(); getNewPct(e.touches[0].clientX); }
    function stop() { setDragging(false); }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stop);
    };
  }, [dragging]);

  function startDrag(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    setDragging(true);
    setInteracted(true);
  }

  return (
    <section id="why-us" className="py-16 md:py-24 bg-black" aria-labelledby="why-us-heading">
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-10 md:mb-14 max-w-3xl">
          <p className="text-[11px] font-medium tracking-[0.2em] text-violet-400/80 uppercase mb-4">
            Jämförelse
          </p>
          <h2 id="why-us-heading" className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-[-0.03em] text-white">
            Varför bolag väljer mig framför{" "}
            <span
              className="text-gradient-purple"
              style={{ filter: "drop-shadow(0 0 10px rgba(139,92,246,0.5)) drop-shadow(0 0 24px rgba(139,92,246,0.2))" }}
            >
              byrån med 40 slides
            </span>
          </h2>
        </div>

        {/* Side labels */}
        <div className="flex justify-between items-center mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="text-[11px] font-medium tracking-[0.12em] text-red-400/70 uppercase">Byrån</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium tracking-[0.12em] text-violet-400/70 uppercase">Ludwig</span>
            <span className="w-2 h-2 rounded-full bg-violet-500/80" />
          </div>
        </div>

        {/* Comparison container */}
        <div
          ref={containerRef}
          className="relative select-none rounded-2xl overflow-hidden cursor-ew-resize"
          style={{ background: "#0a0a0a" }}
          onTouchStart={() => setInteracted(true)}
        >
          {/* Base layer: Byrån (visible on right side only) */}
          <div
            className="pointer-events-none"
            style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
          >
            <CardGrid cards={byranCards} variant="byran" />
          </div>

          {/* Ludwig overlay: visible on left side */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          >
            <CardGrid cards={ludwigCards} variant="ludwig" />
          </div>

          {/* Glow divider line */}
          <div
            className="absolute top-0 bottom-0 w-px pointer-events-none z-10"
            style={{
              left: `${pct}%`,
              background: "linear-gradient(to bottom, transparent 0%, rgba(139,92,246,0.9) 15%, rgba(139,92,246,1) 50%, rgba(139,92,246,0.9) 85%, transparent 100%)",
              boxShadow: "0 0 12px rgba(139,92,246,0.6), 0 0 30px rgba(139,92,246,0.2)",
            }}
          />

          {/* Drag handle */}
          <div
            className="absolute top-1/2 z-20 -translate-y-1/2 -translate-x-1/2 cursor-ew-resize"
            style={{ left: `${pct}%` }}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shadow-[0_0_24px_rgba(139,92,246,0.7)]"
              style={{
                background: "linear-gradient(135deg, #1a0a2e, #0d0620)",
                border: "2px solid rgba(139,92,246,0.8)",
              }}
            >
              <ChevronLeft className="w-3 h-3 text-violet-400 -mr-0.5" />
              <ChevronRight className="w-3 h-3 text-violet-400 -ml-0.5" />
            </div>
          </div>
        </div>

        {/* Range input fallback */}
        <div className="mt-5 px-1">
          <input
            type="range"
            min={2}
            max={98}
            value={Math.round(pct)}
            onChange={(e) => { setPct(Number(e.target.value)); setInteracted(true); }}
            aria-label="Jämförelsereglage — dra åt vänster för byrån, höger för Ludwig"
            className="w-full h-1.5 appearance-none rounded-full outline-none cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            style={{
              background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${pct}%, #7c3aed ${pct}%, #a855f7 100%)`,
            }}
          />
          <style>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #a855f7;
              border: 2px solid rgba(139,92,246,0.6);
              cursor: ew-resize;
              box-shadow: 0 0 10px rgba(139,92,246,0.5);
            }
            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #a855f7;
              border: 2px solid rgba(139,92,246,0.6);
              cursor: ew-resize;
              box-shadow: 0 0 10px rgba(139,92,246,0.5);
            }
          `}</style>
        </div>

      </div>
    </section>
  );
}
