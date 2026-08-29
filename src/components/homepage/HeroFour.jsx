import { useEffect, useState } from "react";
import { Users, CalendarDays, Wrench } from "lucide-react";

const HERO_IMAGES = [
  "/hero/hero-1.jpeg",
  "/hero/hero-2.jpeg",
  "/hero/hero-3.jpeg",
  "/hero/hero-4.jpeg",
];

const SLIDE_INTERVAL_MS = 3500;

// Palette 4 — Dark Slate & Cyan
const PRIMARY = "#0F172A"; // crisp dark slate, headings
const ACCENT = "#0891B2"; // cyan/teal, buttons/highlights
const SECTION_BG = "#F8FAFC"; // sleek slate-tinted background

export default function HeroFour() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden pt-20 md:pt-24"
      style={{ backgroundColor: SECTION_BG }}
    >
      {/* 1. Unique Cyan Glow Blurs */}
      <div
        className="pointer-events-none absolute -left-20 top-10 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: ACCENT }}
      />
      <div
        className="pointer-events-none absolute right-10 bottom-10 h-80 w-80 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: PRIMARY }}
      />

      {/* 2. Unique SVG Visual: Digital Matrix Wave Dot Pattern */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black,transparent)]"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <g fill={ACCENT}>
          {/* Vertical Data Stream Columns */}
          {Array.from({ length: 24 }).map((_, col) =>
            Array.from({ length: 12 }).map((_, row) => {
              const x = col * 70 + 40;
              const y = row * 75 + 30;
              const radius = (col + row) % 4 === 0 ? 3 : 1.5;
              const opacity = ((col * 3 + row * 7) % 10) * 0.08 + 0.1;

              return (
                <circle
                  key={`${col}-${row}`}
                  cx={x}
                  cy={y}
                  r={radius}
                  opacity={opacity}
                />
              );
            }),
          )}
        </g>

        {/* Diagonal Tech Signal Path */}
        <path
          d="M -50 200 L 400 200 L 550 350 L 1200 350 L 1350 500 L 1650 500"
          stroke={ACCENT}
          strokeWidth="1.5"
          strokeDasharray="8 6"
          opacity="0.25"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-8 md:pb-16 md:pt-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* LEFT — Dialogue & Action */}
          <div className="flex flex-col lg:col-span-7">
            <h1
              className="font-extrabold leading-[1.08] tracking-tight"
              style={{ color: PRIMARY }}
            >
              <span className="block text-2xl sm:text-3xl md:text-4xl">
                Engineering ideas.
              </span>
              <span
                className="mt-1 block text-3xl sm:text-4xl md:text-5xl"
                style={{ color: ACCENT }}
              >
                Building what's next.
              </span>
            </h1>

            <p className="mt-3 max-w-md text-xs leading-relaxed text-slate-600 sm:text-sm">
              A student community exploring electronics, communication and
              computing through workshops, technical sessions and hands-on
              activities.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#events"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition"
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

            <div className="mt-8 grid max-w-sm grid-cols-3 gap-4 border-t border-cyan-200/60 pt-6">
              <div>
                <div className="flex items-center gap-1.5">
                  <Users
                    className="h-3.5 w-3.5"
                    style={{ color: ACCENT }}
                    strokeWidth={2}
                  />
                  <span
                    className="text-lg font-extrabold sm:text-xl"
                    style={{ color: PRIMARY }}
                  >
                    480+
                  </span>
                </div>
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Members
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <CalendarDays
                    className="h-3.5 w-3.5"
                    style={{ color: ACCENT }}
                    strokeWidth={2}
                  />
                  <span
                    className="text-lg font-extrabold sm:text-xl"
                    style={{ color: PRIMARY }}
                  >
                    62+
                  </span>
                </div>
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Events
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <Wrench
                    className="h-3.5 w-3.5"
                    style={{ color: ACCENT }}
                    strokeWidth={2}
                  />
                  <span
                    className="text-lg font-extrabold sm:text-xl"
                    style={{ color: PRIMARY }}
                  >
                    30+
                  </span>
                </div>
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Workshops
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Photo Strip Carousel */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            <div
              className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border shadow-sm"
              style={{ borderColor: "#CFFAFE", backgroundColor: "#FFFFFF" }}
            >
              <div className="absolute inset-2.5 z-20 rounded-xl border border-dashed border-white/40 pointer-events-none" />

              <div className="absolute top-2.5 left-2.5 z-20 h-2 w-2 border-t-2 border-l-2 border-white" />
              <div className="absolute top-2.5 right-2.5 z-20 h-2 w-2 border-t-2 border-r-2 border-white" />
              <div className="absolute bottom-2.5 left-2.5 z-20 h-2 w-2 border-b-2 border-l-2 border-white" />
              <div className="absolute bottom-2.5 right-2.5 z-20 h-2 w-2 border-b-2 border-r-2 border-white" />

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

              <div className="absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/45 to-transparent" />

              <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
                {HERO_IMAGES.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === active ? "w-4 bg-white" : "w-1 bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute top-3 right-3 z-20 rounded bg-black/30 px-2 py-0.5 text-[9px] font-mono text-white/90 backdrop-blur">
                Chapter in action
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
