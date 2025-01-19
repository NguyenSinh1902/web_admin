import React from 'react';
import { Table, Button, Select, DatePicker } from 'antd';
import { LeftOutlined, RightOutlined, DoubleLeftOutlined, DoubleRightOutlined, PrinterOutlined, FilePdfOutlined, FileExcelOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const reportData = [
  {
    key: '1',
    documentCode: 'Hóa đơn: 3',
    time: '02:00',
    productQuantity: 598,
    roomQuantity: 0,
    revenue: '54,416,000',
    otherIncome: '0',
    netIncome: '54,416,000',
    debit: '0',
  },
  {
    key: '2',
    documentCode: 'Hóa đơn: 2',
    time: '01:00',
    productQuantity: 212,
    roomQuantity: 0,
    revenue: '13,806,000',
    otherIncome: '0',
    netIncome: '13,806,000',
    debit: '0',
  },
  {
    key: '3',
    documentCode: 'Hóa đơn: 1',
    time: '00:00',
    productQuantity: 106,
    roomQuantity: 0,
    revenue: '34,800,000',
    otherIncome: '0',
    netIncome: '34,800,000',
    debit: '0',
  },
];

const columns = [
  {
    title: 'Mã chứng từ',
    dataIndex: 'documentCode',
    key: 'documentCode',
  },
  {
    title: 'Thời gian',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'SL sản phẩm',
    dataIndex: 'productQuantity',
    key: 'productQuantity',
  },
  {
    title: 'SL Phòng',
    dataIndex: 'roomQuantity',
    key: 'roomQuantity',
  },
  {
    title: 'Doanh thu',
    dataIndex: 'revenue',
    key: 'revenue',
  },
  {
    title: 'Thu khác',
    dataIndex: 'otherIncome',
    key: 'otherIncome',
  },
  {
    title: 'Thực thu',
    dataIndex: 'netIncome',
    key: 'netIncome',
  },
  {
    title: 'Ghi nợ',
    dataIndex: 'debit',
    key: 'debit',
  },
];

export const EndOfDayReport = () => {
  return (
    <div className=" p-4">
      <div className="mx-auto bg-white shadow-lg rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4 mt-4">
            <DatePicker className="border border-gray-300 rounded px-2 py-1" />
            <Select className="border border-gray-300 rounded px-2 py-1" defaultValue="Khổ A4">
              <Option value="A4">Khổ A4</Option>
            </Select>
            <Select className="border border-gray-300 rounded px-2 py-1" defaultValue="Thu ngân">
              <Option value="thu-ngan">Thu ngân</Option>
            </Select>
            <Select className="border border-gray-300 rounded px-2 py-1" defaultValue="Tài khoản tạo">
              <Option value="tai-khoan-tao">Tài khoản tạo</Option>
            </Select>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2">
              <Button icon={<DoubleLeftOutlined />} />
              <Button icon={<LeftOutlined />} />
              <span className="px-2">1 / 1</span>
              <Button icon={<RightOutlined />} />
              <Button icon={<DoubleRightOutlined />} />
            </div>
            <div className="flex space-x-2">
              <Button icon={<PrinterOutlined />} />
              <Button icon={<FilePdfOutlined />} />
              <Button icon={<FileExcelOutlined />} />
              {/* <Button icon={<FileCsvOutlined />} /> */}
              <Button icon={<SearchOutlined />} />
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <p className="text-gray-500">Ngày lập: 05/11/2024 15:20</p>
              <h2 className="text-lg font-semibold text-green-600">Báo cáo bán hàng cuối ngày</h2>
              <p className="text-gray-500">Ngày bán: 05/11/2024</p>
              <p className="text-gray-500">Chi nhánh: Chi nhánh trung tâm</p>
            </div>
            <Table
              columns={columns}
              dataSource={reportData}
              pagination={false}
              className="min-w-full"
              locale={{ emptyText: "Không có dữ liệu" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};