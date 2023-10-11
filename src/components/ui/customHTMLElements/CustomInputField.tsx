/* eslint-disable react/display-name */
import React from "react";
// import { ChangeHandler } from "react-hook-form";
import ErrorHandler from "../errorHandler/ErrorHandler";
// import { Controller } from 'react-hook-form';
import { enforceMaxLength } from "../../../helpers/enforceMaxLength";

interface ICustomInputFieldProps {
  type: string;
  name?: string;
  label?: string;
  errors?: any;
  maxLength?: undefined | number;
  max?: number | string | any;
  defaultValue?: string | number;
  value?: string | number;
  minLength?: undefined | number;
  readOnly?: boolean;
  required?: boolean;
  onChange?: any;
  onKeyUpPress?: any;
  min?: number | string | any;
  showRequiredIcon?: boolean;
  passwordError?: boolean;
  hasActionButton?: boolean;
  removeBottomBorder?: boolean;
  autoComplete?: string;
  actionButtonText?: any;
  onClickActionButton?: () => void;
  onClickIcon?: () => void;
  extraLabel?: string;
  hasIcon?: number | any;
  addPadding?: boolean;
  children?: React.ReactNode | undefined;
  errorMessage?: string;
  style?: string;
}

const CustomInputField: React.FC<ICustomInputFieldProps> = React.forwardRef(
  (
    {
      extraLabel,
      min,
      required,
      removeBottomBorder,
      showRequiredIcon,
      hasActionButton,
      actionButtonText,
      onClickActionButton,
      type,
      name,
      label,
      errors,
      maxLength,
      max,
      defaultValue,
      value,
      minLength,
      readOnly,
      onChange,
      onKeyUpPress,
      children,
      hasIcon,
      addPadding,
      onClickIcon,
      passwordError,
      autoComplete,
      errorMessage,
      style,
      ...otherProps
    },
    ref: any
  ) => {
    return (
      <div className="w-full">
        {extraLabel?.length ? (
          <h1 className="text-[#4D5154] text-[14px] lg:leading-[16px] tracking-[0.03px] font-[600] mb-2">
            {extraLabel}
          </h1>
        ) : null}
        <div className="relative">
          {children && (
            <div className="absolute flex items-center ml-2 h-full">
              <span>{children}</span>
            </div>
          )}
          {hasIcon && (
            <div
              className={`absolute inset-y-0 left-0 px-2 border-r flex items-center text-sm text-Gray font-[300] leading-5 cursor-pointer`}
              onClick={onClickIcon}
            >
              <span className="text-capitalize">{hasIcon}</span>
            </div>
          )}
          <input
            className={`${style} block appearance-none border border-solid bg-white focus:ring-0 leading-5 text-[14px] font-[400] peer focus:outline-none ${
              addPadding ? "pl-10" : ""
            } ${
              readOnly
                ? "text-[#4D5154] focus:border-[#C8CCD0]"
                : "text-[#212529] focus:border-incoverGreen"
            } ${
              errors
                ? "border-[#B00020] focus:border-[#B00020]"
                : "border-[#C8CCD0] focus:border-incoverGreen"
            }   rounded-lg w-full h-[44px] py-[12px] ${
              hasIcon ? "pl-14 pr-4" : "px-6"
            } ${errors && "border-[#B00020]"} ${hasActionButton && ""} ${
              children && "border-l-0"
            }`}
            type={type}
            name={name}
            max={max}
            min={min}
            onKeyPress={enforceMaxLength}
            maxLength={maxLength}
            required={required}
            minLength={minLength}
            defaultValue={defaultValue}
            // value={defaultValue}
            onChange={onChange}
            onKeyUp={onKeyUpPress}
            readOnly={readOnly}
            autoComplete={autoComplete}
            ref={ref}
            {...otherProps}
            placeholder=" "
            id={label}
          />
          <label
            className={`absolute text-[14px] leading-4  text-[#4D5154] dark:text-[#4D5154] duration-300 transform -translate-y-4 scale-75 px-2 top-2 origin-[0] bg-white dark:bg-white peer-focus:px-2  ${
              errors
                ? "peer-focus:text-[#B00020] peer-focus:dark:text-[#B00020]"
                : "peer-focus:text-incoverGreen peer-focus:dark:text-incoverGreen"
            }  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4`}
            htmlFor={label}
          >
            {label}
          </label>
          {hasActionButton && (
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              onClick={onClickActionButton}
            >
              <span className="text-capitalize">{actionButtonText}</span>
            </div>
          )}
        </div>
        {errors && (
          <div className="text-left  ml-3">
            <ErrorHandler errors={errors} />
          </div>
        )}
      </div>
    );
  }
);

export default CustomInputField;


