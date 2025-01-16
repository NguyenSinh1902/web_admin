import Modal from "react-awesome-modal";
import { Alertsuccess, Alertwarning, FormatDateJson, GetDataFromLogin } from "../../Utils";
import React, { useEffect, useState } from "react";
import { formatTimeAgo } from "../untils";
import { Img } from "react-image";
// import { Notification_Item } from "../../Common/Notification/Notification_Item";
// import { updateAllUnreadNotifications } from "../data/indexedDB";
import { callApi } from "../../services";
import { updateNotification_FCM } from "../../store";
import { useMessages } from "../../hooks";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Breadcrumbs,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ButtonAdd, ButtonConfirm } from "../../commons";

const ListNotification = () => {
    // const messaging = getMessaging(app);
    let OfficerId = GetDataFromLogin("OfficerID");
    const [messages, dispatch] = useMessages();
    const notificationRedux = messages.notificationFcm; // lấy data từ redux ra
    const notificationUnseen = messages.notificationFcm.filter((i) => i.IsRead === 0); // lấy data từ redux ra
    const notificationSeen = messages.notificationFcm.filter((i) => i.IsRead === 1); // lấy data từ redux ra
    const [filter, setFilter] = useState("all");
    const [loadingCheck, setLoadingCheck] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    useEffect(() => {
        if (selectedNotification) {
            if (
                selectedNotification.UrlCallback === null ||
                selectedNotification.UrlCallback === "#" ||
                selectedNotification.UrlCallback === ""
            ) {
                openModal(selectedNotification);
            }
        }
    }, [selectedNotification]);

    //#region modal chi tiết thông báo

    //#region để mở modal và đặt thông báo được chọn
    const openModal = (notification) => {
        setSelectedNotification(notification);
        setIsVisible(true);
    };
    //#endregion

    //#region Hàm để đóng modal và reset thông báo được chọn
    const closeModal = () => {
        setIsVisible(false);
        setSelectedNotification(null);
    };
    //#endregion

    //#region xem tất cả
    const handleReadAll = async () => {
        await CPN_spContent_Notification_Update(0);
        let newRedux = notificationRedux.map((i) => {
            if (i.IsRead == 0) {
                return {
                    ...i,
                    ReadAt: new Date().toString(),
                    IsRead: 1,
                };
            }
            return i;
        });
        // await updateAllUnreadNotifications();
        dispatch(updateNotification_FCM(newRedux));
    };
    //#endregion

    //#region xử lý cập nhật trạng thái
    const CPN_spContent_Notification_Update = async (id) => {
        if (notificationRedux.filter((x) => x.IsRead === 0).length === 0 && id === 0) {
            Alertwarning("Chưa có thông báo mới !");
            return null;
        }
        setLoadingCheck(true);
        try {
            const pr = {
                OfficerId: OfficerId,
                NotificationId: id,
            };
            const params = {
                Json: JSON.stringify(pr),
                func: "CPN_spContent_Notification_Update",
            };

            const result = await callApi.Main(params);
            if (result?.Status === "OK" && id === 0) {
                let data = notificationRedux.map((x) => {
                    return {
                        ...x,
                        IsRead: 1,
                    };
                });
                dispatch(updateNotification_FCM([]));
                Alertsuccess(result?.ReturnMess);
                setLoadingCheck(false);
                return result;
            }
            setLoadingCheck(false);
            return result;
        } catch (error) {
            setLoadingCheck(false);
            return null;
        }
    };

    //#endregion

    //#region item
    const RenderItem = React.memo(({ items = [] }) => {
        return (
            <div className="overflow-auto h-full">
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList height={height} itemCount={items.length} itemSize={80} width={width}>
                            {({ index, style }) => {
                                const isLastItem = index === items.length - 1;
                                const notification = items[index];
                                return (
                                    <div
                                        style={style}
                                        className={`block p-3 overflow-hidden ${
                                            !notification.IsRead ? "bg-[#ffd6aa]" : "bg-white"
                                        } hover:bg-opacity-40 hover:bg-[#ffd6aa] cursor-pointer  ${
                                            isLastItem ? "" : "border-b"
                                        }`}
                                        onClick={(event) => {
                                            openModal(notification);
                                        }}
                                    >
                                        <div className="flex items-center justify-center ">
                                            <div className="basis-auto flex items-center justify-center">
                                                <Img
                                                    src={
                                                        notification.Image
                                                            ? notification.Image
                                                            : "assets/img/cak-logo.png"
                                                    }
                                                    alt=""
                                                    style={{
                                                        height: "45px",
                                                        width: "45px",
                                                        marginRight: "15px",
                                                        verticalAlign: "middle",
                                                        objectFit: "cover",
                                                        borderRadius: "5px",
                                                    }}
                                                />
                                            </div>
                                            <div style={{ width: "calc(100% - 100px)" }} className="flex-grow">
                                                <div className="flex justify-between items-center ">
                                                    <div
                                                        className={`mb-0 pr-6 text-[12px] flex-grow ${
                                                            !notification.IsRead ? "font-bold" : "text-black font-bold"
                                                        }`}
                                                        style={{
                                                            whiteSpace: "nowrap",
                                                            textOverflow: "ellipsis",
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        {notification.Title}
                                                    </div>
                                                    <div className="basis-auto">
                                                        <small>{formatTimeAgo(notification.ReadAt)}</small>
                                                    </div>
                                                </div>
                                                <div
                                                    className="text-black mt-2 text-[12px]"
                                                    style={{
                                                        whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                        width: "100%",
                                                    }}
                                                >
                                                    {notification.NotificationMessage}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </div>
        );
    });

    //#endregion

    return (
        <div className=" w-full h-[calc(100vh-80px)] flex flex-col  p-3  relative overflow-hidden">
            <div className="w-full  basis-auto grid-cols-12 lg:grid hidden">
                <div className="col-span-12 md:col-span-6 ">
                    <Breadcrumbs>
                        <Link to="#">Danh sách thông báo</Link>
                    </Breadcrumbs>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <button
                        type="button"
                        class={
                            "float-end text-white bg-green-700 hover:bg-green-100 hover:text-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2 "
                        }
                    >
                        {/* {disabled ? <i className="fas fa-spinner fa-spin mr-2"></i> :  */}
                        <i className={"fas fa-check"}></i>
                        {/* } */}
                        Đánh dấu đã đọc tất cả
                    </button>
                </div>
            </div>
            <div className="py-4 flex flex-col flex-grow overflow-hidden">
                <Tabs value="tb" className="flex flex-col flex-grow">
                    <TabsHeader className="basis-auto">
                        <Tab key={1} value={"tb"}>
                            Tất cả thông báo ({notificationRedux.length})
                        </Tab>
                        <Tab key={2} value={"dd"}>
                            Đã đọc ({notificationSeen.length})
                        </Tab>
                        <Tab key={3} value={"cd"}>
                            Chưa đọc ({notificationUnseen.length})
                        </Tab>
                    </TabsHeader>
                    <TabsBody className="flex-grow flex flex-col overflow-hidden">
                        <TabPanel key={1} value={"tb"} className="flex-grow flex flex-col overflow-hidden px-0">
                            <RenderItem items={notificationRedux} />
                        </TabPanel>
                        <TabPanel key={2} value={"dd"} className="flex-grow flex flex-col overflow-hidden px-0">
                            <RenderItem items={notificationSeen} />
                        </TabPanel>
                        <TabPanel key={3} value={"cd"} className="flex-grow flex flex-col overflow-hidden px-0">
                            <RenderItem items={notificationUnseen} />
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </div>
            {selectedNotification && (
                <Dialog
                    size={"lg"}
                    open={isVisible}
                    handler={closeModal}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <DialogHeader className="flex justify-between items-center">
                        <div className="flex-grow flex gap-4 justify-end">
                            <div className="basis-auto">
                                <Img
                                    src={selectedNotification?.Image}
                                    alt=""
                                    className="w-[55px] h-[55px] object-cover"
                                />
                            </div>
                            <div className="flex-grow flex flex-col justify-around">
                                <h6 className={`mb-0 text-color-main text-black font-weight-bold"}`}>
                                    {selectedNotification?.Title}
                                </h6>
                                <small className=" font-light text-sm">
                                    <i class="fa fa-clock font-light text-sm" aria-hidden="true"></i>{" "}
                                    {FormatDateJson(selectedNotification?.CreateAt)}
                                </small>
                            </div>
                        </div>
                        <div className="basis-auto flex items-end whitespace-nowrap">
                            <svg
                                width="20px"
                                height="20px"
                                viewBox="-2.4 -2.4 28.80 28.80"
                                fill="none"
                                xmlns="http:www.w3.org/2000/svg"
                                stroke="#218838"
                                strokeWidth="0.00024"
                            >
                                <g strokeWidth="0"></g>
                                <g strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.24"></g>
                                <g>
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.4933 6.93502C15.8053 7.20743 15.8374 7.68122 15.565 7.99325L7.70786 16.9933C7.56543 17.1564 7.35943 17.25 7.14287 17.25C6.9263 17.25 6.72031 17.1564 6.57788 16.9933L3.43502 13.3933C3.16261 13.0812 3.19473 12.6074 3.50677 12.335C3.8188 12.0626 4.29259 12.0947 4.565 12.4068L7.14287 15.3596L14.435 7.00677C14.7074 6.69473 15.1812 6.66261 15.4933 6.93502Z"
                                        fill="#218838"
                                    ></path>
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M20.5175 7.01946C20.8174 7.30513 20.829 7.77986 20.5433 8.07981L11.9716 17.0798C11.8201 17.2389 11.6065 17.3235 11.3872 17.3114C11.1679 17.2993 10.9649 17.1917 10.8318 17.0169L10.4035 16.4544C10.1526 16.1249 10.2163 15.6543 10.5458 15.4034C10.8289 15.1878 11.2161 15.2044 11.4787 15.4223L19.4571 7.04531C19.7428 6.74537 20.2175 6.73379 20.5175 7.01946Z"
                                        fill="#218838"
                                    ></path>
                                </g>
                            </svg>
                            <small className="font-light text-sm">{formatTimeAgo(selectedNotification?.ReadAt)}</small>
                        </div>
                    </DialogHeader>
                    <DialogBody className="max-h-[42rem] overflow-y-auto overflow-x-hidden">
                        {selectedNotification?.NotificationMessage}
                    </DialogBody>
                    <DialogFooter>
                        <Button variant="text" color="red" onClick={closeModal} className="mr-1">
                            <span>Đóng</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            )}
        </div>
    );
};

export default ListNotification;
