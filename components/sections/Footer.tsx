import { LinkedinIcon, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-10 bg-black border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-base font-light tracking-tight text-white mb-2">
              Automations<span className="text-violet-500">Ludwig</span>
            </p>
            <p className="text-sm text-white/40 font-light leading-relaxed">
              Små system. Stora resultat. Inga demos.
            </p>
          </div>

          {/* Sidor */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-[0.15em] text-white/50 uppercase mb-4">
              Sidor
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Lösningar", href: "#solutions" },
                { label: "Case", href: "#case" },
                { label: "Process", href: "#process" },
                { label: "FAQ", href: "#faq" },
                { label: "Kontakt", href: "/kontakt" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 font-light hover:text-violet-400 transition-all py-1 inline-block relative border-b border-transparent hover:border-violet-400/50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-[0.15em] text-white/50 uppercase mb-4">
              Kontakt
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:ludwig@automationsludwig.com"
                  className="text-sm text-white/50 font-light hover:text-violet-400 transition-all flex items-center gap-2 relative border-b border-transparent hover:border-violet-400/50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                >
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  ludwig@automationsludwig.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ludwig-a-automationsludwig/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 font-light hover:text-violet-400 transition-all flex items-center gap-2 relative border-b border-transparent hover:border-violet-400/50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                <span className="text-sm text-white/50 font-light flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  Stockholm
                </span>
              </li>
            </ul>
          </div>

          {/* Juridiskt */}
          <div>
            <h3 className="text-[10px] font-semibold tracking-[0.15em] text-white/50 uppercase mb-4">
              Juridiskt
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="/integritetspolicy"
                  className="text-sm text-white/50 font-light hover:text-violet-400 transition-all relative border-b border-transparent hover:border-violet-400/50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                >
                  Integritetspolicy
                </a>
              </li>
              <li>
                <a
                  href="/villkor"
                  className="text-sm text-white/50 font-light hover:text-violet-400 transition-all relative border-b border-transparent hover:border-violet-400/50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                >
                  Villkor
                </a>
              </li>
              <li>
                <a
                  href="/cookie-policy"
                  className="text-sm text-white/50 font-light hover:text-violet-400 transition-all relative border-b border-transparent hover:border-violet-400/50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                >
                  Cookie-policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60">
            &copy; 2026 AutomationsLudwig. Alla rättigheter förbehållna.
          </p>
          <p className="text-xs text-white/30">
            Utvecklad i Sverige
          </p>
        </div>
      </div>
    </footer>
  );
}
