import React, { useState } from "react";
import { SaveOutlined, StopOutlined } from "@ant-design/icons";
import ImgMutilUploadComp from "../../common/ImgMultiUpload";
import InputField from "../../common/InputField";
import SelectInput from "../../common/SelectInput";
import { FormatMoney } from "../../utils";
import { Button, notification } from "antd";

const RoomForm = ({ roomNames, onSave = () => {} }) => {
    const [formData, setFormData] = useState({
        roomName: "",
        levelRoomName: "",
        note: "",
        dailyRate: "",
        hourlyRate: "",
        overnightRate: "",
        earlyCheckInFee: "",
    });
    const handleInputChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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
            levelRoomName: "",
        });
    };
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 flex-wrap gap-x-4 gap-y-8 mb-2 p-4">
                <div className="flex flex-col gap-4">
                    <InputField
                        label="Tên phòng"
                        name="roomName"
                        value={formData.roomName}
                        onChange={(e) => handleInputChange("roomName", e.target.value)}
                    />
                    {/* <SelectInput
            className="w-full"
            label={<div className="font-semibold">Khu vực</div>}
            Typelayout={4}
          /> */}

                    <SelectInput
                        className="w-full"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                levelRoomName: e,
                                dailyRate: roomNames?.find((item) => item?.value == e.toString()).data.dailyRate,
                                hourlyRate: roomNames?.find((item) => item?.value == e.toString()).data.hourlyRate,
                                overnightRate: roomNames?.find((item) => item?.value == e.toString()).data
                                    .overnightRate,
                                earlyCheckInFee: roomNames?.find((item) => item?.value == e.toString()).data
                                    .earlyCheckInFee,
                            });
                        }}
                        value={formData.levelRoomName}
                        data={roomNames}
                        label={<div className="font-semibold">Hạng phòng</div>}
                        Typelayout={4}
                    />

                    <InputField
                        name="note"
                        value={formData.note}
                        onChange={(e) => handleInputChange("note", e.target.value)}
                        className="md:col-span-1 col-span-2"
                        label="Ghi chú"
                    />
                    <ImgMutilUploadComp />
                </div>
                <div>
                    <div className="mb-4 p-4 bg-gray-100 border border-gray-300 rounded-md">
                        <div className="flex justify-between items-center gap-3">
                            <span className="text-gray-700 ">Phòng sẽ được áp dụng theo giá của hạng phòng:</span>
                            <i className="fas fa-pen text-gray-500"></i>
                        </div>
                        <ul className="list-disc list-inside mt-3 text-gray-700 flex flex-col gap-3">
                            <li>Giá giờ: {FormatMoney(formData?.hourlyRate)}</li>
                            <li>Giá cả ngày: {FormatMoney(formData?.dailyRate)}</li>
                            <li>Giá qua đêm: {FormatMoney(formData?.overnightRate)}</li>
                            <li>Phụ thu quá giờ: {FormatMoney(formData?.earlyCheckInFee)}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="p-4 flex items-center gap-2 justify-end  ">
                <Button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white p-2 rounded-md flex items-center gap-1 text-sm font-normal"
                >
                    <SaveOutlined />
                    Thêm mới
                </Button>
                <Button className="bg-red-600 text-white p-2 rounded-md flex items-center gap-1 text-sm font-normal">
                    <StopOutlined />
                    Hủy
                </Button>
            </div>
        </>
    );
};

export default RoomForm;
