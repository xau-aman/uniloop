import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { IconSun, IconMoon } from "./Icons";
import "./ThemeToggle.css";

const ThemeToggle: React.FC = () => {
  const { theme, toggle } = useTheme();
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    setAnimating(true);
    setTimeout(() => {
      toggle();
      setTimeout(() => setAnimating(false), 500);
    }, 300);
  };

  return (
    <>
      {/* Full-screen transition overlay */}
      <AnimatePresence>
        {animating && (
          <motion.div
            className="theme-transition-overlay"
            initial={{ clipPath: "circle(0% at calc(100% - 52px) calc(100% - 52px))" }}
            animate={{ clipPath: "circle(150% at calc(100% - 52px) calc(100% - 52px))" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{ background: theme === "light" ? "#121218" : "#F5F0E8" }}
          />
        )}
      </AnimatePresence>

      <motion.button
        className="floating-theme-toggle"
        onClick={handleToggle}
        aria-label="Toggle theme"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.85 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="theme-icon-wrap"
          >
            {theme === "light" ? <IconMoon size={20} /> : <IconSun size={20} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default ThemeToggle;
