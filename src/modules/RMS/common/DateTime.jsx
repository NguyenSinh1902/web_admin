import { DatePicker } from "antd";

const DateTime = ({
  label = "Tiêu đề",
  type = "text",
  name,
  placeholder = "",
  required = false,
  inputProps,
  disabled = false,
  className = {},
  value = "",
  TypeLayout = 1,
  defaultValue="",
}) => {
  return (
    <div className={`${className} `}>
      {TypeLayout == 1 && (
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-500 min-w-[100px]  mb-1 ">
            {label} {required && <span className="text-red-500 ml-1">(*)</span>}
          </label>
          <DatePicker
            className="mr-2"
            showTime
            placeholder={placeholder}
            value={value}
          />
        </div>
      )}

      {TypeLayout == 2 && (
        <>
          <div className="w-full">
            <label className="text-xs font-bold text-gray-500 ">
              {label}{" "}
              {required && <span className="text-red-500 ml-1">(*)</span>}
            </label>
          </div>
          <input
            disabled={disabled}
            type={type}
            className={` p-2  focus:border-black ring-[1.5px] ring-gray-300 rounded-lg outline-0 text-sm grow w-full `}
            defaultValue={defaultValue}
          />
        </>
      )}
    </div>
  );
};

export default DateTime;
