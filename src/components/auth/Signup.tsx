import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { IconArrowRight } from "../Icons";
import "./Auth.css";

interface Props {
  onSwitch: () => void;
}

const departments = [
  "SOET — School of Engineering & Technology",
  "SOBAS — School of Basic & Applied Sciences",
  "SOMC — School of Media & Communication",
  "SOLACS — School of Literature & Cultural Studies",
];

const Signup: React.FC<Props> = ({ onSwitch }) => {
  const { signup, loading, error, clearError } = useAuth();
  const [step, setStep] = useState(1);

  // Step 1
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2
  const [rollNumber, setRollNumber] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const school = department.split(" — ")[0] || department;
    await signup({
      name, email, password, role: "student",
      rollNumber, registrationNumber, course,
      department: school,
      school: "SOET",
    });
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" />

      <div className="auth-wrapper">
        {/* Left — Branding */}
        <div className="auth-brand-panel">
          <div className="auth-brand-content">
            <div className="auth-brand-logo">
              <img src="/au_logo.png" alt="UniLoop" className="auth-brand-logo-img" />
              <span>Uni<strong>Loop</strong></span>
            </div>
            <h2>Join the<br />community.</h2>
            <p>Create your student profile and get access to all campus events, clubs, and activities.</p>
            <div className="auth-brand-stats">
              <div><strong>50+</strong><span>Clubs</span></div>
              <div><strong>120+</strong><span>Events</span></div>
              <div><strong>5K+</strong><span>Students</span></div>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="auth-form-panel">
          <div className="auth-topbar">
            <a href="/" className="auth-topbar-logo">
              <img src="/au_logo.png" alt="UniLoop" />
              <span>Uni<strong>Loop</strong></span>
            </a>
            <a href="/" className="auth-back-home">Back to Home</a>
          </div>

          <div className="auth-form-header">
            <h1>Create account</h1>
            <p>{step === 1 ? "Start with your basic details" : "Now your academic information"}</p>
          </div>

          {/* Steps */}
          <div className="steps">
            <div className={`step ${step >= 1 ? "active" : ""}`}>
              <span className="step-num">1</span>
              <span className="step-label">Account</span>
            </div>
            <div className={`step-connector ${step >= 2 ? "filled" : ""}`} />
            <div className={`step ${step >= 2 ? "active" : ""}`}>
              <span className="step-num">2</span>
              <span className="step-label">Academic</span>
            </div>
          </div>

          {error && (
            <motion.div
              className="auth-error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={clearError}
            >{error}</motion.div>
          )}

          <AnimatePresence mode="wait" custom={step}>
            {step === 1 ? (
              <motion.form
                key="s1"
                className="auth-form"
                onSubmit={handleNext}
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <div className="form-group">
                  <label>Full name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    placeholder="you@stu.adamasuniversity.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="auth-submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                >
                  Continue <IconArrowRight />
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="s2"
                className="auth-form"
                onSubmit={handleSubmit}
                custom={2}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
              >
                <div className="form-group">
                  <label>Roll number</label>
                  <input
                    type="text"
                    placeholder="Enter your roll number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label>Registration number</label>
                  <input
                    type="text"
                    placeholder="Enter your registration number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Course</label>
                  <input
                    type="text"
                    placeholder="BCA, B.Tech, MBA, etc."
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>School / Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select your school</option>
                    {departments.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="form-btn-row">
                  <button type="button" className="auth-back" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <motion.button
                    type="submit"
                    className="auth-submit auth-submit-grow"
                    disabled={loading}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                  >
                    {loading ? <span className="auth-spinner" /> : <>Create Account <IconArrowRight /></>}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <button onClick={onSwitch} className="auth-link">Sign in</button>
            </p>
            <div className="auth-divider"><span>or</span></div>
            <a href="/auth/club" className="auth-alt-link">
              <span className="alt-dot alt-dot-club" />
              Club Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
