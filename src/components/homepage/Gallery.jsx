import { useState } from "react";
import { galleryData } from "../../lib/galleryData";
import GalleryCard from "./gallery/GalleryCard";
import LightboxModal from "./gallery/LightboxModal";
import BackgroundAnimation from "./gallery/BackgroundAnimation";

// Every 4th card goes wide
const isWide = (i) => i % 4 === 0;

export default function Gallery({ data = galleryData }) {
  const [activeYear, setActiveYear] = useState(data[0]?.year);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const current = data.find((year) => year.year === activeYear) || data[0];

  if (!current) return null;

  const handleSelect = (event, photoIndex) => {
    setSelectedEvent({
      ...event,
      selectedPhotoIndex: photoIndex,
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#EDF3EC] px-4 py-10 sm:px-8">
      {/* Lightweight background */}
      <BackgroundAnimation type="bokeh" speed={0.6} interactive={false} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#1C8A54]">
          Gallery
        </p>

        <h2
          className="mb-5 text-xl font-[700] leading-tight text-[#0B2E22] sm:text-2xl"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Moments from every chapter year.
        </h2>

        {/* Year tabs */}
        <div className="mb-4 flex gap-1 overflow-x-auto border-b border-[#0B2E22]/15 pb-2">
          {data.map((year) => {
            const active = year.year === activeYear;

            return (
              <button
                key={year.year}
                onClick={() => {
                  setActiveYear(year.year);
                  setSelectedEvent(null);
                }}
                className="relative shrink-0 px-2.5 py-1.5 text-xs font-medium transition-colors"
                style={{
                  color: active ? "#0B2E22" : "#57655D",
                }}
              >
                {year.year}

                {active && (
                  <span
                    className="absolute -bottom-[5px] left-1/2 h-1.5 w-1.5 -translate-x-1/2"
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

        {/* Gallery */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-3 sm:grid-cols-3 sm:gap-x-3 sm:gap-y-4 lg:grid-cols-4">
          {current.events.map((event, index) => (
            <GalleryCard
              key={`${activeYear}-${event.id}`}
              event={event}
              wide={isWide(index)}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedEvent && (
        <LightboxModal
          event={selectedEvent}
          initialIndex={selectedEvent.selectedPhotoIndex ?? 0}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
}
