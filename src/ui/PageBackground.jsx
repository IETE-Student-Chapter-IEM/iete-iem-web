export default function PageBackground({ children }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-tint">
      <svg
        className="pointer-events-none absolute inset-x-0 top-16 h-[calc(100%-4rem)] w-full lg:hidden"
        viewBox="0 0 400 700"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* Outer triangle */}
        <path
          d="M 200 90 L 330 310 L 70 310 Z"
          stroke="var(--color-brand-primary)"
          strokeWidth="1.5"
          opacity="0.10"
        />

        {/* Middle triangle */}
        <path
          d="M 200 135 L 300 295 L 100 295 Z"
          stroke="var(--color-brand-accent)"
          strokeWidth="1.5"
          opacity="0.12"
        />

        {/* Inner filled triangle */}
        <path
          d="M 200 180 L 270 280 L 130 280 Z"
          fill="var(--color-brand-accent)"
          opacity="0.05"
        />

        {/* Corner nodes */}
        <circle
          cx="200"
          cy="90"
          r="3.5"
          fill="var(--color-brand-accent)"
          opacity="0.3"
        />

        <circle
          cx="330"
          cy="310"
          r="3.5"
          fill="var(--color-brand-accent)"
          opacity="0.3"
        />

        <circle
          cx="70"
          cy="310"
          r="3.5"
          fill="var(--color-brand-accent)"
          opacity="0.3"
        />
      </svg>
      <svg
        className="pointer-events-none absolute inset-x-0 top-16 hidden h-[calc(100%-4rem)] w-full opacity-[0.2] lg:block"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Top-left */}
        <path
          d="M -20 70 H 300 L 340 110 H 620"
          stroke="var(--color-brand-accent)"
          strokeWidth="2"
        />

        <circle cx="340" cy="110" r="4" fill="var(--color-brand-accent)" />

        {/* Bottom-left */}
        <path
          d="M -20 840 H 260 L 300 800 H 560"
          stroke="var(--color-brand-accent)"
          strokeWidth="2"
        />

        <circle cx="300" cy="800" r="4" fill="var(--color-brand-accent)" />

        {/* Top-right */}
        <path
          d="M 1620 60 H 1180 L 1140 100 H 980"
          stroke="var(--color-brand-primary)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />

        <circle
          cx="1140"
          cy="100"
          r="3.5"
          fill="var(--color-brand-primary)"
          fillOpacity="0.5"
        />
      </svg>
      <svg
        className="pointer-events-none absolute inset-x-0 top-16 mx-auto hidden h-[calc(100%-4rem)] max-w-7xl lg:block"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* Outer triangle */}
        <path
          d="M 800 130 L 1140 660 L 460 660 Z"
          stroke="var(--color-brand-primary)"
          strokeWidth="2"
          opacity="0.14"
        />

        {/* Middle triangle */}
        <path
          d="M 800 240 L 1050 620 L 550 620 Z"
          stroke="var(--color-brand-accent)"
          strokeWidth="2"
          opacity="0.18"
        />

        {/* Inner triangle */}
        <path
          d="M 800 350 L 955 580 L 645 580 Z"
          fill="var(--color-brand-accent)"
          opacity="0.07"
        />

        {/* Top node */}
        <circle
          cx="800"
          cy="130"
          r="5"
          fill="var(--color-brand-accent)"
          opacity="0.4"
        />

        {/* Right node */}
        <circle
          cx="1140"
          cy="660"
          r="5"
          fill="var(--color-brand-accent)"
          opacity="0.4"
        />

        {/* Left node */}
        <circle
          cx="460"
          cy="660"
          r="5"
          fill="var(--color-brand-accent)"
          opacity="0.4"
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </main>
  );
}
