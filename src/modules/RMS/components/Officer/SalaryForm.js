import React, { useState } from 'react';
import { Modal, Button, Select, Progress, Checkbox, Row, Col, Radio } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Option } = Select;

const SalaryForm = ({ visible, onClose }) => {
    const [selectedDay, setSelectedDay] = useState(1);
    const [step, setStep] = useState(1);
    const [selectedHolidays, setSelectedHolidays] = useState([]);
    const [createSamplePayroll, setCreateSamplePayroll] = useState(null);

    const holidays = [
        'Tết Dương lịch',
        'Giỗ tổ Hùng Vương',
        'Ngày Giải phóng miền Nam',
        'Ngày Quốc tế Lao động',
        'Ngày Quốc Khánh',
        'Tết Âm lịch',
    ];

    const handleDayChange = (value) => {
        setSelectedDay(value);
    };

    const handleNext = () => {
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            if (createSamplePayroll === "yes") {
                setStep(4); // Proceed to step 4 if "Có" is selected
            } else {
                onClose();
                setStep(1); // Reset to step 1 when modal closes
            }
        } else {
            onClose();
            setStep(1); // Reset to step 1 when modal closes
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleHolidayChange = (checkedValues) => {
        setSelectedHolidays(checkedValues);
    };

    const handleRadioChange = (e) => {
        setCreateSamplePayroll(e.target.value);
    };

    return (
        <Modal
            title="Thiết lập tính lương"
            visible={visible}
            onCancel={() => {
                onClose();
                setStep(1); // Reset step when modal closes
            }}
            footer={[
                step > 1 && (
                    <Button className='mt-4' key="back" onClick={handleBack}>
                        Quay lại
                    </Button>
                ),
                <Button className='mt-4' key="submit" type="primary" onClick={handleNext}>
                    {step === 4 ? "Hoàn thành" : "Tiếp tục"}
                </Button>,
            ]}
        >
            {step === 1 && (
                <div>
                    <p>Kỳ lương hàng tháng bắt đầu từ ngày nào?</p>
                    <Select
                        defaultValue={1}
                        style={{ width: 120 }}
                        onChange={handleDayChange}
                        suffixIcon={<DownOutlined />}
                    >
                        {[...Array(31)].map((_, i) => (
                            <Option key={i + 1} value={i + 1}>
                                Ngày {i + 1}
                            </Option>
                        ))}
                    </Select>
                    <div style={{ marginTop: 20 }}>
                        <Progress percent={33} showInfo={false} />
                        <p>1/3</p>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <p>Các ngày nghỉ có lương đã được thiết lập</p>
                    <Checkbox.Group
                        style={{ width: '100%' }}
                        onChange={handleHolidayChange}
                    >
                        <Row gutter={[0, 8]}>
                            {holidays.map((holiday, index) => (
                                <Col span={12} key={index}>
                                    <Checkbox value={holiday}>{holiday}</Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                    <div style={{ marginTop: 20 }}>
                        <Progress percent={66} showInfo={false} />
                        <p>2/3</p>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div>
                    <p>Bạn đã hoàn thành thiết lập lương. Bạn có muốn tạo thử một bảng lương không?</p>
                    <Radio.Group onChange={handleRadioChange} value={createSamplePayroll}>
                        <Radio value="yes">Có</Radio>
                        <Radio value="no">Không</Radio>
                    </Radio.Group>
                    <div style={{ marginTop: 20 }}>
                        <Progress percent={100} showInfo={false} />
                        <p>3/3</p>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div>
                    {/* Customize this section to match the layout in your image */}
                    <div className="grid grid-cols-2 justify-center items-center">
                        <p>Kỳ hạng trả lương</p>
                        <Select defaultValue="Hàng tháng" style={{ width: 200 }}>
                            <Option value="Hàng tháng">Hàng tháng</Option>
                            <Option value="Tùy chọn">Tùy chọn</Option>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 justify-center items-center mt-4">
                        <p>Kỳ làm việc</p>
                        <Select defaultValue="01/10/2024 - 31/10/2024" style={{ width: 200, marginTop: 10 }}>
                            <Option value="01/10/2024 - 31/10/2024">01/10/2024 - 31/10/2024</Option>
                            <Option value="01/01/2023 - 31/10/2024">01/01/2023 - 31/10/2024</Option>
                        </Select>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default SalaryForm;
