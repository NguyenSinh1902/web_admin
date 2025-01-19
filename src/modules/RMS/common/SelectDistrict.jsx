import React, { useEffect, useState, useRef } from "react";
import I18n from "i18n-js";
import { Empty, Select, Spin } from "antd";
import { callApi } from "../../../services";
import { CaretDownOutlined } from "@ant-design/icons";

const SelectDistrictComp = ({
    onSelected = () => {},
    isMulti = false,
    isRequired = false,
    label = "Quận huyện",
    variant = "outlined", //borderless, outlined, filled
    CountryId = -1,
    LocationId = -1,
    className = "",
}) => {
    const [data, setData] = useState([]);
    const [valueS, setValueS] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        CRM2_Location_Get();
    }, [CountryId]);

    // sau khi click tỉnh thành ở TypeLayout 1 thì sẽ tự động click vào button để hiển thị danh sách quận huyện
    useEffect(() => {
        if (CountryId === 0 || CountryId === -1) return;
        onSelected({}); // clear defaul value
    }, [CountryId]);

    useEffect(() => {
        if (LocationId !== 0 && LocationId !== -1) {
            let ar = data.find((a) => a.value === LocationId);
            ar ? setValueS(ar) : setValueS(null); // Thay vì set giá trị mặc định, set null
        } else {
            setValueS(null); // Set null để hiện placeholder
        }
    }, [LocationId]);

    const onSelecteItem = (item) => {
        onSelected(item);
        setValueS(item);
    };

    const CRM2_Location_Get = async () => {
        try {
            let pr = {
                Type: 2,
                ParentId: CountryId === 0 ? -1 : CountryId,
                Search: "",
            };
            const params = {
                Json: JSON.stringify(pr),
                func: "System_spLocation_Get",
                API_key: "netcoApikey2025",
            };
            setIsLoading(true);
            const list = await callApi.Main(params);
            setIsLoading(false);
            let dataSelect = [],
                IsActive = 0;

            list.forEach((element, index) => {
                dataSelect.push({
                    value: element.LocationId,
                    label: element.LocationName,
                });
                if (element.LocationId === LocationId) {
                    IsActive = 1;
                }
            });
            setData(dataSelect);
            if (IsActive === 1) {
                let ListActive = list.filter((a) => a.LocationId === LocationId)[0];
                setValueS({
                    value: ListActive.LocationId,
                    label: ListActive.LocationName,
                });
            } else {
                // setValueS(FirstData);
            }
        } catch (error) {
            setIsLoading(false);
            // Alerterror("Lỗi, liên hệ IT");
        }
    };
    return (
        <div className="relative w-full">
            <>
                {label && (
                    <div className="">
                        <label className="text-xs font-bold text-gray-500 w-[100px] ">
                            {label} {isRequired && <span className="text-red-500 ml-1">(*)</span>}
                        </label>
                    </div>
                )}

                <Select
                    mode={isMulti ? "multiple" : ""}
                    labelInValue
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                    notFoundContent={isLoading ? <Spin size="small" /> : <Empty description="Không tìm thấy dữ liệu" />}
                    options={data}
                    onChange={onSelecteItem}
                    className={
                        className +
                        " custom-select border-b-[1px]  outline-none border-gray-400 focus:border-blue-500 rounded-none  w-full border-"
                    }
                    value={valueS}
                    isMulti={isMulti}
                    suffixIcon={<CaretDownOutlined />}
                    placeholder={I18n.t("System.Lựa chọn")}
                />
            </>
        </div>
    );
};

export const SelectDistrict = React.memo(SelectDistrictComp);
