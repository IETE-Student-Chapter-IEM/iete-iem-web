export const CATEGORY_COLOR = {
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
export const colorFor = (cat) => CATEGORY_COLOR[cat] || "#1C8A54";

export function Bracketed({ children, className = "" }) {
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

export function MetaRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-[11px] leading-4">
      <span className="uppercase tracking-wide text-[#57655D]/70 shrink-0">{label}</span>
      <span className="text-[#16211C]/80">{Array.isArray(value) ? value.join(" · ") : value}</span>
    </div>
  );
}
