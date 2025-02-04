import React, { useState, useEffect } from "react";
import {
  Button,
  Layout,
  Table,
  Collapse,
  Checkbox,
  Radio,
  Input,
  Tabs,
  Dropdown,
  Menu,
  Space,
  Modal,
  Typography,
  Card,
  Popover,
  Drawer,
} from "antd";
import {
  CheckSquareOutlined,
  DeleteFilled,
  PlusOutlined,
  CaretDownFilled,
  UploadOutlined,
  WarningOutlined,
  MenuOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import ServiceForm from "./ServiceForm";
import GoodsForm from "./GooodsForm";
import { FormatMoney } from "../../utils";

const Service = () => {
  const { Panel } = Collapse;
  const { Header, Content, Sider } = Layout;
  const { TabPane } = Tabs;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("service");
  const [expandedRowKeysService, setExpandedRowKeysService] = useState([]);
  const [expandedRowKeysGoods, setExpandedRowKeysGoods] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { Link } = Typography;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const [checkedItems, setCheckedItems] = useState({});
  // #region Hàng hóa
  const columnsData = [
    {
      title: "Tên hàng hóa",
      dataIndex: "ProductName",
      key: "id",
      render: (text) => <p className="text-left">{text}</p>,
    },
    {
      title: "Loại hàng hóa",
      dataIndex: "ProductType",
      key: "ProductType",
      render: (text) => <p className="text-left">{text}</p>,
    },
    {
      title: "Nhóm hàng hóa",
      dataIndex: "ProductGroup",
      key: "ProductGroup",
      render: (text) => <p>{text}</p>,
      align: "center",
    },
    {
      title: "Thời lượng",
      dataIndex: "Time",
      key: "Time",
      align: "center",
      responsive: ["lg"],
      render: (text) => text ?? "---",
    },
    {
      title: "Giá vốn",
      dataIndex: "CostSold",
      key: "CostSold",
      responsive: ["lg"],
      align: "center",
      render: (text) => <p>{FormatMoney(text)}</p>,
    },
    {
      title: "Tồn kho",
      dataIndex: "Inventory",
      key: "Inventory",
      responsive: ["lg"],
      align: "center",
      render: (text) => <p>{FormatMoney(text)}</p>,
    },
    {
      title: "Vị trí",
      dataIndex: "Position",
      key: "Position",
      responsive: ["lg"],
      align: "center",
      render: (text) => text ?? "---",
    },
    {
      title: "Giá bán",
      dataIndex: "Price",
      key: "Price",
      responsive: ["lg"],
      align: "center",
      render: (text) => <p>{FormatMoney(text)}</p>,
    },
    {
      title: "Giá dịch vụ",
      dataIndex: "PriceService",
      key: "PriceService",
      align: "center",
      responsive: ["lg"],
      render: (text) => text ?? "---",
    },
  ];
  const [selectedColumnsService, setSelectedColumnsService] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(columnsData);
  const filterColumns = (selectedKeys) => {
    setVisibleColumns(
      columnsData.filter((col) => selectedKeys.includes(col.key))
    );
  };
  // Cập nhật localStorage và các cột được lọc khi selectedColumns thay đổi

  useEffect(() => {
    const savedColumns = JSON.parse(
      localStorage.getItem("hiddenColumnsService")
    );
    if (savedColumns) {
      setSelectedColumnsService(savedColumns);
      filterColumns(savedColumns);
    } else {
      setSelectedColumnsService(columnsData.map((col) => col.key));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "hiddenColumnsService",
      JSON.stringify(selectedColumnsService)
    );
    filterColumns(selectedColumnsService);
  }, [selectedColumnsService]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedColumnsService((prev) =>
      checked ? [...prev, name] : prev.filter((key) => key !== name)
    );
  };

  const [products, setProducts] = useState([]);

  const handleSaveProduct = (data) => {
    setProducts((prevState) => [...prevState, data]);
  };

  //hover chọn Dịch vụ/ hàng hóa
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          setActive("goods");
          setOpen(true);
        }}
      >
        <Space>
          <PlusOutlined />
          Thêm hàng hóa
        </Space>
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          setActive("service");
          setOpen(true);
        }}
      >
        <Space>
          <PlusOutlined />
          Thêm dịch vụ
        </Space>
      </Menu.Item>
    </Menu>
  );

  const contentDropdownRoom = (
    <div className="space-y-2">
      {columnsData.map((col) => (
        <div key={col.key}>
          <Checkbox
            name={col.key}
            checked={selectedColumnsService.includes(col.key)}
            onChange={handleCheckboxChange}
          >
            {col.title}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  const expandedRowRenderLevelService = (record) => {
    return (
      <div className=" bg-white border-none expanded ">
        <Tabs defaultActiveKey="1" className=" tab-action-room ">
          <TabPane className="py-4 px-8 shadow-2xl" tab="Thông tin" key="1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
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
                    <td className="border-b-[1px] pb-2 !border-gray-300">
                      Tên sản phẩm:
                    </td>
                    <td className="border-b-[1px] pb-2 !border-gray-300">
                      Nhóm sản phẩm:
                    </td>
                    <td className="border-b-[1px] pb-2 !border-gray-300">
                      Giá vốn:
                    </td>
                    <td className="border-b-[1px] pb-2 !border-gray-300">
                      Tồn kho:
                    </td>
                    <td className="border-b-[1px] pb-2 !border-gray-300">
                      Vị trí:
                    </td>
                    <td className="border-b-[1px] pb-2 !border-gray-300">
                      Giá bán:
                    </td>
                  </div>
                  <div className="flex flex-col gap-3">
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      {record.ProductName}
                    </td>
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      {record.ProductGroup}
                    </td>
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      {record.CostSold}
                    </td>
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      {record.Inventory}
                    </td>
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      {record.Position}
                    </td>
                    <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                      {record.Price}
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
          <TabPane tab="Chi tiết" key="2">
            {/* <Table
              className="table-reset"
              columns={columnsBookRoom}
              dataSource={dataBookRoom}
              pagination={false}
              scroll={{ x: "max-content" }}
            /> */}
          </TabPane>
        </Tabs>
      </div>
    );
  };

  const onRowExpandGoods = (expanded, record) => {
    const keys = expanded ? [record.key] : [];
    setExpandedRowKeysGoods(keys);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const showModal = () => {
    setOpenModal(true); // Hiển thị Modal khi người dùng nhấn nút
  };

  const handleOk = () => {
    setOpenModal(false);
  };
  const handleCancelModal = () => {
    setOpenModal(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="bg-white p- rounded-md shadow-lg h-[calc(100vh-60px)]">
      <Layout className="min-h-screen bg-gray rounded-md shadow-lg">
        {/* Header */}

        <Layout className="bg-gray">
          {/* Sidebar */}
          {active == "service" && (
            <Sider
              width={300}
              theme="light"
              className="bg-gray p-4 h-[800px] overflow-y-scroll md:block hidden"
            >
              {/* Tìm kiếm */}
              <div className="mb-4 p-4 bg-white rounded-lg shadow">
                <label className="block text-gray-600 font-medium mb-2">
                  Tìm kiếm
                </label>
                <Input placeholder="Theo mã, tên dịch vụ" />
              </div>

              {/* Loại hàng */}
              <Collapse ghost defaultActiveKey={["2", "3", "4"]}>
                {/* Loại dịch vụ */}
                <Panel
                  header="Loại dịch vụ"
                  key="3"
                  className="bg-white rounded-lg shadow mb-4"
                >
                  <Checkbox.Group
                    options={[
                      {
                        label: "Dịch vụ",
                        value: "service",
                      },
                      {
                        label: "Hàng hóa",
                        value: "goods",
                      },
                    ]}
                    defaultValue={["service"]}
                    // onChange={handleCheckboxChange}
                  />
                  
                </Panel>

                {/* Nhóm hàng */}
                {/* <Panel
                  header="Nhóm dịch vụ"
                  key="2"
                  className="bg-white rounded-lg shadow mb-4"
                >
                  <Input placeholder="Tìm kiếm nhóm dịch vụ" />
                  <ul className="mt-2">
                    <li className="py-1  cursor-pointer">
                      Tất cả
                    </li>
                    <li className="py-1  cursor-pointer">
                      Dịch Vụ
                    </li>
                  </ul>
                </Panel> */}

                {/* Tồn kho */}
                <Panel
                  header="Danh sách dịch vụ"
                  key="3"
                  className="bg-white rounded-lg shadow mb-4"
                >
                  <Radio.Group defaultValue="all">
                    <Radio value="all" className="block mb-2">
                      Tất cả
                    </Radio>
                    <Radio value="belowLimit" className="block mb-2">
                      Vệ sinh
                    </Radio>
                    <Radio value="aboveLimit" className="block mb-2">
                      Giặt rửa
                    </Radio>
                    <Radio value="inStock" className="block mb-2">
                      Gia đình
                    </Radio>
                  </Radio.Group>
                </Panel>

                {/* Trạng thái */}
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
          )}

          {active == "goods" && (
            <Sider width={300} theme="light" className="bg-gray p-4">
              {/* Tìm kiếm */}
              <div className="mb-4 p-4 bg-white rounded-lg shadow">
                <label className="block text-gray-600 font-medium mb-2">
                  Tìm kiếm
                </label>
                <Input placeholder="Theo mã, tên hàng" />
              </div>

              {/* Loại hàng */}
              <Collapse ghost defaultActiveKey={["2", "3", "4"]}>
                {/* Loại hàng hóa */}
                <Panel
                  header="Loại hàng hóa"
                  key="3"
                  className="bg-white rounded-lg shadow mb-4"
                >
                  <Checkbox.Group defaultValue="all">
                    <Checkbox
                      name="goods"
                      value="all"
                      className="block mb-2"
                      checked={checkedItems.goods}
                      onChange={handleCheckboxChange}
                    >
                      Hàng hóa
                    </Checkbox>
                    <Checkbox
                      name="service"
                      value="belowLimit"
                      className="block mb-2"
                      checked={checkedItems.service}
                      onChange={handleCheckboxChange}
                    >
                      Dịch vụ
                    </Checkbox>
                  </Checkbox.Group>
                </Panel>

                {/* Nhóm hàng */}
                <Panel
                  header="Nhóm hàng"
                  key="2"
                  className="bg-white rounded-lg shadow mb-4"
                >
                  <Input placeholder="Tìm kiếm nhóm hàng" />
                  <ul className="mt-2">
                    <li className="py-1 hover:bg-gray-300 cursor-pointer">
                      Tất cả
                    </li>
                    <li className="py-1 hover:bg-gray-300 cursor-pointer">
                      Dịch Vụ
                    </li>
                  </ul>
                </Panel>

                {/* Tồn kho */}
                <Panel
                  header="Tồn kho"
                  key="3"
                  className="bg-white rounded-lg shadow mb-4"
                >
                  <Radio.Group defaultValue="all">
                    <Radio value="all" className="block mb-2">
                      Tất cả
                    </Radio>
                    <Radio value="belowLimit" className="block mb-2">
                      Dưới định mức tồn
                    </Radio>
                    <Radio value="aboveLimit" className="block mb-2">
                      Vượt định mức tồn
                    </Radio>
                    <Radio value="inStock" className="block mb-2">
                      Còn hàng trong kho
                    </Radio>
                    <Radio value="outOfStock" className="block">
                      Hết hàng trong kho
                    </Radio>
                  </Radio.Group>
                </Panel>

                {/* Trạng thái */}
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
          )}

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
            {/* Sidebar */}
            {active == "service" && (
              <Sider
                width={300}
                theme="light"
                className="bg-gray p-4  md:hidden block"
              >
                {/* Tìm kiếm */}
                <div className="mb-4 p-4 bg-white rounded-lg shadow">
                  <label className="block text-gray-600 font-medium mb-2">
                    Tìm kiếm
                  </label>
                  <Input placeholder="Theo mã, tên dịch vụ" />
                </div>

                {/* Loại hàng */}
                <Collapse ghost defaultActiveKey={["2", "3", "4"]}>
                  {/* Loại dịch vụ */}
                  <Panel
                    header="Loại dịch vụ"
                    key="3"
                    className="bg-white rounded-lg shadow mb-4"
                  >
                    <Checkbox.Group defaultValue="all">
                      <Checkbox
                        name="goods"
                        value="all"
                        className="block mb-2"
                        onChange={handleCheckboxChange} // Gọi hàm này khi checkbox thay đổi
                        checked={checkedItems.goods}
                      >
                        Hàng hóa
                      </Checkbox>
                      <Checkbox
                        name="service"
                        value="belowLimit"
                        className="block mb-2"
                        checked={checkedItems.service}
                        onChange={handleCheckboxChange}
                      >
                        Dịch vụ
                      </Checkbox>
                    </Checkbox.Group>
                  </Panel>

                  {/* Nhóm hàng */}
                  <Panel
                    header="Nhóm dịch vụ"
                    key="2"
                    className="bg-white rounded-lg shadow mb-4"
                  >
                    <Input placeholder="Tìm kiếm nhóm dịch vụ" />
                    <ul className="mt-2">
                      <li className="py-1 hover:bg-gray-300 cursor-pointer">
                        Tất cả
                      </li>
                      <li className="py-1 hover:bg-gray-300 cursor-pointer">
                        Dịch Vụ
                      </li>
                    </ul>
                  </Panel>

                  {/* Tồn kho */}
                  <Panel
                    header="Danh sách dịch vụ"
                    key="3"
                    className="bg-white rounded-lg shadow mb-4"
                  >
                    <Radio.Group defaultValue="all">
                      <Radio value="all" className="block mb-2">
                        Tất cả
                      </Radio>
                      <Radio value="belowLimit" className="block mb-2">
                        Vệ sinh
                      </Radio>
                      <Radio value="aboveLimit" className="block mb-2">
                        Giặt rửa
                      </Radio>
                      <Radio value="inStock" className="block mb-2">
                        Gia đình
                      </Radio>
                    </Radio.Group>
                  </Panel>

                  {/* Trạng thái */}
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
            )}

            {active == "goods" && (
              <Sider width={300} theme="light" className="bg-gray p-4">
                {/* Tìm kiếm */}
                <div className="mb-4 p-4 bg-white rounded-lg shadow">
                  <label className="block text-gray-600 font-medium mb-2">
                    Tìm kiếm
                  </label>
                  <Input placeholder="Theo mã, tên hàng" />
                </div>

                {/* Loại hàng */}
                <Collapse ghost defaultActiveKey={["2", "3", "4"]}>
                  {/* Loại hàng hóa */}
                  <Panel
                    header="Loại hàng hóa"
                    key="3"
                    className="bg-white rounded-lg shadow mb-4"
                  >
                    <Checkbox.Group defaultValue="all">
                      <Checkbox
                        name="goods"
                        value="all"
                        className="block mb-2"
                        checked={checkedItems.goods}
                        onChange={handleCheckboxChange}
                      >
                        Hàng hóa
                      </Checkbox>
                      <Checkbox
                        name="service"
                        value="belowLimit"
                        className="block mb-2"
                        checked={checkedItems.service}
                        onChange={handleCheckboxChange}
                      >
                        Dịch vụ
                      </Checkbox>
                    </Checkbox.Group>
                  </Panel>

                  {/* Nhóm hàng */}
                  <Panel
                    header="Nhóm hàng"
                    key="2"
                    className="bg-white rounded-lg shadow mb-4"
                  >
                    <Input placeholder="Tìm kiếm nhóm hàng" />
                    <ul className="mt-2">
                      <li className="py-1 hover:bg-gray-300 cursor-pointer">
                        Tất cả
                      </li>
                      <li className="py-1 hover:bg-gray-300 cursor-pointer">
                        Dịch Vụ
                      </li>
                    </ul>
                  </Panel>

                  {/* Tồn kho */}
                  <Panel
                    header="Tồn kho"
                    key="3"
                    className="bg-white rounded-lg shadow mb-4"
                  >
                    <Radio.Group defaultValue="all">
                      <Radio value="all" className="block mb-2">
                        Tất cả
                      </Radio>
                      <Radio value="belowLimit" className="block mb-2">
                        Dưới định mức tồn
                      </Radio>
                      <Radio value="aboveLimit" className="block mb-2">
                        Vượt định mức tồn
                      </Radio>
                      <Radio value="inStock" className="block mb-2">
                        Còn hàng trong kho
                      </Radio>
                      <Radio value="outOfStock" className="block">
                        Hết hàng trong kho
                      </Radio>
                    </Radio.Group>
                  </Panel>

                  {/* Trạng thái */}
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
            )}
          </Drawer>

          {/* Main Content */}
          <Content className="p-6 bg-white">
            <div className="flex md:flex-row flex-col justify-between mb-4 gap-3">
              <div className="flex items-center gap-2">
                <div className="lg:hidden block p-2">
                  <Button icon={<MenuOutlined />} onClick={showDrawer} />
                </div>
                <h3 className="text-lg font-bold text-gray-700">
                  Quản lý dịch vụ / hàng hóa
                </h3>
              </div>

              <div className="flex gap-5">
                <Dropdown overlay={menu} trigger={["hover"]}>
                  <Button type="primary">
                    <PlusOutlined className="ml-2" />
                    Thêm mới
                    <CaretDownFilled className="ml-2" />
                  </Button>
                </Dropdown>

                <>
                  <Button type="primary" onClick={showModal}>
                    <UploadOutlined />
                    Import
                  </Button>
                  <Modal
                    visible={openModal}
                    onCancel={handleCancelModal}
                    onOk={() => setOpenModal(false)} // Đóng Modal khi nhấn OK
                    maskClosable={false} // Ngăn việc đóng Modal khi nhấn ra ngoài
                    footer={null}
                    width={540}
                  >
                    <div className="pt-5">
                      <div class="import-excel">
                        <strong>Nhập hàng hóa từ File dữ liệu </strong>
                        Xử lý dữ liệu (Tải về File mẫu:
                        <Link href="#" title="Download">
                          {" "}
                          Excel File
                        </Link>
                        ):
                      </div>
                      <br />
                      <div className="">
                        <p>
                          <strong>Có cập nhật giá tri tồn kho không?</strong>
                        </p>
                        <br />
                        <div>
                          <div className="flex gap-2">
                            <Radio type="radio" />
                            Không (chỉ cập nhật thông tin hàng hóa)
                          </div>
                          <br />
                          <div className="flex gap-2">
                            <Radio type="radio" />
                            Có (cập nhật tất cả thông tin hàng hóa và tồn kho)
                          </div>
                        </div>
                      </div>

                      <br />
                      <hr />
                      <br />

                      <div className="">
                        <p>
                          <strong>
                            Xử lý <i>trùng</i> mã hàng, <i>khác</i> tên hàng hóa
                          </strong>
                        </p>
                        <br />
                        <div>
                          <div className="flex gap-2">
                            <Radio type="radio" />
                            Báo lỗi và dừng import
                          </div>
                          <br />
                          <div className="flex gap-2 ">
                            <Radio type="radio" />
                            Thay thế tên hàng cũ bằng tên hàng mới
                          </div>
                        </div>
                      </div>
                      <br />
                      <hr />
                      <br />
                      <Card className="bg-yellow-50 ">
                        <h5 className="italic font-bold text-warning-800">
                          <WarningOutlined /> Lưu ý{" "}
                        </h5>
                        <div className="italic font-extralight text-warning-700">
                          <p className="mb-2">
                            Lưu ý: Hệ thống cho phép nhập tối đa 2.000 mặt hàng
                            mỗi lần từ file
                          </p>
                          <p className="mb-2">
                            Mã hàng chứa kí tự đặc biệt (@, #, $, *, /, -,
                            _,...) và chữ có dấu sẽ gây khó khăn khi In và sử
                            dụng mã vạch.
                          </p>
                          <p className="mb-2">
                            Với hình ảnh hàng hóa, hệ thống sẽ lưu trữ và hiển
                            thị theo link hình ảnh được nhập trên file excel
                            (không lưu trữ ảnh).
                          </p>
                        </div>
                      </Card>
                      <br />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="primary"
                        style={{ background: "rgb(60 157 60)" }}
                      >
                        Chọn file dữ liệu
                      </Button>
                    </div>
                  </Modal>
                </>
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
              </div>
            </div>

            {/* TAB BUTTONS */}
            {/* MODAL */}
            <>
              <div className="overflow-x-auto">
                <Table
                  pagination={{ pageSize: 10 }}
                  columns={visibleColumns}
                  dataSource={products}
                  expandedRowRender={expandedRowRenderLevelService} // Nếu cần mở rộng hàng
                  expandedRowKeys={expandedRowKeysService}
                  expandIcon={() => {
                    return <></>;
                  }}
                  rowSelection={rowSelection}
                  onRow={(record) => ({
                    onClick: () => {
                      const newExpandedRowKeys =
                        expandedRowKeysService.includes(record.key)
                          ? expandedRowKeysService.filter(
                              (key) => key !== record.key
                            )
                          : [...expandedRowKeysService, record.key];
                      setExpandedRowKeysService(newExpandedRowKeys);
                    },
                  })}
                  rowClassName={(record) =>
                    expandedRowKeysService.includes(record.key)
                      ? "expanded-row bg-success-500 font-semibold"
                      : "normal-row"
                  }
                  className="min-w-full bg-white border border-gray-200 tbl-room table-reset"
                />
              </div>

              {/* Điều kiện hiển thị Modal */}
              {open && active === "service" && (
                <Modal
                  open={open}
                  width={1000}
                  onCancel={handleCancel}
                  footer={null}
                  className="custom-modal"
                  title={
                    <h2 className="text-xl font-semibold">Thêm mới dịch vụ</h2>
                  }
                >
                  <ServiceForm onSave={handleSaveProduct} />
                </Modal>
              )}
              {open && active === "goods" && (
                <Modal
                  open={open}
                  width={1000}
                  onCancel={handleCancel}
                  footer={null}
                  className="custom-modal"
                  title={
                    <h2 className="text-xl font-semibold">Thêm mới hàng hóa</h2>
                  }
                >
                  <GoodsForm onSave={handleSaveProduct} />
                </Modal>
              )}
            </>

            {/* Table */}
          </Content>
        </Layout>
      </Layout>
      {/* TOP HEADER */}
    </div>
  );
};

export default Service;
