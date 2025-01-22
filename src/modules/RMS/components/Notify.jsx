import { Timeline } from "antd";
import React from "react";

const Notify = () => {

  const activities = [
    { name: "PhanHa", amount: "3,200,000", time: "4 giờ trước" },
    { name: "PhanHa", amount: "29,000,000", time: "một ngày trước" },
    { name: "PhanHa", amount: "4,800,000", time: "một ngày trước" },
    { name: "Hoàng Long", amount: "43,993,000", time: "7 ngày trước" },
    { name: "Hoàng Long", amount: "30,000,000", time: "7 ngày trước" },
    { name: "Hoàng Long", amount: "4,622,000", time: "7 ngày trước" },
    { name: "Hoàng Long", amount: "105,695,000", time: "7 ngày trước" },
    { name: "Hoàng Long", amount: "13,195,000", time: "7 ngày trước" },
    { name: "Hoàng Long", amount: "10,600,000", time: "7 ngày trước" },
    { name: "Hoàng Long", amount: "6,783,000", time: "7 ngày trước" },
  ];
  return (
    <div className="p-2">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">CÁC HOẠT ĐỘNG GẦN ĐÂY</h2>
        <Timeline>
          {activities.map((activity, index) => (
            <Timeline.Item
              key={index}
              dot={<i className="fas fa-file-alt text-blue-500"></i>}
            >
              <p className="text-sm">
                <span className="font-bold text-blue-600">{activity.name}</span>{" "}
                vừa tạo hóa đơn với giá trị{" "}
                <span className="font-bold">{activity.amount}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  );
};

export default Notify;
