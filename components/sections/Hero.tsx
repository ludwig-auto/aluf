"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Clock, TrendingUp, Shield } from "lucide-react";
import { WavesBackground } from "@/components/WavesBackground";
import { GlassButton } from "@/components/ui/glass-button";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );

      // Heading - animate each word
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { opacity: 0, y: 30, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.3"
        );
      }

      // Description
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.2"
      );

      // Micro details
      tl.fromTo(
        microRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.1"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = "Automatisera det som tar tid".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Interactive waves background */}
      <WavesBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 lg:px-16 py-24 text-center">
        {/* Badge */}
        <div ref={badgeRef} className="opacity-0 mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm">
          <span className="text-xs font-medium tracking-widest text-emerald-600 uppercase">
            B2B-Automation
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-xs text-gray-600">
            5–15M omsättning
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headingRef}
          className="text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tight leading-[1.05] text-gray-900 mb-8"
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em] opacity-0">
              {word}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="opacity-0 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-12"
        >
          Vi bygger AI-system som sköter outreach, CRM-integration och personalisering.
          <br className="hidden md:block" />{" "}
          <span className="text-gray-900">
            Ni fokuserar på affären. Systemet sköter resten.
          </span>
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="opacity-0 flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <GlassButton
            href="#contact"
            size="lg"
            contentClassName="gap-2"
          >
            Boka strategisamtal
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </GlassButton>
          <GlassButton
            href="#case"
            size="lg"
          >
            Se vårt senaste case
          </GlassButton>
        </div>

        {/* Micro details - pill style */}
        <div
          ref={microRef}
          className="opacity-0 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50/50 backdrop-blur-sm">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-gray-700">Setup på 1–2 veckor</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50/50 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-gray-700">Mätbart ROI</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50/50 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-gray-700">GDPR-compliant</span>
          </span>
        </div>
      </div>
    </section>
  );
}
