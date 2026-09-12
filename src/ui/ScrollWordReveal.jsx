import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollWordReveal({
  text,
  className = "",
  start = "top 88%",
  dimOpacity = 0.18,
}) {
  const containerRef = useRef(null);

  const words = useMemo(() => text.trim().split(/\s+/), [text]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const wordEls = gsap.utils.toArray(".sr-word", el);

      if (!wordEls.length) return;

      const animation = gsap.fromTo(
        wordEls,
        {
          opacity: dimOpacity,
          filter: "blur(3px)",
          y: 6,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.5,
          stagger: 0.035,
          ease: "power2.out",
          paused: true,
        },
      );

      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        invalidateOnRefresh: true,

        onEnter: () => {
          animation.play();
        },
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [words, start, dimOpacity]);

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="sr-word mr-[0.28em] inline-block">
          {word}
        </span>
      ))}
    </p>
  );
}
