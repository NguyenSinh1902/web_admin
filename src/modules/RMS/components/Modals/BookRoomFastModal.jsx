import React, { useState } from "react";
import { Input, Button, DatePicker, Select, Modal, Table } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import CustomerForm from "../../common/CustomerForm";
import InputField from "../../common/InputField";
import SelectInput from "../../common/SelectInput";
import BookRoomModal from "./BookRoomModal";
import { Link } from "react-router-dom";

const { Option } = Select;

const BookRoomFastModal = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [openCustomerForm, setOpenCustomerForm] = useState(false);
  const [openBookRoomForm, setOpenBookRoomForm] = useState(false);

  const [rooms, setRooms] = useState([
    {
      id: 1,
      roomType: "VIP",
      roomNumber: "01",
      checkIn: dayjs(),
      checkOut: dayjs().add(1, "days"),
      duration: "1 ngày",
      totalPrice: 2500000,
    },
  ]);

  const addRoom = () => {
    const newRoom = {
      id: rooms.length + 1,
      roomType: "VIP",
      roomNumber: "01",
      checkIn: dayjs(),
      checkOut: dayjs().add(1, "days"),
      duration: "1 ngày",
      totalPrice: 2500000,
    };
    setRooms([...rooms, newRoom]);
  };

  const deleteRoom = (id) => {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);
  };

  const columns = [
    {
      title: "Hạng phòng",
      dataIndex: "roomType",
      key: "roomType",
    },
    {
      title: "Phòng",
      dataIndex: "roomNumber",
      key: "roomNumber",
      render: (_, record) => (
        <Select defaultValue={record.roomNumber} style={{ width: 100 }}>
          <Option value="01">01</Option>
          <Option value="02">02</Option>
          <Option value="03">03</Option>
        </Select>
      ),
    },
    {
      title: "Nhận phòng",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (_, record) => (
        <DatePicker
          defaultValue={record.checkIn}
          format="HH:mm, DD/MM/YYYY"
          showTime={{ format: "HH:mm" }}
          className="w-full"
        />
      ),
    },
    {
      title: "Trả phòng",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (_, record) => (
        <DatePicker
          defaultValue={record.checkOut}
          format="HH:mm, DD/MM/YYYY"
          showTime={{ format: "HH:mm" }}
          className="w-full"
        />
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, record) => (
        <span className="text-green-500 font-semibold">
          {record.totalPrice.toLocaleString("vi-VN")} VND
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          color="red"
          className="bg-red-500"
          icon={<DeleteOutlined style={{ color: "white" }} />}
          onClick={() => deleteRoom(record.id)}
        />
      ),
    },
  ];

  const onSelect = (date) => {
    setSelectedDate(date); // Cập nhật ngày được chọn
  };

  const handleSubmit = () => {};

  return (
    <>
      <div className="flex items-center justify-between gap-2   space-x-4 mb-4">
        <div className="flex items-center   space-x-4 mb-4">
          <Input
            placeholder="Tìm khách hàng"
            prefix={<SearchOutlined />}
            suffix={
              <PlusCircleOutlined onClick={() => setOpenCustomerForm(true)} />
            }
            className="w-80"
          />
          {/* <div className="flex items-center gap-2  border-[1px] p-2 rounded-md">
              <PlusCircleOutlined onClick={() => setOpenCustomerForm(true)} />
              <Divider type="vertical" />
              <PlusCircleOutlined onClick={() => setOpenCustomerForm(true)} />
            </div> */}
        </div>
        <div>
          <SelectInput Typelayout={3} label={false} />
        </div>
      </div>

      {/* Thông tin dạng bảng */}
      <Table
        dataSource={rooms}
        columns={columns}
        pagination={false}
        rowKey="id"
        className="mb-4"
        scroll={{ x: "max-content" }}
        locale={{ emptyText: "Không có dữ liệu" }}
      />

      <div className="grid md:grid-cols-5 grid-cols-1 gap-4">
        <div className="md:col-span-3 col-span-full">
          <div className="mt-4 ">
            <Button
              onClick={() => setOpenBookRoomForm(true)}
              className="text-green-500 flex items-center gap-2 font-semibold border-green-500 hover:bg-green-100"
            >
              <PlusCircleOutlined />
              Chọn thêm phòng
            </Button>
          </div>
          {/* Ghi chú */}
          <div className="mt-2">
            {" "}
            <InputField
              label={"Ghi chú"}
              TypeLayout={1}
              className={"text-sm"}
              placeholder={"Nhập ghi chú "}
            />
          </div>
        </div>
        <div className="md:col-span-2 col-span-full bg-gray-50 flex items-center w-full">
          <div className="px-4 flex items-center justify-between w-full">
            <div className="gap-4 flex flex-col justify-center ">
              <p className="font-semibold text-base">Khách cần trả:</p>
              <div className="text-sm  flex items-center gap-2">
                Khách thanh toán:{" "}
                <span>
                  <CreditCardOutlined
                    className="p-2 rounded-md bg-green-400"
                    style={{ color: "#ffffff" }}
                  />
                </span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <InputField
                className={"text-green-600 bg-gray-50 font-semibold"}
                type="number"
              />

              <InputField
                type="number"
                defaultValue="0"
                className={"font-semibold bg-gray-50"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Các nút */}
      <div className="flex justify-between mt-4">
        <Button className="text-gray-500 font-semibold ">Thêm tuỳ chọn</Button>
        <div className="space-x-2">
          <Button
            type="primary"
            onClick={handleSubmit}
            className="bg-green-500 font-semibold"
          >
            Nhận phòng
          </Button>
          <Button type="primary" className="bg-orange-500 font-semibold">
            Đặt trước
          </Button>
        </div>
      </div>

      <Modal
        visible={true}
        footer={null}
        title="Thêm khách hàng"
        style={{ top: 10 }}
        width={800}
        open={openCustomerForm}
        onCancel={() => setOpenCustomerForm(false)}
      >
        {/* Tìm khách hàng */}
        <CustomerForm />
      </Modal>
      <Modal
        footer={null}
        title="Chọn phòng"
        style={{ top: 10 }}
        width={1000}
        height={800}
        className="overflow-y-auto"
        open={openBookRoomForm}
        onCancel={() => setOpenBookRoomForm(false)}
      >
        {/* Tìm khách hàng */}
        <BookRoomModal setOpen={setOpenBookRoomForm} />
      </Modal>
    </>
  );
};
export default BookRoomFastModal;
