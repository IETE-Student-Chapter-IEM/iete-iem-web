import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Rocket, Users } from "lucide-react";

import AnimatedHeading from "../../ui/AnimatedHeading";
import ScrollWordReveal from "../../ui/ScrollWordReveal";
import AboutBackground from "../sections/AboutBackground";

gsap.registerPlugin(ScrollTrigger);

const headingWords = [{ t: "ABOUT" }, { t: "US", serif: true }];

const introText =
  "IETE Student Forum is a student-driven community bringing together curious minds interested in electronics, communication, computing and emerging technologies.";

const bodyText =
  "We create a space where students learn beyond the classroom through technical sessions, workshops, hands-on projects and collaborative activities. Our aim is simple: to turn curiosity into practical skills, ideas into experiments and students into confident builders.";

export default function About() {
  const sectionRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const backgroundRef = useRef(null);

  const canHoverRef = useRef(false);

  // ---- Logo tilt ----
  const rotateXTo = useRef(null);
  const rotateYTo = useRef(null);
  const logoRafId = useRef(null);
  const pendingLogoEvent = useRef(null);
  const imageRefreshed = useRef(false);

  // ---- Section-wide background parallax ----
  const bgRafId = useRef(null);
  const pendingBgEvent = useRef(null);

  useEffect(() => {
    canHoverRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const wrap = logoWrapperRef.current;
    if (!wrap || !canHoverRef.current) return;

    rotateXTo.current = gsap.quickTo(wrap, "rotateX", {
      duration: 0.4,
      ease: "power2.out",
    });
    rotateYTo.current = gsap.quickTo(wrap, "rotateY", {
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const applyLogoTilt = () => {
    const wrap = logoWrapperRef.current;
    const e = pendingLogoEvent.current;
    logoRafId.current = null;
    if (!wrap || !e) return;

    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    wrap.style.setProperty("--spot-x", `${px}%`);
    wrap.style.setProperty("--spot-y", `${py}%`);
    rotateXTo.current?.(rx);
    rotateYTo.current?.(ry);
  };

  const handleLogoMouseMove = (e) => {
    if (!canHoverRef.current) return;
    pendingLogoEvent.current = e;
    if (logoRafId.current == null) {
      logoRafId.current = requestAnimationFrame(applyLogoTilt);
    }
  };

  const handleLogoMouseEnter = () => {
    if (!canHoverRef.current) return;
    logoWrapperRef.current?.classList.add("logo-hovered");
  };

  const handleLogoMouseLeave = () => {
    if (!canHoverRef.current) return;
    const wrap = logoWrapperRef.current;
    if (!wrap) return;

    wrap.classList.remove("logo-hovered");
    wrap.style.setProperty("--spot-x", "50%");
    wrap.style.setProperty("--spot-y", "50%");

    if (logoRafId.current != null) {
      cancelAnimationFrame(logoRafId.current);
      logoRafId.current = null;
    }

    gsap.to(wrap, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const applyBgParallax = () => {
    const section = sectionRef.current;
    const e = pendingBgEvent.current;
    bgRafId.current = null;
    if (!section || !e) return;

    const rect = section.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    backgroundRef.current?.setParallax(nx, ny);
  };

  const handleSectionMouseMove = (e) => {
    if (!canHoverRef.current) return;
    pendingBgEvent.current = e;
    if (bgRafId.current == null) {
      bgRafId.current = requestAnimationFrame(applyBgParallax);
    }
  };

  const handleSectionMouseLeave = () => {
    if (!canHoverRef.current) return;
    if (bgRafId.current != null) {
      cancelAnimationFrame(bgRafId.current);
      bgRafId.current = null;
    }
    backgroundRef.current?.reset();
  };

  const handleImageLoad = () => {
    if (imageRefreshed.current) return;
    imageRefreshed.current = true;
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-logo-wrapper",
        { x: -50, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-logo-wrapper",
            start: "top 88%",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        ".about-stat-card",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-stat-grid",
            start: "top 92%",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );
    }, el);

    return () => {
      ctx.revert();
      if (logoRafId.current != null) cancelAnimationFrame(logoRafId.current);
      if (bgRafId.current != null) cancelAnimationFrame(bgRafId.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      className="relative w-full overflow-hidden bg-brand-primary px-1 py-10 sm:py-16 md:py-20"
    >
      <AboutBackground ref={backgroundRef} />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          {/* LOGO PANEL — fluid size, centered on mobile, fixed proportions from md+ */}
          <div className="flex justify-center md:col-span-5 md:justify-start">
            <div
              ref={logoWrapperRef}
              onMouseMove={handleLogoMouseMove}
              onMouseEnter={handleLogoMouseEnter}
              onMouseLeave={handleLogoMouseLeave}
              style={{
                transformPerspective: 1000,
                willChange: "transform",
                "--spot-x": "50%",
                "--spot-y": "50%",
              }}
              className="about-logo-wrapper group relative flex aspect-square w-full max-w-[240px] items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-md sm:max-w-[300px] sm:p-6 md:max-w-[320px] lg:max-w-[360px]"
            >
              <div className="logo-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="pointer-events-none absolute inset-3 rounded-2xl border border-dashed border-white/20 sm:inset-4" />

              <div className="absolute left-2.5 top-2.5 h-2.5 w-2.5 border-l-2 border-t-2 border-brand-accent transition-transform duration-300 group-hover:scale-125 sm:left-3 sm:top-3 sm:h-3 sm:w-3" />
              <div className="absolute right-2.5 top-2.5 h-2.5 w-2.5 border-r-2 border-t-2 border-brand-accent transition-transform duration-300 group-hover:scale-125 sm:right-3 sm:top-3 sm:h-3 sm:w-3" />
              <div className="absolute bottom-2.5 left-2.5 h-2.5 w-2.5 border-b-2 border-l-2 border-brand-accent transition-transform duration-300 group-hover:scale-125 sm:bottom-3 sm:left-3 sm:h-3 sm:w-3" />
              <div className="absolute bottom-2.5 right-2.5 h-2.5 w-2.5 border-b-2 border-r-2 border-brand-accent transition-transform duration-300 group-hover:scale-125 sm:bottom-3 sm:right-3 sm:h-3 sm:w-3" />

              <div className="relative z-10 flex h-full w-full items-center justify-center rounded-2xl bg-white p-4 shadow-inner sm:p-5">
                <img
                  src="/Logo.jpg"
                  alt="IETE Student Forum Logo"
                  onLoad={handleImageLoad}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="text-center md:col-span-7 md:text-left">
            <div className="mb-5 flex justify-center sm:mb-6 md:justify-start">
              <AnimatedHeading
                words={headingWords}
                className="text-[clamp(2.25rem,9vw,4.5rem)] font-extrabold tracking-tight text-white drop-shadow-md"
              />
            </div>

            <ScrollWordReveal
              text={introText}
              className="mx-auto mb-5 max-w-md text-base font-semibold leading-relaxed text-white sm:mb-6 sm:max-w-2xl sm:text-lg md:mx-0 md:max-w-3xl md:text-xl lg:text-2xl"
              dimOpacity={0.35}
            />

            <div className="mx-auto mb-5 h-[2px] w-16 bg-gradient-to-r from-brand-accent via-white/40 to-transparent sm:mb-6 sm:w-24 md:mx-0" />

            <ScrollWordReveal
              text={bodyText}
              className="mx-auto max-w-md text-sm leading-relaxed text-white/80 sm:max-w-xl sm:text-base md:mx-0 md:max-w-2xl md:text-lg"
              dimOpacity={0.25}
            />
          </div>
        </div>
      </div>

      <style>{`
        .logo-spotlight { background: radial-gradient(300px circle at var(--spot-x) var(--spot-y), rgba(255,255,255,0.18), transparent 80%); }
      `}</style>
    </section>
  );
}
