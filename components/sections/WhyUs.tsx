"use client";

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

export default function WhyUs() {
  return (
    <section className="py-20 md:py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[-0.03em] text-gray-900 mb-4">
            Varför{" "}
            <span className="font-serif italic text-emerald-700">vi</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {points.map(({ Icon, title, description, featured }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative rounded-2xl transition-all duration-300 ${
                featured
                  ? "overflow-hidden hover:shadow-xl hover:shadow-emerald-200 hover:-translate-y-1"
                  : "bg-white border border-gray-100 hover:shadow-lg hover:shadow-emerald-50 hover:border-emerald-100 hover:-translate-y-0.5"
              }`}
            >
              {featured && (
                <>
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-700" />

                  {/* Dithered overlay */}
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px),
                        repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px)
                      `,
                    }}
                  />
                </>
              )}

              <div className={`relative flex gap-5 p-8 ${featured ? "text-white" : ""}`}>
                <div
                  className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    featured
                      ? "bg-white/10"
                      : "bg-emerald-50 group-hover:bg-emerald-100"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      featured ? "text-white/80" : "text-emerald-600"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`text-lg font-light tracking-tight mb-1 ${
                      featured ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`text-sm font-light leading-relaxed ${
                      featured ? "text-white/80" : "text-gray-500"
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
}
