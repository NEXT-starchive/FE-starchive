import Header from "../components/Header/Header";
import Contents from "../components/Contents/Contents";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseApiUrl } from "../constants/base-api-url";
import { authCodeAtom } from "../recoil/atoms";
import { useRecoilState } from "recoil";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authCode, setAuthCode] = useState("");
  const [authToken, setAuthToken] = useRecoilState(authCodeAtom);

  const handleLogin = () => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    if (code) {
      setAuthCode(code);
      console.log("code", code);
    } else {
      const localToken = JSON.parse(localStorage.getItem("authCode"));
      if (localToken) {
        setAuthToken(localToken);
      }
    }
  };

  const getToken = () => {};

  useEffect(() => {
    if (authCode) {
      axios
        .get(`${baseApiUrl}/api/login`, { params: { code: authCode } })
        .then((response) => {
          // 성공적인 응답 처리

          console.log("rep");
          console.log("Login successful:", response.data);

          const authData = JSON.stringify(response.data.data);
          localStorage.setItem("authCode", JSON.stringify(response.data.data));
          setAuthToken(authData);
          // navigate("/");
        })
        .catch((error) => {
          // 에러 처리
          console.error("Login error:", error);
        })
        .finally(() => {});
    }
  }, [authCode]);

  useEffect(() => {
    handleLogin();

    // window.confirm("서버로 토큰 보내기") ? navigate("/") : navigate("/");
  }, []);

  return (
    <>
      <Header />
      <Contents />
    </>
  );
};

export default Home;
