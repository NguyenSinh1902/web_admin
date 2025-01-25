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
    Space,
    Modal,
    Typography,
    Popover,
    Select,
    DatePicker,
    Drawer,
} from "antd";
import {
    CheckSquareOutlined,
    DeleteFilled,
    PlusOutlined,
    UploadOutlined,
    MenuOutlined,
    CaretDownOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import InputField from "../../common/InputField";
import CustomerForm from "../../common/CustomerForm";

const Customer = () => {
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
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const [isModalOpenCustomer, setIsModalOpenCustomer] = useState(false);
    const showModalCustomer = () => {
        setIsModalOpenCustomer(true);
    };
    const handleOkCustomer = () => {
        setIsModalOpenCustomer(false);
    };
    const handleCancelCustomer = () => {
        setIsModalOpenCustomer(false);
    };

    // #region hiển thị column table
    const columns = [
        {
            title: "Tên khách hàng",
            dataIndex: "CustomerName",
            key: "CustomerName",
            align: "center",
            responsive: ["lg"],
        },
        {
            title: "Loại khách",
            dataIndex: "CustomerType",
            key: "CustomerType",
            align: "center",
            responsive: ["lg"],
        },
        {
            title: "Mã số thuế",
            dataIndex: "TaxCode",
            key: "TaxCode",
            align: "center",
            responsive: ["lg"],
        },
        {
            title: "Ngày sinh",
            dataIndex: "BirthDate",
            key: "BirthDate",
            align: "center",
            responsive: ["lg"],
        },
        {
            title: "Địa chỉ",
            dataIndex: "Address",
            key: "Address",
            align: "center",
            responsive: ["lg"],
        },
        {
            title: "Email",
            dataIndex: "Email",
            key: "Email",
            align: "center",
            responsive: ["lg"],
        },
        {
            title: "Nhóm khách hàng",
            dataIndex: "CustomerGroup",
            key: "CustomerGroup",
            align: "center",
            responsive: ["lg"],
        },
    ];

    const [selectedColumnsCustomer, setSelectedColumnsCustomer] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState(columns);
    useEffect(() => {
        const savedColumns = JSON.parse(localStorage.getItem("showColumnsCustomer"));
        if (savedColumns) {
            setSelectedColumnsCustomer(savedColumns);
            filterColumns(savedColumns);
        } else {
            setSelectedColumnsCustomer(columns.map((col) => col.key));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("showColumnsCustomer", JSON.stringify(selectedColumnsCustomer));
        filterColumns(selectedColumnsCustomer);
    }, [selectedColumnsCustomer]);

    // Lọc các cột hiển thị dựa trên các hộp kiểm đã chọn
    const filterColumns = (selectedKeys) => {
        setVisibleColumns(columns.filter((col) => selectedKeys.includes(col.key)));
    };

    // Xử lý tich chọn ẩn hiện column table
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSelectedColumnsCustomer((prev) => (checked ? [...prev, name] : prev.filter((key) => key !== name)));
    };

    const content = (
        <div className="space-y-2">
            {columns.map((col) => (
                <div key={col.key}>
                    <Checkbox
                        name={col.key}
                        checked={selectedColumnsCustomer.includes(col.key)}
                        onChange={handleCheckboxChange}
                    >
                        {col.title}
                    </Checkbox>
                </div>
            ))}
        </div>
    );

    // data Customer
    const [dataCustomer, setDataCustomer] = useState([]);
    const handleSave = (data) => {
        setDataCustomer((prevState) => [...prevState, data]);
    };

    //#endregion

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
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Tên khách hàng:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Loại khách:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Mã số thuế:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Ngày sinh:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Địa chỉ:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Email:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Nhóm khách hàng:</td>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.CustomerName}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.CustomerType}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.TaxCode}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.BirthDate}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.Address}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.Email}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.CustomerGroup}
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

    const handleChange = (value) => {};

    // DatePicker
    const onChange = (date, dateString) => {};

    //Popover
    const text = <span>Title</span>;
    const handleClickChange = (open) => {
        setHovered(false);
        setClicked(open);
    };

    // Ngày tạo
    const clickContent = (
        <div className="flex gap-10">
            <div className="p-4 mb-4">
                <h3 className="text-md font-semibold mb-3">Theo ngày và tuần</h3>
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="text-blue-700 text-sm hover:underline">
                            Hôm nay
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 text-sm hover:underline">
                            Hôm qua
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 text-sm hover:underline">
                            Tuần này
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 text-sm hover:underline">
                            Tuần trước
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 text-sm hover:underline">
                            7 ngày qua
                        </a>
                    </li>
                </ul>
            </div>

            <div className="p-4 mb-4">
                <h3 className="text-md font-semibold mb-3">Theo tháng và quý</h3>
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Tháng này
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Tháng trước
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Tháng này (âm lịch)
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Tháng trước (âm lịch)
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            30 ngày qua
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Quý này
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Quý trước
                        </a>
                    </li>
                </ul>
            </div>

            <div className="p-4 mb-4">
                <h3 className="text-md font-semibold mb-3">Theo tháng và quý</h3>
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Năm nay
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Năm trước
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Năm nay (âm lịch)
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Năm trước (âm lịch)
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Toàn thời gian
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );

    const [openPopovers, setOpenPopovers] = useState({
        dateCreated: false,
        lastTradingDay: false,
        totalSales: false,
    });

    const handleClickPopovers = (key) => (newOpen) => {
        setOpenPopovers((prev) => ({
            ...prev,
            [key]: newOpen,
        }));
    };

    // Ngày sinh nhật
    const clickContentDate = (
        <div className="flex gap-10">
            <div className="p-4 mb-4">
                <h3 className="text-md font-semibold mb-3">Theo ngày và tuần</h3>
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="text-blue-700 text-sm hover:underline">
                            Hôm nay
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 text-sm hover:underline">
                            Hôm qua
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 text-sm hover:underline">
                            Ngày mai
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 text-sm hover:underline">
                            Tuần này
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 text-sm hover:underline">
                            Tuần trước
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 text-sm hover:underline">
                            Tuần sau
                        </a>
                    </li>
                </ul>
            </div>

            <div className="p-4 mb-4">
                <h3 className="text-md font-semibold mb-3">Theo tháng và quý</h3>
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Tháng này
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Tháng trước
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Tháng sau
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Quý này
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Quý trước
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Quý sau
                        </a>
                    </li>
                </ul>
            </div>

            <div className="p-4 mb-4">
                <h3 className="text-md font-semibold mb-3">Theo tháng và quý</h3>
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="text-blue-700 hover:underline">
                            Toàn thời gian
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );

    return (
        <div className="bg-white p- rounded-md shadow-lg h-[calc(100vh-60px)]">
            <Layout className="min-h-screen bg-gray rounded-md shadow-lg">
                {/* Header */}

                <Layout className="bg-gray-100">
                    {/* Sidebar */}
                    {active == "service" && (
                        <Sider
                            width={300}
                            theme="light"
                            className="bg-gray p-4 h-[800px] overflow-y-scroll md:block hidden"
                        >
                            {/* Nhóm khách hàng */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="text-gray-600 font-medium mb-2 flex justify-between">
                                    Nhóm khách hàng
                                    <Button className="border-none">
                                        <PlusCircleOutlined />
                                    </Button>
                                </label>
                                <div className="w-full">
                                    <Select
                                        defaultValue="Tất cả các nhóm"
                                        style={{
                                            color: "gray",
                                        }}
                                        className="w-full"
                                        onChange={handleChange}
                                        options={[
                                            {
                                                value: "Tất cả các nhóm",
                                                label: "Tất cả các nhóm",
                                            },
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Tìm kiếm */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block text-gray-600 font-medium mb-2">Tìm kiếm</label>
                                <Input placeholder="Theo mã, tên, điện thoại" className="mb-2" />
                                <Input placeholder="Theo mã hóa đơn" />
                            </div>

                            {/* Loại hàng */}
                            <Collapse ghost defaultActiveKey={["2", "3", "4"]}>
                                {/* Ngày tạo */}
                                <Panel header="Ngày tạo" key="1" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="Toàn thời gian">
                                        <Radio value="Toàn thời gian" className="block mb-2">
                                            <Popover
                                                content={
                                                    <div>
                                                        {clickContent}
                                                        {/* <a onClick={hide}>Close</a> */}
                                                    </div>
                                                }
                                                placement="right"
                                                trigger="click"
                                                open={openPopovers.dateCreated}
                                                onOpenChange={(newOpen) => handleClickPopovers("dateCreated")(newOpen)}
                                            >
                                                <Button style={{ width: 157 }}>Toàn thời gian</Button>
                                            </Popover>
                                        </Radio>
                                        <Radio value="Lựa chọn khác" className="block mb-2">
                                            <DatePicker onChange={onChange} needConfirm />
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Sinh nhật */}
                                {/* <Panel
                  header="Sinh nhật"
                  key="2"
                  className="bg-white rounded-lg shadow mb-4"
                >
                  <Radio.Group defaultValue="Toàn thời gian">
                    <Radio value="Toàn thời gian" className="block mb-2">
                      <Popover
                        content={
                          <div>
                            {clickContentDate}
                          </div>
                        }
                        placement="right"
                        trigger="click"
                        open={clicked}
                        onOpenChange={handleClickChange}
                      >
                        <Button style={{ width: 157 }}>Toàn thời gian</Button>
                      </Popover>
                    </Radio>
                    <Radio value="Lựa chọn khác" className="block mb-2">
                      <DatePicker onChange={onChange} needConfirm />
                    </Radio>
                  </Radio.Group>
                </Panel> */}

                                {/* Ngày giao dịch cuối */}
                                {/* <Panel
                  header="Ngày giao dịch cuối"
                  key="3"
                  className="bg-white rounded-lg shadow mb-4"
                >
                  <Radio.Group defaultValue="Toàn thời gian">
                    <Radio value="Toàn thời gian" className="block mb-2">
                      <Popover
                        content={
                          <div>
                            {clickContent}
                          </div>
                        }
                        placement="right"
                        trigger="click"
                        open={openPopovers.lastTradingDay}
                        onOpenChange={(newOpen) =>
                          handleClickPopovers("lastTradingDay")(newOpen)
                        }
                      >
                        <Button style={{ width: 157 }}>Toàn thời gian</Button>
                      </Popover>
                    </Radio>
                    <Radio value="Lựa chọn khác" className="block mb-2">
                      <DatePicker onChange={onChange} needConfirm />
                    </Radio>
                  </Radio.Group>
                </Panel> */}

                                {/* Tổng bán */}
                                {/* <Panel
                  header="Tổng bán"
                  key="4"
                  className="bg-white rounded-lg shadow mb-4"
                >
                  <div className="flex items-center gap-5">
                    Từ
                    <InputField defaultValue="0" />
                  </div>
                  <div className="flex items-center gap-5 mb-4">
                    Tới
                    <InputField placeholder="Giá trị" />
                  </div>
                  <Radio.Group defaultValue="Toàn thời gian">
                    <Radio value="Toàn thời gian" className="block mb-2">
                      <Popover
                        content={
                          <div>
                            {clickContent}
                          </div>
                        }
                        placement="right"
                        trigger="click"
                        open={openPopovers.totalSales}
                        onOpenChange={(newOpen) =>
                          handleClickPopovers("totalSales")(newOpen)
                        }
                      >
                        <Button style={{ width: 157 }}>Toàn thời gian</Button>
                      </Popover>
                    </Radio>
                    <Radio value="Lựa chọn khác" className="block mb-2">
                      <DatePicker onChange={onChange} needConfirm />
                    </Radio>
                  </Radio.Group>
                </Panel> */}

                                {/* Nợ hiện tại */}
                                {/* <Panel
                  header="Nợ hiện tại"
                  key="5"
                  className="bg-white rounded-lg shadow mb-4"
                >
                  <div className="flex items-center gap-5">
                    Từ
                    <InputField placeholder="Giá trị" />
                  </div>
                  <div className="flex items-center gap-5 mb-4">
                    Tới
                    <InputField placeholder="Giá trị" />
                  </div>
                </Panel> */}

                                {/* Loại khách */}
                                <Panel header="Loại khách" key="6" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="all">
                                        <Radio value="all" className="block mb-2">
                                            Tất cả
                                        </Radio>
                                        <Radio value="individual" className="block mb-2">
                                            Cá nhân
                                        </Radio>
                                        <Radio value="company" className="block mb-2">
                                            Công ty
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Giới tính*/}
                                <Panel header="Giới tính" key="7" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="all">
                                        <Radio value="all" className="block mb-2">
                                            Tất cả
                                        </Radio>
                                        <Radio value="male" className="block mb-2">
                                            Nam
                                        </Radio>
                                        <Radio value="famale" className="block mb-2">
                                            Nữ
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Khu vực */}
                                <Panel header="Khu vực" key="8" className="bg-white rounded-lg shadow mb-4">
                                    <Space wrap>
                                        <Select
                                            defaultValue="Chọn Tỉnh/TP-Quận/Huyện"
                                            style={{
                                                width: 200,
                                                color: "gray",
                                            }}
                                            onChange={handleChange}
                                            options={[
                                                {
                                                    value: "TP Hồ Chí Minh",
                                                    label: "TP Hồ Chí Minh",
                                                },
                                                {
                                                    value: "Hà Nội",
                                                    label: "Hà Nội",
                                                },
                                            ]}
                                        />
                                    </Space>
                                </Panel>

                                {/* Trạng thái */}
                                <Panel header="Trạng thái" key="9" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="all">
                                        <Radio value="all" className="block mb-2">
                                            Tất cả
                                        </Radio>
                                        <Radio value="operating" className="block mb-2">
                                            Đang hoạt động
                                        </Radio>
                                        <Radio value="stopOperating" className="block mb-2">
                                            Ngừng hoạt động
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
                        <Sider width={300} theme="light" className="bg-gray p-4 md:hidden block ">
                            {/* Nhóm khách hàng */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="text-gray-600 font-medium mb-2 flex justify-between">
                                    Nhóm khách hàng
                                    <Button className="border-none">
                                        <PlusCircleOutlined />
                                    </Button>
                                </label>
                                <div className="flex ">
                                    <Space wrap>
                                        <Select
                                            defaultValue="Tất cả các nhóm"
                                            style={{
                                                width: 200,
                                                color: "gray",
                                            }}
                                            onChange={handleChange}
                                            options={[
                                                {
                                                    value: "Tất cả các nhóm",
                                                    label: "Tất cả các nhóm",
                                                },
                                            ]}
                                        />
                                    </Space>
                                </div>
                            </div>

                            {/* Tìm kiếm */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block text-gray-600 font-medium mb-2">Tìm kiếm</label>
                                <Input placeholder="Theo mã, tên, điện thoại" className="mb-2" />
                                <Input placeholder="Theo mã hóa đơn" />
                            </div>

                            {/* Loại hàng */}
                            <Collapse ghost defaultActiveKey={["2", "3", "4"]}>
                                {/* Ngày tạo */}
                                <Panel header="Ngày tạo" key="1" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="Toàn thời gian">
                                        <Radio value="Toàn thời gian" className="block mb-2">
                                            <Popover
                                                content={
                                                    <div>
                                                        {clickContent}
                                                        {/* <a onClick={hide}>Close</a> */}
                                                    </div>
                                                }
                                                placement="right"
                                                trigger="click"
                                                open={openPopovers.dateCreated}
                                                onOpenChange={(newOpen) => handleClickPopovers("dateCreated")(newOpen)}
                                            >
                                                <Button style={{ width: 157 }}>Toàn thời gian</Button>
                                            </Popover>
                                        </Radio>
                                        <Radio value="Lựa chọn khác" className="block mb-2">
                                            <DatePicker onChange={onChange} needConfirm />
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Sinh nhật */}
                                <Panel header="Sinh nhật" key="2" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="Toàn thời gian">
                                        <Radio value="Toàn thời gian" className="block mb-2">
                                            <Popover
                                                content={
                                                    <div>
                                                        {clickContentDate}
                                                        {/* <a onClick={hide}>Close</a> */}
                                                    </div>
                                                }
                                                placement="right"
                                                trigger="click"
                                                open={clicked}
                                                onOpenChange={handleClickChange}
                                            >
                                                <Button style={{ width: 157 }}>Toàn thời gian</Button>
                                            </Popover>
                                        </Radio>
                                        <Radio value="Lựa chọn khác" className="block mb-2">
                                            <DatePicker onChange={onChange} needConfirm />
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Ngày giao dịch cuối */}
                                <Panel header="Ngày giao dịch cuối" key="3" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="Toàn thời gian">
                                        <Radio value="Toàn thời gian" className="block mb-2">
                                            <Popover
                                                content={
                                                    <div>
                                                        {clickContent}
                                                        {/* <a onClick={hide}>Close</a> */}
                                                    </div>
                                                }
                                                placement="right"
                                                trigger="click"
                                                open={openPopovers.lastTradingDay}
                                                onOpenChange={(newOpen) =>
                                                    handleClickPopovers("lastTradingDay")(newOpen)
                                                }
                                            >
                                                <Button style={{ width: 157 }}>Toàn thời gian</Button>
                                            </Popover>
                                        </Radio>
                                        <Radio value="Lựa chọn khác" className="block mb-2">
                                            <DatePicker onChange={onChange} needConfirm placeholder="Lựa chọn khác" />
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Tổng bán */}
                                <Panel header="Tổng bán" key="4" className="bg-white rounded-lg shadow mb-4">
                                    <div className="flex items-center gap-5">
                                        Từ
                                        <InputField defaultValue="0" />
                                    </div>
                                    <div className="flex items-center gap-5 mb-4">
                                        Tới
                                        <InputField placeholder="Giá trị" />
                                    </div>
                                    <Radio.Group defaultValue="Toàn thời gian">
                                        <Radio value="Toàn thời gian" className="block mb-2">
                                            <Popover
                                                content={
                                                    <div>
                                                        {clickContent}
                                                        {/* <a onClick={hide}>Close</a> */}
                                                    </div>
                                                }
                                                placement="right"
                                                trigger="click"
                                                open={openPopovers.totalSales}
                                                onOpenChange={(newOpen) => handleClickPopovers("totalSales")(newOpen)}
                                            >
                                                <Button style={{ width: 157 }}>Toàn thời gian</Button>
                                            </Popover>
                                        </Radio>
                                        <Radio value="Lựa chọn khác" className="block mb-2">
                                            <DatePicker onChange={onChange} needConfirm />
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Nợ hiện tại */}
                                <Panel header="Nợ hiện tại" key="5" className="bg-white rounded-lg shadow mb-4">
                                    <div className="flex items-center gap-5">
                                        Từ
                                        <InputField placeholder="Giá trị" />
                                    </div>
                                    <div className="flex items-center gap-5 mb-4">
                                        Tới
                                        <InputField placeholder="Giá trị" />
                                    </div>
                                </Panel>

                                {/* Loại khách */}
                                <Panel header="Loại khách" key="6" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="all">
                                        <Radio value="all" className="block mb-2">
                                            Tất cả
                                        </Radio>
                                        <Radio value="individual" className="block mb-2">
                                            Cá nhân
                                        </Radio>
                                        <Radio value="company" className="block mb-2">
                                            Công ty
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Giới tính*/}
                                <Panel header="Giới tính" key="7" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="all">
                                        <Radio value="all" className="block mb-2">
                                            Tất cả
                                        </Radio>
                                        <Radio value="male" className="block mb-2">
                                            Nam
                                        </Radio>
                                        <Radio value="famale" className="block mb-2">
                                            Nữ
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Khu vực */}
                                <Panel header="Khu vực" key="8" className="bg-white rounded-lg shadow mb-4">
                                    <Space wrap>
                                        <Select
                                            defaultValue="Chọn Tỉnh/TP-Quận/Huyện"
                                            style={{
                                                width: 200,
                                                color: "gray",
                                            }}
                                            onChange={handleChange}
                                            options={[
                                                {
                                                    value: "TP Hồ Chí Minh",
                                                    label: "TP Hồ Chí Minh",
                                                },
                                                {
                                                    value: "Hà Nội",
                                                    label: "Hà Nội",
                                                },
                                            ]}
                                        />
                                    </Space>
                                </Panel>

                                {/* Trạng thái */}
                                <Panel header="Trạng thái" key="9" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="all">
                                        <Radio value="all" className="block mb-2">
                                            Tất cả
                                        </Radio>
                                        <Radio value="operating" className="block mb-2">
                                            Đang hoạt động
                                        </Radio>
                                        <Radio value="stopOperating" className="block mb-2">
                                            Ngừng hoạt động
                                        </Radio>
                                    </Radio.Group>
                                </Panel>
                            </Collapse>
                        </Sider>
                    </Drawer>

                    {/* Main Content */}
                    <Content className="p-6 bg-white">
                        <div className="flex md:flex-row flex-col justify-between mb-4 gap-3">
                            <div className="flex items-center gap-2">
                                <div className="lg:hidden block p-2">
                                    <Button icon={<MenuOutlined />} onClick={showDrawer} />
                                </div>
                                <h1 className="text-lg font-bold text-gray-700">Khách hàng</h1>
                            </div>

                            <div className="flex gap-5">
                                <Button onClick={showModalCustomer} type="primary">
                                    <PlusOutlined className="ml-2" />
                                    Khách hàng
                                </Button>

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
                                            </div>
                                            <br />
                                            <div cla="mb-2">
                                                Xử lý dữ liệu (Tải về File mẫu:
                                                <Link href="#" title="Download">
                                                    {" "}
                                                    Excel File
                                                </Link>
                                                )
                                            </div>
                                            <hr />
                                            <br />
                                            <div className="">
                                                <div>
                                                    <div className="flex gap-2">
                                                        <Radio type="radio" />
                                                        Cập nhật dư nợ cuối
                                                    </div>
                                                    <br />
                                                    <div className="flex gap-2">
                                                        <Radio type="radio" />
                                                        Cho phép khách hàng trùng email
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <br />
                                        </div>
                                        <div className="flex justify-end">
                                            <Button type="primary" style={{ background: "rgb(60 157 60)" }}>
                                                Chọn file dữ liệu
                                            </Button>
                                        </div>
                                    </Modal>
                                </>
                                <Button type="primary">Xuất file</Button>

                                <Popover content={content} trigger="click" placement="bottomLeft">
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
                                    dataSource={dataCustomer}
                                    expandedRowRender={expandedRowRenderLevelService} // Nếu cần mở rộng hàng
                                    expandedRowKeys={expandedRowKeysService}
                                    expandIcon={() => {
                                        return <></>;
                                    }}
                                    rowSelection={rowSelection}
                                    onRow={(record) => ({
                                        onClick: () => {
                                            const newExpandedRowKeys = expandedRowKeysService.includes(record.key)
                                                ? expandedRowKeysService.filter((key) => key !== record.key)
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
                        </>
                    </Content>
                </Layout>
            </Layout>

            {/* modal */}
            <Modal
                width={900}
                title="Thêm khách hàng"
                open={isModalOpenCustomer}
                onOk={handleOkCustomer}
                footer={<></>}
                onCancel={handleCancelCustomer}
            >
                <CustomerForm onSave={handleSave} />
            </Modal>
            {/* end */}
        </div>
    );
};

export default Customer;
