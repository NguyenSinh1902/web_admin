import React, { useState } from "react";
import { PlusOutlined, SaveOutlined, StopOutlined } from "@ant-design/icons";
import { Button, Collapse, Modal, notification, Tabs } from "antd";
import ModalComp from "../../common/ModalComp";
import InputField from "../../common/InputField";
import SelectInput from "../../common/SelectInput";
import ImgMutilUploadComp from "../../common/ImgMultiUpload";
import { FormatMoney } from "../../utils";

const ServiceForm = ({ onSave = () => {} }) => {
    const [isShow, setIsShow] = useState(false);
    const items = [
        {
            key: "1",
            label: "Đơn vị tính",
            children: (
                <div>
                    <InputField label="Đơn vị cơ bản" />
                </div>
            ),
        },
    ];

    const [formData, setFormData] = useState({
        ProductName: "",
        ProductGroup: "",
        CostSold: 0,
        PriceService: 0,
        Time: "",
        ProductType: "Dịch vụ",
    });

    const [formDataGroup, setFormDataGroup] = useState({
        ProductName: "",
    });
    const [group, setGroup] = useState([]);

    const handleSaveGroup = () => {
        setGroup((prevState) => [...prevState, { value: formDataGroup.ProductName, label: formDataGroup.ProductName }]);
        notification.success({
            message: "Thêm thành công!",
        });
        ClearDataGroup();
    };

    const ClearDataGroup = () => {
        setFormDataGroup({
            ProductGroup: "",
        });
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
            ProductName: "",
            ProductGroup: "",
            CostSold: 0,
            PriceService: 0,
            Time: "",
        });
    };

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleInputGroupChange = (name, value) => {
        setFormDataGroup((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const tabs = ["Thông tin", "Mô tả chi tiết"];

    return (
        <div className="p-4">
            <Tabs
                defaultActiveKey="1"
                items={tabs.map((item, index) => {
                    return {
                        label: item,
                        key: index,
                        children: (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-3 flex-wrap gap-x-4 gap-y-4 mb-2 ">
                                    <InputField
                                        className="col-span-2"
                                        label="Tên dịch vụ"
                                        name="ProductName"
                                        value={formData.ProductName}
                                        onChange={(e) => handleInputChange("ProductName", e.target.value)}
                                    />
                                    <InputField
                                        className="md:col-span-1 col-span-2"
                                        label="Giá vốn"
                                        name="CostSold"
                                        value={formData.CostSold}
                                        onChange={(e) => handleInputChange("CostSold", FormatMoney(e.target.value))}
                                    />

                                    <div className="col-span-2 flex items-end gap-2">
                                        <InputField
                                            className="w-full grow basis-11/12"
                                            label="Thời lượng"
                                            name="Time"
                                            value={formData.Time}
                                            onChange={(e) => handleInputChange("Time", FormatMoney(e.target.value))}
                                        />

                                        <div className="bg-inherit border-gray-400 text-inherit focus:border-black outline-0 text-sm w-14">
                                            / Phút
                                        </div>
                                    </div>

                                    <InputField
                                        className="md:col-span-1 col-span-2"
                                        label="Giá dịch vụ"
                                        name="PriceService"
                                        value={formData.PriceService}
                                        onChange={(e) => handleInputChange("PriceService", FormatMoney(e.target.value))}
                                    />
                                    <div className="flex items-end gap-8 col-span-2">
                                        <SelectInput
                                            className="w-full"
                                            label={<div className="font-semibold">Nhóm dịch vụ</div>}
                                            Typelayout={4}
                                            data={group}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    ProductGroup: e,
                                                });
                                            }}
                                            value={formData.ProductGroup}
                                            suffixIconOther={
                                                <PlusOutlined
                                                    onClick={() => setIsShow(true)}
                                                    className="ml-2 shadow-xl "
                                                />
                                            }
                                        />
                                    </div>
                                    <div className=" col-span-3">
                                        <ImgMutilUploadComp />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Collapse accordion items={items} />
                                </div>
                            </>
                        ),
                    };
                })}
            />
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

            <Modal
                open={isShow}
                onCancel={() => setIsShow(false)}
                width={600}
                footer={null}
                title={<h2 className="text-xl font-semibold">Thêm mới nhóm dịch vụ</h2>}
            >
                <div className="gap-x-4 gap-y-4 mb-2 p-4">
                    <InputField
                        className="col-span-2"
                        label="Tên nhóm"
                        name="ProductName"
                        value={formDataGroup.ProductName}
                        onChange={(e) => handleInputGroupChange("ProductName", e.target.value)}
                    />
                </div>
                <div className="p-4 flex items-center gap-2 justify-end  ">
                    <Button
                        onClick={handleSaveGroup}
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
            </Modal>
        </div>
    );
};

export default ServiceForm;
