"use client";

import { motion } from "framer-motion";
import { Snowflake, Heart, TrendingUp } from "lucide-react";

const logos = [
  { name: "Swedish Cold", Icon: Snowflake },
  { name: "Leia Health", Icon: Heart },
  { name: "Extend Marketing AB", Icon: TrendingUp },
];

export default function TrustedBy() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-12"
        >
          Företag som litar på oss
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-20">
          {logos.map(({ name, Icon }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group flex items-center gap-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
            >
              <Icon className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
              <span className="text-lg font-light tracking-tight text-gray-400 group-hover:text-gray-900 transition-colors">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
