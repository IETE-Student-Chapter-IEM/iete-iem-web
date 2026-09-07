import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Activities", href: "#activities" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[76px] border-b border-slate-500 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-[0_2px_8px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          : "bg-white"
      }`}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* BRAND — VISIBLE ON BOTH MOBILE AND DESKTOP */}
        <a
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2 sm:gap-3"
          aria-label="IETE Student Chapter IEM Kolkata"
        >
          {/* IETE Logo */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white sm:h-11 sm:w-11">
            <img
              src="/LogoNav.png"
              alt="IETE Student Chapter"
              className="h-full w-full object-contain"
            />
          </div>

          {/* College Logo */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white sm:h-11 sm:w-11">
            <img
              src="/CLogo.png"
              alt="IEM Kolkata Logo"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Vertical Divider */}
          <div className="h-7 w-[1px] bg-slate-200" />

          {/* Brand Text Header */}
          <div className="block leading-none">
            <div className="text-xs font-bold tracking-[-0.02em] text-[#0B1B33] sm:text-[15px]">
              IETE Student Chapter
            </div>
            <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-[10px] sm:tracking-[0.18em]">
              IEM Kolkata
            </div>
          </div>
        </a>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[13.5px] font-medium text-slate-600 transition-colors duration-200 hover:text-[#0B1B33] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#2563EB] after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* DESKTOP CTA */}
        <a
          href="#join"
          className="group hidden items-center gap-1.5 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1D4ED8] hover:shadow-md md:inline-flex"
        >
          Join us
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2.3}
          />
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0B1B33] transition hover:bg-slate-50 md:hidden"
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

      {/* MOBILE MENU DROPDOWN */}
      <div
        className={`absolute inset-x-0 top-[76px] border-t border-slate-200 bg-white shadow-lg transition-all duration-300 md:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 pb-6 pt-4">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="flex min-h-12 items-center rounded-lg px-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#0B1B33]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <a
              href="#join"
              onClick={closeMenu}
              className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
            >
              Join the chapter
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.3} />
            </a>
          </div>

          <div className="mt-5 flex items-center gap-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
            IETE Student Chapter · IEM Kolkata
          </div>
        </div>
      </div>
    </header>
  );
}
