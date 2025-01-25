import { ClearOutlined, FieldTimeOutlined, MoreOutlined } from "@ant-design/icons";
import { Modal, Tag } from "antd";
import React, { useState } from "react";
import BookRoomFastModal from "./Modals/BookRoomFastModal"

const RoomDiagram = () => {
  const [openBookRoomFastModal, setOpenBookRoomFastModal] = useState(false);

  const rooms = [
    {
      id: 1,
      name: "P.402",
      status: "Sạch",
      type: "Phòng 01 giường đôi.",
      prices: ["250,000", "1,250,000", "550,000"],
      tagColor: "bg-gray-200",
      textColor: "text-gray-600",
      backgroundColor: "bg-gray-200",
    },
    {
      id: 2,
      name: "P.302",
      status: "Sạch",
      type: "Khách lẻ",
      tagColor: "bg-gray-200",
      textColor: "text-gray-600",
      backgroundColor: "bg-teal-700",
    },
    {
      id: 3,
      name: "P.302",
      status: "Chưa dọn",
      type: "Khách lẻ",
      tagColor: "bg-red-200",
      textColor: "text-red-600",
      backgroundColor: "bg-teal-700",
    },
    {
      id: 4,
      name: "P.302",
      status: "Sạch",
      type: "Khách lẻ",
      tagColor: "bg-gray-200",
      textColor: "text-gray-600",
      backgroundColor: "bg-green-700",
    },
    {
      id: 5,
      name: "P.302",
      status: "Sạch",
      type: "Khách lẻ",
      tagColor: "bg-gray-200",
      textColor: "text-gray-600",
      backgroundColor: "bg-orange-500",
    },
  ];
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="my-2">
        <h2 className="text-lg font-semibold mb-2">Tầng 2 (12)</h2>
        <div className="flex  flex-wrap gap-4">
          {rooms.map((room) => (
            <div
            onClick={() => setOpenBookRoomFastModal(true)}
              key={room.id}
              className={`text-black p-4 rounded-xl shadow-md flex flex-col w-[220px] h-[200px] gap-2 ${room.backgroundColor}`}
            >
              <div className="flex justify-between items-center mb-2">
                <Tag
                  className={`rounded-3xl py-1 px-3 ${room.textColor} shadow-md font-semibold text-sm cursor-pointer ${room.tagColor} flex items-center gap-2`}
                >
                  <ClearOutlined />
                  {room.status}
                </Tag>
                <MoreOutlined />
              </div>
              <div className="grow text-sm font-semibold">
                <h2 className="text-2xl font-bold">{room.name}</h2>
                <div className="text-base">{room.type}</div>
                {room.prices?.map((price, index) => (
                  <div

                    key={index}
                    className="text-gray-500 font-normal flex items-center gap-2"
                  >
                    <FieldTimeOutlined />
                    {price}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-2">
        <Modal
          open={openBookRoomFastModal}
          onCancel={() => setOpenBookRoomFastModal(false)}
          width={900}
          footer={null}
          title={<h2 className="text-base font-semibold ">Đặt/Nhận phòng nhanh</h2>}
        >
          <BookRoomFastModal />
        </Modal>
      </div>
    </div>
  );
};

export default RoomDiagram;
