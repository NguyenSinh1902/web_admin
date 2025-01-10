import React from "react";
import { Input } from "antd";
import DebounceInput from "../components/TMS/Waybill/Components/DebounceInput";
const InputAntdComp = React.forwardRef(
    (
        {
            onChange = () => {},
            onBlur = () => {},
            onKeyPress = () => {},
            value = "",
            label = "",
            placeholder = "",
            isRequired = false,
            type = "text",
            disabled = false,
        },
        ref,
    ) => {
        return (
            <div className={"w-full"}>
                <div className="relative">
                    <DebounceInput value={value} delay={300} setState={onChange}>
                        <Input
                            ref={ref}
                            value={value}
                            type={type}
                            onChange={onChange}
                            onBlur={onBlur}
                            onKeyDown={onKeyPress}
                            readOnly={disabled}
                            disabled={disabled}
                            size="large"
                            // className="text-base font-normal text-gray-700"
                            // error={!checkValid}
                            className="block bg-white  w-full text-base font-normal text-gray-700 bg-transparent rounded-lg border-1  appearance-none  focus:outline-none focus:ring-0 ring-orange-600 focus:border-1 peer"
                            placeholder={placeholder}
                            id="floating_outlined"
                        />
                    </DebounceInput>
                    <label
                        htmlFor="floating_outlined"
                        className="text-gray-500 absolute text-sm duration-100 transform pointer-events-none -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                        {label} {isRequired && <span className="text-red-500 ml-1">(*)</span>}
                    </label>
                </div>
            </div>
        );
    },
);
InputAntdComp.displayName = "InputAntd";
export const InputAntd = React.memo(InputAntdComp);
