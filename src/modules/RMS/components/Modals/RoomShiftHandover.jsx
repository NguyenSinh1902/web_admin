import React from "react";
import { Button, Input, Card } from "antd";

export const RoomShiftHandover = () => {
  const rooms = [
    {
      name: "Phòng 101",
      services: [
        { name: "Nước suối", quantity: 2 },
        { name: "Pepsi", quantity: 1 },
      ],
    },
    {
      name: "Phòng 102",
      services: [{ name: "Coca", quantity: 3 }],
    },
    {
      name: "Phòng 103",
      services: [
        { name: "Nước suối", quantity: 1 },
        { name: "Pepsi", quantity: 2 },
        { name: "Snack", quantity: 5 },
      ],
    },
  ];
  return (
    <div className=" mt-2 bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-6">
          <p>
            Nhân viên: <span className="font-semibold">0929292606</span>
          </p>
          <p>
            Giờ mở ca: <span className="font-semibold">24/10/2023 20:06</span>
          </p>
          <p>Giờ đóng ca: </p>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Thông tin phòng và dịch vụ đã thêm
        </label>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          {rooms.map((room, index) => (
            <Card key={index} className="bg-gray-100 p-4 rounded-md">
              <p className="font-semibold mb-2 text-sm">{room.name}</p>
              <ul className="space-y-2">
                {room.services.map((service, idx) => (
                  <li key={idx}>
                    {service.name}{" "}
                    <span className="float-right">{service.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t mt-2 pt-2">
                <span className="font-semibold">Tổng dịch vụ</span>
                <span className="float-right">
                  {room.services.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      
      <div className="flex justify-between items-center">
        <button className="text-blue-500">
          <i className="fas fa-sync-alt"></i> Cập nhật dữ liệu
        </button>
        <div className="space-x-2">
          <Button type="primary" className="">
            Đóng ca
          </Button>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded">
            Đóng ca và in phiếu bàn giao
          </Button>
        </div>
      </div>
    </div>
  );
};
