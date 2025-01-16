import { Input, Radio, Button, Modal, notification } from "antd";
import InputField from "./InputField";
import SelectInput from "./SelectInput";
import { SelectCity } from "./SelectCity";
import { SelectDistrict } from "./SelectDistrict";
import { SelectWard } from "./SelectWard";
import { useState } from "react";
import { PlusCircleOutlined, SaveOutlined, StopOutlined } from "@ant-design/icons";

function CustomerForm({ onSave = () => {} }) {
    const [formData, setFormData] = useState({
        CustomerType: "personal",
        TaxCode: "",
        CustomerName: "",
        BirthDate: "",
        Address: "",
        Gender: "Nam",
        CityId: -1,
        DistrictId: -1,
        WardId: -1,
        CityName: "",
        DistrictName: "",
        WardName: "",
        Email: "",
        PhoneNumber: "",
        CustomerGroup: "",
        Note: "",
    });
    const [isShowGroupCustomer, setIsShowGroupCustomer] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        if (onSave) {
            onSave(formData);
        }
        notification.success({
            message: "Thêm thành công!",
        });
        ClearData();
    };

    // #region nhóm khách hàng
    const [formDataGroup, setFormDataGroup] = useState({
        GroupName: "",
    });
    const [group, setGroup] = useState([]);
    const handleSaveGroup = () => {
        setGroup((prevState) => [...prevState, { value: formDataGroup.GroupName, label: formDataGroup.GroupName }]);
        notification.success({
            message: "Thêm thành công!",
        });
        ClearDataGroup();
    };

    const handleInputGroupChange = (name, value) => {
        setFormDataGroup((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const ClearData = () => {
        setFormData({
            CustomerType: "personal",
            TaxCode: "",
            CustomerName: "",
            BirthDate: "",
            Address: "",
            Gender: "Nam",
            CityId: -1,
            DistrictId: -1,
            WardId: -1,
            CityName: "",
            DistrictName: "",
            WardName: "",
            Email: "",
            PhoneNumber: "",
            CustomerGroup: "",
            Note: "",
        });
    };

    const ClearDataGroup = () => {
        setFormDataGroup({
            GroupName: "",
        });
    };
    // #endregion
    return (
        <div className="flex items-center justify-center  bg-gray-100 ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full ">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-center gap-2 items-center col-span-2">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <i className="fas fa-user text-4xl text-gray-400"></i>
                        </div>
                        <button className="text-gray-500">
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div className="md:col-span-1 col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-4">Loại khách</label>
                            <div>
                                <Radio.Group
                                    defaultValue="personal"
                                    value={formData.CustomerType}
                                    onChange={(e) => handleSelectChange("CustomerType", e.target.value)}
                                >
                                    <Radio value="personal">Cá nhân</Radio>
                                    <Radio value="enterprise">Doanh nghiệp</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <div>
                            <InputField
                                TypeLayout={3}
                                label={"Mã số thuế"}
                                name="TaxCode"
                                value={formData.TaxCode}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <InputField
                                required
                                TypeLayout={3}
                                label={"Tên khách hàng"}
                                name="CustomerName"
                                value={formData.CustomerName}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <InputField
                                TypeLayout={3}
                                type="date"
                                label={"Ngày sinh"}
                                name="BirthDate"
                                value={formData.BirthDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <InputField
                                required
                                TypeLayout={3}
                                label={"Địa chỉ"}
                                name="Address"
                                value={formData.Address}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-4">Giới tính</label>
                            <div>
                                <Radio.Group
                                    defaultValue="Nam"
                                    value={formData.Gender}
                                    onChange={(e) => handleSelectChange("Gender", e.target.value)}
                                >
                                    <Radio value="Nam">Nam</Radio>
                                    <Radio value="Nữ">Nữ</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <div>
                            <SelectCity
                                isRequired={true}
                                LocationId={formData.CityId}
                                label="Tỉnh/TP"
                                onSelected={(e) => {
                                    setFormData({
                                        ...formData,
                                        CityName: e.label,
                                    });
                                    handleSelectChange("CityId", e.value);
                                }}
                            />
                        </div>
                        <div>
                            <SelectDistrict
                                isRequired={true}
                                LocationId={formData?.DistrictId}
                                CountryId={formData?.CityId}
                                label="Quận/huyện"
                                onSelected={(e) => {
                                    setFormData({
                                        ...formData,
                                        DistrictName: e.label,
                                    });
                                    handleSelectChange("DistrictId", e.value);
                                }}
                            />
                        </div>
                        <div>
                            <SelectWard
                                isRequired={true}
                                label="Phường/xã"
                                LocationId={formData?.WardId}
                                CountryId={formData?.DistrictId}
                                onSelected={(e) => {
                                    setFormData({
                                        ...formData,
                                        WardName: e.label,
                                    });
                                    handleSelectChange("WardId", e.value);
                                }}
                            />
                        </div>
                        <div>
                            <div>
                                <InputField
                                    required
                                    TypeLayout={3}
                                    label={"Email"}
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <InputField
                                required
                                TypeLayout={3}
                                label={"Điện thoại"}
                                name="PhoneNumber"
                                value={formData.PhoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <SelectInput
                                className="w-full"
                                label={"Nhóm khách hàng"}
                                Typelayout={2}
                                data={group}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        CustomerGroup: e,
                                    });
                                }}
                                value={formData.CustomerGroup}
                                suffixIconOther={
                                    <PlusCircleOutlined
                                        onClick={() => setIsShowGroupCustomer(true)}
                                        className="ml-2 shadow-xl "
                                    />
                                }
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
                            <Input.TextArea rows={3} placeholder="Nhập ghi chú..." />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Thư viện ảnh</label>
                            <div className="mt-1 flex space-x-2">
                                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                                    <i className="fas fa-image text-gray-400"></i>
                                </div>
                                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                                    <i className="fas fa-image text-gray-400"></i>
                                </div>
                                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                                    <i className="fas fa-image text-gray-400"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">File tải lên</label>
                            <div className="mt-1 flex items-center">
                                <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    Chọn file
                                </button>
                                <span className="ml-2 text-sm text-gray-500">Tối đa 3 files, mỗi file {"<"} 5MB</span>
                            </div>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <label>Khách hàng đồng thời là khách lưu trú</label>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <Button
                        type="primary"
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Bỏ qua
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        className="px-4 py-2  text-white rounded-md shadow-sm text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Lưu
                    </Button>
                </div>
            </div>
            <Modal
                open={isShowGroupCustomer}
                onCancel={() => setIsShowGroupCustomer(false)}
                width={600}
                footer={null}
                title={<h2 className="text-xl font-semibold">Thêm mới nhóm khách hàng</h2>}
            >
                <div className="gap-x-4 gap-y-4 mb-2 p-4">
                    <InputField
                        className="col-span-2"
                        label="Tên nhóm"
                        name="GroupName"
                        value={formDataGroup.GroupName}
                        onChange={(e) => handleInputGroupChange("GroupName", e.target.value)}
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
}

export default CustomerForm;
