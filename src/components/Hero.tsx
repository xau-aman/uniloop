import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { IconArrowRight } from "./Icons";
import { StarDoodle, CircleDoodle, ArrowDoodle, CrossDoodle, PaperPlane, PaperPlaneLarge, Marquee } from "./Doodles";
import { getIcon } from "../data/iconMap";
import "./Hero.css";

const stats = [
  { value: "50+", label: "Active Clubs", icon: "trophy" },
  { value: "120+", label: "Events/Month", icon: "calendar" },
  { value: "5K+", label: "Students", icon: "run" },
];

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-badge", { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 })
        .fromTo(headingRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "-=0.4")
        .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(actionsRef.current?.children ?? [], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, "-=0.4")
        .fromTo(statsRef.current?.children ?? [], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".hero .doodle", { opacity: 0, scale: 0 }, { opacity: 0.15, scale: 1, duration: 0.6, stagger: 0.08 }, "-=0.5");

      gsap.to(".orb", {
        y: "random(-40, 40)", x: "random(-20, 20)",
        duration: "random(4, 7)", repeat: -1, yoyo: true,
        ease: "sine.inOut", stagger: { amount: 2, from: "random" },
      });

      const hero = heroRef.current;
      if (hero) {
        hero.addEventListener("mousemove", (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 25;
          const y = (e.clientY / window.innerHeight - 0.5) * 25;
          gsap.to(".orb-group", { x, y, duration: 1.2, ease: "power2.out" });
          gsap.to(".hero .doodle", { x: x * 0.3, y: y * 0.3, duration: 1.5, ease: "power2.out" });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="hero" id="hero" ref={heroRef}>
        <div className="orb-group">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <div className="hero-grid-pattern" />

        {/* Doodle decorations */}
        <StarDoodle className="doodle-float" />
        <CircleDoodle className="doodle-spin hero-doodle-circle" />
        <ArrowDoodle className="doodle-float hero-doodle-arrow" />
        <CrossDoodle className="doodle-pulse hero-doodle-cross" />
        <PaperPlane className="doodle-float hero-doodle-plane-1" />
        <PaperPlaneLarge className="doodle-float hero-doodle-plane-2" />

        <div className="hero-container">
          <motion.div className="hero-badge" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <img src="/au_logo.png" alt="UniLoop" className="hero-badge-logo" />
            <span>Your Campus, One Platform</span>
          </motion.div>

          <h1 ref={headingRef} className="hero-heading">
            Never Miss a<br />
            <span className="hero-gradient hand-underline">Campus Moment</span>
            <br />Again
          </h1>

          <p ref={subtitleRef} className="hero-subtitle">
            Discover events, explore clubs, and stay connected with everything
            happening on campus — built by students who get it.
          </p>

          <div ref={actionsRef} className="hero-actions">
            <motion.a href="#events" className="hero-btn hero-btn-primary" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              Browse Events <IconArrowRight />
            </motion.a>
            <motion.a href="#clubs" className="hero-btn hero-btn-outline" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              Explore Clubs
            </motion.a>
          </div>

          <div ref={statsRef} className="hero-stats">
            {stats.map((s) => (
              <div key={s.label} className="hero-stat">
                <span className="stat-icon">{getIcon(s.icon, 20)}</span>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Marquee />
    </>
  );
};

export default Hero;
