import { useState, useEffect, useRef } from "react";

const CATEGORY_COLOR = {
  Achievement: "#C9962B",
  "Flagship Event": "#6B4FA0",
  Workshop: "#14503A",
  "Talk & Seminar": "#3457D5",
  Competition: "#3457D5",
  "Community & Outreach": "#1C8A54",
  "Social Initiative": "#1C8A54",
  Foundation: "#1C8A54",
  Celebration: "#1C8A54",
};

const colorFor = (cat) => CATEGORY_COLOR[cat] || "#1C8A54";

export default function GalleryCard({ event, wide = false }) {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  const color = colorFor(event.category);
  const count = event.photos?.length || 0;

  // Reset slider whenever the event changes
  useEffect(() => {
    setIndex(0);
    pausedRef.current = false;
  }, [event.id]);

  // Auto-slide
  useEffect(() => {
    if (count <= 1) return;

    const id = setInterval(() => {
      if (!pausedRef.current) {
        setIndex((currentIndex) => (currentIndex + 1) % count);
      }
    }, 2800);

    return () => clearInterval(id);
  }, [count]);

  if (!count) return null;

  return (
    <div
      className={`relative ${wide ? "col-span-2" : ""}`}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      {/* Micro corner brackets */}
      {[
        "top-0 left-0 border-t border-l",
        "top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l",
        "bottom-0 right-0 border-b border-r",
      ].map((pos, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute z-10 h-1.5 w-1.5 border-white/70 ${pos}`}
        />
      ))}

      {/* Image slider */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#0B2E22] rounded-[3px]">
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {event.photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${event.title} ${i + 1}`}
              className="h-full w-full shrink-0 object-cover"
              loading="lazy"
            />
          ))}
        </div>

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E22]/95 via-[#0B2E22]/25 to-transparent" />

        {/* Event information */}
        <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 sm:px-3 sm:py-2">
          <span
            className="inline-block text-[7px] sm:text-[9px] lg:text-[10px] font-bold uppercase tracking-wide px-1.5 py-[2px] rounded-[1px] leading-none mb-1"
            style={{
              background: color,
              color: "#fff",
            }}
          >
            {event.category}
          </span>

          <h3
            className="text-white text-[10px] sm:text-xs lg:text-sm font-medium leading-tight truncate"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {event.title}
          </h3>
        </div>

        {/* Slider indicators */}
        {count > 1 && (
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex gap-[3px] z-10">
            {event.photos.map((_, i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full transition-opacity"
                style={{
                  background: "#fff",
                  opacity: i === index ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
