import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Activities", href: "#activities" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/iem-iete-students-forum-8b3145248/", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://www.instagram.com/iemietestudentsforum/", label: "Instagram" },
  { icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=100084318941744", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="border-t border-emerald-900/10 bg-[#eef7f2] text-emerald-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* BRAND COLUMN */}
          <div className="space-y-4 lg:col-span-4">
            <a
              href="/"
              className="flex items-center gap-2 sm:gap-3"
              aria-label="IETE Student Chapter IEM Kolkata"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white border border-emerald-900/10 shadow-sm">
                <img
                  src="/LogoNav.png"
                  alt="IETE Student Chapter"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white border border-emerald-900/10 shadow-sm">
                <img
                  src="/CLogo.png"
                  alt="IEM Kolkata Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="h-7 w-[1px] bg-emerald-900/20" />
              <div className="block leading-none">
                <div className="text-sm font-bold tracking-[-0.02em] text-emerald-950">
                  IETE Students' Forum
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  IEM Kolkata
                </div>
              </div>
            </a>

            <p className="text-sm leading-relaxed text-emerald-800/80">
              Empowering students in electronics, telecommunications, and IT
              through technical events, workshops, and innovation hubs.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-900/15 bg-white/50 text-emerald-900 transition hover:border-emerald-800 hover:bg-emerald-800 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-950">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-emerald-800/80 transition hover:text-emerald-950 font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT & LOCATION INFO */}
          <div className="space-y-4 lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-950">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                <span className="text-emerald-900/90">
                  IEM Gurukul Campus, Y-12, Block EP, Sector V, Salt Lake,
                  Kolkata, West Bengal 700091
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-emerald-700" />
                <a
                  href="mailto:iete@iem.edu.in"
                  className="text-emerald-900/90 hover:text-emerald-950 hover:underline"
                >
                  iete@iem.edu.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-emerald-700" />
                <a
                  href="tel:+919876543210"
                  className="text-emerald-900/90 hover:text-emerald-950 hover:underline"
                >
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>

          {/* GOOGLE MAP INTEGRATION */}
          <div className="space-y-3 lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-950">
              Location Map
            </h3>
            <div className="h-40 w-full overflow-hidden rounded-xl border border-emerald-900/15 shadow-sm">
              <iframe
                title="IEM Gurukul Building Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.122569738679!2d88.4312881108891!3d22.57451863281452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02751153ddb371%3A0x816e6fee5a5aac55!2sIEM%20Gurukul%20Building!5e0!3m2!1sen!2sus!4v1789526177021!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/KUYvrTczqPotPkyz7"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 hover:underline"
            >
              Open in Google Maps
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-emerald-900/10 pt-8 sm:flex-row text-xs text-emerald-800/70">
          <p>
            © {new Date().getFullYear()} IETE Student Chapter · IEM Kolkata. All
            rights reserved.
          </p>
          <div className="flex items-center gap-2 font-semibold uppercase tracking-[0.14em] text-emerald-800/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Designed & Developed by Web Team
          </div>
        </div>
      </div>
    </footer>
  );
}
