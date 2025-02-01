import React, { useState, useEffect } from "react";
import {
  PlusOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
  SearchOutlined,
  PrinterOutlined,
  ControlOutlined,
  EditOutlined,
  CheckOutlined,
  UploadOutlined,
  FormOutlined,
  CreditCardTwoTone,
} from "@ant-design/icons";
import { Tabs, Button, Input, Segmented, Tooltip } from "antd";
import InputField from "../../common/InputField";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import ModalComp from "../../common/ModalComp";

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

  const [isShowImportGoods, setIsShowImportGoods] = useState(false);

  const [isShowCard, setIsShowCard] = useState(false);

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
    navigate("/rms/return-goods");
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
            <h2 className="text-lg">Trả hàng nhập</h2>
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
          <div className="flex">
            <InputField className="w-full" placeholder="Tìm nhà cung cấp" />
            <PlusOutlined onClick={() => setIsShowImportGoods(true)} />
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
            <label className="font-semibold">Tổng tiền hàng</label>
            <div>0</div>
          </div>
          <div className="form-group flex items-center justify-between gap-4 text-sm">
            <label className="font-semibold">Giảm giá</label>
            <div>0</div>
          </div>
          <div className="form-group flex items-center justify-between gap-4 text-sm">
            <label className="font-semibold">Chi phí nhập hoàn lại</label>
            <div>0</div>
          </div>
          <div className="form-group flex items-center justify-between gap-4 text-sm">
            <label className="font-semibold">Nhà cung cấp cần trả</label>
            <div>0</div>
          </div>
          <div className="form-group flex items-center justify-between gap-4 text-sm">
            <label className="font-semibold">Tiền nhà cung cấp cần trả</label>
            <div>0</div>
          </div>
          <div className="form-group flex items-center justify-between gap-4 text-sm">
            <label className="font-semibold">Tính vào công nợ</label>
            <CreditCardTwoTone className="-ml-60" style={{ fontSize: "25px" }} onClick={() => setIsShowCard(true)} />
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
          <ModalComp
            isOpen={isShowImportGoods}
            onClose={() => setIsShowImportGoods(false)}
            width={900}
            title="Thêm nhà cung cấp"
          >
            <div className="grid grid-cols-2 gap-x-10 gap-y-4 mb-2 p-4">
              <InputField className="col-span-1 " label="Mã nhà cung cấp" name="FullName" />
              <InputField className="col-span-1 " label="Email" name="Note" />
              <InputField className="col-span-1 " label="Tên nhà cung cấp" name="FullName" />
              <InputField className="col-span-1 " label="Công ty" name="Note" />
              <InputField className="col-span-1 " label="Điện thoại" name="Phone" />
              <InputField className="col-span-1 " label="Mã số thuế" name="Note" />
              <InputField className="col-span-1 " label="Địa chỉ" name="Address" />
              <InputField className="col-span-1 " label="Nhóm NCC" name="Note" />
              <InputField className="col-span-1 " label="Khu vực" name="Area" placeholder="Chọn Tỉnh/TP - Quận/Huyện" />
              <InputField className="col-span-1 " label="Ghi chú" name="Note" />
              <InputField className="col-span-1 " label="Phường xã" name="Ward" placeholder="Chọn Phường/Xã" />
            </div>
          </ModalComp>
          <ModalComp isOpen={isShowCard} onClose={() => setIsShowCard(false)} width={500} title="Tiền nhà cung cấp trả">
            <div>
              <InputField label="Thanh toán" />
              <div className="flex gap-3 justify-center mt-6">
                <Button className="bg-green-600 text-white">Tiền mặt</Button>
                <Button className="bg-green-600 text-white">Tiền mặt</Button>
                <Button className="bg-green-600 text-white">Chuyển khoản</Button>
              </div>
              <div className="form-group flex items-center justify-between gap-4 text-sm mt-6 mb-5">
                <label className="font-semibold">Nhà cung cấp cần trả</label>
                <div>0</div>
              </div>
              <hr />
              <div className="form-group flex items-center justify-between gap-4 text-sm mt-3 mb-5">
                <label className="font-semibold">Tiền nhà cung cấp cần trả</label>
                <div>0</div>
              </div>
            </div>
          </ModalComp>
        </div>
      </div>
    </div>
  );
};

export default ReturnGoodsForm;
