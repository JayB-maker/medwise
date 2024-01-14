import Select from "react-select";
import "./Dropdown.scss";

interface DropdownTypes {
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
  register?: Function;
  required?: boolean;
  pattern?: any;
}

const Dropdown = (props: DropdownTypes) => {
  const {
    dropdownClass,
    labelClass,
    label,
    placeholder,
    // value,
    id,
    // name,
    className,
    onChange,
    options,
    // register,
    // required,
    // pattern
  } = props;

  return (
    <>
      <div className={`dropdown-input ${className}`}>
        <label className={`label ${labelClass}`} htmlFor={id}>
          {label}
        </label>
        <Select
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          className={`dropdown ${dropdownClass}`}
          id={id}
          // name={name}
          // {...register?.(name, { required:required, pattern:pattern })}
        />
      </div>
    </>
  );
};

export default Dropdown;
