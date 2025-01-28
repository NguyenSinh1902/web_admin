import React, { useState, useEffect } from "react";
import {
  Modal,
  Select,
  notification,
  DatePicker,
  Segmented,
  Card,
  Divider,
  Checkbox,
  Button,
  Tag,
} from "antd";
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  FolderOutlined,
  DeleteOutlined,
  SyncOutlined,
  SearchOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Chart from "react-apexcharts";

const { RangePicker } = DatePicker;

export const RoomManagement = () => {
  const roomStatusData = [
    { status: "Chưa dọn", color: "#546E7A", icon: "DeleteOutlined", count: 10 },
    { status: "Sạch", color: "#00E396", icon: "CheckCircleOutlined", count: 5 },
    { status: "Đang dọn", color: "#008FFB", icon: "SyncOutlined", count: 8 },
    {
      status: "Đang sửa",
      color: "#FEB019",
      icon: "AuditOutlined",
      count: 6,
    },
  ];

  const employees = ["Nguyễn Văn A", "Trần Thị B", "Phạm Văn C", "Lê Thị D"]; // Danh sách nhân viên

  const generateRooms = () => {
    const totalRooms = 80; // Tổng số phòng
    const floors = 10; // Số tầng

    return Array.from({ length: totalRooms }, (_, index) => {
      const randomStatus = faker.helpers.arrayElement(roomStatusData);
      const floor = Math.floor(index / (totalRooms / floors)) + 1; // Tính tầng
      const assignedTo = faker.datatype.boolean()
        ? faker.helpers.arrayElement(employees) // Ngẫu nhiên chọn nhân viên
        : "Chưa phân công"; // Nếu chưa phân công

      return {
        id: index + 1,
        name: `Phòng ${index + 101}`,
        status: randomStatus.status,
        color: randomStatus.color,
        icon: randomStatus.icon,
        floor: `Tầng ${floor}`, // Thông tin tầng
        assignedTo, // Thông tin người dọn phòng
      };
    });
  };
  const iconsMap = {
    DeleteOutlined: <DeleteOutlined />,
    SyncOutlined: <SyncOutlined />,
    CheckCircleOutlined: <CheckCircleOutlined />,
    AuditOutlined: <AuditOutlined />,
  };
  // #region chart

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: roomStatusData.map((item) => item.status),
    legend: {
      show: false, // Ẩn mô tả mặc định dưới biểu đồ
    },
    colors: ["#FEB019", "#00E396", "#008FFB", "#546E7A"],
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  const chartSeries = roomStatusData.map((item) => item.count);

  // #endregion

  const [rooms, setRooms] = useState(generateRooms);
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [segment, setSegment] = useState("Phòng");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(7, "day")]);

  const staffList = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D"];

  const openRoomModal = (room) => {
    setSelectedRoom(room);
    setIsModalVisible(true);
  };

  // #region Tags
  const [selectedTags, setSelectedTags] = useState([]);
  const handleTagClick = (status) => {
    const updatedTags = [...selectedTags];
    if (updatedTags.includes(status)) {
      // Hủy chọn tag
      const index = updatedTags.indexOf(status);
      updatedTags.splice(index, 1);
    } else {
      // Thêm tag vào danh sách
      updatedTags.push(status);
    }

    setSelectedTags(updatedTags);

    // Lọc lại danh sách phòng dựa trên các tag đã chọn
    if (updatedTags.length === 0) {
      setFilteredRooms(rooms); // Không lọc nếu không có tag nào được chọn
    } else {
      setFilteredRooms(
        rooms.filter((room) => updatedTags.includes(room.status))
      ); // Lọc theo trạng thái
    }
  };
  //#endregion

  // #region phân công nhân viên
  const [visible, setVisible] = useState(false); // Modal visibility
  const [selectedEmployee, setSelectedEmployee] = useState(""); // Nhân viên đã chọn
  const [selectedRooms, setSelectedRooms] = useState([]); // Các phòng đã chọn
  const [selectedFloors, setSelectedFloors] = useState([]); // Các tầng đã chọn

  // Nhóm các phòng theo tầng
  const groupedByFloor = rooms.reduce((acc, room) => {
    if (!acc[room.floor]) acc[room.floor] = [];
    acc[room.floor].push(room);
    return acc;
  }, {});

  const handleAssignClick = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAssign = () => {
    // Phân công nhân viên cho các phòng
    const updatedRooms = rooms.map((room) => {
      if (selectedRooms.includes(room.id)) {
        return { ...room, assignedTo: selectedEmployee }; // Gán nhân viên cho phòng
      }
      return room;
    });

    setRooms(updatedRooms); // Cập nhật lại phòng
    setVisible(false); // Đóng modal
    setSelectedRooms([]); // Reset danh sách phòng đã chọn
    setSelectedEmployee(""); // Reset nhân viên
    setSelectedFloors([]); // Reset tầng đã chọn
  };

  // Hàm xử lý khi chọn/deselect checkbox tầng
  const handleFloorChange = (floor, checked) => {
    const roomsInFloor = groupedByFloor[floor].map((room) => room.id);
    if (checked) {
      setSelectedRooms((prev) => [...prev, ...roomsInFloor]);
      setSelectedFloors((prev) => [...prev, floor]);
    } else {
      setSelectedRooms((prev) =>
        prev.filter((id) => !roomsInFloor.includes(id))
      );
      setSelectedFloors((prev) => prev.filter((f) => f !== floor));
    }
  };

  // Hàm xử lý khi chọn/deselect checkbox phòng
  const handleRoomChange = (roomId, checked) => {
    if (checked) {
      setSelectedRooms((prev) => [...prev, roomId]);
    } else {
      setSelectedRooms((prev) => prev.filter((id) => id !== roomId));
    }
  };
  // #endregion

  const handleAssignStaff = () => {
    if (selectedStaff) {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === selectedRoom.id ? { ...room, assigned: true } : room
        )
      );
      notification.success({
        message: "Nhân viên được phân công",
        description: `Nhân viên ${selectedStaff} đã được phân công dọn dẹp ${selectedRoom.name}.`,
      });
      setIsModalVisible(false);
      setSelectedStaff(null);
    } else {
      notification.warning({
        message: "Chưa chọn nhân viên",
        description: "Vui lòng chọn một nhân viên để phân công.",
      });
    }
  };

  const roomsByFloor = rooms.reduce((acc, room) => {
    if (!acc[room.floor]) acc[room.floor] = [];
    acc[room.floor].push(room);
    return acc;
  }, {});

  // #region room card
  const RoomCard = ({ room }) => {
    return (
      <div
        onClick={() => openRoomModal(room)}
        key={room.id}
        className="text-sm font-semibold"
      >
        <div
          className="py-4 rounded text-center text-white flex flex-col items-center"
          style={{ backgroundColor: room.color }}
        >
          <span>{room.name}</span>
          <span>{iconsMap[room.icon]}</span>
        </div>
      </div>
    );
  };

  // #endregion

  //#region  tiến độ làm việc
  const chartEmployeeProgressOptions = {
    series: [
      {
        name: "Tiến độ làm việc",
        data: [75, 50, 30, 90, 60, 85, 40], // Tiến độ của từng nhân viên (tỷ lệ %)
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false, // Cột đứng
          columnWidth: "45%",
          endingShape: "rounded", // Hình dáng cột tròn ở cuối
        },
      },
      dataLabels: {
        enabled: true, // Hiển thị giá trị trên các cột
      },
      xaxis: {
        categories: [
          "Nguyễn Văn A",
          "Trần Thị B",
          "Phạm Văn C",
          "Lê Thị D",
          "Hoàng Thị E",
          "Nguyễn Minh F",
          "Lê Thiện G",
        ], // Tên nhân viên
      },
      colors: ["#00E396", "#FEB019", "#FF4560", "#775DD0", "#2E93F9", "#8E44AD", "#F39C12"],
      title: {
        text: "Tiến độ làm việc của nhân viên",
        align: "center",
        margin: 20,
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      grid: {
        show: true, // Hiển thị lưới
      },
      tooltip: {
        y: {
          formatter: (val) => `${val}%`,
        },
      },
    },
  };

  //#endregion

  return (
    <div className="p-6">
      {/* Segment Filter */}
      <Card
        title="Quản lý buồng phòng"
        className="w-full  bg-white shadow-md rounded-lg p-4"
      >
        <div className="flex items-center justify-between mb-2 shadow-md p-2">
          <div className="">
            <Segmented
              options={[
                {
                  label: "Phòng",
                  value: "Phòng",
                  icon: <AppstoreOutlined />,
                },
                {
                  label: "Nhân viên",
                  value: "Nhân viên",
                  icon: <CheckCircleOutlined />,
                },
              ]}
              value={segment}
              onChange={(value) => setSegment(value)}
            />
          </div>

          {/* Date Range Picker */}
          <div className=" space-x-3">
            <div className="flex items-center gap-2">
              <div>
                <label className="font-semibold text-sm" htmlFor="">
                  Chọn thời gian:{" "}
                </label>
                <RangePicker
                  value={dateRange}
                  onChange={(dates) => setDateRange(dates)}
                  format="DD/MM/YYYY"
                  placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                />
              </div>
              <Button onClick={handleAssignClick} type="primary">
                Phân công nhân viên
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full">
          <div className="bg-white shadow-lg rounded-md flex items-center my-2 flex-1">
            {/* Biểu đồ */}
            <div className="w-2/3">
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="pie"
                height={300}
              />
            </div>

            {/* Mô tả trạng thái */}
            <div className="w-1/3 pl-6">
              <div className="grid grid-cols-2 gap-4">
                {roomStatusData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-gray-600"
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: chartOptions.colors[index],
                      }}
                    ></div>
                    <span>{item.status}</span>
                    <span className="ml-auto font-bold">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-md  my-2 flex-1">
            <Chart
              options={chartEmployeeProgressOptions.options}
              series={chartEmployeeProgressOptions.series}
              type="bar"
              height={350}
            />
          </div>
        </div>

        <div className="py-4">
          {roomStatusData.map((status) => (
            <Tag
              key={status.status}
              color={
                selectedTags.includes(status.status)
                  ? status.color
                  : "transparent"
              }
              borderColor={status.color}
              onClick={() => handleTagClick(status.status)}
              className="py-1"
              style={{
                marginBottom: 8,
                cursor: "pointer",
                backgroundColor: selectedTags.includes(status.status)
                  ? status.color
                  : "transparent",
                border: `1px solid ${status.color}`,
                color: selectedTags.includes(status.status)
                  ? "white"
                  : status.color,
              }}
            >
              {status.status}
            </Tag>
          ))}
        </div>

        {segment === "Phòng" ? (
          <div className="gap-2 mt-4">
            {Object.entries(roomsByFloor).map(([floor, roomsz]) => (
              <div key={floor} className="mb-6">
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold mb-4 whitespace-nowrap">
                    {floor} ({roomsz?.length || 0})
                  </div>
                  <Divider />
                </div>
                <div className="grid grid-cols-8 sm:grid-cols-4  gap-4">
                  {roomsz.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            {employees.map((employee) => (
              <div key={employee} className="mb-4">
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold mb-4 whitespace-nowrap">
                    {employee} (
                    {
                      rooms.filter((room) => room.assignedTo === employee)
                        .length
                    }
                    )
                  </div>
                  <Divider />
                </div>
                <div className="grid grid-cols-8 sm:grid-cols-4  gap-4">
                  {rooms
                    .filter((room) => room.assignedTo === employee)
                    .map((room) => (
                      <div key={room.id} className="text-sm font-semibold">
                        <div
                          className="py-4 rounded text-center text-white flex flex-col items-center"
                          style={{ backgroundColor: room.color }}
                        >
                          <span>{room.name}</span>
                          <span>{iconsMap[room.icon]}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
            <div className="mt-6">
              <h3 className="text-lg font-bold">Chưa phân công</h3>
              <div className="grid grid-cols-8 sm:grid-cols-4  gap-4">
                {rooms
                  .filter((room) => room.assignedTo === "Chưa phân công")
                  .map((room) => (
                    <div key={room.id} className="text-sm font-semibold">
                      <div
                        className="py-4 rounded text-center text-white flex flex-col items-center"
                        style={{ backgroundColor: room.color }}
                      >
                        <span>{room.name}</span>
                        <span>{iconsMap[room.icon]}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Modal để chọn nhân viên dọn phòng */}
      <Modal
        title={`Phân công dọn phòng - ${selectedRoom?.name}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAssignStaff}
        okText="Phân công"
      >
        <p>{/* <strong>Loại phòng:</strong> {selectedRoom?.type} */}</p>
        <p>
          <strong>Trạng thái hiện tại:</strong> {selectedRoom?.status}
        </p>
        <Select
          style={{ width: "100%" }}
          placeholder="Chọn nhân viên dọn phòng"
          onChange={(value) => setSelectedStaff(value)}
        >
          {staffList.map((staff) => (
            <Select.Option key={staff} value={staff}>
              {staff}
            </Select.Option>
          ))}
        </Select>
      </Modal>

      <Modal
        title="Phân công nhân viên cho phòng"
        visible={visible}
        width={1000}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="assign" type="primary" onClick={handleAssign}>
            Phân công
          </Button>,
        ]}
      >
        <div>
          <Select
            placeholder="Chọn nhân viên"
            value={selectedEmployee}
            onChange={setSelectedEmployee}
            className="mb-4 w-[200px]"
          >
            {employees.map((employee, index) => (
              <Select.Option key={index} value={employee}>
                {employee}
              </Select.Option>
            ))}
          </Select>

          {/* Hiển thị các tầng và checkbox các phòng trong tầng */}
          <div className="flex flex-col gap-3">
            {Object.keys(groupedByFloor).map((floor) => (
              <div key={floor} className="mb-4">
                <Checkbox
                  onChange={(e) => handleFloorChange(floor, e.target.checked)}
                  checked={selectedFloors.includes(floor)}
                >
                  <div className="font-semibold text-orange-500 flex items-center gap-2">
                    <div className="whitespace-nowrap">{floor}</div>{" "}
                    <div className="grow">
                      <Divider />
                    </div>
                  </div>
                </Checkbox>
                <Checkbox.Group
                  className=""
                  options={groupedByFloor[floor].map((room) => ({
                    label: room.name,
                    value: room.id,
                  }))}
                  value={selectedRooms}
                  onChange={setSelectedRooms}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};
