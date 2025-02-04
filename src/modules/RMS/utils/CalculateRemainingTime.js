import dayjs from "dayjs";

export const CalculateRemainingTime = (startTime, endTime) => {
    const start = dayjs(startTime);
    const end = dayjs(endTime);
  
    // Tính sự chênh lệch về thời gian
    const totalHours = end.diff(start, 'hour'); // Tổng số giờ giữa hai thời điểm
    const days = Math.floor(totalHours / 24); // Số ngày còn lại
    const hours = totalHours % 24; // Số giờ còn lại sau khi chia hết cho ngày
  
    if (days >= 1) {
      return `${days} ngày ${hours} giờ`;
    } else {
      return `${totalHours} giờ`;
    }
  };