import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import viLocale from "@fullcalendar/core/locales/vi";
import { ClearOutlined } from "@ant-design/icons";
import { FormatDateJsonPro } from "../utils/FormatDateJsonPro";

const RoomCalendar = ({ viewType, onOpen = () => {}, ref }) => {
    const fakeEvents = [
        {
            id: 1,
            title: "Sự kiện 1",
            resourceId: "2",
            start: "2024-10-25T10:00:00",
            end: "2024-10-26T02:00:00",
            extendedProps: {
                status: "completed", // Hoàn thành
            },
        },
        {
            id: 2,
            title: "Sự kiện 2",
            resourceId: "3",
            start: "2024-10-15T09:00:00",
            end: "2024-10-17T11:00:00",
            extendedProps: {
                status: "pending", // Đang chờ
            },
        },
        {
            id: 4,
            title: "Sự kiện 4",
            start: "2024-10-21T13:00:00",
            end: "2024-10-21T15:00:00",
            extendedProps: {
                status: "completed", // Hoàn thành
            },
        },
        {
            id: 5,
            title: "Sự kiện 5",
            start: "2024-10-22T09:30:00",
            end: "2024-10-22T11:30:00",
            extendedProps: {
                status: "pending", // Đang chờ
            },
        },
    ];
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="my-2">
                <FullCalendar
                    ref={ref}
                    plugins={[resourceTimelinePlugin]}
                    initialView={viewType}
                    resourceRender={(info) => {
                        const { isParent } = info.resource.extendedProps;

                        // Tìm các phần tử <td> tương ứng với resource là khu vực
                        if (isParent) {
                            const resourceId = info.resource.id;
                            // Tìm <td> tương ứng với hàng của resource (khu vực)
                            const resourceLane = document.querySelector(
                                `td.fc-timeline-lane.fc-resource[data-resource-id="${resourceId}"]`,
                            );

                            if (resourceLane) {
                                resourceLane.classList.add("area-lane"); // Thêm class tùy chỉnh vào thẻ td của khu vực
                            }
                        }
                    }}
                    headerToolbar={false}
                    resources={[
                        {
                            id: "area1",
                            title: "Khu vực A",
                            isParent: true, // Xác định đây là khu vực
                            children: [
                                { id: "1", title: "P.201", parentId: "area1" },
                                { id: "2", title: "P.202", parentId: "area1" },
                            ],
                        },
                        {
                            id: "area2",
                            title: "Khu vực B",
                            isParent: true,
                            children: [
                                { id: "3", title: "P.203", parentId: "area2" },
                                { id: "4", title: "P.204", parentId: "area2" },
                            ],
                        },
                    ]}
                    events={fakeEvents}
                    resourceAreaWidth="200px" // Độ rộng của cột phòng
                    resourceAreaHeaderContent="Phòng"
                    schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                    resourceLabelContent={(arg) => {
                        const { isParent } = arg.resource.extendedProps;

                        if (isParent) {
                            const resourceId = arg.resource.id;
                            // Tìm <td> tương ứng với hàng của resource (khu vực)
                            const resourceLane = document.querySelector(
                                `.fc-timeline-lane.fc-resource[data-resource-id="${resourceId}"]`,
                            );

                            const resourceLaneArea = document.querySelector(
                                `.fc-datagrid-cell.fc-resource[data-resource-id="${resourceId}"]`,
                            );

                            if (resourceLane) {
                                resourceLane.classList.add("area-lane"); // Thêm class tùy chỉnh vào thẻ td của khu vực
                                resourceLaneArea.classList.add("area-lane"); // Thêm class tùy chỉnh vào thẻ td của khu vực
                            }
                            return <span className="bbg">Tầng 1</span>;
                        } else {
                            return (
                                <div className="flex items-center gap-2 p-1">
                                    <ClearOutlined />
                                    <p className="font-medium text-sm text-black">{arg.resource.title}</p>{" "}
                                    {/* Hiển thị phòng */}
                                </div>
                            );
                        }
                    }}
                    eventContent={(arg) => {
                        const status = arg.event.extendedProps.status;
                        let content;
                        content = (
                            <div
                                onClick={() => onOpen(true)}
                                className={`truncate font-semibold py-2 flex items-center justify-between gap-2 ${
                                    status === "completed" && "bg-gray-200 hover:bg-gray-600"
                                }
                            ${status === "pending" && "bg-green-200 hover:bg-green-600"}
                            px-2 rounded-md text-black  group hover:text-white`}
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-2 h-2 rounded-full  group-hover:bg-white shadow-lg
                                  ${status === "completed" && "bg-gray-500 hover:bg-gray-600"}
                                  ${status === "pending" && "bg-green-500 hover:bg-green-600"}
                                  `}
                                    ></div>
                                    <p className="text-sm  font-semibold">{arg.event.title}</p>
                                </div>
                                <div className="flex items-center  gap-2 text-gray-700 group-hover:text-white text-[13px] ">
                                    <p className=" ">{FormatDateJsonPro(arg.event.start, 15)}</p>-
                                    <p className=" ">{FormatDateJsonPro(arg.event.end, 15)}</p>
                                </div>
                            </div>
                        );
                        return content;
                    }}
                    views={{
                        resourceTimelineDay: {
                            slotLabelFormat: {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false, // Đặt true nếu bạn muốn giờ 12 giờ
                            },
                            slotDuration: { hours: 2 }, // Mỗi slot là 2 giờ cho chế độ ngày
                            slotLabelInterval: { hours: 2 }, // Khoảng cách giữa các nhãn là 2 giờ
                            // Tùy chỉnh cho slot labels
                            slotLabelContent: (arg) => {
                                const startHour = arg.date.getHours();
                                const formattedHour = startHour < 10 ? `0${startHour}` : startHour; // Định dạng giờ
                                return <div className="text-gray-400 font-medium text-sm">{formattedHour}:00</div>;
                            },
                        },
                        resourceTimelineWeek: {
                            slotLabelFormat: {
                                // Sử dụng cấu hình này để định dạng nhãn ô
                                weekday: "long", // Hiển thị tên ngày
                                day: "numeric", // Hiển thị ngày
                                month: "long", // Hiển thị tên tháng
                            },
                            slotDuration: { days: 1 },
                            slotLabelInterval: { days: 1 },
                            // Custom rendering for week view
                            slotLabelContent: (info) => {
                                const date = info.date;
                                return (
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div className="text-gray-600 text-lg font-semibold">{date.getDate()}</div>
                                        <div className="font-medium text-gray-800 text-sm">
                                            {date.toLocaleDateString("vi-VN", {
                                                weekday: "long",
                                            })}
                                        </div>
                                    </div>
                                );
                            },
                        },
                        resourceTimelineMonth: {
                            slotLabelFormat: {
                                weekday: "long", // Hiển thị thứ
                                day: "numeric", // Hiển thị ngày trong tháng
                            },
                            slotDuration: { days: 1 }, // Hiển thị mỗi ô là 1 ngày trong tháng
                            slotLabelInterval: { days: 1 }, // Khoảng cách giữa các nhãn là 1 ngày
                            // Tùy chỉnh nội dung hiển thị của nhãn slot
                            slotLabelContent: (info) => {
                                const date = info.date;
                                return (
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div className="text-gray-600 text-lg font-semibold">{date.getDate()}</div>
                                        <div className="font-medium text-gray-800 text-sm">
                                            {date.toLocaleDateString("vi-VN", {
                                                weekday: "short",
                                            })}
                                        </div>
                                    </div>
                                );
                            },
                        },
                    }}
                    // Điều chỉnh thời gian hiển thị của lịch, tránh lặp giờ
                    locale={viLocale}
                />
            </div>
        </div>
    );
};

export default RoomCalendar;
