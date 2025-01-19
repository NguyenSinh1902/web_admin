import React from "react";
import { Button, Input, Radio, DatePicker, Upload, Table } from "antd";
import {
  UploadOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

export const CreateReceipt = () => {
    const data = [
        
      ];
    
      const columns = [
        {
          title: 'Phòng',
          dataIndex: 'room',
          key: 'room',
          render: (text) => <span className="text-gray-700 font-medium">{text}</span>,
        },
        {
          title: 'Đặt phòng',
          dataIndex: 'booking',
          key: 'booking',
          render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
          title: 'Phòng đặt',
          dataIndex: 'reserved',
          key: 'reserved',
          render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
          title: 'Đã thu trước',
          dataIndex: 'prepaid',
          key: 'prepaid',
          render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
          title: 'Còn cần thu',
          dataIndex: 'balance',
          key: 'balance',
          render: (text) => <span className="text-gray-500">{text}</span>,
        },
        {
          title: 'Tiền thu',
          dataIndex: 'payment',
          key: 'payment',
          render: (text) => <span className="text-gray-500">{text}</span>,
        },
      ];
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="mb-4 flex items-center gap-4">
        <div>
          <label className="block text-gray-700 font-semibold  text-sm">
            Thanh toán
          </label>
        </div>
        <Radio.Group defaultValue="Đặt phòng" className="flex space-x-4">
          <Radio value="Đặt phòng">Đặt phòng</Radio>
          <Radio value="Hoá đơn thiếu nợ">Hoá đơn thiếu nợ</Radio>
        </Radio.Group>
      </div>

      <div className="flex items-center space-x-2">
        <div className="mb-4 flex-1">
          <label className="block text-gray-700 font-medium mb-2">
            Tên khách hàng
          </label>
          <Input
            placeholder="Tên khách hàng"
            prefix={<SearchOutlined />}
            suffix={<PlusCircleOutlined />}
            className="rounded-lg"
          />
        </div>

        <div className="mb-4 flex-1">
          <label className="block text-gray-700 font-medium mb-2">
            Thời gian
          </label>
          <DatePicker
            showTime
            format="DD/MM/YYYY HH:mm"
            className="w-full rounded-lg"
            suffixIcon={<CalendarOutlined />}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Thu từ khách
        </label>
        <Input
          placeholder="0"
          prefix={<CreditCardOutlined />}
          className="rounded-lg"
        />
      </div>

      <div className="mb-4">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="rounded-lg shadow-md"
        locale={{ emptyText: "Không có đặt phòng nào" }}
      />
      </div>

      <div className="mb-4">
        <Upload>
          <Button
            icon={<UploadOutlined />}
            type="link"
            className="text-blue-500"
          >
            Chọn file tải lên
          </Button>
        </Upload>
      </div>

      <div className="flex justify-end space-x-4">
        <Button className="bg-gray-200 text-gray-700 rounded-lg">Bỏ qua</Button>
        <Button type="primary" className="bg-green-500 text-white rounded-lg">
          Tạo phiếu thu
        </Button>
        <Button type="primary" className="bg-green-500 text-white rounded-lg">
          Tạo phiếu thu & In
        </Button>
      </div>
    </div>
  );
};
