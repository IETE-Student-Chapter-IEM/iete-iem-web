import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Rocket, Users } from "lucide-react";

import AnimatedHeading from "../../ui/AnimatedHeading";
import ScrollWordReveal from "../../ui/ScrollWordReveal";

gsap.registerPlugin(ScrollTrigger);

const headingWords = [{ t: "ABOUT" }, { t: "US", serif: true }];

const introText =
  "IETE Student Forum is a student-driven community bringing together curious minds interested in electronics, communication, computing and emerging technologies.";

const bodyText =
  "We create a space where students learn beyond the classroom through technical sessions, workshops, hands-on projects and collaborative activities. Our aim is simple: to turn curiosity into practical skills, ideas into experiments and students into confident builders.";

export default function About() {
  const sectionRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const tiltTweenRef = useRef(null);

  const handleMouseMove = (e) => {
    const wrap = logoWrapperRef.current;
    if (!wrap) return;

    const rect = wrap.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    wrap.style.setProperty("--spot-x", `${px}%`);
    wrap.style.setProperty("--spot-y", `${py}%`);

    tiltTweenRef.current?.kill();

    tiltTweenRef.current = gsap.to(wrap, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleMouseEnter = () => {
    logoWrapperRef.current?.classList.add("logo-hovered");
  };

  const handleMouseLeave = () => {
    const wrap = logoWrapperRef.current;
    if (!wrap) return;

    wrap.classList.remove("logo-hovered");

    wrap.style.setProperty("--spot-x", "50%");
    wrap.style.setProperty("--spot-y", "50%");

    tiltTweenRef.current?.kill();

    tiltTweenRef.current = gsap.to(wrap, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
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

      gsap.to(".about-orbit-spin", {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".about-orbit-spin-rev", {
        rotation: -360,
        duration: 55,
        repeat: -1,
        ease: "none",
      });

      const lines = gsap.utils.toArray(".circuit-line");

      lines.forEach((line) => {
        const len = line.getTotalLength();

        gsap.set(line, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });

        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.to(".circuit-node", {
        scale: 1.6,
        opacity: 0.15,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.4, repeat: -1 },
      });
    }, el);

    return () => {
      ctx.revert();
      tiltTweenRef.current?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden bg-brand-primary py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[20%] h-[450px] w-[450px] rounded-full bg-brand-accent/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[130px]" />

        <div className="about-orbit-spin absolute right-[-120px] top-[8%] h-[480px] w-[480px] rounded-full border border-white/[0.08]" />
        <div className="about-orbit-spin-rev absolute right-[-60px] top-[14%] h-[360px] w-[360px] rounded-full border border-dashed border-brand-accent/[0.25]" />

        <svg
          className="absolute inset-0 h-full w-full opacity-70"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            className="circuit-line"
            d="M -20 150 H 260 L 300 190 H 560 L 600 150 H 900"
            stroke="var(--color-brand-accent)"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
          <path
            className="circuit-line"
            d="M -20 760 H 220 L 260 720 H 520 L 560 760 H 840"
            stroke="white"
            strokeOpacity="0.15"
            strokeWidth="1.5"
          />
          <path
            className="circuit-line"
            d="M 1620 260 H 1240 L 1200 300 H 980 L 940 260 H 760"
            stroke="var(--color-brand-accent)"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
          <path
            className="circuit-line"
            d="M 1620 640 H 1300 L 1260 600 H 1040"
            stroke="white"
            strokeOpacity="0.12"
            strokeWidth="1.5"
          />

          <circle
            className="circuit-node"
            cx="300"
            cy="190"
            r="4"
            fill="var(--color-brand-accent)"
          />
          <circle
            className="circuit-node"
            cx="900"
            cy="150"
            r="3.5"
            fill="white"
            fillOpacity="0.5"
          />
          <circle
            className="circuit-node"
            cx="260"
            cy="720"
            r="4"
            fill="white"
            fillOpacity="0.4"
          />
          <circle
            className="circuit-node"
            cx="1200"
            cy="300"
            r="4"
            fill="var(--color-brand-accent)"
          />
          <circle
            className="circuit-node"
            cx="1040"
            cy="600"
            r="3.5"
            fill="white"
            fillOpacity="0.4"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid grid-cols-12 items-center gap-10 md:gap-12 lg:gap-16">
          <div className="col-span-12 flex justify-center md:col-span-5 md:justify-start">
            <div
              ref={logoWrapperRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                transformPerspective: 1000,
                "--spot-x": "50%",
                "--spot-y": "50%",
              }}
              className="about-logo-wrapper group relative flex h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-md sm:h-[360px] sm:w-[360px]"
            >
              <div className="logo-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="pointer-events-none absolute inset-4 rounded-2xl border border-dashed border-white/20" />

              <div className="absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-brand-accent transition-transform duration-300 group-hover:scale-125" />
              <div className="absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-brand-accent transition-transform duration-300 group-hover:scale-125" />
              <div className="absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-brand-accent transition-transform duration-300 group-hover:scale-125" />
              <div className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-brand-accent transition-transform duration-300 group-hover:scale-125" />

              <div className="relative z-10 flex h-full w-full items-center justify-center rounded-2xl bg-white p-5 shadow-inner">
                <img
                  src="/Logo.jpg"
                  alt="IETE Student Forum Logo"
                  onLoad={() => ScrollTrigger.refresh()}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7">
            <div className="mb-6">
              <AnimatedHeading
                words={headingWords}
                className="text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold tracking-tight text-white drop-shadow-md"
              />
            </div>

            <ScrollWordReveal
              text={introText}
              className="mb-6 max-w-3xl text-lg font-semibold leading-relaxed text-white sm:text-xl md:text-2xl"
              dimOpacity={0.35}
            />

            <div className="mb-6 h-[2px] w-24 bg-gradient-to-r from-brand-accent via-white/40 to-transparent" />

            <ScrollWordReveal
              text={bodyText}
              className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
              dimOpacity={0.25}
            />

            <div className="about-stat-grid mt-10 grid grid-cols-1 gap-3 border-t border-white/15 pt-8 sm:grid-cols-3">
              <div className="about-stat-card group rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/50 hover:bg-white/10">
                <Users className="h-5 w-5 text-brand-accent" />
                <span className="mt-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Community
                </span>
                <span className="mt-0.5 block text-sm font-bold text-white">
                  Student Driven
                </span>
              </div>

              <div className="about-stat-card group rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/50 hover:bg-white/10">
                <Cpu className="h-5 w-5 text-brand-accent" />
                <span className="mt-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Focus
                </span>
                <span className="mt-0.5 block text-sm font-bold text-white">
                  Tech & Innovation
                </span>
              </div>

              <div className="about-stat-card group rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/50 hover:bg-white/10">
                <Rocket className="h-5 w-5 text-brand-accent" />
                <span className="mt-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Approach
                </span>
                <span className="mt-0.5 block text-sm font-bold text-white">
                  Learn · Build · Lead
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .logo-spotlight { background: radial-gradient(300px circle at var(--spot-x) var(--spot-y), rgba(255,255,255,0.18), transparent 80%); }
      `}</style>
    </section>
  );
}
