// NotificationScreen.js

import React, { useEffect, useState } from "react";
import { getNotifications } from "../data/indexedDB";

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState([]);
    const broadcastChannel = new BroadcastChannel("notifications-sync");

    useEffect(() => {
        loadNotifications();

        // Lắng nghe sự kiện đồng bộ từ BroadcastChannel và cập nhật dữ liệu cụ thể
        broadcastChannel.onmessage = (event) => {
            const { type, notification } = event.data;

            if (type === "add") {
                setNotifications((prev) => [...prev, notification]); // Thêm thông báo mới
            } else if (type === "update") {
                setNotifications((prev) =>
                    prev.map((noti) =>
                        noti.NotificationId === notification.NotificationId
                            ? { ...noti, ...notification } // Cập nhật thông báo
                            : noti,
                    ),
                );
            }
        };

        return () => {
            broadcastChannel.close(); // Đóng kênh khi không sử dụng
        };
    }, []);

    // Hàm load dữ liệu từ IndexedDB
    const loadNotifications = async () => {
        try {
            const data = await getNotifications();
            setNotifications(data);
        } catch (error) {}
    };

    return (
        <div>
            <h1>Danh sách thông báo ({notifications.length})</h1>
            {notifications.length === 0 ? (
                <p>Không có thông báo nào</p>
            ) : (
                <ul>
                    {notifications.map((notification) => (
                        <li key={notification.NotificationId}>
                            <h3>{notification.Title}</h3>
                            <p>{notification.NotificationMessage}</p>
                            <small>{new Date(notification.CreateAt).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificationScreen;
