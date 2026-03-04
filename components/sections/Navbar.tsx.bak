"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";

const links = [
  { label: "Lösningar", href: "#solutions" },
  { label: "Case", href: "#case" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${scrolled ? "shadow-lg shadow-black/5" : ""}
      `}
      style={{
        background: scrolled
          ? "rgba(255, 255, 255, 0.7)"
          : "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 0, 0, 0.06)"
          : "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 group">
            <span className="text-xl font-semibold tracking-tight text-gray-900">
              Automations
              <span className="text-emerald-600">Ludwig</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="
                  px-4 py-2 rounded-lg
                  text-sm font-medium text-gray-700
                  hover:bg-black/5 hover:text-gray-900
                  transition-all duration-200
                "
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button - Glass */}
          <GlassButton
            href="#contact"
            size="sm"
            className="hidden md:inline-flex"
          >
            Kontakt
          </GlassButton>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors"
            aria-label="Meny"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="px-6 py-4 space-y-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-base text-gray-700 font-medium hover:bg-black/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <GlassButton
                  href="#contact"
                  size="default"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Kontakt
                </GlassButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
