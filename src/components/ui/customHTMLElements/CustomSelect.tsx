import React, { FC } from "react";
import { Controller } from "react-hook-form";
import Select, { components, StylesConfig } from "react-select";
import ErrorHandler from "../errorHandler/ErrorHandler";

const customStyles: StylesConfig = {
  control: (base: Record<string, unknown>, state: any) => ({
    ...base,
    "*": {
      boxShadow: "none !important",
    },
    fontSize: "12px",
    height: "44px",
    borderRadius: "10px",
    width: "auto",
    boxShadow: "none",
    appearance: "none",
    borderColor: state.isFocused || state.hover ? "#006B33" : "#cccccc",
    "&:hover": {
      borderColor: "#006B33", // Set your custom hover color
    },
  }),
  input: (base: any ) => ({
    ...base,
    fontSize: "14px",
    borderColor: "#006B33",
  }),

  singleValue: (base: any) => ({
    ...base,
    color: "#212529",
    borderColor: "#006B33",
  }),
  valueContainer: (provided) => ({
    ...provided,
    overflow: "visible",
    borderColor: "#006B33",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    position: "absolute",
    left: (state.hasValue || state.selectProps.inputValue) && 8,
    top: state.hasValue || state.selectProps.inputValue ? -20 : "20%",
    background: (state.hasValue || state.selectProps.inputValue) && "white",
    transition: "top 0.1s, font-size 0.1s",
    fontSize: (state.hasValue || state.selectProps.inputValue) && "12px",
    lineHeight: (state.hasValue || state.selectProps.inputValue) && "16px",
    paddingRight: (state.hasValue || state.selectProps.inputValue) && 8,
    paddingLeft: (state.hasValue || state.selectProps.inputValue) && 8,
    color:
      state.hasValue || state.selectProps.inputValue ? "#006C33" : "#4D5154",
  }),
  option: (styles, { isDisabled, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? "#006C33" : styles.backgroundColor,
      color: isSelected ? "#fff" : "default",
      cursor: isDisabled ? "not-allowed" : styles.cursor,
    };
  },
};

type SingleValue = {
  value: string | number;
  label: string;
};

type OptionModel = SingleValue[];

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }: any) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

const CustomSelect: FC<{
  options: OptionModel;
  handleChange?: ((newValue: any, newAction: any) => void) | undefined;
  defaultValue?: any;
  inputValue?: any;
  components?: any;
  isDisabled?: boolean;
  placeholder?: string;
  containerClass?: any;
  className?: string;
  name: string;
  control?: any;
  errors?: any;
  isMulti?: boolean;
  required?: boolean;
  extraLabel?: string;
}> = ({
  options,
  isDisabled,
  placeholder,
  containerClass,
  className,
  name,
  control,
  errors,
  defaultValue,
  required,
  // inputValue,
  handleChange,
  isMulti = false,
  extraLabel,
}) => {
  return (
    <div className={` flex flex-col justify-start  ${containerClass}`}>
      {extraLabel && (
        <h1 className="text-[#4D5154] text-[14px] lg:leading-[16px] tracking-[0.03px] font-[600] mb-2">
          {extraLabel}{" "}
        </h1>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          const { onChange, name } = field;
          return (
            <Select
              placeholder={placeholder}
              classNamePrefix="react-select"
              className={`react-select-container ${className}`}
              options={options}
              onChange={(newValue: any) => {
                onChange(!isMulti ? newValue?.value : newValue);
                if (handleChange) {
                  handleChange(newValue, name);
                }
              }}
              isDisabled={isDisabled}
              value={options?.find((c) => c.value === defaultValue)}
              isClearable
              styles={customStyles}
              components={{
                ...components,
                IndicatorSeparator: () => null,
                ValueContainer: CustomValueContainer,
              }}
              isMulti={isMulti}
              required={required}
            />
          );
        }}
      />
      {errors && (
        <div className="text-left ml-3">
          <ErrorHandler errors={errors} />
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
