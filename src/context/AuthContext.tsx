import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "club";
  rollNumber?: string;
  registrationNumber?: string;
  course?: string;
  department?: string;
  school?: string;
  clubDescription?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: "student" | "club";
  rollNumber?: string;
  registrationNumber?: string;
  course?: string;
  department?: string;
  school?: string;
  clubDescription?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const CACHE_KEY = "cc_user";

function getCachedUser(): User | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function cacheUser(user: User | null) {
  if (user) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CACHE_KEY);
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Instantly restore cached user — no loading flash
  const [user, setUser] = useState<User | null>(getCachedUser);
  const [loading, setLoading] = useState(!getCachedUser());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const d = userDoc.data();
            const u: User = {
              id: firebaseUser.uid,
              name: d.name,
              email: d.email,
              role: d.role,
              rollNumber: d.rollNumber,
              registrationNumber: d.registrationNumber,
              course: d.course,
              department: d.department,
              school: d.school,
              clubDescription: d.clubDescription,
            };
            setUser(u);
            cacheUser(u);
          }
        } catch {
          setUser(null);
          cacheUser(null);
        }
      } else {
        setUser(null);
        cacheUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (data: SignupData) => {
    setLoading(true);
    setError(null);
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, data.email, data.password);

      const profile: Record<string, any> = {
        name: data.name,
        email: data.email.toLowerCase(),
        role: data.role,
        createdAt: new Date().toISOString(),
      };

      if (data.role === "student") {
        profile.rollNumber = data.rollNumber || "";
        profile.registrationNumber = data.registrationNumber || "";
        profile.course = data.course || "";
        profile.department = data.department || "";
        profile.school = data.school || "SOET";
      } else {
        profile.clubDescription = data.clubDescription || "";
      }

      await setDoc(doc(db, "users", firebaseUser.uid), profile);

      const u: User = {
        id: firebaseUser.uid,
        name: data.name,
        email: data.email,
        role: data.role,
        rollNumber: profile.rollNumber,
        registrationNumber: profile.registrationNumber,
        course: profile.course,
        department: profile.department,
        school: profile.school,
      };
      setUser(u);
      cacheUser(u);
    } catch (err: any) {
      setError(firebaseErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged handles the rest
    } catch (err: any) {
      setError(firebaseErrorMessage(err.code));
      setLoading(false);
    }
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
    cacheUser(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

function firebaseErrorMessage(code: string): string {
  switch (code) {
    case "auth/email-already-in-use": return "An account with this email already exists";
    case "auth/invalid-email": return "Invalid email address";
    case "auth/weak-password": return "Password must be at least 6 characters";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential": return "Invalid email or password";
    case "auth/too-many-requests": return "Too many attempts. Please try again later";
    default: return "Something went wrong. Please try again";
  }
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
