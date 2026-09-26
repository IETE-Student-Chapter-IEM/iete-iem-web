import { ArrowLeft, ArrowUpRight, Phone } from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

const SOCIAL_LINKS = [
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/iem-iete-students-forum-8b3145248/",
    label: "LinkedIn",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/iemietestudentsforum/",
    label: "Instagram",
  },
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/profile.php?id=100084318941744",
    label: "Facebook",
  },
];

export default function JoinUs() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#EDF3EC] text-[#0B2E22]">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8 lg:px-12">
          <Link
            to="/"
            className="group flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-[#0B2E22]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
            IETE · IEM Kolkata
          </span>
        </div>
      </header>

      {/* Main */}
      <section className="relative flex min-h-screen items-center justify-center px-6 py-24 sm:px-10">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[#1C8A54]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-1/3 h-96 w-96 rounded-full bg-[#0B2E22]/10 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[1px] w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#0B2E22]/10 to-transparent" />

        <div className="relative z-10 grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[260px_1fr_260px]">
          {/* LEFT IETE LOGO */}
          <div className="hidden justify-center lg:flex">
            <img
              src="/LogoNav.png"
              alt="IETE Students' Forum"
              className="h-56 w-56 object-contain drop-shadow-[0_8px_24px_rgba(11,46,34,0.12)] transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* CENTER CONTENT */}
          <div className="mx-auto w-full max-w-xl text-center">
            {/* Mobile logos */}
            <div className="mb-9 flex items-center justify-center gap-6 lg:hidden">
              <img
                src="/LogoNav.png"
                alt="IETE Students' Forum"
                className="h-24 w-24 object-contain drop-shadow-[0_6px_16px_rgba(11,46,34,0.12)]"
              />
              <div className="h-14 w-px bg-[#0B2E22]/15" />
              <img
                src="/CLogo.png"
                alt="IEM Kolkata"
                className="h-24 w-24 object-contain drop-shadow-[0_6px_16px_rgba(11,46,34,0.12)]"
              />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1C8A54]">
              IETE Students' Forum · IEM Kolkata
            </p>

            <h1
              className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Registration
              <br />
              <span className="text-[#1C8A54]">is currently closed.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-slate-500">
              Registration for joining the IETE Students' Forum is currently
              closed. For any queries or future opportunities, feel free to get
              in touch with us.
            </p>

            {/* Contact */}
            <div className="mt-9">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Contact the Chapter
              </p>

              <a
                href="tel:+918100071436"
                className="group mt-3 inline-flex items-center gap-3 rounded-full border border-[#0B2E22]/10 bg-white/70 px-5 py-3 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1C8A54]/40 hover:shadow-md"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1C8A54]/10 text-[#1C8A54]">
                  <Phone className="h-4 w-4" />
                </span>

                <span className="text-sm font-bold tracking-wide">
                  +91 81000 71436
                </span>

                <ArrowUpRight
                  className="h-4 w-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>
            </div>

            {/* Social Media */}
            <div className="mt-7 flex justify-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0B2E22]/10 bg-white/60 text-slate-500 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#1C8A54]/40 hover:bg-[#1C8A54] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <Link
              to="/"
              className="mt-9 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 transition hover:text-[#1C8A54]"
            >
              Explore the website
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          {/* RIGHT IEM LOGO */}
          <div className="hidden justify-center lg:flex">
            <img
              src="/CLogo.png"
              alt="IEM Kolkata"
              className="h-56 w-56 object-contain drop-shadow-[0_8px_24px_rgba(11,46,34,0.12)] transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
