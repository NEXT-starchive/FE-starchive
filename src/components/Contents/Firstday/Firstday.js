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
import { baseApiUrl } from "../../../constants/base-api-url";
import { dateFormat } from "../../../utils/date-format";
import { daysPassedAtom } from "../../../recoil/atoms";
import { useRecoilState } from "recoil";

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
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  z-index: 10;
  box-shadow: 0 0 10px rgba(128, 94, 158, 0.5);
`;

const ModalBoxCalendar = styled(ModalBox)`
  width: 350px;
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

const SaveButton = styled.button`
  background-color: "#f44336";
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1em;
  background-color: 0.3s ease;

  &:hover {
    background-color: #ab47bc; /* darker purple */
  }
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  margin-bottom: 20px;
  padding: 3px 10px;
  border-radius: 10px;
  border: 1px solid #917f9e;
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
        <h3>인삿말을 바꿔보세요</h3>
        <Input
          type="text"
          name="message"
          placeholder="인삿말을 입력해주세요"
          value={form.message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <SaveButton onClick={handleSubmit}>저장</SaveButton>
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
  const calendarPost = async (date) => {
    //인삿말 가져오기
    console.log("selectedDate", dateFormat(date));
    const token = JSON.parse(localStorage.getItem("authCode")).accessToken;
    const payload = {
      firstday: dateFormat(date),
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
    if (today - date) {
      console.log("today - date", today - date);
    }
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysPassed(diffDays);
    closeModal();
    if (localStorage.getItem("authCode")) calendarPost(date);
  };

  return isOpen ? (
    <Container>
      <ModalBoxCalendar>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <h3 style={{ width: "50vw" }}>입덕일을 입력해주세요</h3>
        <Calendar onChange={handleDateChange} />
      </ModalBoxCalendar>
    </Container>
  ) : null;
}

const Firstday = () => {
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysPassed, setDaysPassed] = useRecoilState(daysPassedAtom);

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

      console.log("firstday firstday", response.data.data.firstday);
      // console.log(JSON.parse(response.data.data));
      setDaysPassed(response.data.data.firstday);
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

  useEffect(() => {
    const calendarPost = async () => {
      //인삿말 가져오기
      console.log("selectedDate", dateFormat(selectedDate));
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

    if (localStorage.getItem("authCode")) {
      calendarPost();
    }
  }, [selectedDate]);

  return (
    <>
      <div
        style={{
          paddingTop: "20px",
        }}
      >
        <MessageModal
          isOpen={isMessageModalOpen}
          closeModal={() => setMessageModalOpen(false)}
          message={message}
          setMessage={setMessage}
        />
        <CalendarModal
          isOpen={isCalendarModalOpen}
          selectedDate={selectedDate}
          closeModal={() => setCalendarModalOpen(false)}
          setSelectedDate={setSelectedDate}
          setDaysPassed={setDaysPassed}
        />
        <FlexDiv>
          {/* <img src={calendar} width="80" /> */}
          {daysPassed != null ? (
            <DaysContainer>
              방탄과 함께한지
              <br /> {daysPassed + "일" + "💜"}
            </DaysContainer>
          ) : (
            <DaysContainer>
              <div style={{ fontWeight: "700" }}>입덕일을 입력해주세요</div>
            </DaysContainer>
          )}
          <img
            src={button}
            alt="입덕일 버튼"
            width="20"
            height="20"
            style={{
              cursor: "pointer",
              // marginLeft: "12vw",
            }}
            onClick={() => setCalendarModalOpen(true)}
          />
        </FlexDiv>
      </div>
    </>
  );
};

const DaysContainer = styled.div`
  /* Add your CSS here */
  padding: 10px;
  background-color: #f1ecf5;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(128, 94, 158, 0.1);
  color: #9c27b0; /* darker purple */
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12vw;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export default Firstday;
