import locale from "antd/es/date-picker/locale/vi_VN";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

export const DatePickerAntd = ({
    type = "single",
    value,
    onChange,
    placeholder = "Chọn ngày",
    format = "DD/MM/YYYY",
    showTime = false,
    popupClassName = "table-reset",
    className = "",
    suffixIcon = true,
    viewType, // Thêm viewType để điều khiển chế độ xem
}) => {
    // Kiểm tra viewType để xác định picker là ngày, tuần, hoặc tháng
    const pickerType = viewType === "resourceTimelineMonth" ? "month" : "date";
    const displayFormat = viewType === "resourceTimelineMonth" ? "MM/YYYY" : format;

    return type === "single" ? (
        <DatePicker
            picker={pickerType} // Đặt chế độ hiển thị picker theo viewType
            onChange={(value, dateString) => {
                onChange(value);
            }}
            placeholder={placeholder}
            onOk={(e) => onChange(e)}
            popupClassName={popupClassName}
            value={value}
            showTime={showTime && pickerType === "date" ? { format: "HH:mm" } : false} // Chỉ hiển thị thời gian nếu picker là date
            format={displayFormat} // Đặt format dựa trên viewType
            locale={locale}
            className={className}
            suffixIcon={suffixIcon}
        />
    ) : (
        <RangePicker
            picker={pickerType} // Áp dụng picker cho RangePicker nếu cần
            onChange={(date) => {
                onChange(date);
            }}
            popupClassName={popupClassName}
            showTime={showTime && pickerType === "date" ? { format: "HH:mm" } : false}
            format={displayFormat}
            value={value}
            locale={locale}
            className={className}
            suffixIcon={suffixIcon}
        />
    );
};
