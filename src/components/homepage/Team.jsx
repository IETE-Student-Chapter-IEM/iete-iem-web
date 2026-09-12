import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCrown, FaWallet, FaBullhorn, FaLaptopCode } from "react-icons/fa";
// import AmbientGeometry from "./AmbientGeometry";
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

// Standard grids for 2/3/4-person sections
function gridClassFor(count) {
  if (count <= 2) return "mx-auto grid max-w-md grid-cols-2 gap-5 sm:gap-6";
  if (count === 3)
    return "mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5";
  return "grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5";
}

/**
 * Special 3-over-2 layout: 3 cards on row 1, 2 centered cards on row 2.
 * Built on a 6-column grid — each card spans 2 columns, so 3 cards fill
 * row 1 exactly, and giving card #4 an explicit col-start of 2 leaves
 * columns 1 and 6 empty on row 2, centering the last pair.
 */
function FiveUpGrid({ members, renderCard }) {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-5">
      {members.map((member, idx) => {
        let extra = "col-span-1 sm:col-span-2";
        if (idx === 3) extra += " sm:col-start-2";
        // On mobile, center the trailing 5th card under the 2x2 grid above it
        if (idx === 4)
          extra += " col-span-2 sm:col-span-2 mx-auto w-1/2 sm:w-auto sm:mx-0";
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
    members: STUDENT_MEMBERS.filter((m) => m.section === section.key),
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
      {/* <AmbientGeometry theme="light" /> */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-primary sm:text-4xl">
            Meet the Minds Behind the Chapter
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Driven by visionary faculty guidance and led by dedicated student
            leadership.
          </p>
        </div>

        {/* Category Filters */}
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

        {showStudents && (
          <div className="mt-16">
            <div className="mb-8 border-b border-brand-accent/20 pb-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                Student Leadership
              </span>
              <h3 className="text-xl font-bold text-brand-primary">
                Core Committee
              </h3>
            </div>

            {/* Tighter max-width here scales every card down vs. the old full-width grid */}
            <div className="mx-auto flex max-w-5xl flex-col gap-12">
              {groupedStudents.map((group) => {
                const Icon = SECTION_ICONS[group.key];
                const count = group.members.length;

                return (
                  <div key={group.key}>
                    <div className="core-section-header mb-5 flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                        {Icon && <Icon className="h-3.5 w-3.5" />}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wide text-brand-primary sm:text-base">
                          {group.label}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {group.tagline}
                        </p>
                      </div>
                    </div>

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
