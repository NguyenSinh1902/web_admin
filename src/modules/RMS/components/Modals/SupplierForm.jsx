import React, { useState } from "react";
import { Form, Input, Button, Select, Row, Col, notification, Modal } from "antd";
import { SaveOutlined, CloseOutlined, PlusCircleOutlined, StopOutlined } from "@ant-design/icons";
import InputField from "../../common/InputField";
import { SelectCity } from "../../common/SelectCity";
import { SelectDistrict } from "../../common/SelectDistrict";
import { SelectWard } from "../../common/SelectWard";
import SelectInput from "../../common/SelectInput";

const { Option } = Select;

const SupplierForm = ({ onSave = () => {} }) => {
    const [formData, setFormData] = useState({
        SupplierName: "",
        Email: "",
        CompanyName: "",
        TaxCode: "",
        Address: "",
        CityId: -1,
        DistrictId: -1,
        WardId: -1,
        CityName: "",
        DistrictName: "",
        WardName: "",
        PhoneNumber: "",
        SGroup: "",
        Note: "",
    });
    const [isShowGroupSupplier, setIsShowGroupSupplier] = useState(false);

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
            SupplierType: "personal",
            TaxCode: "",
            SupplierName: "",
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
            SupplierGroup: "",
            Note: "",
        });
    };

    const ClearDataGroup = () => {
        setFormDataGroup({
            GroupName: "",
        });
    };
    return (
        <div className="flex items-center justify-center  bg-gray-100 ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full ">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <InputField
                                required
                                TypeLayout={3}
                                label={"Tên nhà cung cấp"}
                                name="SupplierName"
                                value={formData.SupplierName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <InputField
                                TypeLayout={3}
                                label={"Tên công ty"}
                                name="CompanyName"
                                value={formData.CompanyName}
                                onChange={handleChange}
                            />
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
                                label={"Địa chỉ"}
                                name="Address"
                                value={formData.Address}
                                onChange={handleChange}
                            />
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
                                label={"Nhóm nhà cung cấp"}
                                Typelayout={2}
                                data={group}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        SupplierGroup: e,
                                    });
                                }}
                                value={formData.SupplierGroup}
                                suffixIconOther={
                                    <PlusCircleOutlined
                                        onClick={() => setIsShowGroupSupplier(true)}
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
                open={isShowGroupSupplier}
                onCancel={() => setIsShowGroupSupplier(false)}
                width={600}
                footer={null}
                title={<h2 className="text-xl font-semibold">Thêm mới nhóm nhà cung cấp</h2>}
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
};

export default SupplierForm;
{
    /* <Form form={form} layout="vertical">
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Mã nhà cung cấp" name="supplierCode">
              <Input defaultValue="Mã mặc định" />
            </Form.Item>
            <Form.Item label="Tên nhà cung cấp" name="supplierName">
              <Input />
            </Form.Item>
            <Form.Item label="Điện thoại" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Khu vực" name="region">
              <Select placeholder="Chọn Tỉnh/TP - Quận/Huyện">
                <Option value="area1">Khu vực 1</Option>
                <Option value="area2">Khu vực 2</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Phường xã" name="ward">
              <Select placeholder="Chọn Phường/Xã">
                <Option value="ward1">Phường xã 1</Option>
                <Option value="ward2">Phường xã 2</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Công ty" name="company">
              <Input />
            </Form.Item>
            <Form.Item label="Mã số thuế" name="taxCode">
              <Input />
            </Form.Item>
            <Form.Item label="Nhóm NCC" name="supplierGroup">
              <Input />
            </Form.Item>
            <Form.Item label="Ghi chú" name="note">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end mt-6">
          <Button
            type="primary"
            icon={<SaveOutlined />}
            className="mr-2"
            htmlType="submit"
          >
            Lưu
          </Button>
          <Button icon={<CloseOutlined />} htmlType="button">
            Bỏ qua
          </Button>
        </div>
      </Form> */
}
