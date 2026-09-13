import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEPTH = {
  blobs: 10,
  orbits: 18,
  particles: 32,
};

const PARTICLES = [
  { top: "18%", left: "10%", size: 6 },
  { top: "72%", left: "14%", size: 4 },
  { top: "30%", left: "22%", size: 3.5 },
  { top: "58%", left: "6%", size: 5 },
  { top: "12%", left: "82%", size: 5 },
  { top: "68%", left: "88%", size: 4 },
  { top: "45%", left: "92%", size: 4.5 },
  { top: "82%", left: "76%", size: 5 },
  { top: "25%", left: "55%", size: 3.5 },
  { top: "60%", left: "48%", size: 4 },
];

const AboutBackground = forwardRef(function AboutBackground(_props, ref) {
  const rootRef = useRef(null);
  const blobsRef = useRef(null);
  const orbitsRef = useRef(null);
  const particlesRef = useRef(null);
  const spotlightRef = useRef(null);

  const blobsXTo = useRef(null);
  const blobsYTo = useRef(null);
  const orbitsXTo = useRef(null);
  const orbitsYTo = useRef(null);
  const particlesXTo = useRef(null);
  const particlesYTo = useRef(null);
  const spotXTo = useRef(null);
  const spotYTo = useRef(null);

  useImperativeHandle(ref, () => ({
    setParallax(nx, ny, px = 0, py = 0) {
      blobsXTo.current?.(nx * DEPTH.blobs);
      blobsYTo.current?.(ny * DEPTH.blobs);
      orbitsXTo.current?.(nx * DEPTH.orbits);
      orbitsYTo.current?.(ny * DEPTH.orbits);
      particlesXTo.current?.(nx * DEPTH.particles);
      particlesYTo.current?.(ny * DEPTH.particles);

      spotXTo.current?.(px);
      spotYTo.current?.(py);
    },
    reset() {
      blobsXTo.current?.(0);
      blobsYTo.current?.(0);
      orbitsXTo.current?.(0);
      orbitsYTo.current?.(0);
      particlesXTo.current?.(0);
      particlesYTo.current?.(0);
    },
  }));

  useEffect(() => {
    // Optimized GSAP quickTo duration and easing for lower frame latency
    const ease = "power2.out";

    if (blobsRef.current) {
      blobsXTo.current = gsap.quickTo(blobsRef.current, "x", {
        duration: 0.5,
        ease,
      });
      blobsYTo.current = gsap.quickTo(blobsRef.current, "y", {
        duration: 0.5,
        ease,
      });
    }
    if (orbitsRef.current) {
      orbitsXTo.current = gsap.quickTo(orbitsRef.current, "x", {
        duration: 0.4,
        ease,
      });
      orbitsYTo.current = gsap.quickTo(orbitsRef.current, "y", {
        duration: 0.4,
        ease,
      });
    }
    if (particlesRef.current) {
      particlesXTo.current = gsap.quickTo(particlesRef.current, "x", {
        duration: 0.3,
        ease,
      });
      particlesYTo.current = gsap.quickTo(particlesRef.current, "y", {
        duration: 0.3,
        ease,
      });
    }
    if (spotlightRef.current) {
      spotXTo.current = gsap.quickTo(spotlightRef.current, "x", {
        duration: 0.2,
        ease,
      });
      spotYTo.current = gsap.quickTo(spotlightRef.current, "y", {
        duration: 0.2,
        ease,
      });
    }
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Glow Blobs Drifting
      gsap.to(".about-blob-1", {
        x: 40,
        y: 30,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".about-blob-2", {
        x: -40,
        y: -30,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Orbits Spinning
      gsap.to(".about-orbit-spin", {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".about-orbit-spin-rev", {
        rotation: -360,
        duration: 50,
        repeat: -1,
        ease: "none",
      });

      // Circuit lines draw-in
      const lines = gsap.utils.toArray(".circuit-line", el);
      lines.forEach((line) => {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
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

      // Continuous Energy Pulses flowing along circuit paths
      gsap.to(".circuit-pulse", {
        strokeDashoffset: -400,
        duration: 4,
        repeat: -1,
        ease: "none",
        stagger: 0.8,
      });

      // Node pulsing
      gsap.to(".circuit-node", {
        scale: 1.5,
        opacity: 0.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.3, repeat: -1 },
      });

      // Particle Animation
      const particles = gsap.utils.toArray(".about-particle", el);
      particles.forEach((p, i) => {
        const dx = 12 + ((i * 7) % 15);
        const dy = 15 + ((i * 5) % 12);
        const dur = 3.5 + (i % 4) * 0.8;

        gsap.to(p, {
          x: dx,
          y: -dy,
          duration: dur,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: (i % 4) * 0.2,
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 overflow-hidden translate-z-0"
    >
      {/* Optimized Radial Gradient Spotlight (No heavy CSS blur filter) */}
      <div
        ref={spotlightRef}
        className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Depth Layer: Glow Blobs (Reduced blur radius, pre-composited GPU layer) */}
      <div ref={blobsRef} className="absolute inset-0 will-change-transform">
        <div className="about-blob-1 absolute left-[-5%] top-[10%] h-[550px] w-[550px] rounded-full bg-brand-accent/10 blur-[70px] transform-gpu" />
        <div className="about-blob-2 absolute bottom-[-5%] right-[-5%] h-[550px] w-[550px] rounded-full bg-emerald-500/10 blur-[70px] transform-gpu" />
      </div>

      {/* Tech Grid Background Overlay (Pre-rendered static pattern) */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black 40%, transparent 90%)",
        }}
      />

      {/* Depth Layer: Orbit Rings */}
      <div ref={orbitsRef} className="absolute inset-0 will-change-transform">
        <div className="about-orbit-spin absolute right-[-100px] top-[5%] h-[520px] w-[520px] rounded-full border border-white/[0.07] transform-gpu" />
        <div className="about-orbit-spin-rev absolute right-[-40px] top-[12%] h-[400px] w-[400px] rounded-full border border-dashed border-brand-accent/[0.2] transform-gpu" />
      </div>

      {/* Circuit Diagram */}
      <svg
        className="absolute inset-0 h-full w-full opacity-60"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          className="circuit-line"
          d="M -20 150 H 260 L 300 190 H 560 L 600 150 H 900"
          stroke="var(--color-brand-accent)"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
        <path
          className="circuit-line"
          d="M -20 760 H 220 L 260 720 H 520 L 560 760 H 840"
          stroke="white"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />
        <path
          className="circuit-line"
          d="M 1620 260 H 1240 L 1200 300 H 980 L 940 260 H 760"
          stroke="var(--color-brand-accent)"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
        <path
          className="circuit-line"
          d="M 1620 640 H 1300 L 1260 600 H 1040"
          stroke="white"
          strokeOpacity="0.1"
          strokeWidth="1.5"
        />

        <path
          className="circuit-pulse"
          d="M -20 150 H 260 L 300 190 H 560 L 600 150 H 900"
          stroke="var(--color-brand-accent)"
          strokeWidth="2"
          strokeDasharray="30 370"
        />
        <path
          className="circuit-pulse"
          d="M 1620 260 H 1240 L 1200 300 H 980 L 940 260 H 760"
          stroke="#ffffff"
          strokeWidth="2"
          strokeDasharray="40 360"
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

      {/* Depth Layer: Floating Particles (Zero Box-Shadows) */}
      <div
        ref={particlesRef}
        className="absolute inset-0 will-change-transform"
      >
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="about-particle absolute rounded-full transform-gpu"
            style={{
              top: p.top,
              left: p.left,
              width: p.size * 2,
              height: p.size * 2,
              background:
                "radial-gradient(circle, rgba(16,185,129,0.9) 0%, rgba(16,185,129,0) 70%)",
            }}
          />
        ))}
      </div>
    </div>
  );
});

export default AboutBackground;
