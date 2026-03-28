import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ClubLogin from "./ClubLogin";
import ClubSignup from "./ClubSignup";

const ClubAuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  return isLogin
    ? <ClubLogin onSwitch={() => setIsLogin(false)} />
    : <ClubSignup onSwitch={() => setIsLogin(true)} />;
};

export default ClubAuthPage;
