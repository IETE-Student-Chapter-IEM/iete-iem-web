import { memo, useEffect, useRef, useState } from "react";

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

function GalleryCard({ event, wide = false, onSelect }) {
  const [index, setIndex] = useState(0);

  const cardRef = useRef(null);
  const pausedRef = useRef(false);
  const intervalRef = useRef(null);

  const count = event.photos?.length || 0;
  const color = colorFor(event.category);

  useEffect(() => {
    setIndex(0);
    pausedRef.current = false;
  }, [event.id]);

  useEffect(() => {
    if (count <= 1) return;

    intervalRef.current = setInterval(() => {
      if (!pausedRef.current && !document.hidden) {
        setIndex((current) => (current + 1) % count);
      }
    }, 2800);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [count]);

  useEffect(() => {
    const handleVisibility = () => {
      pausedRef.current = document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  if (!count) return null;

  const handleMouseMove = (e) => {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-3px)
      scale(1.015)
    `;

    // Move glare with cursor
    const glare = card.querySelector("[data-glare]");

    if (glare) {
      glare.style.opacity = "1";
      glare.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(255,255,255,0.28) 0%,
          rgba(255,255,255,0.08) 22%,
          transparent 58%
        )
      `;
    }
  };

  const handleMouseEnter = () => {
    pausedRef.current = true;
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;

    const card = cardRef.current;

    if (card) {
      card.style.transform = `
        perspective(900px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0)
        scale(1)
      `;
    }

    const glare = card?.querySelector("[data-glare]");

    if (glare) {
      glare.style.opacity = "0";
    }
  };

  const handleClick = () => {
    onSelect?.(event, index);
  };

  return (
    <div
      ref={cardRef}
      className={`group relative cursor-pointer ${wide ? "col-span-2" : ""}`}
      style={{
        transform:
          "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
        transformStyle: "preserve-3d",
        transition: "transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Corner brackets */}
      {[
        "top-0 left-0 border-t border-l",
        "top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l",
        "bottom-0 right-0 border-b border-r",
      ].map((pos, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute z-30 h-1.5 w-1.5 border-white/70 transition-all duration-300 group-hover:h-2.5 group-hover:w-2.5 group-hover:border-[#1C8A54] ${pos}`}
        />
      ))}

      {/* Image container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-[3px] bg-[#0B2E22] shadow-md transition-shadow duration-300 group-hover:shadow-xl">
        {/* Image slider */}
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(-${index * 100}%, 0, 0)`,
          }}
        >
          {event.photos.map((src, i) => (
            <img
              key={`${event.id}-${i}`}
              src={src}
              alt={`${event.title} ${i + 1}`}
              className="h-full w-full shrink-0 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ))}
        </div>

        {/* Cursor glare */}
        <div
          data-glare
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-200"
        />

        {/* Gradient */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#0B2E22]/95 via-[#0B2E22]/25 to-transparent transition-opacity duration-300 group-hover:from-[#0B2E22]/90" />

        {/* Event info */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 px-2 py-1.5 sm:px-3 sm:py-2">
          <span
            className="mb-1 inline-block rounded-[1px] px-1.5 py-[2px] text-[7px] font-bold uppercase leading-none tracking-wide text-white sm:text-[9px] lg:text-[10px]"
            style={{
              background: color,
            }}
          >
            {event.category}
          </span>

          <h3
            className="truncate text-[10px] font-medium leading-tight text-white transition-colors duration-300 group-hover:text-[#82C39B] sm:text-xs lg:text-sm"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {event.title}
          </h3>
        </div>

        {/* Slider indicators */}
        {count > 1 && (
          <div className="pointer-events-none absolute right-1.5 top-1.5 z-20 flex gap-[3px] sm:right-2 sm:top-2">
            {event.photos.map((_, i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full transition-all duration-300"
                style={{
                  background: "#fff",
                  opacity: i === index ? 1 : 0.3,
                  transform: i === index ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(GalleryCard);
