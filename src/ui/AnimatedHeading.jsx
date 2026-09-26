import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedHeading({
  words,
  className = "",
  start = "top 90%",
}) {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const wordEls = gsap.utils.toArray(".ah-word", el);
      if (!wordEls.length) return;

      if (reduceMotion) {
        gsap.set(wordEls, { yPercent: 0, autoAlpha: 1 });
        return;
      }

      // Promote to their own GPU layer *before* scroll reaches them, so the
      // browser isn't forced to do that promotion mid-animation (the main
      // source of jank here). Cleared again once the animation settles.
      gsap.set(wordEls, { willChange: "transform, opacity", force3D: true });

      const animation = gsap.fromTo(
        wordEls,
        { yPercent: 110, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          paused: true,
          force3D: true,
          onComplete: () => gsap.set(wordEls, { willChange: "auto" }),
        },
      );

      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onEnter: () => animation.play(),
      });
    }, el);

    return () => ctx.revert();
  }, [words, start]);

  return (
    <h2 ref={headingRef} className={`font-extrabold ${className}`}>
      {words.map((w, i) => (
        <span
          key={i}
          className="ah-word-wrap inline-block overflow-hidden align-bottom"
        >
          <span
            className={`ah-word inline-block ${
              w.serif ? "font-serif font-medium italic" : ""
            }`}
            style={{ opacity: 0 }}
          >
            {w.t}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </h2>
  );
}
