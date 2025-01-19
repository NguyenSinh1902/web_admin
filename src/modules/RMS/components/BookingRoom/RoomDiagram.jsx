import {
    ClearOutlined,
    FieldTimeOutlined,
    MoreOutlined,
    EditOutlined,
    CheckOutlined,
    DollarOutlined,
    SwapOutlined,
    PlusOutlined,
    UnlockOutlined,
    LockOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, Modal, Popover, Slider, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import BookRoomFastModal from "../Modals/BookRoomFastModal";
import ProductService from "../Modals/ProductService";

const itemsStatus = [
    {
        key: "1",
        label: "Sạch",
    },
    {
        key: "2",
        label: "Chưa dọn",
    },
];

const RoomCard = ({ room, onClick, onStatusChange = () => {}, zoomLevel = 1, onOpenModal }) => {
    // #region hiển thị menu khi right click
    const containerRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                handleClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const handleRightClick = (event) => {
        event.preventDefault();
        setPosition({ x: event.clientX, y: event.clientY });
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false); // Ẩn Popover
    };
    const getMenuItems = () => {
        const actions = [
            {
                label: "Mở phòng",
                icon: <UnlockOutlined />,
                action: () => {},
            },
            {
                label: "Đóng phòng",
                icon: <LockOutlined />,
                action: () => {},
            },
            {
                label: "Sửa phòng",
                icon: <EditOutlined />,
                action: () => {},
            },
            {
                label: "Sẵn sàng",
                icon: <CheckOutlined />,
                action: () => {},
            },
            {
                label: "Thanh toán",
                icon: <DollarOutlined />,
                action: () => {},
            },
            {
                label: "Chuyển phòng",
                icon: <SwapOutlined />,
                action: () => {},
            },
            {
                label: "Thêm dịch vụ",
                icon: <PlusOutlined />,
                action: () => onOpenModal(true),
            },
        ];

        switch (room.tag) {
            case "Đang trống":
                return actions.filter(
                    (item) =>
                        item.label !== "Đóng phòng" &&
                        item.label !== "Thanh toán" &&
                        item.label !== "Chuyển phòng" &&
                        item.label !== "Thêm dịch vụ",
                );
            case "Đang sửa chữa":
                return actions.filter((item) => item.label === "Sẵn sàng");
            case "Đang sử dụng":
                return actions.filter((item) => item.label !== "Mở phòng");
            default:
                return actions;
        }
    };

    const menu = (
        <Menu
            items={getMenuItems().map((item) => ({
                key: item.label,
                label: (
                    <div
                        onClick={() => {
                            item.action();
                            handleClose();
                        }}
                    >
                        {item.label}
                    </div>
                ),
                icon: item.icon,
            }))}
        />
    );
    // #endregion

    return (
        <>
            <div
                ref={containerRef}
                onContextMenu={handleRightClick}
                className={`cursor-pointer border border-gray-200 hover:shadow-lg hover:border-gray-300 text-black p-4 rounded-xl flex flex-col bg-${room.bgColor}-500`}
                style={{
                    width: `${220 * zoomLevel}px`, // Điều chỉnh kích thước dựa vào zoomLevel
                    height: `${200 * zoomLevel}px`,
                    fontSize: `${14 * zoomLevel}px`, // Điều chỉnh font chữ
                    transition: "all 0.2s ease-in-out", // Hiệu ứng mượt khi zoom
                }}
            >
                {visible && (
                    <Dropdown
                        overlay={menu}
                        trigger={[]}
                        open={visible}
                        placement="bottomLeft"
                        overlayStyle={{
                            position: "absolute",
                            left: position.x,
                            top: position.y,
                            zIndex: 9999,
                        }}
                    >
                        <div />
                    </Dropdown>
                )}
                <div className="flex justify-between items-center mb-2">
                    {room.statusCleanRoom === "Sạch" ? (
                        <Tag className="rounded-full py-1 px-3 text-gray-600 bg-gray-100 text-sm cursor-pointer flex items-center gap-2 border-none">
                            <ClearOutlined />
                            {room.statusCleanRoom}
                        </Tag>
                    ) : (
                        <Tag className="rounded-full py-1 px-3 text-red-500 bg-red-100 text-sm cursor-pointer flex items-center gap-2 border-none">
                            <ClearOutlined />
                            {room.statusCleanRoom}
                        </Tag>
                    )}
                    <Dropdown
                        menu={{
                            items: itemsStatus.map((item) => ({
                                ...item,
                                onClick: (e) => {
                                    e.domEvent.stopPropagation();
                                    onStatusChange(room.id, item.label);
                                },
                            })),
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Button icon={<MoreOutlined />} type="text" />
                    </Dropdown>
                </div>
                <div className="grow text-sm font-semibold">
                    <h2 className="text-inherit">{room.name}</h2>
                    <div
                        style={{
                            fontSize: `${16 * zoomLevel}px`,
                            transition: "all 0.2s ease-in-out",
                        }}
                    >
                        {room.type}
                    </div>
                    {zoomLevel > 0.88 &&
                        room.prices?.map((price, index) => (
                            <div key={index} className="text-gray-800 font-normal flex items-center gap-2">
                                <FieldTimeOutlined />
                                {price}
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

const RoomList = ({ rooms, onRoomClick, onStatusChange = () => {}, onOpenModal }) => {
    const [zoomLevel, setZoomLevel] = useState(100); // Mức zoom, mặc định là 1

    const handleZoomChange = (e) => {
        setZoomLevel(e);
    };
    return (
        <div className="flex flex-col">
            {/* Thanh Range Slider */}
            <div className="mb-4 px-6 flex items-center gap-3">
                <label className="text-sm font-medium">Tỷ lệ: {zoomLevel}%</label>
                <Slider
                    defaultValue={30}
                    min={70}
                    max={110}
                    value={zoomLevel}
                    onChange={handleZoomChange}
                    className="w-[400px]"
                />
            </div>

            {/* Room List */}
            <div
                className="flex flex-wrap gap-4 items-start"
                style={{
                    gap: `${(16 * zoomLevel) / 100}px`, // Khoảng cách giữa các RoomCard thay đổi theo zoomLevel
                }}
            >
                {rooms.map((room) => (
                    <RoomCard
                        key={room.id}
                        room={room}
                        onClick={() => onRoomClick(room)}
                        onStatusChange={onStatusChange}
                        zoomLevel={zoomLevel / 100} // Truyền giá trị zoom xuống RoomCard
                        onOpenModal={onOpenModal}
                    />
                ))}
            </div>
        </div>
    );
};

const RoomDiagram = ({ rooms, tags }) => {
    //#region show modal
    const [isOpenServiceModal, setIsOpenServiceModal] = useState(false);
    // #endregion
    const [openBookRoomFastModal, setOpenBookRoomFastModal] = useState(false);
    const filteredRooms = tags.some((tag) => tag.isActive === true)
        ? rooms
              .filter((room) => tags.some((status) => status.tag === room.tag && status.isActive === true))
              .map((room) => {
                  const matchingTag = tags.find((status) => status.tag === room.tag && status.isActive === true);

                  // Nếu không tìm thấy matchingTag (có thể tất cả các tag không active), trả về room với backgroundColor mặc định
                  const bgColor = matchingTag ? matchingTag.color : room.backgroundColor;

                  return {
                      ...room,
                      bgColor, // Thêm bgColor vào object của room
                  };
              })
        : rooms.map((room) => {
              // Nếu tất cả các tag đều inactive, trả về tất cả rooms với backgroundColor mặc định từ room
              return {
                  ...room,
                  bgColor: room.backgroundColor, // Sử dụng backgroundColor mặc định của room
              };
          });
    return (
        <div className="bg-white p-3">
            <div className="flex justify-between items-center gap-4">
                <h2 className="text-lg font-medium mb-2 mr-4">
                    Tầng 2 <span className="text-gray-500  font-normal">(12)</span>
                </h2>
                <div className="border border-b-[1px] border-gray-200 flex-1"></div>
            </div>
            <RoomList
                rooms={filteredRooms}
                onRoomClick={() => setOpenBookRoomFastModal(true)}
                onOpenModal={setIsOpenServiceModal}
            />
            <div className="p-2">
                <Modal
                    open={openBookRoomFastModal}
                    onCancel={() => setOpenBookRoomFastModal(false)}
                    width={900}
                    footer={null}
                    title={<h2 className="text-base font-semibold">Đặt/Nhận phòng nhanh</h2>}
                >
                    <BookRoomFastModal />
                </Modal>
            </div>
            <Modal
                open={isOpenServiceModal}
                onCancel={() => setIsOpenServiceModal(false)}
                width={1200}
                footer={null}
                title={<h2 className="text-base font-semibold">Thêm sản phẩm, dịch vụ</h2>}
            >
                <ProductService />
            </Modal>
        </div>
    );
};

export default RoomDiagram;
