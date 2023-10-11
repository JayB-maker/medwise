import { useState } from "react";
import Alert from "../alert";
import "./Input.scss";

interface InputTypes {
  inputClass?: string;
  labelClass?: string;
  label?: string;
  placeholder?: string;
  onChange?: Function;
  value?: any;
  id?: string;
  name?: string;
  type?: string;
  invertStyle?: boolean;
  hasError?: boolean;
  errorMsg?: string;
  className?: string;
  disabled?: boolean;
  copy?: boolean;
  tested?: boolean;
  register?: Function;
  required?: boolean;
  pattern?: any;
  valueAsNumber?: boolean;
}

const Input = (props: InputTypes) => {
  const [alert, setAlert] = useState(false);
  const {
    inputClass,
    labelClass,
    placeholder,
    label,
    onChange,
    value,
    id,
    name,
    type,
    invertStyle,
    errorMsg,
    hasError,
    className,
    disabled,
    copy,
    tested,
    register,
    required,
    pattern,
    valueAsNumber
  } = props;

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setAlert(true);
  }

  return (
    <>
      <div className={`text-input ${className}`}>
      <label className={`label ${labelClass}`} htmlFor={id}>
          {label}
        </label>
        <input
          className={`input ${
            invertStyle ? "input-invert" : ""
          } ${inputClass} ${hasError ? "input-error-input" : ""}`}
          placeholder={placeholder}
          type={type}
          onChange={(event) => onChange?.(event.target.value)}
          value={value}
          id={id}
          name={name}
          disabled={disabled}
          {...register?.(name, { required:required, pattern:pattern, valueAsNumber: valueAsNumber })}
        />
        {copy && (
          <img
            src="https://res.cloudinary.com/dm19qay3n/image/upload/v1666109805/internal-dashboard/copy-outline_iyoqnr.png"
            alt="copy"
            className="copy"
            onClick={handleCopy}
          />
        )}
        {tested && (
          <img
            src="https://res.cloudinary.com/dm19qay3n/image/upload/v1666628076/enterprise-dashboard/tested_puhyzz.png"
            alt="tested"
            className="copy"
          />
        )}
        
        {hasError && (
          <span className="input-error" style={{color:"red"}}>
            {errorMsg ? errorMsg : `${label} is required.`}
          </span>
        )}
        {alert && (
        <Alert
          title="Text Copied"
          text="Phone Number copied"
          alertOut={setAlert}
          timeOut={10000}
        />
      )}
      </div>
    </>
  );
};

export default Input;
