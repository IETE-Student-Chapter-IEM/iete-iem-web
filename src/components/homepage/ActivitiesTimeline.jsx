import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { activitiesData } from "../../lib/activitiesData";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_ACCENT = {
  Achievement: "#B8862B", // gold — wins stand out from everything else
};
const DEFAULT_ACCENT = "#1C8A54";

const eventId = (ev) => ev.title + ev.date;

function ChevronButton({ direction, onClick, disabled }) {
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      onClick={onClick}
      disabled={disabled}
      className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#0B2E22]/15 bg-white text-[#0B2E22] shadow-sm transition-all duration-200 hover:border-[#1C8A54] hover:bg-[#1C8A54] hover:text-white active:scale-90 disabled:opacity-25 disabled:pointer-events-none disabled:hover:bg-white disabled:hover:text-[#0B2E22]"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 6l6 6-6 6" />
        )}
      </svg>
    </button>
  );
}

export default function ActivitiesTimeline({ data = activitiesData }) {
  const [activeYear, setActiveYear] = useState(data[0].year);
  const [openId, setOpenId] = useState(eventId(data[0].events[0]));
  const [displayEvent, setDisplayEvent] = useState(data[0].events[0]);
  const [scrollState, setScrollState] = useState({
    atStart: true,
    atEnd: false,
  });

  const sectionRef = useRef(null);
  const stripRef = useRef(null);
  const traceRef = useRef(null);
  const detailRef = useRef(null);
  const contentRef = useRef(null);
  const isFirstOpenRender = useRef(true);
  const isFirstYearRender = useRef(true);

  const current = data.find((y) => y.year === activeYear) || data[0];
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // one-time reveal when the section first scrolls into view
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".yr-tab", { opacity: 0, y: -8 });
      gsap.set(".at-card", { opacity: 0, scale: 0.94 });
      gsap.set(".at-detail", { opacity: 0, y: 10 });
      gsap
        .timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        })
        .to(".yr-tab", {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0.01 : 0.4,
          stagger: reduceMotion ? 0 : 0.05,
          ease: "power2.out",
        })
        .to(
          ".at-card",
          {
            opacity: 1,
            scale: 1,
            duration: reduceMotion ? 0.01 : 0.45,
            stagger: reduceMotion ? 0 : 0.06,
            ease: "back.out(1.6)",
          },
          "-=0.2",
        )
        .to(
          ".at-detail",
          {
            opacity: 1,
            y: 0,
            duration: reduceMotion ? 0.01 : 0.4,
            ease: "power2.out",
          },
          "-=0.2",
        );
    }, sectionRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTrace = useCallback(() => {
    const el = stripRef.current;
    if (!el || !traceRef.current) return;
    const max = el.scrollWidth - el.clientWidth;
    const pct = max > 0 ? el.scrollLeft / max : 0;
    gsap.to(traceRef.current, {
      scaleX: Math.max(pct, 0.02),
      duration: 0.15,
      ease: "none",
      transformOrigin: "left",
    });
    setScrollState({
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= max - 4,
    });
  }, []);

  // year switch: re-enter cards, and hand the detail panel the first event (morphs, never closes)
  useLayoutEffect(() => {
    if (stripRef.current) stripRef.current.scrollLeft = 0;

    if (isFirstYearRender.current) {
      isFirstYearRender.current = false;
    } else {
      setOpenId(eventId(current.events[0]));
    }

    const cards = gsap.utils.toArray(".at-card", stripRef.current);
    gsap.fromTo(
      cards,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: reduceMotion ? 0.01 : 0.4,
        stagger: reduceMotion ? 0 : 0.045,
        ease: "power2.out",
      },
    );
    updateTrace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeYear]);

  useLayoutEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateTrace, { passive: true });
    return () => el.removeEventListener("scroll", updateTrace);
  }, [updateTrace]);

  // morph the detail panel's content + height whenever the selected event changes
  useLayoutEffect(() => {
    const panel = detailRef.current;
    const inner = contentRef.current;
    if (!panel || !inner) return;

    if (isFirstOpenRender.current) {
      isFirstOpenRender.current = false;
      return;
    }

    const newEvent =
      current.events.find((e) => eventId(e) === openId) || current.events[0];
    const h0 = panel.offsetHeight;

    const tl = gsap.timeline();
    tl.to(inner, {
      opacity: 0,
      y: reduceMotion ? 0 : -6,
      duration: reduceMotion ? 0.01 : 0.15,
      ease: "power1.in",
    }).call(() => {
      setDisplayEvent(newEvent);
      requestAnimationFrame(() => {
        const h1 = panel.scrollHeight;
        gsap.fromTo(
          panel,
          { height: h0 },
          {
            height: h1,
            duration: reduceMotion ? 0.01 : 0.35,
            ease: "power2.out",
            onComplete: () => gsap.set(panel, { height: "auto" }),
          },
        );
        gsap.fromTo(
          inner,
          { opacity: 0, y: reduceMotion ? 0 : 6 },
          {
            opacity: 1,
            y: 0,
            duration: reduceMotion ? 0.01 : 0.3,
            ease: "power2.out",
          },
        );
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId]);

  // desktop drag-to-scroll
  useLayoutEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    const down = (e) => {
      isDown = true;
      startX = e.pageX;
      startScroll = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const up = () => {
      isDown = false;
      el.style.cursor = "grab";
    };
    const move = (e) => {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = startScroll - (e.pageX - startX);
    };
    el.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", move);
    return () => {
      el.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mousemove", move);
    };
  }, [activeYear]);

  const scrollByCards = (dir) => {
    stripRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  const selectEvent = (ev) => {
    const id = eventId(ev);
    if (id === openId) return;
    setOpenId(id);
  };

  return (
    <section ref={sectionRef} className="bg-[#EDF3EC] px-4 sm:px-8 py-10">
      <style>{`
        .at-strip::-webkit-scrollbar { display: none; }
        .at-strip { scrollbar-width: none; }
      `}</style>

      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] uppercase tracking-wide text-[#1C8A54] font-semibold mb-2">
          Activities
        </p>
        <h2
          className="text-[32px] sm:text-[38px] font-[700] text-[#0B2E22] leading-[1.1] mb-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          What the chapter has been building.
        </h2>

        {/* year tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-3 mb-6 border-b border-[#0B2E22]/15">
          {data.map((y) => {
            const active = y.year === activeYear;
            return (
              <button
                key={y.year}
                className="yr-tab relative shrink-0 px-3 py-2 text-sm font-medium transition-colors"
                style={{ color: active ? "#0B2E22" : "#57655D" }}
                onClick={() => setActiveYear(y.year)}
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

        {/* progress trace + strip */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <ChevronButton
              direction="left"
              onClick={() => scrollByCards(-1)}
              disabled={scrollState.atStart}
            />
            <div className="relative flex-1 h-[2px] bg-[#0B2E22]/12 overflow-hidden rounded-full">
              <div
                ref={traceRef}
                className="absolute inset-y-0 left-0 w-full bg-[#1C8A54]"
                style={{ transform: "scaleX(0.02)", transformOrigin: "left" }}
              />
            </div>
            <ChevronButton
              direction="right"
              onClick={() => scrollByCards(1)}
              disabled={scrollState.atEnd}
            />
          </div>

          <div
            ref={stripRef}
            className="at-strip flex gap-4 overflow-x-auto p-1 -m-1"
            style={{ scrollSnapType: "x proximity", cursor: "grab" }}
          >
            {current.events.map((ev) => {
              const id = eventId(ev);
              const isOpen = openId === id;
              const accent = CATEGORY_ACCENT[ev.category] || DEFAULT_ACCENT;
              return (
                <button
                  key={id}
                  onClick={() => selectEvent(ev)}
                  className="at-card shrink-0 w-[240px] sm:w-[260px] text-left rounded-lg border-2 bg-white/60 p-4 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    scrollSnapAlign: "start",
                    borderColor: isOpen ? accent : "rgba(11,46,34,0.12)",
                    outlineColor: accent,
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: accent }}
                    />
                    <span
                      className="text-[10px] uppercase tracking-wide"
                      style={{ color: accent }}
                    >
                      {ev.category}
                    </span>
                  </div>
                  <p className="text-[15px] font-semibold text-[#0B2E22] leading-snug mb-1">
                    {ev.title}
                  </p>
                  <p className="text-[12px] text-[#57655D]">
                    {ev.date} · {ev.mode}
                  </p>
                  {ev.achievement && (
                    <p
                      className="mt-2 text-[11px] font-medium"
                      style={{ color: accent }}
                    >
                      {ev.achievement}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* detail panel — always open, content morphs on selection */}
        <div ref={detailRef} className="at-detail overflow-hidden mt-5">
          <div
            ref={contentRef}
            className="rounded-lg border border-[#0B2E22]/12 bg-white p-5"
          >
            <p className="text-lg font-semibold text-[#0B2E22]">
              {displayEvent.title}
            </p>
            {displayEvent.subtitle && (
              <p className="text-sm text-[#1C8A54] mb-2">
                {displayEvent.subtitle}
              </p>
            )}
            <p className="text-sm text-[#57655D] leading-relaxed mt-2">
              {displayEvent.description}
            </p>

            {displayEvent.highlights && (
              <div className="flex flex-wrap gap-2 mt-3">
                {displayEvent.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-[11px] px-2 py-1 rounded-full bg-[#EDF3EC] text-[#0B2E22]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}

            {(displayEvent.participants ||
              displayEvent.institutes ||
              displayEvent.duration ||
              displayEvent.speaker) && (
              <div className="flex flex-wrap gap-4 mt-3 text-[12px] text-[#57655D]">
                {displayEvent.participants && (
                  <span>{displayEvent.participants}</span>
                )}
                {displayEvent.institutes && (
                  <span>{displayEvent.institutes}</span>
                )}
                {displayEvent.duration && <span>{displayEvent.duration}</span>}
                {displayEvent.speaker && (
                  <span>Speaker: {displayEvent.speaker}</span>
                )}
              </div>
            )}

            {displayEvent.speakers && (
              <div className="mt-3 text-[12px] text-[#57655D] space-y-1">
                {displayEvent.speakers.map((s) => (
                  <p key={s}>{s}</p>
                ))}
              </div>
            )}

            {displayEvent.events && (
              <div className="mt-4 pt-4 border-t border-[#0B2E22]/10">
                <p className="text-[11px] uppercase tracking-wide text-[#1C8A54] mb-2">
                  Sub-events
                </p>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {displayEvent.events.map((sub) => (
                    <div
                      key={sub.title}
                      className="shrink-0 w-[200px] rounded-md bg-[#EDF3EC] p-3"
                    >
                      <p className="text-[13px] font-medium text-[#0B2E22]">
                        {sub.title}
                      </p>
                      <p className="text-[11px] text-[#57655D] mt-1">
                        {sub.date}
                      </p>
                      <p className="text-[11px] text-[#57655D] mt-1 leading-snug">
                        {sub.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
