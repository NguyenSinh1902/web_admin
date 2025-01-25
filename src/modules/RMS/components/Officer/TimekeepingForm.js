// Timekeeping.js
import React, { useState } from "react";
import { Modal, Button, Progress, Radio, Typography, Space, Row, Col, Input, Checkbox, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const TimekeepingForm = ({ isModalVisible, setIsModalVisible }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [value, setValue] = useState(null);
    const [lateTime, setLateTime] = useState(10);
    const [earlyTime, setEarlyTime] = useState(20);
    const [workLateTime, setWorkLateTime] = useState(10);
    const [worlEarlyTime, setWorlEarlyTime] = useState(20);

    const handleNext = () => {
        if (currentStep === 1 && value === 1) {
            // nếu bấm có ở bước 1 thì sẽ nhảy qua bước 2
            setCurrentStep(2);
        } else if (currentStep === 1 && value === 2) {
            // Nếu bấm không ở bước 1 thì sẽ nhảy qua bước 3
            setCurrentStep(3);
        }else if (currentStep === 2) {
            setCurrentStep(3); // Proceed to the final step
        } else if (currentStep === 3 && value === 2) {
            setCurrentStep(5)
        }else if (currentStep === 3) {
            setCurrentStep(4); // Proceed to the final step
        } else if (currentStep === 4) {
            setCurrentStep(5); // Proceed to the final step
        }else {
            setIsModalVisible(false);
        }
    };

    const handleNext1 = () => {
        if (currentStep === 1 && value === 1) {
            // nếu bấm có ở bước 1 thì sẽ nhảy qua bước 2
            setCurrentStep(2);
        } else if (currentStep === 1 && value === 2) {
            // Nếu bấm không ở bước 1 thì sẽ nhảy qua bước 3
            setCurrentStep(3);
        }else if (currentStep === 2) {
            setCurrentStep(3); // Proceed to the final step
        } else if (currentStep === 3 && value === 2) {
            setCurrentStep(5)
        }else if (currentStep === 3) {
            setCurrentStep(4); // Proceed to the final step
        } else if (currentStep === 4) {
            setCurrentStep(5); // Proceed to the final step
        }else {
            setIsModalVisible(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentStep(1);
        setValue(null);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleChange1 = (e) => {
        setValue(e.target.value);
    };

    return (
        <Modal
            title="Cài đặt chấm công"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            width={600}
            bodyStyle={{ display: "flex", padding: 0 }}
        >
            <Row style={{ width: "100%" }}>
                <Col span={16} style={{ padding: "24px" }}>
                    {currentStep === 1 && (
                        <>
                            <Typography.Title level={5}>
                                Cửa hàng bạn có tính đi muộn - về sớm cho nhân viên?
                            </Typography.Title>
                            <Radio.Group onChange={handleChange} value={value}>
                                <Space direction="vertical">
                                    <Radio value={1}>Có</Radio>
                                    <Radio value={2}>Không</Radio>
                                </Space>
                            </Radio.Group>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <Typography.Title level={5}>
                                Thiết lập thời gian đi muộn - về sớm cho nhân viên
                            </Typography.Title>
                            <Space direction="vertical" style={{ marginTop: "16px" }}>
                                <Checkbox defaultChecked>
                                    Tính đi muộn sau
                                    <Input
                                        value={lateTime}
                                        onChange={(e) => setLateTime(e.target.value)}
                                        suffix="phút"
                                        style={{ width: "80px", marginLeft: "8px" }}
                                    />
                                    <Tooltip title="Thời gian đi muộn sẽ được tính từ lúc nhân viên bắt đầu công việc sau thời gian này">
                                        <InfoCircleOutlined style={{ marginLeft: "4px" }} />
                                    </Tooltip>
                                </Checkbox>
                                <Checkbox defaultChecked>
                                    Tính về sớm trước
                                    <Input
                                        value={earlyTime}
                                        onChange={(e) => setEarlyTime(e.target.value)}
                                        suffix="phút"
                                        style={{ width: "80px", marginLeft: "8px" }}
                                    />
                                    <Tooltip title="Thời gian về sớm sẽ được tính từ lúc nhân viên kết thúc công việc trước thời gian này">
                                        <InfoCircleOutlined style={{ marginLeft: "4px" }} />
                                    </Tooltip>
                                </Checkbox>
                            </Space>
                        </>
                    )}

                    {currentStep === 3 && (
                        <>
                            <Typography.Title level={5}>
                                Cửa hàng bạn có tính giờ làm thêm cho nhân viên?
                            </Typography.Title>
                            <Radio.Group onChange={handleChange1} value={value}>
                                <Space direction="vertical">
                                    <Radio value={1}>Có</Radio>
                                    <Radio value={2}>Không</Radio>
                                </Space>
                            </Radio.Group>
                        </>
                    )}

                    {currentStep === 4 && (
                        <>
                            <Typography.Title level={5}>
                                Thiết lập thời gian làm thêm cho nhân viên
                            </Typography.Title>
                            <Space direction="vertical" style={{ marginTop: "16px" }}>
                                <Checkbox defaultChecked>
                                    Tính làm thêm giờ trước ca
                                    <Input
                                        value={workLateTime}
                                        onChange={(e) => setWorkLateTime(e.target.value)}
                                        suffix="phút"
                                        style={{ width: "80px", marginLeft: "8px" }}
                                    />
                                    <Tooltip title="Thời gian đi muộn sẽ được tính từ lúc nhân viên bắt đầu công việc sau thời gian này">
                                        <InfoCircleOutlined style={{ marginLeft: "4px" }} />
                                    </Tooltip>
                                </Checkbox>
                                <Checkbox defaultChecked>
                                    Tính làm thêm giờ sau ca
                                    <Input
                                        value={worlEarlyTime}
                                        onChange={(e) => setWorlEarlyTime(e.target.value)}
                                        suffix="phút"
                                        style={{ width: "80px", marginLeft: "8px" }}
                                    />
                                    <Tooltip title="Thời gian về sớm sẽ được tính từ lúc nhân viên kết thúc công việc trước thời gian này">
                                        <InfoCircleOutlined style={{ marginLeft: "4px" }} />
                                    </Tooltip>
                                </Checkbox>
                            </Space>
                        </>
                    )}

                    {currentStep === 5 && (
                        <>
                            <Typography.Title level={5}>
                            Cửa hàng bạn chấm công bằng hình thức nào?
                            </Typography.Title>
                            <Radio.Group onChange={handleChange1} value={value}>
                                <Space direction="vertical">
                                    <Radio value={1}>Mã Qr điện thoại</Radio>
                                    <Radio value={2}>Máy chấm công</Radio>
                                    <Radio value={3}>Tự động chấm công</Radio>
                                </Space>
                            </Radio.Group>
                        </>
                    )}

                    <Progress
                        percent={(currentStep / 5) * 100}
                        style={{ margin: "24px 0" }}
                        status="active"
                        size="small"
                    />

                    <Space>
                        {currentStep > 1 && (
                            <Button onClick={() => setCurrentStep(currentStep - 1)}>Quay lại</Button>
                        )}
                        <Button type="primary" onClick={handleNext}>
                            {currentStep < 5 ? "Tiếp tục" : "Hoàn thành"}
                        </Button>
                    </Space>
                </Col>
                <Col span={8} style={{ background: "#f6f6f6", padding: "24px" }}>
                    <img
                        src="https://png.pngtree.com/png-clipart/20230914/original/pngtree-work-schedule-vector-png-image_12160949.png"
                        alt="Lịch làm việc"
                        style={{ width: "100%", height: "auto" }}
                    />
                </Col>
            </Row>
        </Modal>
    );
};

export default TimekeepingForm;
