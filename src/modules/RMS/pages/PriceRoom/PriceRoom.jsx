import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import {
  Button,
  Modal,
  Table,
  Layout,
  Radio,
  Collapse,
  Input,
  Tabs,
  Checkbox,
  Drawer,
  Dropdown,
  Menu,
  Space,
  Popover,
  Select,
} from "antd";
import "../../styles/index.css";
import {
  PlusOutlined,
  DeleteFilled,
  CheckSquareOutlined,
  MenuOutlined,
  CaretDownFilled,
  UploadOutlined,
  CaretDownOutlined,
  RightOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { PriceRoomModal } from "../../components/Modals/PriceRoomModal";
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;
const { Header, Content, Sider } = Layout;
export const PriceRoom = () => {
  const [roomInput, setRoomInput] = useState(""); // Lưu giá trị tìm kiếm

  // Tạo danh sách phòng giả sử dụng Faker.js
  const generateRooms = (numRooms) => {
    const rooms = [];
    for (let i = 0; i < numRooms; i++) {
      rooms.push({
        id: faker.string.uuid(),
        room: `P-${faker.number.int({ min: 100, max: 999 })}`, // Tên phòng dạng P-XXX
        type: faker.helpers.arrayElement([
          "Phòng đơn",
          "Phòng đôi",
          "Phòng VIP",
        ]), // Loại phòng
        commonPrice: faker.commerce.price(200, 1000, 0, " VND"), // Giá phòng chung
        currentPrice: faker.commerce.price(200, 1000, 0, " VND"), // Giá phòng theo bảng giá hiện tại
      });
    }
    return rooms;
  };

  const roomList = generateRooms(10); // Tạo danh sách 20 phòng giả

  // Lọc danh sách phòng theo tên
  const filteredRooms = roomList.filter((room) =>
    room.room.toLowerCase().includes(roomInput.toLowerCase())
  );
  const [selectedPriceList, setSelectedPriceList] = useState("Bảng giá chung");

  const priceLists = [
    "Bảng giá chung",
    ...Array.from(
      { length: 5 },
      () =>
        faker.commerce.department() +
        " - " +
        faker.number.int({ min: 1000, max: 9999 })
    ),
  ];

  const [openAddPriceRoom, setOpenAddPriceRoom] = useState(false);
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const [active, setActive] = useState("roomlevel");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [expandedRowKeysLevel, setExpandedRowKeysLevel] = useState([]);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  //#region table phòng
  const columns = [
    {
      title: "Tên phòng",
      dataIndex: "id",
      key: "id",
      render: (text) => <div className="text-left">{text}</div>,
    },
    {
      title: "Hạng phòng",
      dataIndex: "type",
      key: "type",
      render: (text) => <div className="text-left">{text}</div>,
    },
    {
      title: "Khu vực",
      dataIndex: "area",
      key: "area",
      align: "center",
    },
    {
      title: "Giá giờ",
      dataIndex: "hourlyRate",
      key: "hourlyRate",
      responsive: ["lg"],
      align: "center",
    },
    {
      title: "Giá cả ngày",
      dataIndex: "dailyRate",
      key: "dailyRate",
      responsive: ["lg"],
      align: "center",
    },
    {
      title: "Giá qua đêm",
      dataIndex: "overnightRate",
      key: "overnightRate",
      responsive: ["lg"],
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      responsive: ["lg"],
      align: "center",
    },
    {
      title: "Chi nhánh",
      dataIndex: "branch",
      key: "branch",
      responsive: ["lg"],
      render: (text) => <div className="text-left">{text}</div>,
    },
  ];

  const formatBookingCode = (index) => {
    const number = (index + 1).toString().padStart(3, "0"); // Định dạng số với 5 chữ số, thêm số 0 ở phía trước
    return `P.${number}`;
  };

  const data = Array.from({ length: 10 }, (_, index) => ({
    key: (index + 1).toString(),
    id: formatBookingCode(index),
    type: `P-${faker.number.int({ min: 100, max: 500 })}`,
    area: faker.helpers.arrayElement([
      "Phòng 02 giường đơn",
      "Phòng 01 giường đôi",
      "Phòng VIP",
      "Phòng gia đình",
      "Phòng 03 giường đơn",
    ]),
    hourlyRate: `${(
      Math.round(faker.number.int({ min: 100000, max: 200000 }) / 1000) * 1000
    ).toLocaleString("vi-VN")} ₫`,
    dailyRate: `${(
      Math.round(faker.number.int({ min: 800000, max: 1500000 }) / 1000) * 1000
    ).toLocaleString("vi-VN")} ₫`,
    overnightRate: `${(
      Math.round(faker.number.int({ min: 300000, max: 500000 }) / 1000) * 1000
    ).toLocaleString("vi-VN")} ₫`,
    status: faker.helpers.arrayElement([
      "Đang hoạt động",
      "Ngừng hoạt động",
      "Bảo trì",
    ]),
    note: faker.lorem.sentence(),
    branch: faker.helpers.arrayElement([
      "Chi nhánh trung tâm",
      "Chi nhánh phía Bắc",
      "Chi nhánh phía Nam",
    ]),
    imageUrl: "/assets/img/no-picture.png",
    startDate: faker.date.future().toLocaleDateString("en-GB"),
    surcharge: faker.helpers.arrayElement([
      "Tính tiền mỗi giờ",
      "Tính tiền theo ngày",
      "Tính tiền theo đêm",
    ]),
  }));

  const [selectedColumnsRoom, setSelectedColumnsRoom] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(columns);
  useEffect(() => {
    const savedColumns = JSON.parse(
      localStorage.getItem("selectedColumnsRoom")
    );
    if (savedColumns) {
      setSelectedColumnsRoom(savedColumns);
      filterColumns(savedColumns);
    } else {
      setSelectedColumnsRoom(columns.map((col) => col.key));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "selectedColumnsRoom",
      JSON.stringify(selectedColumnsRoom)
    );
    filterColumns(selectedColumnsRoom);
  }, [selectedColumnsRoom]);

  // Lọc các cột hiển thị dựa trên các hộp kiểm đã chọn
  const filterColumns = (selectedKeys) => {
    setVisibleColumns(columns.filter((col) => selectedKeys.includes(col.key)));
  };

  // Xử lý tich chọn ẩn hiện column table
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedColumnsRoom((prev) =>
      checked ? [...prev, name] : prev.filter((key) => key !== name)
    );
  };

  // Hiển thị column table
  const contentDropdownRoom = (
    <div className="space-y-2">
      {columns.map((col) => (
        <div key={col.key}>
          <Checkbox
            name={col.key}
            checked={selectedColumnsRoom.includes(col.key)}
            onChange={handleCheckboxChange}
          >
            {col.title}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  // Cập nhật localStorage và các cột được lọc khi selectedColumns thay đổi
  useEffect(() => {
    localStorage.setItem(
      "selectedColumnsRoom",
      JSON.stringify(selectedColumnsRoom)
    );
    filterColumns(selectedColumnsRoom);
  }, [selectedColumnsRoom]);

  //#endregion

  //#region hạng phòng
  const onRowExpandLevel = (expanded, record) => {
    const keys = expanded ? [record.key] : [];
    setExpandedRowKeysLevel(keys);
  };

  const columnsLevel = [
    {
      title: "Tên phòng",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Loại phòng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Bảng giá chung",
      key: "status",
      render: (_, record) => (
        <div>
          <div style={{ marginTop: 8 }}>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">Giá theo giờ:</span>{" "}
                {record.hourlyRate}
              </li>
              <li>
                <span className="font-semibold">Giá theo ngày:</span>{" "}
                {record.dailyRate}
              </li>
              <li>
                <span className="font-semibold">Giá qua đêm:</span>{" "}
                {record.overnightRate}
              </li>
            </ul>
          </div>
        </div>
      ),
      align: "center",
    },
    {
      title: "Bảng giá phụ",
      dataIndex: "branch",
      key: "branch",
      render: (_, record) => (
        <div>
          <div style={{ marginTop: 8 }}>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">Giá theo giờ</span>{" "}
                {record.hourlyRate}
              </li>
              <li>
                <span className="font-semibold">Giá theo ngày:</span>{" "}
                {record.dailyRate}
              </li>
              <li>
                <span className="font-semibold">Giá qua đêm:</span>{" "}
                {record.overnightRate}
              </li>
            </ul>
          </div>
        </div>
      ),
      align: "center",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      align: "center",
    },
    {
      title: "Phụ thu",
      dataIndex: "surcharge",
      key: "surcharge",
      align: "center",
    },
  ];

  const dataLevelRoom = Array.from({ length: 10 }, (_, index) => ({
    key: (index + 1).toString(),
    id: `P-${faker.number.int({ min: 100, max: 500 })}`,
    quantity: faker.helpers.arrayElement([
      "Phòng 02 giường đơn",
      "Phòng 03 giường đơn",
      "Phòng 01 giường đôi",
      "Phòng VIP",
      "Phòng gia đình",
    ]),
    hourlyRate: `${(
      Math.round(faker.number.int({ min: 100000, max: 200000 }) / 1000) * 1000
    ).toLocaleString("vi-VN")} ₫`,
    dailyRate: `${(
      Math.round(faker.number.int({ min: 800000, max: 1500000 }) / 1000) * 1000
    ).toLocaleString("vi-VN")} ₫`,
    overnightRate: `${(
      Math.round(faker.number.int({ min: 300000, max: 500000 }) / 1000) * 1000
    ).toLocaleString("vi-VN")} ₫`,

    status: faker.helpers.arrayElement([
      "Đang hoạt động",
      "Ngừng hoạt động",
      "Bảo trì",
    ]),
    branch: faker.helpers.arrayElement([
      "Chi nhánh trung tâm",
      "Chi nhánh phía Bắc",
      "Chi nhánh phía Nam",
    ]),
    imageUrl: "/assets/img/no-picture.png",
    startDate: faker.date.future().toLocaleDateString("en-GB"),
    surcharge: faker.helpers.arrayElement([
      "Tính tiền mỗi giờ",
      "Tính tiền theo ngày",
      "Tính tiền theo đêm",
    ]),
  }));
  const [selectedColumnsRoomLevel, setSelectedColumnsRoomLevel] = useState([]);
  const [visibleColumnsLevel, setVisibleColumnsLevel] = useState(columnsLevel);
  useEffect(() => {
    const savedColumnsLevel = JSON.parse(
      localStorage.getItem("selectedColumnsRoomLevel")
    );
    if (savedColumnsLevel) {
      setSelectedColumnsRoomLevel(savedColumnsLevel);
      filterColumnsLevel(savedColumnsLevel);
    } else {
      // Set all columns visible by default
      setSelectedColumnsRoomLevel(columnsLevel.map((col) => col.key));
    }
  }, []);

  // Cập nhật localStorage và các cột hiển thị khi selectedColumns thay đổi
  useEffect(() => {
    localStorage.setItem(
      "selectedColumnsRoomLevel",
      JSON.stringify(selectedColumnsRoomLevel)
    );
    filterColumnsLevel(selectedColumnsRoomLevel);
  }, [selectedColumnsRoomLevel]);

  // Lọc các cột hiển thị dựa trên các hộp kiểm đã chọn
  const filterColumnsLevel = (selectedKeys) => {
    setVisibleColumnsLevel(
      columnsLevel.filter((col) => selectedKeys.includes(col.key))
    );
  };

  // Handle checkbox change
  const handleCheckboxChangeLevel = (e) => {
    const { name, checked } = e.target;
    setSelectedColumnsRoomLevel((prev) =>
      checked ? [...prev, name] : prev.filter((key) => key !== name)
    );
  };

  // Hiển thị hộp kiểm động bên trong nội dung Popover
  const contentDropdownRoomLevel = (
    <div className="space-y-2">
      {columnsLevel.map((col) => (
        <div key={col.key}>
          <Checkbox
            name={col.key}
            checked={selectedColumnsRoomLevel.includes(col.key)}
            onChange={handleCheckboxChangeLevel}
          >
            {col.title}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  // Update localStorage and filtered columns when selectedColumns changes
  useEffect(() => {
    localStorage.setItem(
      "selectedColumnsRoomLevel",
      JSON.stringify(selectedColumnsRoomLevel)
    );
    filterColumns(selectedColumnsRoomLevel);
  }, [selectedColumnsRoomLevel]);

  //#endregion

  //hover chọn thêm phòng/ hạng phòng

  const handleCancelAddLevel = () => {
    setOpenAddPriceRoom(false);
  };

  //#endregion

  return (
    <div className="bg-white p- rounded-md shadow-lg h-[calc(100vh-60px)]">
      <Layout className="min-h-screen bg-gray rounded-md shadow-lg">
        {/* Header */}

        <Layout className="bg-gray">
          <Sider
            width={300}
            theme="light"
            className="bg-gray-50 p-4 md:block hidden"
          >
            {/* Sidebar content copied from above */}
            <div className="mb-4 p-4 bg-white rounded-lg shadow">
              <label className="block text-orange-500 text-base font-semibold mb-2">
                Chọn bảng giá
              </label>
              <Select
                defaultValue={selectedPriceList}
                style={{ width: "100%" }}
                className="custom-select border-b-[1px]  outline-none border-none border-gray-400 focus:border-blue-500 rounded-none grow w-full"
                onChange={(value) => setSelectedPriceList(value)}
              >
                {priceLists.map((priceList, index) => (
                  <Option key={index} value={priceList}>
                    {priceList}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h3 className="text-orange-500 font-semibold mb-2">
                Danh sách phòng
              </h3>
              <Input
                type="text"
                className="border-b-[1px]  outline-none border-gray-400 focus:border-blue-500  rounded-none !shadow-transparent mb-3"
                placeholder="Tìm phòng"
                suffix={<SearchOutlined />}
              />
              <div className="space-y-2">
                {filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    className="flex justify-between items-center p-2 border-b hover:bg-gray-100 cursor-pointer"
                  >
                    <span>{room.room}</span>
                    <PlusCircleOutlined />
                  </div>
                ))}
              </div>
            </div>
          </Sider>

          {/* Drawer for mobile */}
          <Drawer
            title="Lọc"
            placement="left"
            closable={true}
            onClose={onClose}
            visible={visible}
            className="p-4 bg-gray-50"
            bodyStyle={{ padding: 0 }}
          >
            {/* Sidebar Content for Drawer */}
            <Sider width={300} theme="light" className="bg-gray-50 p-4">
              {/* Sidebar content copied from above */}
              <div className="mb-4 p-4 bg-white rounded-lg shadow">
                <label className="block text-gray-600 font-medium mb-2">
                  Bảng giá
                </label>
                <Input
                  placeholder="Theo mã phòng"
                  className="border-none border-b"
                />
              </div>
            </Sider>
          </Drawer>
          {/* TOP HEADER */}
          <Content className="p-6 bg-white">
            <div className="lg:hidden block p-2">
              <Button icon={<MenuOutlined />} onClick={showDrawer} />
            </div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-700">
                {selectedPriceList}
              </h3>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setOpenAddPriceRoom(true)}
                  type="primary"
                >
                  <PlusOutlined className="ml-2" />
                  Thêm mới
                  <CaretDownFilled className="ml-2" />
                </Button>
                <Popover
                  content={contentDropdownRoomLevel}
                  trigger="click"
                  placement="bottomLeft"
                >
                  <Button type="primary">
                    <MenuOutlined />
                    <CaretDownOutlined />
                  </Button>
                </Popover>
              </div>
            </div>

            <Table
              columns={visibleColumnsLevel}
              dataSource={dataLevelRoom}
              pagination={10}
              className="min-w-full bg-white border border-gray-200 tbl-room table-reset"
            />
          </Content>
        </Layout>
      </Layout>
      {openAddPriceRoom && (
        <Modal
          open={openAddPriceRoom}
          width={1100}
          onCancel={handleCancelAddLevel}
          footer={null}
          className="custom-modal"
          title={<h2 className="text-lg font-semibold">Thêm mới hạng phòng</h2>}
        >
          <PriceRoomModal />
        </Modal>
      )}
    </div>
  );
};
