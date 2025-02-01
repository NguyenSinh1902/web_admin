import React, { useState, useEffect } from "react";
import {
  SaveOutlined,
  ArrowLeftOutlined,
  SearchOutlined,
  PrinterOutlined,
  ControlOutlined,
  EditOutlined,
  CheckOutlined,
  UploadOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Tabs, Button, Input, Segmented, Tooltip } from "antd";
import InputField from "../../common/InputField";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";

const onChange = (key) => {};

const TabContent = ({ children }) => {
  return (
    <div
      className="bg-white p-4 border border-gray-300 flex flex-col items-center justify-center"
      style={{ minHeight: "450px" }}
    >
      {children}
    </div>
  );
};

const items = [
  {
    key: "1",
    label: "",
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
];

const ReturnGoodsForm = () => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStartDate(new Date());
    }, 24 * 60 * 60 * 1000); // Cập nhật mỗi 24 giờ

    return () => clearInterval(intervalId); // Xóa interval khi component bị unmount
  }, []);

  const [alignValue, setAlignValue] = React.useState("center");

  const [checkedItems, setCheckedItems] = useState({
    all: false,
    services: false,
    food: false,
    drink: false,
    inStock: false,
    inBusiness: false,
  });

  const navigate = useNavigate();

  const handleInventoryClick = () => {
    navigate("/rms/cancellation-slip");
  };

  const handleChange = (value) => {};

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-2/3 w-full shadow-lg p-2">
        <div className="header-form flex  gap-4">
          <div className="flex gap-5 mt-1 items-center">
            <Button onClick={handleInventoryClick}>
              <i>
                <ArrowLeftOutlined />
              </i>
            </Button>
            <h2 className="text-lg">Xuất hủy</h2>
          </div>
          {/* Tìm kiếm */}
          <div className="flex gap-2 items-center justify-between grow">
            <div className="">
              <Input
                size="middle"
                prefix={<SearchOutlined style={{ color: "#777777" }} />}
                placeholder="Tìm hàng hóa theo mã hoặc tên"
              />
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
            <div className="text-sm font-semibold">Dương Quá</div>
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

          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="">Mã phiếu nhập</label>
            <InputField className="" name="Mã phiếu tự động" placeholder="Mã phiếu tự động" />
          </div>
          <div className="form-group flex items-center justify-between gap-4 text-sm">
            <label className="font-semibold">Trạng thái</label>
            <div>Phiếu tạm</div>
          </div>
          <div className="form-group flex items-center justify-between gap-4 text-sm">
            <label className="font-semibold">Tổng giá trị hủy</label>
            <div>0</div>
          </div>
          <div>
            <InputField prefix={<EditOutlined />} placeholder="Ghi chú" />
          </div>
          <div className="btn-group flex gap-10 justify-center">
            <Button className="bg-blue-500 text-white  rounded-t-md  hover:bg-blue-600">
              <SaveOutlined className="mr-2" />
              Lưu tạm
            </Button>
            <Button className="bg-green-500 text-white  rounded-md">
              <CheckOutlined className="mr-2" />
              Hoàn thành
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnGoodsForm;
