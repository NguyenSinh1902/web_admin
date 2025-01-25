import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Image,
  Dropdown,
  Menu,
  Space,
  Typography,
  Card,
  Drawer,
  Divider,
  Col,
  Select,
  Radio,
  Row,
  Table,
  DatePicker,
  Modal,
} from "antd";
import {
  PlusCircleOutlined,
  SearchOutlined,
  DownOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import InputField from "../../common/InputField";
import { FormatMoney } from "../../../../commons";
import { WaitingConfirmation } from "../../components/Modals/WaitingConfirmation";
import { GuestStaying } from "../../components/Modals/GuestStaying";
import { RoomStatusList } from "../../components/Modals/RoomStatusList";
import { ReceptionReport } from "../../components/Modals/ReceptionReport";
import CustomerForm from "../../common/CustomerForm";
import { CreateReceipt } from "../../components/Modals/CreateReceipt";
import { EndOfDayReport } from "../../components/Modals/EndOfDayReport";

const { Option } = Select;

//#region main content

const MainContent = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const initialTagsData = [
    {
      id: 1,
      color: "white",
      tag: "Dịch vụ",
      isActive: false,
    },
    {
      id: 2,
      color: "white",
      tag: "Đồ ăn",
      isActive: false,
    },
    {
      id: 3,
      color: "white",
      tag: "Đồ uống",
      isActive: false,
    },
  ];

  const services = [
    { id: 1, categoryId: 1, name: "Câu cá", price: 1000000 },
    { id: 2, categoryId: 1, name: "Đánh golf", price: 1000000 },
    { id: 3, categoryId: 1, name: "Trông trẻ", price: 1000000 },
    { id: 4, categoryId: 1, name: "Thuê ô tô", price: 1000000 },
    { id: 5, categoryId: 3, name: "Bia Heneiken", price: 1000000 },
    { id: 6, categoryId: 3, name: "Bia Hà Nội", price: 1000000 },
    { id: 7, categoryId: 3, name: "Coca-cola", price: 1000000 },
    { id: 8, categoryId: 2, name: "Khô bò", price: 1000000 },
    { id: 9, categoryId: 2, name: "Mì tôm", price: 1000000 },
  ];
  const [tagsData, setTagsData] = useState(initialTagsData);
  const handleButtonClick = (clickedItem) => {
    setTagsData((prevTagsData) =>
      prevTagsData.map((item) =>
        item.tag === clickedItem.tag
          ? { ...item, isActive: !item.isActive }
          : item
      )
    );
  };
  const activeCategoryIds = tagsData
    .filter((tag) => tag.isActive)
    .map((tag) => tag.id);

  const filteredServices = activeCategoryIds.length
    ? services.filter((service) =>
        activeCategoryIds.includes(service.categoryId)
      )
    : services;
  const handleCardClick = (service) => {
    setSelectedServices((prevSelected) => {
      const existingService = prevSelected.find(
        (item) => item.id === service.id
      );
      if (existingService) {
        // Nếu dịch vụ đã có, không thêm lại
        return prevSelected;
      } else {
        // Nếu dịch vụ chưa có, thêm vào với số lượng mặc định là 1
        return [...prevSelected, { ...service, quantity: 1 }];
      }
    });
  };
  const handleIncreaseQuantity = (serviceId) => {
    setSelectedServices((prevSelected) =>
      prevSelected.map((item) =>
        item.id === serviceId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const handleDecreaseQuantity = (serviceId) => {
    setSelectedServices((prevSelected) =>
      prevSelected.map((item) =>
        item.id === serviceId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveService = (serviceId) => {
    setSelectedServices((prevSelected) =>
      prevSelected.filter((item) => item.id !== serviceId)
    );
  };
  return (
    <div className="flex space-x-4">
      <div className="w-1/4 bg-white p-4 rounded shadow space-y-2 md:block hidden">
        {/* Category Buttons */}
        <Input
          size="large"
          prefix={<SearchOutlined />}
          placeholder="Tìm theo tên, mã hàng hóa"
          className="mb-4"
        />
        <div className="space-x-2 mb-3">
          {tagsData.map((item, index) => (
            <span
              key={index}
              className={`rounded-full space-x-2 cursor-pointer py-1 px-4 border  ${
                item.isActive
                  ? `bg-orange-500 text-white  border-${item.color}-500`
                  : `bg-${item.color}-50 text-black border-${item.color}-50`
              }`}
              onClick={() => handleButtonClick(item)}
            >
              <span className="text-sm font-medium">{item.tag}</span>
            </span>
          ))}
        </div>
        {/* Service Items List */}
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => handleCardClick(service)}
              className="flex items-center space-x-2 border rounded-md p-2 hover:shadow-lg transition-shadow duration-300 gap-4 cursor-pointer"
            >
              <Image
                src={"/assets/img/showimg.png"}
                alt={service.name}
                width={50}
                height={50}
                className="rounded-md border"
              />
              <div>
                <p className="font-semibold text-base">{service.name}</p>
                <p className="text-gray-500 text-xs">
                  {FormatMoney(service.price)} đ
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Card className="w-3/4 bg-white p-4 grow">
        <div className="p-4 bg-white rounded-lg shadow-md  relative">
          <div className="grid grid-cols-12 font-semibold border-b pb-2 mb-2 text-sm">
            <div className="col-span-1">STT</div>
            <div className="col-span-7">Tên</div>
            <div className="col-span-1 text-center">Số lượng</div>
            <div className="col-span-1 text-right">Đơn giá</div>
            <div className="col-span-1 text-right">Thành tiền</div>
          </div>
          <div style={{ height: "400px" }} className=" overflow-auto mb-12">
            <div className="grid grid-cols-1 gap-3">
              {selectedServices.map((item, index) => (
                <div className="grid grid-cols-12  p-4  rounded-md border-[1px] text-sm hover:shadow-md hover:border-blue-600 shadow-md cursor-pointer group">
                  <div className="col-span-1">{index + 1}</div>
                  <div className="col-span-7 font-semibold">{item?.name}</div>
                  <div className="col-span-1 text-center flex items-center gap-2">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className={`px-2 text-black rounded-full border hover:bg-green-500 hover:text-white opacity-0 group-hover:opacity-100`}
                    >
                      -
                    </button>
                    <div className="text-center w-8">{item.quantity}</div>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className={`px-2 text-black rounded-full border hover:bg-green-500 hover:text-white opacity-0 group-hover:opacity-100`}
                    >
                      +
                    </button>
                  </div>
                  <div className="col-span-1 text-right">
                    {FormatMoney(item?.price)}
                  </div>
                  <div className="col-span-1 text-right">
                    {FormatMoney(item?.price * item?.quantity)}
                  </div>
                  <div className="col-span-1 text-right">
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item
                            key="1"
                            onClick={() => handleRemoveService(item.id)}
                          >
                            Xóa
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <EllipsisOutlined className="cursor-pointer" />
                    </Dropdown>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute z-10 bg-white  left-0 right-0 bottom-0 grid grid-cols-12  p-4  rounded-md border-[1px] text-sm  shadow-md ">
            <div className="col-span-1"></div>
            <div className="col-span-5 font-semibold"></div>
            <div className="col-span-2 text-center"></div>
            <div className="col-span-2 text-right font-semibold text-sm text-blue-600">
              Tổng tiền
            </div>
            <div className="col-span-1 text-right font-semibold text-blue-600">
              {FormatMoney(
                selectedServices.reduce((a, b) => a + b.price * b.quantity, 0)
              )}
            </div>
            <div className="col-span-1 text-right font-semibold text-blue-600"></div>
          </div>{" "}
        </div>
      </Card>
    </div>
  );
};

export const Invoices = () => {
  const [visible, setVisible] = useState(false);
  const [modalWaitingConfirm, setModalWaitingConfirm] = useState(false); //modal chờ xác nhận
  const [modalRoom, setModalRoom] = useState(false); //buồng phòng
  const [modalGuestsStaying, setModalGuestsStaying] = useState(false); //modal khách lưu trú
  const [modalCreateReceipt, setModalCreateReceipt] = useState(false); //modal lập phiếu thu
  const [modalReceptionReport, setModalReceptionReport] = useState(false); //modal báo cáo lễ tân
  const [modalEndOfDayReport, setModalEndOfDayReport] = useState(false); //modal báo cáo cuối ngày
  const [startDate, setStartDate] = useState(new Date());
  const [isModalOpenCustomer, setIsModalOpenCustomer] = useState(false);

  const handleOkCustomer = () => {
    setIsModalOpenCustomer(false);
  };
  const handleCancelCustomer = () => {
    setIsModalOpenCustomer(false);
  };

  const dataSource = [
    {
      key: "1",
      roomType: "VIP",
      duration: "2 Ngày",
      price: "2300000",
      oldPrice: "2500000",
      total: "4600000",
    },
  ];

  // Columns for the table on the left
  const columns = [
    {
      title: "Thông tin phòng",
      dataIndex: "roomType",
      key: "roomType",
      align: "center",
    },
    {
      title: "Thời gian",
      dataIndex: "duration",
      key: "duration",
      align: "center",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      align: "center",

      render: (text, record) => (
        <>
          <span>{FormatMoney(record.price)}</span>
        </>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (text, record) => (
        <>
          <span>{FormatMoney(record.total)}</span>
        </>
      ),
    },
  ];
  return (
    <div
      style={{ height: "calc(100vh - 87px)" }}
      className="bg-gray-100 flex flex-col "
    >
      {/* <HeaderMenu
        openModalWaitingConfirm={setModalWaitingConfirm}
        openModalRoom={setModalRoom}
        openModalGuestsStaying={setModalGuestsStaying}
        openModalReceptionReport={setModalReceptionReport}
        openModalCreateReceipt={setModalCreateReceipt}
        openModalEndOfDayReport={setModalEndOfDayReport}
      /> */}
      <div className="">
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-8">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <Typography.Text className="text-gray-500">
                Khách hàng
              </Typography.Text>
              <Input type="text" placeholder="Tên khách hàng" />
            </div>
            <PlusCircleOutlined
              onClick={() => setIsModalOpenCustomer(true)}
              className="text-gray-500 hover:bg-gray-200 rounded-full cursor-pointer"
            />
          </div>

          <Space className="flex items-center space-x-2">
            <SearchOutlined className="text-gray-500" />
            <Typography.Text className="text-gray-900">Agoda</Typography.Text>
            <DownOutlined className="text-gray-500" />
          </Space>

          <div className="flex flex-col">
            <Typography.Text className="text-gray-500">Ghi chú</Typography.Text>
            <Typography.Text className="text-gray-900">
              Chưa có ghi chú
            </Typography.Text>
          </div>

          <div className="ml-auto">
            <PlusCircleOutlined className="text-gray-500" />
          </div>
        </div>
      </div>
      <main className="py-4 flex flex-col grow">
        <MainContent />
        <div className="mt-4">
          <div className=" bg-white  flex items-center justify-end gap-3 p-4  rounded-lg border-[1px] text-sm  shadow-md ">
            {/* <Button className="bg-green-700 font-semibold text-white p-2 h-auto">
              Nhận phòng
            </Button>
            <Button className="bg-orange-600 font-semibold text-white p-2 h-auto">
              Đặt trước
            </Button> */}
            <Button
              onClick={() => setVisible(true)}
              className="bg-blue-600 font-semibold text-white p-2 h-auto"
            >
              Thanh toán
            </Button>
          </div>
        </div>
        {/* Additional content for the main area can be added here */}
      </main>
      <Drawer
        title={<div className="text-base ">Thanh toán </div>}
        width={window.innerWidth > 1100 ? 1200 : "100%"}
        placement="right"
        footer={
          <div className="flex items-center gap-2 justify-end">
            <Button className="bg-green-700 font-semibold text-white">
              Nhận phòng
            </Button>
            <Button className="bg-orange-600 font-semibold text-white">
              Đặt trước
            </Button>
          </div>
        }
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Row gutter={[16, 16]}>
          {/* Left Section */}
          <Col xs={24} md={13}>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              bordered
              className="table-reset"
              summary={() => (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={3}>
                    Tổng tiền hàng
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>4,600,000</Table.Summary.Cell>
                </Table.Summary.Row>
              )}
            />
          </Col>

          <Col xs={24} md={1}>
            <Divider type="vertical" className="h-screen" />
          </Col>

          {/* Right Section */}
          <Col xs={24} md={10}>
            <div className="flex items-center gap-2 mb-4">
              <Select defaultValue="selectemployee" className="w-full">
                <Option value="selectemployee">Chọn nhân viên</Option>
                <Option value="Trung">Nguyễn Văn Duy</Option>
                <Option value="Khác">Hồ Nguyễn Minh Hiếu</Option>
              </Select>
              <DatePicker
                selected={startDate}
                onChange={(date) =>
                  setStartDate(date ? date.toDate() : new Date())
                }
                format="HH:mm, DD/MM/YYYY"
                showTime={{ format: "HH:mm" }}
                className=" font-semibold text-center input-book"
              />
            </div>
            <Divider />

            {/* Flexbox container for 'Tổng tiền', 'Giảm giá', 'Thu khác' */}
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div
                className="gap-4"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <p>Tổng tiền hàng:</p>
                <p>Giảm giá:</p>
                <p>Thu khác:</p>
                <p className="font-semibold">Khách cần trả:</p>
                <p>Khách thanh toán:</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p className="p-2">
                  <strong>4,600,000</strong>
                </p>
                <InputField type="number" />

                <InputField type="number" />
                <p className="mt-3 text-green-700 text-lg">
                  <strong>4,600,000</strong>
                </p>
                <InputField />
              </div>
            </div>

            <Divider />

            <div style={{ marginBottom: "16px" }}>
              <Radio.Group
                defaultValue="Chuyển khoản"
                style={{ marginBottom: "16px" }}
              >
                <Radio value="Tiền mặt">Tiền mặt</Radio>
                <Radio value="Thẻ">Thẻ</Radio>
                <Radio value="Chuyển khoản">Chuyển khoản</Radio>
              </Radio.Group>

              <Select
                placeholder="-Tài khoản nhận-"
                style={{ width: "100%", marginBottom: "16px" }}
              >
                <Option value="account1">Tài khoản 1</Option>
                <Option value="account2">Tài khoản 2</Option>
              </Select>

              <Button type="dashed" block icon={<PlusOutlined />}>
                Thêm tài khoản
              </Button>
            </div>

            <Divider />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <p>
                <strong>4,600,000</strong>
              </p>
              <p>
                <span style={{ textDecoration: "line-through", color: "gray" }}>
                  5,000,000
                </span>
              </p>
            </div>
          </Col>
        </Row>
      </Drawer>
      {/* form chờ xác nhận */}
      <Modal
        open={modalWaitingConfirm}
        width={1000}
        onCancel={() => setModalWaitingConfirm(false)}
        footer={null}
        className="custom-modal"
        title={<h2 className="text-xl font-semibold">Chờ xác nhận</h2>}
      >
        <WaitingConfirmation visible={true} />
      </Modal>
      {/* end */}

      {/* form statuslist */}
      <Drawer
        title={<div className="text-base">Trạng thái buồng phòng </div>}
        // width={window.innerWidth > 1100 ? 1200 : "100%"}
        placement="right"
        footer={
          <div className="flex items-center gap-2 justify-end">
            <Button className="bg-green-700 font-semibold text-white">
              Làm sạch
            </Button>
          </div>
        }
        open={modalRoom}
        onClose={() => setModalRoom(false)}
      >
        <RoomStatusList />
      </Drawer>
      {/* end */}

      {/* Khách lưu trú */}
      <Modal
        open={modalGuestsStaying}
        width={1200}
        onCancel={() => setModalGuestsStaying(false)}
        footer={null}
        className="custom-modal"
        title={<h2 className="text-lg font-semibold">Khách lưu trú</h2>}
      >
        <GuestStaying />
      </Modal>
      {/* end */}

      {/* modal khách hàng */}
      <Modal
        width={900}
        title="Thêm khách hàng"
        open={isModalOpenCustomer}
        onOk={handleOkCustomer}
        footer={<></>}
        onCancel={handleCancelCustomer}
      >
        <CustomerForm />
      </Modal>
      {/* end */}

      {/* modal báo cáo lễ tân */}
      <Modal
        open={modalReceptionReport}
        width={1200}
        onCancel={() => setModalReceptionReport(false)}
        footer={null}
        className="custom-modal"
        title={<h2 className="text-lg font-semibold">Báo cáo lễ tân</h2>}
      >
        <ReceptionReport />
      </Modal>
      {/* emd */}

      {/* modal lập phiếu thu */}
      <Modal
        open={modalCreateReceipt}
        width={900}
        onCancel={() => setModalCreateReceipt(false)}
        footer={null}
        className="custom-modal"
        title={<h2 className="text-lg font-semibold">Lập phiếu thu</h2>}
      >
        <CreateReceipt />
      </Modal>
      {/* emd */}

      {/* modal lập phiếu thu */}
      <Modal
        open={modalEndOfDayReport}
        width={900}
        onCancel={() => setModalEndOfDayReport(false)}
        footer={null}
        className="custom-modal"
        title={<h2 className="text-lg font-semibold">Báo cáo cuối ngày</h2>}
      >
        <EndOfDayReport />
      </Modal>
      {/* end */}
    </div>
  );
};
