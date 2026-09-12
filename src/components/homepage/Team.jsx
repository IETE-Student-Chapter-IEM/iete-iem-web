import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Award, ArrowUpRight } from "lucide-react";

import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FACULTY_MEMBERS, STUDENT_MEMBERS, TIER_STYLES } from "../../lib/team";

const STUDENT_MENTORS = [];

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const [activeTab, setActiveTab] = useState("all");
  const sectionRef = useRef(null);

  const showFaculty = activeTab === "all" || activeTab === "faculty";
  const showStudents = activeTab === "all" || activeTab === "students";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".team-card");
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 });

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "back.out(1.2)",
            overwrite: true,
          }),
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-brand-tint/20 via-white to-brand-tint/10 py-24 sm:py-32"
    >
      {/* Decorative Background Glows */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-brand-accent/10 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -right-20 top-2/3 h-96 w-96 rounded-full bg-brand-primary/10 blur-3xl animate-pulse" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/5 px-4 py-1.5 text-xs font-semibold text-brand-accent">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Passionate Leadership</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-primary sm:text-4xl md:text-5xl">
            Meet the Minds Behind the Chapter
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Driven by visionary faculty guidance and led by dedicated student
            leadership.
          </p>
        </div>

        {/* Floating Category Filters */}
        <div className="mt-10 flex justify-center gap-3">
          {[
            { id: "all", label: "All Members" },
            { id: "faculty", label: "Faculty Advisors" },
            { id: "students", label: "Student Core Team" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-105"
                  : "border border-slate-200/80 bg-white/80 text-slate-600 backdrop-blur-sm hover:border-brand-accent/40 hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Faculty Members Section */}
        {showFaculty && (
          <div className="mt-20">
            <div className="mb-10 flex items-center justify-between border-b border-brand-accent/20 pb-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-accent">
                  Mentorship & Guidance
                </span>
                <h3 className="text-2xl font-bold text-brand-primary sm:text-3xl">
                  Faculty Coordinators
                </h3>
              </div>
              <Award className="h-8 w-8 text-brand-accent/40" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {FACULTY_MEMBERS.map((member) => (
                <InteractiveCard key={member.id} member={member} isFaculty />
              ))}
            </div>
          </div>
        )}

        {/* Student Core Team Section */}
        {showStudents && (
          <div className="mt-24">
            <div className="mb-10 flex items-center justify-between border-b border-brand-accent/20 pb-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-accent">
                  Student Leadership
                </span>
                <h3 className="text-2xl font-bold text-brand-primary sm:text-3xl">
                  Core Committee
                </h3>
              </div>
              <Sparkles className="h-8 w-8 text-brand-accent/40" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STUDENT_MEMBERS.map((member) => (
                <InteractiveCard key={member.id} member={member} />
              ))}
            </div>

            {STUDENT_MENTORS && STUDENT_MENTORS.length > 0 && (
              <div className="team-card mt-12 flex flex-wrap items-center justify-center gap-4 rounded-3xl border border-slate-200/80 bg-white/80 px-8 py-6 backdrop-blur-sm shadow-sm">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-accent">
                  Student Mentors
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {STUDENT_MENTORS.map((mentor) => (
                    <span
                      key={mentor.id}
                      className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-2xs hover:border-brand-accent hover:text-brand-primary transition"
                    >
                      {mentor.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function InteractiveCard({ member, isFaculty = false }) {
  const cardRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(member.image);
  const [transform, setTransform] = useState({ rx: 0, ry: 0, px: 50, py: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const tierClass = TIER_STYLES[member.tier] || TIER_STYLES.advisor;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -5;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 5;

    setTransform({ rx, ry, px, py });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ rx: 0, ry: 0, px: 50, py: 50 });
  };

  const hasSocials = Boolean(member.linkedin || member.instagram);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rx}deg) rotateY(${transform.ry}deg)`,
        transition: isHovered
          ? "transform 0.1s cubic-bezier(0.2, 0, 0, 1)"
          : "transform 0.5s ease-out, box-shadow 0.5s ease-out",
      }}
      className={`team-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-accent/40 hover:shadow-xl hover:shadow-brand-primary/5 ${
        isFaculty ? "md:flex-row md:items-center md:gap-6" : ""
      }`}
    >
      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${transform.px}% ${transform.py}%, rgba(196, 93, 62, 0.06), transparent 80%)`,
        }}
      />

      {/* Decorative Technical Corner Brackets */}
      <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-slate-300 transition-all duration-300 group-hover:border-brand-accent group-hover:scale-110" />
      <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-slate-300 transition-all duration-300 group-hover:border-brand-accent group-hover:scale-110" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-slate-300 transition-all duration-300 group-hover:border-brand-accent group-hover:scale-110" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-slate-300 transition-all duration-300 group-hover:border-brand-accent group-hover:scale-110" />

      {/* Main Card Content */}
      <div
        className={`flex flex-col ${isFaculty ? "md:flex-row md:items-center md:gap-6" : ""}`}
      >
        {/* Clean Profile Image Frame */}
        <div
          className={`relative shrink-0 overflow-hidden rounded-2xl bg-slate-100 ${
            isFaculty ? "h-40 w-40 sm:h-44 sm:w-44" : "mb-5 h-56 w-full"
          }`}
        >
          <img
            src={imgSrc}
            alt={member.name}
            onError={() => setImgSrc("/coreTeam/placeholder.jpg")}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Animated Tech Scanner Line on Hover */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-0 transition-all duration-700 group-hover:top-full group-hover:opacity-100" />
        </div>

        {/* Info Block */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block font-mono text-[11px] font-bold uppercase tracking-wider text-brand-accent">
              {member.department}
            </span>
            <span
              className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tierClass}`}
            >
              {member.role}
            </span>
          </div>

          <h4 className="mt-2 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-brand-primary">
            {member.name}
          </h4>

          {member.bio && (
            <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
              {member.bio}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Social Bar Component */}
      {hasSocials && (
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="font-mono text-[10px] font-medium tracking-wider text-slate-400 uppercase">
            Connect
          </span>
          <div className="flex items-center gap-2">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                className="group/btn flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>
            )}
            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noreferrer"
                title="Instagram Profile"
                className="group/btn flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-200 hover:border-pink-600 hover:bg-pink-600 hover:text-white"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
