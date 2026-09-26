import { ArrowLeft, ArrowUpRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function JoinUs() {
  return (
    <main className="min-h-screen bg-[#EDF3EC] text-[#0B2E22]">
      {/* Top Navigation */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8 lg:px-12">
        <Link
          to="/"
          className="group flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#0B2E22]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <div className="flex items-center gap-2">
          <img
            src="/LogoNav.png"
            alt="IETE"
            className="h-9 w-9 object-contain"
          />

          <img src="/CLogo.png" alt="IEM" className="h-9 w-9 object-contain" />
        </div>
      </div>

      {/* Main Content */}
      <section className="relative flex min-h-[calc(100vh-88px)] items-center justify-center overflow-hidden px-6 py-16 sm:px-8">
        {/* Background decoration */}
        <div className="pointer-events-none absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-[#1C8A54]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-80 w-80 rounded-full bg-[#0B2E22]/10 blur-3xl" />

        <div className="relative z-10 w-full max-w-3xl text-center">
          {/* Label */}
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C8A54]">
            IETE Students' Forum · IEM Kolkata
          </p>

          {/* Status */}
          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-[#1C8A54]/20 bg-white shadow-sm">
            <span className="h-4 w-4 rounded-full bg-[#1C8A54] shadow-[0_0_0_8px_rgba(28,138,84,0.10)]" />
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-[#0B2E22] sm:text-5xl md:text-6xl">
            Registration
            <br />
            <span className="text-[#1C8A54]">is currently closed.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Registrations for joining the IETE Students' Forum are currently
            closed. Stay connected with us for upcoming announcements,
            activities and registration updates.
          </p>

          {/* Contact Card */}
          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-[#0B2E22]/10 bg-white/70 p-6 shadow-sm backdrop-blur-md sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1C8A54]">
              Want to get in touch?
            </p>

            <p className="mt-2 text-sm text-slate-500">
              You can contact the chapter through any of the following.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {/* Email */}
              <a
                href="mailto:your-email@example.com"
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-[#1C8A54]/40 hover:shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1C8A54]/10 text-[#1C8A54]">
                  <Mail className="h-4 w-4" />
                </span>

                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Email
                  </span>

                  <span className="block truncate text-sm font-semibold text-[#0B2E22]">
                    your-email@example.com
                  </span>
                </span>

                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              {/* Phone */}
              <a
                href="tel:+919999999999"
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-[#1C8A54]/40 hover:shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1C8A54]/10 text-[#1C8A54]">
                  <Phone className="h-4 w-4" />
                </span>

                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Mobile
                  </span>

                  <span className="block text-sm font-semibold text-[#0B2E22]">
                    +91 99999 99999
                  </span>
                </span>

                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-[#1C8A54] hover:text-[#1C8A54]"
              >
                Instagram
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-[#1C8A54] hover:text-[#1C8A54]"
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-[#1C8A54] hover:text-[#1C8A54]"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            IETE Student Chapter · IEM Kolkata
          </p>
        </div>
      </section>
    </main>
  );
}
