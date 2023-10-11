import { FC } from "react";
// import { ReactComponent as NairaIcon } from "../../assets/images/svg/input-naira.svg";

type inputProps = {
  allowPadding?: boolean;
  icon?: boolean;
  type?: string;
  label: string;
  iconClassName?: string;
  src?: any;
  min?: string;
  max?: string;
  placeholder?: string;
  inputClassName?: string;
  value?: any;
  name?: string;
  errors?: any;
};

const TextField: FC<inputProps> = ({
  allowPadding = true,
  icon,
  type = "text",
  label,
  iconClassName,
  src,
  min,
  max,
  placeholder,
  inputClassName,
  value,
  name,
  errors,
}) => {
  return (
    <div className="flex flex-col w-full gap-y-1 mb-5">
      <label htmlFor={name} className="font-light">
        {label}
      </label>
      <div
        className={`flex gap-x-3 h-11 items-center rounded-[4px] overflow-hidden ${
          allowPadding ? "px-4" : ""
        } ${errors ? "border-[#DD4F05]" : ""} `}
      >
        {/* {icon && (
          <img
            src={src}
            alt="input icon"
            className={`z-10 bg-Black shrink-0 ${iconClassName} `}
          />
        )} */}
        <input
          min={min}
          max={max}
          className={`flex-1 h-full -ml-14 border border-Gray focus:border-Blue text-incoverGray outline-none font-light text-sm placeholder:text-[#B6B6B6] ${
            allowPadding ? "" : "pl-14"
          } ${inputClassName}`}
          placeholder={placeholder}
          type={type}
          value={value}
          name={name}
        />
      </div>
    </div>
  );
};

export default TextField;
