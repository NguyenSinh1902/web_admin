import React, { useState } from "react";
import { SaveOutlined, StopOutlined } from "@ant-design/icons";
import InputField from "../../common/InputField";
import { Button, Checkbox, Input, notification } from "antd";
import SelectInput from "../../common/SelectInput";
import { FormatMoney } from "../../utils";

const RoomLevelForm = ({ onSave = () => {} }) => {
    const [formData, setFormData] = useState({
        roomName: "",
        dailyRate: 0,
        hourlyRate: 0,
        overnightRate: 0,
        earlyCheckInFee: "",
        lateCheckOutFee: "",
        defaultSurcharge: false,
        applyToAllRooms: false,
        standardAdults: 1,
        standardChildren: 1,
        maxAdults: 1,
        maxChildren: 1,
    });

    // Handle input change for text fields
    const handleInputChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleCheckboxChange = (name) => {
        setFormData((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    const handleSubmit = () => {
        // Simulate form submission

        // Show success notification
        if (onSave) {
            onSave(formData); // Pass form data to the parent
        }
        notification.success({
            message: "Thêm thành công!",
        });

        // Reset form fields
        ClearData();
    };

    const ClearData = () => {
        setFormData({
            roomName: "",
            dailyRate: 0,
            hourlyRate: 0,
            overnightRate: 0,
            earlyCheckInFee: "",
            lateCheckOutFee: "",
            defaultSurcharge: false,
            applyToAllRooms: false,
            standardAdults: 1,
            standardChildren: 1,
            maxAdults: 1,
            maxChildren: 1,
        });
    };
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 flex-wrap gap-x-4 gap-y-4 mb-2 p-4">
                <div className="flex flex-col gap-2">
                    <InputField
                        label="Tên hạng phòng"
                        name="roomName"
                        value={formData.roomName}
                        onChange={(e) => handleInputChange("roomName", e.target.value)}
                    />
                    <InputField
                        label="Giá theo ngày"
                        name="dailyRate"
                        value={formData.dailyRate}
                        onChange={(e) => handleInputChange("dailyRate", FormatMoney(e.target.value))}
                    />
                    <InputField
                        label="Giá theo giờ"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange("hourlyRate", FormatMoney(e.target.value))}
                    />
                    <InputField
                        label="Giá qua đêm"
                        name="overnightRate"
                        value={formData.overnightRate}
                        onChange={(e) => handleInputChange("overnightRate", FormatMoney(e.target.value))}
                    />
                </div>
                <div className="mb-4 p-4 bg-gray-100 border border-gray-300 rounded-md">
                    <div className="flex justify-between items-center gap-3">
                        <span className="text-gray-700 ">Thời gian nhận - trả quy định</span>
                        <i className="fas fa-pen text-gray-500"></i>
                    </div>
                    <ul className="list-disc list-inside mt-3 text-gray-700 flex flex-col gap-3">
                        <li>Cả ngày tính từ 14:00 đến 12:00</li>
                        <li>Qua đêm tính từ 22:00 đến 11:00</li>
                    </ul>
                </div>
                <div className="mb-4 border border-gray-300 rounded-md col-span-full">
                    <div className="mb-2 text-gray-700 font-medium bg-gray-200 p-3">
                        Phụ thu quá giờ (Khi quá thời gian quy định)
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                            <InputField
                                name="earlyCheckInFee"
                                value={formData.earlyCheckInFee}
                                onChange={(e) => handleInputChange("earlyCheckInFee", FormatMoney(e.target.value))}
                                label={"Nhận sớm (/giờ)"}
                            />
                            <InputField
                                name="lateCheckOutFee"
                                value={formData.lateCheckOutFee}
                                onChange={(e) => handleInputChange("lateCheckOutFee", FormatMoney(e.target.value))}
                                label={"Trả muộn (/giờ)"}
                            />
                        </div>

                        <div className="flex items-center mb-2">
                            <Checkbox> Mặc định tính phụ thu cho hạng phòng</Checkbox>
                        </div>
                        <div className="flex items-center">
                            <Checkbox> Áp dụng cho tất cả hạng phòng</Checkbox>
                        </div>
                    </div>
                </div>
                <div className="mb-4 border border-gray-300 rounded-md col-span-full">
                    <div className=" text-gray-700 font-medium bg-gray-200 p-3">Sức chứa</div>
                    <div className=" p-4 ">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700 font-semibold">Tiêu chuẩn</span>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="number"
                                    min={1}
                                    name="standardAdults"
                                    defaultValue={1}
                                    max={99}
                                    onChange={(e) => handleInputChange("standardAdults", e.target.value)}
                                    className="text-center w-10 bg-transparent border-0 border-b-[1px] rounded-none border-gray-600 outline-none shadow-none"
                                />
                                <div className="text-gray-700"> người lớn và </div>
                                <Input
                                    type="number"
                                    min={1}
                                    name="standardChildren"
                                    defaultValue={1}
                                    max={99}
                                    onChange={(e) => handleInputChange("standardChildren", e.target.value)}
                                    className="text-center w-10 bg-transparent border-0 border-b-[1px] rounded-none border-gray-600 outline-none shadow-none"
                                />
                                <div className="text-gray-700">trẻ em</div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-700 font-semibold">Tối đa</span>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="number"
                                    min={1}
                                    name="maxAdults"
                                    defaultValue={1}
                                    max={99}
                                    onChange={(e) => handleInputChange("maxAdults", e.target.value)}
                                    className="text-center w-10 bg-transparent border-0 border-b-[1px] rounded-none border-gray-600 outline-none shadow-none"
                                />
                                <div className="text-gray-700"> người lớn và </div>
                                <Input
                                    type="number"
                                    min={1}
                                    name="maxChildren"
                                    defaultValue={1}
                                    max={99}
                                    onChange={(e) => handleInputChange("maxChildren", e.target.value)}
                                    className="text-center w-10 bg-transparent border-0 border-b-[1px] rounded-none border-gray-600 outline-none shadow-none"
                                />
                                <div className="text-gray-700">trẻ em</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 flex items-center gap-2 justify-end  ">
                <Button
                    className="bg-green-600 text-white p-2 rounded-md flex items-center gap-1 text-sm font-normal"
                    onClick={handleSubmit}
                >
                    <SaveOutlined />
                    Thêm mới
                </Button>
                <Button
                    className="bg-red-600 text-white p-2 rounded-md flex items-center gap-1 text-sm font-normal"
                    onClick={() => ClearData()}
                >
                    <StopOutlined />
                    Hủy
                </Button>
            </div>
        </>
    );
};

export default RoomLevelForm;
