import { colorFor, Bracketed, MetaRow } from "../../../utils";

export default function EventCard({ ev }) {
  const color = colorFor(ev.category);
  const nested = Array.isArray(ev.events) && ev.events.length > 0;

  return (
    <div className="activity-card relative pl-8 pb-10">
      {/* node soldered onto the rail */}
      <span
        className="activity-node absolute left-[-4px] top-1.5 h-[18px] w-[18px]"
        style={{
          background: color,
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          boxShadow: "0 0 0 3px #EDF3EC",
        }}
      />
      {ev.achievement && (
        <span
          className="activity-node absolute left-[-9px] top-[-2px] h-6 w-6 rounded-full border-2"
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
                  className="absolute left-[-7px] top-1 h-3 w-3 rounded-full"
                  style={{ background: "#6B4FA0" }}
                />
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
