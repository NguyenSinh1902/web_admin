import React from 'react';
import { Modal, Button, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export const WaitingConfirmation = ({ visible, onClose }) => {
  const columns = [
    {
      title: 'Mã đặt phòng',
      dataIndex: 'bookingCode',
      key: 'bookingCode',
    },
    {
      title: 'Mã kênh bán',
      dataIndex: 'salesChannelCode',
      key: 'salesChannelCode',
    },
    {
      title: 'Khách đặt',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Lưu trú',
      dataIndex: 'stayDuration',
      key: 'stayDuration',
    },
    {
      title: 'Phòng đặt',
      dataIndex: 'roomCode',
      key: 'roomCode',
    },
    {
      title: 'Tổng cộng',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Khách đã trả',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
    },
  ];

  const data = []; // Bạn có thể thêm dữ liệu ở đây

  return (
    <div className="p-4">
        <Button type="primary" className="bg-green-500 text-white mb-4">
          Import
        </Button>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          locale={{
            emptyText: <span className="text-gray-500">Không tìm thấy kết quả nào phù hợp</span>,
          }}
          className="border-collapse"
        />
        {/* <div className="mt-4 text-gray-500">
          Khách sạn hiện không còn nhận đặt phòng online. Chọn{' '}
          <a href="#" className="text-blue-500">để thay đổi cài đặt</a>
        </div> */}
      </div>
  );
};
