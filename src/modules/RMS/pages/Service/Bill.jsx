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

const Bill = () => {
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
            billCode: true, // Mặc định là checked
            time: true,
            roomName: true,
            customer: true,
            totalAmount: true,
            discount: true,
            totalAfterDiscount: true,
            customerPaid: true,
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
    const dataBill = Array.from({ length: 10 }, (_, index) => ({
        key: `Lv${index + 1}`,
        billCode: `HD${faker.number.int({ min: 100000, max: 999999 })}`,
        imageUrl: "/assets/img/no-picture.png",
        time: faker.date.past().toLocaleString(),
        roomName: `P.${faker.number.int({ min: 101, max: 999 })}`,
        customer: faker.name.fullName(),
        phone: faker.phone.number("0#########"),
        totalAmount: faker.finance.amount(100000, 100000, 0),
        discount: faker.finance.amount(0),
        totalAfterDiscount: faker.finance.amount(100000, 500000, 0),
        customerPaid: faker.finance.amount(100000, 500000, 0),
    }));
    //#endregion

    // Gộp data
    const combinedData = [
        ...dataBill.map((item) => ({ ...item, type: "service" })),
        // ...dataGoods.map((item) => ({ ...item, type: "goods" })),
    ];

    //#region column tổng hợp table
    const columnsCombined = [
        {
            title: "Mã hóa đơn",
            dataIndex: "billCode",
            key: "billCode",
            render: (text) => <p className="!text-left">{text}</p>,
            width: "11%",
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
            title: "Giảm giá",
            dataIndex: "discount",
            key: "discount",
            align: "center",
            responsive: ["lg"],
            render: (text) => <span>{text ?? "---"}</span>,
        },
        {
            title: "Tổng sau giảm giá",
            dataIndex: "totalAfterDiscount",
            key: "totalAfterDiscount",
            align: "center",
            responsive: ["lg"],
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
    ].filter((col) => checkedItems[col.dataIndex]); // Chỉ hiển thị các cột có trạng thái checked

    //#endregion

    const content = (
        <div>
            <div>
                <Checkbox name="billCode" checked={checkedItems.billCode} onChange={handleCheckboxChange}>
                    Mã hóa đơn
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
                <Checkbox name="discount" checked={checkedItems.discount} onChange={handleCheckboxChange}>
                    Giảm giá
                </Checkbox>
            </div>
            <div>
                <Checkbox
                    name="totalAfterDiscount"
                    checked={checkedItems.totalAfterDiscount}
                    onChange={handleCheckboxChange}
                >
                    Tổng sau giảm giá
                </Checkbox>
            </div>
            <div>
                <Checkbox name="customerPaid" checked={checkedItems.customerPaid} onChange={handleCheckboxChange}>
                    Khách đã trả
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
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Mã hóa đơn:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Thời gian:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Tên phòng:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Khách hàng:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Tổng tiền hàng:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Giảm giá:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Tổng sau giảm giá:</td>
                                        <td className="  border-b-[1px] pb-2 !border-gray-300">Khách đã trả:</td>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.billCode}
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
                                            {record.discount}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.totalAfterDiscount}
                                        </td>
                                        <td className="font-semibold  border-b-[1px] pb-2 !border-gray-300">
                                            {record.customerPaid}
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
                        <Collapse ghost defaultActiveKey={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}>
                            {/* Tìm kiếm */}
                            <Panel header="Tìm kiếm" key="1" className="bg-white rounded-lg shadow mb-4">
                                <InputField placeholder="Theo mã hóa đơn" className="mb-2" />
                                <InputField placeholder="Theo mã, tên hàng" className="mb-2" />
                                <InputField placeholder="Theo mã, tên, điện thoại KH" className="mb-2" />
                                <InputField placeholder="Mã vận đơn" className="mb-2" />
                                <InputField placeholder="Theo tài khoản tạo" className="mb-2" />
                                <InputField placeholder="Theo thu ngân" className="mb-2" />
                                <InputField placeholder="Theo ghi chú" className="mb-2" />
                            </Panel>

                            {/* Chi nhánh */}
                            <Panel header="Chi nhánh" key="2" className="bg-white rounded-lg shadow mb-4">
                                <Space wrap>
                                    <Select
                                        defaultValue="Chi nhánh trung tâm"
                                        style={{
                                            width: 200,
                                            color: "gray",
                                        }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                value: "Chi nhánh trung tâm",
                                                label: "Chi nhánh trung tâm",
                                            },
                                        ]}
                                    />
                                </Space>
                            </Panel>

                            {/* Thời gian */}
                            <Panel header="Thời gian" key="3" className="bg-white rounded-lg shadow mb-4">
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
                            {/* <Panel
                      header="Trạng thái"
                      key="4"
                      className="bg-white rounded-lg shadow mb-4"
                    >
                      <Radio.Group defaultValue="all">
                        <Radio value="complete" className="block mb-2">
                          Đã hoàn thành
                        </Radio>
                        <Radio value="cancel" className="block mb-2">
                          Đã hủy
                        </Radio>
                      </Radio.Group>
                    </Panel> */}

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

                            {/* Phương thức */}
                            <Panel header="Phương thức" key="7" className="bg-white rounded-lg shadow mb-4">
                                <Radio.Group defaultValue="all">
                                    <Radio value="cash" className="block mb-2">
                                        Tiền mặt
                                    </Radio>
                                    <Radio value="card" className="block mb-2">
                                        Thẻ
                                    </Radio>
                                    <Radio value="transfer" className="block mb-2">
                                        Chuyển khoản
                                    </Radio>
                                    <Radio value="e-wallet" className="block mb-2">
                                        Ví điệnh tử
                                    </Radio>
                                    <Radio value="voucher" className="block mb-2">
                                        Voucher
                                    </Radio>
                                </Radio.Group>
                            </Panel>

                            {/* Bảng giá */}
                            {/* <Panel
                      header="Bảng giá"
                      key="8"
                      className="bg-white rounded-lg shadow mb-4"
                    >
                      <Space wrap>
                        <Select
                          defaultValue="Chọn bảng giá"
                          style={{
                            width: 200,
                            color: "gray"
                          }}
                          onChange={handleChange}
                          options={[
                            {
                              value: 'Bảng giá chung',
                              label: 'Bảng giá chung'
                            },
                          ]}
                        />
                        </Space>       
                    </Panel> */}

                            {/* Loại thu khác */}
                            {/* <Panel
                      header="Chọn loại thu khác"
                      key="9"
                      className="bg-white rounded-lg shadow mb-4"
                    >
                      <Space wrap>
                        <Select
                          defaultValue="Chọn bảng giá"
                          style={{
                            width: 200,
                            color: "gray"
                          }}
                          onChange={handleChange}
                          options={[
                            {
                              value: '',
                              label: ''
                            },
                          ]}
                        />
                        </Space>       
                    </Panel> */}
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
                                    <InputField placeholder="Theo mã hóa đơn" className="mb-2" />
                                    <InputField placeholder="Theo mã, tên hàng" className="mb-2" />
                                    <InputField placeholder="Theo mã, tên, điện thoại KH" className="mb-2" />
                                    <InputField placeholder="Mã vận đơn" className="mb-2" />
                                    <InputField placeholder="Theo tài khoản tạo" className="mb-2" />
                                    <InputField placeholder="Theo thu ngân" className="mb-2" />
                                    <InputField placeholder="Theo ghi chú" className="mb-2" />
                                </Panel>

                                {/* Chi nhánh */}
                                <Panel header="Chi nhánh" key="2" className="bg-white rounded-lg shadow mb-4">
                                    <Space wrap>
                                        <Select
                                            defaultValue="Chi nhánh trung tâm"
                                            style={{
                                                width: 200,
                                                color: "gray",
                                            }}
                                            onChange={handleChange}
                                            options={[
                                                {
                                                    value: "Chi nhánh trung tâm",
                                                    label: "Chi nhánh trung tâm",
                                                },
                                            ]}
                                        />
                                    </Space>
                                </Panel>

                                {/* Thời gian */}
                                <Panel header="Thời gian" key="3" className="bg-white rounded-lg shadow mb-4">
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
                                <Panel header="Trạng thái" key="4" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="all">
                                        <Radio value="complete" className="block mb-2">
                                            Đã hoàn thành
                                        </Radio>
                                        <Radio value="cancel" className="block mb-2">
                                            Đã hủy
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

                                {/* Phương thức */}
                                <Panel header="Phường thức" key="7" className="bg-white rounded-lg shadow mb-4">
                                    <Radio.Group defaultValue="all">
                                        <Radio value="cash" className="block mb-2">
                                            Tiền mặt
                                        </Radio>
                                        <Radio value="card" className="block mb-2">
                                            Thẻ
                                        </Radio>
                                        <Radio value="transfer" className="block mb-2">
                                            Chuyển khoản
                                        </Radio>
                                        <Radio value="e-wallet" className="block mb-2">
                                            Ví điệnh tử
                                        </Radio>
                                        <Radio value="voucher" className="block mb-2">
                                            Voucher
                                        </Radio>
                                    </Radio.Group>
                                </Panel>

                                {/* Bảng giá */}
                                <Panel header="Bảng giá" key="8" className="bg-white rounded-lg shadow mb-4">
                                    <Space wrap>
                                        <Select
                                            defaultValue="Chọn bảng giá"
                                            style={{
                                                width: 200,
                                                color: "gray",
                                            }}
                                            onChange={handleChange}
                                            options={[
                                                {
                                                    value: "Bảng giá chung",
                                                    label: "Bảng giá chung",
                                                },
                                            ]}
                                        />
                                    </Space>
                                </Panel>

                                {/* Loại thu khác */}
                                <Panel header="Chọn loại thu khác" key="9" className="bg-white rounded-lg shadow mb-4">
                                    <Space wrap>
                                        <Select
                                            defaultValue="Chọn bảng giá"
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
                                <h3 className="text-lg font-bold text-gray-700">Hóa đơn</h3>
                            </div>
                            <div className="flex gap-5">
                                <Button onClick={showModalCustomer} type="primary">
                                    <PlusOutlined className="ml-2" />
                                    Tạo hóa đơn
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

export default Bill;
