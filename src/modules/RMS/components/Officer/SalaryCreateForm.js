import React, { useState } from "react";
import { Form, Radio, Select, DatePicker, Button, Table } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

const SalaryCreateForm = ({ onClose }) => {
    const [applyScope, setApplyScope] = useState("all");

    const onFinish = (values) => {
        onClose(); // Close the modal after submission
    };

    const handleApplyScopeChange = (e) => {
        setApplyScope(e.target.value);
    };

    const employeeData = [
        {
            key: "1",
            employeeCode: "NV000001",
            employeeName: "Test",
            department: "Phòng ban 1",
        },
        // Add more employee records as needed
    ];

    const columns = [
        {
            title: "Mã nhân viên",
            dataIndex: "employeeCode",
            key: "employeeCode",
        },
        {
            title: "Tên nhân viên",
            dataIndex: "employeeName",
            key: "employeeName",
        },
        {
            title: "Phòng ban",
            dataIndex: "department",
            key: "department",
        },
    ];

    return (
        <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 600 }}>
            <Form.Item
                label="Kỳ hạn trả lương"
                name="payPeriod"
                rules={[{ required: true, message: "Vui lòng chọn kỳ hạn trả lương!" }]}
            >
                <Select placeholder="Chọn kỳ hạn trả lương">
                    <Option value="monthly">Hàng tháng</Option>
                    <Option value="biweekly">Hàng tuần</Option>
                    <Option value="weekly">Hàng tuần</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Kỳ làm việc"
                name="workPeriod"
                rules={[{ required: true, message: "Vui lòng chọn kỳ làm việc!" }]}
            >
                <RangePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
                label="Phạm vi áp dụng"
                name="applyScope"
                rules={[{ required: true, message: "Vui lòng chọn phạm vi áp dụng!" }]}
            >
                <Radio.Group onChange={handleApplyScopeChange}>
                    <Radio value="all">Tất cả nhân viên</Radio>
                    <Radio value="custom">Tùy chọn</Radio>
                </Radio.Group>
            </Form.Item>

            {applyScope === "custom" && (
                <Form.Item label="Danh sách nhân viên">
                    <Table
                        dataSource={employeeData}
                        columns={columns}
                        pagination={false}
                        rowSelection={{ type: "checkbox" }}
                    />
                </Form.Item>
            )}

            <Form.Item style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                    Lưu
                </Button>
                <Button onClick={onClose}>Bỏ qua</Button>
            </Form.Item>
        </Form>
    );
};

export default SalaryCreateForm;
