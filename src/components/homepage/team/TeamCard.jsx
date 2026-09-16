import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

const TIER_ACCENT = {
  chairman: "bg-amber-400",
  leadership: "bg-amber-400",
  coordinator: "bg-sky-400",
  core: "bg-indigo-400",
  head: "bg-teal-400",
  advisor: "bg-slate-400",
};
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
  const [isTouch, setIsTouch] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    member?.image || "/coreTeam/placeholder.jpg",
  );
  const [nameFontSize, setNameFontSize] = useState(null);

  const tierAccentClass = TIER_ACCENT[member?.tier] || "bg-slate-400";
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

  /* Detect touch/coarse-pointer devices once on mount */
  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches);
  }, []);

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
    if (isTouch) return;
    setIsOpen(true);
    tlRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    setIsOpen(false);
    tlRef.current?.reverse();
  };

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) tlRef.current?.play();
      else tlRef.current?.reverse();
      return next;
    });
  };

  const handleCardClick = () => {
    if (!isTouch && isOpen) {
      setIsOpen(false);
      tlRef.current?.reverse();
      return;
    }
    toggleOpen();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOpen();
    }
  };

  // Responsive typography tokens
  const nameClamp = compact
    ? "text-[clamp(1.5rem,3.2vw,3rem)]"
    : "text-[clamp(2.25rem,4.5vw,4.5rem)]";

  const roleTextClass = compact
    ? "text-[11px] sm:text-xs"
    : "text-xs sm:text-sm";
  const deptTextClass = compact
    ? "text-[9px] sm:text-[10px]"
    : "text-[10px] sm:text-[11px]";
  const bioTextClass = compact
    ? "text-[10.5px] sm:text-[11px]"
    : "text-[11.5px] sm:text-[12px]";

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
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={`${member?.name || "Team member"} — ${member?.role || ""}`}
      className="team-card group flex w-full flex-col cursor-pointer select-none outline-none"
    >
      {/* Photo Frame */}
      <div
        ref={photoBoxRef}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-sm transition-transform duration-150 active:scale-[0.98] sm:active:scale-100"
      >
        {/* Main Image */}
        <img
          ref={imgRef}
          src={imgSrc}
          alt={member?.name || "Team Member"}
          onError={() => setImgSrc("/coreTeam/placeholder.jpg")}
          className="h-full w-full object-cover will-change-transform"
          draggable={false}
        />

        {/* Gradient Overlay */}
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-brand-primary/90 via-brand-primary/30 to-transparent opacity-0"
        />

        {/* Framing Corners */}
        <div className="absolute left-3 top-3 z-40 h-2.5 w-2.5 border-l-2 border-t-2 border-white/80" />
        <div className="absolute right-3 top-3 z-40 h-2.5 w-2.5 border-r-2 border-t-2 border-white/80" />
        <div className="absolute bottom-3 left-3 z-40 h-2.5 w-2.5 border-b-2 border-l-2 border-white/80" />
        <div className="absolute bottom-3 right-3 z-40 h-2.5 w-2.5 border-b-2 border-r-2 border-white/80" />

        {/* Tap hint for touch screens */}
        {isTouch && (
          <div
            className={`pointer-events-none absolute right-3 top-3 z-40 flex h-6 w-6 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm transition-opacity duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          >
            <span className="text-[11px] font-bold leading-none text-white">
              +
            </span>
          </div>
        )}

        {/* Vertical Name */}
        <div
          ref={nameRef}
          className="pointer-events-none absolute top-1/2 right-0 z-30 flex -translate-y-1/2 items-center justify-center pr-2 sm:pr-3"
        >
          <span
            ref={nameTextRef}
            style={nameFontSize ? { fontSize: `${nameFontSize}px` } : undefined}
            className={`[writing-mode:vertical-rl] whitespace-nowrap font-serif ${nameClamp} font-bold italic leading-none tracking-[0.06em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]`}
          >
            {nameChars}
          </span>
        </div>

        {/* Information Panel */}
        <div
          ref={hoverPanelRef}
          className="absolute inset-x-0 bottom-0 z-20 max-h-[85%] overflow-hidden rounded-t-xl bg-brand-primary/95 shadow-[0_-8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/15"
        >
          <div
            ref={hoverPanelContentRef}
            className={`flex max-h-[70vh] flex-col items-center gap-1.5 ${panelPadding} overflow-y-auto text-center scrollbar-none`}
          >
            <div className="hover-item flex flex-col items-center gap-1.5">
              <h3
                className={`font-mono ${roleTextClass} font-extrabold uppercase leading-tight tracking-[0.15em] text-white`}
              >
                {member?.role}
              </h3>
              <span className={`h-[3px] w-8 rounded-full ${tierAccentClass}`} />
            </div>

            {member?.department && (
              <p
                className={`hover-item max-w-[95%] font-mono ${deptTextClass} font-medium uppercase leading-tight tracking-[0.1em] text-white/70 line-clamp-2`}
              >
                {member.department}
              </p>
            )}

            {hasBio && (
              <p
                className={`hover-item mt-0.5 hidden max-w-[95%] font-serif ${bioTextClass} italic leading-snug text-white/85 line-clamp-2 sm:block`}
              >
                {member.bio}
              </p>
            )}

            {/* Social Links */}
            {hasSocials && (
              <div className="hover-item mt-1 flex shrink-0 items-center gap-2.5">
                {member?.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member?.name} on LinkedIn`}
                    onClick={(e) => e.stopPropagation()}
                    className={`flex ${socialSize} items-center justify-center rounded-full border border-white/30 bg-white/15 text-white transition-all duration-200 hover:scale-110 hover:border-white hover:bg-white hover:text-blue-600 active:scale-95`}
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
                    className={`flex ${socialSize} items-center justify-center rounded-full border border-white/30 bg-white/15 text-white transition-all duration-200 hover:scale-110 hover:border-white hover:bg-white hover:text-pink-500 active:scale-95`}
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
