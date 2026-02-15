"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Snowflake } from "lucide-react";

function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  startAnimation,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  startAnimation: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [startAnimation, target, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString("sv-SE")}
      {suffix}
    </span>
  );
}

export default function FeaturedCase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-24 bg-white" id="case">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl"
        >
          {/* Gradient background - matching the premium card style */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-700" />

          {/* Dithered overlay for texture */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px)
              `,
            }}
          />

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative grid md:grid-cols-2 gap-12 items-center p-8 md:p-12 lg:p-16">
            {/* Left: Hero number & stats */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <div className="w-7 h-7 rounded-lg bg-white/90 flex items-center justify-center">
                  <Snowflake className="w-4 h-4 text-emerald-700" />
                </div>
                <span className="text-sm font-semibold tracking-[0.12em] text-white uppercase">
                  Swedish Cold
                </span>
              </div>

              {/* MASSIVE hero number */}
              <div className="mb-8">
                <h2 className="text-7xl sm:text-8xl lg:text-9xl font-light tracking-[-0.04em] text-white leading-[0.9] mb-3">
                  <span className="font-serif italic">
                    <AnimatedNumber
                      target={120}
                      suffix="k"
                      startAnimation={isInView}
                    />
                  </span>
                </h2>
                <p className="text-2xl md:text-3xl text-white/90 font-light tracking-tight">
                  SEK på två veckor
                </p>
              </div>

              {/* Stats - award certificate style */}
              <div className="grid grid-cols-3 gap-4">
                <div className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl md:text-4xl font-light tracking-tight text-white">
                    <AnimatedNumber
                      target={500}
                      suffix="k+"
                      startAnimation={isInView}
                    />
                  </div>
                  <p className="text-[10px] text-white/70 mt-1.5 uppercase tracking-[0.12em] font-medium">
                    Pipeline
                  </p>
                </div>
                <div className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl md:text-4xl font-light tracking-tight text-white">
                    15–20
                  </div>
                  <p className="text-[10px] text-white/70 mt-1.5 uppercase tracking-[0.12em] font-medium">
                    Möten/mån
                  </p>
                </div>
                <div className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl md:text-4xl font-light tracking-tight text-white">
                    14
                  </div>
                  <p className="text-[10px] text-white/70 mt-1.5 uppercase tracking-[0.12em] font-medium">
                    Dagar
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Story */}
            <div>
              <p className="text-lg text-white/90 font-light leading-relaxed mb-8">
                Swedish Cold behövde ett outreach-system som faktiskt fungerade.
                Vi byggde en AI-driven lösning som identifierar rätt
                beslutsfattare, når ut personligt och bokar möten automatiskt.
                <span className="text-white font-normal block mt-4">
                  Resultatet? 120k i stängda affärer efter bara 14 dagar.
                </span>
              </p>

              {/* Refined tags */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Outreach-system",
                  "AI-personalisering",
                  "CRM-integration",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-xs font-semibold text-white bg-white/15 backdrop-blur-sm rounded-full border border-white/25 tracking-wide uppercase"
                  >
                    {tag}
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
