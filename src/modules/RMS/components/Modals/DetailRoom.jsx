import { Button, Divider } from "antd";
import React from "react";
import {
  FormatDateJsonPro,
  CalculateRemainingTime,
  CalculateElapsedTime,
} from "../../utils";

const DetailRoom = ({ data = {} }) => {
  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="bg-white rounded-lg  w-full ">
        <div className="border rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-base font-semibold">
              {data?.extendedProps?.roomType}
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm font-medium px-2 py-1 rounded ${
                  data?.extendedProps?.status === "completed"
                    ? "bg-green-100 text-green-700" // Đã hoàn thành
                    : data?.extendedProps?.status === "pending"
                    ? "bg-gray-100 text-gray-700" // Đang chờ
                    : "bg-red-100 text-red-700" // Đã huỷ
                }`}
              >
                {data?.extendedProps?.status === "completed"
                  ? "Đang sử dụng"
                  : data?.extendedProps?.status === "pending"
                  ? "Đang chờ"
                  : "Đã huỷ"}
              </span>
              <i className="fas fa-dollar-sign text-green-500"></i>
            </div>
          </div>
          <Divider />
          <div className="grid grid-cols-6 gap-4 text-sm">
            <div className="col-span-3 border-r-2">
              <p className="text-gray-500">Khách hàng</p>
              <p className="font-semibold">{data?.title}</p>
            </div>
            <div className="col-span-2 border-r-2">
              <p className="text-gray-500">Số lượng khách</p>
              <p className="font-semibold">{data?.extendedProps?.guestCount}</p>
            </div>
            <div>
              <p className="text-gray-500">Mã đặt phòng</p>
              <p className="font-semibold">
                {data?.extendedProps?.bookingCode}
              </p>
            </div>
            <div className="col-span-3 grid grid-cols-2 ">
              <div className="border-r-2">
                <p className="text-gray-500">Nhận phòng</p>
                <p className="font-semibold">
                  {FormatDateJsonPro(data.start, 5)}
                </p>
              </div>
              <div className="ml-2 border-r-2">
                <p className="text-gray-500">Trả phòng</p>
                <p className="font-semibold">
                  {FormatDateJsonPro(data.end, 5)}
                </p>
              </div>
            </div>
            <div className="col-span-3">
              <p className="text-gray-500">Thời gian lưu trú</p>
              <span className="font-semibold">
                {CalculateRemainingTime(data.start, data.end)}
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded ml-2">
                Đã sử dụng: {CalculateElapsedTime(data.start)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center mb-4">
            <i className="fas fa-pen text-gray-500 mr-2"></i>
            <p className="text-gray-500">Chưa có ghi chú</p>
          </div>
          <div className="flex justify-between items-center gap-4 w-[240px] p-3 bg-gray-100 rounded-lg">
            <div className="flex flex-col gap-2">
              <p>P.202</p>
              <p>Khách đã trả</p>
            </div>
            <div className="flex flex-col gap-2 font-semibold">
              <p className=" text-green-600">750,000</p>
              <p className="">0</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-3">
          <Button
            className="bg-white border font-semibold border-green-600 text-green-600  rounded"
          >
            Sửa đặt phòng
          </Button>
          <Button
            className=" border bg-green-600 font-semibold border-green-600 text-white  rounded"
          >
            Trả phòng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailRoom;
