"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    // Check if user already accepted in a previous visit
    try {
      if (localStorage.getItem("cookie-consent") === "accepted") {
        setConsented(true);
        return;
      }
    } catch {}

    // Listen for acceptance in the current session
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail === "accepted") {
        setConsented(true);
      }
    };
    window.addEventListener("cookie-consent-update", handler);
    return () => window.removeEventListener("cookie-consent-update", handler);
  }, []);

  if (!GA_ID || !consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
