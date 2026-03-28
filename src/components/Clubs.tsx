import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { IconUsers } from "./Icons";
import { clubs } from "../data";
import { getIcon } from "../data/iconMap";
import "./Clubs.css";

gsap.registerPlugin(ScrollTrigger);

const Clubs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".club-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".clubs-grid", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="clubs-section" id="clubs" ref={sectionRef}>
      <div className="clubs-bg-accent" />

      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">
            <span className="tag-dot" />
            Student Clubs
          </span>
          <h2 className="section-title">Find Your <span className="hand-underline">Tribe</span></h2>
          <p className="section-desc">
            From coding to dance, there's a club for every passion. Explore and join today.
          </p>
        </div>

        <div className="clubs-grid">
          {clubs.map((club) => (
            <motion.div
              key={club.id}
              className="club-card"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="club-icon-wrap">
                {getIcon(club.icon, 28)}
              </div>
              <h3 className="club-name">{club.name}</h3>
              <p className="club-desc">{club.desc}</p>
              <div className="club-tags">
                {club.tags.map((tag) => (
                  <span key={tag} className="club-tag">{tag}</span>
                ))}
              </div>
              <div className="club-footer">
                <span className="club-members">
                  <IconUsers /> {club.members} members
                </span>
                <motion.button
                  className="club-join"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join
                </motion.button>
              </div>
              <div className="club-card-shine" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clubs;
