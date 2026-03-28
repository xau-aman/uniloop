import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { IconLocation, IconUsers, IconClock } from "./Icons";
import { events, categories, Category } from "../data";
import { getIcon } from "../data/iconMap";
import "./Events.css";

gsap.registerPlugin(ScrollTrigger);

const Events: React.FC = () => {
  const [active, setActive] = useState<Category>("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const filtered = active === "all" ? events : events.filter((e) => e.category === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="events-section" id="events" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header" ref={headerRef}>
          <span className="section-tag">
            <span className="tag-dot" />
            Upcoming Events
          </span>
          <h2 className="section-title">What's <span className="hand-underline">Happening</span> on Campus</h2>
          <p className="section-desc">
            Don't miss out — here are the hottest upcoming events curated for you.
          </p>
        </div>

        <div className="filter-bar">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`filter-chip ${active === cat ? "active" : ""}`}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
              {active === cat && (
                <motion.div className="chip-bg" layoutId="activeChip" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
            </motion.button>
          ))}
        </div>

        <motion.div className="events-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((event) => (
              <motion.div
                key={event.id}
                className={`event-card ${event.featured ? "featured" : ""}`}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ y: -8 }}
              >
                <div className="card-visual">
                  <img src={event.image} alt={event.title} className="card-image" loading="lazy" />
                  <div className="card-image-overlay" />
                  <span className={`card-badge ${event.featured ? "badge-featured" : ""}`}>
                    {event.badge}
                  </span>
                  <div className="card-date-chip">
                    <span className="date-day">{event.day}</span>
                    <span className="date-month">{event.month}</span>
                  </div>
                </div>
                <div className="card-content">
                  <div className="card-title-row">
                    <span className="card-icon">{getIcon(event.icon, 18)}</span>
                    <h3 className="card-title">{event.title}</h3>
                  </div>
                  <p className="card-desc">{event.desc}</p>
                  <div className="card-meta">
                    <span className="meta-item">
                      <IconLocation /> {event.location}
                    </span>
                    <span className="meta-item">
                      <IconClock /> {event.time}
                    </span>
                    <span className="meta-item">
                      <IconUsers /> {event.spots}
                    </span>
                  </div>
                  <motion.button
                    className="card-action"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Register Now
                  </motion.button>
                </div>
                {event.featured && <div className="featured-glow" />}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
