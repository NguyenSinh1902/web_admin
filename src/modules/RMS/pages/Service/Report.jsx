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
    TimePicker,
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
import InputField from "../../common/InputField";
import { faker } from "@faker-js/faker";

const Report = () => {
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
    const { RangePicker } = DatePicker;
    const [openFrom, setOpenFrom] = useState(false); // Trạng thái cho TimePicker "Từ"
    const [openTo, setOpenTo] = useState(false); // Trạng thái cho TimePicker "Đến"

    // Lấy ngày hiện tại
    const today = new Date();
    const formattedDate = today.toLocaleDateString("vi-VN"); // Định dạng ngày theo kiểu Việt Nam (dd/mm/yyyy)

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
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
            documentCode: true, // Mặc định là checked
            cashier: true,
            time: true,
            pay: true,
            numberProducts: true,
            totalProductCost: true,
            numberRooms: true,
            totalAmount: true,
            contractDiscount: true,
            revenue: true,
            otherIncome: true,
            actualRevenue: true,
            debit: true,
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

    // data Report
    const dataReport = Array.from({ length: 10 }, (_, index) => {
        const totalProductCost = faker.finance.amount(100000, 500000, 0);
        return {
            key: `Lv${index + 1}`,
            documentCode: `HD${faker.number.int({ min: 100000, max: 999999 })}`,
            imageUrl: "/assets/img/no-picture.png",
            cashier: faker.name.fullName(),
            time: faker.date.past().toLocaleString(),
            pay: Math.random() < 0.5 ? "TM" : "CK",
            numberProducts: `${faker.number.int({ min: 100, max: 999 })}`,
            totalProductCost: totalProductCost,
            numberRooms: 0,
            totalAmount: 0,
            contractDiscount: 0,
            revenue: totalProductCost,
            otherIncome: 0,
            actualRevenue: totalProductCost,
            debit: 0,
        };
    });

    // Gộp data
    const combinedData = [
        ...dataReport.map((item) => ({ ...item, type: "service" })),
        // ...dataGoods.map(item => ({ ...item, type: "goods" }))
    ];

    //#region column tổng hợp table
    const columnsCombined = [
        {
            title: "Mã chứng từ",
            dataIndex: "documentCode",
            key: "documentCode",
            render: (text) => <p className="!text-left">{text}</p>,
            width: "10%",
        },
        {
            title: "Thu ngân",
            dataIndex: "cashier",
            key: "cashier",
            align: "center",
            width: "10%",
            render: (text) => <p className="!text-left">{text}</p>,
        },
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
            align: "center",
            width: "10%",
            render: (text) => text ?? "---",
        },
        {
            title: "Thanh toán",
            dataIndex: "pay",
            key: "pay",
            align: "center",
            width: "10%",
            render: (text) => text ?? "---",
        },
        {
            title: "SLSP",
            dataIndex: "numberProducts",
            key: "numberProducts",
            align: "center",
            width: "10%",
            render: (text) => text ?? "---",
        },
        {
            title: "Tổng tiền SP",
            dataIndex: "totalProductCost",
            key: "totalProductCost",
            align: "center",
            width: "10%",
            render: (text) => text ?? "---",
        },
        {
            title: "SL Phòng",
            dataIndex: "numberRooms",
            key: "numberRooms",
            align: "center",
            width: "10%",
            render: (text) => text ?? "---",
        },
        {
            title: "Tổng tiền phòng",
            dataIndex: "totalRoomFee",
            key: "totalRoomFee",
            align: "center",
            width: "10%",
            render: (text) => text ?? "---",
        },
        {
            title: "Giảm giá HĐ",
            dataIndex: "contractDiscount",
            key: "contractDiscount",
            align: "center",
            width: "10%",
            render: (text) => text ?? "---",
        },
        {
            title: "Doanh thu",
            dataIndex: "revenue",
            key: "revenue",
            align: "center",
            width: "10%",
            render: (text) => text ?? "---",
        },
        {
            title: "Thu khác",
            dataIndex: "otherIncome",
            key: "otherIncome",
            align: "center",
            width: "10%",
            render: (text) => text ?? "---",
        },
        {
            title: "Thực thu",
            dataIndex: "actualRevenue",
            key: "actualRevenue",
            align: "center",
            width: "10%",
            render: (text) => text ?? "---",
        },
        {
            title: "Ghi nợ",
            dataIndex: "debit",
            key: "debit",
            align: "center",
            width: "10%",
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div className=" flex flex-col gap-3">
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Mã chứng từ:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Thu ngân:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Thời gian:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Thanh toán:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">SLSP:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Tổng tiền SP:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">SL Phòng:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Giảm giá HĐ:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Doanh thu:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Thu khác:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Thực thu:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Ghi nợ:</td>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.documentCode}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.cashier}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.time}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.pay}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.numberProducts}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.totalProductCost}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.totalAmount}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.numberRooms}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.revenue}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.contractDiscount}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.otherIncome}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.actualRevenue}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.debit}
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
                            <div className="mb-5 text-2xl text-gray-700">
                                <label>Báo cáo cuối ngày</label>
                            </div>

                            {/* Kiểu hiển thị */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <Button type="primary" className="w-full">
                                    <FileExcelOutlined className="ml-2" />
                                    Xuất tất cả
                                </Button>
                            </div>

                            {/* Kiểu hiển thị */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block font-bold mb-2">Kiểu hiển thị</label>
                                <Radio.Group defaultValue="all">
                                    <Radio value="" className="block mb-2">
                                        Báo cáo
                                    </Radio>
                                </Radio.Group>
                            </div>

                            {/* Mối quan tâm */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block font-bold mb-2">Mối quan tâm</label>
                                <Radio.Group defaultValue="all">
                                    <Radio value="a" className="block mb-2">
                                        Bán hàng
                                    </Radio>
                                    <Radio value="b" className="block mb-2">
                                        Thu chi
                                    </Radio>
                                    <Radio value="c" className="block mb-2">
                                        Hàng hóa
                                    </Radio>
                                    <Radio value="d" className="block mb-2">
                                        Tổng hợp
                                    </Radio>
                                </Radio.Group>
                            </div>

                            {/* Thời gian */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block font-bold mb-2">Thời gian</label>
                                <Radio.Group defaultValue="Thời gian">
                                    <Radio value="time" className="block mb-2">
                                        <Popover>
                                            <DatePicker placeholder="Chọn ngày" style={{ width: 190 }} />
                                        </Popover>
                                    </Radio>
                                    <div className="flex mt-2 mb-2 gap-2 ml-5">
                                        <TimePicker
                                            placeholder="Từ"
                                            style={{ width: 93 }}
                                            open={openFrom}
                                            onOpenChange={setOpenFrom}
                                        />
                                        <TimePicker
                                            placeholder="Đến"
                                            style={{ width: 92 }}
                                            open={openTo}
                                            onOpenChange={setOpenTo}
                                        />
                                    </div>
                                    <Radio value="Lựa chọn khác" className="block mb-2">
                                        <RangePicker
                                            style={{ width: 190 }}
                                            onChange={onChange}
                                            needConfirm
                                            placeholder="Lựa chọn khác"
                                        />
                                    </Radio>
                                </Radio.Group>
                            </div>

                            {/* Khách hàng */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block font-bold mb-2">khách hàng</label>
                                <InputField placeholder="Theo mã, tên, điện thoại" />
                            </div>

                            {/* Thu ngân */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block font-bold mb-2">Thu ngân</label>
                                <Space wrap>
                                    <Select
                                        defaultValue="Chọn thu ngân"
                                        style={{
                                            width: 200,
                                            color: "gray",
                                        }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                value: "Chưa xác định",
                                                label: "Chưa xác định",
                                            },
                                        ]}
                                    />
                                </Space>
                            </div>

                            {/* Tạo tài khoản */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block font-bold mb-2">Tạo tài khoản</label>
                                <Space wrap>
                                    <Select
                                        defaultValue="Chọn tài khoản tạo"
                                        style={{
                                            width: 200,
                                            color: "gray",
                                        }}
                                        onChange={handleChange}
                                        options={[
                                            { value: "Nguyễn Văn A", label: "Nguyễn Văn A" },
                                            { value: "Lê Văn B", label: "Lê Văn B" },
                                            { value: "Đoàn Mạnh C", label: "Đoàn Mạnh C" },
                                        ]}
                                    />
                                </Space>
                            </div>

                            {/* Phương thức thanh toán */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block font-bold mb-2">Phương thức thanh toán</label>
                                <Space wrap>
                                    <Select
                                        defaultValue="Chọn phương thức thanh toán"
                                        style={{
                                            width: 200,
                                            color: "gray",
                                        }}
                                        onChange={handleChange}
                                        options={[
                                            { value: "Tiền mặt", label: "Tiền mặt" },
                                            { value: "Thẻ", label: "Thẻ" },
                                            { value: "Chuyển khoản", label: "Chuyển khoản" },
                                            { value: "Ví điện tử", label: "Ví điện tử" },
                                            { value: "Voucher", label: "Voucher" },
                                        ]}
                                    />
                                </Space>
                            </div>
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
                        <Sider
                            width={300}
                            theme="light"
                            className="bg-gray p-4 h-[800px] overflow-y-scroll md:hidden block "
                        >
                            <div className="mb-5 text-2xl text-gray-700">
                                <label>Báo cáo cuối ngày</label>
                            </div>

                            {/* Kiểu hiển thị */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <Button type="primary" className="w-full">
                                    <FileExcelOutlined className="ml-2" />
                                    Xuất tất cả
                                </Button>
                            </div>

                            {/* Kiểu hiển thị */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block font-bold mb-2">Kiểu hiển thị</label>
                                <Radio.Group defaultValue="all">
                                    <Radio value="" className="block mb-2">
                                        Báo cáo
                                    </Radio>
                                </Radio.Group>
                            </div>

                            {/* Mối quan tâm */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block font-bold mb-2">Mối quan tâm</label>
                                <Radio.Group defaultValue="all">
                                    <Radio value="a" className="block mb-2">
                                        Bán hàng
                                    </Radio>
                                    <Radio value="b" className="block mb-2">
                                        Thu chi
                                    </Radio>
                                    <Radio value="c" className="block mb-2">
                                        Hàng hóa
                                    </Radio>
                                    <Radio value="d" className="block mb-2">
                                        Tổng hợp
                                    </Radio>
                                </Radio.Group>
                            </div>

                            {/* Thời gian */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block font-bold mb-2">Thời gian</label>
                                <Radio.Group defaultValue="Thời gian">
                                    <Radio value="time" className="block mb-2">
                                        <Popover>
                                            <DatePicker />
                                        </Popover>
                                    </Radio>
                                    <div className="flex mt-2 mb-2 gap-2 ml-5">
                                        <TimePicker
                                            placeholder="Từ"
                                            style={{ width: 80 }}
                                            open={openFrom}
                                            onOpenChange={setOpenFrom}
                                        />
                                        <TimePicker
                                            placeholder="Đến"
                                            style={{ width: 80 }}
                                            open={openTo}
                                            onOpenChange={setOpenTo}
                                        />
                                    </div>
                                    <Radio value="Lựa chọn khác" className="block mb-2">
                                        <RangePicker
                                            style={{ width: 190 }}
                                            onChange={onChange}
                                            needConfirm
                                            placeholder="Lựa chọn khác"
                                        />
                                    </Radio>
                                </Radio.Group>
                            </div>

                            {/* Khách hàng */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block font-bold mb-2">khách hàng</label>
                                <InputField placeholder="Theo mã, tên, điện thoại" />
                            </div>

                            {/* Thu ngân */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block font-bold mb-2">Thu ngân</label>
                                <Space wrap>
                                    <Select
                                        defaultValue="Chọn thu ngân"
                                        style={{
                                            width: 200,
                                            color: "gray",
                                        }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                value: "Chưa xác định",
                                                label: "Chưa xác định",
                                            },
                                        ]}
                                    />
                                </Space>
                            </div>

                            {/* Tạo tài khoản */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block font-bold mb-2">Tạo tài khoản</label>
                                <Space wrap>
                                    <Select
                                        defaultValue="Chọn tài khoản tạo"
                                        style={{
                                            width: 200,
                                            color: "gray",
                                        }}
                                        onChange={handleChange}
                                        options={[
                                            { value: "Nguyễn Văn A", label: "Nguyễn Văn A" },
                                            { value: "Lê Văn B", label: "Lê Văn B" },
                                            { value: "Đoàn Mạnh C", label: "Đoàn Mạnh C" },
                                        ]}
                                    />
                                </Space>
                            </div>

                            {/* Phương thức thanh toán */}
                            <div className="mb-4 p-4 bg-white rounded-lg shadow">
                                <label className="block font-bold mb-2">Phương thức thanh toán</label>
                                <Space wrap>
                                    <Select
                                        defaultValue="Chọn phương thức thanh toán"
                                        style={{
                                            width: 200,
                                            color: "gray",
                                        }}
                                        onChange={handleChange}
                                        options={[
                                            { value: "Tiền mặt", label: "Tiền mặt" },
                                            { value: "Thẻ", label: "Thẻ" },
                                            { value: "Chuyển khoản", label: "Chuyển khoản" },
                                            { value: "Ví điện tử", label: "Ví điện tử" },
                                            { value: "Voucher", label: "Voucher" },
                                        ]}
                                    />
                                </Space>
                            </div>
                        </Sider>
                    </Drawer>

                    {/* Main Content */}
                    <Content className="p-6 bg-white" style={{ border: "18px solid #999999" }}>
                        <div className=" mb-4 gap-3">
                            <div className="lg:hidden block p-2">
                                <Button icon={<MenuOutlined />} onClick={showDrawer} />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <h2 className="text-lg font-bold text-center">Báo cáo cuối ngày về bán hàng</h2>
                                <label className="mb-2">Ngày bán: {formattedDate}</label>
                                <label className="mb-4">Chi nhánh: Chi nhánh trung tâm</label>
                            </div>
                        </div>

                        {/* TAB BUTTONS */}

                        {/* MODAL */}
                        <>
                            <div className="overflow-x-auto">
                                <Table
                                    scroll={{ x: "max-content" }}
                                    pagination={{ pageSize: 10 }}
                                    columns={columnsCombined}
                                    dataSource={combinedData}
                                    expandedRowRender={expandedRowRenderLevelService} // Nếu cần mở rộng hàng
                                    expandedRowKeys={expandedRowKeysService}
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
                        </>
                        {/* Table */}
                    </Content>
                </Layout>
            </Layout>
            {/* TOP HEADER */}
        </div>
    );
};

export default Report;
