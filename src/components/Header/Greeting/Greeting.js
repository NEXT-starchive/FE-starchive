import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';

//mock데이터 테스트
import greetingMock from './Greeting.json';
//image
import button from './img/button.png';
import calendar from './img/calendar.png';
import greeting from './img/greeting.png';

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
  z-index: 1;
`;

const ModalBox = styled.div`
  width: 500px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
`;

const CloseButton = styled.button`
  float: right;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #9c27b0; /* light purple */
  font-weight: bold;
`;

const DaysContainer = styled.div`
  /* Add your CSS here */
  padding: 10px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #9c27b0; /* darker purple */
  font-weight: bold;
`;

function MessageModal({ isOpen, closeModal, message, setMessage }) {
  const [form, setForm] = useState({ message: message });
  console.log(localStorage.getItem('authCode'));
  console.log(JSON.parse(localStorage.getItem('authCode')).accessToken);
  const token = JSON.parse(localStorage.getItem('authCode')).accessToken;

  const handleChange = (e) => {
    setForm({ message: e.target.value });
  };

  const textBallonPost = async () => {
    const payload = {
      textballon: form.message,
    };
    //인삿말 가져오기
    try {
      const response = await axios.post(
        'http://ec2-3-39-243-152.ap-northeast-2.compute.amazonaws.com:8080/textballon',
        payload,
        {
          headers: {
            ACCESS_AUTHORIZATION: `${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleSubmit = () => {
    setMessage(form.message);
    textBallonPost();
    closeModal();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return isOpen ? (
    <Container>
      <ModalBox>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <h3>인삿말을 바꿔보세요</h3>
        <input
          type="text"
          name="message"
          placeholder="인삿말을 입력해주세요"
          value={form.message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSubmit}>저장</button>
      </ModalBox>
    </Container>
  ) : null;
}
function dateFormat(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;
  hour = hour >= 10 ? hour : '0' + hour;
  minute = minute >= 10 ? minute : '0' + minute;
  second = second >= 10 ? second : '0' + second;

  return (
    date.getFullYear() +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hour +
    ':' +
    minute +
    ':' +
    second
  );
}

function CalendarModal({
  isOpen,
  closeModal,
  setSelectedDate,
  setDaysPassed,
  selectedDate,
}) {
  console.log(localStorage.getItem('authCode'));
  console.log(JSON.parse(localStorage.getItem('authCode')).accessToken);
  const token = JSON.parse(localStorage.getItem('authCode')).accessToken;
  const calendarPost = async () => {
    //인삿말 가져오기
    const payload = {
      firstday: dateFormat(selectedDate),
    };
    try {
      const response = await axios.post(
        'http://ec2-3-39-243-152.ap-northeast-2.compute.amazonaws.com:8080/firstday',
        payload,
        {
          headers: {
            ACCESS_AUTHORIZATION: `${token}`,
          },
        }
      );

      //   setSelectedDate()

      //   setSelectedDate(new Date());
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysPassed(diffDays);
    closeModal();
    calendarPost();
  };

  return isOpen ? (
    <Container>
      <ModalBox>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <h3>입덕일을 입력해주세요</h3>
        <Calendar onChange={handleDateChange} />
      </ModalBox>
    </Container>
  ) : null;
}

function App() {
  console.log(localStorage.getItem('authCode'));
  console.log(JSON.parse(localStorage.getItem('authCode')).accessToken);
  const token = JSON.parse(localStorage.getItem('authCode')).accessToken;
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysPassed, setDaysPassed] = useState(null);

  const textBallonGet = async () => {
    //인삿말 가져오기
    try {
      const response = await axios.get(
        'http://ec2-3-39-243-152.ap-northeast-2.compute.amazonaws.com:8080/textballon',
        {
          headers: {
            ACCESS_AUTHORIZATION: `${token}`,
          },
        }
      );
      console.log(response.data.data);
      console.log(JSON.parse(response.data.data.textballon));
      const value = JSON.parse(response.data.data.textballon).textballon;

      setMessage(value);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const calendarGet = async () => {
    //인삿말 가져오기
    try {
      const response = await axios.get(
        'http://ec2-3-39-243-152.ap-northeast-2.compute.amazonaws.com:8080/firstday',
        {
          headers: {
            ACCESS_AUTHORIZATION: `${token}`,
          },
        }
      );

      setSelectedDate(new Date());
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('authCode')) {
      textBallonGet();
      calendarGet();
    }
  }, []);

  return (
    <div>
      {message && <MessageContainer>{message}</MessageContainer>}
      <ButtonContainer>
        <button
          style={{
            width: '30px',
            height: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => setMessageModalOpen(true)}
        >
          <img src={button} alt="인삿말 버튼" width="20" height="20" />
        </button>
        <img src={greeting} width="100" />
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            marginTop: '20px',
          }}
        >
          <button
            style={{
              width: '30px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setCalendarModalOpen(true)}
          >
            <img src={button} alt="입덕일 버튼" width="20" height="20" />
          </button>
        </div>
      </ButtonContainer>
      {daysPassed != null && (
        <DaysContainer>{`방탄과 함께한지: ${greetingMock.data.firstday} ${
          daysPassed + '일'
        }`}</DaysContainer>
      )}
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
      <img src={calendar} width="80" />
    </div>
  );
}

export default App;
