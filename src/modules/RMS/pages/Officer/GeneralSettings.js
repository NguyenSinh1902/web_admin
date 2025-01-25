import React, { useState } from "react";
import {
    Button,
    Layout,
    Card,
    Menu,
    Progress,
    Form,
    Switch,
    Table,
    Modal,
    Input,
    Row,
    Col,
    TimePicker,
    Divider,
    DatePicker,
    Select,
} from "antd";
import {
    SettingOutlined,
    CalendarOutlined,
    UserOutlined,
    DollarOutlined,
    EditOutlined,
    DeleteOutlined,
    CloseOutlined,
    SaveOutlined,
    InfoCircleOutlined,
    ClockCircleOutlined,
    CameraOutlined,
    MobileOutlined,
    TabletOutlined,
    PlusOutlined,
    SyncOutlined,
    FileOutlined,
} from "@ant-design/icons";
import CreateOfficerForm from "../../components/Officer/CreateOfficerForm";
import SalaryForm from "../../components/Officer/SalaryForm";
import TimekeepingForm from "../../components/Officer/TimekeepingForm";
import ScheduleForm from "../../components/Officer/ScheduleForm";
import dayjs from "dayjs";
import moment from "moment";
const { Content, Sider } = Layout;

const GeneralSettings = () => {
    const [isShowAddNhanVien, setIsShowAddNhanVien] = useState(false);
    const [currentStepNhanVien, setCurrentStepNhanVien] = useState(0);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isShowCa, setIsShowCa] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const [tabs, setTabs] = useState(1);

    const handleAddNhanVien = () => {
        setIsShowAddNhanVien(true);
        form.setFieldsValue({ nhanViens: [{}] });
    };

    const handleCancelNhanVien = () => {
        setIsShowAddNhanVien(false);
        setCurrentStepNhanVien(0);
    };

    const handleSubmitNhanVien = () => {
        form.validateFields()
            .then((values) => {
                setCurrentStepNhanVien(1);
            })
            .catch((info) => {});
    };

    const handleCancelScheduleModal = () => {
        setIsModalVisible(false);
        setCurrentStep(0);
    };

    const [isTimekeepingVisible, setIsTimekeepingVisible] = useState(false);

    const showTimekeepingModal = () => {
        setIsTimekeepingVisible(true);
    };

    const [isModalVisibleSalary, setIsModalVisibleSalary] = useState(false);

    const showSalaryModal = () => {
        setIsModalVisibleSalary(true);
    };

    const closeSalaryModal = () => {
        setIsModalVisibleSalary(false);
    };

    const [selectedKey, setSelectedKey] = useState("1");

    const handleMenuClick = (key) => {
        setSelectedKey(key);
        // You can call setTabs or any other function here
        if (key === "1") setTabs(1);
        else if (key === "2") setTabs(2);
        else if (key === "3") setTabs(3);
        else if (key === "4") setTabs(4);
        else if (key === "5") setTabs(5);
        // Add additional cases as needed
    };

    const Sidebar = () => (
        <Sider theme="light" width={300}>
            <Menu mode="inline" selectedKeys={[selectedKey]} style={{ borderRight: 0 }}>
                <Menu.Item key="1" icon={<SettingOutlined />} onClick={() => handleMenuClick("1")}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <span>Khởi tạo</span>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </Menu.Item>
                <Menu.Item key="2" icon={<CalendarOutlined />} onClick={() => handleMenuClick("2")}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <span>Ca làm việc</span>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </Menu.Item>
                <Menu.Item key="3" icon={<UserOutlined />} onClick={() => handleMenuClick("3")}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <span>Chấm công</span>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </Menu.Item>
                <Menu.Item key="4" icon={<DollarOutlined />} onClick={() => handleMenuClick("4")}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <span>Tính lương</span>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </Menu.Item>
                <Menu.Item key="5" icon={<SettingOutlined />} onClick={() => handleMenuClick("5")}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <span>Quản lý lễ tết</span>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </Menu.Item>
            </Menu>
        </Sider>
    );

    const MainContent = () => (
        <Layout style={{ padding: "0 5px" }}>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
                <Card
                    title={
                        <span>
                            <i class="fa-solid fa-star text-orange-500 mr-2"></i>
                            Khởi tạo
                        </span>
                    }
                    extra={<Progress percent={100} />}
                    style={{ marginBottom: 16 }}
                >
                    <p>Chỉ vài bước cài đặt để quản lý nhân viên hiệu quả, tối ưu vận hành và tính lương chính xác</p>
                </Card>
                <Card
                    title={
                        <span>
                            <i class="fa-solid fa-circle-check text-green-600 mr-2"></i>
                            Thêm nhân viên
                        </span>
                    }
                    extra={
                        <Button onClick={handleAddNhanVien} className="w-[130px]" type="primary">
                            Thêm nhân viên
                        </Button>
                    }
                    style={{ marginBottom: 16 }}
                >
                    <p>
                        Gian hàng đang có 3 nhân viên.{" "}
                        <a href="#" className="text-orange-500">
                            Xem danh sách
                        </a>
                    </p>
                </Card>
                <Card
                    title={
                        <span>
                            <i class="fa-solid fa-circle-check text-green-600 mr-2"></i>
                            Xếp lịch làm việc
                        </span>
                    }
                    extra={
                        <Button onClick={() => setIsModalVisible(true)} className="w-[130px]" type="primary">
                            Tạo lịch
                        </Button>
                    }
                    style={{ marginBottom: 16 }}
                >
                    <p>
                        Tạo ca và xếp lịch cho nhân viên.{" "}
                        <a href="#" className="text-orange-500">
                            Xem lịch làm việc
                        </a>
                    </p>
                </Card>
                <Card
                    title={
                        <span>
                            <i class="fa-solid fa-circle-check text-green-600 mr-2"></i>
                            Thiết lập chấm công
                        </span>
                    }
                    extra={
                        <Button onClick={showTimekeepingModal} className="w-[130px]" type="primary">
                            Thiết lập
                        </Button>
                    }
                    style={{ marginBottom: 16 }}
                >
                    <p>
                        Cài đặt và chọn hình thức chấm công cho cửa hàng.{" "}
                        <a href="#" className="text-orange-500">
                            Xem bảng chấm công
                        </a>
                    </p>
                </Card>
                <Card
                    title={
                        <span>
                            <i class="fa-solid fa-circle-check text-green-600 mr-2"></i>
                            Thiết lập bảng lương
                        </span>
                    }
                    extra={
                        <Button onClick={showSalaryModal} className="w-[130px]" type="primary">
                            Thiết lập
                        </Button>
                    }
                >
                    <p>
                        Theo dõi chính xác và tự động tính toán lương của từng nhân viên.{" "}
                        <a href="#" className="text-orange-500">
                            Danh sách bảng lương
                        </a>
                    </p>
                </Card>
            </Content>
        </Layout>
    );

    const WorkShiftTable = () => {
        const [isModalVisible, setIsModalVisible] = useState(false);

        const columns = [
            {
                title: "STT",
                dataIndex: "stt",
                key: "stt",
                align: "center",
            },
            {
                title: "Ca làm việc",
                dataIndex: "shiftName",
                key: "shiftName",
            },
            {
                title: "Thời gian",
                dataIndex: "time",
                key: "time",
            },
            {
                title: "Tổng giờ làm việc",
                dataIndex: "totalHours",
                key: "totalHours",
            },
            {
                title: "Chi nhánh",
                dataIndex: "branch",
                key: "branch",
            },
            {
                title: "Hoạt động",
                dataIndex: "active",
                key: "active",
                render: (active) => <Switch defaultChecked={active} />,
                align: "center",
            },
            {
                title: "Tuỳ chọn",
                key: "actions",
                render: () => (
                    <div>
                        <Button icon={<EditOutlined />} style={{ marginRight: 8 }} />
                        <Button icon={<DeleteOutlined />} />
                    </div>
                ),
                align: "center",
            },
        ];

        const data = [
            {
                key: "1",
                stt: "1",
                shiftName: "Ca hành chính",
                time: "08:00 - 17:00",
                totalHours: "9 giờ",
                branch: "Chi nhánh trung tâm",
                active: true,
            },
        ];

        const showModal = () => {
            setIsModalVisible(true);
        };

        const handleCancel = () => {
            setIsModalVisible(false);
        };

        const handleSave = () => {
            // Save the form data
            setIsModalVisible(false);
        };

        return (
            <Layout style={{ padding: "0 5px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                        padding: "0 24px",
                    }}
                >
                    <h4 className="font-bold">Danh sách ca làm việc</h4>
                    <Button type="primary" onClick={showModal}>
                        + Thêm ca làm việc
                    </Button>
                </div>
                <div className="px-6">
                    <Table columns={columns} dataSource={data} pagination={false} bordered />
                </div>

                <Modal
                    title="Thêm ca làm việc"
                    open={isModalVisible} // Corrected typo here
                    onCancel={handleCancel}
                    footer={[
                        <Button key="cancel" onClick={handleCancel} icon={<CloseOutlined />}>
                            Bỏ qua
                        </Button>,
                        <Button key="save" type="primary" onClick={handleSave} icon={<SaveOutlined />}>
                            Lưu
                        </Button>,
                    ]}
                >
                    <Form layout="vertical">
                        <Form.Item label="Tên">
                            <Input placeholder="Nhập tên ca làm việc" />
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Giờ làm việc"
                                    tooltip={{ title: "Thời gian làm việc trong ca", icon: <InfoCircleOutlined /> }}
                                >
                                    <TimePicker.RangePicker
                                        format="HH:mm"
                                        defaultValue={[dayjs("07:00", "HH:mm"), dayjs("11:00", "HH:mm")]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label="&nbsp;">
                                    <Input value="4h" readOnly style={{ textAlign: "center" }} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Giờ cho phép chấm công"
                                    tooltip={{ title: "Thời gian cho phép chấm công", icon: <InfoCircleOutlined /> }}
                                >
                                    <TimePicker.RangePicker
                                        format="HH:mm"
                                        defaultValue={[dayjs("04:00", "HH:mm"), dayjs("14:00", "HH:mm")]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </Layout>
        );
    };

    const AttendanceSettings = () => {
        return (
            <Layout style={{ padding: "0 20px", backgroundColor: "#f5f5f5" }}>
                <Card bordered={false} style={{ marginBottom: "20px" }}>
                    <h3 className="font-bold text-[#f97316]">Ngày làm việc</h3>
                    <Divider style={{ margin: "8px 0" }} />
                    <SettingItem
                        icon={<CalendarOutlined style={{ color: "#f97316", fontSize: "20px" }} />}
                        label="Ngày làm việc"
                        description="Thiết lập ngày làm việc của các chi nhánh"
                        buttonText="Chi tiết"
                    />
                    <SettingItem
                        icon={<InfoCircleOutlined style={{ color: "#f97316", fontSize: "20px" }} />}
                        label="Số giờ của ngày công chuẩn"
                        description="Thiết lập số giờ tính 1 công hoặc 0,5 công của loại lương Theo ngày công chuẩn"
                        buttonText="Chi tiết"
                    />
                    <SettingItem
                        icon={<ClockCircleOutlined style={{ color: "#f97316", fontSize: "20px" }} />}
                        label="Cài đặt đi muộn - về sớm"
                        description="Cài đặt thời gian đi quá sớm hoặc về muộn"
                        buttonText="Chi tiết"
                    />
                    <SettingItem
                        icon={<UserOutlined style={{ color: "#f97316", fontSize: "20px" }} />}
                        label="Cài đặt làm thêm giờ"
                        description="Tính làm thêm giờ cho nhân viên khi vào ca sớm hoặc ra ca muộn"
                        buttonText="Chi tiết"
                    />
                    <SettingItem
                        icon={<CameraOutlined style={{ color: "#f97316", fontSize: "20px" }} />}
                        label="Cho phép chấm 1 lượt Vào - Ra khi làm nhiều ca liên tục"
                        description="Ví dụ: Ca 1 (7:00 - 12:00), Ca 2 (12:30 - 18:00)... Hệ thống sẽ tự động ghi nhận ra ca 1 lúc 12:00..."
                        switchOption
                    />
                </Card>

                <Card bordered={false}>
                    <h3 className="font-bold text-[#f97316]">Hình thức chấm công</h3>
                    <Divider style={{ margin: "8px 0" }} />
                    <SettingItem
                        icon={<MobileOutlined style={{ color: "#f97316", fontSize: "20px" }} />}
                        label="Tự động chấm công"
                        description="Nhân viên không phải chủ động chấm công. Hệ thống sẽ tự động chấm công thay nhân viên."
                        switchOption
                        defaultChecked
                    />
                    <SettingItem
                        icon={<TabletOutlined style={{ color: "#f97316", fontSize: "20px" }} />}
                        label="Chấm công trên điện thoại di động"
                        description="Sử dụng định vị GPS và mã QR để chấm công nhanh."
                        switchOption
                    />
                    <SettingItem
                        icon={<CameraOutlined style={{ color: "#f97316", fontSize: "20px" }} />}
                        label="Chấm công bằng máy chấm công"
                        description="Kết nối máy chấm công với phần mềm"
                        buttonText="Chi tiết"
                    />
                    <SettingItem
                        icon={<InfoCircleOutlined style={{ color: "#f97316", fontSize: "20px" }} />}
                        label="Chấm công thủ công ở bảng chấm công"
                        options={[
                            { label: "Theo giờ bắt đầu và kết thúc ca", value: "startEnd" },
                            { label: "Theo giờ chấm công thực tế", value: "actual" },
                        ]}
                    />
                </Card>
            </Layout>
        );
    };

    const SettingItem = ({ icon, label, description, switchOption, defaultChecked, buttonText, options }) => (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                {icon}
                <div style={{ marginLeft: 8 }}>
                    <p className="font-bold ml-3">{label}</p>
                    {description && <p className="text-gray-500 ml-3">{description}</p>}
                    {options && (
                        <div style={{ display: "flex", marginTop: 8, marginLeft: 12 }}>
                            {options.map((option, index) => (
                                <label key={index} style={{ display: "flex", alignItems: "center", marginRight: 16 }}>
                                    <input type="radio" name="attendanceOption" style={{ marginRight: 4 }} />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {switchOption && <Switch defaultChecked={defaultChecked} />}
            {buttonText && <Button type="primary">{buttonText}</Button>}
        </div>
    );

    const holidayOptions = [
        { key: "1", name: "Tết Dương lịch", fromDate: "01/01/2025", toDate: "01/01/2025" },
        { key: "2", name: "Tết Nguyên Đán", fromDate: "29/01/2025", toDate: "29/01/2025" },
        { key: "3", name: "Giỗ tổ Hùng Vương", fromDate: "07/04/2025", toDate: "07/04/2025" },
        { key: "4", name: "Ngày Giải phóng miền Nam", fromDate: "30/04/2025", toDate: "30/04/2025" },
        { key: "5", name: "Ngày Quốc tế Lao động", fromDate: "01/05/2025", toDate: "01/05/2025" },
        { key: "6", name: "Ngày Quốc Khánh", fromDate: "02/09/2025", toDate: "02/09/2025" },
    ];

    const CalculateSalary = () => {
        const [data, setData] = useState([
            { key: "1", name: "Ngày Quốc Khánh", fromDate: "02/09/2025", toDate: "02/09/2025", days: 1 },
            { key: "2", name: "Ngày Quốc tế Lao động", fromDate: "01/05/2025", toDate: "01/05/2025", days: 1 },
            { key: "3", name: "Ngày Giải phóng miền Nam", fromDate: "30/04/2025", toDate: "30/04/2025", days: 1 },
            { key: "4", name: "Giỗ tổ Hùng Vương", fromDate: "07/04/2025", toDate: "07/04/2025", days: 1 },
            { key: "5", name: "Tết Âm lịch", fromDate: "29/01/2025", toDate: "29/01/2025", days: 1 },
            { key: "6", name: "Tết Dương lịch", fromDate: "01/01/2025", toDate: "01/01/2025", days: 1 },
        ]);
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [form] = Form.useForm();

        const columns = [
            {
                title: "STT",
                dataIndex: "key",
                key: "key",
            },
            {
                title: "Tên kỳ lễ tết",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Từ ngày",
                dataIndex: "fromDate",
                key: "fromDate",
            },
            {
                title: "Đến hết ngày",
                dataIndex: "toDate",
                key: "toDate",
            },
            {
                title: "Số ngày",
                dataIndex: "days",
                key: "days",
            },
            {
                title: "",
                key: "action",
                render: (text, record) => (
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
                ),
            },
        ];

        const handleDelete = (key) => {
            setData(data.filter((item) => item.key !== key));
        };

        const showModal = () => {
            setIsModalVisible(true);
        };

        const handleCancel = () => {
            setIsModalVisible(false);
            form.resetFields();
        };

        const handleAdd = () => {
            form.validateFields().then((values) => {
                const newData = {
                    key: (data.length + 1).toString(),
                    name: values.name,
                    fromDate: values.fromDate.format("DD/MM/YYYY"),
                    toDate: values.toDate.format("DD/MM/YYYY"),
                    days: 1,
                };
                setData([...data, newData]);
                setIsModalVisible(false);
                form.resetFields();
            });
        };

        const handleHolidaySelect = (value) => {
            const selectedHoliday = holidayOptions.find((holiday) => holiday.name === value);
            if (selectedHoliday) {
                form.setFieldsValue({
                    name: selectedHoliday.name,
                    fromDate: moment(selectedHoliday.fromDate, "DD/MM/YYYY"),
                    toDate: moment(selectedHoliday.toDate, "DD/MM/YYYY"),
                });
            }
        };

        return (
            <Layout style={{ padding: "0 5px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                        padding: "0 24px",
                    }}
                >
                    <h4 className="font-bold">Quản lý Lễ tết</h4>
                    <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
                        Thêm ngày nghỉ, lễ tết
                    </Button>
                </div>
                <div className="px-6">
                    <Table columns={columns} dataSource={data} pagination={false} />
                </div>
                <Modal title="Thêm ngày nghỉ, lễ tết" open={isModalVisible} onCancel={handleCancel} onOk={handleAdd}>
                    <Form form={form} layout="vertical">
                        <Form.Item name="holidaySelect" label="Chọn ngày lễ">
                            <Select onChange={handleHolidaySelect}>
                                {holidayOptions.map((holiday) => (
                                    <Select.Option key={holiday.key} value={holiday.name}>
                                        {holiday.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="Tên kỳ lễ tết"
                            rules={[{ required: true, message: "Vui lòng nhập tên kỳ lễ tết" }]}
                        >
                            <Input />
                        </Form.Item>
                        <div className="grid grid-cols-2">
                            <Form.Item
                                name="fromDate"
                                label="Từ ngày"
                                rules={[{ required: true, message: "Vui lòng chọn từ ngày" }]}
                            >
                                <DatePicker format="DD/MM/YYYY" />
                            </Form.Item>
                            <Form.Item
                                name="toDate"
                                label="Đến hết ngày"
                                rules={[{ required: true, message: "Vui lòng chọn đến hết ngày" }]}
                            >
                                <DatePicker format="DD/MM/YYYY" />
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>
            </Layout>
        );
    };

    const SalarySettings = () => {
        return (
            <Layout style={{ padding: "0 20px", backgroundColor: "#f5f5f5" }}>
                <div
                    style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h3 style={{ fontWeight: "bold", marginBottom: "20px", color: "#f97316" }}>Thiết lập tính lương</h3>

                    {/* Ngày tính lương */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <SettingOutlined style={{ fontSize: "20px", marginRight: "10px", color: "#f97316" }} />
                            <div className="ml-4">
                                <h4 style={{ margin: 0 }}>Ngày tính lương</h4>
                                <p style={{ color: "gray", margin: 0 }}>
                                    Ngày bắt đầu tính công cho nhân viên có kỳ lương hàng tháng
                                </p>
                            </div>
                        </div>
                        <Button type="primary">Chi tiết</Button>
                    </div>

                    {/* Tự động tạo bảng tính lương */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FileOutlined style={{ fontSize: "20px", marginRight: "10px", color: "#f97316" }} />
                            <div className="ml-4">
                                <h4 style={{ margin: 0 }}>Tự động tạo bảng tính lương</h4>
                                <p style={{ color: "gray", margin: 0 }}>
                                    Bảng tính lương sẽ được tự động tạo mới vào mỗi kỳ lương
                                </p>
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    {/* Tự động cập nhật bảng tính lương */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <SyncOutlined style={{ fontSize: "20px", marginRight: "10px", color: "#f97316" }} />
                            <div className="ml-4">
                                <h4 style={{ margin: 0 }}>Tự động cập nhật bảng tính lương</h4>
                                <p style={{ color: "gray", margin: 0 }}>
                                    Bảng tính lương sẽ được tự động cập nhật mỗi ngày
                                </p>
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    {/* Thiết lập mẫu lương */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FileOutlined style={{ fontSize: "20px", marginRight: "10px", color: "#f97316" }} />
                            <div className="ml-4">
                                <h4 style={{ margin: 0 }}>Thiết lập Mẫu lương</h4>
                                <p style={{ color: "gray", margin: 0 }}>Phụ cấp, Giảm trừ</p>
                            </div>
                        </div>
                        <Button type="primary">Chi tiết</Button>
                    </div>
                </div>
            </Layout>
        );
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <div className="font-bold text-xl">Thiết lập chung</div>
            <Layout className="mt-2">
                <Sidebar />
                {tabs === 1 && <MainContent />}
                {tabs === 2 && <WorkShiftTable />}
                {tabs === 3 && <AttendanceSettings />}
                {tabs === 4 && <SalarySettings />}
                {tabs === 5 && <CalculateSalary />}
                <CreateOfficerForm
                    isShowAddNhanVien={isShowAddNhanVien}
                    handleCancelNhanVien={handleCancelNhanVien}
                    handleSubmitNhanVien={handleSubmitNhanVien}
                    currentStepNhanVien={currentStepNhanVien}
                    form={form}
                />
                <ScheduleForm
                    isModalVisible={isModalVisible}
                    handleCancel={handleCancelScheduleModal}
                    setIsShowCa={setIsShowCa}
                    isShowCa={isShowCa}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                />
                <TimekeepingForm isModalVisible={isTimekeepingVisible} setIsModalVisible={setIsTimekeepingVisible} />
                <SalaryForm visible={isModalVisibleSalary} onClose={closeSalaryModal} />
            </Layout>
        </Layout>
    );
};

export default GeneralSettings;
