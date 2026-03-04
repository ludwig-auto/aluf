"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Zap, Target, Users, Shield } from "lucide-react";

const points = [
  {
    Icon: Zap,
    title: "Snabba som fan",
    description: "4–8 veckor till första resultat. Inte 6 månader.",
    featured: false,
  },
  {
    Icon: Target,
    title: "Konkreta resultat",
    description: "Vi mäter i kronor, inte i slides. ROI från dag ett.",
    featured: false,
  },
  {
    Icon: Users,
    title: "Små team, stora system",
    description: "Ni jobbar med oss — inte med outsourcade juniorresurser.",
    featured: false,
  },
  {
    Icon: Shield,
    title: "GDPR-compliant",
    description: "Svenska dataservrar. Full transparens. Noll kompromisser.",
    featured: true,
  },
];

const WhyUs = memo(function WhyUs() {
  return (
    <section className="py-20 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight text-white mb-4">
            Varför <span className="font-serif italic text-gradient-emerald text-neon-glow">vi</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {points.map(({ Icon, title, description, featured }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative rounded-2xl transition-all duration-300 ${featured
                ? "overflow-hidden hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1"
                : "bg-white/5 border border-white/10 hover:shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-500/40 hover:-translate-y-0.5"
                }`}
            >
              {featured && (
                <div className="absolute inset-0 bg-emerald-500/5 border border-emerald-500/40" />
              )}

              <div className={`relative flex gap-5 p-8 ${featured ? "text-white" : ""}`}>
                <div
                  className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${featured
                    ? "bg-emerald-500/10 border border-emerald-500/20"
                    : "bg-white/5 border border-white/10 group-hover:bg-emerald-500/10"
                    }`}
                >
                  <Icon
                    className={`w-5 h-5 ${featured ? "text-emerald-400" : "text-emerald-500/60"
                      }`}
                  />
                </div>
                <div>
                  <h3
                    className={`text-lg font-light tracking-tight mb-1 ${featured ? "text-white" : "text-white/90"
                      }`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`text-sm font-light leading-relaxed ${featured ? "text-white/80" : "text-white/50"
                      }`}
                  >
                    {description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default WhyUs;
