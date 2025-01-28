import React, { useState, useEffect } from "react";
import {
  Table,
  DatePicker,
  Tag,
  Button,
  Modal,
  Card,
  Checkbox,
  InputNumber,
  Form,
  Row,
  Col,
  Popover,
} from "antd";
import { EyeOutlined, SettingOutlined, SwapOutlined, SyncOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { RoomShiftHandover } from "../../components/Modals";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

const generateWorkShifts = () => {
  return Array.from({ length: 20 }, (_, index) => ({
    key: index + 1,
    date: faker.date
      .between({
        from: new Date("2024-11-06T08:00:00"),
        to: new Date("2024-11-30T10:00:00"),
      })
      .toLocaleDateString("vi-VN"),
    room: `Phòng ${faker.number.int({ min: 100, max: 999 })}`,
    status: faker.helpers.arrayElement(["Chưa hoàn thành", "Đã hoàn thành"]),
  }));
};

export const RoomEmployee = () => {
  const [shifts, setShifts] = useState(generateWorkShifts());
  const [filteredShifts, setFilteredShifts] = useState(shifts);
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(7, "day"),
    dayjs(),
  ]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isShiftModalVisible, setIsShiftModalVisible] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [roomDetails, setRoomDetails] = useState({});
  const [showRoomShiftHandover, setShowRoomShiftHandover] = useState(false);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    if (!dates) {
      setFilteredShifts(shifts);
    } else {
      const [start, end] = dates;
      const filtered = shifts.filter((shift) => {
        const shiftDate = dayjs(shift.date, "DD/MM/YYYY");
        return shiftDate.isBetween(start, end, "day", "[]");
      });
      setFilteredShifts(filtered);
    }
  };

  const toggleStatus = (shift) => {
    setSelectedShift(shift);
    setIsShiftModalVisible(true);
  };

  const handleShiftConfirm = () => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) =>
        shift.key === selectedShift.key
          ? {
              ...shift,
              status:
                shift.status === "Đã hoàn thành"
                  ? "Chưa hoàn thành"
                  : "Đã hoàn thành",
              details: roomDetails,
            }
          : shift
      )
    );
    setIsShiftModalVisible(false);
  };

  const handleViewDetail = (shift) => {
    setSelectedShift(shift);
    setIsDetailModalVisible(true);
  };

  const handleRoomDetailChange = (item, value) => {
    setRoomDetails((prevDetails) => ({
      ...prevDetails,
      [item]: value,
    }));
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Ngày làm việc",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Phòng",
      dataIndex: "room",
      key: "room",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Đã hoàn thành" ? "green" : "red"}>{status}</Tag>
      ),
      align: "center",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            className="bg-green-500 text-white hover:text-black-500"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          />
          <Button
            className="bg-sky-500 text-white hover:text-black-500"
            icon={<SyncOutlined />}
            onClick={() => toggleStatus(record)}
          />
        </div>
      ),
    },
  ];

  const content = (
    <div className="flex flex-col space-y-2">
      <Button
        type="default"
        onClick={() => setShowRoomShiftHandover(true)}
        icon={<SwapOutlined />}
        className="w-full flex items-center justify-center"
      >
        Bàn giao ca
      </Button>
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      <Card
        title={
          <div className="flex items-center justify-between">
            <p className="font-semibold text-base">Lịch làm việc của tôi</p>
            <div className="mb-6 space-x-3">
              <label className="font-semibold text-sm text-sky-600">
                Chọn thời gian:
              </label>
              <RangePicker
                onChange={handleDateRangeChange}
                defaultValue={dateRange}
                format="DD/MM/YYYY"
                placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
              />
            </div>
          </div>
        }
        className="w-full bg-white shadow-md rounded-lg p-4"
      >
        <Table
          columns={columns}
          dataSource={filteredShifts}
          className="table-reset"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "Không có ca làm việc nào" }}
        />
      </Card>

      <Modal
        title="Chi tiết ca làm việc"
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
      >
        {selectedShift && (
          <div>
            <p>
              <strong>Ngày làm việc:</strong> {selectedShift.date}
            </p>
            <p>
              <strong>Phòng:</strong> {selectedShift.room}
            </p>
            <p>
              <strong>Trạng thái:</strong> {selectedShift.status}
            </p>
          </div>
        )}
      </Modal>

      <Modal
        title="Phòng "
        visible={isShiftModalVisible}
        onCancel={() => setIsShiftModalVisible(false)}
        onOk={handleShiftConfirm}
      >
        <Form>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Checkbox
                onChange={(e) =>
                  handleRoomDetailChange("Thay ra giường", e.target.checked)
                }
              >
                Thay ra giường
              </Checkbox>
            </Col>
            <Col xs={24} sm={12}>
              <Checkbox
                onChange={(e) =>
                  handleRoomDetailChange("Nước suối", e.target.checked)
                }
              >
                Nước suối
              </Checkbox>
              {roomDetails["Nước suối"] && (
                <InputNumber
                  className="ml-2"
                  min={0}
                  placeholder="Số lượng"
                  onChange={(value) =>
                    handleRoomDetailChange("Số lượng nước suối", value)
                  }
                />
              )}
            </Col>
            <Col xs={24} sm={12}>
              <Checkbox
                onChange={(e) =>
                  handleRoomDetailChange("Pepsi", e.target.checked)
                }
              >
                Pepsi
              </Checkbox>
              {roomDetails["Pepsi"] && (
                <InputNumber
                  className="ml-2"
                  min={0}
                  placeholder="Số lượng"
                  onChange={(value) =>
                    handleRoomDetailChange("Số lượng Pepsi", value)
                  }
                />
              )}
            </Col>
            <Col xs={24} sm={12}>
              <Checkbox
                onChange={(e) =>
                  handleRoomDetailChange("Coca", e.target.checked)
                }
              >
                Coca
              </Checkbox>
              {roomDetails["Coca"] && (
                <InputNumber
                  className="ml-2"
                  min={0}
                  placeholder="Số lượng"
                  onChange={(value) =>
                    handleRoomDetailChange("Số lượng Coca", value)
                  }
                />
              )}
            </Col>
            <Col xs={24} sm={12}>
              <Checkbox
                onChange={(e) =>
                  handleRoomDetailChange("Khăn tắm", e.target.checked)
                }
              >
                Khăn tắm
              </Checkbox>
            </Col>
            <Col xs={24} sm={12}>
              <Checkbox
                onChange={(e) =>
                  handleRoomDetailChange("Dép đi trong phòng", e.target.checked)
                }
              >
                Dép đi trong phòng
              </Checkbox>
            </Col>
            <Col xs={24} sm={12}>
              <Checkbox
                onChange={(e) =>
                  handleRoomDetailChange("Xà phòng", e.target.checked)
                }
              >
                Xà bông
              </Checkbox>
            </Col>
            <Col xs={24} sm={12}>
              <Checkbox
                onChange={(e) =>
                  handleRoomDetailChange("Kem đánh răng", e.target.checked)
                }
              >
                Kem đánh răng
              </Checkbox>
            </Col>
            <Col xs={24} sm={12}>
              <Checkbox
                onChange={(e) =>
                  handleRoomDetailChange("Bàn chải đánh răng", e.target.checked)
                }
              >
                Bàn chải đánh răng{" "}
              </Checkbox>
            </Col>
            <Col xs={24} sm={12}>
              <Checkbox
                onChange={(e) =>
                  handleRoomDetailChange("Nước súc miệng", e.target.checked)
                }
              >
                Nước súc miệng
              </Checkbox>
            </Col>
          </Row>
        </Form>
      </Modal>

      <div className="p-2">
        <Modal
          open={showRoomShiftHandover}
          onCancel={() => setShowRoomShiftHandover(false)}
          width={900}
          footer={null}
          title={<h2 className="text-xl font-semibold ">Bàn giao ca</h2>}
        >
          <RoomShiftHandover />
        </Modal>
      </div>
      <div className="fixed bottom-4 right-4">
        <Popover content={content} trigger="hover" placement="topRight">
          <Button
            shape="circle"
            icon={<SettingOutlined />}
            size="large"
            className="bg-gray-100 shadow-lg hover:bg-gray-200"
          />
        </Popover>
      </div>
    </div>
  );
};
