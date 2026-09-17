import { useState, useEffect, useRef } from "react";
import { activitiesData } from "../../lib/activitiesData";

const CATEGORY_COLOR = {
  Achievement: "#C9962B",
  "Flagship Event": "#6B4FA0",
  Workshop: "#14503A",
  "Technical Workshop": "#14503A",
  "Talk & Seminar": "#3457D5",
  "Industry Talk": "#3457D5",
  "Alumni Talk": "#3457D5",
  "Lecture & Competition": "#3457D5",
  Competition: "#3457D5",
  "Coding Competition": "#3457D5",
  Conference: "#3457D5",
  "Faculty Development": "#14503A",
  "Community & Outreach": "#1C8A54",
  "Social Initiative": "#1C8A54",
  Foundation: "#1C8A54",
  Celebration: "#1C8A54",
  "Cultural Competition": "#1C8A54",
};
const colorFor = (cat) => CATEGORY_COLOR[cat] || "#1C8A54";

function Bracketed({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {[
        "top-0 left-0 border-t-2 border-l-2",
        "top-0 right-0 border-t-2 border-r-2",
        "bottom-0 left-0 border-b-2 border-l-2",
        "bottom-0 right-0 border-b-2 border-r-2",
      ].map((pos, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute h-3 w-3 border-[#0B2E22]/70 ${pos}`}
        />
      ))}
      {children}
    </div>
  );
}

function MetaRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-[11px] leading-4">
      <span className="uppercase tracking-wide text-[#57655D]/70 shrink-0">
        {label}
      </span>
      <span className="text-[#16211C]/80">
        {Array.isArray(value) ? value.join(" · ") : value}
      </span>
    </div>
  );
}

function EventCard({ ev, delay }) {
  const color = colorFor(ev.category);
  const nested = Array.isArray(ev.events) && ev.events.length > 0;

  return (
    <div
      className="relative pl-8 pb-10 opacity-0 animate-[fadeUp_.5s_ease_forwards]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* node soldered onto the rail */}
      <span
        className="absolute left-[-4px] top-1.5 h-[18px] w-[18px]"
        style={{
          background: color,
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          boxShadow: "0 0 0 3px #EDF3EC",
        }}
      />
      {ev.achievement && (
        <span
          className="absolute left-[-9px] top-[-2px] h-6 w-6 rounded-full border-2"
          style={{ borderColor: color }}
        />
      )}

      <Bracketed className="bg-white p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5"
                style={{ color, background: `${color}14` }}
              >
                {ev.category}
              </span>
              {ev.achievement && (
                <span className="text-[10px] font-semibold tracking-wide uppercase text-[#C9962B]">
                  ★ {ev.achievement}
                </span>
              )}
            </div>
            <h3
              className="font-[600] text-[17px] leading-snug text-[#14503A]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {ev.title}
            </h3>
            {ev.subtitle && (
              <p className="text-sm text-[#57655D] mt-0.5">{ev.subtitle}</p>
            )}
          </div>
          <p className="text-xs text-[#16211C]/60 whitespace-nowrap pt-1">
            {ev.date}
            {ev.mode ? ` · ${ev.mode}` : ""}
          </p>
        </div>

        <p className="text-[13.5px] leading-relaxed text-[#16211C]/85 mt-3">
          {ev.description}
        </p>

        <div className="mt-3 grid gap-1">
          <MetaRow label="Speaker" value={ev.speaker} />
          <MetaRow label="Speakers" value={ev.speakers} />
          <MetaRow label="Highlights" value={ev.highlights} />
          <MetaRow
            label="Reach"
            value={[
              ev.participants,
              ev.institutes,
              ev.sessions,
              ev.duration,
            ].filter(Boolean)}
          />
        </div>

        {nested && (
          <div className="mt-5 pl-4 border-l-2 border-dashed border-[#0B2E22]/25 grid gap-4">
            {ev.events.map((sub, i) => (
              <div key={sub.title} className="relative pl-4">
                <span
                  className="absolute left-[-7px] top-1 h-3 w-3 rounded-full text-[9px] flex items-center justify-center font-bold text-white"
                  style={{ background: "#6B4FA0" }}
                >
                  <span className="text-[8px] leading-none pl-[7px] pt-[7px]" />
                </span>
                <p className="text-[11px] font-semibold text-[#6B4FA0]">
                  DAY {i + 1} · {sub.date}
                </p>
                <p className="text-[14px] font-[600] text-[#14503A]">
                  {sub.title}
                </p>
                <p className="text-[13px] text-[#16211C]/80 mt-0.5">
                  {sub.description}
                </p>
                {sub.participants && (
                  <p className="text-[11px] text-[#57655D] mt-0.5">
                    {sub.participants} participants
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </Bracketed>
    </div>
  );
}

export default function ActivitiesTimeline({ data = activitiesData }) {
  const [activeYear, setActiveYear] = useState(data[0].year);
  const railRef = useRef(null);
  const current = data.find((y) => y.year === activeYear) || data[0];

  useEffect(() => {
    if (!railRef.current) return;
    railRef.current.style.animation = "none";
    // force reflow so the etch animation restarts on tab change
    void railRef.current.offsetHeight;
    railRef.current.style.animation = "etch .9s ease forwards";
  }, [activeYear]);

  return (
    <section className="bg-[#EDF3EC] px-4 sm:px-8 py-14">
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform: translateY(10px);} to { opacity:1; transform:none; } }
        @keyframes etch { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0 0); } }
      `}</style>

      <div className="max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-wide text-[#1C8A54] font-semibold mb-2">
          Activities
        </p>
        <h2
          className="text-[32px] sm:text-[38px] font-[700] text-[#0B2E22] leading-[1.1] mb-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          What the chapter has been building.
        </h2>

        {/* year tabs — PCB header pins */}
        <div className="flex gap-1 overflow-x-auto pb-3 mb-8 border-b border-[#0B2E22]/15">
          {data.map((y) => {
            const active = y.year === activeYear;
            return (
              <button
                key={y.year}
                onClick={() => setActiveYear(y.year)}
                className="relative shrink-0 px-4 py-2 text-sm font-medium transition-colors"
                style={{ color: active ? "#0B2E22" : "#57655D" }}
              >
                {y.year}
                {y.label && (
                  <span className="ml-1.5 text-[10px] uppercase tracking-wide text-[#1C8A54]">
                    {y.label}
                  </span>
                )}
                {active && (
                  <span
                    className="absolute left-1/2 -bottom-[7px] -translate-x-1/2 h-2 w-2"
                    style={{
                      background: "#1C8A54",
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* the trace */}
        <div className="relative">
          <div
            ref={railRef}
            className="absolute left-[3px] top-2 bottom-10 w-[2px] bg-[#0B2E22]/25"
            style={{ clipPath: "inset(0 0 0 0)" }}
          />
          <div key={activeYear}>
            {current.events.map((ev, i) => (
              <EventCard ev={ev} key={ev.title + ev.date} delay={i * 70} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
