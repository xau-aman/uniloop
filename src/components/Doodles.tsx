import React from "react";
import "./Doodles.css";

type DoodleProps = { className?: string };

export const StarDoodle: React.FC<DoodleProps> = ({ className }) => (
  <svg className={`doodle ${className || ""}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4l-6.4 4.8 2.4-7.2-6-4.8h7.6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CircleDoodle: React.FC<DoodleProps> = ({ className }) => (
  <svg className={`doodle ${className || ""}`} width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4"/>
  </svg>
);

export const ArrowDoodle: React.FC<DoodleProps> = ({ className }) => (
  <svg className={`doodle ${className || ""}`} width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M8 32C12 20 20 12 32 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M24 6l8 2-2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CrossDoodle: React.FC<DoodleProps> = ({ className }) => (
  <svg className={`doodle ${className || ""}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const DotsTriangle: React.FC<DoodleProps> = ({ className }) => (
  <svg className={`doodle ${className || ""}`} width="28" height="28" viewBox="0 0 28 28" fill="currentColor">
    <circle cx="14" cy="4" r="2.5"/><circle cx="6" cy="22" r="2.5"/><circle cx="22" cy="22" r="2.5"/>
  </svg>
);

export const PaperPlane: React.FC<DoodleProps> = ({ className }) => (
  <svg className={`doodle ${className || ""}`} width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M6 24l36-18-18 36-4-14z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 28l22-22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 28l-2 8" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" strokeLinecap="round"/>
  </svg>
);

export const PaperPlaneLarge: React.FC<DoodleProps> = ({ className }) => (
  <svg className={`doodle ${className || ""}`} width="72" height="72" viewBox="0 0 48 48" fill="none">
    <path d="M6 24l36-18-18 36-4-14z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 28l22-22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M42 6c-8 8-16 12-22 14" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

export const SideDoodles: React.FC = () => (
  <>
    {/* Left side doodles */}
    <div className="side-doodles side-left">
      <PaperPlane className="side-plane side-plane-1" />
      <StarDoodle className="side-star-1" />
      <CircleDoodle className="side-circle-1" />
      <CrossDoodle className="side-cross-1" />
      <PaperPlaneLarge className="side-plane side-plane-3" />
    </div>
    {/* Right side doodles */}
    <div className="side-doodles side-right">
      <PaperPlaneLarge className="side-plane side-plane-2" />
      <DotsTriangle className="side-dots-1" />
      <StarDoodle className="side-star-2" />
      <PaperPlane className="side-plane side-plane-4" />
      <CircleDoodle className="side-circle-2" />
    </div>
  </>
);

export const Marquee: React.FC = () => {
  const items = [
    "Hackathon registrations open",
    "Code Club results are out",
    "Cultural Fest in 2 weeks",
    "Photo walk this Saturday",
    "Open mic — sign up now",
    "Startup pitch night coming soon",
    "Drone demo by Robotics Society",
    "Built by students, for students",
  ];

  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {[...items, ...items].map((text, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-bullet" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
