import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Login from "./Login";
import Signup from "./Signup";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  return isLogin
    ? <Login onSwitch={() => setIsLogin(false)} />
    : <Signup onSwitch={() => setIsLogin(true)} />;
};

export default AuthPage;
