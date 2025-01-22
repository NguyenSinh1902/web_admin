import React, { useEffect, useState } from "react";
import { Collapse, DatePicker, Button } from "antd";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const getWeekDates = (startDate, endDate) => {
  const selectedStartDate = dayjs(startDate);
  const selectedEndDate = endDate ? dayjs(endDate) : selectedStartDate; // Nếu không có endDate, dùng startDate

  const dates = {
    startDate: selectedStartDate,
    endDate: selectedEndDate,
    weekDates: [],
  };

  // Lấy danh sách ngày từ ngày bắt đầu đến ngày kết thúc
  const daysDifference = selectedEndDate.diff(selectedStartDate, "day"); // Số ngày giữa startDate và endDate
  const totalDays = Math.max(daysDifference + 1, 1); // Tính số ngày nhưng không được ít hơn 1

  for (let i = 0; i < totalDays; i++) {
    dates.weekDates.push(selectedStartDate.add(i, "day").format("ddd, DD/MM"));
  }

  return dates;
};

const generateRoomData = (numRooms) => {
  return Array.from({ length: numRooms }, () => ({
    roomName: faker.company.name(),
    data: Array(7)
      .fill(0)
      .map(() => faker.number.int({ min: 0, max: 10 })),
  }));
};

const getColumnTotals = (rooms, weekLength) => {
  const totals = Array(weekLength).fill(0);

  rooms.forEach((room) => {
    for (let i = 0; i < weekLength; i++) {
      totals[i] += room.data[i] || 0;
    }
  });

  return totals;
};

const generateData = () => {
  return [
    { title: "Phòng trống cả ngày", rooms: generateRoomData(5) },
    { title: "Phòng dự kiến trả", rooms: generateRoomData(3) },
    { title: "Phòng dự kiến nhận", rooms: generateRoomData(4) },
    { title: "Phòng đang sử dụng", rooms: generateRoomData(6) },
    { title: "Công suất sử dụng", rooms: generateRoomData(5) },
  ];
};

export const ReceptionReport = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(startDate.add(6, "day"));
  const [weekDates, setWeekDates] = useState([]);
  const [activeKey, setActiveKey] = useState(["0"]); // Thiết lập mặc định

  const handleCollapseChange = (key) => {
    setActiveKey(key);
  };

  const handleStartDateChange = (date) => {
    if (!date) {
      setEndDate(dayjs());
      setStartDate(dayjs());
      updateWeekDates(dayjs(), endDate);
      return;
    }
    if (date > endDate) {
      setEndDate(date);
    }
    setStartDate(date);
    updateWeekDates(date, endDate);
  };

  const handleEndDateChange = (date) => {
    if (!date) {
      setEndDate(startDate.add(6, "day"));
      setEndDate(startDate.add(6, "day"));
      updateWeekDates(startDate, startDate.add(6, "day"));
      return;
    }
    setEndDate(date);
    updateWeekDates(startDate, date);
  };

  const updateWeekDates = (start, end) => {
    const dates = getWeekDates(start, end);
    setWeekDates(dates.weekDates);
  };

  useEffect(() => {
    getWeekDates(startDate, endDate);
    updateWeekDates(startDate, endDate);
  }, []);

  const data = generateData(); // render data

  const today = dayjs().format("ddd, DD/MM"); //Lấy ngày hiện tại

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="flex space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Chọn ngày bắt đầu:</span>
            <DatePicker
              defaultValue={startDate}
              format="DD/MM/YYYY"
              onChange={handleStartDateChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Chọn ngày kết thúc:</span>
            <DatePicker
              value={endDate}
              format="DD/MM/YYYY"
              onChange={handleEndDateChange}
              disabledDate={(current) =>
                current.isBefore(startDate, "day") ||
                current.isAfter(startDate.add(6, "day"))
              } // Giới hạn ngày kết thúc
            />
          </div>
        </div>
        <div className="flex bg-orange-200 font-semibold py-1">
          <span className="w-1/4 px-2 py-1 text-center">Phòng</span>
          {weekDates.map((date, index) => (
            <span
              key={index}
              className={`flex-1 text-center px-2 py-1 ${
                date === today
                  ? "bg-blue-300 text-white font-bold rounded-md"
                  : ""
              }`}
            >
              {date}
            </span>
          ))}
        </div>

        <Collapse
          accordion
          bordered={false}
          defaultActiveKey={["0"]}
          activeKey={activeKey}
          onChange={handleCollapseChange}
        >
          {data.map((group, index) => {
            const totals = getColumnTotals(group.rooms, weekDates.length);
            const isActive = activeKey.includes(index.toString());
            return (
              <Collapse.Panel
                key={index}
                header={
                  <div
                    className={`flex bg-gray-100 ${
                      isActive ? "font-semibold text-orange-500" : "font-medium"
                    }`}
                  >
                    <span className="w-1/4 px-2 py-1 text-center">
                      {group.title} (Tổng)
                    </span>
                    {totals.map((total, i) => (
                      <span key={i} className="flex-1 text-center px-2 py-1">
                        {total}
                      </span>
                    ))}
                  </div>
                }
              >
                {group.rooms.map((room, idx) => (
                  <div key={idx} className="flex items-center border-b py-2">
                    {/* Tên phòng */}
                    <span className="w-1/4 px-2 text-center font-medium bg-gray-100">
                      {room.roomName}
                    </span>
                    {/* Giá trị data theo các ngày */}
                    {weekDates.map((_, dayIndex) => (
                      <span
                        key={dayIndex}
                        className="flex-1 text-center px-2 py-1 bg-gray-50"
                      >
                        {room.data[dayIndex] || 0}
                      </span>
                    ))}
                  </div>
                ))}
              </Collapse.Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
};
