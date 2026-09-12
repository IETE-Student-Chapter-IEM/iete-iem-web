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
  const hoverPanelRef = useRef(null);
  const hoverPanelContentRef = useRef(null);
  const outerRoleRef = useRef(null);
  const tlRef = useRef(null);

  const [imgSrc, setImgSrc] = useState(member.image);
  const [nameFontSize, setNameFontSize] = useState(null);

  const tierStyle = TIER_STYLES[member.tier] || TIER_STYLES.advisor;
  const tierDotClass = tierStyle.match(/bg-\S+/)?.[0] || "bg-slate-400";
  const hasSocials = Boolean(member.linkedin || member.instagram);
  const hasBio = Boolean(member.bio);

  /* Fit Vertical Name Inside Photo Container Height */
  useEffect(() => {
    const container = photoBoxRef.current;
    const text = nameTextRef.current;
    if (!container || !text) return;

    const VERTICAL_PADDING = 24;
    const MIN_FONT_SIZE = 14;

    const fit = () => {
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

  /* GSAP Hover Animation Timeline */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (
        !imgRef.current ||
        !overlayRef.current ||
        !nameRef.current ||
        !hoverPanelRef.current ||
        !hoverPanelContentRef.current ||
        !outerRoleRef.current
      ) {
        return;
      }

      /* Initial setup */
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(nameRef.current, { opacity: 0, x: 20 });
      gsap.set(hoverPanelRef.current, { yPercent: 100 });
      gsap.set(hoverPanelContentRef.current, { opacity: 0, y: 12 });
      gsap.set(outerRoleRef.current, { opacity: 1 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.to(
        imgRef.current,
        {
          scale: 1.06,
          filter: "brightness(0.72) saturate(1.1)",
          duration: 0.55,
        },
        0,
      )
        .to(overlayRef.current, { opacity: 1, duration: 0.4 }, 0)
        /* Fade out the outer role label cleanly while keeping layout height intact */
        .to(outerRoleRef.current, { opacity: 0, duration: 0.25 }, 0)
        /* Reveal name on top of green panel */
        .to(nameRef.current, { opacity: 1, x: 0, duration: 0.45 }, 0.08)
        /* Slide up green info panel */
        .to(hoverPanelRef.current, { yPercent: 0, duration: 0.5 }, 0.08)
        .to(
          hoverPanelContentRef.current,
          { opacity: 1, y: 0, duration: 0.35 },
          0.3,
        );

      tlRef.current = tl;
    }, cardRef);

    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, [member]);

  const handleEnter = () => tlRef.current?.play();
  const handleLeave = () => tlRef.current?.reverse();

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="team-card group flex flex-col"
    >
      {/* Photo Frame */}
      <div
        ref={photoBoxRef}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-sm"
      >
        {/* Main Image */}
        <img
          ref={imgRef}
          src={imgSrc}
          alt={member.name}
          onError={() => setImgSrc("/coreTeam/placeholder.jpg")}
          className="h-full w-full object-cover will-change-transform"
        />

        {/* Gradient Overlay */}
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-brand-primary/90 via-brand-primary/25 to-transparent opacity-0"
        />

        {/* Framing Corners */}
        <div className="absolute left-3 top-3 z-40 h-2.5 w-2.5 border-l-2 border-t-2 border-white" />
        <div className="absolute right-3 top-3 z-40 h-2.5 w-2.5 border-r-2 border-t-2 border-white" />
        <div className="absolute bottom-3 left-3 z-40 h-2.5 w-2.5 border-b-2 border-l-2 border-white" />
        <div className="absolute bottom-3 right-3 z-40 h-2.5 w-2.5 border-b-2 border-r-2 border-white" />

        {/* Vertical Name (z-30 to stay above z-20 green banner) */}
        <div
          ref={nameRef}
          className="pointer-events-none absolute inset-y-0 right-0 z-30 flex items-center justify-center pr-3 opacity-0"
        >
          <span
            ref={nameTextRef}
            style={nameFontSize ? { fontSize: `${nameFontSize}px` } : undefined}
            className="[writing-mode:vertical-rl] whitespace-nowrap text-[clamp(2.5rem,5vw,5rem)] font-extrabold uppercase leading-none tracking-[0.12em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
          >
            {member.name}
          </span>
        </div>

        {/* Green Information Panel */}
        <div
          ref={hoverPanelRef}
          className="absolute inset-x-0 bottom-0 z-20 h-[42%] overflow-hidden bg-brand-primary/95 backdrop-blur-sm"
        >
          <div
            ref={hoverPanelContentRef}
            className="flex h-full flex-col items-center justify-end px-4 pb-4 pt-3 text-center"
          >
            {/* Role Header */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${tierDotClass}`}
              />
              {member.role}
            </div>

            {/* Department */}
            {member.department && (
              <p className="mt-1 max-w-[95%] text-[9px] font-medium uppercase leading-tight tracking-[0.08em] text-white/70">
                {member.department}
              </p>
            )}

            {/* Bio */}
            {hasBio && (
              <p className="mt-1.5 line-clamp-2 max-w-[92%] text-[10px] leading-snug text-white/65">
                {member.bio}
              </p>
            )}

            {/* Social Links */}
            {hasSocials && (
              <div className="mt-2.5 flex items-center gap-2">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-all duration-200 hover:border-white hover:bg-white hover:text-blue-600"
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
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-all duration-200 hover:border-white hover:bg-white hover:text-pink-500"
                  >
                    <FaInstagram className="h-3 w-3" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Role Below Card (Flex layout dynamically adjusts height for multi-line roles) */}
      <div className="mt-3 min-h-[48px] px-1 text-center">
        <p
          ref={outerRoleRef}
          className="text-sm font-bold uppercase leading-snug tracking-[0.08em] text-slate-600 sm:text-base"
        >
          {member.role}
        </p>
      </div>
    </div>
  );
}
