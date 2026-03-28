import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getIcon } from "../../data/iconMap";
import "./Admin.css";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "student" | "club" | "admin";
  rollNumber?: string;
  registrationNumber?: string;
  course?: string;
  department?: string;
  school?: string;
  clubDescription?: string;
  createdAt?: string;
}

const API_BASE = process.env.REACT_APP_API_URL || "/api";

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"all" | "student" | "club">("all");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("cc_admin") || "null");

  useEffect(() => {
    if (!admin) { navigate("/admin", { replace: true }); return; }
    fetchUsers();
  }, []); // eslint-disable-line

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "users"));
      const list: UserRecord[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as UserRecord));
      setUsers(list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")));
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (uid: string) => {
    if (!admin) return;
    setDeleting(uid);

    try {
      // Try serverless function first (deletes Auth + Firestore)
      const res = await fetch(`${API_BASE}/delete-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, adminUid: admin.id }),
      });

      if (!res.ok) {
        // Fallback: delete Firestore doc only
        await deleteDoc(doc(db, "users", uid));
      }

      setUsers((prev) => prev.filter((u) => u.id !== uid));
    } catch {
      // Fallback: delete Firestore doc only
      try {
        await deleteDoc(doc(db, "users", uid));
        setUsers((prev) => prev.filter((u) => u.id !== uid));
      } catch (err) {
        console.error("Delete error:", err);
      }
    } finally {
      setDeleting(null);
      setConfirmDelete(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cc_admin");
    navigate("/admin", { replace: true });
  };

  const filtered = users
    .filter((u) => u.role !== "admin")
    .filter((u) => tab === "all" || u.role === tab)
    .filter((u) =>
      search === "" ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.rollNumber || "").toLowerCase().includes(search.toLowerCase())
    );

  const studentCount = users.filter((u) => u.role === "student").length;
  const clubCount = users.filter((u) => u.role === "club").length;

  return (
    <div className="admin-page">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <a href="/" className="admin-logo">
            <img src="/au_logo.png" alt="Logo" />
            <span>Uni<strong>Loop</strong></span>
          </a>
          <div className="admin-header-right">
            <span className="admin-badge">Admin</span>
            <span className="admin-name">{admin?.name}</span>
            <button className="admin-logout" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <span className="admin-stat-icon">{getIcon("run", 22)}</span>
            <div>
              <span className="admin-stat-value">{studentCount}</span>
              <span className="admin-stat-label">Students</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-icon">{getIcon("code", 22)}</span>
            <div>
              <span className="admin-stat-value">{clubCount}</span>
              <span className="admin-stat-label">Clubs</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-icon">{getIcon("trophy", 22)}</span>
            <div>
              <span className="admin-stat-value">{studentCount + clubCount}</span>
              <span className="admin-stat-label">Total Users</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="admin-controls">
          <div className="admin-tabs">
            {(["all", "student", "club"] as const).map((t) => (
              <button key={t} className={`admin-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
                {t === "all" ? "All" : t === "student" ? "Students" : "Clubs"}
              </button>
            ))}
          </div>
          <input
            className="admin-search"
            type="text"
            placeholder="Search by name, email, or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="admin-loading"><span className="auth-spinner" /></div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">No users found.</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Details</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((u) => (
                    <motion.tr
                      key={u.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td className="td-name">{u.name}</td>
                      <td className="td-email">{u.email}</td>
                      <td><span className={`role-badge role-${u.role}`}>{u.role}</span></td>
                      <td className="td-details">
                        {u.role === "student" && (
                          <span>{u.course} / {u.department}{u.rollNumber ? ` / ${u.rollNumber}` : ""}</span>
                        )}
                        {u.role === "club" && (
                          <span>{u.clubDescription ? u.clubDescription.slice(0, 50) + (u.clubDescription.length > 50 ? "..." : "") : "—"}</span>
                        )}
                      </td>
                      <td className="td-date">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                      </td>
                      <td>
                        {confirmDelete === u.id ? (
                          <div className="delete-confirm">
                            <button className="delete-yes" onClick={() => handleDelete(u.id)} disabled={deleting === u.id}>
                              {deleting === u.id ? "..." : "Yes, delete"}
                            </button>
                            <button className="delete-no" onClick={() => setConfirmDelete(null)}>Cancel</button>
                          </div>
                        ) : (
                          <button className="delete-btn" onClick={() => setConfirmDelete(u.id)}>Delete</button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
