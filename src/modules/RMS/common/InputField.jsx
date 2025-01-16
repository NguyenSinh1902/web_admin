const InputField = ({
  label,
  type = "text",
  name,
  value = "",
  required = false,
  inputProps,
  disabled = false,
  placeholder = "",
  className = {},
  TypeLayout = 1,
  readOnly = false,
  onChange=()=>{},
  prefix,
}) => {
  return (
    <div className={`${className} `}>
      {TypeLayout == 1 && (
        <div className="w-full flex items-end gap-8">
          {label && (
            <div className="">
              <div className="text-sm font-semibold min-w-[100px] ">
                {label}{" "}
                {required && <span className="text-red-500 ml-1">(*)</span>}
              </div>
            </div>
          )}
          <input
            disabled={disabled}
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            prefix={prefix}
            name={name}
            className={`${
              readOnly && "bg-slate-50 pointer-events-none"
            } bg-inherit  p-2 border-0 border-b-[1px]  text-inherit  border-gray-500  focus:border-orange-500 outline-0 text-sm grow reset-number${
              type == "number" ? "text-right" : "text-left"
            }`}
            min={0}
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
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            readOnly={readOnly}
            prefix={prefix}
            name={name}
            className={` p-2 border-gray-500  focus:border-orange-500 ring-[1.5px] ring-gray-300 bg-inherit rounded-lg outline-0 text-sm grow w-full reset-number `}
            value={value}
          />
        </>
      )}

      {TypeLayout == 3 && (
        <div className="w-full">
          {label && (
            <div className="">
              <label className="text-xs font-bold text-gray-500 min-w-[100px] ">
                {label}{" "}
                {required && <span className="text-red-500 ml-1">(*)</span>}
              </label>
            </div>
          )}
          <input
            disabled={disabled}
            type={type}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            readOnly={readOnly}
            prefix={prefix}
            className={`${
              readOnly && "bg-slate-50 pointer-events-none"
            } p-2 border-0 border-b-[1px] bg-inherit text-inherit  border-gray-500  focus:border-orange-500 outline-0 text-sm  w-full reset-number ${
              type == "number" ? "text-right" : "text-left"
            }`}
            min={0}
            value={value}
          />
        </div>
      )}
    </div>
  );
};

export default InputField;
