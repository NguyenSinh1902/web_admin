import React, { useState } from "react";
import {
  Button,
  Card,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  notification,
  Radio,
  Select,
} from "antd";
import {
  PlusCircleOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;
export const SaleEmployee = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookingHistory, setBookingHistory] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const onFinish = (values) => {
    const newBooking = {
      key: bookingHistory.length + 1,
      ...values,
      checkInDate: values.checkInDate.format("YYYY-MM-DD"),
      checkOutDate: values.checkOutDate.format("YYYY-MM-DD"),
      status: "Chờ xử lý",
      customerType:
        values.customerType === "doanhNghiep" ? "Doanh nghiệp" : "Cá nhân", // Convert value to readable format
      salesChannel:
        values.salesChannel === "online"
          ? "Online"
          : values.salesChannel === "trucTiep"
          ? "Trực tiếp"
          : "Qua điện thoại",
    };
    setBookingHistory([...bookingHistory, newBooking]);
    notification.success({
      message: "Đặt lịch thành công!",
      description: "Đơn đặt lịch đã được tạo và gửi lên quản lý.",
    });
    form.resetFields();
    hideModal();
  };

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      align: "center",
    },
    {
      title: "Loại khách hàng",
      dataIndex: "customerType",
      key: "customerType",
      align: "center",
    },
    {
      title: "Kênh bán hàng",
      dataIndex: "salesChannel",
      key: "salesChannel",
      align: "center",
    },
    {
      title: "Ngày nhận phòng",
      dataIndex: "checkInDate",
      key: "checkInDate",
      align: "center",
    },
    {
      title: "Ngày trả phòng",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      align: "center",
    },
    {
      title: "Số lượng phòng",
      dataIndex: "roomCount",
      key: "roomCount",
      align: "center",
    },
    {
      title: "Số lượng người",
      dataIndex: "guestCount",
      key: "guestCount",
      align: "center",
    },
    {
      title: "Giá khách trả",
      dataIndex: "customerPrice",
      key: "customerPrice",
      render: (price) => `${price} VND`,
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "orange";
        if (status === "Đã xác nhận") color = "green";
        else if (status === "Bị hủy") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
      align: "center",
    },
  ];

  return (
    <div className=" bg-gray-100 flex flex-col items-center  space-y-6">
      <Card
        title={
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold">Lịch sử các yêu cầu</div>
            <Button
              type="primary"
              onClick={showModal}
              className="mb-4 bg-blue-500 hover:bg-blue-600"
            >
              Tạo yêu cầu
            </Button>
          </div>
        }
        className="w-full  bg-white shadow-md rounded-lg p-4"
      >
        <Table
          columns={columns}
          dataSource={bookingHistory}
          pagination={false}
          className="table-reset"
        />
      </Card>

      <Modal
        title="Đặt Lịch Khách Sạn"
        visible={isModalVisible}
        width={600}
        onCancel={hideModal}
        footer={null}
      >
        <Form
          className="grid md:grid-cols-2 grid-cols-1 gap-x-2 "
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Loại khách hàng"
            name="customerType"
            rules={[
              { required: true, message: "Vui lòng chọn loại khách hàng!" },
            ]}
          >
            <Radio.Group >
              <Radio value="doanhNghiep">Doanh nghiệp</Radio>
              <Radio value="caNhan">Cá nhân</Radio>
            </Radio.Group>
            
          </Form.Item>
          <Form.Item
            label="Tên khách hàng"
            name="customerName"
            rules={[
              { required: true, message: "Vui lòng nhập tên khách hàng!" },
            ]}
          >
            <Input placeholder="Nhập tên khách hàng" suffix={<PlusCircleOutlined />} />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Ngày nhận phòng"
            name="checkInDate"
            rules={[
              { required: true, message: "Vui lòng chọn ngày nhận phòng!" },
            ]}
          >
            <DatePicker showTime format="DD/MM/YYYY HH:mm" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Ngày trả phòng"
            name="checkOutDate"
            rules={[
              { required: true, message: "Vui lòng chọn ngày trả phòng!" },
            ]}
          >
            <DatePicker showTime format="DD/MM/YYYY HH:mm" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Số lượng phòng"
            name="roomCount"
            rules={[
              { required: true, message: "Vui lòng nhập số lượng phòng!" },
            ]}
          >
            <InputNumber
              min={1}
              max={10}
              className="w-full"
              placeholder="Nhập số lượng phòng"
            />
          </Form.Item>

          <Form.Item
            label="Số lượng người"
            name="guestCount"
            rules={[
              { required: true, message: "Vui lòng nhập số lượng người!" },
            ]}
          >
            <InputNumber
              min={1}
              max={20}
              className="w-full"
              placeholder="Nhập số lượng người"
            />
          </Form.Item>

          <Form.Item
            label="Giá khách trả"
            name="customerPrice"
            rules={[
              { required: true, message: "Vui lòng nhập giá khách trả!" },
            ]}
          >
            <InputNumber
              min={0}
              className="w-full"
              placeholder="Nhập giá khách trả"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }
              parser={(value) => value.replace(/\./g, "")}
            />
          </Form.Item>

          <Form.Item
            label="Kênh bán hàng"
            name="salesChannel"
            rules={[
              { required: true, message: "Vui lòng chọn kênh bán hàng!" },
            ]}
          >
            <Select placeholder="Chọn kênh bán hàng">
              <Option value="trucTiep">Trực tiếp</Option>
              <Option value="online">Agoda</Option>
              <Option value="quaDienThoai">Air Bnb</Option>
              <Option value="zalo">Zalo</Option>
              <Option value="other">Khác</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>

          <Form.Item
            label="Yêu cầu đặc biệt"
            className="col-span-full"
            name="specialRequests"
          >
            <TextArea rows={4} placeholder="Nhập yêu cầu đặc biệt nếu có" />
          </Form.Item>

          <Form.Item className="col-span-full">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Gửi thông tin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
