import { Button, Checkbox, Divider, Input } from "antd";
import React from "react";

const SearchRoom = () => {
  return (
    <div className="">
      <div className="bg-white shadow-md rounded-lg p-3">
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
          <div className="col-span-1">
            <h2 className="font-semibold mb-2">Tìm theo</h2>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Tên phòng lưu trú"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Tên khách hàng"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Mã đặt phòng"
                className="w-full p-2 border rounded"
              />
            </div>
           
          </div>

          {/* Sử dụng Ant Design cho checkbox */}
          <div className="col-span-1">
            <h2 className="font-semibold mb-2">
              Hình thức lưu trú{" "}
              <i className="fas fa-info-circle text-green-500"></i>
            </h2>
            {["Giờ", "Đêm", "Ngày"].map((option, index) => (
              <div className="mb-2" key={index}>
                <Checkbox>{option}</Checkbox>
              </div>
            ))}
          </div>

          <div className="col-span-1">
            <h2 className="font-semibold mb-2">
              Hạng phòng <i className="fas fa-info-circle text-green-500"></i>
            </h2>
            {[
              "Phòng 01 giường đôi cho 2 người",
              "Phòng 01 giường đôi và 1 giường đơn cho 3 người",
              "Phòng 01 giường đơn",
              "Phòng 02 giường đơn",
            ].map((room, index) => (
              <div className="mb-2" key={index}>
                <Checkbox>{room}</Checkbox>
              </div>
            ))}
          </div>

          <div className="col-span-1">
            <h2 className="font-semibold mb-2">
              Khu vực <i className="fas fa-info-circle text-green-500"></i>
            </h2>
            {["Tầng 2", "Tầng 3", "Tầng 4", "Tầng 5"].map((level, index) => (
              <div className="mb-2" key={index}>
                <Checkbox>{level}</Checkbox>
              </div>
            ))}
          </div>

          <div className="col-span-1">
            <h2 className="font-semibold mb-2">
              Tình trạng phòng{" "}
              <i className="fas fa-info-circle text-green-500"></i>
            </h2>
            <div className="mb-2">
              <Checkbox>Sạch</Checkbox>
            </div>
            <div className="mb-2">
              <Checkbox className="text-red-500">Chưa dọn</Checkbox>
            </div>
          </div>

          <div className="col-span-1">
            <h2 className="font-semibold mb-2">
              Kênh bán <i className="fas fa-info-circle text-green-500"></i>
            </h2>
            {[
              "Khách đến trực tiếp",
              "Agoda",
              "Airbnb",
              "Booking.com",
              "Đặt phòng online",
              "Facebook",
              "Instagram",
              "Khách đặt qua điện thoại",
              "Zalo",
              "Khác",
            ].map((channel, index) => (
              <div className="mb-2" key={index}>
                <Checkbox>{channel}</Checkbox>
              </div>
            ))}
          </div>
        </div>
        <Divider />

        <div className="flex flex-col md:flex-row justify-end mt-4">
          <Button className="bg-gray-200 text-gray-700 rounded mr-2 mb-2 md:mb-0">
            Bỏ chọn
          </Button>
          <Button className="bg-green-500 text-white rounded">
            Áp dụng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchRoom;
