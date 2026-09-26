import { useEffect, useState, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Activities", href: "#activities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
];

const OFFSET = 76;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  const clickLock = useRef(false);
  const lockTimeout = useRef(null);

  const computeActive = () => {
    let current = NAV_LINKS[0].href;

    for (const link of NAV_LINKS) {
      const el = document.querySelector(link.href);

      if (el && el.getBoundingClientRect().top <= OFFSET) {
        current = link.href;
      }
    }

    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

    if (atBottom) {
      current = NAV_LINKS[NAV_LINKS.length - 1].href;
    }

    return current;
  };

  const releaseLock = () => {
    clickLock.current = false;

    if (lockTimeout.current) {
      clearTimeout(lockTimeout.current);
      lockTimeout.current = null;
    }

    setActiveSection(computeActive());
  };

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      if (clickLock.current) return;

      setActiveSection(computeActive());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Cancel click lock when user manually scrolls
  useEffect(() => {
    const cancelLock = () => {
      if (clickLock.current) {
        releaseLock();
      }
    };

    window.addEventListener("wheel", cancelLock, { passive: true });
    window.addEventListener("touchmove", cancelLock, { passive: true });

    return () => {
      window.removeEventListener("wheel", cancelLock);
      window.removeEventListener("touchmove", cancelLock);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  const handleNavClick = (href) => {
    closeMenu();

    setActiveSection(href);

    clickLock.current = true;

    if (lockTimeout.current) {
      clearTimeout(lockTimeout.current);
    }

    lockTimeout.current = setTimeout(() => {
      releaseLock();
    }, 1000);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[76px] bg-white/80 backdrop-blur-md border-b border-slate-200/70 shadow-sm">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* BRAND / LOGOS */}
        <a
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-90"
          aria-label="IETE Student Chapter IEM Kolkata"
        >
          {/* IETE Logo */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg sm:h-11 sm:w-11">
            <img
              src="/LogoNav.png"
              alt="IETE Student Chapter"
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* College Logo */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg sm:h-11 sm:w-11">
            <img
              src="/CLogo.png"
              alt="IEM Kolkata Logo"
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Divider */}
          <div className="h-7 w-[1px] bg-slate-200" />

          {/* Brand Text */}
          <div className="block leading-none">
            <div className="text-xs font-bold tracking-tight text-[#0B1B33] sm:text-[15px]">
              IETE Students' Forum
            </div>

            <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-[10px]">
              IEM Kolkata
            </div>
          </div>
        </a>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-1 rounded-full border border-slate-200/60 bg-white/50 p-1.5 backdrop-blur-sm md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#2563EB] shadow-sm"
                    : "text-slate-600 hover:bg-slate-100/60 hover:text-[#0B1B33]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* DESKTOP CTA */}
        <div className="hidden md:flex md:items-center">
          <a
            href="#join"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-[#2563EB] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1D4ED8] hover:shadow-md active:scale-95"
          >
            <span>Join us</span>

            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-[#0B1B33] transition-colors hover:bg-slate-50 active:scale-95 md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? (
            <X
              className="h-5 w-5 rotate-90 transition-transform duration-200"
              strokeWidth={2}
            />
          ) : (
            <Menu
              className="h-5 w-5 transition-transform duration-200"
              strokeWidth={2}
            />
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-x-0 top-[76px] h-[calc(100vh-76px)] bg-white/90 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-10 pt-6">
          <div className="space-y-2">
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  transitionDelay: open ? `${idx * 40}ms` : "0ms",
                }}
                className={`flex h-12 items-center justify-between rounded-xl px-4 text-base font-semibold transition-all duration-200 ${
                  activeSection === link.href
                    ? "bg-[#2563EB]/10 text-[#2563EB]"
                    : "text-slate-700 hover:bg-slate-50 hover:text-[#0B1B33]"
                } ${
                  open
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
              >
                <span>{link.label}</span>

                <ArrowUpRight className="h-4 w-4 opacity-40" strokeWidth={2} />
              </a>
            ))}
          </div>

          <div className="space-y-4 border-t border-slate-100 pt-6">
            <a
              href="#join"
              onClick={closeMenu}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#1D4ED8] active:scale-[0.98]"
            >
              Join the chapter
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.3} />
            </a>

            <div className="flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
              IETE Student Chapter · IEM Kolkata
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
