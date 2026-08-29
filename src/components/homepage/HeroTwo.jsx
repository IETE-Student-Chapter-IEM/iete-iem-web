import { useEffect, useState } from "react";
import { ArrowRight, Users, CalendarDays, Wrench } from "lucide-react";

const HERO_IMAGES = [
  "/hero/hero-1.jpeg",
  "/hero/hero-2.jpeg",
  "/hero/hero-3.jpeg",
  "/hero/hero-4.jpeg",
];

const SLIDE_INTERVAL_MS = 3500;

// Palette 2 — Deep Emerald & Forest
const PRIMARY = "#064E3B"; // deep green, headings
const ACCENT = "#059669"; // emerald, buttons/highlights
const TINT = "#F0FDF4"; // soft mint background tint

export default function HeroTwo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden pt-24 md:pt-28"
      style={{ backgroundColor: TINT }}
    >
      {/* Blueprint Grid Background in Emerald Tint */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${PRIMARY} 1.2px, transparent 1.2px),
            linear-gradient(to bottom, ${PRIMARY} 1.2px, transparent 1.2px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Circuit traces */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.2]"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M -20 70 H 300 L 340 110 H 620"
          stroke={ACCENT}
          strokeWidth="2"
        />
        <circle cx="340" cy="110" r="4" fill={ACCENT} />

        <path
          d="M -20 840 H 260 L 300 800 H 560"
          stroke={ACCENT}
          strokeWidth="2"
        />
        <circle cx="300" cy="800" r="4" fill={ACCENT} />

        <path
          d="M 1620 60 H 1180 L 1140 100 H 980"
          stroke={PRIMARY}
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        <circle cx="1140" cy="100" r="3.5" fill={PRIMARY} fillOpacity="0.5" />
      </svg>

      {/* Centered triangle mark */}
      <svg
        className="pointer-events-none absolute inset-0 mx-auto h-full max-w-7xl"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <path
          d="M 800 130 L 1140 660 L 460 660 Z"
          stroke={PRIMARY}
          strokeWidth="2"
          opacity="0.14"
        />
        <path
          d="M 800 240 L 1050 620 L 550 620 Z"
          stroke={ACCENT}
          strokeWidth="2"
          opacity="0.18"
        />
        <path
          d="M 800 350 L 955 580 L 645 580 Z"
          fill={ACCENT}
          opacity="0.07"
        />

        <circle cx="800" cy="130" r="5" fill={ACCENT} opacity="0.4" />
        <circle cx="1140" cy="660" r="5" fill={ACCENT} opacity="0.4" />
        <circle cx="460" cy="660" r="5" fill={ACCENT} opacity="0.4" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* LEFT */}
          <div className="flex flex-col lg:col-span-7">
            <h1
              className="font-extrabold leading-[1.1] tracking-[-0.03em]"
              style={{ color: PRIMARY }}
            >
              <span className="block text-3xl sm:text-4xl md:text-[2.75rem]">
                Engineering ideas.
              </span>
              <span
                className="mt-1 block text-4xl sm:text-5xl md:text-[3.25rem]"
                style={{ color: ACCENT }}
              >
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
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition"
                style={{ backgroundColor: ACCENT }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = PRIMARY)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = ACCENT)
                }
              >
                See what's on
              </a>
            </div>

            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 pt-8">
              <div>
                <div className="flex items-center gap-1.5">
                  <Users
                    className="h-4 w-4"
                    style={{ color: ACCENT }}
                    strokeWidth={2}
                  />
                  <span
                    className="text-xl font-extrabold sm:text-2xl"
                    style={{ color: PRIMARY }}
                  >
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
                    className="h-4 w-4"
                    style={{ color: ACCENT }}
                    strokeWidth={2}
                  />
                  <span
                    className="text-xl font-extrabold sm:text-2xl"
                    style={{ color: PRIMARY }}
                  >
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
                    className="h-4 w-4"
                    style={{ color: ACCENT }}
                    strokeWidth={2}
                  />
                  <span
                    className="text-xl font-extrabold sm:text-2xl"
                    style={{ color: PRIMARY }}
                  >
                    30+
                  </span>
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-800/70">
                  Workshops
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — photo strip */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            <div
              className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border shadow-sm"
              style={{ borderColor: "#A7F3D0", backgroundColor: "#FFFFFF" }}
            >
              <div className="absolute inset-3 z-20 rounded-xl border border-dashed border-white/40 pointer-events-none" />

              <div className="absolute top-3 left-3 z-20 h-2.5 w-2.5 border-t-2 border-l-2 border-white" />
              <div className="absolute top-3 right-3 z-20 h-2.5 w-2.5 border-t-2 border-r-2 border-white" />
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

              <div className="absolute top-4 right-4 z-20 rounded bg-black/30 px-2 py-1 text-[10px] font-mono text-white/90 backdrop-blur">
                Chapter in action
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
