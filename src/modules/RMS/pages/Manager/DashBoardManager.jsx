import { useState } from "react";
import { Card, Select } from "antd";
import ReactApexChart from "react-apexcharts";
import moment from "moment"; // Sử dụng moment.js để tính toán ngày
import Notify from "../../components/Notify";
import { GlobalOutlined } from "@ant-design/icons";
const { Option } = Select;

const centersData = {
  Center1: { name: "Center1", totalRooms: 12, rentedRooms: 10 },
  Center2: { name: "Center2", totalRooms: 15, rentedRooms: 8 },
  Center3: { name: "Center3", totalRooms: 10, rentedRooms: 5 },
};

const Dashboard = () => {
  const [selectedCenter, setSelectedCenter] = useState("Center1"); // Trung tâm mặc định
  const [selectedCenterName, setSelectedCenterName] = useState("Center1"); // Trung tâm mặc định
  const [selectedOption, setSelectedOption] = useState("Tháng này");

  const handleCenterChange = (value) => {
    setSelectedCenter(value);
    // Cập nhật dữ liệu biểu đồ khi chọn trung tâm mới
    handleSelectChange(selectedOption);
  };
  
  const handleSelectChange = (value) => {
    setSelectedOption(value);
    let categories = [];
    let seriesData = [];

    if (value === "Tháng này") {
      const daysInMonth = moment().daysInMonth();
      categories = Array.from(
        { length: daysInMonth },
        (_, i) => `${i + 1}/${moment().format("MM")}`
      );
      seriesData = fakeDataForCurrentMonth(daysInMonth); // Dữ liệu giả cho tháng này
    } else if (value === "Tháng trước") {
      const lastMonth = moment().subtract(1, "month");
      const daysInLastMonth = lastMonth.daysInMonth();
      categories = Array.from(
        { length: daysInLastMonth },
        (_, i) => `${i + 1}/${lastMonth.format("MM")}`
      );
      seriesData = fakeDataForCurrentMonth(daysInLastMonth); // Dữ liệu giả cho tháng trước
    } else if (value === "Ngày hiện tại") {
      categories = [moment().format("DD/MM")];
      seriesData = [50]; // Dữ liệu giả cho ngày hiện tại
    } else if (value === "Ngày hôm qua") {
      categories = [moment().subtract(1, "day").format("DD/MM")];
      seriesData = [60]; // Dữ liệu giả cho ngày hôm qua
    } else if (value === "7 ngày trước") {
      categories = Array.from({ length: 7 }, (_, i) =>
        moment()
          .subtract(6 - i, "days")
          .format("DD/MM")
      );
      seriesData = fakeDataForLast7Days(); // Dữ liệu giả cho 7 ngày trước
    }

    setRevenueBarChartOptions((prev) => ({
      ...prev,
      series: [
        {
          name: "Doanh thu",
          data: seriesData,
        },
      ],
      xaxis: {
        categories: categories,
      },
    }));

    setUtilizationLineChartOptions((prev) => ({
      ...prev,
      series: [
        {
          name: "Công suất sử dụng",
          data: calculateUtilizationData(seriesData), // Tính công suất sử dụng từ doanh thu
        },
      ],
      xaxis: {
        categories: categories,
      },
    }));
  };

  // Hàm tạo dữ liệu giả cho doanh thu hàng tháng
  const fakeDataForCurrentMonth = (days) => {
    let data = [];
    for (let i = 1; i <= days; i++) {
      if (i % 7 === 0 || i % 7 === 6) {
        // Cuối tuần doanh thu cao hơn
        data.push(Math.floor(Math.random() * 501) + 2000); // Từ 2000 đến 2500
      } else {
        // Ngày thường
        data.push(Math.floor(Math.random() * 1001) + 1000); // Từ 1000 đến 2000
      }
    }
    return data;
  };

  // Hàm tạo dữ liệu giả cho 7 ngày trước
  const fakeDataForLast7Days = () => {
    return Array.from(
      { length: 7 },
      (_, i) => Math.floor(Math.random() * 500) + 1500
    ); // Dữ liệu giả từ 1500 đến 2000
  };

  // Tính toán công suất sử dụng từ dữ liệu doanh thu
  const calculateUtilizationData = (revenueData) => {
    return revenueData.map((revenue) => Math.floor((revenue / 3000) * 100)); // Tính phần trăm công suất sử dụng
  };

  // Biểu đồ cột doanh thu
  const [revenueBarChartOptions, setRevenueBarChartOptions] = useState({
    chart: {
      type: "bar", // Biểu đồ cột
      height: 350,
    },
    series: [
      {
        name: "Doanh thu",
        data: fakeDataForCurrentMonth(moment().daysInMonth()), // Dữ liệu giả mặc định cho tháng này
      },
    ],
    xaxis: {
      categories: Array.from(
        { length: moment().daysInMonth() },
        (_, i) => `${i + 1}/${moment().format("MM")}`
      ), // Số ngày trong tháng hiện tại
    },
    yaxis: {
      min: 0,
      max: 3000 * 100000, // Điều chỉnh tối đa (ở đây là 3000 triệu đồng = 3 tỷ)
      tickAmount: 5, // Số lượng vạch chia
      labels: {
        formatter: function (value) {
          if (value >= 1000000000) {
            return (value / 1000000000).toFixed(1) + " tỷ"; // Hiển thị đơn vị tỷ
          } else {
            return (value / 1000000).toFixed(1) + " tr"; // Hiển thị đơn vị triệu
          }
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false, // Ẩn số liệu bên trong cột
        },
      },
    },
  });

  // Biểu đồ line công suất sử dụng
  const [utilizationLineChartOptions, setUtilizationLineChartOptions] =
    useState({
      chart: {
        type: "line",
        height: 350,
      },
      series: [
        {
          name: "Công suất sử dụng",
          data: Array.from(
            { length: moment().daysInMonth() },
            (_, i) => Math.floor(Math.random() * 100) + 20
          ), // Dữ liệu ngẫu nhiên cho công suất sử dụng
        },
      ],
      xaxis: {
        categories: Array.from(
          { length: moment().daysInMonth() },
          (_, i) => `${i + 1}/${moment().format("MM")}`
        ), // Số ngày trong tháng hiện tại
      },
      yaxis: {
        min: 0,
        max: 100, // Từ 0% đến 100%
        tickAmount: 5,
        labels: {
          formatter: function (value) {
            return value + "%"; // Hiển thị phần trăm
          },
        },
      },
      stroke: {
        curve: "smooth", // Đường line mượt mà
      },
    });
  const totalRooms = centersData[selectedCenter].totalRooms;
  const rentedRooms = centersData[selectedCenter].rentedRooms;
  const availableRooms = totalRooms - rentedRooms;

  // Biểu đồ cho phòng đang có khách
  const rentedChartOptions = {
  chart: {
    type: "radialBar",
    offsetY: -10,
    height: 180, // Giảm chiều cao để biểu đồ nhỏ lại
  },
  series: [(rentedRooms / totalRooms) * 100],
  labels: ["Đang sử dụng"],
  colors: ["#28a745"],
  plotOptions: {
    radialBar: {
      hollow: {
        size: "60%",
      },
      dataLabels: {
        name: {
          offsetY: 5,
          fontSize: "12px",
          color: "#28a745",
        },
        value: {
          fontSize: "14px",
          show: true,
          color: "#28a745",
          formatter: function (val) {
            return Math.round(val) + "%";
          },
        },
      },
    },
  },
  legend: {
    show: false,
  },
};

const availableChartOptions = {
  chart: {
    type: "radialBar",
    offsetY: -10,
    height: 180, // Giảm chiều cao để biểu đồ nhỏ lại
  },
  series: [(availableRooms / totalRooms) * 100],
  labels: ["Phòng trống"],
  colors: ["#f39c12"],
  plotOptions: {
    radialBar: {
      hollow: {
        size: "60%",
      },
      dataLabels: {
        name: {
          offsetY: 5,
          fontSize: "12px",
          color: "#f39c12",
        },
        value: {
          fontSize: "14px",
          show: true,
          color: "#f39c12",
          formatter: function (val) {
            return Math.round(val) + "%";
          },
        },
      },
    },
  },
  legend: {
    show: false,
  },
};

  return (
    <div className="p-4 w-full grid grid-cols-12 gap-3 ">
      {/* Select trung tâm */}
      
      <div className=" md:col-span-9 col-span-full ">
        <div className="flex justify-between mb-4 gap-4 md:p-0 px-4">
          <div className="font-semibold text-gray-500 text-lg">Tổng quan</div>
          <div className="flex items-center gap-4">
          <div className="flex text-sky-500 font-semibold gap-2 items-center text-sm"><GlobalOutlined /> <p>Chi nhánh Hà Nội</p></div>
          </div>
        </div>

        <Card className=" bg-white rounded-lg  mb-4">
          <div className="flex items-center justify-between ">
            <h2 className="text-base font-semibold">
              Công suất sử dụng phòng hiện tại
            </h2>
          </div>
          <div className="flex justify-between divide-x-2 items-center mt-8">
            {/* Biểu đồ phòng có khách */}
            <div className="flex items-center w-1/2">
              <ReactApexChart
                options={rentedChartOptions}
                series={rentedChartOptions.series}
                type="radialBar"
                height={250}
              />
              <div className="text-center mt-4">
                <span className="text-sm font-semibold">
                  <span className="text-base text-green-500">
                    {rentedRooms}
                  </span>{" "}
                  /{totalRooms} phòng
                </span>
                <p className="text-gray-500">Đang có khách</p>
              </div>
            </div>
            {/* Biểu đồ phòng trống */}
            <div className="flex items-center w-1/2">
              <ReactApexChart
                options={availableChartOptions}
                series={availableChartOptions.series}
                type="radialBar"
                height={250}
              />
              <div className="text-center mt-4">
                <span className="text-sm font-semibold">
                  <span className="text-base text-orange-500">
                    {availableRooms}
                  </span>{" "}
                  /{totalRooms} phòng
                </span>
                <p className="text-gray-500">Đang trống</p>
              </div>
            </div>
          </div>
        </Card>
        <Card className="bg-white  rounded-lg shadow-md mb-4">
          <h2 className="text-base font-semibold">Công suất sử dụng phòng</h2>
          <ReactApexChart
            options={utilizationLineChartOptions}
            series={utilizationLineChartOptions.series}
            type="line"
            height={350}
          />
        </Card>

        {/* Biểu đồ cột doanh thu */}
        <Card className="bg-white rounded-lg shadow-md mb-4">
          <h2 className="text-base font-semibold">Doanh thu</h2>
          <ReactApexChart
            options={revenueBarChartOptions}
            series={revenueBarChartOptions.series}
            type="bar"
            height={350}
          />
        </Card>
        
      </div>
      <div className="md:col-span-3 col-span-full">
        <Notify />
      </div>
    </div>
  );
};

export default Dashboard;
