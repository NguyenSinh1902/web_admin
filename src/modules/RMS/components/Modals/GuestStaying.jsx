import React, { useState } from "react";
import { DatePicker, Button, Table, Input } from "antd";
import "antd/dist/reset.css";
import {
  SearchOutlined,
  FileTextOutlined,
  CalendarOutlined,
  FileAddFilled,
} from "@ant-design/icons";

const columns = [
  {
    title: "Họ và tên",
    dataIndex: "name",
    key: "name",
    render: (text) => <span className="text-sm text-gray-700">{text}</span>,
  },
  {
    title: "Thông tin",
    dataIndex: "info",
    key: "info",
    render: (text) => <span className="text-sm text-gray-700">{text}</span>,
  },
  {
    title: "Đặt phòng",
    dataIndex: "booking",
    key: "booking",
    render: (text) => <span className="text-sm text-gray-700">{text}</span>,
  },
  {
    title: "Phòng",
    dataIndex: "room",
    key: "room",
    render: (text) => <span className="text-sm text-gray-700">{text}</span>,
  },
  {
    title: "Thời gian khai báo",
    dataIndex: "reportTime",
    key: "reportTime",
    render: (text) => <span className="text-sm text-gray-700">{text}</span>,
  },
  {
    title: "Thời gian lưu trú",
    dataIndex: "stayTime",
    key: "stayTime",
    render: (text) => <span className="text-sm text-gray-700">{text}</span>,
  },
];

const data = [];

export const GuestStaying = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className=" py-4">
      <div className=" rounded-lg shadow-lg flex gap-4 ">
        {/* <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Danh sách khách lưu trú</h1>
          <span className="text-sm text-gray-500">Chi nhánh trung tâm</span>
        </div> */}

        <div className="flex space-x-4 flex-col items-start mb-4 w-1/4 p-2 gap-4">
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tìm kiếm
            </label>
            <Input
              className="mb-2"
              placeholder="Tên khách lưu trú"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Input
              placeholder="Số phòng, đặt phòng"
              prefix={<SearchOutlined />}
            />
          </div>
          

          <div className="!m-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Thời gian khai báo
            </label>
            <DatePicker.RangePicker
              className="w-full"
              format="DD MMM, HH:mm"
              suffixIcon={<CalendarOutlined />}
            />
          </div>

          <div className="!m-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Thời gian lưu trú
            </label>
            <DatePicker.RangePicker
              className="w-full"
              format="DD/MM/YYYY"
              suffixIcon={<CalendarOutlined />}
            />
          </div>
        </div>

        <div className="w-3/4">
          <div className="flex  items-center justify-end mb-4 gap-3">
            <Button
              type="primary"
              icon={<FileTextOutlined />}
              className="bg-green-500 hover:bg-green-600"
            >
              Giấy tờ
            </Button>
            <Button
              type="primary"
              icon={<FileAddFilled />}
              className="bg-green-500 hover:bg-green-600"
            >
              Xuất file khai báo
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table
              className="min-w-full bg-white"
              columns={columns}
              dataSource={data}
              locale={{ emptyText: "Chưa có thông tin khách lưu trú" }}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
