import React, { useEffect, useState, useRef } from "react";
import I18n from "i18n-js";
import { Empty, Select, Spin } from "antd";
import { callApi } from "../../../services";
import { CaretDownOutlined } from "@ant-design/icons";

const SelectCityComp = ({
    onSelected = () => {},
    isMulti = false,
    activer = [], // multi
    LocationId = 0,
    label = "Tỉnh thành",
    variant = "outlined", //borderless, outlined, filled
    isRequired = false,
    CountryId = -1,
    CountriesIds = 236, //VietNam
    className = "",
}) => {
    const [data, setData] = useState([]);
    const [valueS, setValueS] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        System_spLocation_Get();
    }, []);

    const onSelecteItem = (item) => {
        onSelected(item);
        setValueS(item);
    };

    const System_spLocation_Get = async (item) => {
        let pr = {
            Type: 1,
            ParentId: CountryId === 0 ? -1 : CountryId,
            CountriesId: CountriesIds,
            Search: "",
        };
        const params = {
            Json: JSON.stringify(pr),
            func: "System_spLocation_Get",
            API_key: "netcoApikey2025",
        };
        const list = await callApi.Main(params);

        let dataSelect = [];

        list.length > 0 &&
            list.forEach((element, index) => {
                dataSelect.push({
                    value: element.LocationId,
                    label: element.LocationName,
                    data: element,
                });
            });
        // Active multi
        if (activer.length > 0) {
            let datatam = [],
                valuetam = "";
            activer.forEach((element, index) => {
                if (element !== -1 && element !== 0) {
                    valuetam = dataSelect.find((a) => a.value === element);
                    datatam.push(valuetam);
                }
            });
            setValueS(datatam);
        }
        setData(dataSelect);
    };
    useEffect(() => {
        if ((data.length === 0) & (LocationId !== 0)) {
            System_spLocation_Get();
        } else {
            setValueS(data.find((p) => p.value === LocationId));
        }
    }, [data, LocationId]);
    //multi
    useEffect(() => {
        if ((activer.length > 0) & (data.length > 0)) {
            let datatam = [],
                valuetam = "";
            activer.forEach((element, index) => {
                if (element !== -1 && element !== 0) {
                    valuetam = data.find((a) => a.value === +element);
                    datatam.push(valuetam);
                }
            });
            setValueS(datatam);
            return;
        }
        return;
    }, [activer]);
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

export const SelectCity = React.memo(SelectCityComp);
