import React, { useState } from "react";
import styled from "styled-components";
import { redirectUrl } from "../../../constants/base-api-url";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authCodeAtom } from "../../../recoil/atoms";

const Login = () => {
  const navigate = useNavigate();
  const [authCode, setAuthCode] = useRecoilState(authCodeAtom);

  const goToHome = () => {
    navigate("/");
  };

  const handleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=521902002161-89ta0ucjee05ts0donvi9s7kr2637jol.apps.googleusercontent.com&redirect_uri=${redirectUrl}`;
  };

  const handleLogout = () => {
    setAuthCode(null);
    localStorage.removeItem("authCode");
  };

  return (
    <LoginComponent>
      <HomeButton onClick={goToHome}>Home</HomeButton>
      {authCode ? (
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      ) : (
        <SignInButton onClick={handleLogin}>Sign In</SignInButton>
      )}
    </LoginComponent>
  );
};

export default Login;

const LoginComponent = styled.div`
  padding: 10px 3vw 0 0;
`;

const HomeButton = styled.button`
  color: #917f9e;
  border: none;
  padding: 10px 20px;
  font-size: 20px;
  background: none;
  font-weight: 700;
`;

const SignInButton = styled.button`
  color: #917f9e;
  border: none;
  padding: 10px 20px;
  font-size: 20px;
  background: none;
  font-weight: 700;
`;

const LogoutButton = styled.button`
  color: #917f9e;
  border: none;
  padding: 10px 20px;
  font-size: 20px;
  background: none;
  font-weight: 700;
`;
