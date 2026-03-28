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

// --- Graffiti / Street art style doodles ---

export const LightningBolt: React.FC<DoodleProps> = ({ className }) => (
  <svg className={`doodle ${className || ""}`} width="28" height="40" viewBox="0 0 28 40" fill="none">
    <path d="M16 2L4 22h10L8 38l18-24H14L20 2h-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Spiral: React.FC<DoodleProps> = ({ className }) => (
  <svg className={`doodle ${className || ""}`} width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 18c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5-1.5 5.5-5.5 5.5-7.5-3-7.5-7.5 4-9.5 9.5-9.5 11.5 5 11.5 11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
  </svg>
);

export const Squiggle: React.FC<DoodleProps> = ({ className }) => (
  <svg className={`doodle ${className || ""}`} width="50" height="20" viewBox="0 0 50 20" fill="none">
    <path d="M2 10c4-8 8 8 12 0s8 8 12 0 8 8 12 0 8 8 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const Exclamation: React.FC<DoodleProps> = ({ className }) => (
  <svg className={`doodle ${className || ""}`} width="14" height="36" viewBox="0 0 14 36" fill="none">
    <path d="M7 4v20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="7" cy="32" r="2.5" fill="currentColor"/>
  </svg>
);

export const SpraySplat: React.FC<DoodleProps> = ({ className }) => (
  <svg className={`doodle ${className || ""}`} width="40" height="40" viewBox="0 0 40 40" fill="currentColor" opacity="0.12">
    <circle cx="20" cy="20" r="6"/><circle cx="10" cy="14" r="2.5"/><circle cx="30" cy="12" r="3"/>
    <circle cx="28" cy="28" r="2"/><circle cx="8" cy="26" r="1.5"/><circle cx="16" cy="8" r="2"/>
    <circle cx="32" cy="20" r="1.5"/><circle cx="14" cy="32" r="2.5"/><circle cx="26" cy="34" r="1.5"/>
  </svg>
);

export const GraffitiArrow: React.FC<DoodleProps> = ({ className }) => (
  <svg className={`doodle ${className || ""}`} width="50" height="30" viewBox="0 0 50 30" fill="none">
    <path d="M4 15c10-2 20-1 30 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M30 8l10 7-10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 18c8 0 16 2 24 1" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

export const SideDoodles: React.FC = () => (
  <>
    <div className="side-doodles side-left">
      <PaperPlane className="side-plane side-plane-1" />
      <LightningBolt className="side-lightning-1" />
      <StarDoodle className="side-star-1" />
      <Spiral className="side-spiral-1" />
      <SpraySplat className="side-splat-1" />
      <CrossDoodle className="side-cross-1" />
      <PaperPlaneLarge className="side-plane side-plane-3" />
      <Squiggle className="side-squiggle-1" />
      <Exclamation className="side-excl-1" />
    </div>
    <div className="side-doodles side-right">
      <PaperPlaneLarge className="side-plane side-plane-2" />
      <Exclamation className="side-excl-2" />
      <DotsTriangle className="side-dots-1" />
      <GraffitiArrow className="side-garrow-1" />
      <StarDoodle className="side-star-2" />
      <SpraySplat className="side-splat-2" />
      <PaperPlane className="side-plane side-plane-4" />
      <LightningBolt className="side-lightning-2" />
      <CircleDoodle className="side-circle-2" />
    </div>
  </>
);

export const Marquee: React.FC = () => {
  const items = [
    "Signifiya 2026 registrations open",
    "Cy-Coders hackathon this weekend",
    "Jhankar dance auditions live",
    "Musicorum jam session Friday",
    "Kissewala short film fest",
    "Robotics Club drone demo",
    "E-Cell startup pitch night",
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
