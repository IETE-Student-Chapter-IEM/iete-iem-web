import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import AmbientGeometry from "./AmbientGeometry";
import { FACULTY_MEMBERS, STUDENT_MEMBERS } from "../../lib/team";
import TeamCard from "./team/TeamCard";

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

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-brand-tint/30 py-16 sm:py-20"
    >
      {/* Background canvas geometry */}
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

            {/* Narrower max-width + only 2 columns = noticeably bigger cards
                than the student grid below, and a clean 2x2 for 4 members. */}
            <div className="mx-auto grid max-w-2xl grid-cols-2 gap-6 sm:gap-8">
              {FACULTY_MEMBERS.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {showStudents && (
          <div className="mt-16">
            <div className="mb-6 border-b border-brand-accent/20 pb-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                Student Leadership
              </span>
              <h3 className="text-xl font-bold text-brand-primary">
                Core Committee
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {STUDENT_MEMBERS.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
