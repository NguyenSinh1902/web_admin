import React, { useState } from "react";
import {
    PlusOutlined,
    SaveOutlined,
    StopOutlined,
    InfoCircleOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import { Collapse, Modal, Tabs, Space, Select, Radio, Checkbox, Tooltip, Button, DatePicker, TimePicker } from "antd";
import ModalComp from "../../common/ModalComp";
import InputField from "../../common/InputField";
import dayjs from "dayjs";

const ReceiptForm = () => {
    const [isShow, setIsShow] = useState(false);
    const [isShowSubmitter, setIsShowSubmitter] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleChange = (value) => {};

    const handleFileSelect = () => {
        document.getElementById("fileInput").click();
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Cột bên trái */}
                <div className="space-y-4">
                    <InputField label="Mã phiếu" placeholder="Mã phiếu tự động" />
                    <div style={{ display: "flex", alignItems: "center", gap: "60px" }}>
                        <label style={{ fontWeight: "bold", marginRight: "8px" }}>Thời gian</label>

                        {/* DatePicker */}
                        <DatePicker
                            placeholder="dd/MM/yyyy"
                            format="DD/MM/YYYY"
                            suffixIcon={<CalendarOutlined />}
                            style={{ width: 170 }}
                            defaultValue={dayjs()}
                        />

                        {/* TimePicker */}
                        <TimePicker
                            placeholder="HH:mm"
                            format="HH:mm"
                            suffixIcon={<ClockCircleOutlined />}
                            style={{ width: 80 }}
                            defaultValue={dayjs()}
                        />
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="min-w-[100px]">
                            <label className="font-bold">Loại thu</label>
                        </div>
                        <Space wrap>
                            <Select
                                defaultValue="Tìm loại thu"
                                style={{ width: 295 }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: "Tìm loại thu",
                                        label: "TÌm loại thu",
                                    },
                                    {
                                        value: "Rút tiền từ ngân hàng",
                                        label: "Rút tiền từ ngân hàng",
                                    },
                                ]}
                            />
                            <PlusOutlined onClick={() => setIsShow(true)} className="ml-2 shadow-xl " />
                        </Space>
                    </div>
                    <InputField label="Giá trị" type="number" />
                    <InputField label="Ghi chú" />
                </div>

                {/* Cột bên phải */}
                <div className="space-y-4 mt-3">
                    <div className="flex items-center gap-8">
                        <label className="font-bold">Đối tượng nộp</label>
                        <Space wrap>
                            <Select
                                defaultValue="Khác"
                                style={{ width: 295 }}
                                onChange={handleChange}
                                options={[
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
                    <div className="flex items-center gap-8">
                        <label className="font-bold">Tên người nộp</label>
                        <div className="flex">
                            <InputField placeholder="Tìm kiếm" />
                            <PlusOutlined onClick={() => setIsShowSubmitter(true)} className="ml-2 shadow-xl " />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Checkbox.Group>
                            <Checkbox value="all" className="flex mr-10">
                                Hạch toán vào kết quả hoạt động kinh doanh
                                <Tooltip title="Chọn trong trường hợp giá trị này là khoản Thu nhập thêm hoặc Chi phí vận hành, phát sinh của cửa hàng. Không chọn trong trường hợp Thu tiền hàng hoặc Trả tiền nhà cung cấp.">
                                    <InfoCircleOutlined className="ml-1" />
                                </Tooltip>
                            </Checkbox>
                        </Checkbox.Group>
                    </div>
                </div>

                <div>
                    <Button onClick={handleFileSelect}>Chọn file tải lên</Button>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(event) => {
                            const file = event.target.files[0];
                        }}
                    />
                </div>

                <ModalComp isOpen={isShow} onClose={() => setIsShow(false)} width={600}>
                    <div className="gap-x-4 gap-y-4 mb-2 p-4">
                        <InputField className="col-span-2" label="Tên nhóm" name="FullName" />
                        <InputField className="col-span-2" label="Mô tả" name="FullName" />
                        <div className="flex justify-center mt-5">
                            <Checkbox.Group>
                                <Checkbox value="all" className="flex mr-10">
                                    Hạch toán vào kết quả hoạt động kinh doanh
                                    <Tooltip title="Chọn trong trường hợp giá trị này là khoản Thu nhập thêm hoặc Chi phí vận hành, phát sinh của cửa hàng. Không chọn trong trường hợp Thu tiền hàng hoặc Trả tiền nhà cung cấp.">
                                        <InfoCircleOutlined className="ml-1" />
                                    </Tooltip>
                                </Checkbox>
                            </Checkbox.Group>
                        </div>
                    </div>
                </ModalComp>

                <ModalComp isOpen={isShowSubmitter} onClose={() => setIsShowSubmitter(false)} width={600}>
                    <div className="gap-x-4 gap-y-4 mb-2 p-4">
                        <InputField className="col-span-2" label="Người nộp" name="FullName" />
                        <InputField className="col-span-2" label="Điện thoại" name="FullName" />
                        <InputField className="col-span-2" label="Địa chỉ" name="FullName" />
                        <InputField
                            className="col-span-2"
                            label="Khu vực"
                            name="FullName"
                            placeholder="Chọn Tỉnh/TP - Quận/Huyện"
                        />
                        <InputField
                            className="col-span-2"
                            label="Phường xã"
                            name="FullName"
                            placeholder="Chọn Phường/Xã"
                        />
                        <InputField className="col-span-2" label="Ghi chú" name="FullName" />
                    </div>
                </ModalComp>
            </div>

            <div className="flex justify-end mt-10">
                <Button type="primary" className="mr-2" icon={<SaveOutlined />}>
                    Lưu
                </Button>

                <Button type="primary" className="mr-2" icon={<SaveOutlined />}>
                    Lưu & In
                </Button>

                <Button className="bg-gray-300" icon={<StopOutlined />} onClick={() => setIsModalVisible(false)}>
                    Bỏ qua
                </Button>
            </div>
        </div>
    );
};

export default ReceiptForm;
