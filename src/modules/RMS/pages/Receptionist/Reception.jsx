import React, { useEffect, useState } from "react";
import { Button, Drawer, Dropdown, Menu, Modal } from "antd";
import {
    UserOutlined,
    PlusOutlined,
    CalendarOutlined,
    CloseOutlined,
    MenuFoldOutlined,
    BarChartOutlined,
    HomeOutlined,
    FileTextOutlined,
} from "@ant-design/icons";
import { CalenderBookRoom } from "./CalenderBookRoom";
import { Invoices } from "./Invoices";
import {
    EndOfDayReport,
    GuestStaying,
    ReceptionReport,
    CreateReceipt,
    WaitingConfirmation,
    RoomStatusList,
} from "../../components/Modals";
import CustomerForm from "../../common/CustomerForm";
import BookRoomFastModal from "../../components/Modals/BookRoomFastModal";

export const Reception = () => {
    const [invoices, setInvoices] = useState([]);
    const [activeTab, setActiveTab] = useState("booking");
    const [modalWaitingConfirm, setModalWaitingConfirm] = useState(false); //modal chờ xác nhận
    const [modalRoom, setModalRoom] = useState(false); //buồng phòng
    const [modalGuestsStaying, setModalGuestsStaying] = useState(false); //modal khách lưu trú
    const [modalCreateReceipt, setModalCreateReceipt] = useState(false); //modal lập phiếu thu
    const [modalReceptionReport, setModalReceptionReport] = useState(false); //modal báo cáo lễ tân
    const [modalEndOfDayReport, setModalEndOfDayReport] = useState(false); //modal báo cáo cuối ngày
    const [isModalOpenCustomer, setIsModalOpenCustomer] = useState(false);
    const [isOpenModalBookRoomFast, setIsOpenModalBookRoomFast] = useState(false);

    const handleOkCustomer = () => {
        setIsModalOpenCustomer(false);
    };
    const handleCancelCustomer = () => {
        setIsModalOpenCustomer(false);
    };

    const menuItems = [
        {
            key: "1",
            label: "Quản lý",
            icon: <UserOutlined />,
            // action: () => setModalRoom(true),
        },
        {
            key: "2",
            label: "Buồng phòng",
            icon: <HomeOutlined />,
            action: () => setModalRoom(true),
        },
        {
            key: "3",
            label: "Khách lưu trú",
            icon: <UserOutlined />,
            action: () => setModalGuestsStaying(true),
        },
        {
            key: "4",
            label: "Lập phiếu thu",
            icon: <FileTextOutlined />,
            action: () => setModalCreateReceipt(true),
        },
        {
            key: "5",
            label: "Báo cáo lễ tân",
            icon: <BarChartOutlined />,
            action: () => setModalReceptionReport(true),
        },
        {
            key: "6",
            label: "Báo cáo cuối ngày",
            icon: <BarChartOutlined />,
            action: () => setModalEndOfDayReport(true),
        },
    ];
    const handleMenuClick = (item) => {
        if (item.action) {
            item.action(); // Gọi hành động tương ứng
        }
    };
    const menu = (
        <Menu>
            {menuItems.map((item) => (
                <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuClick(item)}>
                    {item.label}
                </Menu.Item>
            ))}
        </Menu>
    );
    useEffect(() => {
        const storedInvoices = JSON.parse(localStorage.getItem("invoices_rms")) || [];
        setInvoices(storedInvoices);
    }, []);
    useEffect(() => {
        localStorage.setItem("invoices_rms", JSON.stringify(invoices));
        if (invoices?.length == 0) {
            setActiveTab("booking");
        }
    }, [invoices]);
    const addInvoice = () => {
        const newInvoice = {
            id: invoices.length + 1,
            name: `Hóa đơn ${invoices.length + 1}`,
        };
        setInvoices([...invoices, newInvoice]);
        setActiveTab(newInvoice.name); // Đặt hóa đơn mới là active
    };

    const removeInvoice = (id) => {
        setInvoices(invoices.filter((invoice) => invoice.id !== id));
    };

    const renderInvoices = () => {
        return invoices.map((invoice) => (
            <div
                key={invoice.id}
                className={`flex items-center space-x-1 cursor-pointer text-sm font-semibold ${
                    activeTab === invoice.name ? "bg-white text-green-600 px-3 py-2 rounded-full" : "text-white"
                }`}
                onClick={() => setActiveTab(invoice.name)} // Chuyển thành invoice.name
            >
                <span>{invoice.name}</span>
                <CloseOutlined style={{ fontSize: "12px" }} onClick={() => removeInvoice(invoice.id)} />
            </div>
        ));
    };

    return (
        <div style={{ height: "calc(100vh - 87px)" }} className="bg-gray-100 flex flex-col ">
            {/* header */}
            <div className="bg-green-700 p-2 flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div
                        type="text"
                        className={`ml-4 flex items-center px-4 py-2 rounded-full text-sm font-semibold cursor-pointer ${
                            activeTab === "booking" ? "bg-white text-green-600" : "bg-transparent text-white"
                        }`}
                        icon={<CalendarOutlined className="mr-2" />}
                        onClick={() => setActiveTab("booking")}
                    >
                        Lịch đặt phòng
                    </div>
                    {invoices.length === 0 && (
                        <div
                            className="flex items-center space-x-2  px-2 py-1 rounded-full cursor-pointer text-white text-sm font-semibold"
                            onClick={addInvoice}
                        >
                            <span>Hóa đơn bán lẻ</span>
                            <PlusOutlined />
                        </div>
                    )}

                    {/* Danh sách hóa đơn */}

                    {invoices.length > 0 && (
                        <>
                            {renderInvoices()}
                            <div
                                className=" bg-white text-green-600 px-2 py-1 rounded-full cursor-pointer"
                                onClick={addInvoice}
                            >
                                <PlusOutlined style={{ fontSize: "12px" }} />
                            </div>
                        </>
                    )}
                </div>

                {/* Các nút điều hướng khác */}
                <div className="flex items-center space-x-4 ">
                    {/* <i className="fas fa-bell text-white"></i> */}
                    <div
                        onClick={() => setModalWaitingConfirm(true)}
                        className="text-white text-sm font-semibold hover:text-green-500 space-x-2 cursor-pointer md:flex hidden items-center "
                    >
                        <CalendarOutlined /> <div>Chờ xác nhận</div>
                    </div>
                    {/* <i className="fas fa-map-marker-alt text-white"></i> */}
                    <span className="text-white font-semibold text-sm md:block hidden">Chi nhánh trung tâm</span>
                    <div className="bg-white rounded-full px-2 py-1 cursor-pointer">
                        <Dropdown overlay={menu} trigger={["click"]}>
                            <MenuFoldOutlined style={{ color: "green" }} />
                        </Dropdown>
                    </div>
                </div>
            </div>

            {/* end */}

            {activeTab == "booking" && <CalenderBookRoom />}
            {activeTab != "booking" && <Invoices />}

            <Modal
                open={modalWaitingConfirm}
                width={1000}
                onCancel={() => setModalWaitingConfirm(false)}
                footer={null}
                className="custom-modal"
                title={<h2 className="text-xl font-semibold">Chờ xác nhận</h2>}
            >
                <WaitingConfirmation visible={true} />
            </Modal>
            {/* end */}

            {/* form statuslist */}
            <Drawer
                title={<div className="text-base">Trạng thái buồng phòng </div>}
                // width={window.innerWidth > 1100 ? 1200 : "100%"}
                placement="right"
                footer={
                    <div className="flex items-center gap-2 justify-end">
                        <Button className="bg-green-700 font-semibold text-white">Làm sạch</Button>
                    </div>
                }
                open={modalRoom}
                onClose={() => setModalRoom(false)}
            >
                <RoomStatusList />
            </Drawer>
            {/* end */}

            {/* Khách lưu trú */}
            <Modal
                open={modalGuestsStaying}
                width={1200}
                onCancel={() => setModalGuestsStaying(false)}
                footer={null}
                className="custom-modal"
                title={<h2 className="text-base font-semibold">Khách lưu trú</h2>}
            >
                <GuestStaying />
            </Modal>
            {/* end */}

            {/* modal khách hàng */}
            <Modal
                width={900}
                title="Thêm khách hàng"
                open={isModalOpenCustomer}
                onOk={handleOkCustomer}
                footer={<></>}
                onCancel={handleCancelCustomer}
            >
                <CustomerForm />
            </Modal>
            {/* end */}

            {/* modal báo cáo lễ tân */}
            <Modal
                open={modalReceptionReport}
                width={1200}
                onCancel={() => setModalReceptionReport(false)}
                footer={null}
                className="custom-modal"
                title={<h2 className="text-base font-semibold">Báo cáo lễ tân</h2>}
            >
                <ReceptionReport />
            </Modal>
            {/* emd */}

            {/* modal lập phiếu thu */}
            <Modal
                open={modalCreateReceipt}
                width={900}
                onCancel={() => setModalCreateReceipt(false)}
                footer={null}
                className="custom-modal"
                title={<h2 className="text-base font-semibold">Lập phiếu thu</h2>}
            >
                <CreateReceipt />
            </Modal>
            {/* emd */}

            {/* modal lập phiếu thu */}
            <Modal
                open={modalEndOfDayReport}
                width={900}
                onCancel={() => setModalEndOfDayReport(false)}
                footer={null}
                className="custom-modal"
                title={<h2 className="text-base font-semibold">Báo cáo cuối ngày</h2>}
            >
                <EndOfDayReport />
            </Modal>

            <Modal
                open={isOpenModalBookRoomFast}
                width={900}
                onCancel={() => setIsOpenModalBookRoomFast(false)}
                footer={null}
                className="custom-modal"
                title={<h2 className="text-base font-semibold">Đặt/Nhận phòng nhanh</h2>}
            >
                <BookRoomFastModal />
            </Modal>
        </div>
    );
};
