"use client";

import { useState, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";

const AREAS = [
  "Säljautomatisering & Outreach",
  "Admin & rapportering",
  "CRM-integration",
  "AI-agenter",
  "Skräddarsytt system eller app",
  "Annat",
];

const HOURS_OPTIONS = [
  "Under 5 h/v",
  "5–10 h/v",
  "10–20 h/v",
  "20–40 h/v",
  "Mer än 40 h/v",
];

const BUDGET_OPTIONS = [
  "5 000 – 10 000 kr",
  "10 000 – 20 000 kr",
  "20 000 – 50 000 kr",
  "50 000 – 100 000 kr",
  "+100 000 kr",
];

// ─── Field wrapper ──────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-medium tracking-[0.1em] text-white/45 uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Input with focus glow ──────────────────────────────────────────────────

function GlowInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  const { onFocus, onBlur, ...rest } = props;
  return (
    <input
      {...rest}
      onFocus={(e) => { setFocused(true); onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); onBlur?.(e); }}
      className="w-full rounded-lg px-4 py-3 text-sm text-white/90 placeholder-white/30 outline-none border transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.06)",
        borderColor: focused ? "rgba(139,92,246,0.55)" : "rgba(255,255,255,0.1)",
        boxShadow: focused
          ? "0 0 0 3px rgba(139,92,246,0.10), 0 0 16px rgba(139,92,246,0.08)"
          : "none",
      }}
    />
  );
}

// ─── Toggle chip ────────────────────────────────────────────────────────────

function ToggleChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-light transition-all duration-150 active:scale-95 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
      style={{
        background: selected
          ? "rgba(139,92,246,0.14)"
          : hovered
          ? "rgba(139,92,246,0.06)"
          : "rgba(255,255,255,0.02)",
        borderColor: selected
          ? "rgba(139,92,246,0.45)"
          : hovered
          ? "rgba(139,92,246,0.22)"
          : "rgba(255,255,255,0.07)",
        color: selected
          ? "rgb(196,181,253)"
          : hovered
          ? "rgba(255,255,255,0.7)"
          : "rgba(255,255,255,0.45)",
        boxShadow: selected ? "0 0 12px rgba(139,92,246,0.08)" : "none",
      }}
    >
      <span
        className="transition-all duration-150"
        style={{
          width: selected ? 12 : 0,
          overflow: "hidden",
          display: "inline-flex",
        }}
      >
        <Check className="w-3 h-3 shrink-0" />
      </span>
      {label}
    </button>
  );
}

// ─── ContactForm ────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [areas, setAreas] = useState<string[]>([]);
  const [hours, setHours] = useState("");
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [description, setDescription] = useState("");
  const [descFocused, setDescFocused] = useState(false);
  const [hoveredBudget, setHoveredBudget] = useState("");
  const [submitHovered, setSubmitHovered] = useState(false);

  // Cursor spotlight
  const formRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [formHovered, setFormHovered] = useState(false);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = formRef.current?.getBoundingClientRect();
    if (rect) setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function toggleArea(a: string) {
    setAreas((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  }

  const canSubmit = company && name && email && budget;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);

    const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company,
            name,
            email,
            role,
            areas,
            hours,
            budget,
            description,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error("Failed to send form data:", error);
      }
    }

    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <section className="py-24 md:py-32 min-h-[60vh] flex items-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-14 h-14 rounded-full bg-violet-500/10 border border-violet-500/25 flex items-center justify-center mx-auto mb-6">
            <Check className="w-6 h-6 text-violet-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extralight tracking-[-0.03em] text-white mb-3">
            Tack, {name.split(" ")[0]}!
          </h2>
          <p className="text-sm text-white/45 font-light leading-relaxed max-w-sm mx-auto">
            Jag har tagit emot din förfrågan och återkommer med en personlig
            analys inom 24 timmar.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-violet-600/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto px-6 relative">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] font-medium tracking-[0.2em] text-violet-400/80 uppercase mb-4">
            Kom igång
          </p>
          <h1 className="text-3xl md:text-4xl font-extralight tracking-[-0.03em] text-white mb-3">
            Berätta om{" "}
            <span className="text-gradient-purple">ditt behov</span>
          </h1>
          <p className="text-sm text-white/45 font-light leading-relaxed max-w-lg">
            Fyll i formuläret så återkommer jag med en personlig analys av vad
            som kan automatiseras i ditt bolag — inom 24 timmar.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form card with cursor spotlight */}
          <div
            ref={formRef}
            className="relative rounded-2xl overflow-hidden"
            onMouseMove={onMouseMove}
            onMouseEnter={(e) => { setFormHovered(true); onMouseMove(e); }}
            onMouseLeave={() => setFormHovered(false)}
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              borderColor: formHovered
                ? "rgba(139,92,246,0.22)"
                : "rgba(255,255,255,0.07)",
              boxShadow: formHovered
                ? "0 0 40px rgba(139,92,246,0.07)"
                : "none",
            }}
          >
            {/* Cursor spotlight overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
              style={{
                opacity: formHovered ? 1 : 0,
                background: `radial-gradient(380px circle at ${cursor.x}px ${cursor.y}px, rgba(139,92,246,0.08), rgba(139,92,246,0.02) 50%, transparent 70%)`,
              }}
            />

            {/* All form content above spotlight */}
            <div className="relative z-10 p-6 md:p-8 flex flex-col gap-6">

              {/* Row 1: Company + Name */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Företagsnamn *">
                  <GlowInput
                    type="text"
                    required
                    placeholder="Acme AB"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </Field>
                <Field label="Ditt namn *">
                  <GlowInput
                    type="text"
                    required
                    placeholder="Anna Svensson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field>
              </div>

              {/* Row 2: Email + Role */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="E-post *">
                  <GlowInput
                    type="email"
                    required
                    placeholder="anna@acme.se"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field label="Din roll">
                  <GlowInput
                    type="text"
                    placeholder="VD, Marknadschef..."
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </Field>
              </div>

              <div className="h-px bg-white/[0.05]" />

              {/* Areas */}
              <Field label="Vilka områden behöver ni hjälp med?">
                <div className="flex flex-wrap gap-2 mt-0.5">
                  {AREAS.map((area) => (
                    <ToggleChip
                      key={area}
                      label={area}
                      selected={areas.includes(area)}
                      onClick={() => toggleArea(area)}
                    />
                  ))}
                </div>
              </Field>

              {/* Hours */}
              <Field label="Timmar per vecka på repetitivt arbete">
                <div className="flex flex-wrap gap-2 mt-0.5">
                  {HOURS_OPTIONS.map((opt) => (
                    <ToggleChip
                      key={opt}
                      label={opt}
                      selected={hours === opt}
                      onClick={() => setHours(hours === opt ? "" : opt)}
                    />
                  ))}
                </div>
              </Field>

              {/* Description */}
              <Field label="Beskriv ert behov">
                {(() => {
                  const wordCount = description.trim() === "" ? 0 : description.trim().split(/\s+/).length;
                  const atLimit = wordCount >= 100;
                  return (
                    <div className="relative">
                      <textarea
                        rows={4}
                        placeholder="Berätta kortfattat vad ni fastnar på idag, vilket problem ni vill lösa, eller vad ett lyckat resultat ser ut för er..."
                        value={description}
                        onChange={(e) => {
                          const words = e.target.value.trim() === "" ? [] : e.target.value.trim().split(/\s+/);
                          if (words.length <= 100) setDescription(e.target.value);
                        }}
                        onFocus={() => setDescFocused(true)}
                        onBlur={() => setDescFocused(false)}
                        className="w-full rounded-lg px-4 py-3 text-sm text-white/90 placeholder-white/30 outline-none border transition-all duration-200 resize-none leading-relaxed"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          borderColor: descFocused ? "rgba(139,92,246,0.55)" : "rgba(255,255,255,0.1)",
                          boxShadow: descFocused
                            ? "0 0 0 3px rgba(139,92,246,0.10), 0 0 16px rgba(139,92,246,0.08)"
                            : "none",
                        }}
                      />
                      <span
                        className="absolute bottom-3 right-3 text-[10px] font-light tabular-nums transition-colors duration-150"
                        style={{ color: atLimit ? "rgb(196,181,253)" : "rgba(255,255,255,0.2)" }}
                      >
                        {wordCount}/100
                      </span>
                    </div>
                  );
                })()}
              </Field>

              <div className="h-px bg-white/[0.05]" />

              {/* Budget */}
              <Field label="Budget *">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-0.5">
                  {BUDGET_OPTIONS.map((opt) => {
                    const sel = budget === opt;
                    const hov = hoveredBudget === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setBudget(sel ? "" : opt)}
                        onMouseEnter={() => setHoveredBudget(opt)}
                        onMouseLeave={() => setHoveredBudget("")}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-light transition-all duration-150 active:scale-[0.97] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                        style={{
                          background: sel
                            ? "rgba(139,92,246,0.14)"
                            : hov
                            ? "rgba(139,92,246,0.06)"
                            : "rgba(255,255,255,0.02)",
                          borderColor: sel
                            ? "rgba(139,92,246,0.5)"
                            : hov
                            ? "rgba(139,92,246,0.25)"
                            : "rgba(255,255,255,0.07)",
                          color: sel
                            ? "rgb(196,181,253)"
                            : hov
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(255,255,255,0.45)",
                          boxShadow: sel
                            ? "0 0 20px rgba(139,92,246,0.12)"
                            : "none",
                        }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-150"
                          style={{
                            background: sel
                              ? "rgb(167,139,250)"
                              : hov
                              ? "rgba(139,92,246,0.6)"
                              : "rgba(255,255,255,0.15)",
                            boxShadow: sel
                              ? "0 0 6px rgba(139,92,246,0.8)"
                              : "none",
                          }}
                        />
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </Field>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || !canSubmit}
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-white transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                style={{
                  background: submitting
                    ? "rgba(109,40,217,0.5)"
                    : submitHovered
                    ? "linear-gradient(135deg, #8b47ff, #b966ff)"
                    : "linear-gradient(135deg, #7c3aed, #a855f7)",
                  boxShadow: submitting
                    ? "none"
                    : submitHovered
                    ? "0 0 36px rgba(139,92,246,0.5)"
                    : "0 0 24px rgba(139,92,246,0.3)",
                }}
              >
                {submitting ? "Skickar..." : "Skicka förfrågan"}
                {!submitting && <ArrowRight className="w-4 h-4 shrink-0" />}
              </button>

              <p className="text-[11px] text-white/25 font-light text-center -mt-2">
                * Obligatoriska fält. Jag svarar inom 24 timmar. Ingen spam.
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
