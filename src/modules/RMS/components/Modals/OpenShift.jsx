import React from "react";
import { Modal, Button, Input, Card } from "antd";

const OpenShift = () => {
  return (
      <div className="w-full ">
        <Card className="bg-white rounded-lg shadow-lg ">
          <p className="text-gray-600 mb-4">
            Vui lòng mở ca làm việc mới để có thể thực hiện được các chức năng
            dành cho nhân viên
          </p>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              for="nhan-vien-ca"
            >
              Nhân viên ca *
            </label>
            <Input
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
              id="nhan-vien-ca"
              type="text"
              value="Tạ Ngân Mở"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              for="gio-bat-dau"
            >
              Giờ bắt đầu
            </label>
            <Input
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
              id="gio-bat-dau"
              type="text"
              value="04/04/2023 | 15:41"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              for="ten-ma-dau-ca"
            >
              Tiền đầu ca
            </label>
            <Input
              className="border-b border-gray-300 w-full py-2 px-3 text-gray-700"
              id="ten-ma-dau-ca"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" for="ghi-chu">
              Ghi chú
            </label>
            <textarea
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
              id="ghi-chu"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <Button className="bg-blue-500 text-white py-2 px-4 rounded">
              Đăng xuất
            </Button>
            <Button className="bg-green-500 text-white py-2 px-4 rounded">
              Mở ca
            </Button>
          </div>
        </Card>
      </div>
  );
};

export default OpenShift;
