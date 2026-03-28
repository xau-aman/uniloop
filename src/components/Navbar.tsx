import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { IconMenu, IconClose } from "./Icons";
import "./Navbar.css";

const navItems = [
  { label: "Events", href: "#events" },
  { label: "Clubs", href: "#clubs" },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className="nav-container">
        <a href="/" className="nav-logo">
          <img src="/au_logo.png" alt="UniLoop" className="nav-logo-img" />
          <span className="logo-text">
            Uni<span className="logo-accent">Loop</span>
          </span>
        </a>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="nav-link">
                {item.label}
                <span className="nav-link-indicator" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop auth/user */}
        <div className="nav-right desktop-only">
          {user ? (
            <div className="nav-user-wrap">
              <button
                className="nav-avatar"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="User menu"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="nav-dropdown"
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="dropdown-header">
                      <span className="dropdown-name">{user.name}</span>
                      <span className="dropdown-role">{user.role}</span>
                    </div>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item" onClick={() => { logout(); setDropdownOpen(false); }}>
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="nav-auth-btns">
              <a href="/auth" className="nav-signin">Sign In</a>
              <a href="/auth" className="nav-cta">Sign Up</a>
            </div>
          )}
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <IconClose size={24} /> : <IconMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="mobile-link"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}

            <div className="mobile-divider" />

            {user ? (
              <>
                <div className="mobile-user-info">
                  <span className="mobile-user-name">{user.name}</span>
                  <span className="mobile-user-role">{user.role}</span>
                </div>
                <button className="mobile-logout-btn" onClick={() => { logout(); setMobileOpen(false); }}>
                  Sign Out
                </button>
              </>
            ) : (
              <div className="mobile-auth-btns">
                <a href="/auth" className="mobile-signin" onClick={() => setMobileOpen(false)}>Sign In</a>
                <a href="/auth" className="mobile-signup" onClick={() => setMobileOpen(false)}>Sign Up</a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
