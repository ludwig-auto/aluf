"use client";

import { Linkedin, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="text-lg font-light tracking-tight text-gray-900 mb-3">
              Automations<span className="text-emerald-600">Ludwig</span>
            </p>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Små system. Stora resultat. Inga demos.
            </p>
          </div>

          {/* Sidor */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] text-gray-400 uppercase mb-4">
              Sidor
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "Lösningar", href: "#solutions" },
                { label: "Process", href: "#process" },
                { label: "Team", href: "#team" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 font-light hover:text-emerald-600 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] text-gray-400 uppercase mb-4">
              Kontakt
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hej@automationsludwig.se"
                  className="text-sm text-gray-500 font-light hover:text-emerald-600 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  hej@automationsludwig.se
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/ludwig"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 font-light hover:text-emerald-600 transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </li>
              <li>
                <span className="text-sm text-gray-500 font-light flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  Stockholm, Sverige
                </span>
              </li>
            </ul>
          </div>

          {/* Juridiskt */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] text-gray-400 uppercase mb-4">
              Juridiskt
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 font-light hover:text-emerald-600 transition-colors"
                >
                  Integritetspolicy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 font-light hover:text-emerald-600 transition-colors"
                >
                  Villkor
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-300">
            &copy; 2026 AutomationsLudwig. Alla rättigheter förbehållna.
          </p>
          <p className="text-xs text-gray-300">Byggt med precision.</p>
        </div>
      </div>
    </footer>
  );
}
