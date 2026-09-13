import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { TIER_STYLES } from "../../../lib/team";

export default function TeamCard({ member, compact = false }) {
  if (!member) return null;

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

  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    member?.image || "/coreTeam/placeholder.jpg",
  );
  const [nameFontSize, setNameFontSize] = useState(null);

  const tierStyle = TIER_STYLES[member?.tier] || TIER_STYLES?.advisor || "";
  const tierDotClass = tierStyle.match(/bg-\S+/)?.[0] || "bg-slate-400";
  const hasSocials = Boolean(member?.linkedin || member?.instagram);
  const hasBio = Boolean(member?.bio);

  const nameChars = useMemo(
    () =>
      (member?.name || "").split("").map((ch, i) => (
        <span key={`${ch}-${i}`} className="name-char inline-block">
          {ch === " " ? "\u00A0" : ch}
        </span>
      )),
    [member?.name],
  );

  /* Fit Vertical Name Inside Photo Container Height */
  useEffect(() => {
    const container = photoBoxRef.current;
    const text = nameTextRef.current;
    if (!container || !text) return;

    const VERTICAL_PADDING = compact ? 18 : 24;
    const MIN_FONT_SIZE = compact ? 11 : 14;

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
  }, [member?.name, compact]);

  /* GSAP Hover & Touch Animation Timeline */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const charEls = gsap.utils.toArray(".name-char", cardRef.current);
      const hoverItems = gsap.utils.toArray(".hover-item", cardRef.current);

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

      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(nameRef.current, { opacity: 1 });
      gsap.set(charEls, { opacity: 0, y: 16, rotateZ: 4 });
      gsap.set(hoverPanelRef.current, { yPercent: 100 });
      gsap.set(hoverPanelContentRef.current, { opacity: 1, y: 0 });
      gsap.set(hoverItems, { opacity: 0, y: 10 });
      gsap.set(outerRoleRef.current, { opacity: 1, letterSpacing: "0.08em" });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.to(
        imgRef.current,
        {
          scale: 1.07,
          filter: "brightness(0.65) saturate(1.15)",
          duration: 0.6,
        },
        0,
      )
        .to(overlayRef.current, { opacity: 1, duration: 0.4 }, 0)
        .to(
          outerRoleRef.current,
          { opacity: 0, letterSpacing: "0.2em", duration: 0.3 },
          0,
        )
        .to(
          charEls,
          {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            duration: 0.5,
            stagger: { each: 0.018, from: "end" },
            ease: "back.out(1.6)",
          },
          0.05,
        )
        .to(
          hoverPanelRef.current,
          { yPercent: 0, duration: 0.55, ease: "power4.out" },
          0.1,
        )
        .to(
          hoverItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out",
          },
          0.28,
        );

      tlRef.current = tl;
    }, cardRef);

    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, [member]);

  const handleMouseEnter = () => {
    setIsOpen(true);
    tlRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    tlRef.current?.reverse();
  };

  const handleCardClick = () => {
    if (isOpen) {
      setIsOpen(false);
      tlRef.current?.reverse();
    } else {
      setIsOpen(true);
      tlRef.current?.play();
    }
  };

  // Responsive panel height sizing tokens
  const nameClamp = compact
    ? "text-[clamp(1.5rem,3.2vw,3rem)]"
    : "text-[clamp(2.25rem,4.5vw,4.5rem)]";

  const roleTextClass = compact
    ? "text-[10px] sm:text-[11px]"
    : "text-[11px] sm:text-xs";
  const deptTextClass = compact
    ? "text-[8.5px] sm:text-[9.5px]"
    : "text-[9.5px] sm:text-[10.5px]";
  const bioTextClass = compact
    ? "text-[10px] sm:text-[11px]"
    : "text-[11px] sm:text-[12px]";

  // Expanded mobile heights: 58% / 54% height on mobile screens, 38% / 36% on desktop (sm:)
  const panelHeight = compact ? "h-[58%] sm:h-[38%]" : "h-[54%] sm:h-[36%]";

  const panelPadding = compact
    ? "px-3 py-2.5 sm:px-4 sm:py-3"
    : "px-4 py-3 sm:px-5 sm:py-4";

  const socialSize = compact
    ? "h-6 w-6 sm:h-7 sm:w-7"
    : "h-7 w-7 sm:h-8 sm:w-8";
  const socialIconSize = compact
    ? "h-2.5 w-2.5 sm:h-3 sm:w-3"
    : "h-3 w-3 sm:h-3.5 sm:w-3.5";
  const outerRoleTextClass = compact
    ? "text-xs sm:text-sm"
    : "text-sm sm:text-base";
  const outerWrapClass = compact ? "mt-2 min-h-[36px]" : "mt-3 min-h-[48px]";

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="team-card group flex flex-col cursor-pointer"
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
          alt={member?.name || "Team Member"}
          onError={() => setImgSrc("/coreTeam/placeholder.jpg")}
          className="h-full w-full object-cover will-change-transform"
        />

        {/* Gradient Overlay */}
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-brand-primary/90 via-brand-primary/30 to-transparent opacity-0"
        />

        {/* Framing Corners */}
        <div className="absolute left-3 top-3 z-40 h-2.5 w-2.5 border-l-2 border-t-2 border-white" />
        <div className="absolute right-3 top-3 z-40 h-2.5 w-2.5 border-r-2 border-t-2 border-white" />
        <div className="absolute bottom-3 left-3 z-40 h-2.5 w-2.5 border-b-2 border-l-2 border-white" />
        <div className="absolute bottom-3 right-3 z-40 h-2.5 w-2.5 border-b-2 border-r-2 border-white" />

        {/* Vertical Name */}
        <div
          ref={nameRef}
          className="pointer-events-none absolute inset-y-0 right-0 z-30 flex items-center justify-center pr-2 sm:pr-3"
        >
          <span
            ref={nameTextRef}
            style={nameFontSize ? { fontSize: `${nameFontSize}px` } : undefined}
            className={`[writing-mode:vertical-rl] whitespace-nowrap font-serif ${nameClamp} font-bold italic leading-none tracking-[0.06em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]`}
          >
            {nameChars}
          </span>
        </div>

        {/* Green Information Panel */}
        <div
          ref={hoverPanelRef}
          className={`absolute inset-x-0 bottom-0 z-20 ${panelHeight} overflow-hidden bg-brand-primary/95 backdrop-blur-md`}
        >
          <div
            ref={hoverPanelContentRef}
            className={`flex h-full flex-col items-center justify-between ${panelPadding} text-center overflow-y-auto scrollbar-none`}
          >
            <div className="flex w-full flex-col items-center">
              {/* Role Header */}
              <div
                className={`hover-item flex items-center gap-1.5 ${roleTextClass} font-bold uppercase tracking-[0.18em] text-white`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${tierDotClass}`}
                />
                {member?.role}
              </div>

              {/* Department */}
              {member?.department && (
                <p
                  className={`hover-item mt-0.5 max-w-[95%] font-mono ${deptTextClass} font-medium uppercase leading-tight tracking-[0.1em] text-white/75`}
                >
                  {member.department}
                </p>
              )}

              {/* Bio */}
              {hasBio && (
                <p
                  className={`hover-item mt-1.5 max-w-[95%] font-serif ${bioTextClass} italic leading-snug text-white/85 line-clamp-3 sm:line-clamp-2`}
                >
                  {member.bio}
                </p>
              )}
            </div>

            {/* Social Links */}
            {hasSocials && (
              <div className="hover-item mt-2 flex shrink-0 items-center gap-2.5">
                {member?.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member?.name} on LinkedIn`}
                    onClick={(e) => e.stopPropagation()}
                    className={`flex ${socialSize} items-center justify-center rounded-full border border-white/30 bg-white/15 text-white transition-all duration-200 hover:scale-110 hover:border-white hover:bg-white hover:text-blue-600`}
                  >
                    <FaLinkedinIn className={socialIconSize} />
                  </a>
                )}
                {member?.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member?.name} on Instagram`}
                    onClick={(e) => e.stopPropagation()}
                    className={`flex ${socialSize} items-center justify-center rounded-full border border-white/30 bg-white/15 text-white transition-all duration-200 hover:scale-110 hover:border-white hover:bg-white hover:text-pink-500`}
                  >
                    <FaInstagram className={socialIconSize} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Role Below Card */}
      <div className={`${outerWrapClass} px-1 text-center`}>
        <p
          ref={outerRoleRef}
          className={`font-mono ${outerRoleTextClass} font-bold uppercase leading-snug tracking-[0.08em] text-slate-600`}
        >
          {member?.role}
        </p>
      </div>
    </div>
  );
}
