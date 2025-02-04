import { faker } from "@faker-js/faker";
const formatBookingCode = (index) => {
  const number = (index + 1).toString().padStart(5, "0"); // Định dạng số với 5 chữ số, thêm số 0 ở phía trước
  return `DP${number}`;
};
export const generateRandomRoom = () => {
  // Định nghĩa đối tượng ánh xạ giữa tag và màu nền
  const tagColorMap = {
    "Đang sửa chữa" : "orange",
    "Đang trống": "gray",
    "Đang sử dụng": "green",
    "Bẩn": "red",
  };

  // Tạo phòng ngẫu nhiên
  const tag = faker.helpers.arrayElement([
    "Đang sửa chữa",
    "Đang trống",
    "Đang sử dụng",
    "Bẩn",
  ]);

  return {
    id: faker.number.int(), // Tạo id ngẫu nhiên
    name: `P.${faker.number.int({ min: 100, max: 999 })}`, // Tạo tên phòng ngẫu nhiên như "P.402"
    title: //Nội dung của tiêu đề trong lịch dạng lưới
    Math.random() < 0.5
      ? `${faker.name.firstName()} ${faker.name.lastName()}`
      : "Khách lẻ",
    tag, // Tag phòng ngẫu nhiên
    resourceId: faker.helpers.arrayElement(["1", "2", "3", "4"]),
    start: faker.date
      .between({
        from: new Date("2024-11-15T08:00:00"),
        to: new Date("2024-11-20T10:00:00"),
      })
      .toISOString(),
    end: faker.date
      .between({
        from: new Date("2024-12-20T08:00:00"),
        to: new Date("2024-12-25T10:00:00"),
      })
      .toISOString(),
    statusCleanRoom: faker.helpers.arrayElement(["Sạch", "Chưa dọn"]), // Chọn ngẫu nhiên trạng thái
    type: faker.helpers.arrayElement([
      "Phạm Tơ Bít",
      "Hồ Nguyễn Minh Hiếu",
      "Nguyễn Văn Duy",
      "Khách lẻ",
    ]), // Chọn ngẫu nhiên loại phòng
    prices: [
      faker.commerce.price(200000, 500000, 0, "₫"), // Giá ngẫu nhiên
      faker.commerce.price(1000000, 3000000, 0, "₫"),
      faker.commerce.price(500000, 1500000, 0, "₫"),
    ], // Tạo giá phòng ngẫu nhiên
    backgroundColor: tagColorMap[tag], // Gán màu nền dựa trên tag
    extendedProps: {
      tagColorMap:tagColorMap[tag],
      statusBookingRoom: faker.helpers.arrayElement([
        "Đang sửa chữa",
        "Đang trống",
        "Đang sử dụng",
        "Bẩn",
      ]),
      bookingCode: formatBookingCode(Math.random(1,100)), // Mã đặt phòng ngẫu nhiên
      roomType: faker.helpers.arrayElement([
        "Phòng giường đôi",
        "Phòng giường đơn",
        "VIP",
        "Phòng gia đình",
      ]), // Loại phòng
      guestCount: faker.number.int({ min: 1, max: 4 }), // Số lượng khách từ 1 đến 4
    },
  };
};
