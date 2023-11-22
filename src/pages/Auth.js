import Header from "../components/Header/Header";
import Contents from "../components/Contents/Contents";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.confirm("서버로 토큰 보내기") ? navigate("/") : navigate("/");
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
