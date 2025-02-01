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
    Alert,
    Card,
    Popover,
    Drawer,
    Select,
    DatePicker,
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
    FileDoneOutlined,
    InboxOutlined,
    FileExcelOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ServiceForm from "./ServiceForm";
import ModalComp from "../../common/ModalComp";
import GoodsForm from "./GooodsForm";
import InputField from "../../common/InputField";

const ImportGoods = () => {
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

    const navigate = useNavigate();

    const handleInventoryClick = () => {
        navigate("/rms/import-goods-form");
    };

    const handleChange = (value) => {};

    const [openPopovers, setOpenPopovers] = useState({
        dateCreated: false,
        lastTradingDay: false,
        totalSales: false,
    });

    // DatePicker
    const onChange = (date, dateString) => {};

    const handleClickPopovers = (key) => (newOpen) => {
        setOpenPopovers((prev) => ({
            ...prev,
            [key]: newOpen,
        }));
    };

    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        const initialCheckedItems = {
            importCode: true, // Mặc định là checked
            time: true,
            supplier: true,
            needPayNCC: true,
            status: true,
        };

        setCheckedItems(initialCheckedItems);
    }, []);

    const [checkHiddenColumn, setCheckHiddenColumn] = useState(() => {
        const storedColumns = localStorage.getItem("hiddenColumns");
        return storedColumns ? JSON.parse(storedColumns) : [];
    });

    // Lưu checkedItems vào localStorage mỗi khi nó thay đổi
    useEffect(() => {
        const newHiddenColumns = Object.keys(checkedItems).filter((column) => !checkedItems[column]);
        localStorage.setItem("hiddenColumnsInventory", JSON.stringify(newHiddenColumns));
    }, [checkedItems]);

    useEffect(() => {
        // Log giá trị sau khi reload
    }, []);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        // Cập nhật trạng thái checkedItems
        setCheckedItems((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    // Gộp data
    const combinedData = [
        // ...dataService.map(item => ({ ...item, type: "service" })),
        // ...dataGoods.map(item => ({ ...item, type: "goods" }))
    ];

    //#region column tổng hợp table
    const columnsCombined = [
        {
            title: "Mã nhập hàng",
            dataIndex: "importCode",
            key: "importCode",
            render: (text) => <p className="!text-left">{text}</p>,
            width: "20%",
        },
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
            align: "center",
            responsive: ["lg"],
            render: (text) => text ?? "---",
        },
        {
            title: "Nhà cung cấp",
            dataIndex: "supplier",
            key: "supplier",
            align: "center",
            responsive: ["lg"],
            render: (text) => text ?? "---",
        },
        {
            title: "Cần trả NCC",
            dataIndex: "needPayNCC",
            key: "needPayNCC",
            align: "center",
            render: (text) => text ?? "---",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
            responsive: ["lg"],
            render: (text) => text ?? "---",
        },
    ].filter((col) => checkedItems[col.dataIndex]); // Chỉ hiển thị các cột có trạng thái checked
    //#endregion

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
                    File tổng quan
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
                    File chi tiết
                </Space>
            </Menu.Item>
        </Menu>
    );

    const content = (
        <div>
            <div>
                <Checkbox name="importCode" checked={checkedItems.importCode} onChange={handleCheckboxChange}>
                    Mã hàng hóa
                </Checkbox>
            </div>
            <div>
                <Checkbox name="time" checked={checkedItems.time} onChange={handleCheckboxChange}>
                    Thời gian
                </Checkbox>
            </div>
            <div>
                <Checkbox name="supplier" checked={checkedItems.supplier} onChange={handleCheckboxChange}>
                    Nhà cung cấp
                </Checkbox>
            </div>
            <div>
                <Checkbox name="needPayNCC" checked={checkedItems.needPayNCC} onChange={handleCheckboxChange}>
                    Cần trả NCC
                </Checkbox>
            </div>
            <div>
                <Checkbox name="status" checked={checkedItems.status} onChange={handleCheckboxChange}>
                    Trạng thái
                </Checkbox>
            </div>
        </div>
    );

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

    const expandedRowRenderLevelService = (record) => {
        return (
            <div className=" bg-white border-none expanded ">
                <Tabs defaultActiveKey="1" className=" tab-action-room ">
                    <TabPane className="py-4 px-8 shadow-2xl" tab="Thông tin" key="1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
                            <div className="flex items-start gap-3 ">
                                <img src={record.imageUrl} alt="Room" className="w-full h-auto rounded-lg" />
                                <div className="flex flex-col gap-2">
                                    <img
                                        src={record.imageUrl}
                                        alt="Room"
                                        className="w-20 h-auto rounded-lg opacity-40"
                                    />
                                    <img
                                        src={record.imageUrl}
                                        alt="Room"
                                        className="w-20 h-auto rounded-lg opacity-40"
                                    />
                                    <img
                                        src={record.imageUrl}
                                        alt="Room"
                                        className="w-20 h-auto rounded-lg opacity-40"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="grid grid-cols-2 gap">
                                    <div className=" flex flex-col gap-3">
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Mã nhập hàng:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Thời gian:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Nhà cung cấp:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Cần trả NCC:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Trạng thái:</td>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.importCode}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.time}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.supplier}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.needPayNCC}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.status}
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

    const onRowExpandService = (expanded, record) => {
        const keys = expanded ? [record.key] : [];
        setExpandedRowKeysService(keys);
    };

    const expandedRowRenderGoods = (record) => {
        return (
            <div className=" bg-white border-none expanded ">
                <Tabs defaultActiveKey="1" className=" tab-action-room ">
                    <TabPane className="py-4 px-8 shadow-2xl" tab="Thông tin" key="1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
                            <div className="flex items-start gap-3 ">
                                <img src={record.imageUrl} alt="Room" className="w-full h-auto rounded-lg" />
                                <div className="flex flex-col gap-2">
                                    <img
                                        src={record.imageUrl}
                                        alt="Room"
                                        className="w-20 h-auto rounded-lg opacity-40"
                                    />
                                    <img
                                        src={record.imageUrl}
                                        alt="Room"
                                        className="w-20 h-auto rounded-lg opacity-40"
                                    />
                                    <img
                                        src={record.imageUrl}
                                        alt="Room"
                                        className="w-20 h-auto rounded-lg opacity-40"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="grid grid-cols-2 gap">
                                    <div className=" flex flex-col gap-3">
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Nhóm hàng:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Giá bán :</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Giá vốn :</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Vị trí</td>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.category}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.capitalprice}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.price}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.position}
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
                    <TabPane tab="Tồn kho" key="2">
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

    const hasSelected = selectedRowKeys.length > 0;

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
                            className="bg-gray p-4 h-[800px] overflow-y-scroll md:block hidden "
                        >
                            {/* Loại hàng */}
                            <Collapse ghost defaultActiveKey={["1", "2", "3", "4", "5"]}>
                                {/* Tìm kiếm */}
                                <Panel header="Tìm kiếm" key="1" className="bg-white rounded-lg shadow mb-4">
                                    <InputField placeholder="Theo mã phiếu nhập" className="mb-2" />
                                    <InputField placeholder="Theo mã, tên hàng" className="mb-2" />
                                    <InputField placeholder="Theo mã, tên NCC" className="mb-2" />
                                    <InputField placeholder="Theo ghi chú" className="mb-2" />
                                    <InputField placeholder="Theo ghi chú" className="mb-2" />
                                    <InputField placeholder="Theo tài khoản tạo" className="mb-2" />
                                </Panel>

                                {/* Thời gian */}
                                <Panel header="Thời gian" key="2" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="Thời gian">
                                        <Radio value="time" className="block mb-2">
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
                                                <Button style={{ width: 157 }}>Chọn thời gian </Button>
                                            </Popover>
                                        </Radio>
                                        <Radio value="Lựa chọn khác" className="block mb-2">
                                            <DatePicker onChange={onChange} needConfirm />
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Trạng thái */}
                                <Panel header="Trạng thái" key="3" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="all">
                                        <Radio value="complete" className="block mb-2">
                                            Phiếu tạm
                                        </Radio>
                                        <Radio value="complete" className="block mb-2">
                                            Đã nhập hàng
                                        </Radio>
                                        <Radio value="cancel" className="block mb-2">
                                            Đã hủy
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Trạng thái thanh toán */}
                                <Panel
                                    header="Trạng thái thanh toán"
                                    key="4"
                                    className="bg-white rounded-lg shadow mb-4"
                                ></Panel>

                                {/* Phòng */}
                                <Panel header="Chi phí nhập hàng" key="5" className="bg-white rounded-lg shadow mb-4">
                                    <Space wrap>
                                        <Select
                                            defaultValue="Chọn loại chi phí nhập hàng"
                                            style={{
                                                width: 200,
                                                color: "gray",
                                            }}
                                            onChange={handleChange}
                                            options={[
                                                {
                                                    value: "",
                                                    label: "",
                                                },
                                            ]}
                                        />
                                    </Space>
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
                            {/* Tìm kiếm */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block text-gray-600 font-medium mb-2">Tìm kiếm</label>
                                <Input placeholder="Theo mã, tên dịch vụ" />
                            </div>

                            {/* Loại hàng */}
                            <Collapse ghost defaultActiveKey={["1", "2", "3", "4", "5"]}>
                                <Panel header="Tìm kiếm" key="1" className="bg-white rounded-lg shadow mb-4">
                                    <InputField placeholder="Theo mã phiếu nhập" className="mb-2" />
                                    <InputField placeholder="Theo mã, tên hàng" className="mb-2" />
                                    <InputField placeholder="Theo mã, tên NCC" className="mb-2" />
                                    <InputField placeholder="Theo ghi chú" className="mb-2" />
                                    <InputField placeholder="Theo ghi chú" className="mb-2" />
                                    <InputField placeholder="Theo tài khoản tạo" className="mb-2" />
                                </Panel>

                                {/* Thời gian */}
                                <Panel header="Thời gian" key="2" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="Thời gian">
                                        <Radio value="time" className="block mb-2">
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
                                                <Button style={{ width: 157 }}>Chọn thời gian </Button>
                                            </Popover>
                                        </Radio>
                                        <Radio value="Lựa chọn khác" className="block mb-2">
                                            <DatePicker onChange={onChange} needConfirm />
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Trạng thái */}
                                <Panel header="Trạng thái" key="3" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="all">
                                        <Radio value="complete" className="block mb-2">
                                            Phiếu tạm
                                        </Radio>
                                        <Radio value="complete" className="block mb-2">
                                            Đã nhập hàng
                                        </Radio>
                                        <Radio value="cancel" className="block mb-2">
                                            Đã hủy
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Trạng thái thanh toán */}
                                <Panel
                                    header="Trạng thái thanh toán"
                                    key="4"
                                    className="bg-white rounded-lg shadow mb-4"
                                ></Panel>

                                {/* Phòng */}
                                <Panel header="Chi phí nhập hàng" key="5" className="bg-white rounded-lg shadow mb-4">
                                    <Space wrap>
                                        <Select
                                            defaultValue="Chọn loại chi phí nhập hàng"
                                            style={{
                                                width: 200,
                                                color: "gray",
                                            }}
                                            onChange={handleChange}
                                            options={[
                                                {
                                                    value: "",
                                                    label: "",
                                                },
                                            ]}
                                        />
                                    </Space>
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
                                <h1 className="text-lg font-bold text-gray-700">Phiếu nhập hàng</h1>
                            </div>

                            <div className="flex gap-5 ">
                                <Button type="primary" onClick={handleInventoryClick}>
                                    <PlusOutlined className="ml-2" />
                                    Nhập hàng
                                </Button>

                                <Dropdown overlay={menu} trigger={["hover"]}>
                                    <Button type="primary">
                                        <FileExcelOutlined className="ml-2" />
                                        Xuất file
                                        <CaretDownFilled className="ml-2" />
                                    </Button>
                                </Dropdown>

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
                                    columns={columnsCombined}
                                    dataSource={combinedData}
                                    expandedRowRender={expandedRowRenderLevelService} // Nếu cần mở rộng hàng
                                    expandedRowKeys={expandedRowKeysService}
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
                                            ? "expanded-row bg-[#b8f8ce] font-semibold"
                                            : "normal-row"
                                    }
                                    className="min-w-full bg-white border border-gray-200 tbl-room table-reset"
                                    locale={{
                                        emptyText: (
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <InboxOutlined style={{ fontSize: "50px", color: "#aaa" }} />
                                                <p>Không tìm thấy phiếu kiểm kho nào phù hợp trong tháng này.</p>
                                                <p>
                                                    Nhấn{" "}
                                                    <a href="#" className="text-blue-800">
                                                        vào đây
                                                    </a>{" "}
                                                    để tìm kiếm trên toàn thời gian.
                                                </p>
                                            </div>
                                        ),
                                    }}
                                />
                            </div>

                            {/* Điều kiện hiển thị Modal */}
                            {open && active === "service" && (
                                <ModalComp
                                    isOpen={open}
                                    width={1000}
                                    onClose={handleCancel}
                                    footer={null}
                                    className="custom-modal"
                                    title={<h2 className="text-xl font-semibold">Thêm mới dịch vụ</h2>}
                                >
                                    <ServiceForm />
                                </ModalComp>
                            )}
                            {open && active === "goods" && (
                                <ModalComp
                                    isOpen={open}
                                    width={1000}
                                    onClose={handleCancel}
                                    footer={null}
                                    className="custom-modal"
                                    title={<h2 className="text-xl font-semibold">Thêm mới hàng hóa</h2>}
                                >
                                    <GoodsForm />
                                </ModalComp>
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

export default ImportGoods;
