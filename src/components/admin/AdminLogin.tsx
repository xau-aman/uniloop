import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { IconArrowRight } from "../Icons";
import "./Admin.css";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("cc_admin")) navigate("/admin/dashboard", { replace: true });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Read admin credentials from Firestore: collection "admin", document "credentials"
      const snap = await getDoc(doc(db, "admin", "credentials"));

      if (!snap.exists()) {
        setError("Admin not configured. Create an 'admin/credentials' document in Firestore.");
        setLoading(false);
        return;
      }

      const data = snap.data();

      if (email === data.email && password === data.password) {
        localStorage.setItem("cc_admin", JSON.stringify({
          name: data.name || "Admin",
          email: data.email,
          role: "admin",
        }));
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("Invalid admin credentials");
      }
    } catch (err: any) {
      console.error("Admin login error:", err);
      setError("Could not verify credentials. Check Firestore rules.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="auth-bg" />
      <motion.div
        className="admin-login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <a href="/" className="admin-login-topbar">
          <img src="/au_logo.png" alt="UniLoop" className="admin-login-logo" />
          <span>Uni<strong>Loop</strong></span>
        </a>

        <div className="admin-login-badge">Admin Panel</div>

        <h1>Admin Sign In</h1>
        <p className="admin-login-sub">Restricted access — authorized personnel only</p>

        {error && (
          <motion.div className="auth-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setError(null)}>
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Admin Email</label>
            <input type="email" placeholder="admin@campusconnect.in" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter admin password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <motion.button type="submit" className="auth-submit admin-submit" disabled={loading} whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
            {loading ? <span className="auth-spinner" /> : <>Access Dashboard <IconArrowRight /></>}
          </motion.button>
        </form>

        <a href="/" className="admin-back-link">Back to Home</a>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
