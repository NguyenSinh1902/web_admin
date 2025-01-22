import React, { useState } from "react";
import { Button, Card, Carousel, Dropdown, Image, Input, Menu, Tag } from "antd";
import { PlusCircleOutlined, SearchOutlined, DownOutlined, EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { FormatMoney } from "../../utils";

const ProductService = ({ isVisible, onClose }) => {
    const [selectedServices, setSelectedServices] = useState([]);
    const initialTagsData = [
        { id: 1, color: "white", tag: "Dịch vụ", isActive: false },
        { id: 2, color: "white", tag: "Đồ ăn", isActive: false },
        { id: 3, color: "white", tag: "Đồ uống", isActive: false },
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
            prevTagsData.map((item) => (item.tag === clickedItem.tag ? { ...item, isActive: !item.isActive } : item)),
        );
    };

    const activeCategoryIds = tagsData.filter((tag) => tag.isActive).map((tag) => tag.id);

    const filteredServices = activeCategoryIds.length
        ? services.filter((service) => activeCategoryIds.includes(service.categoryId))
        : services;

    // Group services into chunks of 5
    const chunkServices = (services, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < services.length; i += chunkSize) {
            chunks.push(services.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const serviceChunks = chunkServices(filteredServices, 7);
    const handleCardClick = (service) => {
        setSelectedServices((prevSelected) => {
            const existingService = prevSelected.find((item) => item.id === service.id);
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
            prevSelected.map((item) => (item.id === serviceId ? { ...item, quantity: item.quantity + 1 } : item)),
        );
    };
    const handleDecreaseQuantity = (serviceId) => {
        setSelectedServices((prevSelected) =>
            prevSelected.map((item) =>
                item.id === serviceId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
            ),
        );
    };

    const handleRemoveService = (serviceId) => {
        setSelectedServices((prevSelected) => prevSelected.filter((item) => item.id !== serviceId));
    };
    return (
        <div className="flex space-x-4">
            {/* Left Sidebar */}
            <div className="w-1/4 bg-white p-4 rounded shadow space-y-2 md:block hidden">
                {/* Category Buttons */}
                <Input prefix={<SearchOutlined />} placeholder="Tìm theo tên, mã hàng hóa" className="mb-4" />
                <div className="space-x-1 mb-3">
                    {tagsData.map((item, index) => (
                        <Tag
                            key={index}
                            className={`rounded-full cursor-pointer py-1 px-2 border  ${
                                item.isActive
                                    ? `bg-orange-500 text-white  border-${item.color}-500`
                                    : `bg-${item.color}-50 text-black border-${item.color}-50`
                            }`}
                            onClick={() => handleButtonClick(item)}
                        >
                            <span className="text-sm font-medium">{item.tag}</span>
                        </Tag>
                    ))}
                </div>
                {/* Service Items List */}
                <div className="grid grid-cols-1 gap-4 space-y-2">
                    {filteredServices.length > 5 ? (
                        <Carousel
                            dots={{
                                className: "custom-dots",
                                renderDots: (dots, goTo) => (
                                    <div className="flex justify-center space-x-2 mt-4">
                                        {dots.map((_, index) => alert(index))}
                                    </div>
                                ),
                            }}
                            autoplay
                        >
                            {serviceChunks.map((chunk, index) => (
                                <div key={index} className="grid grid-cols-1 gap-4 space-y-2">
                                    {chunk.map((service) => (
                                        <div
                                            key={service.id}
                                            onClick={() => handleCardClick(service)}
                                            className="flex items-center space-x-2 border rounded-md p-2 hover:shadow-lg transition-shadow duration-300 gap-4 cursor-pointer"
                                        >
                                            <Image
                                                src={"/assets/img/showimg.png"}
                                                alt={service.name}
                                                width={30}
                                                height={30}
                                                className="rounded-md border"
                                            />
                                            <div>
                                                <p className="font-semibold text-sm">{service.name}</p>
                                                <p className="text-gray-500 text-xs">
                                                    {service.price.toLocaleString()} đ
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        filteredServices.map((service) => (
                            <div
                                key={service.id}
                                onClick={() => {}}
                                className="flex items-center space-x-2 border rounded-md p-2 hover:shadow-lg transition-shadow duration-300 gap-4 cursor-pointer"
                            >
                                <Image
                                    src={"/assets/img/showimg.png"}
                                    alt={service.name}
                                    width={30}
                                    height={30}
                                    className="rounded-md border"
                                />
                                <div>
                                    <p className="font-semibold text-sm">{service.name}</p>
                                    <p className="text-gray-500 text-xs">{service.price.toLocaleString()} đ</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right Sidebar */}

            <Card className="w-3/4 bg-white p-4 grow">
                <Tag className="text-sm font-semibold bg-orange-500 text-white p-1">P.301</Tag>
                <div className="p-4 bg-white rounded-lg shadow-md  relative">
                    <div className="grid grid-cols-12 font-semibold border-b pb-2 mb-2 text-sm">
                        <div className="col-span-1">STT</div>
                        <div className="col-span-5">Tên</div>
                        <div className="col-span-1 text-center">Số lượng</div>
                        <div className="col-span-2 text-right">Đơn giá</div>
                        <div className="col-span-2 text-right">Thành tiền</div>
                    </div>
                    <div style={{ height: "400px" }} className=" overflow-auto mb-12">
                        <div className="grid grid-cols-1 gap-3">
                            {selectedServices.map((item, index) => (
                                <div className="grid grid-cols-12  p-4  rounded-md border-[1px] text-sm hover:shadow-md hover:border-blue-600 shadow-md cursor-pointer group">
                                    <div className="col-span-1">{index + 1}</div>
                                    <div className="col-span-5 font-semibold">{item?.name}</div>
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
                                    <div className="col-span-2 text-right">{FormatMoney(item?.price)}</div>
                                    <div className="col-span-2 text-right">
                                        {FormatMoney(item?.price * item?.quantity)}
                                    </div>
                                    <div className="col-span-1 text-right">
                                        <Dropdown
                                            overlay={
                                                <Menu>
                                                    <Menu.Item key="1" onClick={() => handleRemoveService(item.id)}>
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
                        <div className="col-span-1 text-center"></div>
                        <div className="col-span-2 text-right font-semibold text-sm text-blue-600">Tổng tiền</div>
                        <div className="col-span-2 text-right font-semibold text-blue-600">
                            {FormatMoney(selectedServices.reduce((a, b) => a + b.price * b.quantity, 0))}
                        </div>
                        <div className="col-span-1 text-right font-semibold text-blue-600"></div>
                    </div>{" "}
                </div>
                <div className="mt-4">
                    <div className=" bg-white  flex items-center justify-end gap-3 p-4  rounded-lg border-[1px] text-sm  shadow-md ">
                        <Button className="bg-blue-600 font-semibold text-white p-2 h-auto">Thanh toán</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProductService;
