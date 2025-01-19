import { CaretDownOutlined } from "@ant-design/icons";
import { Select } from "antd";

const SelectInput = ({
  Typelayout = 1,
  data = [],
  className = "",
  label = "Tiêu đề",
  onChange = () => {},
  suffixIconOther = "",
  onDataSuffix,
  value = { value: 0, label: "Lựa chọn" },
  disabled = false,
  required = false,
  placeholder = "Lựa chọn",
}) => {
  return (
    <div className={className}>
      {Typelayout == 1 && (
        <Select
          className="custom-select border-b-[1px]  outline-none border-gray-400 focus:border-blue-500 rounded-none grow w-full"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          bordered={false}
          suffixIcon={
            <div className="flex items-center gap-3">
              <CaretDownOutlined /> {suffixIconOther}
            </div>
          }
        >
          {data.map((item) => (
            <Select.Option value={item.value}>{item.label}</Select.Option>
          ))}
        </Select>
      )}
      {Typelayout == 2 && (
        <div className="">
          {label && (
            <div className="">
              <label className="text-xs font-bold text-gray-500 w-[100px] ">
                {label}{" "}
                {required && <span className="text-red-500 ml-1">(*)</span>}
              </label>
            </div>
          )}
          <Select
            className="custom-select border-b-[1px]  outline-none border-gray-400 focus:border-blue-500 rounded-none  w-full"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            bordered={false}
            suffixIcon={
              <div className="flex items-center gap-3">
                <CaretDownOutlined /> {suffixIconOther}
              </div>
            }
          >
            {data.map((item) => (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            ))}
          </Select>
        </div>
      )}
      {Typelayout == 3 && (
        <div>
          <label className="text-xs font-bold text-gray-500 w-[100px] ">
            {label} {required && <span className="text-red-500 ml-1">(*)</span>}
          </label>
          <Select
            className="custom-select2 focus:border-black rounded-lg outline-0 text-sm grow w-full"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            suffixIcon={<CaretDownOutlined  />}
          >
            {data.map((item) => (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            ))}
          </Select>
        </div>
      )}
      {Typelayout == 4 && (
        <div className="w-full flex items-end gap-8">
          {label && (
            <div className="w-[100px] ">
              <label className="text-sm ">
                {label}{" "}
                {required && <span className="text-red-500 ml-1">(*)</span>}
              </label>
            </div>
          )}

          <Select
            className="custom-select border-b-[1px]  outline-none border-gray-400 focus:border-blue-500 rounded-none grow"
            placeholder={placeholder}
            value={value}
            style={{ width: 200 }}
            bordered={false}
            onChange={onChange}
            disabled={disabled}
            suffixIcon={
              <div className="flex items-center gap-3">
                <CaretDownOutlined /> {suffixIconOther}
              </div>
            } // Bấm icon sẽ toggle dropdown
          >
            {data.map((item) => (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
};

export default SelectInput;
