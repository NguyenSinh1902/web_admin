import React, { useState } from "react";
import { Button, Layout, Card, Select, Tabs, Typography, Table, Row, Col, Input } from "antd";
import {
    UserOutlined,
    CheckOutlined,
    DeleteOutlined,
    PlusOutlined,
    UploadOutlined,
    DownloadOutlined
} from "@ant-design/icons";
import OfficerForm from "../../components/Officer/OfficerForm";

const Officer = () => {
    // 
    const { Sider, Content } = Layout;
    const { Option } = Select;
    const { TabPane } = Tabs;
    const { Title, Text } = Typography;

    const data = [
        {
            key: '1',
            employeeCode: 'NV000001',
            attendanceCode: 'Test',
            employeeName: 'Test',
            phoneNumber: '0123654852',
            idNumber: '123456789',
            debtAdvance: '0',
            note: 'Employee Note',
            branch: 'Chi nhánh trung tâm',
            payBranch: 'Chi nhánh trung tâm',
            department: 'Sales',
            position: 'Manager',
            startDate: '2021-01-01',
            kiotVietAccount: '0123654852',
            email: 'test@example.com',
            facebook: 'facebook.com/test',
            address: '123 Main St',
            mobileDevice: 'iPhone',
        },
        // Add more mock data as needed
    ];

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [filters, setFilters] = useState({});

    const columns = [
        { title: 'Mã nhân viên', dataIndex: 'employeeCode', key: 'employeeCode' },
        { title: 'Mã chấm công', dataIndex: 'attendanceCode', key: 'attendanceCode' },
        { title: 'Tên nhân viên', dataIndex: 'employeeName', key: 'employeeName' },
        { title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Số CMND/CCCD', dataIndex: 'idNumber', key: 'idNumber' },
        { title: 'Nợ và tạm ứng', dataIndex: 'debtAdvance', key: 'debtAdvance' },
        { title: 'Ghi chú', dataIndex: 'note', key: 'note' },
    ];

    const onRowClick = (record) => {
        setSelectedEmployee(prevSelected =>
            prevSelected && prevSelected.key === record.key ? null : record
        );
    };
    // --------------------------------------------------------------------------

    const Sidebar = () => (
        <Sider theme="light" width={300} style={{ padding: '10px' }}>
            <h3>Chi nhánh làm việc</h3>
            <Select
                placeholder="Chọn chi nhánh..."
                value={filters.branch}
                style={{ width: '100%', marginBottom: 10 }}
            >
                <Option value="1">Chi nhánh trung tâm</Option>
                <Option value="2">Chi nhánh khu vực miền Bắc</Option>
                <Option value="3">Chi nhánh khu vực miền Nam</Option>
            </Select>

            <h3>Chi nhánh trả lương</h3>
            <Select
                placeholder="Chọn chi nhánh..."
                style={{ width: '100%', marginBottom: 10 }}
                value={filters.payBranch}
            >
                <Option value="1">Chi nhánh trung tâm</Option>
                <Option value="2">Chi nhánh khu vực miền Bắc</Option>
                <Option value="3">Chi nhánh khu vực miền Nam</Option>
            </Select>

            <h3>Phòng ban</h3>
            <Select
                placeholder="Chọn phòng ban"
                style={{ width: '100%', marginBottom: 10 }}
                value={filters.department}
            >
                <Option value="1">Phòng nhân sự</Option>
                <Option value="2">Phòng kỹ thuật</Option>
                <Option value="3">Phòng kiểm kê</Option>
            </Select>

            <h3>Chức danh</h3>
            <Select
                placeholder="Chọn chức danh"
                style={{ width: '100%', marginBottom: 10 }}
                value={filters.position}
            >
                <Option value="1">Kế toán</Option>
                <Option value="2">Lễ tân</Option>
                <Option value="3">Quản lý</Option>
            </Select>
        </Sider>
    );


    // Xử lý popup thêm nhân viên

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = () => {
        // Thêm logic lưu dữ liệu tại đây
        setIsModalVisible(false);
    };

    // --------------------------------------------------------------------------

    const MainContent = () => (
        <Layout style={{ padding: "0 5px" }}>
            <Content style={{ paddingLeft: '20px' }}>
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                        <Input
                            placeholder="Tìm theo mã, tên nhân viên"
                            prefix={<UserOutlined />}
                            style={{ width: 300 }}
                        />
                        <div>
                            <Button onClick={showModal} type="primary" icon={<PlusOutlined />} style={{ marginRight: 8 }}>
                                Nhân viên
                            </Button>
                            <Button icon={<UploadOutlined />} style={{ marginRight: 8 }}>
                                Nhập file
                            </Button>
                            <Button icon={<DownloadOutlined />}>Xuất file</Button>
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{ pageSize: 15 }}
                        onRow={(record) => ({
                            onClick: () => onRowClick(record),
                        })}
                        rowClassName={(record) =>
                            `cursor-pointer ${record.key === selectedEmployee?.key ? 'selected-row' : ''}`
                        }
                    />
                    {selectedEmployee && (
                        <Card style={{ marginTop: 20, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Thông tin" key="1">
                                    <Row gutter={16}>
                                        <Col span={8}>
                                            <div style={{ textAlign: 'center' }}>
                                                <img
                                                    src="https://via.placeholder.com/150"
                                                    alt="Employee"
                                                    style={{ width: '100%', marginBottom: 10 }}
                                                />
                                                <Title level={4}>{selectedEmployee.employeeName}</Title>
                                                <Text>Mã nhân viên: {selectedEmployee.employeeCode}</Text>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <p>Mã chấm công: {selectedEmployee.attendanceCode}</p>
                                            <p>Ngày sinh: {selectedEmployee.startDate}</p>
                                            <p>Giới tính: N/A</p>
                                            <p>Số CMND/CCCD: {selectedEmployee.idNumber}</p>
                                            <p>Phòng ban: {selectedEmployee.department}</p>
                                            <p>Chức danh: {selectedEmployee.position}</p>
                                        </Col>
                                        <Col span={8}>
                                            <p>Chi nhánh trả lương: {selectedEmployee.payBranch}</p>
                                            <p>Chi nhánh làm việc: {selectedEmployee.branch}</p>
                                            <p>Tài khoản KiotViet: {selectedEmployee.kiotVietAccount}</p>
                                            <p>Số điện thoại: {selectedEmployee.phoneNumber}</p>
                                            <p>Email: {selectedEmployee.email}</p>
                                            <p>Facebook: {selectedEmployee.facebook}</p>
                                            <p>Địa chỉ: {selectedEmployee.address}</p>
                                            <p>Thiết bị di động: {selectedEmployee.mobileDevice}</p>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Lịch làm việc" key="2">
                                    <p>Lịch làm việc content goes here...</p>
                                </TabPane>
                                <TabPane tab="Thiết lập lương" key="3">
                                    <p>Thiết lập lương content goes here...</p>
                                </TabPane>
                                <TabPane tab="Nợ và tạm ứng" key="4">
                                    <p>Nợ và tạm ứng content goes here...</p>
                                </TabPane>
                            </Tabs>
                            <div style={{ marginTop: 20, textAlign: 'right' }}>
                                <Button icon={<CheckOutlined />} style={{ marginRight: 8 }}>
                                    Lấy mã xác nhận
                                </Button>
                                <Button type="primary" style={{ marginRight: 8 }}>
                                    Cập nhật
                                </Button>
                                <Button danger icon={<DeleteOutlined />}>
                                    Xóa nhân viên
                                </Button>
                            </div>
                        </Card>
                    )}
                </Card>
            </Content>
        </Layout>
    );


    return (
        <Layout style={{ height: "100vh" }}>
            <div className="font-bold text-xl">Nhân viên</div>
            <Layout className="mt-2">
                <Sidebar />
                <MainContent />
                <OfficerForm visible={isModalVisible} onCancel={handleCancel} onSave={handleSave} />
            </Layout>
        </Layout>
    );
};

export default Officer;
