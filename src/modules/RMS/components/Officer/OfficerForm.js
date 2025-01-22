// OfficerForm.js
import React from "react";
import { Modal, Button, Input, Select, Form, Tabs, Upload, DatePicker, Collapse, Radio, Card, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;
const onFinish = (values) => {};

const OfficerForm = ({ visible, onCancel, onSave }) => {
    return (
        <Modal
            title="Thêm mới nhân viên"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Bỏ qua
                </Button>,
                <Button key="submit" type="primary" onClick={onSave}>
                    Lưu
                </Button>,
            ]}
            width={1000}
        >
            <Tabs defaultActiveKey="1">
                <TabPane tab="Thông tin" key="1">
                    <Form layout="vertical">
                        <div style={{ display: "flex", gap: "20px" }}>
                            <Form.Item label="Chọn ảnh">
                                <Upload>
                                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                                </Upload>
                            </Form.Item>
                            <div style={{ flexGrow: 1 }}>
                                <Form.Item label="Tên nhân viên" name="employeeName">
                                    <Input placeholder="Nhập tên nhân viên" />
                                </Form.Item>
                                <Form.Item label="Số điện thoại" name="phoneNumber">
                                    <Input placeholder="Nhập số điện thoại" />
                                </Form.Item>
                                <Form.Item label="Chi nhánh làm việc" name="workBranch">
                                    <Select mode="multiple" placeholder="Chọn chi nhánh">
                                        <Option value="Tất cả chi nhánh">Tất cả chi nhánh</Option>
                                        <Option value="Chi nhánh trung tâm">Chi nhánh trung tâm</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Chi nhánh trả lương" name="payBranch">
                                    <Select placeholder="Chọn chi nhánh">
                                        <Option value="Chi nhánh trung tâm">Chi nhánh trung tâm</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <Collapse>
                            <Panel header="Thông tin công việc" key="1">
                                <Form.Item label="Ngày bắt đầu làm việc" name="startDate">
                                    <DatePicker style={{ width: "100%" }} />
                                </Form.Item>
                                <Form.Item label="Phòng ban" name="department">
                                    <Select placeholder="Chọn phòng ban">
                                        <Option value="Phòng A">Phòng A</Option>
                                        <Option value="Phòng B">Phòng B</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Chức danh" name="position">
                                    <Select placeholder="Chọn chức danh">
                                        <Option value="Chức danh A">Chức danh A</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Ghi chú" name="notes">
                                    <Input.TextArea placeholder="Nhập ghi chú" />
                                </Form.Item>
                            </Panel>
                            <Panel header="Thông tin cá nhân" key="2">
                                <Form.Item label="Số CMND/CCCD" name="idNumber">
                                    <Input placeholder="Nhập số CMND/CCCD" />
                                </Form.Item>
                                <Form.Item label="Ngày sinh" name="birthDate">
                                    <DatePicker style={{ width: "100%" }} />
                                </Form.Item>
                                <Form.Item label="Giới tính" name="gender">
                                    <Radio.Group>
                                        <Radio value="Nam">Nam</Radio>
                                        <Radio value="Nữ">Nữ</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Panel>
                            <Panel header="Thông tin liên hệ" key="3">
                                <Form.Item label="Địa chỉ" name="address">
                                    <Input placeholder="Nhập địa chỉ" />
                                </Form.Item>
                                <Form.Item label="Khu vực" name="area">
                                    <Select placeholder="Chọn Tỉnh/TP - Quận/Huyện">
                                        <Option value="Hà Nội">Hà Nội</Option>
                                        <Option value="TP HCM">TP HCM</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Phường xã" name="ward">
                                    <Select placeholder="Chọn Phường/Xã">
                                        <Option value="Phường A">Phường A</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Email" name="email">
                                    <Input placeholder="Nhập email" />
                                </Form.Item>
                                <Form.Item label="Facebook" name="facebook">
                                    <Input placeholder="Nhập Facebook" />
                                </Form.Item>
                            </Panel>
                        </Collapse>
                    </Form>
                </TabPane>
                <TabPane tab="Thiết lập lương" key="2">
                    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 600, margin: "0 auto" }}>
                        {/* Main Salary Section */}
                        <Card title="Lương chính" style={{ marginBottom: 20 }}>
                            <Form.Item
                                label="Loại lương"
                                name="salaryType"
                                rules={[{ required: true, message: "Vui lòng chọn loại lương!" }]}
                            >
                                <Select placeholder="Chọn loại lương">
                                    <Option value="perShift">Theo ca làm việc</Option>
                                    <Option value="monthly">Theo tháng</Option>
                                    <Option value="hourly">Theo giờ</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Mức lương"
                                name="salaryAmount"
                                rules={[{ required: true, message: "Vui lòng nhập mức lương!" }]}
                            >
                                <Input addonAfter="/ ca" placeholder="Nhập mức lương" />
                            </Form.Item>

                            <Form.Item label="Lương làm thêm giờ" name="overtime">
                                <Switch />
                            </Form.Item>
                        </Card>

                        {/* Allowance and Deduction Section */}
                        <Card title="Phụ cấp, Giảm trừ">
                            <Form.Item label="Phụ cấp" name="allowance">
                                <Switch />
                                <p style={{ marginTop: 5, fontSize: "12px", color: "#888" }}>
                                    Thiết lập khoản hỗ trợ làm việc như ăn trưa, đi lại, điện thoại, ...
                                </p>
                            </Form.Item>

                            <Form.Item label="Giảm trừ" name="deduction">
                                <Switch />
                                <p style={{ marginTop: 5, fontSize: "12px", color: "#888" }}>
                                    Thiết lập khoản giảm trừ như đi muộn, về sớm, vi phạm nội quy, ...
                                </p>
                            </Form.Item>
                        </Card>

                        {/* Submit Buttons */}
                        {/* <Form.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="primary" htmlType="submit">
                                Lưu
                            </Button>
                            <Button type="default" htmlType="submit">
                                Lưu và tạo mẫu lương mới
                            </Button>
                            <Button type="ghost">
                                Bỏ qua
                            </Button>
                        </Form.Item> */}
                    </Form>
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default OfficerForm;
