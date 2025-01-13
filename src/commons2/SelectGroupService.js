import React, { useEffect, useState } from "react";
import { Empty, Select, Spin } from "antd";
import serviceGroupService from "../services/api/serviceGroupService";
import { Alerterror } from "../Utils";

const SelectGService = React.forwardRef(
    ({
        onSelected = () => {},
        isRequired = false,
        size = "large",
        variant = "outlined", //borderless, outlined, filled
        popupMatchSelectWidth = true, //dropdown mặc định bằng width của select hay không
        isMulti = false,
        activer = [],
        tagCount = 3,
        ServiceId = 0,
        label = "Nhóm dịch vụ",
    }) =>
        // ref removed as it is unused
        {
            const [options, setOptions] = useState([]);
            const [value, setValue] = useState(null);
            const [isLoading, setIsLoading] = useState(false);

            useEffect(() => {
                OVG_spService_Select();
            }, []);

            const onSelecteItem = (items) => {
                if (isMulti) {
                    let selectedOptions = items?.map((item) => options.find((i) => i.value === item.value)) || [];

                    if (selectedOptions.some((item) => item?.value === 0)) {
                        //Xóa chọn tất cả khi đã chọn 1 dữ liệu
                        selectedOptions = selectedOptions.filter((item) => item?.value !== 0);
                    }
                    setValue(selectedOptions);
                    onSelected(selectedOptions);
                } else {
                    const selectedOption = options.find((i) => i.value === items?.value);
                    setValue(selectedOption);
                    onSelected(selectedOption);
                }
            };

            useEffect(() => {
                if (isMulti == true) {
                    if (activer.length > 0 && options.length > 0) {
                        let datatam = [],
                            valuetam = "";
                        activer.forEach((element) => {
                            if (element !== -1 && element !== 0) {
                                valuetam = options.find((a) => a.value === (element.id || element));
                                datatam.push(valuetam);
                            }
                        });
                        setValue(datatam);
                    } else setValue([]);
                }
            }, [activer, isMulti, options]);

            useEffect(() => {
                if (options.length > 0 && !isMulti) {
                    if (ServiceId > 0) {
                        let ar = options.find((a) => a.value === ServiceId);
                        ar ? setValue(ar) : setValue(null);
                    } else {
                        setValue(null);
                    }
                }
            }, [ServiceId, options, isMulti]);

            const OVG_spService_Select = React.useCallback(async () => {
                setIsLoading(true);
                try {
                    // call api lấy danh sách dịch vụ
                    const res = await serviceGroupService.getAllServiceGroups(1, 1000);
                    if (res?.serviceGroups?.length > 0) {
                        const op = res?.serviceGroups?.map((item) => ({
                            value: item.id,
                            label: item.serviceCode + " - " + item.name,
                            ...item,
                        }));

                        if (isMulti) {
                            var datatam = [],
                                valuetam = "";
                            activer.forEach((element) => {
                                if (element !== -1 || element !== 0) {
                                    valuetam = op.find((a) => a.value === (element.id || element));
                                    datatam.push(valuetam);
                                }
                            });
                            setValue(datatam);
                        } else {
                            if (ServiceId !== 0) {
                                setValue(op.find((item) => item.value === ServiceId));
                                onSelected(op.find((item) => item.value === ServiceId));
                            }
                        }
                        setOptions(op);
                    } else {
                        setOptions([]);
                    }
                } catch {
                    Alerterror("Lỗi dữ liệu, vui lòng liên hệ IT");
                } finally {
                    setIsLoading(true);
                }
            }, [activer, isMulti, ServiceId, onSelected]);

            return (
                <div className="relative flex flex-row w-full items-end justify-between">
                    <label
                        className={`${
                            variant === "outlined"
                                ? "-top-2 left-2 absolute  bg-white text-[11px] z-[1] px-1"
                                : "font-semibold text-sm"
                        } `}
                    >
                        {label}
                        {isRequired ? <span className="text-red-500 ml-1">(*)</span> : <></>}
                    </label>
                    <Select
                        mode={isMulti ? "multiple" : ""}
                        labelInValue
                        className={`${variant !== "outlined" ? `!border-b-[1px] !border-gray-200 w-7/12 ` : "flex-1"}`}
                        filterOption={(input, option) =>
                            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                        variant={variant}
                        allowClear
                        popupMatchSelectWidth={popupMatchSelectWidth}
                        showSearch
                        notFoundContent={isLoading ? <Spin size="small" /> : <Empty description={"Không có dữ liệu"} />}
                        isMulti={isMulti}
                        maxTagCount={tagCount}
                        options={options}
                        onChange={onSelecteItem}
                        value={value}
                        size={size}
                        placeholder={"Lựa chọn"}
                    />
                </div>
            );
        },
);

SelectGService.displayName = "SelectGroupService";

export const SelectGroupService = SelectGService;
