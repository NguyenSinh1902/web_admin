import React, { useState } from "react";
import { Button, Input, Card } from "antd";

const CloseShiftModal = () => {

  return (
    <div className=" mt-2 bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-6">
              <p>
                Nhân viên: <span className="font-semibold">0929292606</span>
              </p>
              <p>
                Giờ mở ca:{" "}
                <span className="font-semibold">24/10/2023 20:06</span>
              </p>
              <p>Giờ đóng ca: </p>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Tiền mặt đầu ca
            </label>
            <Input
              type="text"
              className="w-full border rounded px-3 py-2"
              value="2,010,000"
              readOnly
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">
              Tiền mặt trong ca
            </label>
            <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-4">
              <Card class="bg-gray-100 p-4 rounded-md">
                <p class="font-semibold mb-2 text-sm">
                  Bán hàng <span class="text-gray-500">2 hóa đơn</span>
                </p>
                <ul class="space-y-2">
                  <li>
                    1. Tiền mặt <span class="float-right">120,000</span>
                  </li>
                  <li>
                    2. Chuyển khoản <span class="float-right">60,000</span>
                  </li>
                  <li>
                    3. Thẻ <span class="float-right">0</span>
                  </li>
                  <li>
                    4. Điểm <span class="float-right">0</span>
                  </li>
                  <li>
                    5. Công nợ <span class="float-right">0</span>
                  </li>
                </ul>
                <div class="border-t mt-2 pt-2">
                  <span class="font-semibold">Tổng</span>
                  <span class="float-right">180,000</span>
                </div>
              </Card>
              <Card class="bg-gray-100 p-4 rounded-md">
                <p class="font-semibold mb-2 text-sm">
                  Phiếu thu <span class="text-gray-500">0 phiếu</span>
                </p>
                <ul class="space-y-2">
                  <li>
                    1. Tiền mặt <span class="float-right">0</span>
                  </li>
                  <li>
                    2. Chuyển khoản <span class="float-right">0</span>
                  </li>
                  <li>
                    3. Thẻ <span class="float-right">0</span>
                  </li>
                  <li>
                    4. Điểm <span class="float-right">0</span>
                  </li>
                </ul>
                <div class="border-t mt-2 pt-2">
                  <span class="font-semibold">Tổng</span>
                  <span class="float-right">0</span>
                </div>
              </Card>
              <Card class="bg-gray-100 p-4 rounded-md">
                <p class="font-semibold mb-2 text-sm">
                  Phiếu chi <span class="text-gray-500">0 phiếu</span>
                </p>
                <ul class="space-y-2">
                  <li>
                    1. Tiền mặt <span class="float-right">0</span>
                  </li>
                  <li>
                    2. Chuyển khoản <span class="float-right">0</span>
                  </li>
                  <li>
                    3. Thẻ <span class="float-right">0</span>
                  </li>
                  <li>
                    4. Điểm <span class="float-right">0</span>
                  </li>
                </ul>
                <div class="border-t mt-2 pt-2">
                  <span class="font-semibold">Tổng</span>
                  <span class="float-right">0</span>
                </div>
              </Card>
              <Card class="bg-gray-100 p-4 rounded-md">
                <p class="font-semibold mb-2 text-sm">
                  Trả hàng <span class="text-gray-500">0 phiếu</span>
                </p>
                <ul class="space-y-2">
                  <li>
                    1. Tiền mặt <span class="float-right">0</span>
                  </li>
                  <li>
                    2. Chuyển khoản <span class="float-right">0</span>
                  </li>
                  <li>
                    3. Thẻ <span class="float-right">0</span>
                  </li>
                  <li>
                    4. Điểm <span class="float-right">0</span>
                  </li>
                </ul>
                <div class="border-t mt-2 pt-2">
                  <span class="font-semibold">Tổng</span>
                  <span class="float-right">0</span>
                </div>
              </Card>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2">
              Tiền mặt cuối ca
            </label>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-gray-700 mb-1">
                  Tiền mặt bàn giao thực tế
                </label>
                <Input
                  type="text"
                  class="w-full border rounded px-3 py-2"
                  value="2,130,000"
                  readonly
                />
              </div>
              <div>
                <label class="block text-gray-700 mb-1">
                  Số tiền chênh lệch
                </label>
                <Input
                  type="text"
                  class="w-full border rounded px-3 py-2"
                  value="0"
                  readonly
                />
              </div>
              <div>
                <label class="block text-gray-700 mb-1">Ghi chú</label>
                <Input
                  type="text"
                  class="w-full border rounded px-3 py-2"
                  placeholder="Nhập ghi chú. Ví dụ: mua đồ hết 50k"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button className="text-blue-500">
              <i className="fas fa-sync-alt"></i> Cập nhật dữ liệu
            </button>
            <div className="space-x-2">
              <Button type="primary" className="">
                Đóng ca
              </Button>
              <Button className="bg-blue-500 text-white px-4 py-2 rounded">
                Đóng ca và in phiếu bàn giao
              </Button>
            </div>
          </div>
        </div>
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <Button
    //     type="primary"
    //     onClick={showModal}
    //     className="bg-blue-500 text-white px-4 py-2 rounded"
    //   >
    //     Open Shift Modal
    //   </Button>

    //   <Modal
    //     title="Phiếu bàn giao ca"
    //     open={isModalOpen}
    //     onOk={handleOk}
    //     onCancel={handleCancel}
    //     footer={null}
    //     width={1100}
    //     className="rounded-lg"
    //   >
        
    //   </Modal>
    // </div>
  );
};

export default CloseShiftModal;
