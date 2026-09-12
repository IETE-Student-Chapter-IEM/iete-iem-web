import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { TIER_STYLES } from "../../../lib/team";

export default function TeamCard({ member }) {
  const cardRef = useRef(null);
  const photoBoxRef = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const nameRef = useRef(null);
  const nameTextRef = useRef(null);
  const roleRef = useRef(null);
  const extraWrapRef = useRef(null);
  const extraContentRef = useRef(null);
  const tlRef = useRef(null);

  const [imgSrc, setImgSrc] = useState(member.image);
  const [extraHeight, setExtraHeight] = useState(0);
  // null = use the default clamp() size from the className below.
  // A number = the shrunk px size needed so the name fits the photo height.
  const [nameFontSize, setNameFontSize] = useState(null);

  const tierStyle = TIER_STYLES[member.tier] || TIER_STYLES.advisor;
  const tierDotClass = tierStyle.match(/bg-\S+/)?.[0] || "bg-slate-400";

  const hasSocials = Boolean(member.linkedin || member.instagram);
  const hasBio = Boolean(member.bio);

  // Measure hidden content height (department/bio/socials block)
  useEffect(() => {
    if (extraContentRef.current) {
      setExtraHeight(extraContentRef.current.scrollHeight);
    }
  }, [member.department, member.bio, hasSocials]);

  // Auto-fit the big vertical name to the photo's actual height so long
  // names never get clipped by the frame's overflow-hidden. Short names
  // keep the full clamp() size; only names that would overflow get scaled
  // down, and only by exactly the amount needed.
  useEffect(() => {
    const container = photoBoxRef.current;
    const text = nameTextRef.current;
    if (!container || !text) return;

    const VERTICAL_PADDING = 24; // breathing room top/bottom, in px
    const MIN_FONT_SIZE = 14; // never shrink past legibility

    const fit = () => {
      // Reset to the CSS-defined size before measuring, so repeated runs
      // don't compound a previous shrink.
      text.style.fontSize = "";
      const available = container.clientHeight - VERTICAL_PADDING;
      const natural = text.scrollHeight;

      if (available > 0 && natural > available) {
        const baseSize = parseFloat(window.getComputedStyle(text).fontSize);
        const scaled = Math.max(
          (baseSize * available) / natural,
          MIN_FONT_SIZE,
        );
        setNameFontSize(scaled);
      } else {
        setNameFontSize(null);
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(container);
    return () => ro.disconnect();
  }, [member.name]);

  // GSAP hover animation
  useEffect(() => {
    if (!extraHeight) return;

    const ctx = gsap.context(() => {
      gsap.set(extraWrapRef.current, { height: 0, opacity: 0 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.4, ease: "power3.out" },
      });

      tl.to(
        imgRef.current,
        { scale: 1.06, filter: "brightness(0.7) saturate(1.15)" },
        0,
      )
        .to(overlayRef.current, { opacity: 1 }, 0)
        .fromTo(
          nameRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0 },
          0.05,
        )
        .to(roleRef.current, { fontSize: "0.8rem", letterSpacing: "0.18em" }, 0)
        .to(extraWrapRef.current, { height: extraHeight, opacity: 1 }, 0.08);

      tlRef.current = tl;
    }, cardRef);

    return () => ctx.revert();
  }, [extraHeight]);

  const handleEnter = () => tlRef.current?.play();
  const handleLeave = () => tlRef.current?.reverse();

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="team-card group flex flex-col"
    >
      {/* ============================================================= */}
      {/* PHOTO                                                         */}
      {/* ============================================================= */}
      <div
        ref={photoBoxRef}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-sm"
      >
        <img
          ref={imgRef}
          src={imgSrc}
          alt={member.name}
          onError={() => setImgSrc("/coreTeam/placeholder.jpg")}
          className="h-full w-full object-cover will-change-transform"
        />

        {/* Hover shade */}
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-brand-primary/20 to-transparent opacity-0"
        />

        {/* =========================================================== */}
        {/* LARGE VERTICAL NAME — auto-shrinks only if it would overflow */}
        {/* =========================================================== */}
        <div
          ref={nameRef}
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 opacity-0"
        >
          <span
            ref={nameTextRef}
            style={nameFontSize ? { fontSize: `${nameFontSize}px` } : undefined}
            className="
              [writing-mode:vertical-rl]
              whitespace-nowrap
              text-[clamp(2rem,4vw,4rem)]
              font-extrabold
              uppercase
              leading-none
              tracking-[0.12em]
              text-white
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]
            "
          >
            {member.name}
          </span>
        </div>
      </div>

      {/* ============================================================= */}
      {/* CAPTION                                                       */}
      {/* ============================================================= */}
      <div className="mt-3 flex flex-col items-center text-center">
        {/* Role */}
        <p
          ref={roleRef}
          className="flex items-center gap-1.5 text-base font-bold uppercase tracking-[0.1em] text-slate-600 sm:text-lg"
        >
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${tierDotClass}`}
          />
          {member.role}
        </p>

        {/* =========================================================== */}
        {/* HOVER DETAILS                                               */}
        {/* =========================================================== */}
        <div ref={extraWrapRef} className="w-full overflow-hidden">
          <div
            ref={extraContentRef}
            className="flex flex-col items-center gap-1.5 pt-1.5"
          >
            {/* Department */}
            <span className="text-[10px] uppercase tracking-wider text-slate-500">
              {member.department}
            </span>

            {/* Bio */}
            {hasBio && (
              <p className="line-clamp-2 max-w-[85%] text-[11px] leading-snug text-slate-500">
                {member.bio}
              </p>
            )}

            {/* Socials */}
            {hasSocials && (
              <div className="flex items-center gap-2">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <FaLinkedinIn className="h-3 w-3" />
                  </a>
                )}

                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on Instagram`}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-pink-600 hover:bg-pink-600 hover:text-white"
                  >
                    <FaInstagram className="h-3 w-3" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
