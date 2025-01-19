import { Button, Space, Table } from "antd";
import { faker } from "@faker-js/faker";
const columns = [
    {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        render: (_, record, index) => index + 1,
        align: "center",
    },
    {
        title: "Mã đặt phòng",
        dataIndex: "bookingCode",
        key: "bookingCode",
        align: "center",
    },
    {
        title: "Phòng",
        dataIndex: "room",
        key: "room",
        align: "center",
    },
    {
        title: "Giờ nhận",
        dataIndex: "receiveTime",
        key: "receiveTime",
        align: "center",
    },
    {
        title: "Giờ trả",
        dataIndex: "returnTime",
        key: "returnTime",
        align: "center",
    },
    {
        title: "Tổng cộng",
        dataIndex: "total",
        key: "total",
        align: "center",
    },
    {
        title: "Khách hàng trả",
        dataIndex: "customerPay",
        key: "customerPay",
        align: "center",
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <div className="space-x-2 a">
                <Button type="primary">Xác nhận {record.name}</Button>
                <Button className="bg-danger-500" >Từ chối</Button>
            </div>
        ),
        align: "center",
    },
];
const formatBookingCode = (index) => {
    const number = (index + 1).toString().padStart(5, "0"); // Định dạng số với 5 chữ số, thêm số 0 ở phía trước
    return `DP${number}`;
};
const data = Array.from({ length: 10 }, (_, index) => ({
    key: index.toString(),
    stt: index + 1,
    bookingCode: formatBookingCode(index),
    room: faker.string.alphanumeric(5).toUpperCase(),
    receiveTime: faker.date.recent().toLocaleTimeString(),
    returnTime: faker.date.soon().toLocaleTimeString(),
    total: faker.commerce.price(),
    customerPay: faker.commerce.price(),
}));
export const RoomList = () => {
    return (
        <div>
            <Table className="table-reset" columns={columns} dataSource={data} pagination={false} />
        </div>
    );
};
