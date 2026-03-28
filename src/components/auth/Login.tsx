import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { IconArrowRight } from "../Icons";
import "./Auth.css";

interface Props {
  onSwitch: () => void;
}

const Login: React.FC<Props> = ({ onSwitch }) => {
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
        {/* Left — Branding panel */}
        <div className="auth-brand-panel">
          <div className="auth-brand-content">
            <div className="auth-brand-logo">
              <img src="/au_logo.png" alt="UniLoop" className="auth-brand-logo-img" />
              <span>Uni<strong>Loop</strong></span>
            </div>
            <h2>Your campus,<br />one platform.</h2>
            <p>Discover events, explore clubs, and stay connected with everything happening around you.</p>
            <div className="auth-brand-stats">
              <div><strong>50+</strong><span>Clubs</span></div>
              <div><strong>120+</strong><span>Events</span></div>
              <div><strong>5K+</strong><span>Students</span></div>
            </div>
          </div>
        </div>

        {/* Right — Form */}
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
            <h1>Sign in</h1>
            <p>Enter your credentials to access your account</p>
          </div>

          {error && (
            <motion.div
              className="auth-error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={clearError}
            >{error}</motion.div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                placeholder="you@stu.adamasuniversity.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <motion.button
              type="submit"
              className="auth-submit"
              disabled={loading}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
            >
              {loading ? <span className="auth-spinner" /> : <>Sign In <IconArrowRight /></>}
            </motion.button>
          </form>

          <div className="auth-footer">
            <p>
              New here?{" "}
              <button onClick={onSwitch} className="auth-link">Create an account</button>
            </p>
            <div className="auth-divider"><span>or</span></div>
            <a href="/auth/club" className="auth-alt-link">
              <span className="alt-dot alt-dot-club" />
              Club Login
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
