import Header from "../components/Header/Header";
import Contents from "../components/Contents/Contents";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseApiUrl } from "../constants/base-api-url";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authCode, setAuthCode] = useState("");

  const handleLogin = () => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    if (code) {
      setAuthCode(code);
      console.log("code", code);
    }
  };

  useEffect(() => {
    if (authCode) {
      axios
        .get(`${baseApiUrl}/api/login`, { params: { code: authCode } })
        .then((response) => {
          // 성공적인 응답 처리

          console.log("rep");
          console.log("Login successful:", response.data);

          localStorage.setItem("authCode", response.data);
        })
        .catch((error) => {
          // 에러 처리
          console.error("Login error:", error);
        })
        .finally(() => {
          navigate("/");
        });
    }
  }, [authCode]);

  useEffect(() => {
    handleLogin();
    // window.confirm("서버로 토큰 보내기") ? navigate("/") : navigate("/");
  }, []);

  return (
    <>
      <div>Auth</div>
      <Header />
      <Contents />
    </>
  );
};

export default Auth;
