import React, { useState } from "react";
import { DeleteOutlined, PlusOutlined, SaveOutlined, StopOutlined } from "@ant-design/icons";
import { Button, Collapse, Modal, notification } from "antd";
import InputField from "../../common/InputField";
import SelectInput from "../../common/SelectInput";
import ImgMutilUploadComp from "../../common/ImgMultiUpload";
import { FormatMoney, FormatNumber } from "../../utils";

const GoodsForm = ({ onSave = () => {} }) => {
    const [isShow, setIsShow] = useState(false);
    const [formData, setFormData] = useState({
        ProductName: "",
        ProductGroup: "",
        CostSold: 0,
        Inventory: 0,
        Position: "",
        Price: 0,
        ProductType: "Hàng hóa",
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
            Inventory: 0,
            Price: 0,
        });
    };

    const ClearDataGroup = () => {
        setFormDataGroup({
            ProductGroup: "",
        });
    };

    const UnitPrice = [
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

    const Attribute = [
        {
            key: "1",
            label: "Thuộc tính (Màu sắc, kích thước,...)",
            children: (
                <div>
                    <div className=" grid grid-cols-7 gap-2 mb-4">
                        <SelectInput className="col-span-2" />
                        <InputField className="col-span-4 " placeholder={"Nhập giá trị"} />
                        <div className="col-span-1 place-content-end">
                            <DeleteOutlined />
                        </div>
                    </div>
                    <Button variant="solid">
                        <PlusOutlined /> Thêm thuộc tính
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 flex-wrap gap-x-4 gap-y-4 mb-2 ">
                <InputField
                    className="col-span-2"
                    label="Tên hàng hóa"
                    name="ProductName"
                    value={formData.ProductName}
                    onChange={(e) => handleInputChange("ProductName", e.target.value)}
                />
                <InputField
                    className="md:col-span-1 col-span-2"
                    label="Giá vốn"
                    type="text"
                    name="CostSold"
                    value={formData.CostSold}
                    onChange={(e) => handleInputChange("CostSold", FormatMoney(e.target.value))}
                />

                <div className="flex items-center gap-8 col-span-2">
                    <SelectInput
                        className="w-full"
                        label={<div className="font-semibold">Nhóm hàng</div>}
                        Typelayout={4}
                        data={group}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                ProductGroup: e,
                            });
                        }}
                        value={formData.ProductGroup}
                        suffixIconOther={<PlusOutlined onClick={() => setIsShow(true)} className="ml-2 shadow-xl " />}
                    />
                </div>

                <InputField
                    className="md:col-span-1 col-span-2"
                    label="Tồn kho"
                    type="text"
                    name="Inventory"
                    value={formData.Inventory}
                    onChange={(e) => handleInputChange("Inventory", FormatNumber(e.target.value))}
                />

                <InputField
                    className="col-span-2"
                    label="Vị trí"
                    name="Position"
                    value={formData.Position}
                    onChange={(e) => handleInputChange("Position", e.target.value)}
                />

                <InputField
                    className="md:col-span-1 col-span-2"
                    label="Giá bán"
                    type="text"
                    name="Price"
                    value={formData.Price}
                    onChange={(e) => handleInputChange("Price", FormatMoney(e.target.value))}
                />

                <div className=" col-span-2">
                    <ImgMutilUploadComp />
                </div>
            </div>
            <div className="flex flex-col gap-3 py-2">
                <div>
                    <Collapse accordion items={Attribute} />
                </div>

                <div>
                    <Collapse accordion items={UnitPrice} />
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

            <Modal
                open={isShow}
                onCancel={() => setIsShow(false)}
                width={600}
                footer={null}
                title={<h2 className="text-xl font-semibold">Thêm mới nhóm hàng</h2>}
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

export default GoodsForm;
