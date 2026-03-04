"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage blocked (private mode etc) — don't show banner
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, "accepted"); } catch {}
    window.dispatchEvent(new CustomEvent("cookie-consent-update", { detail: "accepted" }));
    setVisible(false);
  };

  const decline = () => {
    try { localStorage.setItem(STORAGE_KEY, "declined"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-inställningar"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-50 animate-[fadeSlideUp_0.3s_ease-out]"
    >
      <div className="rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl shadow-black/60 p-5">
        <p className="text-sm text-white/80 font-light leading-relaxed mb-4">
          Vi använder cookies för besöksstatistik (Google Analytics). Ingen data säljs vidare.{" "}
          <a
            href="/cookie-policy"
            className="text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-2"
          >
            Cookie-policy
          </a>
        </p>
        <div className="flex gap-2">
          <button
            onClick={accept}
            className="flex-1 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
          >
            Acceptera
          </button>
          <button
            onClick={decline}
            className="flex-1 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            Avvisa
          </button>
        </div>
      </div>
    </div>
  );
}
