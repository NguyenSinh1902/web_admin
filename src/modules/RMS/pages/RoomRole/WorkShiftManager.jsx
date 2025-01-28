// src/components/ShiftAssignment.js
import React, { useState } from 'react';
import { DatePicker, Button, Card } from 'antd';
import dayjs from 'dayjs';

const ShiftAssignment = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [shiftsData, setShiftsData] = useState([
    {
      key: '1',
      shift: 'Ca 1',
      staff: null,
      rooms: ['101', '102'],
    },
    {
      key: '2',
      shift: 'Ca 2',
      staff: null,
      rooms: ['103', '104'],
    },
  ]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const assignStaff = (shiftKey, staffName) => {
    const updatedShifts = shiftsData.map((shift) =>
      shift.key === shiftKey ? { ...shift, staff: staffName } : shift
    );
    setShiftsData(updatedShifts);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Phân Ca Làm Việc</h2>
      <DatePicker onChange={handleDateChange} value={selectedDate} />
      
      <div className="mt-4">
        {shiftsData.map((shift) => (
          <Card key={shift.key} className="mb-4">
            <h3 className="text-lg font-semibold">{shift.shift}</h3>
            <p>Phòng: {shift.rooms.join(', ')}</p>
            <p>Nhân viên: {shift.staff ? shift.staff : 'Chưa phân công'}</p>
            <Button
              type="primary"
              onClick={() => assignStaff(shift.key, prompt('Nhập tên nhân viên:'))}
              disabled={shift.staff !== null}
            >
              Phân công Nhân viên
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShiftAssignment;
