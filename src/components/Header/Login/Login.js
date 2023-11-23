import React, { useState } from "react";
import styled from "styled-components";
import { redirectUrl } from "../../../constants/base-api-url";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const handleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=521902002161-89ta0ucjee05ts0donvi9s7kr2637jol.apps.googleusercontent.com&redirect_uri=${redirectUrl}`;
  };

  return (
    <LoginComponent>
      <HomeButton onClick={goToHome}>Home</HomeButton>
      <SignInButton onClick={handleLogin}>Sign in</SignInButton>
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
`;

const SignInButton = styled.button`
  color: #917f9e;
  border: none;
  padding: 10px 20px;
  font-size: 20px;
  background: none;
`;
