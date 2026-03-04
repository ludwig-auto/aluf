"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { CALENDLY_URL } from "@/lib/constants";

const NeuralBackground = dynamic(
  () => import("../NeuralBackground").then((m) => ({ default: m.NeuralBackground })),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black" />,
  }
);

class BackgroundErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <div className="absolute inset-0 bg-black" />;
    }
    return this.props.children;
  }
}

gsap.registerPlugin(SplitText, useGSAP);

// ─── MobileProofCard ─────────────────────────────────────────────────────────

function MobileProofCard() {
  return (
    <div
      className="lg:hidden w-full"
      aria-hidden="true"
    >
      <div
        style={{
          background: "rgba(10,8,20,0.85)",
          border: "1px solid rgba(139,92,246,0.18)",
          borderRadius: 16,
          padding: "16px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow:
            "0 0 0 1px rgba(139,92,246,0.06), 0 8px 32px rgba(0,0,0,0.5), 0 0 48px rgba(139,92,246,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle violet glow in corner */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(139,92,246,0.12)",
            filter: "blur(32px)",
            pointerEvents: "none",
          }}
        />

        {/* Client logo */}
        <div style={{ marginBottom: 14 }}>
          <Image
            src="/logos/swedish-cold.png"
            alt="Swedish Cold"
            width={120}
            height={24}
            style={{ height: "auto", width: "auto", filter: "brightness(0) invert()" }}
            priority={false}
          />
        </div>

        {/* Two key stats */}
        <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
          {/* Stat 1 */}
          <div style={{ flex: 1, paddingRight: 16 }}>
            <p
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                marginBottom: 4,
              }}
            >
              120 000 kr
            </p>
            <p
              style={{
                fontSize: 11,
                color: "rgba(167,139,250,0.7)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Direkt ROI
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 1,
              background: "rgba(255,255,255,0.06)",
              flexShrink: 0,
              marginRight: 16,
            }}
          />

          {/* Stat 2 */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                marginBottom: 4,
              }}
            >
              14 dagar
            </p>
            <p
              style={{
                fontSize: 11,
                color: "rgba(167,139,250,0.7)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Till resultat
            </p>
          </div>
        </div>

        {/* Progress bar — "automation run" */}
        <div style={{ marginTop: 18 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontSize: 9,
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
              }}
            >
              Automation run
            </span>
            <span
              style={{
                fontSize: 9,
                color: "rgba(139,92,246,0.7)",
                fontFamily: "monospace",
              }}
            >
              92%
            </span>
          </div>
          <div
            style={{
              height: 4,
              borderRadius: 2,
              background: "rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "92%",
                borderRadius: 2,
                background:
                  "linear-gradient(90deg, rgba(109,40,217,0.9), rgba(167,139,250,1))",
                boxShadow: "0 0 8px rgba(139,92,246,0.6)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const badgeItem1Ref = useRef<HTMLLIElement | null>(null);
  const badgeItem2Ref = useRef<HTMLLIElement | null>(null);
  const badgeItem3Ref = useRef<HTMLLIElement | null>(null);
  const badgeItem4Ref = useRef<HTMLLIElement | null>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      let cancelled = false;
      let split: SplitText | null = null;

      document.fonts.ready.then(() => {
        if (cancelled) return;

        try {
          split = new SplitText(headerRef.current!, {
            type: "lines",
            wordsClass: "lines",
          });

          gsap.set(split.lines, {
            filter: "blur(16px)",
            yPercent: 30,
            opacity: 0,
            scale: 1.06,
            transformOrigin: "50% 100%",
          });
        } catch {
          // SplitText unavailable — fall back to simple fade-in on heading
          if (headerRef.current) gsap.set(headerRef.current, { opacity: 0, y: 8 });
        }

        if (paraRef.current) gsap.set(paraRef.current, { opacity: 0, y: 8 });
        if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0, y: 8 });
        if (linkRef.current) gsap.set(linkRef.current, { opacity: 0, y: 6 });

        const badgeItems = [badgeItem1Ref.current, badgeItem2Ref.current, badgeItem3Ref.current, badgeItem4Ref.current].filter(Boolean);
        if (badgeItems.length > 0) gsap.set(badgeItems, { opacity: 0, y: 6 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (split && split.lines.length > 0) {
          tl.to(
            split.lines,
            {
              filter: "blur(0px)",
              yPercent: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              stagger: 0.15,
            },
            0.1
          );
        } else if (headerRef.current) {
          tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.1);
        }

        if (paraRef.current) tl.to(paraRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.55");
        if (ctaRef.current) tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.35");
        if (linkRef.current) tl.to(linkRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
        if (badgeItems.length > 0) tl.to(badgeItems, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.25");
      });

      return () => {
        cancelled = true;
        if (split) split.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      id="hero"
      style={{
        background: "radial-gradient(ellipse 120% 70% at 50% 0%, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)",
      }}
    >
      <BackgroundErrorBoundary>
        <NeuralBackground />
      </BackgroundErrorBoundary>

      <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-20 sm:pt-28 md:pt-36 md:pb-28 md:px-10 lg:px-8">

        {/* ── Content column — natural HTML order, no CSS reordering ── */}
        <div className="flex flex-col items-start lg:items-center gap-6 lg:gap-8">

          {/* 1. Heading */}
          <h1
            ref={headerRef}
            className="text-left lg:text-center text-[38px] sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-extralight leading-[1.2] lg:leading-[1.08] tracking-tight text-white max-w-3xl"
          >
            Mindre manuellt arbete. Fler affärer. På plats på 4 veckor.
          </h1>

          {/* 2. Subtext */}
          <p
            ref={paraRef}
            className="text-[15px] lg:text-base text-left lg:text-center font-light leading-[1.6] lg:leading-relaxed tracking-tight text-white/[0.65] lg:text-white/60 max-w-full lg:max-w-lg"
          >
            <span>Jag bygger AI-chattbotar, emailsystem, interna automationer och skräddarsydda appar för bolag som vill växa utan att anställa fler.</span>
            <span className="hidden lg:inline"> Swedish Cold fick 120k SEK i direkt ROI på 14 dagar.</span>
          </p>

          {/* 3. CTA button */}
          <div ref={ctaRef} className="w-full lg:w-auto flex items-stretch lg:items-center gap-3">
            <GlassButton
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="w-full lg:w-auto justify-center text-[15px] lg:text-sm py-3 px-6"
              contentClassName="gap-2"
            >
              Se vad som stjäl er tid
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-active:translate-x-1.5" />
            </GlassButton>
          </div>

          {/* 4. Swedish Cold link */}
          <a
            ref={linkRef}
            href="#case"
            className="block w-full text-center lg:w-auto lg:text-left text-[14px] lg:text-sm font-light text-white/65 hover:text-violet-400 transition-colors"
          >
            Se hur jag gjorde det för Swedish Cold →
          </a>

          {/* 5. Trust badges — scrollable on mobile, centered on desktop */}
          <ul
            className="flex flex-nowrap lg:flex-wrap lg:justify-center overflow-x-auto gap-2 lg:gap-3 text-xs font-extralight tracking-tight text-white/60 w-full pb-1 [&::-webkit-scrollbar]:hidden"
          >
            <li ref={badgeItem1Ref} className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-[10px] py-[6px] whitespace-nowrap backdrop-blur-sm">
              <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-violet-400" /> Leverans på 4–6 veckor
            </li>
            <li ref={badgeItem2Ref} className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-[10px] py-[6px] whitespace-nowrap backdrop-blur-sm">
              <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-violet-400" /> GDPR-compliant
            </li>
            <li ref={badgeItem3Ref} className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-[10px] py-[6px] whitespace-nowrap backdrop-blur-sm">
              <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-violet-400" /> EU-baserade dataservrar
            </li>
            <li ref={badgeItem4Ref} className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-[10px] py-[6px] whitespace-nowrap backdrop-blur-sm">
              <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-violet-400" /> Stockholm-baserad
            </li>
          </ul>

          {/* 6. Social proof card — mobile/tablet only */}
          <MobileProofCard />

        </div>

      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
    </section>
  );
}
