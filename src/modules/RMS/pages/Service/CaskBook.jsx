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
import ReceiptForm from "./ReceiptForm.jsx";
import ModalComp from "../../common/ModalComp";
import { faker } from "@faker-js/faker";

const CashBook = () => {
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
    const [isModalOpenReceipt, setIsModalOpenReceipt] = useState(false);
    const showModalReceipt = () => {
        setIsModalOpenReceipt(true);
    };
    const handleOkReceipt = () => {
        setIsModalOpenReceipt(false);
    };
    const handleCancelReceipt = () => {
        setIsModalOpenReceipt(false);
    };

    const [isModalOpenSpendingSlip, setIsModalOpenSpendingSlip] = useState(false);
    const showModalSpendingSlip = () => {
        setIsModalOpenSpendingSlip(true);
    };
    const handleOkSpendingSlip = () => {
        setIsModalOpenSpendingSlip(false);
    };
    const handleCancelSpendingSlip = () => {
        setIsModalOpenSpendingSlip(false);
    };

    useEffect(() => {
        const initialCheckedItems = {
            couponCode: true, // Mặc định là checked
            time: true,
            roomName: true,
            depositAccount: true,
            expenditure: true,
            value: true,
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

    // data Bill
    const dataCashBook = Array.from({ length: 10 }, (_, index) => {
        const suffixOptions = ["PN", "HD"];
        const suffix = suffixOptions[Math.floor(Math.random() * suffixOptions.length)];

        return {
            key: `Lv${index + 1}`,
            couponCode: `TT${suffix}${faker.number.int({ min: 100000, max: 999999 })}`,
            imageUrl: "/assets/img/no-picture.png",
            time: faker.date.past().toLocaleString(),
            roomName: `P.${faker.number.int({ min: 101, max: 999 })}`,
            depositAccount: Math.random() < 0.5 ? "Chi tiền trả NCC" : "Thu tiền khách trả",
            expenditure: faker.finance.amount(100000, 100000, 0),
            value: faker.finance.amount(100000, 500000, 0),
        };
    });

    //#endregion

    // Gộp data
    const combinedData = [
        ...dataCashBook.map((item) => ({ ...item, type: "receipt" })),
        // ...dataGoods.map((item) => ({ ...item, type: "goods" })),
    ];

    //#region column tổng hợp table
    const columnsCombined = [
        {
            title: "Mã phiếu",
            dataIndex: "couponCode",
            key: "couponCode",
            render: (text) => <p className="!text-left">{text}</p>,
            width: "11%",
        },
        {
            title: "Tên phòng",
            dataIndex: "roomName",
            key: "roomName",
            align: "center",
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
            title: "Loại thu chi",
            dataIndex: "expenditure",
            key: "expenditure",
            align: "center",
            render: (text) => <span>{text ?? "---"}</span>,
        },
        {
            title: "Người/Tài khoản nộp/nhận",
            dataIndex: "depositAccount",
            key: "depositAccount",
            align: "center",
            responsive: ["lg"],
            render: (text) => <span>{text ?? "---"}</span>,
        },
        {
            title: "Giá trị",
            dataIndex: "value",
            key: "value",
            align: "center",
            responsive: ["lg"],
            render: (text) => <span>{text ?? "---"}</span>,
        },
    ].filter((col) => checkedItems[col.dataIndex]); // Chỉ hiển thị các cột có trạng thái checked

    //#endregion

    const content = (
        <div>
            <div>
                <Checkbox name="couponCode" checked={checkedItems.couponCode} onChange={handleCheckboxChange}>
                    Mã phiếu
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
                <Checkbox name="depositAccount" checked={checkedItems.depositAccount} onChange={handleCheckboxChange}>
                    Người/Tài khoản nộp/nhận
                </Checkbox>
            </div>
            <div>
                <Checkbox name="expenditure" checked={checkedItems.expenditure} onChange={handleCheckboxChange}>
                    Loại thu chi
                </Checkbox>
            </div>
            <div>
                <Checkbox name="value" checked={checkedItems.value} onChange={handleCheckboxChange}>
                    Giá trị
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
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Mã phiếu:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Tên phòng:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Thời gian:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Loại thu chi:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">
                                            Người/Tài khoản nộp/nhận:
                                        </td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Giá trị:</td>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.couponCode}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.time}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.roomName}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.depositAccount}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.expenditure}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.value}
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
                        {/* Chọn loại quỹ */}
                        <div className="bg-white rounded-lg shadow mb-4">
                            <Radio.Group defaultValue="cash" className="ml-4 mt-3">
                                <Radio value="cash" className="block mb-2">
                                    Tiền mặt
                                </Radio>
                                <Radio value="bank" className="block mb-2">
                                    Ngân hàng
                                </Radio>
                                <Radio value="e-wallet" className="block mb-2">
                                    Ví điện tử
                                </Radio>
                                <Radio value="totalFund" className="block mb-2">
                                    Tổng quỹ
                                </Radio>
                            </Radio.Group>
                        </div>

                        {/* Loại hàng */}
                        <Collapse ghost defaultActiveKey={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]}>
                            {/* Tìm kiếm */}
                            <Panel header="Tìm kiếm" key="2" className="bg-white rounded-lg shadow mb-4">
                                <InputField placeholder="Theo mã phiếu" className="mb-2" />
                                <InputField placeholder="Ghi chú" className="mb-2" />
                            </Panel>

                            {/* Trạng thái */}
                            <Panel header="Trạng thái" key="3" className="bg-white rounded-lg shadow mb-4">
                                <Radio.Group defaultValue="all">
                                    <Radio value="complete" className="block mb-2">
                                        Đã thanh toán
                                    </Radio>
                                    <Radio value="cancel" className="block mb-2">
                                        Đã hủy
                                    </Radio>
                                </Radio.Group>
                            </Panel>

                            {/* Thời gian */}
                            <Panel header="Thời gian" key="4" className="bg-white rounded-lg shadow mb-4">
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
                                                value: "P.210",
                                                label: "P.210",
                                            },
                                            {
                                                value: "P.301",
                                                label: "P.301",
                                            },
                                            {
                                                value: "P.111",
                                                label: "P.111",
                                            },
                                            {
                                                value: "P.123",
                                                label: "P.123",
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

                            {/* Tạo tài khoản */}
                            <Panel header="Chọn tài khoản" key="7" className="bg-white rounded-lg shadow mb-4">
                                <Space wrap>
                                    <Select
                                        defaultValue="Chọn tài khoản"
                                        style={{
                                            width: 200,
                                            color: "gray",
                                        }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                value: "Minh Long",
                                                label: "Minh Long",
                                            },
                                            {
                                                value: "Lê Hùng",
                                                label: "Lê Hùng",
                                            },
                                            {
                                                value: "Xuân Mai",
                                                label: "Xuân Mai",
                                            },
                                        ]}
                                    />
                                </Space>
                            </Panel>

                            {/* Người nộp/nhận */}
                            <Panel header="Người nộp/nhận" key="8" className="bg-white rounded-lg shadow mb-4">
                                <div className="flex ">
                                    <Space wrap>
                                        <Select
                                            defaultValue="Tất cả"
                                            style={{
                                                width: 200,
                                                color: "gray",
                                            }}
                                            onChange={handleChange}
                                            options={[
                                                {
                                                    value: "Tất cả",
                                                    label: "Tất cả",
                                                },
                                                {
                                                    value: "Khách hàng",
                                                    label: "Khách hàng",
                                                },
                                                {
                                                    value: "Nhà cung cấp",
                                                    label: "Nhà cung cấp",
                                                },
                                                {
                                                    value: "Nhân viên",
                                                    label: "Nhân viên",
                                                },
                                                {
                                                    value: "Khác",
                                                    label: "Khác",
                                                },
                                            ]}
                                        />
                                    </Space>
                                </div>
                                <InputField placeholder="Tên người nộp/nhận" />
                                <InputField placeholder="Điện thoại" />
                            </Panel>

                            {/* Loại thu chi */}
                            <Panel header="Loại thu chi" key="9" className="bg-white rounded-lg shadow mb-4">
                                <div className="flex ">
                                    <Space wrap>
                                        <Select
                                            defaultValue="Loại thu chi"
                                            style={{
                                                width: 200,
                                                color: "gray",
                                            }}
                                            onChange={handleChange}
                                            options={[
                                                {
                                                    value: "Thu chi khác",
                                                    label: "Thu chi khác",
                                                },
                                                {
                                                    value: "Tiền hàng",
                                                    label: "Tiền hàng",
                                                },
                                                {
                                                    value: "Thu giao dịch TT mã QR",
                                                    label: "Thu giao dịch TT mã QR",
                                                },
                                                {
                                                    value: "Gửi tiền vào ngân hàng",
                                                    label: "Rút tiền từ ngân hàng",
                                                },
                                                {
                                                    value: "Chuyển tiền giữa 2 ngân hàng",
                                                    label: "Chuyển tiền giữa 2 ngân hàng",
                                                },
                                            ]}
                                        />
                                    </Space>
                                </div>
                            </Panel>

                            {/* Loại chứng từ */}
                            <Panel header="Loại chứng từ" key="10" className="bg-white rounded-lg shadow mb-4">
                                <Radio.Group defaultValue="all">
                                    <Radio value="complete" className="block mb-2">
                                        Phiếu thu
                                    </Radio>
                                    <Radio value="cancel" className="block mb-2">
                                        Phiếu chi
                                    </Radio>
                                </Radio.Group>
                            </Panel>

                            {/* Kết quả kinh doanh */}
                            <Panel header="Kết quả kinh doanh" key="11" className="bg-white rounded-lg shadow mb-4">
                                <Radio.Group defaultValue="all">
                                    <Radio value="complete" className="block mb-2">
                                        Đưa vào hạch toán
                                    </Radio>
                                    <Radio value="cancel" className="block mb-2">
                                        Không hạch toán
                                    </Radio>
                                    <Radio value="cancel" className="block mb-2">
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
                        <Sider width={300} theme="light" className="bg-gray p-4 md:hidden block ">
                            {/* Chọn loại quỹ */}
                            <div className="bg-white rounded-lg shadow mb-4">
                                <Radio.Group defaultValue="cash" className="ml-4 mt-3">
                                    <Radio value="cash" className="block mb-2">
                                        Tiền mặt
                                    </Radio>
                                    <Radio value="bank" className="block mb-2">
                                        Ngân hàng
                                    </Radio>
                                    <Radio value="e-wallet" className="block mb-2">
                                        Ví điện tử
                                    </Radio>
                                    <Radio value="totalFund" className="block mb-2">
                                        Tổng quỹ
                                    </Radio>
                                </Radio.Group>
                            </div>

                            {/* Loại hàng */}
                            <Collapse
                                ghost
                                defaultActiveKey={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]}
                            >
                                {/* Tìm kiếm */}
                                <Panel header="Tìm kiếm" key="2" className="bg-white rounded-lg shadow mb-4">
                                    <InputField placeholder="Theo mã phiếu" className="mb-2" />
                                    <InputField placeholder="Ghi chú" className="mb-2" />
                                </Panel>

                                {/* Trạng thái */}
                                <Panel header="Trạng thái" key="3" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="all">
                                        <Radio value="complete" className="block mb-2">
                                            Đã thanh toán
                                        </Radio>
                                        <Radio value="cancel" className="block mb-2">
                                            Đã hủy
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Thời gian */}
                                <Panel header="Thời gian" key="4" className="bg-white rounded-lg shadow mb-4">
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
                                                    value: "P.210",
                                                    label: "P.210",
                                                },
                                                {
                                                    value: "P.301",
                                                    label: "P.301",
                                                },
                                                {
                                                    value: "P.111",
                                                    label: "P.111",
                                                },
                                                {
                                                    value: "P.123",
                                                    label: "P.123",
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

                                {/* Tạo tài khoản */}
                                <Panel header="Chọn tài khoản" key="7" className="bg-white rounded-lg shadow mb-4">
                                    <Space wrap>
                                        <Select
                                            defaultValue="Chọn tài khoản"
                                            style={{
                                                width: 200,
                                                color: "gray",
                                            }}
                                            onChange={handleChange}
                                            options={[
                                                {
                                                    value: "Minh Long",
                                                    label: "Minh Long",
                                                },
                                                {
                                                    value: "Lê Hùng",
                                                    label: "Lê Hùng",
                                                },
                                                {
                                                    value: "Xuân Mai",
                                                    label: "Xuân Mai",
                                                },
                                            ]}
                                        />
                                    </Space>
                                </Panel>

                                {/* Người nộp/nhận */}
                                <Panel header="Người nộp/nhận" key="8" className="bg-white rounded-lg shadow mb-4">
                                    <div className="flex ">
                                        <Space wrap>
                                            <Select
                                                defaultValue="Tất cả"
                                                style={{
                                                    width: 200,
                                                    color: "gray",
                                                }}
                                                onChange={handleChange}
                                                options={[
                                                    {
                                                        value: "Tất cả",
                                                        label: "Tất cả",
                                                    },
                                                    {
                                                        value: "Khách hàng",
                                                        label: "Khách hàng",
                                                    },
                                                    {
                                                        value: "Nhà cung cấp",
                                                        label: "Nhà cung cấp",
                                                    },
                                                    {
                                                        value: "Nhân viên",
                                                        label: "Nhân viên",
                                                    },
                                                    {
                                                        value: "Khác",
                                                        label: "Khác",
                                                    },
                                                ]}
                                            />
                                        </Space>
                                    </div>
                                    <InputField placeholder="Tên người nộp/nhận" />
                                    <InputField placeholder="Điện thoại" />
                                </Panel>

                                {/* Loại thu chi */}
                                <Panel header="Loại thu chi" key="9" className="bg-white rounded-lg shadow mb-4">
                                    <div className="flex ">
                                        <Space wrap>
                                            <Select
                                                defaultValue="Loại thu chi"
                                                style={{
                                                    width: 200,
                                                    color: "gray",
                                                }}
                                                onChange={handleChange}
                                                options={[
                                                    {
                                                        value: "Thu chi khác",
                                                        label: "Thu chi khác",
                                                    },
                                                    {
                                                        value: "Tiền hàng",
                                                        label: "Tiền hàng",
                                                    },
                                                    {
                                                        value: "Thu giao dịch TT mã QR",
                                                        label: "Thu giao dịch TT mã QR",
                                                    },
                                                    {
                                                        value: "Gửi tiền vào ngân hàng",
                                                        label: "Rút tiền từ ngân hàng",
                                                    },
                                                    {
                                                        value: "Chuyển tiền giữa 2 ngân hàng",
                                                        label: "Chuyển tiền giữa 2 ngân hàng",
                                                    },
                                                ]}
                                            />
                                        </Space>
                                    </div>
                                </Panel>

                                {/* Loại chứng từ */}
                                <Panel header="Loại chứng từ" key="10" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="all">
                                        <Radio value="complete" className="block mb-2">
                                            Phiếu thu
                                        </Radio>
                                        <Radio value="cancel" className="block mb-2">
                                            Phiếu chi
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Kết quả kinh doanh */}
                                <Panel header="Kết quả kinh doanh" key="11" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="all">
                                        <Radio value="complete" className="block mb-2">
                                            Đưa vào hạch toán
                                        </Radio>
                                        <Radio value="cancel" className="block mb-2">
                                            Không hạch toán
                                        </Radio>
                                        <Radio value="cancel" className="block mb-2">
                                            Tất cả
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
                                <h1 className="text-lg font-bold text-gray-700">Số quỹ tiền mặt</h1>
                            </div>
                            <div className="flex gap-5">
                                <div>
                                    <Button onClick={showModalReceipt} type="primary">
                                        <PlusOutlined className="ml-2" />
                                        Lập phiếu thu
                                    </Button>
                                    <Modal
                                        className="custom-modal"
                                        title="Lập phiếu thu (tiền mặt)"
                                        width={1000}
                                        footer={null}
                                        open={isModalOpenReceipt}
                                        onOk={handleOkReceipt}
                                        onCancel={handleCancelReceipt}
                                    >
                                        <ReceiptForm />
                                    </Modal>
                                </div>

                                <div>
                                    <Button onClick={showModalSpendingSlip} type="primary">
                                        <PlusOutlined className="ml-2" />
                                        Lập phiếu chi
                                    </Button>
                                    <Modal
                                        className="custom-modal"
                                        title="Lập phiếu chi (tiền mặt)"
                                        width={1000}
                                        footer={null}
                                        open={isModalOpenSpendingSlip}
                                        onOk={handleOkSpendingSlip}
                                        onCancel={handleCancelSpendingSlip}
                                    >
                                        <ReceiptForm />
                                    </Modal>
                                </div>

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

                        {/* Tổng quỹ */}
                        <div className=" md:flex-row flex-col">
                            <ul className="grid grid-cols-2 md:flex md:justify-end bg-white border border-gray-200 p-3 mb-2 mr-3 gap-4 md:gap-20">
                                <li className="flex flex-col items-end">
                                    <h3> Quỹ đầu kì </h3>
                                    <h3 className="text-teal-700"> 121.345.11 </h3>
                                </li>
                                <li className="flex flex-col items-end">
                                    <h3> Tổng thu </h3>
                                    <h3 className="text-blue-800"> 110.345.11 </h3>
                                </li>
                                <li className="flex flex-col items-end">
                                    <h3> Tổng chi </h3>
                                    <h3 className="text-red-600"> -68.345.11 </h3>
                                </li>
                                <li className="flex flex-col items-end">
                                    <h3> Tổng quỹ </h3>
                                    <h3 className="text-green-600"> 336.345.11 </h3>
                                </li>
                            </ul>
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
        </div>
    );
};

export default CashBook;
