import React, { useState, useEffect } from "react";
import { formatTimeAgo } from "../../firebase/untils";
import { GetDataFromLogin } from "../../Utils";
import { Img } from "react-image";
import { mainAction } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import { saveNotification } from "../../firebase/data/indexedDB";
import LazyloadLayout from "../../firebase/Components/LazyloadLayout";
const Notification_ItemComp = ({
    setDataNotification = () => null,
    dataNotification = [],
    itemSize = 0 /* chiều cao item  */,
    DataOut = () => null /* trả về selectedNotification để xem chi tiết */,
    HeightItem = "0px" /* chiều cao item div */,
}) => {
    const OfficerId = GetDataFromLogin("OfficerID");
    const dispatch = useDispatch();

    //#region click vào thông báo
    const handleClickCheckNotification = async (item) => {
        if (item.IsRead === 0) {
            const result = await CPN_spContent_Notification_Update(item.NotificationId);
            if (result?.Status === "OK") {
                if (item.UrlCallback !== null && item.UrlCallback !== "#" && item.UrlCallback !== "") {
                    window.open(item.UrlCallback, "_blank");
                } else {
                    toggleExpand(item);
                }
                let updated = {
                    ...item,
                    ReadAt: new Date().toString(),
                    IsRead: 1,
                };
                let newRedux = dataNotification.map((i) => {
                    if (i.NotificationId == item.NotificationId) {
                        return {
                            ...i,
                            ReadAt: new Date().toString(),
                            IsRead: 1,
                        };
                    }
                    return i;
                });
                await saveNotification(updated);
                setDataNotification([...newRedux]);
                mainAction.updateNotification_FCM({ notificationFcm: newRedux }, dispatch);
            }
        } else {
            if (item.UrlCallback !== null && item.UrlCallback !== "#" && item.UrlCallback !== "") {
                window.open(item.UrlCallback, "_blank");
            } else {
                toggleExpand(item);
            }
        }
    };
    //#endregion

    //#region update đã đọc
    const CPN_spContent_Notification_Update = async (id) => {
        try {
            const pr = {
                OfficerId: OfficerId,
                NotificationId: id,
            };
            const params = {
                Json: JSON.stringify(pr),
                func: "CPN_spContent_Notification_Update",
            };
            const result = await mainAction.API_spCallServer(params, dispatch);
            return result;
        } catch (error) {
            return null;
        }
    };
    //#endregion

    //#region item thông báo
    const NotificationItem = ({ index, style }) => {
        const notification = dataNotification[index];
        return (
            <div
                key={index}
                className="notification-item cursor-pointer "
                style={style}
                onClick={(event) => {
                    event.stopPropagation();
                    handleClickCheckNotification(notification);
                }}
            >
                <div
                    style={{ height: HeightItem }}
                    className={`d-block shadow-sm text-decoration-none list-group-item list-group-item-action ${
                        !notification.IsRead ? "not-seen" : "seen"
                    }`}
                >
                    <div className="d-flex align-items-lg-start vertical-align">
                        <div className="row" style={{ width: "100%" }}>
                            <div className="col-md-1 text-center">
                                <Img src={notification.Image} alt="" className="Notification-Img" />
                            </div>
                            <div className="col-md-11 p-l-20">
                                <div className="row">
                                    <div className="col-md-8">
                                        <p
                                            className={`mb-0 fz-12  ${
                                                !notification.IsRead
                                                    ? "font-weight-bold clor-black Notification-Title"
                                                    : "Notification-Title text-black clor-black font-weight-bold"
                                            }`}
                                        >
                                            {notification.Title + notification.NotificationId}
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        {" "}
                                        <small className="notification-time pull-right">{formatTimeAgo(notification.CreateAt)}</small>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-black mt-2 fz-12 small Notification-Message">{notification.NotificationMessage}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    //#endregion

    //#region đóng mở form xem chi tiết
    const toggleExpand = (item) => {
        DataOut(item);
    };
    //#endregion

    return (
        <LazyloadLayout itemCount={dataNotification.length} itemSize={itemSize}>
            {NotificationItem}
        </LazyloadLayout>
    );
};
export const Notification_Item = React.memo(Notification_ItemComp);
