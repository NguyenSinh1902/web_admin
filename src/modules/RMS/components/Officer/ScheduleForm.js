import React, { useState } from "react";
import { Modal, Button, Row, Col, Form, Card, Input, TimePicker, Space, Table } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";

const ScheduleModal = ({ setIsShowCa }) => {
    const [shifts, setShifts] = useState([{ id: 1 }]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const addShift = () => {
        const newShift = { id: shifts.length + 1 };
        setShifts([...shifts, newShift]);
    };

    const removeShift = (id) => {
        const updatedShifts = shifts.filter((shift) => shift.id !== id);
        setShifts(updatedShifts);
    };

    const showScheduleModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        { title: 'Nhân viên', dataIndex: 'employee', key: 'employee' },
        { title: 'Thứ 2 21/10', dataIndex: 'thu2', key: 'thu2' },
        { title: 'Thứ 3 22/10', dataIndex: 'thu3', key: 'thu3' },
        { title: 'Thứ 4 23/10', dataIndex: 'thu4', key: 'thu4' },
        { title: 'Thứ 5 24/10', dataIndex: 'thu5', key: 'thu5' },
        { title: 'Thứ 6 25/10', dataIndex: 'thu6', key: 'thu6' },
        { title: 'Thứ 7 26/10', dataIndex: 'thu7', key: 'thu7' },
        { title: 'Chủ nhật 27/10', dataIndex: 'cn', key: 'cn' },
    ];

    const dataSource = [
        { key: '1', employee: '2 (NV000001)', thu6: 'Ca hành chính' },
        { key: '2', employee: '21 (NV000002)', thu6: 'Ca hành chính' },
    ];

    return (
        <div>
            <Form layout="vertical">
                {shifts.map((shift) => (
                    <Card
                        key={shift.id}
                        style={{ marginBottom: '16px' }}
                        extra={
                            shifts.length > 1 && (
                                <Button
                                    type="danger"
                                    icon={<DeleteOutlined />}
                                    onClick={() => removeShift(shift.id)}
                                />
                            )
                        }
                    >
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label="Tên ca" name={`shiftName_${shift.id}`}>
                                    <Input placeholder="Ca hành chính" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Giờ vào" name={`startTime_${shift.id}`}>
                                    <TimePicker defaultValue={moment('08:00', 'HH:mm')} format="HH:mm" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Giờ ra" name={`endTime_${shift.id}`}>
                                    <TimePicker defaultValue={moment('17:00', 'HH:mm')} format="HH:mm" />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label=" ">
                                    <Button type="primary">{shift.id === 1 ? '9h' : '4h'}</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                ))}
                <Form.Item>
                    <Button
                        type="dashed"
                        onClick={addShift}
                        block
                        icon={<PlusOutlined />}
                    >
                        Thêm ca
                    </Button>
                </Form.Item>
                <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={() => setIsShowCa(false)}>Quay lại</Button>
                    <Button type="primary" onClick={showScheduleModal}>Tiếp tục</Button>
                </Space>
            </Form>

            <Modal
                title="Xếp lịch làm việc"
                open={isModalVisible}
                width={800}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>Xong</Button>
                ]}
            >
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </Modal>
        </div>
    );
};

const ScheduleForm = ({ isModalVisible, handleCancel, setIsShowCa, isShowCa, currentStep, setCurrentStep }) => (
    <Modal
        title="Tạo lịch làm việc"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
    >
        {!isShowCa && currentStep === 0 && (
            <>
                <p>Cửa hàng của bạn có bao nhiêu ca làm việc mỗi ngày?</p>
                <Row gutter={[16, 16]}>
                    <Col><Button onClick={() => setIsShowCa(true)}>1 Ca</Button></Col>
                    <Col><Button>2 Ca</Button></Col>
                    <Col><Button>3 Ca</Button></Col>
                    <Col><Button>Nhiều hơn</Button></Col>
                </Row>
            </>
        )}
        {isShowCa && <ScheduleModal setIsShowCa={setIsShowCa} />}
    </Modal>
);

export default ScheduleForm;
