import React, { useState, useEffect } from "react";
import {
  SaveOutlined,
  StopOutlined,
  ArrowLeftOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  PrinterOutlined,
  ControlOutlined,
  EditOutlined,
  CheckOutlined,
  UploadOutlined,
  InfoCircleOutlined,
  CheckSquareOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Modal, Tabs, Button, Input, Segmented, Tooltip, Checkbox } from "antd";
import InputField from "../../common/InputField";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";

const onChange = (key) => {};

const TabContent = ({ children }) => {
  return (
    <div
      className="bg-white p-4 border border-gray-300 flex flex-col items-center justify-center"
      style={{ minHeight: "600px" }}
    >
      {children}
    </div>
  );
};

const items = [
  {
    key: "1",
    label: "Tất cả",
    children: (
      <TabContent>
        <h2 className="text-lg font-semibold mb-2">Thêm sản phẩm từ file Excel</h2>
        <p className="mb-2">
          Xử lý dữ liệu (Tải về File mẫu:{" "}
          <a href="#" className="text-blue-500 underline">
            Excel File
          </a>
          )
        </p>
        <Button className="flex items-center mt-3 bg-green-500 text-white px-5 py-5">
          <UploadOutlined className="mr-2" />
          Chọn file dữ liệu
        </Button>
      </TabContent>
    ),
  },
  {
    key: "2",
    label: "Khớp",
    children: (
      <TabContent>
        <h2 className="text-lg font-semibold mb-2">Thêm sản phẩm từ file Excel</h2>
        <p className="mb-2">
          Xử lý dữ liệu (Tải về File mẫu:{" "}
          <a href="/path/to/excel-file" className="text-blue-500 underline">
            Excel File
          </a>
          )
        </p>
        <Button className="flex items-center mt-3 bg-green-500 text-white px-5 py-5">
          <UploadOutlined className="mr-2" />
          Chọn file dữ liệu
        </Button>
      </TabContent>
    ),
  },
  {
    key: "3",
    label: "Lệch",
    children: (
      <TabContent>
        <h2 className="text-lg font-semibold mb-2">Thêm sản phẩm từ file Excel</h2>
        <p className="mb-2">
          Xử lý dữ liệu (Tải về File mẫu:{" "}
          <a href="/path/to/excel-file" className="text-blue-500 underline">
            Excel File
          </a>
          )
        </p>
        <Button className="flex items-center mt-3 bg-green-500 text-white px-5 py-5">
          <UploadOutlined className="mr-2" />
          Chọn file dữ liệu
        </Button>
      </TabContent>
    ),
  },
  {
    key: "4",
    label: "Chưa kiểm",
    children: (
      <TabContent>
        <h2 className="text-lg font-semibold mb-2">Thêm sản phẩm từ file Excel</h2>
        <p className="mb-2">
          Xử lý dữ liệu (Tải về File mẫu:{" "}
          <a href="/path/to/excel-file" className="text-blue-500 underline">
            Excel File
          </a>
          )
        </p>
        <Button className="flex items-center mt-3 bg-green-500 text-white px-5 py-5">
          <UploadOutlined className="mr-2" />
          Chọn file dữ liệu
        </Button>
      </TabContent>
    ),
  },
];

const InventoryForm = () => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStartDate(new Date());
    }, 24 * 60 * 60 * 1000); // Cập nhật mỗi 24 giờ

    return () => clearInterval(intervalId); // Xóa interval khi component bị unmount
  }, []);

  const [alignValue, setAlignValue] = React.useState("center");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    all: false,
    services: false,
    food: false,
    drink: false,
    inStock: false,
    inBusiness: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === "all") {
      const newCheckedItems = {
        all: checked,
        services: checked,
        food: checked,
        drink: checked,
        inStock: checked,
        inBusiness: checked,
      };
      setCheckedItems(newCheckedItems);
    } else {
      setCheckedItems((prev) => ({ ...prev, [name]: checked }));
    }
  };

  const handleClearSelection = () => {
    setCheckedItems({
      all: false,
      services: false,
      food: false,
      drink: false,
      inStock: false,
      inBusiness: false,
    });
  };

  const navigate = useNavigate();

  const handleInventoryClick = () => {
    navigate("/rms/check-inventory");
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-2/3 w-full shadow-lg p-2">
        <div className="header-form flex  gap-4">
          <div className="flex gap-5 mt-1 items-center">
            <Button onClick={handleInventoryClick}>
              <ArrowLeftOutlined />
            </Button>
            <div className="text-lg">Kiểm kho</div>
          </div>
          {/* Tìm kiếm */}
          <div className="flex gap-2 items-center justify-between grow">
            <div className="">
              <Input
                size="middle"
                prefix={<SearchOutlined style={{ color: "#777777" }} />}
                placeholder="Tìm hàng hóa theo mã hoặc tên"
                suffix={
                  <Tooltip title="Chọn nhóm hàng" placement="top">
                    <Button
                      style={{
                        color: "#777777",
                        border: "none",
                      }}
                      onClick={() => setIsModalVisible(true)}
                    >
                      <UnorderedListOutlined style={{ fontSize: "12px" }} />
                    </Button>
                  </Tooltip>
                }
                onClick={(e) => e.stopPropagation()}
              />
              <Modal
                title="Chọn nhóm hàng"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={600}
              >
                <InputField placeholder="Tìm kiếm nhóm hàng" style={{ marginBottom: "16px" }} className="mb-4" />

                <div className="flex flex-col mb-4">
                  <Checkbox name="all" checked={checkedItems.all} onChange={handleCheckboxChange} className="mb-2">
                    Tất cả nhóm hàng
                  </Checkbox>

                  <Checkbox
                    name="services"
                    checked={checkedItems.services}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                  >
                    Dịch vụ
                  </Checkbox>

                  <Checkbox name="food" checked={checkedItems.food} onChange={handleCheckboxChange} className="mb-2">
                    Đồ ăn
                  </Checkbox>

                  <Checkbox name="drink" checked={checkedItems.drink} onChange={handleCheckboxChange} className="mb-2">
                    Đồ uống
                  </Checkbox>
                  <hr className="border-gray-300 opacity-50 my-2" />
                  <Checkbox
                    name="inStock"
                    checked={checkedItems.inStock}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                  >
                    Chỉ kiếm hàng còn tồn kho
                    <Tooltip title="Hệ thống sẽ chỉ lấy ra những hàng hóa đang còn kinh doanh trong danh sách nhóm hàng đã chọn">
                      <InfoCircleOutlined className="ml-1" />
                    </Tooltip>
                  </Checkbox>
                  <hr className="border-gray-300 opacity-50 my-2" />
                  <Checkbox
                    name="inBusiness"
                    checked={checkedItems.inBusiness}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                  >
                    Chỉ kiếm hàng đang kinh doanh
                    <Tooltip title="Hệ thống sẽ chỉ lấy ra những hàng hóa đang còn kinh doanh trong danh sách nhóm hàng đã chọn">
                      <InfoCircleOutlined className="ml-1" />
                    </Tooltip>
                  </Checkbox>
                </div>

                <div className="flex items-center my-4 mb-4">
                  <span className="mr-2">Vị trí</span>
                  <Tooltip title="Hệ thống sẽ lấy ra những hàng hóa có vị trí như đang chọn">
                    <InfoCircleOutlined className="mr-7 ml-3" />
                  </Tooltip>
                  <InputField placeholder="Chọn vị trí" style={{ flex: 1 }} />
                </div>

                <div className="flex justify-between mb-4 mt-8">
                  <a onClick={handleClearSelection} className="text-blue-500 cursor-pointer">
                    Xóa chọn tất cả
                  </a>
                  <div>
                    <Button type="primary" className="mr-2" icon={<CheckSquareOutlined />}>
                      Xong
                    </Button>
                    <Button className="bg-gray-300" icon={<StopOutlined />} onClick={() => setIsModalVisible(false)}>
                      Bỏ qua
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
            <div className="gap-2 flex ">
              <Tooltip title="Chế độ nhập">
                <Button className="p-2">
                  <FormOutlined style={{ color: "rgb(84 81 81 / 96%" }} />
                </Button>
              </Tooltip>
              <Tooltip title="Thiết lập in">
                <Button className="p-2">
                  <PrinterOutlined style={{ color: "rgb(84 81 81 / 96%" }} />
                </Button>
              </Tooltip>
              <Tooltip title="Danh sách các phím tắt">
                <Button className="p-2">
                  <ControlOutlined style={{ color: "rgb(84 81 81 / 96%" }} />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="tab-group">
          <Segmented defaultValue="center" style={{ marginBottom: 8 }} onChange={(value) => setAlignValue(value)} />
          <Tabs
            className=" p-2"
            // tabBarGutter={16}
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            indicator={{ size: (origin) => origin - 20, align: alignValue }}
          ></Tabs>
        </div>
      </div>

      <div className="bg-white w-full md:w-1/3 shadow-lg p-4 mr-8">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold"> Nguyễn Văn A</div>
            <div className="">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date ? date.toDate() : new Date())}
                format="HH:mm, DD/MM/YYYY"
                showTime={{ format: "HH:mm" }}
                className=" font-semibold text-center input-book"
              />
            </div>
          </div>
          <div className=" flex items-center justify-between gap-4 text-sm">
            <label className="font-semibold">Mã kiểm kho</label>
            <InputField className="" name="Mã phiếu tự động" placeholder="Mã phiếu tự động" />
          </div>
          <div className="form-group flex items-center justify-between gap-4 text-sm">
            <label className="font-semibold">Trạng thái</label>
            <p>Phiếu tạm</p>
          </div>
          <div className="form-group flex items-center justify-between gap-4 text-sm">
            <label className="font-semibold">Tổng SL thực tế</label>
            <div>0</div>
          </div>
          <div>
            <InputField prefix={<EditOutlined />} placeholder="Ghi chú" />
          </div>
          <div className="bg-white grow flex flex-col ">
            <div className="text-base font-semibold bg-sky-300 p-2">Kiếm gần đây</div>
            <div className="border rounded h-full bg-white grow"></div>
          </div>
          <div className="btn-group flex gap-10 justify-center">
            <Button className="bg-blue-500 text-white  rounded-t-md  hover:bg-blue-600">
              <SaveOutlined className="mr-2" />
              Lưu tạm
            </Button>
            <Button className="bg-green-500 text-white  rounded-md ">
              <CheckOutlined className="mr-2" />
              Hoàn thành
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryForm;
