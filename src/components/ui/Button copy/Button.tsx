// import Link from "next/link";
// import Lottie from "react-lottie-player";
// import Spinner from "@/assets/json/spinner-white.json";

import Loader from "../loader";

// const style = { height: "30px", width: "30px" };
interface ButtonProps {
  title: any;
  onClick?: () => any;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loader?: any;
  id?: any;
  afterIcon?: any;
  beforeIcon?: any;
}

interface LinkProps {
  title: any;
  url: string;
  className?: string;
}

export const PrimaryButton = ({
  title,
  onClick,
  className,
  type,
  disabled,
  loader,
  afterIcon,
  beforeIcon,
  id,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      id={id}
      className={`${
        (loader || beforeIcon || afterIcon) &&
        "flex justify-center items-center"
      } text-white border-solid border-[#006c33] bg-[#006c33] hover:bg-[#004822] hover:border-[#004822] disabled:bg-[#C8CCD0] disabled:border-[#C8CCD0] border-[1px] py-[15px] px-6 text-[14px] font-[400] rounded-lg focus:outline-none ${className}`}
      onClick={onClick}
      disabled={disabled ? true : false}
      {...rest}
    >
      {beforeIcon && (
        <span className="mr-4">
          <img src={beforeIcon} alt="" />
        </span>
      )}
      {title}
      {afterIcon && (
        <span className="ml-4">
          <img src={afterIcon} alt="" />
        </span>
      )}
      {loader && (
        <span className="ml-2 flex items-center justify-center">
          <Loader />
        </span>
      )}
    </button>
  );
};

export const OutlineButton = ({
  title,
  onClick,
  className,
  type,
  disabled,
  afterIcon,
  beforeIcon,
  loader,
  ...rest
}: ButtonProps) => {
  // const style = { height: "24px", width: "24px" };
  return (
    <button
      type={type}
      className={`${
        (beforeIcon || afterIcon) && "flex justify-center items-center"
      } text-incoverGreen bg-white border-incoverGreen hover:text-[#004822] hover:border-[#004822] disabled:text-[#C8CCD0] disabled:border-[#C8CCD0] border-[1px] py-4 px-6 text-[14px] font-[500] rounded-lg focus:outline-none ${className}`}
      onClick={onClick}
      disabled={disabled ? true : false}
      {...rest}
    >
      {beforeIcon && (
        <span className="mr-4">
          <img src={beforeIcon} alt="" />
        </span>
      )}
      {title}
      {afterIcon && (
        <span className="ml-4">
          <img src={afterIcon} alt="" />
        </span>
      )}
      {loader && (
        <span className="">
          <Loader />
        </span>
      )}
    </button>
  );
};

export const OtherButton = ({
  title,
  onClick,
  className,
  type,
  disabled,
  loader,
  afterIcon,
  beforeIcon,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${(loader || beforeIcon || afterIcon) && "flex  items-center"}
       border-[1px] rounded-[4px] focus:outline-none ${className}`}
      onClick={onClick}
      disabled={disabled ? true : false}
      {...rest}
    >
      {beforeIcon && (
        <span className="mr-2">
          <img src={beforeIcon} alt="" />
        </span>
      )}
      {title}
      {afterIcon && (
        <span className="ml-2">
          <img src={afterIcon} alt="" />
        </span>
      )}
      {loader && (
        <span className="">
          <Loader />
        </span>
      )}
    </button>
  );
};

export const PrimaryLink = ({ title, url, className, ...rest }: LinkProps) => {
  return (
    <a href={url}>
      <div
        className={`text-white bg-incoverGreen hover:bg-[#004822] hover:border-[#004822] disabled:bg-[#C8CCD0] disabled:border-[#C8CCD0] border-incoverGreen border-[1px] py-4 px-6 text-[1.05rem] font-[300] rounded-[5px] focus:outline-none ${className}`}
        {...rest}
      >
        {title}
      </div>
    </a>
  );
};

export const OutlineLink = ({ title, url, className, ...rest }: LinkProps) => {
  return (
    <a href={url}>
      <div
        className={`text-incoverGreen text-center bg-white border-incoverGreen hover:border-[#004822] hover:text-[#004822] disabled:border-[#C8CCD0] border-[1px] py-4 px-6 text-[1.05rem] font-[400] focus:outline-none ${className}`}
        {...rest}
      >
        {title}
      </div>
    </a>
  );
};

export const OtherLink = ({ title, url, className, ...rest }: LinkProps) => {
  return (
    <a href={url}>
      <div
        className={`border-[1px] text-[1.05rem] font-[300] rounded-[5px] focus:outline-none ${className}`}
        {...rest}
      >
        {title}
      </div>
    </a>
  );
};
