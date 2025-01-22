import React from "react";
import { Modal, Form, Input, Select, Steps, Card, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Step } = Steps;
const { Option } = Select;

const CreateOfficerForm = ({
    isShowAddNhanVien,
    handleCancelNhanVien,
    handleSubmitNhanVien,
    currentStepNhanVien,
    form,
}) => {
    const renderSalarySetup = () => (
        <>
            <h2>Thiết lập lương nhân viên</h2>
            <Form layout="vertical">
                {form.getFieldValue("nhanViens").map((employee, index) => (
                    <Card key={index} title={`Nhân viên ${employee.ten}`}>
                        <Form.Item
                            label="Loại lương"
                            name={`loaiLuong${index}`}
                            rules={[{ required: true, message: "Vui lòng chọn loại lương!" }]}
                        >
                            <Select placeholder="--- Chọn loại lương ---">
                                <Option value="cơ bản">Lương cơ bản</Option>
                                <Option value="thưởng">Lương thưởng</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Mức lương"
                            name={`mucLuong${index}`}
                            rules={[{ required: true, message: "Vui lòng nhập mức lương!" }]}
                        >
                            <Input placeholder="Nhập mức lương" />
                        </Form.Item>
                    </Card>
                ))}
            </Form>
        </>
    );

    return (
        <Modal
            title="Thiết lập thông tin"
            open={isShowAddNhanVien}
            onCancel={handleCancelNhanVien}
            onOk={currentStepNhanVien === 0 && handleSubmitNhanVien}
            okText={currentStepNhanVien === 0 ? "Tiếp tục" : "Áp dụng"}
            cancelText="Bỏ qua"
            width={800}
        >
            <Steps current={currentStepNhanVien} size="small" style={{ marginBottom: 20 }}>
                <Step title="Thông tin nhân viên" />
                <Step title="Thiết lập lương" />
            </Steps>

            {currentStepNhanVien === 0 ? (
                <Form form={form} layout="vertical">
                    <Form.List name="nhanViens">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                    <Card
                                        key={key}
                                        style={{ marginBottom: "10px" }}
                                        title={`Nhân viên ${index + 1}`}
                                        extra={
                                            fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    style={{ color: "red" }}
                                                    onClick={() => remove(name)}
                                                />
                                            ) : null
                                        }
                                    >
                                        <Form.Item
                                            {...restField}
                                            label="Tên nhân viên"
                                            name={[name, "ten"]}
                                            fieldKey={[fieldKey, "ten"]}
                                            rules={[{ required: true, message: "Vui lòng nhập tên nhân viên!" }]}
                                        >
                                            <Input placeholder="Tên nhân viên" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            label="Số điện thoại"
                                            name={[name, "soDienThoai"]}
                                            fieldKey={[fieldKey, "soDienThoai"]}
                                            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                                        >
                                            <Input placeholder="Số điện thoại" />
                                        </Form.Item>
                                    </Card>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: "100%", marginTop: "10px" }}
                                    >
                                        <PlusOutlined /> Thêm nhân viên
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            ) : (
                renderSalarySetup()
            )}
        </Modal>
    );
};

export default CreateOfficerForm;
