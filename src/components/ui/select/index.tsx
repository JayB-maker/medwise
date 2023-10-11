// import Select from "react-select";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Select.scss'

interface SelectTypes {
  dropdownClass?: string;
  labelClass?: string;
  label?: string;
  placeholder?: string;
  onChange?: any;
  value?: string;
  id?: string;
  name?: string;
  className?: string;
  options?: any;
  selectedOption?: null;
  setSelectedOption?: Function;
  disabled?:boolean;
  register?: Function;
  required?: boolean;
  pattern?: any;
}

const Select = (props: SelectTypes) => {
  const {
    dropdownClass,
    labelClass,
    label,
    placeholder,
    value,
    id,
    name,
    className,
    onChange,
    options,
    disabled,
    register,
    required,
    pattern
  } = props;

  return (
    <>
      <div className={`dropdown-input ${className}`}>
        <label className={`label ${labelClass}`} htmlFor={id}>{label}</label>
        <Dropdown
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          className={`dropdown ${dropdownClass}`}
          value={value}
          // id={id}
          disabled={disabled}
          {...register?.(name, { required:required, pattern:pattern })}
        />
      </div>
    </>
  );
};

export default Select;
