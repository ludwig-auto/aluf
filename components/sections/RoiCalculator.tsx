"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";

// ─── Animated number hook ──────────────────────────────────────────────────────

function useCountUp(target: number, duration = 600) {
  const [displayed, setDisplayed] = useState(target);
  const prevRef = useRef(target);
  const frameRef = useRef(0);

  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = target;
    if (from === target) return;

    cancelAnimationFrame(frameRef.current);
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(from + (target - from) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return displayed;
}

function formatSEK(n: number) {
  return n.toLocaleString("sv-SE") + " kr";
}

// ─── Slider ────────────────────────────────────────────────────────────────────

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <label className="text-sm text-white/60 font-light">{label}</label>
        <span className="text-lg font-semibold text-white tabular-nums">
          {value.toLocaleString("sv-SE")}{unit ? <span className="text-sm font-light text-white/50 ml-1">{unit}</span> : null}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="roi-slider w-full h-1.5 appearance-none rounded-full outline-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
        style={{
          background: `linear-gradient(to right, #7c3aed 0%, #a855f7 ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)`,
        }}
      />
      <div className="flex justify-between text-[10px] text-white/40 font-light">
        <span>{min.toLocaleString("sv-SE")}{unit}</span>
        <span>{max.toLocaleString("sv-SE")}{unit}</span>
      </div>
    </div>
  );
}

// ─── Stat item ─────────────────────────────────────────────────────────────────

function StatItem({ label, value, prefix, highlight = false }: { label: string; value: string; prefix?: string; highlight?: boolean }) {
  return (
    <div className={`flex flex-col gap-1.5 p-5 rounded-xl border ${highlight
      ? "bg-violet-500/[0.08] border-violet-500/25"
      : "bg-white/[0.03] border-white/[0.06]"
    }`}>
      <p className="text-[10px] font-semibold tracking-[0.12em] text-white/40 uppercase">{label}</p>
      {prefix && (
        <p className={`text-[11px] font-light ${highlight ? "text-violet-400/60" : "text-white/40"}`}>{prefix}</p>
      )}
      <p className={`text-lg font-semibold tracking-tight leading-tight ${highlight ? "text-violet-300" : "text-white/80"}`}>
        {value}
      </p>
    </div>
  );
}

// ─── RoiCalculator ─────────────────────────────────────────────────────────────

export default function RoiCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [employees, setEmployees] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(450);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const totalHoursPerWeek = hoursPerWeek * employees;
  const totalHoursPerYear = totalHoursPerWeek * 52;
  const costPerYear = totalHoursPerYear * hourlyRate;
  const potentialSaving = Math.round(costPerYear * 0.7);

  const displayedCost = useCountUp(costPerYear);
  const displayedSaving = useCountUp(potentialSaving);
  const displayedHoursYear = useCountUp(totalHoursPerYear);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    const webhookUrl = process.env.NEXT_PUBLIC_ROI_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            hoursPerWeek,
            employees,
            hourlyRate,
            costPerYear,
            potentialSaving,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error("Failed to send ROI data:", error);
      }
    }

    // Simulate async
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <section id="roi" className="py-16 md:py-24 bg-[#040407]">
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-10 md:mb-14 max-w-3xl">
          <p className="text-[11px] font-medium tracking-[0.2em] text-violet-400/80 uppercase mb-4">
            Kalkylator
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-[-0.03em] text-white mb-3">
            Vad kostar manuellt arbete{" "}
            <span className="text-gradient-purple">ditt bolag just nu?</span>
          </h2>
          <p className="text-sm text-white/45 font-light leading-relaxed max-w-xl">
            Flytta reglagen och se vad ni förlorar varje år på repetitivt arbete som kan automatiseras.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start">

          {/* Left: Sliders */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-8 flex flex-col gap-8">
            <Slider
              label="Hur många timmar per vecka spenderar en anställd på admin och repetitivt arbete?"
              value={hoursPerWeek}
              min={1}
              max={20}
              unit=" h/v"
              onChange={setHoursPerWeek}
            />
            <Slider
              label="Hur många anställda spenderar ungefär så här mycket tid på detta?"
              value={employees}
              min={1}
              max={50}
              unit=" pers"
              onChange={setEmployees}
            />
            <Slider
              label="Genomsnittlig timlön (inkl. sociala avgifter) per anställd"
              value={hourlyRate}
              min={200}
              max={1000}
              step={50}
              unit=" kr/h"
              onChange={setHourlyRate}
            />
          </div>

          {/* Right: Results + Email */}
          <div className="flex flex-col gap-4">

            {/* Result card */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
              <p className="text-[10px] font-semibold tracking-[0.15em] text-white/30 uppercase mb-4">
                Din förlust just nu
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <StatItem
                  label="Timmar/vecka"
                  value={totalHoursPerWeek.toLocaleString("sv-SE") + " h"}
                />
                <StatItem
                  label="Timmar/år"
                  value={displayedHoursYear.toLocaleString("sv-SE") + " h"}
                />
                <StatItem
                  label="Kostnad/år"
                  value={formatSEK(displayedCost)}
                />
                <StatItem
                  label="Möjlig besparing"
                  prefix="Upp till"
                  value={formatSEK(displayedSaving)}
                  highlight
                />
              </div>
              <p className="text-[11px] text-white/30 font-light leading-relaxed">
                Möjlig besparing = 70% av kostnaden, eftersom automation sällan täcker 100% av arbetsflödet.
              </p>
            </div>

            {/* Email capture */}
            <div
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(109,40,217,0.15) 0%, rgba(76,29,149,0.08) 100%)",
                border: "1px solid rgba(139,92,246,0.25)",
                boxShadow: "0 0 40px rgba(139,92,246,0.08)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: "radial-gradient(circle at top right, rgba(139,92,246,0.15), transparent 70%)" }}
              />

              {submitted ? (
                <div className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-violet-400" />
                  </div>
                  <p className="text-sm text-white/80 font-light">
                    Tack! Jag hör av mig inom 24 timmar.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium text-white/90 mb-1 relative z-10">
                    Få en gratis genomgång av vad som kan automatiseras hos er
                  </p>
                  <p className="text-xs text-white/40 font-light mb-4 relative z-10">
                    Jag skickar en personlig analys baserad på dina siffror.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative z-10">
                    <input
                      type="email"
                      required
                      placeholder="din@email.se"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg px-4 py-3 text-sm text-white/90 placeholder-white/30 outline-none border transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium tracking-tight text-white bg-primary-glass border border-primary hover:bg-violet-500/30 hover:border-violet-400/60 hover:shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-all duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {submitting ? "Skickar..." : "Skicka min analys"}
                      {!submitting && <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />}
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .roi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #a855f7;
          border: 2px solid rgba(167,139,250,0.5);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(139,92,246,0.5);
        }
        .roi-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #a855f7;
          border: 2px solid rgba(167,139,250,0.5);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(139,92,246,0.5);
        }
      `}</style>
    </section>
  );
}
