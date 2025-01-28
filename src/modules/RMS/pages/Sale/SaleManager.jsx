import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Table,
  Tag,
  Modal,
  notification,
  Popconfirm,
} from "antd";
import { faker } from "@faker-js/faker";
import { FormatDateJsonPro } from "../../../../Utils";
import Dashboard from "./Dashboard";
import {
  EyeOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ReactApexChart from "react-apexcharts";

export const SaleManager = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Tạo dữ liệu mẫu với faker
  const generateSampleData = () => {
    const employees = [
      "Nguyễn Văn A",
      "Trần Thị B",
      "Phạm Văn C",
      "Lê Thị D",
      "Hoàng Văn E",
    ];

    const data = Array.from({ length: 10 }, (_, key) => ({
      key,
      customerName: faker.name.fullName(),
      phoneNumber: faker.phone.number("0#########"),
      email: faker.internet.email(),
      checkInDate: faker.date.soon().toISOString().split("T")[0],
      checkOutDate: faker.date.soon(7).toISOString().split("T")[0],
      roomCount: faker.number.int({ min: 1, max: 5 }),
      guestCount: faker.number.int({ min: 1, max: 10 }),
      customerPrice: faker.number.bigInt({ min: 500000, max: 5000000 }),
      specialRequests: faker.lorem.sentence(),
      createdEmployee:
        employees[faker.number.int({ min: 0, max: employees.length - 1 })],
      status: "Chờ xử lý",
    }));
    setBookingHistory(data);
  };

  useEffect(() => {
    generateSampleData(); // Tạo dữ liệu mẫu khi component được render lần đầu
  }, []);

  const handleApprove = (record) => {
    const updatedHistory = bookingHistory.map((booking) =>
      booking.key === record.key ? { ...booking, status: "Đã duyệt" } : booking
    );
    setBookingHistory(updatedHistory);
    notification.success({
      message: "Đơn đặt phòng đã được duyệt!",
      description: `Đơn của khách hàng ${record.customerName} đã được duyệt.`,
    });
  };

  const handleReject = (record) => {
    const updatedHistory = bookingHistory.map((booking) =>
      booking.key === record.key ? { ...booking, status: "Bị hủy" } : booking
    );
    setBookingHistory(updatedHistory);
    notification.error({
      message: "Đơn đặt phòng bị từ chối!",
      description: `Đơn của khách hàng ${record.customerName} đã bị từ chối.`,
    });
  };

  const showDetailModal = (record) => {
    setSelectedBooking(record); // Lưu thông tin của booking đã chọn
    setIsDetailModalVisible(true); // Hiển thị modal chi tiết
  };

  const hideDetailModal = () => {
    setIsDetailModalVisible(false);
    setSelectedBooking(null); // Xóa thông tin booking đã chọn
  };

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      align: "center",
    },
    {
      title: "Ngày nhận",
      dataIndex: "checkInDate",
      align: "center",
      key: "checkInDate",
      render: (status) => {
        return <div>{FormatDateJsonPro(status, 7)}</div>;
      },
    },
    {
      title: "Ngày trả",
      align: "center",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (status) => {
        return <div>{FormatDateJsonPro(status, 7)}</div>;
      },
    },
    {
      title: "Nhân viên tạo",
      align: "center",
      dataIndex: "createdEmployee",
      key: "createdEmployee",
    },
    {
      title: "Trạng thái",
      align: "center",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "orange";
        if (status === "Đã duyệt") color = "green";
        else if (status === "Bị hủy") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Hành động",
      align: "center",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            className="mr-2 bg-sky-500 hover:bg-sky-600"
            onClick={() => showDetailModal(record)}
          >
            <EyeOutlined />
          </Button>
          {record.status === "Chờ xử lý" && (
            <>
              <Popconfirm
                placement="bottomRight"
                title="Bạn có chắc muốn duyệt đơn này không?"
                onConfirm={() => handleApprove(record)}
                okText="Duyệt"
                cancelText="Hủy"
              >
                <Button
                  type="primary"
                  className="mr-2 bg-green-500 hover:bg-green-600"
                >
                  <CheckCircleOutlined />
                </Button>
              </Popconfirm>
              <Popconfirm
                placement="bottomRight"
                title="Bạn có chắc muốn từ chối đơn này không?"
                onConfirm={() => handleReject(record)}
                okText="Từ chối"
                cancelText="Hủy"
              >
                <Button type="danger" className="bg-red-500 hover:bg-red-600 ">
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </>
          )}
        </>
      ),
    },
  ];

  const customerNewOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
    },
    yaxis: {
      title: {
        text: "Số lượng khách hàng",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} khách hàng`,
      },
    },
  };

  const customerNewSeries = [
    {
      name: "Khách hàng mới",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 175, 200],
    },
  ];

  // Biểu đồ: Khách hàng quen thuộc (hiển thị 5 thông tin khách hàng)
  const regularCustomerOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Minh Hiếu", "Tơ Bít", "Văn Duy", "Trọng Nghĩa", "Tuấn Anh"],
    },
    yaxis: {
      title: {
        text: "Số giao dịch",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} giao dịch`,
      },
    },
  };

  const regularCustomerSeries = [
    {
      name: "Khách hàng quen thuộc",
      data: [10, 15, 25, 30, 20],
    },
  ];

  // Biểu đồ: Sản phẩm bán chạy (hiển thị bar ngang)
  const topProductsOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true, // Biểu đồ ngang
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Mì tôm", "Cocacola", "Pepsi", "Khô bò", "Snack"],
    },
    yaxis: {
      title: {
        text: "Doanh thu",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} đ`,
      },
    },
  };

  const topProductsSeries = [
    {
      name: "Doanh thu",
      data: [1000000, 2000000, 3000000, 4000000, 5000000],
    },
  ];

  return (
    <div className=" bg-gray-100 flex flex-col items-center p-6 space-y-6">
      <Card
        title="Quản lý"
        className="w-full bg-white shadow-md rounded-lg p-4"
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <Card className="w-full" title="Nhân viên yêu cầu">
            <Table
              columns={columns}
              dataSource={bookingHistory}
              pagination={{
                pageSize: 6,
              }}
              className="table-reset shadow-lg"
              scroll={{ x: "max-content" }}
            />
          </Card>

          <Card className="w-full" title="Khách hàng mới">
            <ReactApexChart
              options={customerNewOptions}
              series={customerNewSeries}
              type="bar"
              height={350}
            />
          </Card>
          <Card className="w-full" title="Khách hàng quen thuộc">
            <ReactApexChart
              options={regularCustomerOptions}
              series={regularCustomerSeries}
              type="bar"
              height={350}
            />
          </Card>
          <Card className="w-full" title="Sản phẩm bán chạy">
            <ReactApexChart
              options={topProductsOptions}
              series={topProductsSeries}
              type="bar"
              height={350}
            />
          </Card>
        </div>

       
      </Card>

      {/* Modal xem chi tiết đơn đặt phòng */}
      <Modal
        title="Chi tiết đơn đặt phòng"
        visible={isDetailModalVisible}
        onCancel={hideDetailModal}
        footer={[
          <Button key="close" onClick={hideDetailModal}>
            Đóng
          </Button>,
        ]}
      >
        {selectedBooking && (
          <div>
            <p>
              <strong>Tên khách hàng:</strong> {selectedBooking.customerName}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {selectedBooking.phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {selectedBooking.email}
            </p>
            <p>
              <strong>Ngày nhận phòng:</strong> {selectedBooking.checkInDate}
            </p>
            <p>
              <strong>Ngày trả phòng:</strong> {selectedBooking.checkOutDate}
            </p>
            <p>
              <strong>Số lượng phòng:</strong> {selectedBooking.roomCount}
            </p>
            <p>
              <strong>Số lượng người:</strong> {selectedBooking.guestCount}
            </p>
            <p>
              <strong>Giá khách trả:</strong> {selectedBooking.customerPrice}{" "}
              VND
            </p>
            <p>
              <strong>Yêu cầu đặc biệt:</strong>{" "}
              {selectedBooking.specialRequests || "Không có"}
            </p>
            <p>
              <strong>Nhân viên tạo:</strong> {selectedBooking.createdEmployee}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};
