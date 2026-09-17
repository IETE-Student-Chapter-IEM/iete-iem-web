import { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { activitiesData } from "../../lib/activitiesData";
import EventCard from "../homepage/achivement/Eventcard";

gsap.registerPlugin(ScrollTrigger);

export default function ActivitiesTimeline({ data = activitiesData }) {
  const [activeYear, setActiveYear] = useState(data[0].year);
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const current = data.find((y) => y.year === activeYear) || data[0];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(railRef.current, { scaleY: 0, transformOrigin: "top" });
      gsap.set(".activity-node", { scale: 0 });
      gsap.set(".activity-card", { opacity: 0, y: 16 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        })
        .to(railRef.current, { scaleY: 1, duration: 0.9, ease: "power2.out" })
        .to(
          ".activity-node",
          { scale: 1, duration: 0.35, stagger: 0.12, ease: "back.out(2.4)" },
          "-=0.55",
        )
        .to(
          ".activity-card",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: "power2.out",
          },
          "<0.05",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeYear]);

  return (
    <section ref={sectionRef} className="bg-[#EDF3EC] px-4 sm:px-8 py-14">
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
          />
          <div key={activeYear}>
            {current.events.map((ev) => (
              <EventCard ev={ev} key={ev.title + ev.date} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
