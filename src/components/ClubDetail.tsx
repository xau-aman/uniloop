import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { clubs } from "../data";
import { getIcon } from "../data/iconMap";
import { IconInstagram } from "./Icons";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./ClubDetail.css";

const ClubDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const club = clubs.find((c) => c.id === Number(id));
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".cd-logo-wrap", { opacity: 0, scale: 0.8, rotate: -10 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: "back.out(1.7)" });
      gsap.fromTo(".cd-name", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
      gsap.fromTo(".cd-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.3 });
      gsap.fromTo(".cd-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.4 });
      gsap.fromTo(".cd-tags", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.5 });
      gsap.fromTo(".cd-info-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.5 });
      gsap.fromTo(".cd-instagram", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.7 });
    }, pageRef);
    return () => ctx.revert();
  }, [id]);

  if (!club) {
    return (
      <>
        <Navbar />
        <div className="cd-not-found">
          <h2>Club not found</h2>
          <Link to="/#clubs" className="cd-back-btn">Back to Clubs</Link>
        </div>
      </>
    );
  }

  const fullDescriptions: Record<number, string> = {
    1: "Eastern, Western, Classical as well as instrument sessions are conducted throughout the year. The students enjoy collaborating with different clubs and make the campus musically magical and full of life. Musicorum aims at encouraging students to organize music related events and discover their musical talents.",
    2: "Founded on 28th November 2017, \"For the student, Of the student and By the student\". Students innovate, tackle real life problems, and engineer technology. The club works with Computer Vision and AI, designing and fabrication of PCBs, developing automation technologies and IoT technologies for different industrial purposes. Learning sessions, hands-on workshops, and mentorship for the future.",
    3: "Jhankar at Adamas University promotes cultural diversity by boosting up the morale of students and by highlighting the talent of dance and creativity. When students get tired of books and assignments, they head to Jhankar and feel relaxed by expressing themselves through the language of Dance. The club participates in all major cultural events and inter-college competitions.",
    4: "Film and drama is nothing but a KISSA of life. Kissewala, the Film Club of Adamas University stemmed from the mutual love of Film-making and Film Appreciation. The primary aim of the club is to nurture and encourage students' mutual passion for films and filmmaking. From short films to stage plays, Kissewala brings stories to life.",
    5: "The Club is dedicated to promoting the spirit of entrepreneurship among students throughout the university and bringing next sustainable start-ups from the university. Inside the club, a learning-by-doing environment is created where students can cultivate their entrepreneurship skills through pitch competitions, mentorship sessions, and real-world business challenges.",
    6: "The club deals with teaching basic and advanced coding ideas to all University students. In today's world coding is a basic knowledge component which is required for all walks of life. Cy-Coders organizes hackathons, coding competitions, workshops on various programming languages, and mentors students for competitive programming.",
  };

  const instaHandle = club.instagram ? club.instagram.replace("https://www.instagram.com/", "").replace("/", "") : "";

  return (
    <>
      <Navbar />
      <div className="cd-page" ref={pageRef}>
        <div className="cd-container">
          <Link to="/#clubs" className="cd-back-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M10 12L6 8l4-4" />
            </svg>
            Back to Clubs
          </Link>

          <div className="cd-hero">
            <motion.div className="cd-logo-wrap" whileHover={{ rotate: 3, scale: 1.05 }}>
              <img src={club.logo} alt={club.name} className="cd-logo-img" />
            </motion.div>

            <div className="cd-hero-text">
              <h1 className="cd-name">{club.name}</h1>
              <span className="cd-subtitle">{club.subtitle}</span>
              <p className="cd-desc">{fullDescriptions[club.id] || club.desc}</p>
              <div className="cd-tags">
                {club.tags.map((tag) => (
                  <span key={tag} className="cd-tag">{tag}</span>
                ))}
              </div>

              {club.instagram && (
                <a href={club.instagram} target="_blank" rel="noopener noreferrer" className="cd-instagram">
                  <IconInstagram size={18} />
                  <span>@{instaHandle}</span>
                </a>
              )}
            </div>
          </div>

          <div className="cd-info-grid">
            <div className="cd-info-card">
              <span className="cd-info-icon">{getIcon("calendar", 22)}</span>
              <h4>Regular Sessions</h4>
              <p>Weekly meetups and workshops throughout the academic year</p>
            </div>
            <div className="cd-info-card">
              <span className="cd-info-icon">{getIcon("trophy", 22)}</span>
              <h4>Competitions</h4>
              <p>Participate in inter-college and national level events</p>
            </div>
            <div className="cd-info-card">
              <span className="cd-info-icon">{getIcon("target", 22)}</span>
              <h4>Open to All</h4>
              <p>Students from any department and year can join</p>
            </div>
          </div>

          <div className="cd-cta">
            {club.instagram && (
              <a href={club.instagram} target="_blank" rel="noopener noreferrer" className="cd-insta-btn">
                <IconInstagram size={18} />
                Follow on Instagram
              </a>
            )}
            <button className="cd-join-btn" disabled>
              Joining Coming Soon
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClubDetail;
