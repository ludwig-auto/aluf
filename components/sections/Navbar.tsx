"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { CALENDLY_URL } from "@/lib/constants";

const links = [
  { label: "Lösningar", href: "#solutions" },
  { label: "Case", href: "#case" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Scroll-aware glass opacity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on resize to desktop + detect mobile
  useEffect(() => {
    const updateMobileState = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    updateMobileState();
    window.addEventListener("resize", updateMobileState);
    return () => window.removeEventListener("resize", updateMobileState);
  }, []);


  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav
        aria-label="Primär navigation"
        className="pointer-events-auto"
        style={{
          marginTop: 12,
          maxWidth: 960,
          width: "calc(100% - 24px)",
          borderRadius: mobileOpen ? 32 : 9999,
          zIndex: 50,
          background: scrolled
            ? "rgba(16,16,18,0.80)"
            : "rgba(16,16,18,0.48)",
          backdropFilter: isMobile ? "saturate(180%) blur(8px)" : "saturate(180%) blur(20px)",
          WebkitBackdropFilter: isMobile ? "saturate(180%) blur(8px)" : "saturate(180%) blur(20px)",
          border: scrolled
            ? "0.5px solid rgba(255,255,255,0.13)"
            : "0.5px solid rgba(255,255,255,0.06)",
          overflow: mobileOpen ? "visible" : "hidden",
          transition: mobileOpen
            ? "background 0.5s ease, border-color 0.5s ease"
            : "background 0.5s ease, border-color 0.5s ease, border-radius 0.3s ease-in-out",
        }}
      >
        {/* ─── Desktop bar ──────────────────────────────────────── */}
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <Link
              href="/"
              aria-label="AutomationsLudwig, gå till toppen"
              className="flex items-center"
            >
              <Logo />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-0.5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="
                    px-3.5 py-1.5 rounded-lg
                    text-[14px] font-normal leading-none
                    text-white/65 hover:text-white/95
                    transition-all duration-200
                    focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400
                    relative border-b border-transparent hover:border-white/30
                  "
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA pill — Apple style */}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Boka gratis samtal på Calendly (öppnas i nytt fönster)"
              className="
                group hidden md:inline-flex items-center gap-1.5
                px-4 py-[7px]
                rounded-full
                text-[13px] font-medium text-white/90
                transition-colors duration-200
                focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400
              "
              style={{
                background: "rgba(139,92,246,0.22)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgba(139,92,246,0.45)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(139,92,246,0.32)";
                el.style.borderColor = "rgba(139,92,246,0.65)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(139,92,246,0.22)";
                el.style.borderColor = "rgba(139,92,246,0.45)";
              }}
            >
              Boka gratis samtal
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-active:translate-x-1.5 shrink-0" aria-hidden="true" />
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Stäng meny" : "Öppna meny"}
              aria-expanded={mobileOpen}
              className="
                md:hidden w-11 h-11 flex items-center justify-center
                rounded-lg text-white/75 hover:text-white
                hover:bg-white/[0.07] transition-colors duration-200
                focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400
              "
            >
              {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>

          </div>
        </div>

        {/* ─── Mobile menu ──────────────────────────────────────── */}
        <div
          aria-hidden={!mobileOpen}
          className={`transition-all duration-300 ease-in-out overflow-hidden ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          style={{
            borderTop: "0.5px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="px-4 pt-3 pb-6 space-y-0.5">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                tabIndex={mobileOpen ? 0 : -1}
                className="
                  block px-4 py-3.5 rounded-xl
                  text-[16px] font-normal text-white/80 hover:text-white
                  hover:bg-white/[0.05] transition-all duration-150
                  focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400
                  relative border-b border-transparent hover:border-white/30
                "
              >
                {link.label}
              </a>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={mobileOpen ? 0 : -1}
                onClick={() => setMobileOpen(false)}
                aria-label="Boka gratis samtal på Calendly (öppnas i nytt fönster)"
                className="
                  group flex items-center justify-center gap-2 w-full
                  py-4 px-6 rounded-[14px]
                  text-[16px] font-medium text-white/90
                  transition-colors duration-200
                  focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400
                "
                style={{
                  background: "rgba(139,92,246,0.22)",
                  border: "0.5px solid rgba(139,92,246,0.45)",
                }}
              >
                Boka gratis samtal
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-active:translate-x-1.5 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </nav>
    </header>
  );
}
