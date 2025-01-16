import { useEffect, useState } from "react";
import { app } from "../config";
// import { getMessaging, onMessage } from "firebase/messaging";

// const messaging = getMessaging(app);

const NotificationComponent = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Lắng nghe thông báo khi app đang ở foreground
        // const unsubscribe = onMessage(messaging, (payload) => {
        //     //
        //     const { notification } = payload;
        //     // Cập nhật thông báo vào state
        //     setNotifications((prevNotifications) => [
        //         {
        //             Title: notification?.title,
        //             NotificationMessage: notification?.body,
        //             Id: payload.data.Id,
        //             NotificationType: payload.data.NotificationType,
        //             CreateBy: payload.data.CreateBy,
        //             UrlCallback: payload.data.UrlCallback
        //         },
        //         ...prevNotifications
        //     ]);
        // });
        // // Cleanup subscription
        // return () => unsubscribe;
    }, []);

    return (
        <div>
            <h1>Notifications</h1>
            {notifications.map((notification, index) => (
                <div key={index} style={{ marginBottom: 10 }}>
                    <strong>{notification.title}</strong>
                    <p>{notification.body}</p>
                </div>
            ))}
        </div>
    );
};

export default NotificationComponent;
