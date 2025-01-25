import React, { useEffect, useRef, useState } from "react";
import { Button, Select, Modal, Segmented, Popover } from "antd";
import {
  SearchOutlined,
  CaretDownOutlined,
  LeftOutlined,
  RightOutlined,
  PlusCircleOutlined,
  BarsOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  SettingOutlined,
  SwapOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import RoomCalendar from "../../components/BookingRoom/RoomCalendar";
import SearchRoom from "../../components/Modals/SearchRoom";
import DetailRoom from "../../components/Modals/DetailRoom";
import RoomDiagram from "../../components/BookingRoom/RoomDiagram";
import BookRoomModal from "../../components/Modals/BookRoomModal";
import { DatePickerAntd } from "../../common/DatePickerAntd";
import { StatusRoom } from "./StatusRoom";
import { RoomList } from "../../components/BookingRoom/RoomList";
import dayjs from "dayjs";
import CloseShiftModal from "../../components/Modals/CloseShift";
import OpenShift from "../../components/Modals/OpenShift";
import BookRoomFastModal from "../../components/Modals/BookRoomFastModal";
import { generateRandomRoom } from "../../utils/FakerData";

const viewOptions = [
  { label: "Sơ đồ", value: "Block", icon: <AppstoreOutlined /> },
  // { label: "Danh sách", value: "List", icon: <BarsOutlined /> },
  { label: "Lưới", value: "Calendar", icon: <CalendarOutlined /> },
];

const initialTagsData = [
  { color: "orange", tag: "Đang sửa chữa", isActive: false, total: 1 },
  { color: "gray", tag: "Đang trống", isActive: false, total: 10 },
  { color: "green", tag: "Đang sử dụng", isActive: false, total: 0 },
  { color: "red", tag: "Bẩn", isActive: false, total: 1 },
];

export const CalenderBookRoom = () => {
  const calendarRef = useRef(null);
  const [viewType, setViewType] = useState("resourceTimelineWeek");
  const [selectedTab, setSelectedTab] = useState("Calendar");
  const [open, setOpen] = useState(false); // Hiển thị chi tiết phòng
  const [openSearchRoom, setOpenSearchRoom] = useState(false);
  const [openBookRoomModal, setOpenBookRoomModal] = useState(false);
  const [openBookRoomFastModal, setOpenBookRoomFastModal] = useState(false);
  const [viewRoomDetail, setViewRoomDetail] = useState(null);

  //#region Status room
  const [tags, setTags] = useState(initialTagsData);

  const handleTagClick = (selectedTag) => {
    setTags((prevTags) =>
      prevTags.map((tag) =>
        tag.tag === selectedTag ? { ...tag, isActive: !tag.isActive } : tag
      )
    );
  };

  const [rooms, setRooms] = useState(
    Array.from({ length: 10 }, generateRandomRoom)
  );

  useEffect(() => {
    const updatedTags = tags.map((tag) => ({
      ...tag,
      total: rooms.filter((room) => room.tag === tag.tag).length,
    }));
    setTags(updatedTags);
  }, [rooms]);

  //#endregion

  const viewDataDetail = (data) => {
    setViewRoomDetail(data);
  };
  const handleCancel = () => setOpen(false); //
  const handleCancelSearchRoom = () => setOpenSearchRoom(false);

  const handleViewChange = (value) => {
    setViewType(value);
    const calendarApi = calendarRef.current.getApi();
    if (value === "resourceTimelineWeek") {
      const startOfWeek = selectedDate.startOf("week").add(1, "day"); // Ngày thứ Ba
      calendarApi.gotoDate(startOfWeek.format("YYYY-MM-DD")); // Di chuyển đến ngày thứ Ba
      calendarApi.changeView("resourceTimelineWeek"); // Đổi sang chế độ xem tuần
      return;
    }
    calendarApi.changeView(value);
  };

  const [selectedDate, setSelectedDate] = useState(dayjs()); //
  const [endDate, setEndDate] = useState(dayjs().add(6, "days")); // State cho ngày kết thúc

  const handleDateChange = (date) => {
    if (!date) {
      setSelectedDate(dayjs());
      setEndDate(dayjs().add(6, "days")); // Cập nhật ngày kết thúc
      return;
    }
    setSelectedDate(date);
    setEndDate(date.add(6, "days")); // Cập nhật ngày kết thúc
  };
  const formattedSelectedDate = selectedDate.format("YYYY-MM-DD");

  const getVietnameseDayOfWeek = (date) => {
    const daysOfWeek = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    return daysOfWeek[date.day()]; // day() works the same way in dayjs
  };

  const formatSelectedDate = (date) => {
    if (!date) return "";

    const dayOfWeek = getVietnameseDayOfWeek(date);

    if (viewType === "resourceTimelineWeek") {
      const endDate = dayjs(date).add(6, "days");
      return `${dayOfWeek}, ${date.format("DD/MM/YYYY")} - ${endDate.format(
        "DD/MM/YYYY"
      )}`;
    } else if (viewType === "resourceTimelineMonth") {
      return `Tháng ${date.format("MM/YYYY")}`;
    } else {
      return `${dayOfWeek}, ${date.format("DD/MM/YYYY")}`;
    }
  };

  const handlePrevDay = () => {
    if (viewType === "resourceTimelineDay") {
      setSelectedDate(dayjs(selectedDate).subtract(1, "day"));
    } else if (viewType === "resourceTimelineWeek") {
      setSelectedDate(dayjs(selectedDate).subtract(1, "week"));
    } else if (viewType === "resourceTimelineMonth") {
      setSelectedDate(dayjs(selectedDate).subtract(1, "month"));
    }
  };

  const handleNextDay = () => {
    if (viewType === "resourceTimelineDay") {
      setSelectedDate(dayjs(selectedDate).add(1, "day"));
    } else if (viewType === "resourceTimelineWeek") {
      setSelectedDate(dayjs(selectedDate).add(1, "week"));
    } else if (viewType === "resourceTimelineMonth") {
      setSelectedDate(dayjs(selectedDate).add(1, "month"));
    }
  };

  // #region Mở ca
  const [showFormOpenShift, setshowFormOpenShift] = useState(false);
  const showModalOpenShift = () => {
    setshowFormOpenShift(true);
  };
  // #endregion

  // #region Bàn giao ca
  const [showFormCloseShift, setshowFormCloseShift] = useState(false);
  const showModalCloseShift = () => {
    setshowFormCloseShift(true);
  };
  // #endregion

  // #region hiển thị chọn bàn giao hoặc mở ca
  const [visible, setVisible] = useState(false);

  const content = (
    <div className="flex flex-col space-y-2">
      <Button
        onClick={showModalOpenShift}
        type="primary"
        icon={<PlayCircleOutlined />}
        className="w-full flex items-center justify-center"
      >
        Mở ca
      </Button>
      <Button
        type="default"
        onClick={showModalCloseShift}
        icon={<SwapOutlined />}
        className="w-full flex items-center justify-center"
      >
        Bàn giao ca
      </Button>
    </div>
  );
  //#endregion
  return (
    <>
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2 items-center">
            <Segmented
              className="flex flex-row gap-2 p-1"
              defaultValue={"Calendar"}
              options={viewOptions.map((option) => ({
                ...option,
                label: option.value === selectedTab ? option.label : null,
              }))}
              onChange={(value) => setSelectedTab(value)}
            />
            <Button
              icon={<SearchOutlined />}
              onClick={() => setOpenSearchRoom(true)}
            />
          </div>
          <div className="flex space-x-2">
            <div className="flex space-x-2">
              <Select
                showSearch
                className="w-32"
                defaultValue="Tuần"
                optionFilterProp="label"
                onChange={handleViewChange}
                options={[
                  { value: "resourceTimelineDay", label: "Ngày" },
                  { value: "resourceTimelineWeek", label: "Tuần" },
                  { value: "resourceTimelineMonth", label: "Tháng" },
                ]}
              />

              <div className="flex items-center bg-white px-2 justify-evenly border border-gray-200 rounded-md gap-2">
                <LeftOutlined
                  style={{ color: "gray" }}
                  className="p-1 hover:bg-gray-200 rounded-full text-sm font-bold cursor-pointer"
                  onClick={handlePrevDay}
                />
                <div className="w-[1px] bg-gray-400 py-2"></div>

                <DatePickerAntd
                  type="single"
                  viewType={viewType}
                  value={selectedDate}
                  onChange={handleDateChange}
                  format={formatSelectedDate} // Ensure this formats correctly
                  suffixIcon={false}
                  className="border-0 rounded-none outline-0 bg-transparent font-semibold text-center input-book"
                />

                <div className="w-[1px] bg-gray-400 py-2"></div>

                <RightOutlined
                  style={{ color: "gray" }}
                  className="p-1 hover:bg-gray-200 rounded-full text-sm font-bold cursor-pointer"
                  onClick={handleNextDay}
                />
              </div>
            </div>

            {selectedTab === "Block" && (
              <div className="flex space-x-2">
                <Select
                  suffixIcon={<CaretDownOutlined />}
                  showSearch
                  className="w-40"
                  defaultValue="Bảng giá chung"
                  optionFilterProp="label"
                  onChange={(e) => handleViewChange(e)}
                  // onSearch={onSearch}
                  options={[
                    {
                      value: "resourceTimelineDay",
                      label: "Bảng giá chung",
                    },
                    {
                      value: "resourceTimelineWeek",
                      label: "Tuần",
                    },
                    {
                      value: "resourceTimelineMonth",
                      label: "Tháng",
                    },
                  ]}
                  size="middle"
                />
              </div>
            )}
            <Button
              type="primary"
              className=" "
              onClick={() => setOpenBookRoomModal(true)}
            >
              <PlusCircleOutlined /> Đặt phòng
            </Button>
          </div>
        </div>

        <StatusRoom type={selectedTab} tags={tags} onStatusChange={handleTagClick} />
        <div className="relative mt-4 w-f">
          <div
            className={` transition-all duration-500 ease-in-out transform ${
              selectedTab === "Block"
                ? "translate-x-0 opacity-100 visible"
                : "-translate-x-full opacity-0 hidden"
            }`}
          >
            <RoomDiagram rooms={rooms} tags={tags} />
          </div>
          <div
            className={` transition-all duration-500 ease-in-out transform ${
              selectedTab === "Calendar"
                ? "translate-x-0 opacity-100 visible"
                : "-translate-x-full opacity-0 hidden"
            }`}
          >
            <RoomCalendar
              bookingRooms={rooms}
              tags={tags}
              ref={calendarRef}
              viewType={viewType}
              onOpen={setOpen}
              onDataDetail={viewDataDetail}
              selectedDate={formattedSelectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>

          <div
            className={` transition-all duration-500 ease-in-out transform ${
              selectedTab === "List"
                ? "translate-x-0 opacity-100 visible"
                : "-translate-x-full opacity-0 hidden"
            }`}
          >
            <RoomList />
          </div>
        </div>
      </div>
      {open && (
        <div className="p-2">
          <Modal
            open={open}
            onCancel={handleCancel}
            width={900}
            footer={null}
            title={<h2 className="text-xl font-semibold ">Chi tiết P.202</h2>}
          >
            <DetailRoom data={viewRoomDetail} />
          </Modal>
        </div>
      )}
      {openSearchRoom && (
        <div className="p-2">
          <Modal
            open={openSearchRoom}
            onCancel={handleCancelSearchRoom}
            width={"100%"}
            footer={null}
            title={<h2 className="text-xl font-semibold ">Tìm kiếm</h2>}
          >
            <SearchRoom />
          </Modal>
        </div>
      )}

      {openBookRoomModal && (
        <div className="p-2">
          <Modal
            open={openBookRoomModal}
            onCancel={() => setOpenBookRoomModal(false)}
            width={900}
            height={800}
            className="overflow-y-auto"
            footer={null}
            title={<h2 className="text-base font-semibold ">Đặt phòng</h2>}
          >
            <BookRoomModal
              setOpen={setOpenBookRoomModal}
              setOpenBookRoomFastModal={setOpenBookRoomFastModal}
            />
          </Modal>
        </div>
      )}

      {openBookRoomFastModal && (
        <div className="p-2">
          <Modal
            open={openBookRoomFastModal}
            onCancel={() => setOpenBookRoomFastModal(false)}
            width={900}
            height={800}
            className="overflow-y-auto"
            footer={null}
            title={
              <h2 className="text-base font-semibold ">
                Đặt/ Nhận phòng nhanh
              </h2>
            }
          >
            <BookRoomFastModal />
          </Modal>
        </div>
      )}

      <div className="fixed bottom-4 right-4">
        <Popover
          content={content}
          trigger="hover"
          visible={visible}
          onVisibleChange={setVisible}
          placement="topRight"
        >
          <Button
            shape="circle"
            icon={<SettingOutlined />}
            size="large"
            className="bg-gray-100 shadow-lg hover:bg-gray-200"
          />
        </Popover>
      </div>
      {showFormCloseShift && (
        <div className="p-2">
          <Modal
            open={showFormCloseShift}
            onCancel={() => setshowFormCloseShift(false)}
            width={1100}
            footer={null}
            title={<h2 className="text-xl font-semibold ">Bàn giao ca</h2>}
          >
            <CloseShiftModal />
          </Modal>
        </div>
      )}
      {showFormOpenShift && (
        <div className="p-2">
          <Modal
            open={showFormOpenShift}
            onCancel={() => setshowFormOpenShift(false)}
            width={900}
            footer={null}
            title={<h2 className="text-xl font-semibold ">Mở ca</h2>}
          >
            <OpenShift />
          </Modal>
        </div>
      )}
    </>
  );
};
