import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { IconArrowRight, IconCode } from "../Icons";
import "./Auth.css";

interface Props {
  onSwitch: () => void;
}

const ClubLogin: React.FC<Props> = ({ onSwitch }) => {
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" />

      <div className="auth-wrapper">
        <div className="auth-brand-panel auth-brand-club">
          <div className="auth-brand-content">
            <div className="auth-brand-logo">
              <span className="auth-brand-icon auth-brand-icon-club"><IconCode size={28} /></span>
              <span>Club<strong>Portal</strong></span>
            </div>
            <h2>Manage your<br />club presence.</h2>
            <p>Post events, grow your community, and engage with students across campus.</p>
          </div>
        </div>

        <motion.div
          className="auth-form-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="auth-topbar">
            <a href="/" className="auth-topbar-logo">
              <img src="/au_logo.png" alt="UniLoop" />
              <span>Uni<strong>Loop</strong></span>
            </a>
            <a href="/" className="auth-back-home">Back to Home</a>
          </div>

          <div className="auth-form-header">
            <h1>Club sign in</h1>
            <p>Access your club dashboard</p>
          </div>

          {error && (
            <motion.div className="auth-error" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} onClick={clearError}>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Club email</label>
              <input type="email" placeholder="club@university.edu" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus autoComplete="email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            </div>
            <motion.button type="submit" className="auth-submit auth-submit-club" disabled={loading} whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
              {loading ? <span className="auth-spinner" /> : <>Sign In <IconArrowRight /></>}
            </motion.button>
          </form>

          <div className="auth-footer">
            <p>New club? <button onClick={onSwitch} className="auth-link auth-link-club">Register your club</button></p>
            <div className="auth-divider"><span>or</span></div>
            <a href="/auth" className="auth-alt-link"><span className="alt-dot alt-dot-student" />Student Login</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClubLogin;
