import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Make sure to have this CSS import

const Greeting = () => {
  const [form, setForm] = useState({ username: '', message: '' });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysPassed, setDaysPassed] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    alert(`${form.username}: ${form.message}`);
    setForm({ username: '', message: '' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysPassed(diffDays);
    setIsCalendarOpen(false);
  };

  return (
    <GreetingContainer>
      <div>
        <h1>인삿말 수정</h1>
        <input
          type="text"
          name="message"
          placeholder="입력해주세요"
          value={form.message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSubmit}>확인</button>
        {daysPassed != null && <p>{`방탄과 함께한지: ${daysPassed+'일'}`}</p>}
      </div>

      <CalendarContainer>
        <DropdownButton onClick={toggleCalendar}>Open Calendar</DropdownButton>
        <CalendarWrapper isOpen={isCalendarOpen}>
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </CalendarWrapper>
      </CalendarContainer>
    </GreetingContainer>
  );
};

const GreetingContainer = styled.div`
  flex: 1;
  width: 322px;
  height: 135px;
  box-sizing: border-box;
  border: 1px solid #000;
`;

const CalendarContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  // [styling rules]
`;

const CalendarWrapper = styled.div`
  z-index: 11;
  position: absolute;
  top: 90%;
  left: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;


export default Greeting;