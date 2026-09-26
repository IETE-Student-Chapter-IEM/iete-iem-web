import { useEffect, useState } from "react";

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

export default function LightboxModal({ event, initialIndex = 0, onClose }) {
  const [photoIdx, setPhotoIdx] = useState(initialIndex);

  const count = event?.photos?.length || 0;

  // Reset when a new event is selected
  useEffect(() => {
    setPhotoIdx(Math.min(Math.max(initialIndex, 0), Math.max(count - 1, 0)));
  }, [event?.id, initialIndex, count]);

  // Keyboard controls + body lock
  useEffect(() => {
    if (!event) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (count <= 1) return;

      if (e.key === "ArrowLeft") {
        setPhotoIdx((current) => (current === 0 ? count - 1 : current - 1));
      }

      if (e.key === "ArrowRight") {
        setPhotoIdx((current) => (current === count - 1 ? 0 : current + 1));
      }
    };

    window.addEventListener("keydown", handleKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [event, count, onClose]);

  if (!event || !count) return null;

  const previousPhoto = () => {
    setPhotoIdx((current) => (current === 0 ? count - 1 : current - 1));
  };

  const nextPhoto = () => {
    setPhotoIdx((current) => (current === count - 1 ? 0 : current + 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B2E22]/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-[#1C8A54]/40 bg-[#0B2E22] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-full bg-black/40 p-2 text-white/70 transition-all hover:bg-black/70 hover:text-white"
          aria-label="Close"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Main Photo */}
        <div className="relative aspect-video w-full bg-black">
          <img
            src={event.photos[photoIdx]}
            alt={`${event.title} ${photoIdx + 1}`}
            className="h-full w-full object-contain"
            decoding="async"
          />

          {count > 1 && (
            <>
              <button
                onClick={previousPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-xl leading-none text-white transition hover:bg-black/80"
                aria-label="Previous photo"
              >
                ‹
              </button>

              <button
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-xl leading-none text-white transition hover:bg-black/80"
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col items-start justify-between gap-2 border-t border-[#1C8A54]/20 bg-[#0B2E22] p-4 sm:flex-row sm:items-center">
          <div>
            <span
              className="mb-1 inline-block rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
              style={{
                background: colorFor(event.category),
              }}
            >
              {event.category}
            </span>

            <h2
              className="text-lg font-semibold text-white"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {event.title}
            </h2>
          </div>

          <div className="font-mono text-xs text-emerald-200/60">
            Photo {photoIdx + 1} of {count}
          </div>
        </div>
      </div>
    </div>
  );
}
