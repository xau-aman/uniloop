import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { clubs } from "../data";
import { IconInstagram } from "./Icons";
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
          stagger: 0.06,
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
            Active clubs at Adamas University — from coding to dance, there's a club for every passion.
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
              <div className="club-card-top">
                <div className="club-logo-wrap">
                  <img src={club.logo} alt={club.name} className="club-logo-img" loading="lazy" />
                </div>
                {club.instagram && (
                  <a href={club.instagram} target="_blank" rel="noopener noreferrer" className="club-insta-icon" aria-label={`${club.name} Instagram`}>
                    <IconInstagram size={16} />
                  </a>
                )}
              </div>
              <h3 className="club-name">{club.name}</h3>
              <span className="club-subtitle">{club.subtitle}</span>
              <p className="club-desc">{club.desc}</p>
              <div className="club-tags">
                {club.tags.map((tag) => (
                  <span key={tag} className="club-tag">{tag}</span>
                ))}
              </div>
              <div className="club-footer">
                <Link to={`/club/${club.id}`} className="club-learn-more">Learn More</Link>
                <button className="club-join" disabled>Join</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clubs;
