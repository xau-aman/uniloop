import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { IconArrowRight } from "./Icons";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 0.8,
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-card" ref={ctaRef}>
            <div className="cta-glow" />
            <div className="cta-content">
              <h2 className="cta-title">Ready to Get Involved?</h2>
              <p className="cta-desc">
                Join UniLoop and never miss what matters. It takes 30 seconds.
              </p>
              <motion.button
                className="cta-btn"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started — It's Free <IconArrowRight />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="section-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#hero" className="footer-logo">
                <img src="/au_logo.png" alt="UniLoop" className="footer-logo-img" />
                Uni<span>Loop</span>
              </a>
              <p className="footer-tagline">
                Your one-stop hub for campus life. Discover, connect, and thrive.
              </p>
            </div>
            <div className="footer-col">
              <h4>Platform</h4>
              <a href="#events">Events</a>
              <a href="#clubs">Clubs</a>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <a href="#!">Help Center</a>
              <a href="#!">Contact Us</a>
              <a href="#!">Feedback</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#!">Privacy</a>
              <a href="#!">Terms</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Built at 3 AM with ☕️</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
