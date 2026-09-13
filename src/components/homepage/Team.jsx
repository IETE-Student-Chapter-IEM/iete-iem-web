import { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function TeamCard({ member, compact = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = () => {
    // Toggles panel state on tap (mobile-friendly)
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`team-card group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl ${
        isOpen ? "mobile-panel-open" : ""
      } ${compact ? "p-3 sm:p-4" : "p-4 sm:p-6"}`}
    >
      {/* Member Avatar / Image Container */}
      <div className="relative mx-auto aspect-square overflow-hidden rounded-xl bg-slate-100">
        <img
          src={member.image || "/placeholder.jpg"}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* 
          Sliding Dark Green Panel:
          Activates via Desktop CSS Hover (.group-hover:translate-y-0) 
          OR Mobile React State Toggle (.mobile-panel-open .sliding-panel)
        */}
        <div
          className={`sliding-panel absolute inset-0 flex flex-col justify-between bg-emerald-950/90 p-4 text-white backdrop-blur-sm transition-transform duration-300 ease-in-out ${
            isOpen
              ? "translate-y-0"
              : "translate-y-full group-hover:translate-y-0"
          }`}
        >
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-accent">
              {member.role}
            </span>
            <h4 className="mt-1 text-sm font-bold leading-tight sm:text-base">
              {member.name}
            </h4>
            {member.bio && (
              <p className="mt-2 text-xs text-slate-200 line-clamp-3">
                {member.bio}
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            {member.socials?.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white/80 hover:text-brand-accent"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
            )}
            {member.socials?.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white/80 hover:text-brand-accent"
              >
                <FaGithub className="h-4 w-4" />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                onClick={(e) => e.stopPropagation()}
                className="text-white/80 hover:text-brand-accent"
              >
                <FaEnvelope className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Static Info Below Image */}
      <div className="mt-3 text-center">
        <h4 className="text-sm font-bold text-brand-primary sm:text-base">
          {member.name}
        </h4>
        <p className="text-xs font-medium text-slate-500">{member.role}</p>
      </div>
    </div>
  );
}
