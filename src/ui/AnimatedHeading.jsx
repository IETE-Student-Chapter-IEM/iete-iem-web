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

    const ctx = gsap.context(() => {
      const wordEls = gsap.utils.toArray(".ah-word", el);

      if (!wordEls.length) return;

      const animation = gsap.fromTo(
        wordEls,
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
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
          >
            {w.t}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </h2>
  );
}
