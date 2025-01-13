import { InputNumber } from 'antd';
import DebounceInputNumber from './DebounceInputNumber';

const NumberInput = ({ value, onChange, onFocus, disabled, isRequired, label, onBlur, onKeyPress, min = 0, status = '', max = 1000000000, size = 'large', sizeText = 'text-base', delay = 300 }) => {
    return (
        <div className="relative w-full">
            <label
                htmlFor="floating_outlined"
                className="absolute text-sm duration-100 transform text-nowrap pointer-events-none -translate-y-4 scale-75 top-2 z-30 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
                {label} {isRequired && <span className="text-red-500 ml-1">(*)</span>}
            </label>
            <DebounceInputNumber value={value} setState={onChange} delay={delay}>
                <InputNumber
                    value={value}
                    onChange={(value) => {
                        onChange(value);
                    }}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyDown={onKeyPress}
                    readOnly={disabled}
                    size={size}
                    required={isRequired}
                    // className="text-base font-normal text-gray-700"
                    // error={!checkValid}
                    status={status}
                    controls
                    className={` ${sizeText} flex items-center bg-white w-full font-normal text-gray-700 bg-transparent rounded-md border-1  appearance-none  focus:outline-none focus:ring-1 ring-orange-600 focus:border-1 peer`}
                    placeholder=" "
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                    min={min}
                    max={max}
                    id="floating_outlined"
                />
            </DebounceInputNumber>
        </div>
    );
};

export default NumberInput;
