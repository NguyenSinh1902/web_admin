import { Alerterror, Alertsuccess, Alertwarning, GetDataFromLogin } from "../../Utils";
import { mainAction } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import { SendNotificationFcm } from "../services";

function HomeTest() {
    let OfficerId = GetDataFromLogin("OfficerID");
    const dispatch = useDispatch();

    const CPN_spNotificationHistory_Save = async () => {
        let sample = {
            NotificationType: 0, // 0 là tất cả, 1 thì phải trả về mảng token
            CreateBy: OfficerId,
            Title: "Test thông báo ❤️",
            NotificationMessage:
                "Nhật Linh test chức năng thông báo - Nhật Linh test chức năng thông báo - Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo Nhật Linh test chức năng thông báo- Nhật Linh test chức năng thông báo🍺🤷‍♂️🍻 - Nhật Linh test chức năng thông báo - Nhật Linh test chức năng thông báo - Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo Nhật Linh test chức năng thông báo- Nhật Linh test chức năng thông báo🍺🤷‍♂️🍻 - Nhật Linh test chức năng thông báo - Nhật Linh test chức năng thông báo - Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo Nhật Linh test chức năng thông báo- Nhật Linh test chức năng thông báo🍺🤷‍♂️🍻*- Nhật Linh test chức năng thông báo - Nhật Linh test chức năng thông báo - Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo -Nhật Linh test chức năng thông báo Nhật Linh test chức năng thông báo- Nhật Linh test chức năng thông báo🍺🤷‍♂️🍻",
            OfficerReceivers: [{ OfficerId: 2098 }, { OfficerId: 299999 }],
            Image: "https://netco.com.vn/_next/image?url=https%3A%2F%2Fmediaimages.vps.vn%2FMain%2FMain%2F2024%2F08%2F30%2Funtitled-3(1).png&w=640&q=75",
            UrlCallback: "",
            CreateAt: new Date().toISOString(),
        };
        // valid input
        const pr = {
            NotificationType: sample.NotificationType, // 0 là tất cả, 1 thì phải trả về mảng token
            CreateBy: sample.CreateBy,
            Title: sample.Title,
            NotificationMessage: sample.NotificationMessage,
            OfficerReceivers: sample.OfficerReceivers,
            Image: sample.Image,
            UrlCallback: sample.UrlCallback,
        };
        const params = {
            Json: JSON.stringify(pr),
            func: "CPN_spNotificationHistory_Save",
        };
        const result = await mainAction.API_spCallServer(params, dispatch);
        if (result.Status === "OK") {
            Alertsuccess(result.ReturnMess);

            //#region xử lý tokens
            let tokens = [];
            if (result?.ListToken) {
                result?.ListToken.forEach((item) => {
                    tokens.push(item.Token);
                });
            }
            let data = {
                Id: parseInt(result?.Id),
                NotificationType: pr.NotificationType,
                CreateBy: OfficerId,
                Title: pr.Title,
                NotificationMessage: pr.NotificationMessage,
                Image: pr.Image,
                ListToken: tokens || [],
                UrlCallback: pr.UrlCallback,
            };

            // gọi api tới server yêu cầu gửi thông báo hàng loạt
            await SendNotificationFcm(data);
            return;
        }
        if (result.Status === "NOTOK") {
            Alerterror(result.ReturnMess);
            return;
        }
    };

    const handle = async () => {
        CPN_spNotificationHistory_Save();
    };

    return (
        <div className="content-wrapper p-5">
            <button onClick={handle}>user1 Send</button>
            <hr />
        </div>
    );
}

export default HomeTest;
