import React, { useEffect, useState } from "react";
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
  Segmented,
} from "antd";
import RoomForm from "./RoomForm";
import RoomLevelForm from "./RoomLevelForm";
import "../../styles/index.css";
import {
  PlusOutlined,
  DeleteFilled,
  CheckSquareOutlined,
  MenuOutlined,
  CaretDownFilled,
  UploadOutlined,
  CaretDownOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { FormatMoney } from "../../utils";
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Header, Content, Sider } = Layout;
export const Room = () => {
  const [openAddLevel, setOpenAddLevel] = useState(false);
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const [active, setActive] = useState("roomlevel");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [expandedRowKeysLevel, setExpandedRowKeysLevel] = useState([]);
  const [visible, setVisible] = useState(false);

  const viewOptions = [
    { label: "Hạng phòng", value: "roomlevel", icon: <AppstoreOutlined /> },
    { label: "Phòng", value: "room", icon: <BarsOutlined /> },
  ];

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const onRowExpand = (expanded, record) => {
    const keys = expanded ? [record.key] : [];
    setExpandedRowKeys(keys);
  };

  //#region table phòng
  const columns = [
    {
      title: "Tên phòng",
      dataIndex: "roomName",
      key: "id",
      render: (text) => <div className="text-left">{text}</div>,
    },
    {
      title: "Hạng phòng",
      dataIndex: "levelRoomName",
      key: "type",
      render: (text) => <div className="text-left">{text}</div>,
    },
    {
      title: "Giá giờ",
      dataIndex: "hourlyRate",
      key: "hourlyRate",
      responsive: ["lg"],
      align: "center",
      render: (text) => <p>{FormatMoney(text)}</p>,
    },
    {
      title: "Giá cả ngày",
      dataIndex: "dailyRate",
      key: "dailyRate",
      responsive: ["lg"],
      align: "center",
      render: (text) => <p>{FormatMoney(text)}</p>,
    },
    {
      title: "Giá qua đêm",
      dataIndex: "overnightRate",
      key: "overnightRate",
      responsive: ["lg"],
      align: "center",
      render: (text) => <p>{FormatMoney(text)}</p>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      responsive: ["lg"],
      align: "center",
      render: (text) => <div>Phòng đang kinh doanh</div>,
    },
    {
      title: "Chi nhánh",
      dataIndex: "branch",
      key: "branch",
      align: "center",
      responsive: ["lg"],
      render: (text) => <div>Chi nhánh trung tâm</div>,
    },
  ];

  const [dataRoom, setDataRoom] = useState([]);

  const handleSaveRoom = (data) => {
    setDataRoom((prevState) => [...prevState, data]);
  };
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

  const [dataLevelRoom, setDataLevelRoom] = useState([]);
  const [roomNames, setRoomNames] = useState([]);

  const handleSaveLevelRoom = (data) => {
    setDataLevelRoom((prevState) => [...prevState, data]);
    setRoomNames((prevRoomNames) => [
      ...prevRoomNames,
      { value: data.roomName, label: data.roomName, data: data },
    ]);
  };

  const onRowExpandLevel = (expanded, record) => {
    const keys = expanded ? [record.key] : [];
    setExpandedRowKeysLevel(keys);
  };

  const columnsLevel = [
    {
      title: "Tên hạng phòng",
      dataIndex: "roomName",
      key: "id",
      render: (text) => (
        <p className="text-left">
          <Checkbox>{text}</Checkbox>
        </p>
      ),
    },
    {
      title: "Số lượng phòng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <p>0</p>,
      align: "center",
    },
    {
      title: "Giá giờ",
      dataIndex: "hourlyRate",
      key: "hourlyRate",
      responsive: ["lg"],
      align: "center",
      render: (text) => <p>{FormatMoney(text)}</p>,
    },
    {
      title: "Giá cả ngày",
      dataIndex: "dailyRate",
      key: "dailyRate",
      responsive: ["lg"],
      align: "center",
      render: (text) => <p>{FormatMoney(text)}</p>,
    },
    {
      title: "Giá qua đêm",
      dataIndex: "overnightRate",
      key: "overnightRate",
      responsive: ["lg"],
      align: "center",
      render: (text) => <p>{FormatMoney(text)}</p>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      responsive: ["lg"],
      align: "center",
      render: (text) => <p>Phòng đang kinh doanh</p>,
    },
    {
      title: "Chi nhánh",
      dataIndex: "branch",
      key: "branch",
      responsive: ["lg"],
      render: (text) => <p className="text-left">Chi nhánh trung tâm</p>,
    },
  ];

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
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          setOpenAddLevel(true);
        }}
      >
        <Space>
          <PlusOutlined />
          Hạng phòng
        </Space>
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          setOpenAddRoom(true);
        }}
      >
        <Space>
          <PlusOutlined />
          Phòng
        </Space>
      </Menu.Item>
    </Menu>
  );

  const handleCancelAddLevel = () => {
    setOpenAddLevel(false);
  };

  const handleCancelAddRoom = () => {
    setOpenAddRoom(false);
  };

  //#region  xổ expan khi click vào hàng dữ liệu phòng
  const expandedRowRender = (record) => {
    return (
      <div className=" bg-white border-none expanded ">
        <Tabs defaultActiveKey="1" className=" tab-action-room ">
          <TabPane className="py-4 px-8 shadow-2xl" tab="Thông tin" key="1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 ">
                <img
                  src={record.imageUrl || "/assets/img/no-picture.png"}
                  alt="Room"
                  className="w-full h-auto rounded-lg"
                />
                <div className="flex flex-col gap-2">
                  <img
                    src={record.imageUrl || "/assets/img/no-picture.png"}
                    alt="Room"
                    className="w-20 h-auto rounded-lg opacity-40"
                  />
                  <img
                    src={record.imageUrl || "/assets/img/no-picture.png"}
                    alt="Room"
                    className="w-20 h-auto rounded-lg opacity-40"
                  />
                  <img
                    src={record.imageUrl || "/assets/img/no-picture.png"}
                    alt="Room"
                    className="w-20 h-auto rounded-lg opacity-40"
                  />
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 gap">
                  <div className=" flex flex-col gap-3">
                    <td className="  border-b-[1px] pb-2 !border-gray-300">
                      Chi nhánh:
                    </td>
                    <td className="  border-b-[1px] pb-2 !border-gray-300">
                      Giá giờ:
                    </td>
                    <td className="  border-b-[1px] pb-2 !border-gray-300">
                      Giá cả ngày:
                    </td>
                    <td className="  border-b-[1px] pb-2 !border-gray-300">
                      Giá qua đêm:
                    </td>
                  </div>
                  <div className="flex flex-col gap-3">
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      Chi nhánh trung tâm
                    </td>
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      {FormatMoney(record.hourlyRate)}
                    </td>
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      {FormatMoney(record.dailyRate)}
                    </td>
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      {FormatMoney(record.overnightRate)}
                    </td>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <p className=" pb-1 ">Ghi chú: </p>
                  <p className="font-semibold pb-2 text-red-500"></p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end w-full gap-3">
              <Button className="bg-green-500 px-3 py-2 font-semibold text-white h-auto flex items-center">
                <CheckSquareOutlined /> Cập nhật
              </Button>
              <Button className="bg-red-500 px-3 py-2 font-semibold text-white h-auto flex items-center">
                <DeleteFilled /> Xóa
              </Button>
            </div>
          </TabPane>
          {/* <TabPane tab="LS đặt phòng" key="2">
            
          </TabPane>
          <TabPane tab="LS giao dịch" key="3">
            <p>Thông tin lịch sử giao dịch sẽ được hiển thị ở đây...</p>
          </TabPane> */}
          {/* <TabPane tab="LS dọn phòng" key="4">
            <p>Thông tin lịch sử dọn phòng sẽ được hiển thị ở đây...</p>
          </TabPane> */}
        </Tabs>
      </div>
    );
  };
  //#endregion

  //#region  xổ expan khi click vào hàng dữ liệu hạng phòng
  const expandedRowRenderLevelRoom = (record) => {
    return (
      <div className=" bg-white border-none expanded ">
        <Tabs defaultActiveKey="1" className=" tab-action-room ">
          <TabPane className="py-4 px-8 shadow-2xl" tab="Thông tin" key="1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 ">
                <img
                  src={record.imageUrl || "/assets/img/no-picture.png"}
                  alt="Room"
                  className="w-full h-auto rounded-lg"
                />
                <div className="flex flex-col gap-2">
                  <img
                    src={record.imageUrl || "/assets/img/no-picture.png"}
                    alt="Room"
                    className="w-20 h-auto rounded-lg opacity-40"
                  />
                  <img
                    src={record.imageUrl || "/assets/img/no-picture.png"}
                    alt="Room"
                    className="w-20 h-auto rounded-lg opacity-40"
                  />
                  <img
                    src={record.imageUrl || "/assets/img/no-picture.png"}
                    alt="Room"
                    className="w-20 h-auto rounded-lg opacity-40"
                  />
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 gap">
                  <div className=" flex flex-col gap-3">
                    <td className="  border-b-[1px] pb-2 !border-gray-300">
                      Chi nhánh:
                    </td>
                    <td className="  border-b-[1px] pb-2 !border-gray-300">
                      Trạng thái:
                    </td>
                    <td className="  border-b-[1px] pb-2 !border-gray-300">
                      Giá giờ:
                    </td>
                    <td className="  border-b-[1px] pb-2 !border-gray-300">
                      Giá cả ngày:
                    </td>
                    <td className="  border-b-[1px] pb-2 !border-gray-300">
                      Giá qua đêm:
                    </td>
                  </div>
                  <div className="flex flex-col gap-3">
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      Chi nhánh trung tâm
                    </td>
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      Phòng đang kinh doanh
                    </td>
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      {FormatMoney(record.hourlyRate)}
                    </td>
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      {FormatMoney(record.dailyRate)}
                    </td>
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      {FormatMoney(record.overnightRate)}
                    </td>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <p className=" pb-1 ">Ghi chú: </p>
                  <p className="font-semibold pb-2 text-red-500"></p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end w-full gap-3">
              <Button className="bg-green-500 px-3 py-2 font-semibold text-white h-auto flex items-center">
                <CheckSquareOutlined /> Cập nhật
              </Button>
              <Button className="bg-red-500 px-3 py-2 font-semibold text-white h-auto flex items-center">
                <DeleteFilled /> Xóa
              </Button>
            </div>
          </TabPane>
          {/* <TabPane tab="Danh sách phòng" key="2">
            <Table
              className="min-w-full bg-white border border-gray-200 tbl-room table-reset"
              columns={columnsBookRoom}
              dataSource={dataBookRoom}
              pagination={false}
              scroll={{ x: "max-content" }}
            />
          </TabPane> */}
        </Tabs>
      </div>
    );
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
              <label className="block text-gray-600 font-medium mb-2">
                Tìm kiếm
              </label>
              <Input placeholder="Theo mã phòng" />
            </div>

            <Collapse ghost defaultActiveKey={["3", "4"]}>
              <Panel
                header="Chi nhánh"
                key="3"
                className="bg-white rounded-lg shadow mb-4"
              >
                <Input placeholder="Chi nhánh" />
              </Panel>

              <Panel
                header="Trạng thái"
                key="4"
                className="bg-white rounded-lg shadow mb-4"
              >
                <Radio.Group defaultValue="active">
                  <Radio value="active" className="block mb-2">
                    Phòng đang kinh doanh
                  </Radio>
                  <Radio value="inactive" className="block mb-2">
                    Phòng ngừng kinh doanh
                  </Radio>
                  <Radio value="all" className="block">
                    Tất cả
                  </Radio>
                </Radio.Group>
              </Panel>
            </Collapse>
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
                  Tìm kiếm
                </label>
                <Input placeholder="Theo mã phòng" />
              </div>

              <Collapse ghost defaultActiveKey={["3", "4"]}>
                <Panel
                  header="Danh sách dịch vụ"
                  key="3"
                  className="bg-white rounded-lg shadow mb-4"
                >
                  <div className="mb-4 p-4 bg-white rounded-lg shadow">
                    <label className="block text-gray-600 font-medium mb-2">
                      Chi nhánh
                    </label>
                    <Input placeholder="Chi nhánh" />
                  </div>
                </Panel>

                <Panel
                  header="Trạng thái"
                  key="4"
                  className="bg-white rounded-lg shadow mb-4"
                >
                  <Radio.Group defaultValue="active">
                    <Radio value="active" className="block mb-2">
                      Hàng đang kinh doanh
                    </Radio>
                    <Radio value="inactive" className="block mb-2">
                      Hàng ngừng kinh doanh
                    </Radio>
                    <Radio value="all" className="block">
                      Tất cả
                    </Radio>
                  </Radio.Group>
                </Panel>
              </Collapse>
            </Sider>
          </Drawer>
          {/* TOP HEADER */}
          <Content className="p-6 bg-white">
            <div className="lg:hidden block p-2">
              <Button icon={<MenuOutlined />} onClick={showDrawer} />
            </div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-700">
                Quản lý hạng phòng / phòng
              </h3>
              <div className="flex items-center gap-3">
                <Dropdown overlay={menu} trigger={["hover"]}>
                  <Button type="primary">
                    <PlusOutlined className="ml-2" />
                    Thêm mới
                    <CaretDownFilled className="ml-2" />
                  </Button>
                </Dropdown>
                {active == "room" && (
                  <>
                    <Button type="primary">
                      <UploadOutlined />
                      Import
                    </Button>
                    <Button type="primary">Xuất file</Button>

                    <Popover
                      content={contentDropdownRoom}
                      trigger="click"
                      placement="bottomLeft"
                    >
                      <Button type="primary">
                        <MenuOutlined />
                        <CaretDownOutlined />
                      </Button>
                    </Popover>
                  </>
                )}
                {active == "roomlevel" && (
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
                )}
              </div>
            </div>
            <Segmented
              className=" gap-2 p-1"
              defaultValue={"roomlevel"}
              options={viewOptions.map((option) => ({
                ...option,
                label: option.value === active ? option.label :  option.label,
              }))}
              onChange={(value) => setActive(value)}
            />

            {/* MODAL */}
            {active === "roomlevel" && (
              <>
                <div className="overflow-x-auto">
                  <Table
                  scroll={{x:"max-content"}}
                    columns={visibleColumnsLevel}
                    dataSource={dataLevelRoom}
                    pagination={10}
                    expandedRowRender={expandedRowRenderLevelRoom}
                    expandIcon={() => {
                      return <></>;
                    }}
                    onRow={(record) => ({
                      onClick: () => {
                        const newExpandedRowKeys =
                          expandedRowKeysLevel.includes(record.key)
                            ? expandedRowKeysLevel.filter(
                                (key) => key !== record.key
                              )
                            : [...expandedRowKeysLevel, record.key];
                        setExpandedRowKeysLevel(newExpandedRowKeys);
                      },
                    })}
                    expandedRowKeys={expandedRowKeysLevel}
                    onExpand={onRowExpandLevel}
                    rowClassName={(record) =>
                      expandedRowKeysLevel.includes(record.key)
                        ? "expanded-row bg-success-200 font-semibold"
                        : "normal-row"
                    }
                    className="min-w-full bg-white border border-gray-200 tbl-room table-reset"
                  />
                </div>
              </>
            )}

            {active === "room" && (
              <>
                <div className="overflow-x-auto">
                  <Table
                    columns={visibleColumns}
                    dataSource={dataRoom}
                    pagination={10}
                    expandedRowRender={expandedRowRender}
                    expandedRowKeys={expandedRowKeys}
                    expandIcon={() => {
                      return <></>;
                    }}
                    onRow={(record) => ({
                      onClick: () => {
                        const newExpandedRowKeys = expandedRowKeys.includes(
                          record.key
                        )
                          ? expandedRowKeys.filter((key) => key !== record.key)
                          : [...expandedRowKeys, record.key];
                        setExpandedRowKeys(newExpandedRowKeys);
                      },
                    })}
                    onExpand={onRowExpand}
                    rowClassName={(record) =>
                      expandedRowKeys.includes(record.key)
                        ? "expanded-row bg-success-200 font-semibold"
                        : "normal-row"
                    }
                    className="min-w-full bg-white border border-gray-200 tbl-room table-reset"
                  />
                </div>
              </>
            )}
            {openAddLevel && (
              <Modal
                open={openAddLevel}
                width={900}
                onCancel={handleCancelAddLevel}
                footer={null}
                className="custom-modal"
                title={
                  <h2 className="text-xl font-semibold">Thêm mới hạng phòng</h2>
                }
              >
                <RoomLevelForm onSave={handleSaveLevelRoom} />
              </Modal>
            )}
            {openAddRoom && (
              <Modal
                open={openAddRoom}
                width={900}
                onCancel={handleCancelAddRoom}
                footer={null}
                className="custom-modal"
                title={
                  <h2 className="text-xl font-semibold">Thêm mới phòng</h2>
                }
              >
                <RoomForm onSave={handleSaveRoom} roomNames={roomNames} />
              </Modal>
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
