import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/Cursor";
import ThemeToggle from "./components/ThemeToggle";
import { SideDoodles } from "./components/Doodles";
import "./components/Doodles.css";

const Events = lazy(() => import("./components/Events"));
const Clubs = lazy(() => import("./components/Clubs"));
const Activity = lazy(() => import("./components/Activity"));
const Footer = lazy(() => import("./components/Footer"));
const AuthPage = lazy(() => import("./components/auth/AuthPage"));
const ClubAuthPage = lazy(() => import("./components/auth/ClubAuthPage"));
const AdminLogin = lazy(() => import("./components/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));

const Loader: React.FC = () => (
  <div className="page-loader"><span className="auth-spinner" /></div>
);

const LandingPage: React.FC = () => (
  <>
    <Navbar />
    <Hero />
    <Suspense fallback={<Loader />}>
      <Events />
      <Clubs />
      <Activity />
      <Footer />
    </Suspense>
  </>
);

const Dashboard: React.FC = () => (
  <>
    <Navbar />
    <Hero />
    <Suspense fallback={<Loader />}>
      <Events />
      <Clubs />
      <Activity />
      <Footer />
    </Suspense>
  </>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

const AppRoutes: React.FC = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/auth/club" element={<ClubAuthPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

const App: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <CustomCursor />
        <ThemeToggle />
        <div className="noise-overlay" />
        <SideDoodles />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
