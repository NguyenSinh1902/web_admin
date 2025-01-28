import { useState } from "react";

const initialTagsData = [
    {
        color: "orange",
        tag: "Đang sửa chữa",
        isActive: false,
        total: 10,
    },
    {
        color: "green",
        tag: "Đang sử dụng",
        isActive: false,
        total: 0,
    },
    {
        color: "cyan",
        tag: "Sắp trả",
        isActive: false,
        total: 1,
    },
    {
        color: "red",
        tag: "Bẩn",
        isActive: false,
        total: 1,
    },
];

export const StatusRoomGrid = () => {
    const [tagsData, setTagsData] = useState(initialTagsData);

    const handleButtonClick = (clickedItem) => {
        setTagsData((prevTagsData) =>
            prevTagsData.map((item) => (item.tag === clickedItem.tag ? { ...item, isActive: !item.isActive } : item)),
        );
    };

    return (
        <div className="space-x-2">
            {tagsData.map((item, index) => (
                <span
                    key={index}
                    className={`rounded-full space-x-2 cursor-pointer py-1 px-4 border  ${
                        item.isActive
                            ? `bg-${item.color}-500 text-white  border-${item.color}-500`
                            : `bg-${item.color}-50 text-${item.color}-500 border-${item.color}-50`
                    }`}
                    onClick={() => handleButtonClick(item)}
                >
                    <span className="text-sm font-medium">
                        {item.tag} ({item?.total || 0})
                    </span>
                </span>
            ))}
        </div>
    );
};
