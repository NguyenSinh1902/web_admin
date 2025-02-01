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
    Dropdown,
    Menu,
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
    FileExcelOutlined,
    CaretDownFilled,
} from "@ant-design/icons";
import InputField from "../../common/InputField";
import CustomerForm from "../../common/CustomerForm";
import { faker } from "@faker-js/faker";

const Booking = () => {
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

    const [checkedItems, setCheckedItems] = useState({});
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

    useEffect(() => {
        const initialCheckedItems = {
            bookingCode: true, // Mặc định là checked
            time: true,
            status: true,
            roomName: true,
            customer: true,
            totalAmount: true,
            customerPaid: true,
            needPay: true,
        };

        setCheckedItems(initialCheckedItems);
    }, []);

    // Lưu checkedItems vào localStorage mỗi khi nó thay đổi
    useEffect(() => {
        const newHiddenColumns = Object.keys(checkedItems).filter((column) => !checkedItems[column]);
        localStorage.setItem("hiddenColumnsBill", JSON.stringify(newHiddenColumns));
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

    // data Booking
    const dataBooking = Array.from({ length: 10 }, (_, index) => {
        const needPay = faker.finance.amount(100000, 500000, 0);
        return {
            key: `Lv${index + 1}`,
            bookingCode: `HD${faker.number.int({ min: 100000, max: 999999 })}`,
            imageUrl: "/assets/img/no-picture.png",
            status: Math.random() < 0.5 ? "đang xử lý" : "hoàn thành",
            time: faker.date.past().toLocaleString(),
            roomName: `P.${faker.number.int({ min: 101, max: 999 })}`,
            customer: faker.name.fullName(),
            totalAmount: needPay,
            customerPaid: 0,
            needPay: needPay,
        };
    });
    //#endregion

    // Gộp data
    const combinedData = [
        ...dataBooking.map((item) => ({ ...item, type: "service" })),
        // ...dataGoods.map((item) => ({ ...item, type: "goods" })),
    ];

    //#region column tổng hợp table
    const columnsCombined = [
        {
            title: "Mã đặt phòng",
            dataIndex: "bookingCode",
            key: "bookingCode",
            render: (text) => <p className="!text-left">{text}</p>,
            width: "11%",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
            responsive: ["lg"],
            render: (text) => <span>{text ?? "---"}</span>,
        },
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
            align: "center",
            responsive: ["lg"],
            render: (text) => <span>{text ?? "---"}</span>,
        },
        {
            title: "Tên phòng",
            dataIndex: "roomName",
            key: "roomName",
            align: "center",
            render: (text) => <span>{text ?? "---"}</span>,
        },
        {
            title: "Khách hàng",
            dataIndex: "customer",
            key: "customer",
            align: "center",
            responsive: ["lg"],
            render: (text) => <span>{text ?? "---"}</span>,
        },
        {
            title: "Tổng tiền hàng",
            dataIndex: "totalAmount",
            key: "totalAmount",
            align: "center",
            render: (text) => <span>{text ?? "---"}</span>,
        },
        {
            title: "Khách đã trả",
            dataIndex: "customerPaid",
            key: "customerPaid",
            align: "center",
            responsive: ["lg"],
            render: (text) => <span>{text ?? "---"}</span>,
        },
        {
            title: "Còn cần trả",
            dataIndex: "needPay",
            key: "needPay",
            align: "center",
            responsive: ["lg"],
            render: (text) => <span>{text ?? "---"}</span>,
        },
    ].filter((col) => checkedItems[col.dataIndex]); // Chỉ hiển thị các cột có trạng thái checked

    //#endregion

    const content = (
        <div>
            <div>
                <Checkbox name="bookingCode" checked={checkedItems.bookingCode} onChange={handleCheckboxChange}>
                    Mã hóa đơn
                </Checkbox>
            </div>
            <div>
                <Checkbox name="status" checked={checkedItems.status} onChange={handleCheckboxChange}>
                    Trạng thái
                </Checkbox>
            </div>
            <div>
                <Checkbox name="time" checked={checkedItems.time} onChange={handleCheckboxChange}>
                    Thời gian
                </Checkbox>
            </div>
            <div>
                <Checkbox name="roomName" checked={checkedItems.roomName} onChange={handleCheckboxChange}>
                    Tên phòng
                </Checkbox>
            </div>
            <div>
                <Checkbox name="customer" checked={checkedItems.customer} onChange={handleCheckboxChange}>
                    Khách hàng
                </Checkbox>
            </div>
            <div>
                <Checkbox name="totalAmount" checked={checkedItems.totalAmount} onChange={handleCheckboxChange}>
                    Tổng tiền hàng
                </Checkbox>
            </div>
            <div>
                <Checkbox name="customerPaid" checked={checkedItems.customerPaid} onChange={handleCheckboxChange}>
                    Khách đã trả
                </Checkbox>
            </div>
            <div>
                <Checkbox name="needPay" checked={checkedItems.needPay} onChange={handleCheckboxChange}>
                    Còn cần trả
                </Checkbox>
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
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Mã đặt phòng:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Status:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Thời gian:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Tên phòng:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Khách hàng:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Tổng tiền hàng:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Khách đã trả:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Còn cần trả:</td>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.bookingCode}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.status}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.time}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.roomName}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.customer}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.totalAmount}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.customerPaid}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.needPay}
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

    const menu = (
        <Menu>
            <Menu.Item
                key="1"
                onClick={() => {
                    //   setActive("goods");
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
                    //   setActive("service");
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

    return (
        <div className="bg-white p- rounded-md shadow-lg h-[calc(100vh-60px)]">
            <Layout className="min-h-screen bg-gray rounded-md shadow-lg">
                {/* Header */}

                <Layout className="bg-gray-100">
                    {/* Sidebar */}
                    <Sider
                        width={300}
                        theme="light"
                        className="bg-gray p-4 h-[800px] overflow-y-scroll md:block hidden"
                    >
                        {/* Loại hàng */}
                        <Collapse ghost defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
                            {/* Tìm kiếm */}
                            <Panel header="Tìm kiếm" key="1" className="bg-white rounded-lg shadow mb-4">
                                <InputField placeholder="Theo mã đặt phòng" className="mb-2" />
                                <InputField placeholder="Theo mã, tên, điện thoại KH" className="mb-2" />
                                <InputField placeholder="Theo mã kênh bán" className="mb-2" />
                            </Panel>

                            {/* Thời gian */}
                            <Panel header="Thời gian đặt" key="2" className="bg-white rounded-lg shadow mb-4">
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
                                            <Button style={{ width: "157px" }}>Chọn thời gian </Button>
                                        </Popover>
                                    </Radio>
                                    <Radio value="Lựa chọn khác" className="block mb-2">
                                        <DatePicker
                                            style={{ width: "157px" }}
                                            onChange={onChange}
                                            needConfirm
                                            placeholder="Lựa chọn khác"
                                        />
                                    </Radio>
                                </Radio.Group>
                            </Panel>

                            {/* Trạng thái */}
                            <Panel header="Trạng thái" key="3" className="bg-white rounded-lg shadow mb-4">
                                <Radio.Group defaultValue="all">
                                    <Radio value="complete" className="block mb-2">
                                        Chờ xác nhận
                                    </Radio>
                                    <Radio value="complete" className="block mb-2">
                                        Đang xử lý
                                    </Radio>
                                    <Radio value="complete" className="block mb-2">
                                        Đã hoàn thành
                                    </Radio>
                                    <Radio value="cancel" className="block mb-2">
                                        Đã hủy
                                    </Radio>
                                </Radio.Group>
                            </Panel>

                            {/* Trạng thái */}
                            <Panel header="Trạng thái thanh toán" key="4" className="bg-white rounded-lg shadow mb-4">
                                <Radio.Group defaultValue="all">
                                    <Radio value="complete" className="block mb-2">
                                        Chưa thanh toán
                                    </Radio>
                                    <Radio value="complete" className="block mb-2">
                                        Thanh toán một phần
                                    </Radio>
                                    <Radio value="complete" className="block mb-2">
                                        Đã thanh toán hết
                                    </Radio>
                                </Radio.Group>
                            </Panel>

                            {/* Phòng */}
                            <Panel header="Phòng" key="5" className="bg-white rounded-lg shadow mb-4">
                                <Space wrap>
                                    <Select
                                        defaultValue="Tìm kiếm tên phòng"
                                        style={{
                                            width: 200,
                                            color: "gray",
                                        }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                value: "Phòng 01 giường đôi cho 2 người",
                                                label: "Phòng 01 giường đôi cho 2 người",
                                            },
                                            {
                                                value: "Phòng 01 giường đơn",
                                                label: "Phòng 01 giường đơn",
                                            },
                                            {
                                                value: "Phòng 1 giường đơn và 1 giường đôi cho 3 người",
                                                label: "Phòng 1 giường đơn và 1 giường đôi cho 3 người",
                                            },
                                            {
                                                value: "Phòng 02 giường đơn",
                                                label: "Phòng 02 giường đơn",
                                            },
                                        ]}
                                    />
                                </Space>
                            </Panel>

                            {/* Kênh bán */}
                            <Panel
                                key="6"
                                className="bg-white rounded-lg shadow mb-4"
                                header={
                                    <div className="flex justify-between">
                                        <span>Kênh bán</span>
                                        <Button className="border-none">
                                            <PlusCircleOutlined />
                                        </Button>
                                    </div>
                                }
                            >
                                <div className="flex ">
                                    <Space wrap>
                                        <Select
                                            defaultValue="Chọn kênh bán"
                                            style={{
                                                width: 200,
                                                color: "gray",
                                            }}
                                            onChange={handleChange}
                                            options={[
                                                {
                                                    value: "Khách đến tực tiếp",
                                                    label: "Khách đến tực tiếp",
                                                },
                                                {
                                                    value: "Agoda",
                                                    label: "Agoda",
                                                },
                                                {
                                                    value: "Airbnb",
                                                    label: "Airbnb",
                                                },
                                                {
                                                    value: "Booking.com",
                                                    label: "Booking.com",
                                                },
                                                {
                                                    value: "Đặt phòng online",
                                                    label: "Đặt phòng online",
                                                },
                                                {
                                                    value: "Facebook",
                                                    label: "Facebook",
                                                },
                                                {
                                                    value: "Instagram",
                                                    label: "Instagram",
                                                },
                                                {
                                                    value: "Khách đặt qua điện thoại",
                                                    label: "Khách đặt qua điện thoại",
                                                },
                                                {
                                                    value: "Zalo",
                                                    label: "Zalo",
                                                },
                                                {
                                                    value: "Khác",
                                                    label: "Khác",
                                                },
                                            ]}
                                        />
                                    </Space>
                                </div>
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
                        <Sider width={300} theme="light" className="bg-gray p-4 md:hidden block ">
                            {/* Loại hàng */}
                            <Collapse ghost defaultActiveKey={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}>
                                {/* Tìm kiếm */}
                                <Panel header="Tìm kiếm" key="1" className="bg-white rounded-lg shadow mb-4">
                                    <InputField placeholder="Theo mã đặt phòng" className="mb-2" />
                                    <InputField placeholder="Theo mã, tên, điện thoại KH" className="mb-2" />
                                    <InputField placeholder="Theo mã kênh bán" className="mb-2" />
                                </Panel>

                                {/* Thời gian */}
                                <Panel header="Thời gian đặt" key="2" className="bg-white rounded-lg shadow mb-4">
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
                                            <DatePicker onChange={onChange} needConfirm placeholder="Lựa chọn khác" />
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Trạng thái */}
                                <Panel header="Trạng thái" key="3" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="all">
                                        <Radio value="complete" className="block mb-2">
                                            Chờ xác nhận
                                        </Radio>
                                        <Radio value="complete" className="block mb-2">
                                            Đang xử lý
                                        </Radio>
                                        <Radio value="complete" className="block mb-2">
                                            Đã hoàn thành
                                        </Radio>
                                        <Radio value="cancel" className="block mb-2">
                                            Đã hủy
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Trạng thái */}
                                <Panel
                                    header="Trạng thái thanh toán"
                                    key="4"
                                    className="bg-white rounded-lg shadow mb-4"
                                >
                                    <Radio.Group defaultValue="all">
                                        <Radio value="complete" className="block mb-2">
                                            Chưa thanh toán
                                        </Radio>
                                        <Radio value="complete" className="block mb-2">
                                            Thanh toán một phần
                                        </Radio>
                                        <Radio value="complete" className="block mb-2">
                                            Đã thanh toán hết
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Phòng */}
                                <Panel header="Phòng" key="5" className="bg-white rounded-lg shadow mb-4">
                                    <Space wrap>
                                        <Select
                                            defaultValue="Tìm kiếm tên phòng"
                                            style={{
                                                width: 200,
                                                color: "gray",
                                            }}
                                            onChange={handleChange}
                                            options={[
                                                {
                                                    value: "Phòng 01 giường đôi cho 2 người",
                                                    label: "Phòng 01 giường đôi cho 2 người",
                                                },
                                                {
                                                    value: "Phòng 01 giường đơn",
                                                    label: "Phòng 01 giường đơn",
                                                },
                                                {
                                                    value: "Phòng 1 giường đơn và 1 giường đôi cho 3 người",
                                                    label: "Phòng 1 giường đơn và 1 giường đôi cho 3 người",
                                                },
                                                {
                                                    value: "Phòng 02 giường đơn",
                                                    label: "Phòng 02 giường đơn",
                                                },
                                            ]}
                                        />
                                    </Space>
                                </Panel>

                                {/* Kênh bán */}
                                <Panel
                                    key="6"
                                    className="bg-white rounded-lg shadow mb-4"
                                    header={
                                        <div className="flex justify-between">
                                            <span>Kênh bán</span>
                                            <Button className="border-none">
                                                <PlusCircleOutlined />
                                            </Button>
                                        </div>
                                    }
                                >
                                    <div className="flex ">
                                        <Space wrap>
                                            <Select
                                                defaultValue="Chọn kênh bán"
                                                style={{
                                                    width: 200,
                                                    color: "gray",
                                                }}
                                                onChange={handleChange}
                                                options={[
                                                    {
                                                        value: "Khách đến tực tiếp",
                                                        label: "Khách đến tực tiếp",
                                                    },
                                                    {
                                                        value: "Agoda",
                                                        label: "Agoda",
                                                    },
                                                    {
                                                        value: "Airbnb",
                                                        label: "Airbnb",
                                                    },
                                                    {
                                                        value: "Booking.com",
                                                        label: "Booking.com",
                                                    },
                                                    {
                                                        value: "Đặt phòng online",
                                                        label: "Đặt phòng online",
                                                    },
                                                    {
                                                        value: "Facebook",
                                                        label: "Facebook",
                                                    },
                                                    {
                                                        value: "Instagram",
                                                        label: "Instagram",
                                                    },
                                                    {
                                                        value: "Khách đặt qua điện thoại",
                                                        label: "Khách đặt qua điện thoại",
                                                    },
                                                    {
                                                        value: "Zalo",
                                                        label: "Zalo",
                                                    },
                                                    {
                                                        value: "Khác",
                                                        label: "Khác",
                                                    },
                                                ]}
                                            />
                                        </Space>
                                    </div>
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
                                <h1 className="text-lg font-bold text-gray-700">Đặt phòng</h1>
                            </div>
                            <div className="flex gap-5">
                                <Button type="primary">
                                    <FileExcelOutlined className="ml-2" />
                                    Xuất file
                                </Button>

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
                <CustomerForm />
            </Modal>
            {/* end */}
        </div>
    );
};

export default Booking;
