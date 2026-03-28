import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { activities } from "../data";
import { getIcon } from "../data/iconMap";
import "./Activity.css";

gsap.registerPlugin(ScrollTrigger);

const typeColors: Record<string, string> = {
  announcement: "#C0392B",
  result: "#5D8A3C",
  event: "#7B2D8E",
  update: "#2F5496",
};

const Activity: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".activity-card",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".activity-list", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="activity-section" id="activity" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">
            <span className="tag-dot" />
            Campus Activity
          </span>
          <h2 className="section-title">Stay in the <span className="hand-underline">Loop</span></h2>
          <p className="section-desc">
            Real-time updates from clubs and organizers across campus. Stay ahead.
          </p>
        </div>

        <div className="activity-list">
          {activities.map((item) => (
            <motion.div
              key={item.id}
              className="activity-card"
              whileHover={{ x: 6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div
                className="activity-type-bar"
                style={{ background: typeColors[item.type] }}
              />
              <div
                className="activity-icon"
                style={{
                  background: `${typeColors[item.type]}12`,
                  color: typeColors[item.type],
                }}
              >
                {getIcon(item.icon, 22)}
              </div>
              <div className="activity-body">
                <p className="activity-text">{item.text}</p>
                <div className="activity-meta">
                  <span
                    className="activity-type-badge"
                    style={{
                      color: typeColors[item.type],
                      background: `${typeColors[item.type]}15`,
                      borderColor: `${typeColors[item.type]}30`,
                    }}
                  >
                    {item.type}
                  </span>
                  <span className="activity-time">{item.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activity;
