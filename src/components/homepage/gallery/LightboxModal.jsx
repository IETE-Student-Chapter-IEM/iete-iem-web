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

  useEffect(() => {
    setPhotoIdx(initialIndex);
  }, [event, initialIndex]);

  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    if (!event) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setPhotoIdx((p) => (p === 0 ? event.photos.length - 1 : p - 1));
      }
      if (e.key === "ArrowRight") {
        setPhotoIdx((p) => (p === event.photos.length - 1 ? 0 : p + 1));
      }
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B2E22]/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#0B2E22] border border-[#1C8A54]/40 rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 p-2 rounded-full transition-all"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
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

        {/* Main Photo Display */}
        <div className="relative aspect-video w-full bg-black">
          <img
            src={event.photos[photoIdx]}
            alt={`${event.title} ${photoIdx + 1}`}
            className="w-full h-full object-contain"
          />

          {event.photos.length > 1 && (
            <>
              <button
                onClick={() =>
                  setPhotoIdx((p) =>
                    p === 0 ? event.photos.length - 1 : p - 1,
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 text-xl leading-none"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                onClick={() =>
                  setPhotoIdx((p) =>
                    p === event.photos.length - 1 ? 0 : p + 1,
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 text-xl leading-none"
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Info Footer */}
        <div className="p-4 bg-[#0B2E22] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-[#1C8A54]/20">
          <div>
            <span
              className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded text-white inline-block mb-1"
              style={{ background: colorFor(event.category) }}
            >
              {event.category}
            </span>
            <h2
              className="text-lg text-white font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {event.title}
            </h2>
          </div>
          <div className="text-xs text-emerald-200/60 font-mono">
            Photo {photoIdx + 1} of {event.photos.length}
          </div>
        </div>
      </div>
    </div>
  );
}
