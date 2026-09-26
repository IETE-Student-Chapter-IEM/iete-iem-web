import { useState } from "react";
import { galleryData } from "../../lib/galleryData";
import GalleryCard from "./gallery/GalleryCard";
import BackgroundAnimation from "./gallery/BackgroundAnimation";

// Every 4th card goes wide (2 cols) — deterministic but irregular bento feel
const isWide = (i) => i % 4 === 0;

export default function Gallery({ data = galleryData }) {
  const [activeYear, setActiveYear] = useState(data[0].year);
  const current = data.find((y) => y.year === activeYear) || data[0];

  return (
    <section className="relative bg-[#EDF3EC] min-h-screen overflow-hidden px-4 sm:px-8 py-10">
      <BackgroundAnimation type="bokeh" speed={1} interactive={true} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="text-[10px] uppercase tracking-wide text-[#1C8A54] font-semibold mb-1">
          Gallery
        </p>

        <h2
          className="text-xl sm:text-2xl font-[700] text-[#0B2E22] leading-tight mb-5"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Moments from every chapter year.
        </h2>

        {/* Year tabs */}
        <div className="flex gap-1 overflow-x-auto pb-2 mb-4 border-b border-[#0B2E22]/15">
          {data.map((y) => {
            const active = y.year === activeYear;

            return (
              <button
                key={y.year}
                onClick={() => setActiveYear(y.year)}
                className="relative shrink-0 px-2.5 py-1.5 text-xs font-medium transition-colors"
                style={{
                  color: active ? "#0B2E22" : "#57655D",
                }}
              >
                {y.year}

                {active && (
                  <span
                    className="absolute left-1/2 -bottom-[5px] -translate-x-1/2 h-1.5 w-1.5"
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

        <div
          key={activeYear}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2 sm:gap-x-3 gap-y-3 sm:gap-y-4"
        >
          {current.events.map((ev, i) => (
            <GalleryCard
              event={ev}
              key={`${activeYear}-${ev.id}`}
              wide={isWide(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
