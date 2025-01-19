import React, { useState, useEffect } from "react";
import { DatePicker, Segmented, Button, Card } from "antd";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import "dayjs/locale/vi";

const BookRoomModal = ({
  setOpen = () => {},
  setOpenBookRoomFastModal = () => {},
}) => {
  // Define state
  const [checkInDate, setCheckInDate] = useState(dayjs());
  const [checkOutDate, setCheckOutDate] = useState(dayjs().add(1, "hour"));
  const [timeOption, setTimeOption] = useState("Theo giờ");
  const [rooms, setRooms] = useState([]);

  // Generate fake room data with faker
  useEffect(() => {
    const generateRooms = () => {
      return Array.from({ length: 4 }, () => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(150000, 300000),
        capacity: faker.number.int({ min: 1, max: 3 }),
        features: faker.helpers.arrayElements(["Wifi", "TV", "Điều hòa"], 2),
      }));
    };
    setRooms(generateRooms());
  }, []);

  // Handle date changes based on time option
  useEffect(() => {
    if (timeOption === "Theo giờ") {
      setCheckOutDate(checkInDate.add(1, "hour"));
    } else if (timeOption === "Theo ngày") {
      setCheckOutDate(checkInDate.add(1, "day"));
    } else if (timeOption === "Qua đêm") {
      setCheckOutDate(checkInDate.add(12, "hour"));
    }
  }, [checkInDate, timeOption]);

  // Handle time option change
  const handleTimeOptionChange = (value) => {
    setTimeOption(value);
    if (value === "Theo giờ") {
      setCheckOutDate(checkInDate.add(1, "hour"));
    } else if (value === "Theo ngày") {
      setCheckOutDate(checkInDate.add(1, "day"));
    } else if (value === "Qua đêm") {
      setCheckOutDate(checkInDate.add(12, "hour"));
    }
  };

  return (
    <div className="px-4 py-1">
      <div className=" mx-auto bg-white rounded-lg shadow-lg p-4 ">
        <Segmented
          options={["Theo giờ", "Theo ngày", "Qua đêm"]}
          value={timeOption}
          onChange={handleTimeOptionChange}
          className="mb-4"
        />

        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block text-gray-700">Nhận phòng</label>
            <DatePicker
              format="HH:mm, DD/MM/YYYY"
              showTime={{ format: "HH:mm" }}
              value={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700">Trả phòng</label>
            <DatePicker
              format="HH:mm, DD/MM/YYYY"
              showTime={{ format: "HH:mm" }}
              value={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              className="w-full"
            />
          </div>
        </div>

        <div className="bg-green-100 text-green-700 p-2 rounded-lg mb-4">
          Gợi ý phòng dựa trên lựa chọn
        </div>

        <div className="space-y-4">
          {rooms.map((room) => (
            <Card key={room.id} className="p-2 bg-white border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-semibold">{room.name}</p>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <i className="fas fa-user"></i>
                      <span>{room.capacity}</span>
                      {room.features.includes("Wifi") && (
                        <i className="fas fa-wifi"></i>
                      )}
                      {room.features.includes("TV") && (
                        <i className="fas fa-tv"></i>
                      )}
                      {room.features.includes("Điều hòa") && (
                        <i className="fas fa-fan"></i>
                      )}
                    </div>
                  </div>
                  <i className="far fa-image text-gray-500"></i>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-gray-700">Giá</p>
                    <p className="font-semibold">{room.price} VND</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-700">Số lượng</p>
                    <p className="font-semibold">1</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-700">Tổng cộng</p>
                    <p className="font-semibold">{room.price} VND</p>
                  </div>
                  <Button
                    onClick={() => {
                      setOpen(false);
                      setOpenBookRoomFastModal(true)
                    }}
                    type="primary"
                    className="bg-green-600"
                  >
                    Đặt phòng
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookRoomModal;
