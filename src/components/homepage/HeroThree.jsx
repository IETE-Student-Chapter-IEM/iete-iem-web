import { useEffect, useState } from "react";
import { Users, CalendarDays, Wrench } from "lucide-react";

const HERO_IMAGES = [
  "/hero/hero-1.jpeg",
  "/hero/hero-2.jpeg",
  "/hero/hero-3.jpeg",
  "/hero/hero-4.jpeg",
];

const SLIDE_INTERVAL_MS = 3500;

// Palette 3 — Midnight Indigo & Electric Violet
const PRIMARY = "#1E1B4B";
const ACCENT = "#4F46E5";
const TINT = "#F5F3FF";

const NODES = [
  { x: 140, y: 120 },
  { x: 340, y: 90 },
  { x: 520, y: 220 },
  { x: 300, y: 300 },
  { x: 90, y: 340 },
  { x: 460, y: 60 },
  { x: 1120, y: 140 },
  { x: 1320, y: 100 },
  { x: 1480, y: 260 },
  { x: 1260, y: 340 },
  { x: 1080, y: 300 },
  { x: 1420, y: 60 },
  { x: 220, y: 780 },
  { x: 420, y: 830 },
  { x: 100, y: 860 },
  { x: 1180, y: 800 },
  { x: 1400, y: 840 },
  { x: 1500, y: 780 },
];

const EDGES = [
  [0, 1],
  [1, 5],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0],
  [3, 0],
  [6, 7],
  [7, 11],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 6],
  [9, 6],
  [12, 13],
  [13, 14],
  [14, 12],
  [15, 16],
  [16, 17],
  [17, 15],
];

export default function HeroThree() {
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
      style={{ backgroundColor: TINT }}
    >
      {/* 1. Soft Ambient Glow */}
      <div
        className="pointer-events-none absolute -left-24 top-16 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ backgroundColor: ACCENT, opacity: 0.12 }}
      />
      <div
        className="pointer-events-none absolute right-0 top-40 h-[360px] w-[360px] rounded-full blur-3xl"
        style={{ backgroundColor: PRIMARY, opacity: 0.08 }}
      />

      {/* 2. Geometric Layer: Isometric Cubes, Radar Crosshairs & Telemetry Arcs */}
      <svg
        className="pointer-events-none absolute inset-0 mx-auto h-full max-w-7xl opacity-40 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_20%,black,transparent)]"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Left Side: Isometric Tech Cubes */}
        <g stroke={ACCENT} strokeWidth="1.2" opacity="0.4">
          {/* Cube 1 */}
          <path
            d="M 120 180 L 170 150 L 220 180 L 170 210 Z"
            fill={ACCENT}
            fillOpacity="0.08"
          />
          <path d="M 120 180 V 240 L 170 270 V 210 Z" />
          <path d="M 220 180 V 240 L 170 270 V 210 Z" />

          {/* Cube 2 (Offset) */}
          <path
            d="M 260 260 L 300 235 L 340 260 L 300 285 Z"
            fill={PRIMARY}
            fillOpacity="0.06"
          />
          <path d="M 260 260 V 310 L 300 335 V 285 Z" />
          <path d="M 340 260 V 310 L 300 335 V 285 Z" />
        </g>

        {/* Center-Right Background: Radar Target & Telemetry Arcs */}
        <g stroke={ACCENT} opacity="0.3">
          {/* Concentric Tech Rings */}
          <circle
            cx="1150"
            cy="450"
            r="280"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle cx="1150" cy="450" r="180" strokeWidth="1.5" />
          <circle
            cx="1150"
            cy="450"
            r="90"
            strokeWidth="1"
            strokeDasharray="12 6"
          />

          {/* Precision Crosshairs */}
          <line
            x1="850"
            y1="450"
            x2="1450"
            y2="450"
            strokeWidth="1"
            strokeDasharray="6 6"
          />
          <line
            x1="1150"
            y1="150"
            x2="1150"
            y2="750"
            strokeWidth="1"
            strokeDasharray="6 6"
          />

          {/* Corner Framing Marks */}
          <path d="M 920 220 H 870 V 270" strokeWidth="2" />
          <path d="M 1380 220 H 1430 V 270" strokeWidth="2" />
          <path d="M 920 680 H 870 V 630" strokeWidth="2" />
          <path d="M 1380 680 H 1430 V 630" strokeWidth="2" />
        </g>

        {/* Neural Network Node Mesh */}
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke={ACCENT}
            strokeWidth="1.2"
            opacity="0.2"
          />
        ))}
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i % 3 === 0 ? 4 : 2.5}
            fill={ACCENT}
            opacity="0.45"
          />
        ))}
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-8 md:pb-16 md:pt-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* LEFT — Dialogue & Action */}
          <div className="flex flex-col lg:col-span-7">
            {/* Compact Headline Typography */}
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

            {/* Compact Description */}
            <p className="mt-3 max-w-md text-xs leading-relaxed text-slate-600 sm:text-sm">
              A student community exploring electronics, communication and
              computing through workshops, technical sessions and hands-on
              activities.
            </p>

            {/* CTA Button */}
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

            {/* Stats Row */}
            <div className="mt-8 grid max-w-sm grid-cols-3 gap-4 border-t border-indigo-200/60 pt-6">
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
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-900/60">
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
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-900/60">
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
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-900/60">
                  Workshops
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Photo Strip Carousel */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            <div
              className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border shadow-sm"
              style={{ borderColor: "#C7D2FE", backgroundColor: "#FFFFFF" }}
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
