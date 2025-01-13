import { useState } from "react";
import { DatePicker as DatePickerAntd, Drawer, Tooltip } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { CheckCircleOutlined } from "@ant-design/icons";
import locale from "antd/es/date-picker/locale/vi_VN";
import useIsMobile from "../hooks/useIsMobile";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(advancedFormat);
const { RangePicker } = DatePickerAntd;

export const RangePickerIOS = ({ value, onChange, type = 0, onClick = () => {} }) => {
    return (
        <div
            className="bg-white border-solid border-[1px] border-[#d9d9d9] relative inline-flex rounded-md m-0 px-3 py-1 text-black text-opacity-85 text-sm items-center w-full"
            style={{ transition: "border 0.2s,box-shadow 0.2s,background 0.2s" }}
            onClick={() => (type == 0 ? onClick() : {})}
        >
            <style>
                {`
          input[type="date"]::-webkit-inner-spin-button,
          input[type="date"]::-webkit-calendar-picker-indicator {
            display: none;
            -webkit-appearance: none;
          }
        `}
            </style>
            <div className="relative inline-flex w-full items-center">
                <input
                    style={type == 0 ? { pointerEvents: "none" } : {}}
                    type="date"
                    disabled={type == 0}
                    className="bg-white w-full"
                    value={value[0].format("YYYY-MM-DD")}
                    readOnly
                    onChange={(e) => {
                        onChange([e.target.value, value[1]]);
                        const target = e.target;
                        setTimeout(() => {
                            target.defaultValue = dayjs(new Date()).format("YYYY-MM-DD");
                        }, 100);
                    }}
                ></input>
            </div>
            <div className="px-2">
                <span aria-label="to" className="ant-picker-separator" style={{ pointerEvents: "none" }}>
                    <span role="img" aria-label="swap-right" className="anticon anticon-swap-right">
                        <svg
                            viewBox="0 0 1024 1024"
                            focusable="false"
                            data-icon="swap-right"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path>
                        </svg>
                    </span>
                </span>
            </div>
            <div className="relative inline-flex w-full items-center cursor-none">
                <input
                    style={type == 0 ? { pointerEvents: "none" } : {}}
                    disabled={type == 0}
                    type="date"
                    className="bg-white w-full"
                    value={value[1].format("YYYY-MM-DD")}
                    readOnly
                    onChange={(e) => {
                        onChange([value[0], e.target.value]);
                        const target = e.target;
                        setTimeout(() => {
                            target.defaultValue = dayjs(new Date()).format("YYYY-MM-DD");
                        }, 100);
                    }}
                ></input>
            </div>
            <span
                className="flex basis-auto text-black text-opacity-25"
                style={{ transition: "opacity 0.2s,color 0.2s", pointerEvents: "none" }}
            >
                <span role="img" aria-label="lịch" class="anticon anticon-calendar">
                    <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="calendar"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
                    </svg>
                </span>
            </span>
        </div>
    );
};
export const PredefinedDateRanges = ({
    title = "Chọn thời gian",
    size = "large",
    value = null,
    onChange = () => {},
    width = "100%",
    isRequired = false,
    variant = "outlined",
    isMain = false, // su dung khi chi co chọn ngày là filter duy nhất
    openMain = false, // isMain = true moi dung dc =>
    setOpenMain = () => {}, // isMain = true moi dung dc => dung de mở chọn ngày
}) => {
    const ranges = [
        {
            label: "Hôm nay",
            value: [dayjs().startOf("day"), dayjs().endOf("day")],
        },
        {
            label: "Hôm qua",
            value: [dayjs().subtract(1, "day").startOf("day"), dayjs().subtract(1, "day").endOf("day")],
        },
        {
            label: "7 ngày trước",
            value: [dayjs().subtract(7, "day").startOf("day"), dayjs().endOf("day")],
        },
        {
            label: "30 ngày trước",
            value: [dayjs().subtract(30, "day").startOf("day"), dayjs().endOf("day")],
        },
        {
            label: "Tháng này",
            value: [dayjs().startOf("month"), dayjs().endOf("month")],
        },
        {
            label: "Tháng trước",
            value: [dayjs().subtract(1, "month").startOf("month"), dayjs().subtract(1, "month").endOf("month")],
        },
    ];
    const [drawerHeight, setDrawerHeight] = useState(600);
    const handleTouchStart = (e) => {
        if (window.innerWidth < 768) {
            const startY = e.touches[0].clientY;
            const startHeight = drawerHeight;
            let lastExecution = 0;
            const throttleDelay = 16; // Khoảng thời gian giữa các lần cập nhật (16ms ~ 60fps)

            const onTouchMove = (e) => {
                const now = Date.now();
                if (now - lastExecution >= throttleDelay) {
                    const newHeight = startHeight + (startY - e.touches[0].clientY);

                    setDrawerHeight(newHeight > 400 ? newHeight : 600);
                    newHeight < 400 && setOpen(false);

                    lastExecution = now;
                }
            };

            const onTouchEnd = () => {
                document.removeEventListener("touchmove", onTouchMove);
                document.removeEventListener("touchend", onTouchEnd);
            };

            document.addEventListener("touchmove", onTouchMove);
            document.addEventListener("touchend", onTouchEnd);
        }
    };
    const onOK = (value) => {};
    const isMobile = useIsMobile();
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const [open, setOpen] = useState(false);
    const [openRangePicker, setOpenRangePicker] = useState(false);
    const [openRangePickerIOS, setOpenRangePickerIOS] = useState(
        !(
            value != null &&
            ranges.some(
                (range) =>
                    dayjs(value[0]).diff(range.value[0], "day") == 0 &&
                    dayjs(value[1]).diff(range.value[1], "day") == 0,
            )
        ),
    );

    return (
        <div className="relative flex-grow">
            {!isMain && ( // truong hop nay cai chon ngay nam chung voi nhieu select khac
                <>
                    <label
                        className={`${
                            variant === "outlined"
                                ? "-top-2 left-2 absolute  bg-white text-[11px] z-[1] px-1"
                                : "font-semibold text-sm"
                        } `}
                    >
                        {title}
                        {isRequired ? <span className="text-red-500 ml-1">(*)</span> : <></>}
                    </label>

                    <RangePicker
                        popupStyle={{ pointerEvents: "all" }} // Chặn sự cố pointer trên WebView
                        presets={ranges}
                        value={[dayjs(value[0]), dayjs(value[1])]}
                        // showTime
                        onChange={(e) => {
                            onChange(e || [dayjs().startOf("day"), dayjs().endOf("day")]);
                        }}
                        format="DD/MM/YYYY HH:mm"
                        locale={locale}
                        onOk={onOK}
                        mode={["date", "date"]}
                        placeholder={["Từ", "Đến"]}
                        size={size}
                        style={{ width }}
                        popupClassName={isMobile ? "hidden" : "table-reset"}
                        onClick={() => (isMobile ? setOpen(true) : {})}
                        open={isMobile ? false : undefined}
                    />
                </>
            )}

            <Drawer
                zIndex={2000}
                title={
                    <div className="" onTouchStart={handleTouchStart} style={{ cursor: "ns-resize" }}>
                        <div className="cursor-ns-resize w-[50px] h-[4px] bg-black rounded-md mx-auto mb-1"></div>
                        {title}
                    </div>
                }
                placement={"bottom"}
                closable={false}
                onClose={() => {
                    setOpen(false);
                    isMain && setOpenMain(false);
                    setOpenRangePickerIOS(false);
                }}
                autoFocus
                open={isMain ? openMain : open}
                height={drawerHeight}
                key={"bottom"}
                className="rounded-t-xl"
                rootClassName={"z-10"}
                bodyStyle={{ padding: 0 }}
                headerStyle={{ padding: "10px 10px", textAlign: "center", backgroundColor: "#f5f5f5" }}
            >
                <div className="w-full p-4">
                    <div
                        onClick={(e) => {
                            if (e.target.id === "rangeMask") setOpenRangePicker(false);
                        }}
                        id="rangeMask"
                        className={`fixed z-[10] top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[#0000008f] ${
                            openRangePicker ? "block" : "hidden"
                        }`}
                    >
                        <div className="bg-white rounded-md translate-y-[-173px]">
                            <RangePicker
                                className="w-[370px]"
                                popupStyle={{ pointerEvents: "all" }} // Chặn sự cố pointer trên WebView
                                value={[dayjs(value[0]), dayjs(value[1])]}
                                // showTimeautoFocus
                                onChange={(e) => {
                                    onChange(e || [dayjs().startOf("day"), dayjs().endOf("day")]);
                                }}
                                open={openRangePicker}
                                locale={locale}
                                format="DD/MM/YYYY HH:mm"
                                onOk={onOK}
                                mode={["date", "date"]}
                                placeholder={["Từ", "Đến"]}
                                size={size}
                                inputReadOnly={true}
                                popupClassName={`table-reset dateRangePicker !p-0 flex justify-center items-center andt-mobile !left-0 !right-0 ${
                                    !openRangePicker && "hidden"
                                }`}
                            />
                        </div>
                    </div>
                    {ranges.map((range, index) => {
                        var check;
                        if (value == null) check = false;
                        else
                            check =
                                dayjs(value[0]).diff(range.value[0], "day") == 0 &&
                                dayjs(value[1]).diff(range.value[1], "day") == 0;
                        return (
                            <Tooltip key={index} title={isMobile ? "" : range.label}>
                                <div
                                    className={`p-2 transition-all duration-300 border-b border-gray-100 rounded-md cursor-pointer flex flex-row items-center justify-between ${
                                        check ? "bg-orange-100" : ""
                                    }`}
                                    onClick={() => {
                                        onChange(range.value);
                                        isMain && setOpenMain(false);
                                    }}
                                >
                                    <div className="flex-1 flex flex-col">
                                        <span className="flex-1 truncate font-bold">{range.label}</span>
                                        <span className="flex-1 truncate text-sm">
                                            Từ {range.value[0].format("DD/MM/YYYY")} đến{" "}
                                            {range.value[1].format("DD/MM/YYYY")}
                                        </span>
                                    </div>
                                    <span>{check ? <CheckCircleOutlined /> : ""}</span>
                                </div>
                            </Tooltip>
                        );
                    })}
                    <div className="flex flex-col">
                        <div
                            className={`p-2 transition-all duration-300 border-b border-gray-100 rounded-md cursor-pointer flex flex-row items-center justify-between ${
                                value != null &&
                                ranges.some(
                                    (range) =>
                                        dayjs(value[0]).diff(range.value[0], "day") == 0 &&
                                        dayjs(value[1]).diff(range.value[1], "day") == 0,
                                )
                                    ? ""
                                    : "bg-orange-100"
                            }`}
                            onClick={() => {
                                // isIOS ? setOpenRangePickerIOS(true) :
                                setOpenRangePicker(true);
                            }}
                        >
                            <div className="flex-1 flex flex-col">
                                <span className="flex-1 truncate font-bold">Tùy chọn</span>
                                <span className="flex-1 truncate text-sm">Chọn khoản thời gian</span>
                            </div>
                            <span>
                                {value != null &&
                                ranges.some(
                                    (range) =>
                                        dayjs(value[0]).diff(range.value[0], "day") == 0 &&
                                        dayjs(value[1]).diff(range.value[1], "day") == 0,
                                ) ? (
                                    ""
                                ) : (
                                    <CheckCircleOutlined />
                                )}
                            </span>
                        </div>
                        {/* {openRangePickerIOS && (
                            <RangePickerIOS
                                value={[dayjs(value[0]), dayjs(value[1])]}
                                onChange={(e) => {
                                    onChange(e || [dayjs().startOf('day'), dayjs().endOf('day')]);
                                }}
                                type={1}
                            />
                        )} */}
                    </div>
                    {/* <div className={`p-2 transition-all duration-300 border-b border-gray-100 rounded-md cursor-pointer flex flex-row items-center justify-between `}>
                        <div className="flex-1 flex flex-col">
                            <span className="flex-1 truncate font-bold text-wrap">Check {navigator.userAgent}</span>
                            <span className="flex-1 truncate font-bold text-wrap">Check ios {isIOS ? 'yes' : 'no'}</span>
                            <span className="flex-1 truncate font-bold text-wrap">Check ios2 {navigator.userAgent.includes('iPhone') ? 'yes' : 'no'}</span>
                        </div>
                    </div> */}
                </div>
            </Drawer>
        </div>
    );
};
