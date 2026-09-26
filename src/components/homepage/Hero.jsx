import { useEffect, useState } from "react";
import { Users, CalendarDays, Wrench } from "lucide-react";

const HERO_IMAGES = [
  "/hero/hero-1.jpeg",
  "/hero/hero-4.jpeg",
  "/hero/hero-5.jpeg",
  "/hero/1.JPG",
  "/hero/2.png",
  "/hero/4.png",
  "/hero/5.png",
  "/hero/6.png",
  "/hero/7.jpeg",
  "/hero/8.jpeg",
];

const SLIDE_INTERVAL_MS = 3500;

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-brand-tint pt-24 sm:pt-28 md:pt-32">
      {/* Blueprint Grid Background in Emerald Tint */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-brand-primary) 1.2px, transparent 1.2px),
            linear-gradient(to bottom, var(--color-brand-primary) 1.2px, transparent 1.2px)
          `,
          backgroundSize: "36px 36px",
        }}
      />
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 top-16 h-[calc(100%-4rem)] w-full lg:hidden"
        viewBox="0 0 400 700"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* Outer triangle */}
        <path
          d="M 200 90 L 330 310 L 70 310 Z"
          stroke="var(--color-brand-primary)"
          strokeWidth="1.5"
          opacity="0.10"
        />

        {/* Middle triangle */}
        <path
          d="M 200 135 L 300 295 L 100 295 Z"
          stroke="var(--color-brand-accent)"
          strokeWidth="1.5"
          opacity="0.12"
        />

        {/* Inner filled triangle */}
        <path
          d="M 200 180 L 270 280 L 130 280 Z"
          fill="var(--color-brand-accent)"
          opacity="0.05"
        />

        {/* Corner nodes */}
        <circle
          cx="200"
          cy="90"
          r="3.5"
          fill="var(--color-brand-accent)"
          opacity="0.3"
        />
        <circle
          cx="330"
          cy="310"
          r="3.5"
          fill="var(--color-brand-accent)"
          opacity="0.3"
        />
        <circle
          cx="70"
          cy="310"
          r="3.5"
          fill="var(--color-brand-accent)"
          opacity="0.3"
        />
      </svg>

      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 top-16 hidden h-[calc(100%-4rem)] w-full opacity-[0.2] lg:block"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M -20 70 H 300 L 340 110 H 620"
          stroke="var(--color-brand-accent)"
          strokeWidth="2"
        />
        <circle cx="340" cy="110" r="4" fill="var(--color-brand-accent)" />

        <path
          d="M -20 840 H 260 L 300 800 H 560"
          stroke="var(--color-brand-accent)"
          strokeWidth="2"
        />
        <circle cx="300" cy="800" r="4" fill="var(--color-brand-accent)" />

        <path
          d="M 1620 60 H 1180 L 1140 100 H 980"
          stroke="var(--color-brand-primary)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        <circle
          cx="1140"
          cy="100"
          r="3.5"
          fill="var(--color-brand-primary)"
          fillOpacity="0.5"
        />
      </svg>

      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 top-16 mx-auto hidden h-[calc(100%-4rem)] max-w-7xl lg:block"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <path
          d="M 800 130 L 1140 660 L 460 660 Z"
          stroke="var(--color-brand-primary)"
          strokeWidth="2"
          opacity="0.14"
        />
        <path
          d="M 800 240 L 1050 620 L 550 620 Z"
          stroke="var(--color-brand-accent)"
          strokeWidth="2"
          opacity="0.18"
        />
        <path
          d="M 800 350 L 955 580 L 645 580 Z"
          fill="var(--color-brand-accent)"
          opacity="0.07"
        />

        <circle
          cx="800"
          cy="130"
          r="5"
          fill="var(--color-brand-accent)"
          opacity="0.4"
        />
        <circle
          cx="1140"
          cy="660"
          r="5"
          fill="var(--color-brand-accent)"
          opacity="0.4"
        />
        <circle
          cx="460"
          cy="660"
          r="5"
          fill="var(--color-brand-accent)"
          opacity="0.4"
        />
      </svg>
      <div className="relative mx-auto max-w-7xl px-5 pb-16 sm:px-6 md:pb-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* LEFT — dialog & action */}
          <div className="flex flex-col lg:col-span-7 pt-20">
            <h1 className="font-extrabold leading-[1.1] tracking-[-0.03em] text-brand-primary">
              <span className="block text-3xl sm:text-4xl md:text-[2.75rem]">
                Engineering ideas.
              </span>
              <span className="mt-1 block text-4xl text-brand-accent sm:text-5xl md:text-[3.25rem]">
                Building what's next.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
              A student community exploring electronics, communication and
              computing through workshops, technical sessions and hands-on
              activities.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#events"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-primary sm:w-auto"
              >
                See what's on
              </a>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 pt-8 sm:mt-12 sm:gap-6">
              <div>
                <div className="flex items-center gap-1.5">
                  <Users
                    className="h-4 w-4 text-brand-accent"
                    strokeWidth={2}
                  />
                  <span className="text-xl font-extrabold text-brand-primary sm:text-2xl">
                    480+
                  </span>
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-800/70">
                  Members
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <CalendarDays
                    className="h-4 w-4 text-brand-accent"
                    strokeWidth={2}
                  />
                  <span className="text-xl font-extrabold text-brand-primary sm:text-2xl">
                    62+
                  </span>
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-800/70">
                  Events
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <Wrench
                    className="h-4 w-4 text-brand-accent"
                    strokeWidth={2}
                  />
                  <span className="text-xl font-extrabold text-brand-primary sm:text-2xl">
                    30+
                  </span>
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-800/70">
                  Workshops
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — auto-scrolling photo frame */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm">
              {/* Internal framing accents */}
              <div className="pointer-events-none absolute inset-3 z-20 rounded-xl border border-dashed border-white/40" />
              <div className="absolute left-3 top-3 z-20 h-2.5 w-2.5 border-l-2 border-t-2 border-white" />
              <div className="absolute right-3 top-3 z-20 h-2.5 w-2.5 border-r-2 border-t-2 border-white" />
              <div className="absolute bottom-3 left-3 z-20 h-2.5 w-2.5 border-b-2 border-l-2 border-white" />
              <div className="absolute bottom-3 right-3 z-20 h-2.5 w-2.5 border-b-2 border-r-2 border-white" />

              {HERO_IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt="IETE Student Chapter, IEM Kolkata — chapter activity"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/45 to-transparent" />

              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
                {HERO_IMAGES.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-5 bg-white" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute right-4 top-4 z-20 rounded bg-black/30 px-2 py-1 font-mono text-[10px] text-white/90 backdrop-blur">
                Chapter in action
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
