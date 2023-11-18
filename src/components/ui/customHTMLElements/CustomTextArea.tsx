import React from "react";
import { ChangeHandler } from "react-hook-form";
import { enforceMaxLength } from "../../../helpers/enforceMaxLength";

interface ICustomTextAreaProps {
  name?: string;
  placeholder?: string;
  label?: string;
  errors?: any;
  maxLength?: undefined | number;
  defaultValue?: string | number;
  value?: string | number;
  minLength?: undefined | number;
  readOnly?: boolean;
  required?: boolean;
  onChange?: ChangeHandler;
  showRequiredIcon?: boolean;
  hasActionButton?: boolean;
  actionButtonText?: string;
  onClickActionButton?: () => void;
  extraLabel?: string;
  bottomLabel?: string;
  rows?: number;
  style?: string;
}

const CustomTextArea: React.FC<ICustomTextAreaProps> = React.forwardRef(
  (
    {
      name,
      placeholder,
      label,
      errors,
      maxLength,
      defaultValue,
      minLength,
      onChange,
      showRequiredIcon,
      extraLabel,
      bottomLabel,
      rows,
      style,
      readOnly,
      required,
      ...otherProps
    },
    ref: any
  ) => {
    return (
      <div className="mb-4 lg:mb-[23px]">
        {label && (
          <div className="flex items-center mb-2">
            <label className="block text-incoverGray text-[16px] font-[300]">
              {label}
            </label>
            {showRequiredIcon && <sup className="ml-1 text-[#EB5757]">*</sup>}
          </div>
        )}
        {extraLabel?.length ? (
          <h1 className="text-aelGray text-[14px] lg:leading-[16px] tracking-[0.03px] font-[300] mb-2">
            {extraLabel}
          </h1>
        ) : null}
        <textarea
          className={`bg-white appearance-none border-solid border-[#cccccc] border px-4 placeholder:text-[#DADADA] h-[200px] placeholder:text-[16px] placeholder:lg:leading-[24px] placeholder:font-[100] ${
            readOnly ? "text-Gray bg-[#F5F5F5]" : "text-incoverGray"
          } ${
            errors ? "border-[#EB5757]" : "border-LightGray"
          }   rounded w-full h-[96px] py-2  leading-6 text-[16px] font-[300] focus:outline-none focus:bg-white  ${
            errors ? "border-[#EB5757]" : "focus:border-Blue"
          } ${style}`}
          name={name}
          placeholder={placeholder}
          onKeyPress={enforceMaxLength}
          maxLength={maxLength}
          minLength={minLength}
          defaultValue={defaultValue}
          onChange={onChange}
          readOnly={readOnly}
          required={required}
          rows={rows || 3}
          ref={ref}
          {...otherProps}
        />
        {bottomLabel && bottomLabel.length && !errors && (
          <p className="text-[#6A7581] text-[12px] lg:leading-[16px] font-[100]">
            {bottomLabel}
          </p>
        )}
        {/* {errors && <ErrorHandler errors={errors} />} */}
      </div>
    );
  }
);
export default CustomTextArea;
