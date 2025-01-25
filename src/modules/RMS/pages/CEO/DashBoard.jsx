import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Card, Select, Tabs } from "antd";
import Notify from "../../components/Notify";
import { FormatMoney } from "../../utils";
const { Option } = Select;

const DashBoard = () => {
    const branchData = [
        {
            branchName: "Chi nhánh Hà Nội",
            revenue: [
                { date: "2024-10-01", amount: 9000000 },
                { date: "2024-10-02", amount: 1150000 },
                { date: "2024-10-03", amount: 1200000 },
                { date: "2024-10-04", amount: 1250000 },
                { date: "2024-10-05", amount: 1300000 },
                { date: "2024-10-06", amount: 1500000 },
                { date: "2024-10-07", amount: 1600000 },
                { date: "2024-10-08", amount: 1450000 },
                { date: "2024-10-09", amount: 1700000 },
                { date: "2024-10-10", amount: 1650000 },
                { date: "2024-10-11", amount: 1750000 },
                { date: "2024-10-12", amount: 1800000 },
                { date: "2024-10-13", amount: 1900000 },
                { date: "2024-10-14", amount: 2000000 },
                { date: "2024-10-15", amount: 2100000 },
                { date: "2024-10-16", amount: 2150000 },
                { date: "2024-10-17", amount: 2200000 },
                { date: "2024-10-18", amount: 2250000 },
                { date: "2024-10-19", amount: 2300000 },
                { date: "2024-10-20", amount: 2400000 },
                { date: "2024-10-21", amount: 2500000 },
                { date: "2024-10-22", amount: 2550000 },
                { date: "2024-10-23", amount: 2600000 },
                { date: "2024-10-24", amount: 2700000 },
                { date: "2024-10-25", amount: 2800000 },
                { date: "2024-10-26", amount: 2850000 },
                { date: "2024-10-27", amount: 2900000 },
                { date: "2024-10-28", amount: 2950000 },
                { date: "2024-10-29", amount: 3000000 },
                { date: "2024-10-30", amount: 3100000 },
            ],
            availableRooms: 5,
            occupiedRooms: 15,
            staff: [
                { department: "Phòng Kinh Doanh", staffCount: 10 },
                { department: "Phòng Tiếp Thị", staffCount: 8 },
                { department: "Phòng Hỗ Trợ Khách Hàng", staffCount: 6 },
            ],
        },
        {
            branchName: "Chi nhánh Hồ Chí Minh",
            revenue: [
                { date: "2024-10-01", amount: 100000 },
                { date: "2024-10-02", amount: 1200000 },
                { date: "2024-10-03", amount: 11000000 },
                { date: "2024-10-04", amount: 1300000 },
                { date: "2024-10-05", amount: 1400000 },
                { date: "2024-10-06", amount: 1450000 },
                { date: "2024-10-07", amount: 1500000 },
                { date: "2024-10-08", amount: 1550000 },
                { date: "2024-10-09", amount: 1600000 },
                { date: "2024-10-10", amount: 1650000 },
                { date: "2024-10-11", amount: 1700000 },
                { date: "2024-10-12", amount: 1750000 },
                { date: "2024-10-13", amount: 1800000 },
                { date: "2024-10-14", amount: 1850000 },
                { date: "2024-10-15", amount: 1900000 },
                { date: "2024-10-16", amount: 1950000 },
                { date: "2024-10-17", amount: 2000000 },
                { date: "2024-10-18", amount: 2050000 },
                { date: "2024-10-19", amount: 2100000 },
                { date: "2024-10-20", amount: 2150000 },
                { date: "2024-10-21", amount: 2200000 },
                { date: "2024-10-22", amount: 2250000 },
                { date: "2024-10-23", amount: 2300000 },
                { date: "2024-10-24", amount: 2350000 },
                { date: "2024-10-25", amount: 2400000 },
                { date: "2024-10-26", amount: 2450000 },
                { date: "2024-10-27", amount: 2500000 },
                { date: "2024-10-28", amount: 2550000 },
                { date: "2024-10-29", amount: 2600000 },
                { date: "2024-10-30", amount: 2650000 },
            ],
            availableRooms: 10,
            occupiedRooms: 20,
            staff: [
                { department: "Phòng Kinh Doanh", staffCount: 12 },
                { department: "Phòng Kỹ Thuật", staffCount: 5 },
                { department: "Phòng Nhân Sự", staffCount: 4 },
            ],
        },
    ];

    const [timeFrame, setTimeFrame] = useState("tháng hiện tại");
    const selectedBranchHN = "Chi nhánh Hà Nội";
    const selectedBranchHCM = "Chi nhánh Hồ Chí Minh";

    // Lọc dữ liệu của chi nhánh được chọn

    const branchHN = branchData.find((b) => b.branchName === selectedBranchHN);
    const branchHCM = branchData.find((b) => b.branchName === selectedBranchHCM);
    // Hàm lấy dữ liệu doanh thu dựa trên khoảng thời gian
    const getRevenueData = () => {
        const currentDate = new Date();
        let dates = [];
        let revenueHanoi = [];
        let revenueHCM = [];

        switch (timeFrame) {
            case "tháng hiện tại":
                const daysInCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
                for (let i = 1; i <= daysInCurrentMonth; i++) {
                    const date = `${i < 10 ? "0" : ""}${i}-${currentDate.getMonth() + 1 < 10 ? "0" : ""}${
                        currentDate.getMonth() + 1
                    }`;
                    dates.push(date);
                    const hanoiRevenue = branchData[0].revenue.find(
                        (entry) =>
                            entry.date ===
                            `${currentDate.getFullYear()}-${currentDate.getMonth() + 1 < 10 ? "0" : ""}${
                                currentDate.getMonth() + 1
                            }-${i < 10 ? "0" : ""}${i}`,
                    );
                    const hcmRevenue = branchData[1].revenue.find(
                        (entry) =>
                            entry.date ===
                            `${currentDate.getFullYear()}-${currentDate.getMonth() + 1 < 10 ? "0" : ""}${
                                currentDate.getMonth() + 1
                            }-${i < 10 ? "0" : ""}${i}`,
                    );
                    revenueHanoi.push(hanoiRevenue ? hanoiRevenue.amount : 0);
                    revenueHCM.push(hcmRevenue ? hcmRevenue.amount : 0);
                }
                break;
            case "tháng trước":
                const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
                const daysInLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0).getDate();
                for (let i = 1; i <= daysInLastMonth; i++) {
                    const date = `${i < 10 ? "0" : ""}${i}-${lastMonth.getMonth() + 1 < 10 ? "0" : ""}${
                        lastMonth.getMonth() + 1
                    }`;
                    dates.push(date);
                    const hanoiRevenue = branchData[0].revenue.find(
                        (entry) =>
                            entry.date ===
                            `${lastMonth.getFullYear()}-${lastMonth.getMonth() + 1 < 10 ? "0" : ""}${
                                lastMonth.getMonth() + 1
                            }-${i < 10 ? "0" : ""}${i}`,
                    );
                    const hcmRevenue = branchData[1].revenue.find(
                        (entry) =>
                            entry.date ===
                            `${lastMonth.getFullYear()}-${lastMonth.getMonth() + 1 < 10 ? "0" : ""}${
                                lastMonth.getMonth() + 1
                            }-${i < 10 ? "0" : ""}${i}`,
                    );
                    revenueHanoi.push(hanoiRevenue ? hanoiRevenue.amount : 0);
                    revenueHCM.push(hcmRevenue ? hcmRevenue.amount : 0);
                }
                break;
            case "ngày hiện tại":
                const today = `${currentDate.getDate() < 10 ? "0" : ""}${currentDate.getDate()}-${
                    currentDate.getMonth() + 1 < 10 ? "0" : ""
                }${currentDate.getMonth() + 1}`;
                dates.push(today);
                revenueHanoi.push(
                    branchData[0].revenue.find(
                        (entry) =>
                            entry.date ===
                            `${currentDate.getFullYear()}-${currentDate.getMonth() + 1 < 10 ? "0" : ""}${
                                currentDate.getMonth() + 1
                            }-${currentDate.getDate() < 10 ? "0" : ""}${currentDate.getDate()}`,
                    )?.amount || 0,
                );
                revenueHCM.push(
                    branchData[1].revenue.find(
                        (entry) =>
                            entry.date ===
                            `${currentDate.getFullYear()}-${currentDate.getMonth() + 1 < 10 ? "0" : ""}${
                                currentDate.getMonth() + 1
                            }-${currentDate.getDate() < 10 ? "0" : ""}${currentDate.getDate()}`,
                    )?.amount || 0,
                );
                break;
            case "ngày hôm qua":
                const yesterday = new Date(currentDate);
                yesterday.setDate(currentDate.getDate() - 1);
                const yesterdayStr = `${yesterday.getDate() < 10 ? "0" : ""}${yesterday.getDate()}-${
                    yesterday.getMonth() + 1 < 10 ? "0" : ""
                }${yesterday.getMonth() + 1}`;
                dates.push(yesterdayStr);
                revenueHanoi.push(
                    branchData[0].revenue.find(
                        (entry) =>
                            entry.date ===
                            `${yesterday.getFullYear()}-${yesterday.getMonth() + 1 < 10 ? "0" : ""}${
                                yesterday.getMonth() + 1
                            }-${yesterday.getDate() < 10 ? "0" : ""}${yesterday.getDate()}`,
                    )?.amount || 0,
                );
                revenueHCM.push(
                    branchData[1].revenue.find(
                        (entry) =>
                            entry.date ===
                            `${yesterday.getFullYear()}-${yesterday.getMonth() + 1 < 10 ? "0" : ""}${
                                yesterday.getMonth() + 1
                            }-${yesterday.getDate() < 10 ? "0" : ""}${yesterday.getDate()}`,
                    )?.amount || 0,
                );
                break;
            case "7 ngày trước":
                for (let i = 0; i < 7; i++) {
                    const pastDate = new Date(currentDate);
                    pastDate.setDate(currentDate.getDate() - i);
                    const date = `${pastDate.getDate() < 10 ? "0" : ""}${pastDate.getDate()}-${
                        pastDate.getMonth() + 1 < 10 ? "0" : ""
                    }${pastDate.getMonth() + 1}`;
                    dates.push(date);
                    revenueHanoi.push(
                        branchData[0].revenue.find(
                            (entry) =>
                                entry.date ===
                                `${pastDate.getFullYear()}-${pastDate.getMonth() + 1 < 10 ? "0" : ""}${
                                    pastDate.getMonth() + 1
                                }-${pastDate.getDate() < 10 ? "0" : ""}${pastDate.getDate()}`,
                        )?.amount || 0,
                    );
                    revenueHCM.push(
                        branchData[1].revenue.find(
                            (entry) =>
                                entry.date ===
                                `${pastDate.getFullYear()}-${pastDate.getMonth() + 1 < 10 ? "0" : ""}${
                                    pastDate.getMonth() + 1
                                }-${pastDate.getDate() < 10 ? "0" : ""}${pastDate.getDate()}`,
                        )?.amount || 0,
                    );
                }
                break;
            default:
                break;
        }

        return { dates, revenueHanoi, revenueHCM };
    };

    const { dates, revenueHanoi, revenueHCM } = getRevenueData();

    const revenueSeries = [
        {
            name: "Doanh thu Hà Nội",
            data: revenueHanoi,
        },
        {
            name: "Doanh thu Hồ Chí Minh",
            data: revenueHCM,
        },
    ];

    const revenueOptions = {
        chart: {
            type: "line",
            toolbar: { show: false },
        },
        xaxis: {
            categories: dates,
            labels: {
                rotate: -45,
            },
        },
        yaxis: {
            labels: {
                formatter: (value) => {
                    if (value >= 1_000_000) {
                        return `${(value / 1_000_000).toFixed(1)}tr`; // Đổi thành triệu nếu đạt mốc
                    }
                    return value.toLocaleString("vi-VN"); // Hiển thị theo VNĐ nếu dưới 1 triệu
                },
            },
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: "bottom",
        },
        tooltip: {
            y: {
                formatter: (val) => {
                    if (val >= 1_000_000) {
                        return `${(val / 1_000_000).toFixed(1)} triệu VNĐ`; // Hiển thị triệu trong tooltip
                    }
                    return `${val.toLocaleString("vi-VN")} VNĐ`; // Hiển thị VNĐ trong tooltip
                },
            },
        },
    };
    // Biểu đồ Số lượng Phòng
    const roomSeries = [
        {
            name: "Phòng trống",
            data: branchData.map((branch) => branch.availableRooms),
        },
        {
            name: "Phòng có khách",
            data: branchData.map((branch) => branch.occupiedRooms),
        },
    ];

    const roomOptions = {
        chart: {
            type: "bar",
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                columnWidth: "50%", // Điều chỉnh chiều rộng cột
            },
        },
        xaxis: {
            categories: branchData.map((branch) => branch.branchName),
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: "bottom",
        },
    };

    const roomSeriesHN = branchHN
        ? [
              { name: "Phòng trống", data: [branchHN.availableRooms] },
              { name: "Phòng có khách", data: [branchHN.occupiedRooms] },
          ]
        : [];

    const roomOptionsHN = {
        chart: {
            type: "bar",
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                columnWidth: "50%", // Điều chỉnh chiều rộng cột
            },
        },
        xaxis: {
            categories: [selectedBranchHN],
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: "bottom",
        },
    };

    const roomSeriesHCM = branchHCM
        ? [
              { name: "Phòng trống", data: [branchHCM.availableRooms] },
              { name: "Phòng có khách", data: [branchHCM.occupiedRooms] },
          ]
        : [];

    const roomOptionsHCM = {
        chart: {
            type: "bar",
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                columnWidth: "50%", // Điều chỉnh chiều rộng cột
            },
        },
        xaxis: {
            categories: [selectedBranchHN],
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: "bottom",
        },
    };

    // Biểu đồ Nhân viên
    const staffDepartments = branchData.flatMap((branch) => branch.staff.map((department) => department.department));
    const uniqueDepartments = Array.from(new Set(staffDepartments)); // Lấy danh sách phòng ban duy nhất

    const staffSeries = uniqueDepartments.map((department) => ({
        name: department,
        data: branchData.map((branch) => {
            const staff = branch.staff.find((staff) => staff.department === department);
            return staff ? staff.staffCount : 0; // Trả về số lượng nhân viên hoặc 0 nếu không tìm thấy
        }),
    }));

    // Nếu tìm thấy chi nhánh, chuẩn bị dữ liệu cho biểu đồ
    const staffSeriesHN = branchHN
        ? branchHN.staff.map((department) => ({
              name: department.department,
              data: [department.staffCount], // Giá trị staffCount trong chi nhánh đó
          }))
        : [];

    const staffOptions = {
        chart: {
            type: "bar",
            stacked: true,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                barHeight: "50%", // Chiều cao tối đa cho cột nhân viên
            },
        },
        xaxis: {
            categories: branchData.map((branch) => branch.branchName),
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: "right",
            offsetY: 40,
        },
    };

    const staffOptionsHN = {
        chart: {
            type: "bar",
            stacked: true,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                barHeight: "50%", // Chiều cao tối đa cho cột nhân viên
            },
        },
        xaxis: {
            categories: [selectedBranchHN], // Hiển thị tên chi nhánh ở trục X
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: "right",
            offsetY: 40,
        },
    };

    // Nếu tìm thấy chi nhánh, chuẩn bị dữ liệu cho biểu đồ
    const staffSeriesHCM = branchHCM
        ? branchHCM.staff.map((department) => ({
              name: department.department,
              data: [department.staffCount], // Giá trị staffCount trong chi nhánh đó
          }))
        : [];

    const staffOptionsHCM = {
        chart: {
            type: "bar",
            stacked: true,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                barHeight: "50%", // Chiều cao tối đa cho cột nhân viên
            },
        },
        xaxis: {
            categories: [selectedBranchHCM], // Hiển thị tên chi nhánh ở trục X
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: "right",
            offsetY: 40,
        },
    };

    return (
        <div className=" w-full grid grid-cols-12 gap-3 relative h-full ">
            {/* Select trung tâm */}
            <div className=" md:col-span-9 col-span-full flex flex-col gap-4 ">
                <h2 className=" text-gray-600 font-bold text-lg">Tổng quan</h2>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Tổng quan" key="1">
                        <div className="flex flex-col gap-3 p-4">
                            <div className="space-y-4">
                                {/* Dashboard Header */}
                                <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                                    <Card className="bg-orange-500 text-center rounded-lg" bordered={false}>
                                        <p className="text-lg font-semibold text-white ">80</p>
                                        <p className="text-white text-sm">Tổng số phòng</p>
                                    </Card>
                                    <Card className="bg-blue-500 text-center rounded-lg" bordered={false}>
                                        <p className="text-lg font-semibold text-white">40</p>
                                        <p className="text-white text-sm">Phòng đã đặt</p>
                                    </Card>
                                    <Card className="bg-indigo-500 text-center rounded-lg" bordered={false}>
                                        <p className="text-lg font-semibold text-white">72%</p>
                                        <p className="text-white text-sm">Tỷ lệ lấp đầy</p>
                                    </Card>
                                    <Card className="bg-teal-500 text-center rounded-lg" bordered={false}>
                                        <p className="text-lg font-semibold text-white">{FormatMoney("45000000")}</p>
                                        <p className="text-white text-sm">Doanh thu hôm nay</p>
                                    </Card>
                                </div>
                            </div>
                            <Card>
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-semibold text-sky-500">Thống kê doanh thu</p>
                                    <Select defaultValue={timeFrame} onChange={setTimeFrame}>
                                        <Option value="tháng hiện tại">Tháng hiện tại</Option>
                                        <Option value="tháng trước">Tháng trước</Option>
                                        <Option value="ngày hiện tại">Ngày hiện tại</Option>
                                        <Option value="ngày hôm qua">Ngày hôm qua</Option>
                                        <Option value="7 ngày trước">7 ngày trước</Option>
                                    </Select>
                                </div>
                                <Chart options={revenueOptions} series={revenueSeries} type="line" height={350} />
                            </Card>
                            <Card>
                                <p className="text-base font-semibold text-orange-500">Thống kê số lượng phòng</p>
                                <Chart options={roomOptions} series={roomSeries} type="bar" height={350} />
                            </Card>
                            <Card>
                                <p className="font-semibold text-base text-green-500">Thống kê nhân viên</p>
                                <Chart options={staffOptions} series={staffSeries} type="bar" height={350} />
                            </Card>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Chi nhánh Hà Nội" key="2">
                        <div className="flex flex-col gap-3 p-4">
                            <Card>
                                <div className="space-y-4">
                                    {/* Dashboard Header */}
                                    <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                                        <Card className="bg-orange-500 text-center rounded-lg" bordered={false}>
                                            <p className="text-lg font-semibold text-white ">80</p>
                                            <p className="text-white text-sm">Tổng số phòng</p>
                                        </Card>
                                        <Card className="bg-blue-500 text-center rounded-lg" bordered={false}>
                                            <p className="text-lg font-semibold text-white">40</p>
                                            <p className="text-white text-sm">Phòng đã đặt</p>
                                        </Card>
                                        <Card className="bg-indigo-500 text-center rounded-lg" bordered={false}>
                                            <p className="text-lg font-semibold text-white">72%</p>
                                            <p className="text-white text-sm">Tỷ lệ lấp đầy</p>
                                        </Card>
                                        <Card className="bg-teal-500 text-center rounded-lg" bordered={false}>
                                            <p className="text-lg font-semibold text-white">
                                                {FormatMoney("45000000")}
                                            </p>
                                            <p className="text-white text-sm">Doanh thu hôm nay</p>
                                        </Card>
                                    </div>
                                </div>
                            </Card>
                            <Card>
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-semibold text-sky-500">Thống kê doanh thu</p>
                                    <Select defaultValue={timeFrame} onChange={setTimeFrame}>
                                        <Option value="tháng hiện tại">Tháng hiện tại</Option>
                                        <Option value="tháng trước">Tháng trước</Option>
                                        <Option value="ngày hiện tại">Ngày hiện tại</Option>
                                        <Option value="ngày hôm qua">Ngày hôm qua</Option>
                                        <Option value="7 ngày trước">7 ngày trước</Option>
                                    </Select>
                                </div>
                                <Chart options={revenueOptions} series={[revenueSeries[0]]} type="line" height="350" />
                            </Card>
                            <Card>
                                <p className="text-base font-semibold text-orange-500">Thống kê số lượng phòng</p>
                                <Chart options={roomOptionsHN} series={roomSeriesHN} type="bar" height={350} />
                            </Card>
                            <Card>
                                <p className="font-semibold text-base text-green-500">Thống kê nhân viên</p>
                                <Chart options={staffOptionsHN} series={staffSeriesHN} type="bar" height={350} />
                            </Card>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Chi nhánh Hồ Chí Minh" key="3">
                        <div className="flex flex-col gap-3 p-4">
                            <div className="space-y-4">
                                {/* Dashboard Header */}
                                <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                                    <Card className="bg-orange-500 text-center rounded-lg" bordered={false}>
                                        <p className="text-lg font-semibold text-white ">80</p>
                                        <p className="text-white text-sm">Tổng số phòng</p>
                                    </Card>
                                    <Card className="bg-blue-500 text-center rounded-lg" bordered={false}>
                                        <p className="text-lg font-semibold text-white">40</p>
                                        <p className="text-white text-sm">Phòng đã đặt</p>
                                    </Card>
                                    <Card className="bg-indigo-500 text-center rounded-lg" bordered={false}>
                                        <p className="text-lg font-semibold text-white">72%</p>
                                        <p className="text-white text-sm">Tỷ lệ lấp đầy</p>
                                    </Card>
                                    <Card className="bg-teal-500 text-center rounded-lg" bordered={false}>
                                        <p className="text-lg font-semibold text-white">{FormatMoney("45000000")}</p>
                                        <p className="text-white text-sm">Doanh thu hôm nay</p>
                                    </Card>
                                </div>
                            </div>
                            <Card>
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-semibold text-sky-500">Thống kê doanh thu</p>
                                    <Select defaultValue={timeFrame} onChange={setTimeFrame}>
                                        <Option value="tháng hiện tại">Tháng hiện tại</Option>
                                        <Option value="tháng trước">Tháng trước</Option>
                                        <Option value="ngày hiện tại">Ngày hiện tại</Option>
                                        <Option value="ngày hôm qua">Ngày hôm qua</Option>
                                        <Option value="7 ngày trước">7 ngày trước</Option>
                                    </Select>
                                </div>
                                <Chart options={revenueOptions} series={[revenueSeries[1]]} type="line" height="350" />
                            </Card>
                            <Card>
                                <p className="text-base font-semibold text-orange-500">Thống kê số lượng phòng</p>
                                <Chart options={roomOptionsHCM} series={roomSeriesHCM} type="bar" height={350} />
                            </Card>
                            <Card>
                                <p className="font-semibold text-base text-green-500">Thống kê nhân viên</p>
                                <Chart options={staffOptionsHCM} series={staffSeriesHCM} type="bar" height={350} />
                            </Card>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </div>
            <div className="md:col-span-3 col-span-full sticky top-3">
                <Notify />
            </div>
            {/* <CloseShiftModal /> */}
        </div>
    );
};

export default DashBoard;
