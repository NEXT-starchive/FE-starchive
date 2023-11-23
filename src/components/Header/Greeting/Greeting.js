import axios from 'axios';
import React, { useState } from 'react';
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

  const handleChange = (e) => {
    setForm({ message: e.target.value });
  };
  const textBallonGet = async () => {
    //인삿말 가져오기
    try {
      const response = await axios.get(
        'http://ec2-3-39-243-152.ap-northeast-2.compute.amazonaws.com:8080/textballon'
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleSubmit = () => {
    setMessage(form.message);
    closeModal();
    textBallonGet();
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

function CalendarModal({ isOpen, closeModal, setSelectedDate, setDaysPassed }) {
  const firstDayGet = async () => {
    //입덕일 가져오기
    try {
      const response = await axios.get(
        'http://ec2-3-39-243-152.ap-northeast-2.compute.amazonaws.com:8080/firstday'
      );
      console.log(response.data);
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
    firstDayGet();
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
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysPassed, setDaysPassed] = useState(null);

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
        closeModal={() => setCalendarModalOpen(false)}
        setSelectedDate={setSelectedDate}
        setDaysPassed={setDaysPassed}
      />
      <img src={calendar} width="80" />
    </div>
  );
}

export default App;
