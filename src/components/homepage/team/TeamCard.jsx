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
  const extraContentRef = useRef(null);
  const tlRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(member.image);
  const [nameFontSize, setNameFontSize] = useState(null);
  const tierStyle = TIER_STYLES[member.tier] || TIER_STYLES.advisor;
  const tierDotClass = tierStyle.match(/bg-\S+/)?.[0] || "bg-slate-400";
  const hasSocials = Boolean(member.linkedin || member.instagram);
  const hasBio = Boolean(member.bio);
  /* * Fit the vertical name inside the image. */ useEffect(() => {
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
  /* * GSAP hover animation. * * IMPORTANT: * We do NOT animate height anymore. * The details section has a fixed height, * so the grid never shifts. */ useEffect(() => {
    const ctx = gsap.context(() => {
      if (
        !imgRef.current ||
        !overlayRef.current ||
        !nameRef.current ||
        !roleRef.current ||
        !extraContentRef.current
      ) {
        return;
      }
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(nameRef.current, { opacity: 0, x: 20 });
      gsap.set(extraContentRef.current, { opacity: 0, y: 8 });
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
        .to(nameRef.current, { opacity: 1, x: 0 }, 0.05)
        .to(roleRef.current, { fontSize: "0.8rem", letterSpacing: "0.18em" }, 0)
        .to(
          extraContentRef.current,
          { opacity: 1, y: 0, duration: 0.35 },
          0.08,
        );
      tlRef.current = tl;
    }, cardRef);
    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, [member]);
  const handleEnter = () => {
    tlRef.current?.play();
  };
  const handleLeave = () => {
    tlRef.current?.reverse();
  };
  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="team-card group flex flex-col"
    >
      {" "}
      {/* ========================= PHOTO ========================== */}{" "}
      <div
        ref={photoBoxRef}
        className=" relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-sm "
      >
        {" "}
        <img
          ref={imgRef}
          src={imgSrc}
          alt={member.name}
          onError={() => setImgSrc("/coreTeam/placeholder.jpg")}
          className=" h-full w-full object-cover will-change-transform "
        />{" "}
        {/* Gradient overlay */}{" "}
        <div
          ref={overlayRef}
          className=" pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-brand-primary/20 to-transparent opacity-0 "
        />{" "}
        {/* Corner brackets */}{" "}
        <div className="absolute left-3 top-3 z-20 h-2.5 w-2.5 border-l-2 border-t-2 border-white" />{" "}
        <div className="absolute right-3 top-3 z-20 h-2.5 w-2.5 border-r-2 border-t-2 border-white" />{" "}
        <div className="absolute bottom-3 left-3 z-20 h-2.5 w-2.5 border-b-2 border-l-2 border-white" />{" "}
        <div className="absolute bottom-3 right-3 z-20 h-2.5 w-2.5 border-b-2 border-r-2 border-white" />{" "}
        {/* ========================= VERTICAL NAME ========================== */}{" "}
        <div
          ref={nameRef}
          className=" pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center justify-center pr-3 opacity-0 "
        >
          {" "}
          <span
            ref={nameTextRef}
            style={nameFontSize ? { fontSize: `${nameFontSize}px` } : undefined}
            className=" [writing-mode:vertical-rl] whitespace-nowrap text-[clamp(2.5rem,5vw,5rem)] font-extrabold uppercase leading-none tracking-[0.12em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] "
          >
            {" "}
            {member.name}{" "}
          </span>{" "}
        </div>{" "}
      </div>{" "}
      {/* ========================= ROLE ========================== */}{" "}
      <div className="mt-3 flex flex-col items-center text-center">
        {" "}
        <p
          ref={roleRef}
          className=" flex items-center gap-1.5 text-base font-bold uppercase tracking-[0.1em] text-slate-600 sm:text-lg "
        >
          {" "}
          <span
            className={` h-1.5 w-1.5 shrink-0 rounded-full ${tierDotClass} `}
          />{" "}
          {member.role}{" "}
        </p>{" "}
        {/* ========================= FIXED DETAILS AREA This ALWAYS occupies space. Therefore hovering does NOT change the card/grid height. ========================== */}{" "}
        <div className=" relative h-[76px] w-full overflow-hidden ">
          {" "}
          <div
            ref={extraContentRef}
            className=" absolute inset-0 flex flex-col items-center justify-start gap-1.5 pt-1.5 opacity-0 "
          >
            {" "}
            {/* Department */}{" "}
            {member.department && (
              <span className=" max-w-[95%] text-center text-[10px] uppercase leading-tight tracking-wider text-slate-500 ">
                {" "}
                {member.department}{" "}
              </span>
            )}{" "}
            {/* Bio */}{" "}
            {hasBio && (
              <p className=" line-clamp-2 max-w-[90%] text-[11px] leading-snug text-slate-500 ">
                {" "}
                {member.bio}{" "}
              </p>
            )}{" "}
            {/* Socials */}{" "}
            {hasSocials && (
              <div className="flex items-center gap-2 pt-0.5">
                {" "}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className=" flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white "
                  >
                    {" "}
                    <FaLinkedinIn className="h-3 w-3" />{" "}
                  </a>
                )}{" "}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on Instagram`}
                    className=" flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-pink-600 hover:bg-pink-600 hover:text-white "
                  >
                    {" "}
                    <FaInstagram className="h-3 w-3" />{" "}
                  </a>
                )}{" "}
              </div>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
