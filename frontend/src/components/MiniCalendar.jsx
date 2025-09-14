// components/MiniCalendar.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MiniCalendar.css'; // Optional for custom styling

const MiniCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="mini-calendar-container">
      <h3>📅 Upcoming Events</h3>
      <Calendar
        onChange={setDate}
        value={date}
        locale="en-IN"
        tileClassName={({ date, view }) => {
          // Highlight today's date
          if (date.toDateString() === new Date().toDateString()) {
            return 'today-highlight';
          }
        }}
      />
      <p className="selected-date">Selected: {date.toDateString()}</p>
    </div>
  );
};

export default MiniCalendar;