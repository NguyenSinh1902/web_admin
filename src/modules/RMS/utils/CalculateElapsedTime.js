import dayjs from 'dayjs';

export const CalculateElapsedTime = (startTime) => {
  const start = dayjs(startTime);
  const now = dayjs(); // Thời gian hiện tại

  // Tính sự chênh lệch về thời gian
  const totalHours = now.diff(start, 'hour'); // Tổng số giờ giữa thời gian bắt đầu và hiện tại
  const days = Math.floor(totalHours / 24); // Số ngày đã qua
  const hours = totalHours % 24; // Số giờ còn lại sau khi chia hết cho ngày

  if (days >= 1) {
    return `${days} ngày ${hours} giờ`;
  } else {
    return `${totalHours} giờ`;
  }
};
