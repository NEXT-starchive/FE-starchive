import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

//mock데이터 테스트
import greetingMock from "./Greeting.json";
//image
import button from "./img/button.png";
import calendar from "./img/calendar.png";
import greeting from "./img/greeting.png";
import headerBackground from "./img/headerBackground.png";
import { baseApiUrl } from "../../../constants/base-api-url";
import { dateFormat } from "../../../utils/date-format";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const ModalBox = styled.div`
  width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  z-index: 10;
  box-shadow: 0 0 10px rgba(128, 94, 158, 0.5);
`;

const CloseButton = styled.button`
  float: right;
  color: white;
  border-radius: 100px;
  padding: 5px 10px;
  border: none;
  background-color: #c1c1c1;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ab47bc; /* darker purple */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
`;

const MessageContainer = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #9c27b0; /* light purple */
  font-weight: bold;
  width: 8vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DaysContainer = styled.div`
  /* Add your CSS here */
  padding: 10px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(128, 94, 158, 0.1);
  color: #9c27b0; /* darker purple */
  font-weight: bold;
`;

const Reactcalendar = styled.div`
  width: 350px;
  max-width: 100%;
  background: white;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.125em;
  border-radius: 10px;
  position: center;
  box-shadow: 0px 0px 20px #e0e0e0;
`;

const SaveButton = styled.button`
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  height: 5vh;
  width: 100px;
  font-weight: 700;
  margin-left: 290px;
  background-color: #c1c1c1;

  &:hover {
    background-color: #ab47bc; /* darker purple */
  }
`;

const Input = styled.input`
  width: 370px;
  height: 30px;
  margin-bottom: 20px;
  padding: 3px 10px;
  border-radius: 10px;
  border: 3px dashed #917f9e;
  font-weight: 700;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

function MessageModal({ isOpen, closeModal, message, setMessage }) {
  const [form, setForm] = useState({ message: message });

  const handleChange = (e) => {
    setForm({ message: e.target.value });
  };

  const textBallonPost = async () => {
    const token = JSON.parse(localStorage.getItem("authCode")).accessToken;
    const payload = {
      textballon: form.message,
    };
    //인삿말 가져오기
    try {
      const response = await axios.post(`${baseApiUrl}/textballon`, payload, {
        headers: {
          ACCESS_AUTHORIZATION: `${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmit = () => {
    setMessage(form.message);
    if (localStorage.getItem("authCode")) textBallonPost();
    closeModal();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return isOpen ? (
    <Container>
      <ModalBox>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <h3 style={{ color: "#917F9E" }}>인삿말을 바꿔보세요</h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Input
            type="text"
            name="message"
            placeholder="인삿말을 입력해주세요"
            value={form.message}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <SaveButton onClick={handleSubmit}>저장</SaveButton>
        </div>
      </ModalBox>
    </Container>
  ) : null;
}

function CalendarModal({
  isOpen,
  closeModal,
  setSelectedDate,
  setDaysPassed,
  selectedDate,
}) {
  const calendarPost = async () => {
    //인삿말 가져오기
    const token = JSON.parse(localStorage.getItem("authCode")).accessToken;
    const payload = {
      firstday: dateFormat(selectedDate),
    };
    try {
      const response = await axios.post(`${baseApiUrl}/firstday`, payload, {
        headers: {
          ACCESS_AUTHORIZATION: `${token}`,
        },
      });

      //   setSelectedDate()

      //   setSelectedDate(new Date());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysPassed(diffDays);
    closeModal();
    if (localStorage.getItem("authCode")) calendarPost();
  };

  return isOpen ? (
    <Container>
      <ModalBox>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <h3>입덕일을 입력해주세요</h3>
        <Calendar onChange={handleDateChange} style={{ width: "100vw" }} />
      </ModalBox>
    </Container>
  ) : null;
}

function App() {
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysPassed, setDaysPassed] = useState(null);

  const textBallonGet = async () => {
    const token = JSON.parse(localStorage.getItem("authCode")).accessToken;
    //인삿말 가져오기
    try {
      const response = await axios.get(`${baseApiUrl}/textballon`, {
        headers: {
          ACCESS_AUTHORIZATION: `${token}`,
        },
      });
      console.log(response.data.data);
      console.log(JSON.parse(response.data.data.textballon));
      const value = JSON.parse(response.data.data.textballon).textballon;

      setMessage(value);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const calendarGet = async () => {
    const token = JSON.parse(localStorage.getItem("authCode")).accessToken;
    //인삿말 가져오기
    try {
      const response = await axios.get(`${baseApiUrl}/firstday`, {
        headers: {
          ACCESS_AUTHORIZATION: `${token}`,
        },
      });

      setSelectedDate(new Date());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authCode")) {
      textBallonGet();
      calendarGet();
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "0.8",
      }}
    >
      {message ? (
        <MessageContainer>{message}</MessageContainer>
      ) : (
        <MessageContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flexStart",
            }}
          >
            <div>인삿말을</div>
            <div>입력해주세요</div>
          </div>
        </MessageContainer>
      )}
      <img
        src={button}
        alt="인삿말 버튼"
        width="20"
        height="20"
        style={{
          cursor: "pointer",
          positon: "relative",
          // marginTop: "80px",
          margin: "0px",
        }}
        onClick={() => setMessageModalOpen(true)}
      />
      <img src={greeting} width="100" style={{ marginLeft: "20px" }} />
      {/* <div
          style={{
            position: "relative",
            display: "inline-block",
            marginTop: "20px",
          }}
        >
          <img
            src={button}
            alt="입덕일 버튼"
            width="20"
            height="20"
            style={{
              cursor: "pointer",
            }}
            onClick={() => setCalendarModalOpen(true)}
          />
        </div> */}
      {/* {daysPassed != null && (
        <DaysContainer>{`방탄과 함께한지: ${greetingMock.data.firstday} ${
          daysPassed + "일"
        }`}</DaysContainer>
      )} */}
      <MessageModal
        isOpen={isMessageModalOpen}
        closeModal={() => setMessageModalOpen(false)}
        message={message}
        setMessage={setMessage}
      />
      {/* <CalendarModal
        isOpen={isCalendarModalOpen}
        selectedDate={selectedDate}
        closeModal={() => setCalendarModalOpen(false)}
        setSelectedDate={setSelectedDate}
        setDaysPassed={setDaysPassed}
      />
      <img src={calendar} width="80" /> */}
    </div>
  );
}

export default App;
