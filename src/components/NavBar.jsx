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
    let current = "#hero";

    const hero = document.querySelector("#hero");

    if (hero && hero.getBoundingClientRect().bottom <= OFFSET) {
      current = "#about";
    }

    for (const link of NAV_LINKS.slice(1)) {
      const el = document.querySelector(link.href);

      if (el && el.getBoundingClientRect().top <= OFFSET) {
        current = link.href;
      }
    }

    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

    if (atBottom) {
      current = "#team";
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
    <header className="fixed inset-x-0 top-0 z-50 h-[84px] bg-white/40 backdrop-blur-md">
      <nav className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* BRAND */}
        <a
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-3"
          aria-label="IETE Student Chapter IEM Kolkata"
        >
          <div className="flex items-center gap-2">
            <img
              src="/LogoNav.png"
              alt="IETE Student Chapter"
              className="h-10 w-10 object-contain transition-transform duration-500 group-hover:rotate-6"
            />

            <img
              src="/CLogo.png"
              alt="IEM Kolkata"
              className="h-10 w-10 object-contain transition-transform duration-500 group-hover:-rotate-6"
            />
          </div>

          <div className="h-8 w-px bg-slate-300" />

          <div className="leading-none">
            <div className="text-sm font-bold tracking-tight text-[#0B1B33] sm:text-base">
              IETE Students' Forum
            </div>

            <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              IEM Kolkata
            </div>
          </div>
        </a>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`group relative py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
                  isActive
                    ? "text-[#0B1B33]"
                    : "text-slate-500 hover:text-[#0B1B33]"
                }`}
              >
                {link.label}

                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#1C8A54] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}

          {/* JOIN US */}
          <a
            href="#join"
            className="group ml-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0B2E22]"
          >
            <span>Join us</span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1C8A54] text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.3} />
            </span>
          </a>
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#0B2E22] text-white transition-transform active:scale-95 md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-5 w-5" strokeWidth={2} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={2} />
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-x-0 top-[84px] h-[calc(100vh-84px)] bg-[#F7FBF8]/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-10 pt-8">
          <div className="space-y-1">
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  transitionDelay: open ? `${idx * 50}ms` : "0ms",
                }}
                className={`group flex items-center justify-between border-b border-[#0B2E22]/10 py-5 transition-all duration-300 ${
                  open
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-5 opacity-0"
                }`}
              >
                <span
                  className={`text-2xl font-bold uppercase tracking-tight ${
                    activeSection === link.href
                      ? "text-[#1C8A54]"
                      : "text-[#0B2E22]"
                  }`}
                >
                  {link.label}
                </span>

                <ArrowUpRight
                  className="h-5 w-5 text-[#1C8A54] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={2}
                />
              </a>
            ))}
          </div>

          <div className="border-t border-[#0B2E22]/10 pt-6">
            <a
              href="#join"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-full bg-[#1C8A54] px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
            >
              <span>Join the Chapter</span>

              <ArrowUpRight className="h-5 w-5" strokeWidth={2.2} />
            </a>

            <div className="mt-5 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              IETE Student Chapter · IEM Kolkata
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
