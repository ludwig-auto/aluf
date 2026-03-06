const logos = [
  { src: "/logos/swedish-cold.webp", srcset: "/logos/swedish-cold.avif", alt: "Swedish Cold", width: 120, height: 40, url: "https://swedishcold.se" },
  { src: "/logos/checkatab.webp", srcset: "/logos/checkatab.avif", alt: "Checkat", width: 120, height: 40, url: "https://checkat.se" },
  { src: "/logos/extend.webp", srcset: "/logos/extend.avif", alt: "Extendmarketing AB", width: 120, height: 40, url: "https://extend.se" },
  { src: "/logos/grooo.svg", alt: "Grooo", width: 120, height: 40, url: "https://grooo.com" },
  { src: "/logos/visionsfastigheter.svg", alt: "Visions Fastigheter", width: 120, height: 40, url: "https://visionsfastigheter.se" },
];

// 4 copies so the remaining 3 sets (~2 400 px) cover ultra-wide viewports.
// translateX(-25%) scrolls exactly one set → seamless loop.
const items = [...logos, ...logos, ...logos, ...logos];

export default function TrustedBy() {
  return (
    <section id="trusted-by" className="py-16 md:py-24 bg-black overflow-hidden" aria-labelledby="trusted-by-heading">
      <h2 id="trusted-by-heading" className="text-center text-[11px] font-medium tracking-[0.2em] text-white/45 uppercase mb-10 md:mb-14">
        Anlitad av
      </h2>

      {/* Accessible list for screen readers — hidden visually */}
      <ul className="sr-only">
        {logos.map((logo) => (
          <li key={logo.alt}>
            <a href={logo.url} target="_blank" rel="noopener noreferrer">
              {logo.alt} (öppnas i nytt fönster)
            </a>
          </li>
        ))}
      </ul>

      {/* Edge fade — pointer-events passthrough is intentional here */}
      <div
        aria-hidden="true"
        className="relative ticker-wrap"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex items-center ticker-track animate-[ticker_80s_linear_infinite] motion-reduce:animate-none w-max">
          {items.map((logo, i) => (
            // padding-right acts as the gap INCLUDING the trailing gap after the last item
            // This ensures -50% translation equals exactly one full set's width
            <div key={i} className="shrink-0 flex items-center pr-20 md:pr-28">
              <a
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                className="transition-opacity duration-300 hover:opacity-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  srcSet={logo.srcset ? `${logo.srcset} 1x, ${logo.src} 1x` : undefined}
                  alt=""
                  width={logo.width}
                  height={logo.height}
                  className="h-12 md:h-14 w-auto brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300 select-none"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
