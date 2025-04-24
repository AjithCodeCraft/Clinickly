import React from 'react';

const DatePicker = ({ selectedDate, onDateChange }) => {
  const handleDateChange = (event) => {
    onDateChange(new Date(event.target.value));
  };

  return (
    <input
      type="date"
      value={selectedDate.toISOString().split('T')[0]}
      onChange={handleDateChange}
      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6AC4D9]"
    />
  );
};

export default DatePicker;
