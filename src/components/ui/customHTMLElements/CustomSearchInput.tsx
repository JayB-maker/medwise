import React from "react";
import SearchIcon  from "../../assets/img/search-icon.svg";

interface ICustomSearchInputProps {
  name?: string;
  placeholder?: string;
  maxLength?: undefined | number;
  onChange?: any;
  onClickSearchIcon: () => void;
  value?: string | number;
}

const CustomSearchInput: React.FC<ICustomSearchInputProps> = React.forwardRef(
  (
    { name, placeholder, maxLength, onChange, onClickSearchIcon, value },
    ref: any
  ) => {
    return (
      <div className="input-group">
        <input
          className="bg-white appearance-none border border-LightGray rounded w-full py-2 px-4 text-incoverGray leading-6 focus:outline-none focus:bg-white focus:border-Blue border-r-0"
          type="search"
          name={name}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={onChange}
          value={value}
          ref={ref}
        />
        <div className="input-group-append cursor-pointer">
          <span className="input-group-text" onClick={onClickSearchIcon}>
            <img src={SearchIcon} alt="" />
          </span>
        </div>
      </div>
    );
  }
);

export default CustomSearchInput;
