import { useState } from "react";
import Alert from "../alert";
import "./InputPassword.scss";

interface InputTypes {
  inputClass?: string;
  labelClass?: string;
  label?: string;
  placeholder?: string;
  onChange?: Function;
  value?: any;
  id?: string;
  name?: string;
  invertStyle?: boolean;
  hasError?: boolean;
  errorMsg?: string;
  className?: string;
  copy?: boolean;
  disabled?: boolean;
  register?: Function;
  required?: boolean;
  pattern?: any;
  type?: string;
  minLength?: number;
  maxLength?: number;
}

const InputPassword = (props: InputTypes) => {
  const [alert, setAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    inputClass,
    labelClass,
    placeholder,
    label,
    onChange,
    value,
    id,
    name,
    invertStyle,
    errorMsg,
    hasError,
    className,
    copy,
    disabled,
    register,
    required,
    pattern,
    type,
    minLength,
    maxLength,
  } = props;

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setAlert(true);
  };

  return (
    <>
      <div className={`password-input ${className}`}>
        <label className={`label ${labelClass}`} htmlFor={id}>
          {label}
        </label>
        <input
          className={`input ${
            invertStyle ? "input-invert" : ""
          } ${inputClass} ${hasError ? "input-error-input" : ""}`}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          onChange={(e) => onChange?.(e.target.value)}
          value={value}
          id={id}
          name={name}
          disabled={disabled}
          {...register?.(name, {
            required: required,
            pattern: pattern,
            minLength: minLength,
            maxLength: maxLength,
          })}
        />

        <img
          src={
            showPassword
              ? "https://res.cloudinary.com/dm19qay3n/image/upload/v1666264952/enterprise-dashboard/hide_h3kylq.png"
              : "https://res.cloudinary.com/dm19qay3n/image/upload/v1666264952/enterprise-dashboard/show_qj2ru8.png"
          }
          onClick={toggleShowPassword}
          className={`toggle ${copy ? "copy-toggle" : ""}`}
        />
        {copy && (
          <img
            src="https://res.cloudinary.com/dm19qay3n/image/upload/v1666109805/internal-dashboard/copy-outline_iyoqnr.png"
            alt="copy"
            className="copy"
            onClick={handleCopy}
          />
        )}
        {hasError && (
          <span className="input-error">
            {errorMsg ? errorMsg : `${label} is required.`}
          </span>
        )}
        {alert && (
          <Alert
            title="Text Copied"
            text="Phone Number copied"
            alertOut={setAlert}
            timeOut={3000}
          />
        )}
      </div>
    </>
  );
};

export default InputPassword;
