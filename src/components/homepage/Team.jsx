import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCrown, FaWallet, FaBullhorn, FaLaptopCode } from "react-icons/fa";

import {
  FACULTY_MEMBERS,
  STUDENT_MEMBERS,
  CORE_SECTIONS,
} from "../../lib/team";
import TeamCard from "./team/TeamCard";

gsap.registerPlugin(ScrollTrigger);

const SECTION_ICONS = {
  "executive-leadership": FaCrown,
  "secretariat-finance": FaWallet,
  "programs-outreach": FaBullhorn,
  "technology-creative": FaLaptopCode,
};

// ==========================================
// STANDARD GRIDS FOR 2 / 3 / 4 PEOPLE
// ==========================================
function gridClassFor(count) {
  if (count <= 2) return "mx-auto grid max-w-md grid-cols-2 gap-5 sm:gap-6";
  if (count === 3)
    return "mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5";
  return "grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5";
}

// ==========================================
// SPECIAL 5-PERSON GRID
// ==========================================
function FiveUpGrid({ members, renderCard }) {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-5">
      {members.map((member, idx) => {
        let extra = "col-span-1 sm:col-span-2";
        if (idx === 3) extra += " sm:col-start-2";
        if (idx === 4)
          extra += " col-span-2 mx-auto w-1/2 sm:col-span-2 sm:mx-0 sm:w-auto";

        return (
          <div key={member.id} className={extra}>
            {renderCard(member)}
          </div>
        );
      })}
    </div>
  );
}

export default function Team() {
  const [activeTab, setActiveTab] = useState("all");
  const sectionRef = useRef(null);

  const showFaculty = activeTab === "all" || activeTab === "faculty";
  const showStudents = activeTab === "all" || activeTab === "students";

  const groupedStudents = CORE_SECTIONS.map((section) => ({
    ...section,
    members: STUDENT_MEMBERS.filter((member) => member.section === section.key),
  })).filter((group) => group.members.length > 0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".team-card");
      const headers = gsap.utils.toArray(".core-section-header");

      if (headers.length) {
        gsap.set(headers, { opacity: 0, x: -20 });
        ScrollTrigger.batch(headers, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
              overwrite: true,
            }),
        });
      }

      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 24, scale: 0.94 });
        ScrollTrigger.batch(cards, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.06,
              ease: "power2.out",
              overwrite: true,
            }),
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-brand-tint/30 py-16 sm:py-20"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        {/* MAIN SECTION HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-primary sm:text-4xl">
            Meet the Minds Behind the Chapter
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Driven by visionary faculty guidance and led by dedicated student
            leadership.
          </p>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="mt-6 flex justify-center gap-2">
          {[
            { key: "all", label: "All Members" },
            { key: "faculty", label: "Faculty Advisors" },
            { key: "students", label: "Student Core Team" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition sm:text-sm ${
                activeTab === tab.key
                  ? "bg-brand-primary text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FACULTY SECTION */}
        {showFaculty && (
          <div className="mt-12">
            <div className="mb-6 border-b border-brand-accent/20 pb-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                Mentorship & Guidance
              </span>
              <h3 className="text-xl font-bold text-brand-primary">
                Faculty Coordinators
              </h3>
            </div>

            <div className="mx-auto grid max-w-2xl grid-cols-2 gap-6 sm:gap-8">
              {FACULTY_MEMBERS.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* CORE COMMITTEE SECTION (ENHANCED COLOR & COVER) */}
        {showStudents && (
          <div className="relative mt-16 overflow-hidden rounded-[2.5rem] border border-brand-primary/15 bg-gradient-to-br from-brand-primary/[0.08] via-emerald-950/[0.04] to-brand-accent/[0.08] px-4 py-10 shadow-xl shadow-brand-primary/5 backdrop-blur-md sm:px-10 sm:py-14">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-brand-accent/15 blur-3xl" />

            {/* Glowing Accent Top Border */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-[2px] w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />

            {/* Core Committee Header */}
            <div className="relative z-10 mb-10 border-b border-brand-accent/30 pb-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                Student Leadership
              </span>
              <h3 className="text-2xl font-extrabold text-brand-primary sm:text-3xl">
                Core Committee
              </h3>
            </div>

            {/* Core Committee Groups */}
            <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-14">
              {groupedStudents.map((group) => {
                const Icon = SECTION_ICONS[group.key];
                const count = group.members.length;

                return (
                  <div key={group.key}>
                    {/* SUBSECTION HEADER */}
                    <div className="core-section-header mb-6 flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary shadow-xs">
                        {Icon && <Icon className="h-4 w-4" />}
                      </span>

                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wide text-brand-primary sm:text-base">
                          {group.label}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          {group.tagline}
                        </p>
                      </div>
                    </div>

                    {/* MEMBER GRID */}
                    {count === 5 ? (
                      <FiveUpGrid
                        members={group.members}
                        renderCard={(member) => (
                          <TeamCard member={member} compact />
                        )}
                      />
                    ) : (
                      <div className={gridClassFor(count)}>
                        {group.members.map((member) => (
                          <TeamCard key={member.id} member={member} compact />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
