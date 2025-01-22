import React, { useState } from "react";
import { DatePicker, Radio, Modal, Button, Select, notification, Table } from "antd";
import { EyeOutlined, PlusOutlined, SaveOutlined, StopOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

const InputField = ({ label, value, onChange }) => (
    <div className="flex items-center gap-3">
        <label className="text-xs font-medium w-[100px]">{label}</label>
        <input
            type="text"
            className="w-full border-0 outline-none shadow-none border-b-[1px] border-gray-400"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

export const PriceRoomModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState(1);
    const [valueCustomer, setValueCustomer] = useState(1);

    // Declare form fields values
    const [priceCode, setPriceCode] = useState("");
    const [priceName, setPriceName] = useState("");
    const [note, setNote] = useState("");

    // State to store table data
    const [data, setData] = useState([]);

    // Handle form submission
    const handleAdd = () => {
        const formData = {
            priceCode,
            priceName,
            rangeDate: [new Date(), new Date()], // Example for RangePicker
            applyRange: value === 1 ? "Toàn hệ thống" : "Chi nhánh",
            customerRange: valueCustomer === 1 ? "Toàn bộ khách hàng" : "Nhóm khách hàng",
            key: Date.now(), // Unique key for each entry
        };

        // Validate and add data to table
        if (priceCode && priceName) {
            setData((prevData) => [...prevData, formData]);

            // Show success notification
            notification.success({
                message: "Thành công!",
                description: "Dữ liệu đã được thêm thành công.",
            });

            // Close modal after adding
            setIsModalOpen(false);
            // Reset form fields
            setPriceCode("");
            setPriceName("");
        } else {
            // Show error notification
            notification.error({
                message: "Lỗi!",
                description: "Vui lòng điền đầy đủ thông tin.",
            });
        }
    };

    const handleShowDetails = (record) => {
        Modal.info({
            title: "Chi tiết bảng giá",
            content: (
                <div>
                    <p>
                        <strong>Mã bảng giá:</strong> {record.priceCode}
                    </p>
                    <p>
                        <strong>Tên bảng giá:</strong> {record.priceName}
                    </p>
                    <p>
                        <strong>Phạm vi áp dụng:</strong> {record.applyRange}
                    </p>
                    <p>
                        <strong>Phạm vi khách hàng:</strong> {record.customerRange}
                    </p>
                    <p>
                        <strong>Ngày hiệu lực:</strong> {record.rangeDate[0].toLocaleDateString()} -{" "}
                        {record.rangeDate[1].toLocaleDateString()}
                    </p>
                </div>
            ),
            onOk() {},
        });
    };

    // Columns configuration for Table
    const columns = [
        {
            title: "Mã bảng giá",
            dataIndex: "priceCode",
            key: "priceCode",
        },
        {
            title: "Tên bảng giá",
            dataIndex: "priceName",
            key: "priceName",
        },
        {
            title: "Phạm vi áp dụng",
            dataIndex: "applyRange",
            key: "applyRange",
        },
        {
            title: "Phạm vi khách hàng",
            dataIndex: "customerRange",
            key: "customerRange",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Button type="link" onClick={() => handleShowDetails(record)}>
                    <EyeOutlined /> Show Chi Tiết
                </Button>
            ),
        },
    ];

    // Handle delete action
    const handleDelete = (key) => {
        setData((prevData) => prevData.filter((item) => item.key !== key));
        notification.info({
            message: "Đã xóa",
            description: "Bản ghi đã được xóa khỏi bảng.",
        });
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Input Fields with Props */}
                <div>
                    <InputField
                        label="Mã bảng giá"
                        value={priceCode}
                        onChange={setPriceCode} // Update state on change
                    />
                </div>

                <div className="flex items-end gap-3">
                    <div className="text-xs font-medium w-[100px]">Hiệu lực</div>
                    <div className="grid">
                        <RangePicker
                            showTime={{ format: "HH:mm" }}
                            format="YYYY-MM-DD HH:mm"
                            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                            className="border-0 outline-none shadow-none w-full border-b-[1px] rounded-none border-gray-400"
                            onChange={(value, dateString) => {}}
                        />
                    </div>
                </div>

                <div>
                    <InputField
                        label="Tên bảng giá"
                        value={priceName}
                        onChange={setPriceName} // Update state on change
                    />
                </div>

                <div className="flex items-end gap-3">
                    <div className="text-xs font-medium w-[100px]">Thời gian lưu trú</div>
                    <div className="grid">
                        <RangePicker
                            showTime={{ format: "HH:mm" }}
                            format="YYYY-MM-DD HH:mm"
                            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                            className="border-0 outline-none shadow-none w-full border-b-[1px] rounded-none border-gray-400"
                            onChange={(value, dateString) => {}}
                        />
                    </div>
                </div>

                <div>
                    <InputField
                        label="Ghi chú"
                        value={note}
                        onChange={setNote} // Update state on change
                    />
                </div>
            </div>

            <div className="mt-6">
                <label className="block mb-2 font-semibold text-base">Phạm vi áp dụng</label>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                    <Radio.Group
                        className="mt-4 flex flex-col gap-3"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    >
                        <div className="flex items-center mb-2">
                            <Radio value={1} className="mr-2 text-sm">
                                Toàn hệ thống
                            </Radio>
                        </div>
                        <div className="flex items-center w-full">
                            <Radio value={2} className="mr-2" />
                            <Select className="md:w-[80%] w-full" placeholder="Chọn Chi nhánh">
                                <Option value="branch1">Chi nhánh 1</Option>
                                <Option value="branch2">Chi nhánh 2</Option>
                            </Select>
                        </div>
                    </Radio.Group>

                    <Radio.Group
                        className="mt-4 flex flex-col gap-3"
                        onChange={(e) => setValueCustomer(e.target.value)}
                        value={valueCustomer}
                    >
                        <div className="flex items-center mb-2">
                            <Radio value={1} className="mr-2 text-sm">
                                Toàn bộ khách hàng
                            </Radio>
                        </div>
                        <div className="flex items-center w-full">
                            <Radio value={2} className="mr-2" />
                            <Select className="md:w-[80%] w-full" placeholder="Chọn Nhóm khách hàng">
                                <Option value="group1">Nhóm khách hàng 1</Option>
                                <Option value="group2">Nhóm khách hàng 2</Option>
                            </Select>
                        </div>
                    </Radio.Group>
                </div>
            </div>
        </div>
    );
};
