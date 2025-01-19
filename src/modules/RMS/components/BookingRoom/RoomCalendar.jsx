import React, { useRef, useMemo, forwardRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import viLocale from "@fullcalendar/core/locales/vi";
import { ClearOutlined } from "@ant-design/icons";
import { FormatDateJsonPro } from "../../utils/FormatDateJsonPro";
import dayjs from "dayjs";

const RoomCalendar = forwardRef(
  (
    {
      bookingRooms = [],
      tags = [],
      viewType,
      onOpen = () => {},
      selectedDate = "",
      setSelectedDate,
      onDataDetail = () => {},
    },
    ref
  ) => {
    const [calendarDate, setCalendarDate] = useState(dayjs(selectedDate));

    const activeTags = useMemo(() => {
      return tags.filter((t) => t.isActive).map((t) => t.tag);
    }, [tags]);

    const filteredRooms = useMemo(() => {
      if (activeTags.length === 0) return bookingRooms; // Hiển thị tất cả nếu không có tag nào được kích hoạt
      return bookingRooms.filter((room) => activeTags.includes(room.tag));
    }, [bookingRooms, activeTags]);

    // Tính toán firstDay từ selectedDate
    const firstDay = calendarDate.day();

    const resources = useMemo(
      () => [
        {
          id: "Tầng 1",
          title: "Khu vực A",
          isParent: true,
          children: [
            { id: "1", title: "P.201", parentId: "Tầng 1" },
            { id: "2", title: "P.202", parentId: "Tầng 1" },
          ],
        },
        {
          id: "Tầng 2",
          title: "Khu vực B",
          isParent: true,
          children: [
            { id: "3", title: "P.203", parentId: "Tầng 2" },
            { id: "4", title: "P.204", parentId: "Tầng 2" },
          ],
        },
      ],
      []
    );

    const handleResourceRender = (info) => {
      const { isParent } = info.resource.extendedProps;
      if (isParent) {
        const resourceId = info.resource.id;
        const resourceLane = document.querySelector(
          `td.fc-timeline-lane.fc-resource[data-resource-id="${resourceId}"]`
        );
        if (resourceLane) {
          resourceLane.classList.add("area-lane");
        }
      }
    };

    const renderResourceLabel = (arg) => {
      const { isParent } = arg.resource.extendedProps;
      if (isParent) {
        const resourceId = arg.resource.id;
        const resourceLane = document.querySelector(
          `.fc-timeline-lane.fc-resource[data-resource-id="${resourceId}"]`
        );
        const resourceLaneArea = document.querySelector(
          `.fc-datagrid-cell.fc-resource[data-resource-id="${resourceId}"]`
        );
        if (resourceLane) {
          resourceLane.classList.add("area-lane");
          resourceLaneArea.classList.add("area-lane");
        }
        return <span className="bbg">{arg.resource._resource.id}</span>;
      } else {
        return (
          <div className="flex items-center gap-2 p-1">
            <ClearOutlined />
            <div className="font-medium text-sm text-black">
              {arg.resource.title}
            </div>
          </div>
        );
      }
    };

    const renderEventContent = (arg) => {
      const status = arg.event.extendedProps.statusBookingRoom;
      const tagColorMap = arg.event.extendedProps.tagColorMap;
      const bgColor = tagColorMap || "default"; // Màu nền từ tagColorMap
      const hoverColor = `hover:bg-${bgColor}-500`; // Tạo lớp hover dựa trên bgColor
      return (
        <div
          onClick={() => {
            onOpen(true);
            onDataDetail(arg.event);
          }}
          className={`truncate font-semibold py-2 flex items-center justify-between gap-2 bg-${bgColor}-200 ${hoverColor} px-2 rounded-md text-black group hover:text-white`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full group-hover:bg-white shadow-lg ${
                status === "completed"
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            ></div>
            <div>
              <p className="text-sm font-semibold">{arg.event.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-700 group-hover:text-white text-[13px]">
            <div>{FormatDateJsonPro(arg.event.start, 15)}</div>
            <span>-</span>
            <div>{FormatDateJsonPro(arg.event.end, 15)}</div>
          </div>
        </div>
      );
    };

    useEffect(() => {
      if (ref?.current) {
        const calendarApi = ref.current.getApi();
        calendarApi.gotoDate(selectedDate); // Cập nhật ngày theo `selectedDate`
        setCalendarDate(dayjs(selectedDate));
      }
    }, [selectedDate, ref]);

    return (
      <div className="bg-white shadow-md rounded-lg">
        <div className="my-2">
          <FullCalendar
            className="table-reset"
            ref={ref}
            firstDay={firstDay}
            plugins={[resourceTimelinePlugin]}
            initialView={viewType}
            resourceRender={handleResourceRender}
            headerToolbar={false}
            resources={resources}
            events={filteredRooms}
            resourceAreaWidth="200px"
            resourceAreaHeaderContent="Phòng"
            schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
            resourceLabelContent={renderResourceLabel}
            eventContent={renderEventContent}
            visibleRange={{
              start: "2019-03-16T06:00:00",
              end: "2019-03-17T06:00:00",
            }}
            views={{
              resourceTimelineDay: {
                //Hiển thị thời gian theo ngày
                slotLabelFormat: {
                  // Hiển thị label header
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                },
                slotDuration: { hours: 2 },
                slotLabelInterval: { hours: 2 },
                slotLabelContent: (arg) => (
                  <div className="text-gray-400 font-medium text-sm">
                    {arg.date.getHours().toString().padStart(2, "0")}:00
                  </div>
                ),
              },
              resourceTimelineWeek: {
                //Hiển thị thời gian theo tuần
                slotLabelFormat: {
                  // Hiển thị label header
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                },
                slotDuration: { days: 1 },
                slotLabelInterval: { days: 1 },
                slotLabelContent: (info) => (
                  <div style={{ fontWeight: "bold", textAlign: "center" }}>
                    <div className="text-gray-600 text-lg font-semibold">
                      {info.date.getDate()}
                    </div>
                    <div className="font-medium text-gray-800 text-sm">
                      {info.date.toLocaleDateString("vi-VN", {
                        weekday: "long",
                      })}
                    </div>
                  </div>
                ),
              },
              resourceTimelineMonth: {
                //Hiển thị thời gian theo tháng
                slotLabelFormat: { weekday: "long", day: "numeric" }, // Hiển thị label header
                slotDuration: { days: 1 },
                slotLabelInterval: { days: 1 },
                slotLabelContent: (info) => (
                  <div style={{ fontWeight: "bold", textAlign: "center" }}>
                    <div className="text-gray-600 text-lg font-semibold">
                      {info.date.getDate()}
                    </div>
                    <div className="font-medium text-gray-800 text-sm">
                      {info.date.toLocaleDateString("vi-VN", {
                        weekday: "short",
                      })}
                    </div>
                  </div>
                ),
              },
            }}
            locale={viLocale}
          />
        </div>
      </div>
    );
  }
);

export default RoomCalendar;
